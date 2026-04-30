from database import SessionLocal

def pegar_sessao():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()