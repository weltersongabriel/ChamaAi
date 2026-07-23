from pydantic import BaseModel

class TicketCreate(BaseModel):
    titulo: str
    descricao: str

class TicketResponse(BaseModel):
    id: int
    titulo: str
    descricao: str
    status: str

    class Config:
        orm_mode = True