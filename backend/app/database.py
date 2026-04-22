from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 🔗 string de conexão (SQLite simples pra começar)
DATABASE_URL = "sqlite:///./chamaai.db"

# ⚙️ engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # necessário para SQLite
)

# 🧠 sessão do banco
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# 🧱 Base para os models
Base = declarative_base()