import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv

load_dotenv()
db= os.getenv("DB_URL")

class Base(DeclarativeBase):
    pass
engine = create_engine(db, pool_pre_ping=True)

SessionLocal = sessionmaker(bind=engine)

print("DB URL is:", db)

