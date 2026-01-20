from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ReviewBase(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    content: str

class ReviewCreate(ReviewBase):
    pass

class ReviewRead(ReviewBase):
    id: int
    likes: int
    creation_date: datetime
    user_id: int