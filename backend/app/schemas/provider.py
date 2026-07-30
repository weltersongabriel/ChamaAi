from pydantic import BaseModel


class ProviderCreateSchema(BaseModel):
    nome: str
    bio: str
    category_id: int
    cidade: str
    estado: str
    whatsapp: str


class ProviderResponseSchema(ProviderCreateSchema):
    id: int
    status: str

    class Config:
        from_attributes = True


class ProviderUpdateSchema(BaseModel):
    nome: str
    bio: str
    category_id: int
    cidade: str
    estado: str
    whatsapp: str


class ProviderStatusSchema(BaseModel):
    status: str