from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.review import Review
from app.models.user import User
from app.schemas.review import ReviewCreate, ReviewRead
from app.routers.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=ReviewRead)
def create_review(
    review_input: ReviewCreate, 
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    new_review = Review(
        rating=review_input.rating,
        content=review_input.content,
        user_id=current_user.id
    )
    session.add(new_review)
    session.commit()
    session.refresh(new_review)
    return new_review

@router.get("/", response_model=List[ReviewRead])
def read_reviews(session: Session = Depends(get_session)):
    reviews = session.exec(select(Review)).all()
    return reviews

@router.post("/{review_id}/like", response_model=ReviewRead)
def like_review(review_id: int, session: Session = Depends(get_session)):
    review = session.get(Review, review_id)
    if not review: 
        raise HTTPException(status_code=404, detail="Review not found")
    
    review.likes += 1
    session.add(review)
    session.commit()
    session.refresh(review)
    return review
