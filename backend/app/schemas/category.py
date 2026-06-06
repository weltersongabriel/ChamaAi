from pydantic import BaseModel

class CategoryCreateSchema(BaseModel):
    name: str

class CategoryResponseSchema(BaseModel):
    id: int
    name: str

    model_config = {
    "from_attributes": True
}