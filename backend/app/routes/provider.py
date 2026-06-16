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


@router.post("/{provider_id}/photo")
async def upload_photo(
provider_id: int,
    file: UploadFile = File(...),
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

    filename = f"provider_{provider_id}_{file.filename}"

    file_path = os.path.join("uploads", filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    provider.foto_perfil = file_path
    db.commit()

    if file.content_type not in [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]:
        raise HTTPException(
            status_code=400,
            detail="Tipo de arquivo inválido. Apenas imagens são permitidas."
        )
    
    MAX_SIZE = 1 * 1024 * 1024

    if file.size > MAX_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Tamanho do arquivo excede o limite permitido (1MB)."
        )

    return {
        "message": "Foto enviada com sucesso.",
        "foto_url": f"/uploads/{filename}"
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

    #Verificar se o usuário já possui perfil
    existing_provider = db.query(Provider).filter(
    Provider.user_id == current_user.id
).first()
    # existing_provider = db.query(Provider).filter(
    #     Provider.user_id == current_user.id
    #     ).first()
    
    if existing_provider:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuário já possui perfil profissional."
        )
    
    #Criar novo perfil profissional
    new_provider = Provider(
        user_id=current_user.id,
        bio = data.bio,
        category_id = data.category_id,
        cidade = data.cidade,
        estado = data.estado,
        whatsapp = data.whatsapp,
        status = "ativo"
    )

    db.add(new_provider)
    db.commit()
    db.refresh(new_provider)

    return {
        "message": "Perfil profissional criado com sucesso.",
        "provider": {
            "id": new_provider.id,
            "category_id": new_provider.category_id,
            "cidade": new_provider.cidade,
            "estado": new_provider.estado,
            "status": new_provider.status
        }
    }


@router.get("/")
async def get_providers(
    category_id: int | None = Query(None),
    cidade: str | None = Query(None),
    status: str | None = Query(None),

    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),

    db: Session = Depends(get_db)
):
    query = db.query(Provider)

    if category_id:
        query = query.filter(Provider.category_id == category_id)
    
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
        "bio": provider.bio,
        "categoria": provider.category.name if provider.category else None,
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

    category = db.query(Category).filter(
        Category.id == data.category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Categoria não encontrada"
        )

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
            "bio": provider.bio,
            "categoria": provider.category.name,
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