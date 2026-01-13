from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: str
    birth_date: Optional[date] = None
    favorite_movie: Optional[str] = ""
    
class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    creation_date: datetime

class Token(BaseModel):
    access_token: str
    token_type: str