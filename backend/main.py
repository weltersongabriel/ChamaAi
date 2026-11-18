import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database.database import engine, Base

from app.models.provider import Provider
from app.models.user import User
from app.models.category import Category

from app.routes import auth
from app.routes import provider
from app.routes.categories import router as category_router
from app.routes.review import router as review_router
from app.routes.favorite import router as favorite_router
from app.routes.ticket import router as ticket_router


app = FastAPI(
    title="ChamaAí",
    version="1.0"
)


# 🗄️ Criação das tabelas
Base.metadata.create_all(bind=engine)


# 📁 Arquivos enviados
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


# 🌐 CORS
frontend_url = os.getenv("FRONTEND_URL")

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

if frontend_url:
    allowed_origins.append(frontend_url)


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🛣️ Rotas
app.include_router(auth.router)
app.include_router(provider.router)
app.include_router(category_router)
app.include_router(review_router)
app.include_router(favorite_router)
app.include_router(ticket_router)
# BACKEND CONCLUÍDO
# PARA RODAR O BACKEND, USE O COMANDO: uvicorn main:app --reload