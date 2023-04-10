from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URL = "postgresql://javieryz:javieryz@localhost/garmentwise"
TITLE_MAX_LENGTH = 255
CATEGORY_CODES = {
    'FIT': 1,
    'COLOR': 2,
    'QUALITY': 3,
    'OTHER': 4
}

engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(engine)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()