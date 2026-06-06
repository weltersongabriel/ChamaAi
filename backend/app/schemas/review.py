from pydantic import BaseModel, Field

class ReviewCreateSchema(BaseModel):
    provider_id: int
    rating: int = Field(..., ge=1, le=5)
    comment: str