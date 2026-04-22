from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from types import Literal

from app.database import get_db


router = APIRouter(prefix="/auth", tags=["/Auth"])

# ==========================
# SCHEMAS TEMPORÁRIOS
# ==========================

class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Literal["client", "provider"]


class LoginSchema(BaseModel):
    email: EmailStr
    password: str

# ==========================


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: RegisterSchema):
    return {
        "message": "Usuário cadastrado com sucesso",
        "user": {
            "name": data.name,
            "email": data.email,
            "role": data.role
        }
    }