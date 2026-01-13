from fastapi import APIRouter, Query
from app.services.tmdb import get_popular_movies, get_top_rated_movies, get_best_movies_by_genre

router = APIRouter(
    prefix="/movies", 
    tags=["Movies"]
    )

@router.get("/popular")
def popular_movies():
    return get_popular_movies()

@router.get("/top_rated")
def top_rated_movies(page: int = Query(1, ge=1, le=100)):
    return get_top_rated_movies()

@router.get("/best-by-genre")
def best_by_genre(
    genres: list[int] = Query(...),
    page: int = Query(1, ge=1, le=100),
    min_rating: float = Query(7.5, ge=0, le=10),
    min_votes: int = Query(200, ge=0)
):
    return get_best_movies_by_genre(
        genres, page, min_rating, min_votes
    )

@router.get("/search")
def search_movies_route(query: str):
    from app.services.tmdb import search_movies
    return search_movies(query)