import requests
import os

from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

def get_popular_movies():
    url = f"{BASE_URL}/movie/popular"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en_US",
        "page": 1
    }
    response = requests.get(url, params=params)
    return response.json()

def get_top_rated_movies(page: int = 1):
    url = f"{BASE_URL}/movie/top_rated"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en-US",
        "page": page
    }
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def get_best_movies_by_genre(
    genre_ids: list[int],
    page: int = 1,
    min_rating: float = 7.5,
    min_votes: int = 200
):
    url = f"{BASE_URL}/discover/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en_US",
        "with_genres": ",".join( map( str, genre_ids ) ),
        "sort_by": "vote_average.desc",
        "vote_average.gte": min_rating,
        "vote_count.gte": min_votes,
        "page": page
    }

    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def search_movies(query: str):
    url = f"{BASE_URL}/search/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en_US",
        "query": query,
        "page": 1,
        "include_adult": False
    }
    response = requests.get(url, params=params)
    return response.json()