from pydantic import BaseModel

class ProviderCreateSchema(BaseModel):
    bio: str
    categoria: str
    cidade: str
    estado: str
    whatsapp: str

class ProviderResponseSchema(ProviderCreateSchema):
    id: int
    bio: str
    categoria: str
    cidade: str
    estado: str
    whatsapp: str
    status: str

    class Config:
        from_attributes = True


class ProviderUpdateSchema(BaseModel):
    bio: str
    categoria: str
    cidade: str
    estado: str
    whatsapp: str