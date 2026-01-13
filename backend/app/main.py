from fastapi import FastAPI
from app.db.session import create_db_and_tables
from app.routers import auth

app = FastAPI(title="KingdomScore API")

# Start DB
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])

@app.get("/")
def main():
    return {"message": "Welcome to my API"}