from fastapi import APIRouter, status
from app.schemas.auth import RegisterSchema

router = APIRouter(prefix="/auth", tags=["Auth"])

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