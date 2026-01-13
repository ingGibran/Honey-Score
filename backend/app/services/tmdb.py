import requests
import os

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