from http import HTTPStatus

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, or_
from sqlalchemy.orm import Session

from main.database import get_session
from main.models import User
from main.schemas import (Message, UserList, UserPublic, UserSchema, UserUpdateSchema)
from main.security import get_password_hash, get_current_user

router = APIRouter(prefix='/users', tags=['users'])

@router.get('/', response_model=UserList)
def read_users(skip: int = 0, limit: int = 100, session: Session = Depends(get_session)):
  users = session.scalars(select(User).offset(skip).limit(limit)).all()
  return {'users': users}

@router.post('/', response_model=UserPublic)
def create_user(user: UserSchema, session: Session = Depends(get_session)):
  db_user = session.scalar(select(User).where(or_(User.user == user.user, User.email == user.email)))

  if db_user:
    raise HTTPException(status_code=400, detail="Usuário ou email já existe.")
    
  db_user = User(
    user=user.user,
    email=user.email,
    password=get_password_hash(user.password)
  )

  session.add(db_user)
  session.commit()
  session.refresh(db_user)

  return db_user

@router.put('/{user_id}', response_model=UserPublic)
def update_user(
  user_id:int, user: UserUpdateSchema,
  session: Session = Depends(get_session),
  current_user=Depends(get_current_user)
):
  if current_user.id != user_id:
    raise HTTPException(status_code=400, detail='Not enough permission')
  
  if user.user is not None:
    current_user.user = user.user

  if user.email is not None:
    current_user.email = user.email

  if user.password is not None:
    current_user.password = get_password_hash(user.password)

  # current_user.user = user.user
  # current_user.email = user.email
  # current_user.password = get_password_hash(user.password)

  session.add(current_user)
  session.commit()
  session.refresh(current_user)

  return current_user

@router.delete('/{user_id}', response_model=Message)
def delete_user(user_id: int, session: Session = Depends(get_session), current_user=Depends(get_current_user)):
  if current_user.id != user_id:
    raise HTTPException(status_code=400, detail='Not enough permission')
  
  session.delete(current_user)
  session.commit()
  return {'message': 'User deleted from database'}