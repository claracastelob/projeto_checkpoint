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

class AddGameRequest(BaseModel):
  rawg_id: int
  name: str
  image_url: str
  platform: str
  genre: str
  description: str
  experience: str
  completion_time: str
  recommended: bool
  rating: int

class GameRead(BaseModel):
  id: int
  name: str
  image_url: str
  platform: str
  genre: str
  description: str

  class Config:
    orm_mode = True

class UserGameRead(BaseModel):
  id: int
  experience: Optional[str]
  completion_time: Optional[str]
  recommended: bool
  rating: int
  game: GameRead

  class Config:
    orm_mode = True