from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
)

from sqlalchemy.orm import relationship
from app.database.database import Base

class Provider(Base):
    __tablename__ = "providers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,)
    
    bio = Column(String(500))
    categoria = Column(String(100))
    cidade = Column(String(100))
    estado = Column(String(100))
    whatsapp = Column(String(20))
    status = Column(String(20), default="ativo")
    foto_perfil = Column(String(255), nullable=True)
    #Relacionamento com o modelo User
    user = relationship("User", back_populates="provider")
