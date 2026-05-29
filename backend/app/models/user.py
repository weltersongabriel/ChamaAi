from sqlalchemy import Column, Integer, String
from app.database.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    provider = relationship("Provider", back_populates="user", uselist=False)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    telefone = Column(String(20), nullable=True)
    password = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False)