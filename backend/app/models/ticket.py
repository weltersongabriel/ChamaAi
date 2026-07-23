from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.database.database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(255), nullable=False)
    descricao = Column(Text, nullable=True)
    status = Column(String(50), default="aberto")
    usuario_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    usuario = relationship("User", back_populates="tickets")