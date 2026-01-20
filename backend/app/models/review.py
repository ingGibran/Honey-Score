from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel

class Review(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    rating: int = Field(index=True)
    content: str
    likes: int = Field(default=0)
    creation_date: datetime = Field(default_factory=datetime.utcnow)

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")