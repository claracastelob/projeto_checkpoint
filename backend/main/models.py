from sqlalchemy.orm import Mapped, registry, mapped_column
from sqlalchemy import String, Integer

table_registry = registry()

@table_registry.mapped_as_dataclass
class User:
  __tablename__ = 'users'
  id: Mapped[int] = mapped_column(Integer, init=False, primary_key=True)
  user: Mapped[str] = mapped_column(String(100), unique=True)
  email: Mapped[str] = mapped_column(String(255), unique=True)
  password: Mapped[str] = mapped_column(String(255))