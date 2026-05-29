from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database.database import engine, Base
from app.models import user
from app.routes import auth
from app.models.provider import Provider

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ChamaAí",
              version="1.0")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
