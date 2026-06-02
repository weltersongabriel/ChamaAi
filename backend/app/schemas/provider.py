from pydantic import BaseModel

class ProviderCreateSchema(BaseModel):
    bio: str
    category_id: int
    cidade: str
    estado: str
    whatsapp: str

class ProviderResponseSchema(ProviderCreateSchema):
    id: int
    bio: str
    category_id: int
    cidade: str
    estado: str
    whatsapp: str
    status: str

    class Config:
        from_attributes = True


class ProviderUpdateSchema(BaseModel):
    bio: str
    category_id: int
    cidade: str
    estado: str
    whatsapp: str

class ProviderStatusSchema(BaseModel):
    status: str