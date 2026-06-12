from pydantic import BaseModel

class FavoriteCreateSchema(BaseModel):
    provider_id: int