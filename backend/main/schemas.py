from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional

class Message(BaseModel):
  message: str


class UserSchema(BaseModel):
  user: str
  email: EmailStr
  password: str

class UserUpdateSchema(BaseModel):
  user: Optional[str] = None
  email: Optional[EmailStr] = None
  password: Optional[str] = None


class UserPublic(BaseModel):
  id: int
  user: str
  email: EmailStr
  model_config = ConfigDict(from_attributes=True)


class UserList(BaseModel):
  users: list[UserPublic]


class Token(BaseModel):
  access_token: str
  token_type: str