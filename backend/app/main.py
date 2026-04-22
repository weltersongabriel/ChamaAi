from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import engine, Base
from app.models import user 
from app.routes import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ChamaAí")

app.include_router(auth)