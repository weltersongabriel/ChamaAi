from pydantic import BaseModel, EmailStr
from app.security.validations import Telefone


class RegisterSchema(BaseModel):
    nome: str
    email: EmailStr
    telefone: Telefone
    senha: str


class LoginSchema(BaseModel):
    email: EmailStr
    senha: str