from fastapi import APIRouter, Query, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import httpx

from main.models import Game, UserGame
from main.database import get_session
from main.settings import Settings
from main.schemas import AddGameRequest, GameRead, UserGameRead
from main.security import get_current_user

router = APIRouter(prefix='/games', tags=['games'])
api_url = Settings().RAWG_API_KEY

@router.get("/search")
async def search_game(query: str = Query(..., min_length=1)):
  url = f"https://api.rawg.io/api/games?key={api_url}&search={query}"
  async with httpx.AsyncClient() as client:
    response = await client.get(url)
    response.raise_for_status()
    data = response.json()
  return data

@router.post("/add", response_model=GameRead)
async def add_game_to_library(
    game_data: AddGameRequest,
    session: AsyncSession = Depends(get_session),
    user=Depends(get_current_user)
):
    existing_game = session.scalar(
        select(Game).where(Game.external_id == game_data.rawg_id)
    )

    if not existing_game:
        new_game = Game(
            external_id=game_data.rawg_id,
            name=game_data.name,
            image_url=game_data.image_url,
            platform=game_data.platform,
            genre=game_data.genre,
            description=game_data.description,
        )
        session.add(new_game)
        session.commit()
        session.refresh(new_game)
    else:
        new_game = existing_game

    user_game = UserGame(
        user_id=user.id,
        game_id=new_game.id,
        experience=game_data.experience,
        completion_time=game_data.completion_time,
        recommended=game_data.recommended,
        rating=game_data.rating,
    )
    session.add(user_game)
    session.commit()

    return new_game

@router.get("/", response_model=list[UserGameRead])
async def get_user_games(
    session: AsyncSession = Depends(get_session),
    user=Depends(get_current_user)
):
    result = session.execute(
        select(UserGame).join(Game).where(UserGame.user_id == user.id)
    )
    user_games = result.scalars().all()
    return user_games

@router.get("/{user_game_id}", response_model=UserGameRead)
async def get_game_details(
    user_game_id: int,
    session: AsyncSession = Depends(get_session),
    user=Depends(get_current_user)
):
    result = await session.execute(
        select(UserGame).where(UserGame.id == user_game_id, UserGame.user_id == user.id).join(Game)
    )
    user_game = result.scalar_one_or_none()
    if not user_game:
        raise HTTPException(status_code=404, detail="Jogo não encontrado na sua biblioteca")

    return user_game

@router.delete("/{user_game_id}", status_code=204)
async def delete_game_from_library(
    user_game_id: int,
    session: AsyncSession = Depends(get_session),
    user=Depends(get_current_user)
):
    result = session.execute(
        select(UserGame).where(UserGame.id == user_game_id, UserGame.user_id == user.id)
    )
    user_game = result.scalar_one_or_none()

    if not user_game:
        raise HTTPException(status_code=404, detail="Jogo não encontrado na sua biblioteca")

    session.delete(user_game)
    session.commit()
    return
