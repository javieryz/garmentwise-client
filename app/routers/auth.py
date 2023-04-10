from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from schemas.user import User
from database.database import get_db

from services.auth_service import ACCESS_TOKEN_EXPIRE_MINUTES
from services.auth_service import authenticate_user, create_access_token

router = APIRouter()

@router.post("/login")
async def login(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/signup")
async def signup(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = User.create(db, email=form_data.username, password=form_data.password)
    return {"message": "User created successfully"}