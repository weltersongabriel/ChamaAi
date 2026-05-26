from fastapi import APIRouter, status, HTTPException
from app.schemas.auth import RegisterSchema, LoginSchema

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

fake_db = []


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(data: RegisterSchema):
    existing_user = next(
        (user for user in fake_db if user["email"] == data.email), None
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já cadastrado"
        )

    new_user = {
        "id": len(fake_db) + 1,
        "name": data.nome,
        "email": data.email,
        "telefone": data.telefone,
        "password": data.senha,
        "role": "user"  # ✅ Bug 1 corrigido
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


@router.post("/login")
async def login(data: LoginSchema):
    user = next(
        (
            user for user in fake_db
            if user["email"] == data.email
            and user["password"] == data.senha  # ✅ Bug 2 corrigido
        ),
        None
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha inválidos"
        )

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