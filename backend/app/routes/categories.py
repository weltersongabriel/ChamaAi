from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreateSchema

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
    )

@router.post("/")
async def create_category(
    data: CategoryCreateSchema,
    db: Session = Depends(get_db)
):
    category = db.query(Category).filter(
        Category.name == data.name
    ).first()

    if category:
        raise HTTPException(
            status_code=400,
            detail="Categoria já existe."
        )
    new_category = Category(name=data.name)

    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category

@router.get("/")
async def list_categories(
    db: Session = Depends(get_db)
):
    return db.query(Category).all()