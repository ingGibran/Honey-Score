from typing import Optional
from datetime import date, datetime
from sqlmodel import Field, SQLModel

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    password: str
    birth_date: Optional[date] = None
    creation_date: datetime = Field(default_factory=datetime.utcnow)
    favorite_movie: str = Field(default="")