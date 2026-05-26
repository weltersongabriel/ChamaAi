from pydantic import BaseModel, EmailStr
from typing import Literal, Optional, List
from security.validations import CPF, Telefone, CNPJ

class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    telefone: Telefone
    password: str
    role: Literal["cliente", "prestador"]


class LoginSchema(BaseModel):
    email: EmailStr
    telefone: Telefone
    password: str