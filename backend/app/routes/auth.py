from fastapi import APIRouter, status, HTTPException
from app.schemas.auth import RegisterSchema, LoginSchema
from app.models import user
from datetime import date

router = APIRouter(prefix="/auth", tags=["Auth"])

fake_db = []

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(data: RegisterSchema):
    for user in fake_db:
        if user["email"] == data.email:
            raise HTTPException(status_code=400, detail="Email já cadastrado")

    new_user = {
        "id": len(fake_db) + 1,
        "name": data.name,
        "email": data.email,
        "telefone": data.telefone,
        "password": data.password,
        "role": data.role
    }

    fake_db.append(new_user)

    return {
        "message": "Usuário cadastrado com sucesso",
        "user": {
            "id": new_user["id"],
            "name": new_user["name"],
            "email": new_user["email"],
            "role": new_user["role"]
        }
    }

@router.post("/login", response_model=LoginSchema)
async def login(dados: LoginSchema):
    for uer in fake_db:
        if user["email"] == date.email and user["password"] == date.password:
            return {
                "message": "Login realizado com sucesso",
                "user": {
                    "id": user["id"],
                    "name": user["name"],
                    "email": user["email"],
                    "role": user["role"]
                },
                "access_token": "token_fake_por_enquanto"
            }
        raise HTTPException(status_code=401, detail="Email ou senha invalidos")



@router.get("/me")
def me():
    if not fake_db:
        raise HTTPException(status_code=404, detail="Nenhum usuário encontrado")

    user = fake_db[0]

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "role": user["role"]
    }