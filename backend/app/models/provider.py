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
    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category", back_populates="providers")
    cidade = Column(String(100), nullable=False)
    estado = Column(String(100), nullable=False)
    whatsapp = Column(String(20), unique=True)
    status = Column(String(20), default="ativo")
    foto_perfil = Column(String(255), nullable=True)
    #Relacionamento com o modelo User
    user = relationship("User", back_populates="provider")
    reviews = relationship("Review", back_populates="provider")
    favorites = relationship("Favorite", back_populates="provider")
