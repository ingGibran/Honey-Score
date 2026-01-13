from fastapi import APIRouter
from app.services.tmdb import get_popular_movies

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("/popular")
def popular_movies():
    return get_popular_movies()

@router.get("/search")
def search_movies_route(query: str):
    from app.services.tmdb import search_movies
    return search_movies(query)