from pydantic import BaseModel

class CategoryCreateSchema(BaseModel):
    name: str

class CategoryResponseSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True