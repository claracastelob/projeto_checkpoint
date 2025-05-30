from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import select, or_

from main.database import get_session
from main.models import User
from main.security import verify_password, create_access_token, get_current_user
from main.schemas import Token, UserPublic

router = APIRouter(prefix='/auth', tags=['auth'])

@router.post('/token', response_model=Token)
def login_for_access_token(
  form_data: OAuth2PasswordRequestForm = Depends(),
  session: Session = Depends(get_session)
):
  user = session.scalar(select(User).where(User.email == form_data.username))
  if not user or not verify_password(form_data.password, user.password):
    raise HTTPException(status_code=400, detail='Incorrect email or password')
  
  access_token = create_access_token(data={'sub': user.email})

  return {'access_token': access_token, 'token_type': 'Bearer'}

@router.get('/verify', response_model=UserPublic)
def verify_user(current_user=Depends(get_current_user),session: Session = Depends(get_session)):
  return current_user