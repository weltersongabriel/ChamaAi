from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.favorite import Favorite
from app.models.provider import Provider
from app.schemas.favorite import FavoriteCreateSchema
from app.auth.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)

@router.post("/")
async def create_favorite(
    data: FavoriteCreateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verificar se o prestador de serviço existe
    provider = db.query(Provider).filter(
        Provider.id == data.provider_id
    ).first()
    
    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Prestador de serviço não encontrado."
        )
    
    existing = db.query(Favorite).filter(
        Favorite.user_id == current_user.id,
        Favorite.provider_id == data.provider_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Prestador de serviço já está nos favoritos."
        )

    # Criar o favorito
    favorite = Favorite(
        user_id=current_user.id,
        provider_id=data.provider_id
    )
    db.add(favorite)
    db.commit()
    db.refresh(favorite)

    return {"message": "Prestador de serviço adicionado aos favoritos."}


@router.get("/")
async def list_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    favorites = db.query(Favorite).filter(
        Favorite.user_id == current_user.id
    ).all()
    
    return [
    {
        "favorite_id": favorite.id,
        "provider_id": favorite.provider_id,
        "nome": favorite.provider.user.name,
        "categoria": (
            favorite.provider.category.name
            if favorite.provider.category
            else None
        ),
        "cidade": favorite.provider.cidade,
        "estado": favorite.provider.estado,
        "status": favorite.provider.status,
    }
    for favorite in favorites
]


@router.delete("/{favorite_id}")
async def delete_favorite(
    favorite_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    favorite = db.query(Favorite).filter(
        Favorite.id == favorite_id,
        Favorite.user_id == current_user.id
    ).first()
    
    if not favorite:
        raise HTTPException(
            status_code=404,
            detail="Favorito não encontrado."
        )
    
    db.delete(favorite)
    db.commit()

    return {"message": "Prestador de serviço removido dos favoritos."}