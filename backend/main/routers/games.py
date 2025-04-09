from fastapi import APIRouter, Query, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import httpx

from main.models import Game, UserGame
from main.database import get_session
from main.settings import Settings
from main.schemas import AddGameRequest, GameRead
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