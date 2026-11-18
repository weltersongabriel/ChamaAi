import os
import sys
from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

# =============================================================================
# CONFIGURAÇÃO DE AMBIENTE DE TESTE (DEVE VIR ANTES DE IMPORTAR main)
# =============================================================================

# Define variável de ambiente para banco de teste ANTES de importar main
os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["FRONTEND_URL"] = "http://localhost:5173"

# Adiciona o diretório backend ao path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Agora importa o app (que vai usar o DATABASE_URL do ambiente)
from main import app
from app.database.database import Base, get_db
from app.models.category import Category
from app.models.favorite import Favorite
from app.models.provider import Provider
from app.models.review import Review
from app.models.ticket import Ticket
from app.models.user import User
from app.utils.security import hash_password

# =============================================================================
# CONFIGURAÇÃO DO BANCO DE DADOS DE TESTE (SQLite em memória)
# =============================================================================

TEST_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


# Habilita foreign keys no SQLite
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


def override_get_db() -> Generator[Session, None, None]:
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


# =============================================================================
# FIXTURES
# =============================================================================

@pytest.fixture(scope="function", autouse=True)
def setup_database():
    """Cria as tabelas no banco de teste antes de cada teste e limpa depois.

    Usa escopo 'function' com autouse=True para garantir isolamento total
    entre testes no SQLite em memória.
    """
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def db_session(setup_database) -> Generator[Session, None, None]:
    """Fornece uma sessão de banco de dados para cada teste."""
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture(scope="function")
def client(db_session: Session) -> Generator[TestClient, None, None]:
    """Cliente de teste FastAPI com banco isolado."""
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(scope="function")
def test_user(db_session: Session) -> User:
    """Cria um usuário de teste no banco."""
    user = User(
        name="Test User",
        email="test@example.com",
        telefone="(11) 99999-9999",
        password=hash_password("TestPassword123"),
        role="user",
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture(scope="function")
def test_user2(db_session: Session) -> User:
    """Cria um segundo usuário de teste."""
    user = User(
        name="Test User 2",
        email="test2@example.com",
        telefone="(11) 88888-8888",
        password=hash_password("TestPassword123"),
        role="user",
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture(scope="function")
def test_category(db_session: Session) -> Category:
    """Cria uma categoria de teste."""
    category = Category(name="Eletricista")
    db_session.add(category)
    db_session.commit()
    db_session.refresh(category)
    return category


@pytest.fixture(scope="function")
def test_provider(db_session: Session, test_user: User, test_category: Category) -> Provider:
    """Cria um prestador de teste associado ao test_user."""
    provider = Provider(
        user_id=test_user.id,
        nome="João Eletricista",
        bio="Eletricista experiente",
        category_id=test_category.id,
        cidade="São Paulo",
        estado="SP",
        whatsapp="5511999999999",
        status="ativo",
    )
    db_session.add(provider)
    db_session.commit()
    db_session.refresh(provider)
    return provider


@pytest.fixture(scope="function")
def test_provider2(db_session: Session, test_user2: User, test_category: Category) -> Provider:
    """Cria um segundo prestador de teste associado ao test_user2."""
    provider = Provider(
        user_id=test_user2.id,
        nome="Maria Encanadora",
        bio="Encanadora profissional",
        category_id=test_category.id,
        cidade="Rio de Janeiro",
        estado="RJ",
        whatsapp="5521988888888",
        status="ativo",
    )
    db_session.add(provider)
    db_session.commit()
    db_session.refresh(provider)
    return provider


@pytest.fixture(scope="function")
def auth_headers(test_user: User) -> dict:
    """Gera headers de autenticação com token válido para test_user."""
    from app.auth.jwt_handler import create_access_token
    token = create_access_token(data={"sub": str(test_user.id), "email": test_user.email, "role": test_user.role})
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture(scope="function")
def auth_headers_user2(test_user2: User) -> dict:
    """Gera headers de autenticação para test_user2."""
    from app.auth.jwt_handler import create_access_token
    token = create_access_token(data={"sub": str(test_user2.id), "email": test_user2.email, "role": test_user2.role})
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture(scope="function")
def expired_token() -> str:
    """Gera um token JWT expirado."""
    from datetime import datetime, timedelta
    from jose import jwt
    from app.auth.jwt_handler import SECRET_KEY, ALGORITHM

    expire = datetime.utcnow() - timedelta(minutes=1)
    payload = {"sub": "1", "email": "test@example.com", "role": "user", "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


@pytest.fixture(scope="function")
def invalid_token() -> str:
    """Token JWT inválido (assinatura errada)."""
    from jose import jwt
    payload = {"sub": "1", "email": "test@example.com", "role": "user"}
    return jwt.encode(payload, "wrong_secret", algorithm="HS256")


# =============================================================================
# UTILITÁRIOS DE TESTE
# =============================================================================

def create_test_user(db: Session, email: str = "test@example.com", name: str = "Test User") -> User:
    """Helper para criar usuário em testes."""
    user = User(
        name=name,
        email=email,
        telefone="(11) 99999-9999",
        password=hash_password("TestPassword123"),
        role="user",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def create_test_provider(db: Session, user_id: int, category_id: int, nome: str = "Test Provider") -> Provider:
    """Helper para criar prestador em testes."""
    provider = Provider(
        user_id=user_id,
        nome=nome,
        bio="Bio de teste",
        category_id=category_id,
        cidade="São Paulo",
        estado="SP",
        whatsapp="5511999999999",
        status="ativo",
    )
    db.add(provider)
    db.commit()
    db.refresh(provider)
    return provider


def get_auth_token(user_id: int, email: str, role: str = "user") -> str:
    """Helper para gerar token de autenticação."""
    from app.auth.jwt_handler import create_access_token
    return create_access_token(data={"sub": str(user_id), "email": email, "role": role})