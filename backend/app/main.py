from fastapi import FastAPI
from app.db.session import create_db_and_tables
from app.routers import auth, movies, reviews

app = FastAPI(title="KingdomScore API")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Start DB
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(movies.router)
app.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])

@app.get("/")
def main():
    return {"message": "Welcome to my API"}