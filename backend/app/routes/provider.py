from fastapi import APIRouter, Depends, HTTPException, status, Query
from flask_login import current_user
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.database.database import get_db

from app.models.user import User
from app.models.provider import Provider
from app.models.category import Category
from app.models.provider import Provider

from sqlalchemy import func
from app.models.review import Review

from app.schemas.provider import ( 
    ProviderCreateSchema,
    ProviderUpdateSchema,
    ProviderResponseSchema,
    ProviderStatusSchema
)
import shutil
import os
from fastapi import UploadFile, File

router = APIRouter(
    prefix="/providers",
    tags=["Providers"])


@router.get("/me")
async def get_my_provider(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    provider = db.query(Provider).filter(
        Provider.user_id == current_user.id
    ).first()

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Você ainda não possui um perfil profissional."
        )

    total_reviews = db.query(Review).filter(
        Review.provider_id == provider.id
    ).count()

    average_rating = db.query(
        func.avg(Review.rating)
    ).filter(
        Review.provider_id == provider.id
    ).scalar()

    average_rating = (
        round(float(average_rating), 1)
        if average_rating else 0
    )

    return {
        "id": provider.id,
        "nome": provider.nome,
        "bio": provider.bio,
        "category_id": provider.category_id,
        "categoria": (
            provider.category.name
            if provider.category
            else None
        ),
        "cidade": provider.cidade,
        "estado": provider.estado,
        "whatsapp": provider.whatsapp,
        "status": provider.status,
        "media_avaliacoes": average_rating,
        "total_avaliacoes": total_reviews
    }

# @router.post("/")
# async def create_provider(
#     data: ProviderCreateSchema,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):

@router.post("/")
async def create_provider(
    data: ProviderCreateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verificar se a categoria existe
    category = db.query(Category).filter(
        Category.id == data.category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Categoria não encontrada."
        )

    # Verificar se o usuário já possui perfil profissional
    existing_provider = db.query(Provider).filter(
        Provider.user_id == current_user.id
    ).first()

    if existing_provider:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuário já possui perfil profissional."
        )

    # Criar perfil profissional
    new_provider = Provider(
        user_id=current_user.id,
        nome=data.nome,
        bio=data.bio,
        category_id=data.category_id,
        cidade=data.cidade,
        estado=data.estado,
        whatsapp=data.whatsapp,
        status="ativo"
    )

    db.add(new_provider)
    db.commit()
    db.refresh(new_provider)

    return {
        "message": "Perfil profissional criado com sucesso.",
        "provider": {
            "id": new_provider.id,
            "nome": new_provider.nome,
            "bio": new_provider.bio,
            "category_id": new_provider.category_id,
            "cidade": new_provider.cidade,
            "estado": new_provider.estado,
            "whatsapp": new_provider.whatsapp,
            "status": new_provider.status
        }
    }

@router.get("/")
async def get_providers(
    categoria: str | None = Query(None),
    cidade: str | None = Query(None),
    status: str | None = Query(None),

    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),

    db: Session = Depends(get_db)
):
    query = db.query(Provider)

    if categoria:
        query = (
            query.join(Category)
            .filter(Category.name.ilike(f"%{categoria}%"))
    )
    
    if cidade:
        query = query.filter(Provider.cidade.ilike(f"%{cidade}%"))

    if status:
        query = query.filter(Provider.status == status)
    
    total = query.count()

    offset = (page - 1) * limit

    providers = query.offset(offset).limit(limit).all()

    return {
    "total": total,
    "page": page,
    "limit": limit,
    "data": [
        {
            "id": provider.id,
            "nome": provider.user.name,
            "bio": provider.bio,
            "categoria": provider.category.name if provider.category else None,
            "cidade": provider.cidade,
            "estado": provider.estado,
            "status": provider.status,
            "whatsapp": provider.whatsapp,

            "media_avaliacoes": (
                round(
                    float(
                        db.query(func.avg(Review.rating))
                        .filter(
                            Review.provider_id == provider.id
                        )
                        .scalar() or 0
                    ),
                    1
                )
            ),

            "total_avaliacoes": (
                db.query(Review)
                .filter(
                    Review.provider_id == provider.id
                )
                .count()
            )
        }
        for provider in providers
    ]
}


@router.get("/{provider_id}")
async def get_provider_by_id(
    provider_id: int,
    db: Session = Depends(get_db)
):

    provider = db.query(Provider).filter(
        Provider.id == provider_id
    ).first()

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Prestador não encontrado"
        )
    
    total_reviews = db.query(Review).filter(
        Review.provider_id == provider.id
    ).count()

    average_rating = db.query(
        func.avg(Review.rating)
    ).filter(
        Review.provider_id == provider.id
    ).scalar()

    average_rating = (
        round(float(average_rating), 1)
        if average_rating else 0
    )

    return {
        "id": provider.id,
        "nome": provider.user.nome,
        "bio": provider.bio,
        "categoria": provider.category.nome if provider.category else None,
        "cidade": provider.cidade,
        "estado": provider.estado,
        "status": provider.status,
        "whatsapp": provider.whatsapp,
        "media_avaliacoes": average_rating,
        "total_avaliacoes": total_reviews
    }


@router.put("/{provider_id}")
async def update_provider(
    provider_id: int,
    data: ProviderUpdateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    provider = db.query(Provider).filter(
        Provider.id == provider_id
    ).first()

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Prestador não encontrado"
        )

    if provider.user_id != current_user.id:
        raise HTTPException(
        status_code=403,
        detail="Você não tem permissão para editar este perfil."
    )

    category = db.query(Category).filter(
        Category.id == data.category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Categoria não encontrada"
        )

    provider.nome = data.nome 
    provider.bio = data.bio
    provider.category_id = data.category_id
    provider.cidade = data.cidade
    provider.estado = data.estado
    provider.whatsapp = data.whatsapp

    db.commit()
    db.refresh(provider)

    return {
        "message": "Perfil atualizado com sucesso",
        "provider": {
            "id": provider.id,
            "nome": provider.nome,
            "bio": provider.bio,
            "categoria": provider.category.nome,
            "cidade": provider.cidade,
            "estado": provider.estado,
            "whatsapp": provider.whatsapp
        }
    }

@router.patch("/{provider_id}/status")
async def update_provider_status(
    provider_id: int,
    data: ProviderStatusSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    provider = db.query(Provider).filter(
        Provider.id == provider_id
    ).first()

    if provider.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Voce não tem permissão para editar este perfil."
        )

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Prestador não encontrado"
        )
    
    if data.status not in ["ativo", "inativo"]:
        raise HTTPException(
            status_code=400,
            detail="Status inválido. O status deve ser 'ativo' ou 'inativo'."
        )
    
    provider.status = data.status

    db.commit()
    db.refresh(provider)

    return {
        "message": "Status atualizado com sucesso.",
        "status": provider.status
    }

@router.delete("/{provider_id}")
async def delete_provider(
    provider_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    provider = db.query(Provider).filter(
        Provider.id == provider_id
    ).first()

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Prestador não encontrado"
        )

    if provider.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Acesso negado. Você só pode excluir seu próprio perfil profissional."
        )

    db.delete(provider)
    db.commit()

    return {
        "message": "Prestador excluído com sucesso."
    }