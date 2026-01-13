from fastapi import APIRouter
from app.services.tmdb import get_popular_movies

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("/popular")
def popular_movies():
    return get_popular_movies()