from pwdlib import PasswordHash

from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from main.settings import Settings

from jwt import encode

pwd_context = PasswordHash.recommended()
settings = Settings()

def get_password_hash(password: str):
  return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
  return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
  to_encode = data.copy()

  expire = datetime.now(tz=ZoneInfo('UTC')) + timedelta(minute=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({'exp': expire})
  encoded_jwt = encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

  return encoded_jwt