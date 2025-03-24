from http import HTTPStatus

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, or_
from sqlalchemy.orm import Session

from main.database import get_session
from main.models import User
from main.schemas import (Message, UserList, UserPublic, UserSchema)
from main.security import get_password_hash

router = APIRouter(prefix='/users', tags=['users'])

@router.get('/', response_model=UserList)
def read_users(skip: int = 0, limit: int = 100, session: Session = Depends(get_session)):
  users = session.scalars(select(User).offset(skip).limit(limit)).all()
  return {'users': users}

@router.post('/', response_model=UserPublic)
def create_user(user: UserSchema, session: Session = Depends(get_session)):
  db_user = session.scalar(select(User).where(or_(User.user == user.user, User.email == user.email)))

  if db_user:
    if db_user.user == user.user:
      raise HTTPException(
        status_code = HTTPStatus.BAD_REQUEST,
        detail='Username already exists'
      )
    elif db_user.email == user.email:
      raise HTTPException(
        status_code = HTTPStatus.BAD_REQUEST,
        detail='Email already exists'
      )
    
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
def update_user(user_id:int, user: UserSchema, session: Session = Depends(get_session)):
  db_user = session.scalar(select(User).where(User.id == user_id))

  if not db_user:
    raise HTTPException(
      status_code = HTTPStatus.NOT_FOUND,
      detail='User not found on database'
    )
  
  db_user.user = user.user
  db_user.email = user.email
  db_user.password = get_password_hash(user.password)

  session.add(db_user)
  session.commit()
  session.refresh(db_user)

  return db_user

@router.delete('/{user_id}', response_model=Message)
def delete_user(user_id: int, session: Session = Depends(get_session)):
  db_user = session.scalar(select(User).where(User.id == user_id))

  if not db_user:
    raise HTTPException(
      status_code = HTTPStatus.NOT_FOUND,
      detail='User not found on database'
    )
  
  session.delete(db_user)
  session.commit()
  return {'message': 'User deleted from database'}