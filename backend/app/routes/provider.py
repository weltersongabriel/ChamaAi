from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.models.provider import Provider
from app.schemas.provider import ( 
    ProviderCreateSchema,
    ProviderUpdateSchema,
    ProviderResponseSchema,
    ProviderStatusSchema
)

router = APIRouter(
    prefix="/providers",
    tags=["Providers"])

# @router.post("/")
# async def create_provider(
#     data: ProviderCreateSchema,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):

@router.post("/")
async def create_provider(
    data: ProviderCreateSchema,
    db: Session = Depends(get_db)
):
    #Verificar se o usuário já possui perfil
    existing_provider = db.query(Provider).filter(
    Provider.user_id == 1
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
        user_id=1,
        #user_id = current_user.id,
        bio = data.bio,
        categoria = data.categoria,
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
            "categoria": new_provider.categoria,
            "cidade": new_provider.cidade,
            "estado": new_provider.estado,
            "status": new_provider.status
        }
    }


@router.get("/{provider_id}")
async def get_provider_by_id(
    provider_id: int,
    db: Session = Depends(get_db)
):

    provider = db.query(Provider).filter(
        Provider.status == "ativo"
    ).first()

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Prestador não encontrado"
        )

    return {
        "id": provider.id,
        "categoria": provider.categoria,
        "cidade": provider.cidade,
        "estado": provider.estado,
        "status": provider.status,
        "whatsapp": provider.whatsapp,
        "bio": provider.bio,
        "user_id": provider.user_id
    }


@router.put("/{provider_id}")
async def update_provider(
    provider_id: int,
    data: ProviderUpdateSchema,
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)
):
    provider = db.query(Provider).filter(
        Provider.id == provider_id
    ).first()

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Prestador não encontrado"
        )

    # if provider.user_id != current_user.id:
    #     raise HTTPException(
    #         status_code=403,
    #         detail="Acesso negado. Você só pode atualizar seu próprio perfil profissional."
    #     )

    provider.bio = data.bio
    provider.categoria = data.categoria
    provider.cidade = data.cidade
    provider.estado = data.estado
    provider.whatsapp = data.whatsapp

    db.commit()
    db.refresh(provider)

    return {
        "message": "Perfil profissional atualizado com sucesso.",
        "provider": {
            "id": provider.id,
            "categoria": provider.categoria,
            "cidade": provider.cidade,
            "estado": provider.estado,
            "status": provider.status
        }
    }

@router.patch("/{provider_id}/status")
async def update_provider_status(
    provider_id: int,
    data: ProviderStatusSchema,
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)
):
    provider = db.query(Provider).filter(
        Provider.id == provider_id
    ).first()

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Prestador não encontrado"
        )

    # if provider.user_id != current_user.id:
    #     raise HTTPException(
    #         status_code=403,
    #         detail="Acesso negado. Você só pode atualizar seu próprio perfil profissional."
    #     )

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