from http import HTTPStatus
from fastapi import FastAPI

from main.routers import users
from main.schemas import Message

app = FastAPI()
app.include_router(users.router)

@app.get('/', status_code=HTTPStatus.OK, response_model=Message)
def read_root():
  return {'message': 'Olá!'}