from pydantic import BaseModel, EmailStr
from typing import Literal, Optional, List

class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Literal["client", "provider"]


class LoginSchema(BaseModel):
    email: EmailStr
    password: str