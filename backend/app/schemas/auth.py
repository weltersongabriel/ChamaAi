from pydantic import BaseModel, EmailStr
from typing import Literal, Optional, List

class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    telefone: str
    role: Literal["client", "provider"]


class LoginSchema(BaseModel):
    email: EmailStr
    telefone: str