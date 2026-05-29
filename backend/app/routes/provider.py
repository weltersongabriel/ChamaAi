from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.models.provider import Provider
from app.schemas.provider import ProviderCreateSchema

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