from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import os
import json
import jwt
from pathlib import Path
from typing import List, Dict, Any, Optional

from ..database import get_db, User

router = APIRouter(prefix="/api/weeks", tags=["weeks"])
security = HTTPBearer()

DATA_DIR = os.getenv("DATA_DIR", os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "data", "lessons"))

WEEKS_CACHE: List[Dict[str, Any]] = []
WEEK_DETAILS_CACHE: Dict[str, Dict[str, Any]] = {}

# Опциональное получение пользователя (не выбрасывает 401)
def get_current_user_optional(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> Optional[User]:
    token = credentials.credentials
    SECRET_KEY = os.getenv("JWT_SECRET_KEY", "test_secret_key_123456")
    ALGORITHM = "HS256"
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            return None
        user = db.query(User).filter(User.id == user_id).first()
        return user
    except:
        return None

def load_all_weeks():
    global WEEKS_CACHE, WEEK_DETAILS_CACHE
    WEEKS_CACHE.clear()
    WEEK_DETAILS_CACHE.clear()

    base_path = Path(DATA_DIR)
    if not base_path.exists():
        print(f"⚠️ Папка с данными не найдена: {DATA_DIR}")
        return

    for json_path in base_path.glob("**/*.json"):
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            week_id = data.get("week_id")
            if not week_id:
                continue

            WEEK_DETAILS_CACHE[week_id] = data
            WEEKS_CACHE.append({
                "week_id": week_id,
                "title": data.get("title", ""),
                "description": data.get("description", ""),
                "level": data.get("level", ""),
                "icon": data.get("icon", "📖"),
                "order_num": data.get("order_num", 0),
                "is_published": data.get("is_published", True),
            })
        except Exception as e:
            print(f"❌ Ошибка загрузки {json_path}: {e}")

    WEEKS_CACHE.sort(key=lambda x: x.get("order_num", 0))
    print(f"✅ Загружено {len(WEEKS_CACHE)} недель")

load_all_weeks()

@router.get("/")
async def get_weeks():
    return JSONResponse(content=WEEKS_CACHE)

@router.get("/{week_id}")
async def get_week(
    week_id: str,
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    week = WEEK_DETAILS_CACHE.get(week_id)
    if not week:
        raise HTTPException(status_code=404, detail="Week not found")

    is_paid = week.get("is_paid", False)
    if is_paid:
        # Если пользователь не авторизован или не премиум – отдаём только 2 дня
        if user is None or not user.is_premium:
            limited_week = week.copy()
            limited_week["days"] = week["days"][:2]
            return JSONResponse(content=limited_week)

    return JSONResponse(content=week)