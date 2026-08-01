# backend/routers/progress.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import jwt
import os
from datetime import datetime
from typing import Optional

from ..database import get_db, User, UserProgress, Week
from ..schemas import ProgressUpdate, ProgressResponse

router = APIRouter(prefix="/api/progress", tags=["progress"])

# Секретный ключ для JWT (из .env)
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "test_secret_key_123456")
ALGORITHM = "HS256"
security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security),
                     db: Session = Depends(get_db)):
    """Извлекает пользователя из JWT-токена."""
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/", response_model=ProgressResponse)
async def update_progress(
    update: ProgressUpdate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Сохраняет или обновляет прогресс пользователя для конкретной недели."""
    # Проверяем, существует ли неделя
    week = db.query(Week).filter(Week.week_id == update.week_id).first()
    if not week:
        raise HTTPException(status_code=404, detail="Week not found")

    # Ищем запись прогресса для этого пользователя и недели
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == user.id,
        UserProgress.week_id == update.week_id
    ).first()

    if not progress:
        # Создаём новую запись
        progress = UserProgress(
            user_id=user.id,
            week_id=update.week_id,
            completed_days=[],
            day_scores={},
            current_day=1
        )
        db.add(progress)

    # Обновляем данные
    # Если день уже есть в completed_days, не добавляем повторно
    if update.completed and update.day not in progress.completed_days:
        progress.completed_days.append(update.day)
        progress.completed_days.sort()
    # Обновляем оценку за день
    progress.day_scores[str(update.day)] = update.score
    # Обновляем current_day (следующий день)
    if update.day >= progress.current_day:
        progress.current_day = update.day + 1

    # Если все 7 дней пройдены, заполняем completed_at
    if len(progress.completed_days) == 7:
        progress.completed_at = datetime.utcnow()

    db.commit()
    db.refresh(progress)

    # Формируем ответ
    overall_percent = 0
    if progress.day_scores:
        scores = list(progress.day_scores.values())
        overall_percent = round(sum(scores) / len(scores), 1)

    return ProgressResponse(
        week_id=progress.week_id,
        completed_days=progress.completed_days,
        day_scores={int(k): v for k, v in progress.day_scores.items()},
        current_day=progress.current_day,
        started_at=progress.started_at,
        completed_at=progress.completed_at,
        badges=progress.badges,
        total_days=7,
        overall_percent=overall_percent
    )


@router.get("/{week_id}", response_model=ProgressResponse)
async def get_progress(
    week_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Возвращает прогресс пользователя для конкретной недели."""
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == user.id,
        UserProgress.week_id == week_id
    ).first()

    if not progress:
        # Возвращаем пустой прогресс
        return ProgressResponse(
            week_id=week_id,
            completed_days=[],
            day_scores={},
            current_day=1,
            started_at=datetime.utcnow(),
            completed_at=None,
            badges=[],
            total_days=7,
            overall_percent=0.0
        )

    overall_percent = 0
    if progress.day_scores:
        scores = list(progress.day_scores.values())
        overall_percent = round(sum(scores) / len(scores), 1)

    return ProgressResponse(
        week_id=progress.week_id,
        completed_days=progress.completed_days,
        day_scores={int(k): v for k, v in progress.day_scores.items()},
        current_day=progress.current_day,
        started_at=progress.started_at,
        completed_at=progress.completed_at,
        badges=progress.badges,
        total_days=7,
        overall_percent=overall_percent
    )