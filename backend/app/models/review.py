from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.models.user import User
from app.models.provider import Provider
from app.database.database import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    provider_id = Column(
        Integer,
        ForeignKey("providers.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    rating = Column(Integer, nullable=False)

    comment = Column(String(500))

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    provider = relationship(
        "Provider",
        back_populates="reviews"
    )

    user = relationship(
        "User",
        back_populates="reviews"
    )