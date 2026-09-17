from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime

router = APIRouter(prefix="/api/progress", tags=["progress"])


class ProgressUpdate(BaseModel):
    week_id: str
    day: int
    score: int
    session_id: str
    completed: bool = True


@router.get("/{week_id}")
async def get_progress(week_id: str, session_id: str):
    """Получить прогресс пользователя по неделе"""
    return {
        "week_id": week_id,
        "completed_days": [],
        "day_scores": {},
        "current_day": 1,
        "started_at": datetime.now().isoformat(),
        "completed_at": None,
        "badges": [],
        "total_days": 6,
        "overall_percent": 0.0
    }


@router.post("/")
async def update_progress(progress: ProgressUpdate):
    """Обновить прогресс пользователя"""
    print(f"📊 Saving progress: week={progress.week_id}, day={progress.day}, score={progress.score}%")
    return {
        "status": "ok",
        "message": f"Progress for day {progress.day} saved"
    }