# backend/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
import jwt
import os
from datetime import datetime, timedelta
from pydantic import BaseModel, EmailStr

from ..database import get_db, User
from ..schemas import UserResponse

router = APIRouter(prefix="/auth", tags=["authentication"])

# Секретный ключ для JWT (из .env)
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "test_secret_key_123456")
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 15      # время жизни ссылки
SESSION_EXPIRE_DAYS = 30       # время жизни сессии

# Модель для запроса email
class EmailRequest(BaseModel):
    email: EmailStr

# --- 1. Запрос ссылки для входа ---
@router.post("/request-link")
async def request_login_link(email_req: EmailRequest, db: Session = Depends(get_db)):
    email = email_req.email
    # Ищем пользователя по email; если нет — создаём нового
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(email=email)
        db.add(user)
        db.commit()
        db.refresh(user)

    # Генерируем одноразовый токен (действителен 15 минут)
    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_MINUTES)},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    # Ссылка (локально)
    link = f"http://127.0.0.1:8000/auth/verify?token={token}"

    # Временно выводим в консоль (потом заменим на отправку письма)
    print(f"\n🔗 Ссылка для входа: {link}\n")

    return {"message": "Ссылка для входа отправлена на почту (проверьте консоль)"}

# --- 2. Проверка токена и выдача сессионного токена ---
@router.get("/verify", response_class=HTMLResponse)
async def verify_login(token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=400, detail="Invalid token")
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.last_active = datetime.utcnow()
        db.commit()

        session_token = jwt.encode(
            {"user_id": user.id, "exp": datetime.utcnow() + timedelta(days=SESSION_EXPIRE_DAYS)},
            SECRET_KEY,
            algorithm=ALGORITHM
        )
        return HTMLResponse(content=f"""
        <!DOCTYPE html>
        <html>
        <head><title>Вход выполнен</title></head>
        <body>
            <script>
                localStorage.setItem('access_token', '{session_token}');
                window.location.href = '/';
            </script>
            <p>Вы успешно вошли. Перенаправление...</p>
        </body>
        </html>
        """)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=400, detail="Invalid token")

# --- 3. Получение информации о текущем пользователе ---
security = HTTPBearer()

@router.get("/me", response_model=UserResponse)
async def get_me(credentials: HTTPAuthorizationCredentials = Depends(security),
                 db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return UserResponse.model_validate(user)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ========== ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ (глобальная) ==========
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
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