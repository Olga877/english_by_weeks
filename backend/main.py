from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from datetime import datetime
import jwt
from dotenv import load_dotenv

from .routers import weeks, progress, lessons
from .routers import auth
from .routers import payments
from .database import SessionLocal, User

load_dotenv()

app = FastAPI(title="English by Weeks", description="Learn English week by week")

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
#  MIDDLEWARE 1: Загрузка пользователя из JWT-токена
# ============================================================
@app.middleware("http")
async def load_user_from_token(request: Request, call_next):
    """Извлекает пользователя из JWT и сохраняет в request.state.user"""
    user = None
    authorization = request.headers.get("Authorization")
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        try:
            payload = jwt.decode(
                token,
                os.getenv("JWT_SECRET_KEY", "test_secret_key_123456"),
                algorithms=["HS256"]
            )
            user_id = payload.get("user_id")
            if user_id:
                db = SessionLocal()
                try:
                    user = db.query(User).filter(User.id == user_id).first()
                finally:
                    db.close()
        except Exception:
            # Если токен невалиден – просто игнорируем
            pass
    # Сохраняем пользователя (или None) в request.state
    request.state.user = user
    response = await call_next(request)
    return response


# ============================================================
#  MIDDLEWARE 2: Обновление last_active
# ============================================================
@app.middleware("http")
async def update_last_active(request: Request, call_next):
    """Обновляет last_active для авторизованных пользователей после обработки запроса"""
    response = await call_next(request)

    user = request.state.user
    if user:
        db = SessionLocal()
        try:
            db_user = db.query(User).filter(User.id == user.id).first()
            if db_user:
                db_user.last_active = datetime.utcnow()
                db.commit()
        except Exception as e:
            print(f"Ошибка обновления last_active: {e}")
        finally:
            db.close()
    return response


# ============================================================
#  ПОДКЛЮЧЕНИЕ РОУТЕРОВ
# ============================================================
app.include_router(weeks.router)
app.include_router(progress.router)
app.include_router(lessons.router)
app.include_router(auth.router)
app.include_router(payments.router)

# ============================================================
#  СТАТИКА (фронтенд)
# ============================================================
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")