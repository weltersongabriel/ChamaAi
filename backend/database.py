from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 🔗 URL do banco (SQLite pra dev)
DATABASE_URL = "sqlite:///./chamaai.db"

# ⚙️ Engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # necessário para SQLite
)

# 🧠 Sessão
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# 🧱 Base dos models
Base = declarative_base()


# 🔌 Dependência para usar nas rotas
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()