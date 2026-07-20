from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.models.review import Review
from app.models.provider import Provider
from app.schemas.review import ReviewCreateSchema
from app.schemas.favorite import FavoriteCreateSchema


router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)

@router.post("/")
async def create_review(
    data: ReviewCreateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verificar se o prestador de serviço existe
    provider = db.query(Provider).filter(
        Provider.id == data.provider_id
    ).first()
    
    if not provider:
        raise HTTPException(
            status_code=400,
            detail="Prestador de serviço não encontrado."
        )
    
    existing_review = db.query(Review).filter(
        Review.user_id == current_user.id,
        Review.provider_id == data.provider_id
    ).first()

    if existing_review:
        raise HTTPException(
            status_code=400,
            detail="Você já avaliou este prestador de serviço."
        )
    
    # Criar nova avaliação
    new_review = Review(
        provider_id=data.provider_id,
        user_id=current_user.id,
        rating=data.rating,
        comment=data.comment
    )
    
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    
    return {"message": "Avaliação criada com sucesso.", "review": new_review}


@router.get("/provider/{provider_id}")
async def get_reviews_by_provider(
    provider_id: int,
    db: Session = Depends(get_db)
):
    reviews = db.query(Review).filter(
        Review.provider_id == provider_id
    ).all()
    
    return [
        {
            "id": review.id,
            "rating": review.rating,
            "comment": review.comment,
            "user_id": review.user_id,
        }
        for review in reviews
    ]