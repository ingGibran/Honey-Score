from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.user import User
from app.schemas.user import UserCreate, UserRead, Token
from app.core.security import get_password_hash, verify_password, create_access_token

router = APIRouter()

@router.post("/register", response_model=UserRead)
def register_user(user_input: UserCreate, session: Session = Depends(get_session)):
    # Check username & email
    statement = select(User).where(
        (User.username == user_input.username) | (User.email == user_input.email)
    )
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or Email already registered.")
    
    # Hash the password
    hashed_pwd = get_password_hash(user_input.password)
    
    # Create DB Object
    new_user = User(
        username=user_input.username,
        email=user_input.email,
        password=hashed_pwd,
        birth_date=user_input.birth_date,
        favorite_movie=user_input.favorite_movie or ""
    )
    
    # Save to DB
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    return new_user

@router.post("/login", response_model=Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    # Search for the user
    statement = select(User).where(User.username == form_data.username)
    user = session.exec(statement).first()
    
    # Verify user and passwords
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    # Return access token
    access_token = create_access_token(subject=user.email)
    return {"access_token": access_token, "token_type": "bearer"}