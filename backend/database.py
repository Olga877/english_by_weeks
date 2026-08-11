# backend/database.py
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os
from dotenv import load_dotenv  # ← добавить импорт

load_dotenv()  # ← добавить вызов

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./english_by_weeks.db")
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)  # теперь обязательное поле
    name = Column(String, default="Learner")
    level = Column(String, default="B1")
    created_at = Column(DateTime, default=datetime.utcnow)
    last_active = Column(DateTime, default=datetime.utcnow)
    is_premium = Column(Boolean, default=False)
    subscription_until = Column(DateTime, nullable=True)

    # Связь с прогрессом: один пользователь – много записей прогресса
    progress = relationship("UserProgress", back_populates="user", cascade="all, delete-orphan")


class Week(Base):
    __tablename__ = "weeks"

    id = Column(Integer, primary_key=True, index=True)
    week_id = Column(String, unique=True, index=True)  # money_week, travel_week, etc.
    title = Column(String)
    description = Column(String)
    level = Column(String)
    icon = Column(String)
    order_num = Column(Integer, default=0)
    is_published = Column(Boolean, default=True)
    data = Column(JSON)  # полные данные недели (7 дней)

    # Связь с прогрессом (необязательно, но удобно)
    progress_records = relationship("UserProgress", back_populates="week")


class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    week_id = Column(String, ForeignKey("weeks.week_id"))
    completed_days = Column(JSON, default=list)  # [1,2,3]
    day_scores = Column(JSON, default=dict)  # {1: 85, 2: 90}
    current_day = Column(Integer, default=1)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    badges = Column(JSON, default=list)

    # Связи
    user = relationship("User", back_populates="progress")
    week = relationship("Week", back_populates="progress_records")


# Создание таблиц при первом запуске (если их нет)
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
