from http import HTTPStatus
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from main.routers import users, auth
from main.schemas import Message

app = FastAPI()
app.include_router(users.router)
app.include_router(auth.router)

origins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/', status_code=HTTPStatus.OK, response_model=Message)
def read_root():
  return {'message': 'Olá!'}