from fastapi import APIRouter, status, HTTPException
from fastapi.params import Depends
from requests import Session
from app.schemas.auth import RegisterSchema, LoginSchema
from app.models.user import User
from app.database.database import get_db

from app.utils.security import (hash_password, verify_password)
from app.auth.jwt_handler import create_access_token

from app.auth.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

fake_db = []


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    data: RegisterSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já cadastrado"
        )

    new_user = User(
        name=data.nome,
        email=data.email,
        telefone=data.telefone,
        password=hash_password(data.senha),
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Usuário cadastrado com sucesso",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }
    }


@router.post("/login")
async def login(
    data: LoginSchema,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user or not verify_password(
        data.senha,
        user.password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha inválidos"
        )

    access_token = create_access_token(
    data={
        "sub": str(user.id),
        "email": user.email,
        "role": user.role
    }
)

    return {
        "message": "Login realizado com sucesso",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        },
        "access_token": access_token
    }


@router.get("/me")
async def me(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }   

#router.get("/dashboard")
#@router.post("/services")