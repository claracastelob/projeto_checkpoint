from sqlalchemy.orm import Mapped, registry, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey, Boolean, Float

table_registry = registry()

@table_registry.mapped_as_dataclass
class User:
  __tablename__ = 'users'
  id: Mapped[int] = mapped_column(Integer, init=False, primary_key=True)
  user: Mapped[str] = mapped_column(String(100), unique=True)
  email: Mapped[str] = mapped_column(String(255), unique=True)
  password: Mapped[str] = mapped_column(String(255))
  avatar_url: Mapped[str] = mapped_column(String(255), nullable=True, default="/static/avatars/default.png")

  user_games: Mapped[list["UserGame"]] = relationship(back_populates="user", cascade="all, delete-orphan", init=False, default_factory=list)

@table_registry.mapped_as_dataclass
class Game:
    __tablename__ = 'games'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, init=False)
    external_id: Mapped[str] = mapped_column(String(100), unique=True)
    name: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(String(1000))
    genre: Mapped[str] = mapped_column(String(100))
    platform: Mapped[str] = mapped_column(String(100))
    image_url: Mapped[str] = mapped_column(String(255))

    user_games: Mapped[list["UserGame"]] = relationship(back_populates="game", init=False, default_factory=list)

@table_registry.mapped_as_dataclass
class UserGame:
    __tablename__ = 'user_games'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, init=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    game_id: Mapped[int] = mapped_column(ForeignKey("games.id"))

    experience: Mapped[str] = mapped_column(String(1000))
    completion_time: Mapped[str] = mapped_column(String(100))
    recommended: Mapped[bool] = mapped_column(Boolean)
    rating: Mapped[float] = mapped_column()

    user: Mapped["User"] = relationship(back_populates="user_games", init=False)
    game: Mapped["Game"] = relationship(back_populates="user_games", init=False)
