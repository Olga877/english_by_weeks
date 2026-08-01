# backend/routers/payments.py
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
import os
import requests
from datetime import datetime, timedelta
from .auth import get_current_user

from ..database import get_db, User

router = APIRouter(prefix="/payments", tags=["payments"])

# Настройки ЮKassa (из .env)
YOOKASSA_SHOP_ID = os.getenv("YOOKASSA_SHOP_ID")
YOOKASSA_SECRET_KEY = os.getenv("YOOKASSA_SECRET_KEY")
YOOKASSA_API_URL = "https://api.yookassa.ru/v3/payments"

SUBSCRIPTION_PRICE = 30000  # 300 рублей в копейках
SUBSCRIPTION_DURATION_DAYS = 30

@router.post("/create")
async def create_payment(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.is_premium:
        return {"message": "Вы уже премиум"}
    # user уже получен через Depends
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Basic {YOOKASSA_SECRET_KEY}"
    }
    data = {
        "amount": {
            "value": str(SUBSCRIPTION_PRICE / 100),
            "currency": "RUB"
        },
        "confirmation": {
            "type": "redirect",
            "return_url": "http://127.0.0.1:8000/payments/success"
        },
        "capture": True,
        "description": f"Подписка English by Weeks на 30 дней для {user.email}",
        "metadata": {
            "user_id": str(user.id)
        }
    }

    response = requests.post(YOOKASSA_API_URL, headers=headers, json=data)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    payment = response.json()
    return {"payment_url": payment["confirmation"]["confirmation_url"]}

@router.post("/webhook")
async def webhook(request: Request, db: Session = Depends(get_db)):
    body = await request.json()
    if body.get("event") == "payment.succeeded":
        metadata = body.get("metadata", {})
        user_id = metadata.get("user_id")
        if user_id:
            user = db.query(User).filter(User.id == int(user_id)).first()
            if user:
                user.is_premium = True
                user.subscription_until = datetime.utcnow() + timedelta(days=SUBSCRIPTION_DURATION_DAYS)
                db.commit()
                print(f"✅ Пользователь {user.email} получил премиум-доступ до {user.subscription_until}")
    return {"status": "ok"}

@router.get("/success")
async def success_page():
    return HTMLResponse("""
    <html><body>
        <h2>Оплата прошла успешно!</h2>
        <p>Ваш премиум-доступ активирован. Вернитесь на сайт.</p>
        <a href="/">Перейти на сайт</a>
    </body></html>
    """)


# Мок-оплата (для тестирования)
@router.post("/mock")
async def mock_payment(
        user: User = Depends(get_current_user),  # нужно импортировать get_current_user из auth
        db: Session = Depends(get_db)
):
    if user.is_premium:
        return {"status": "already_premium", "message": "Вы уже премиум"}

    user.is_premium = True
    user.subscription_until = datetime.utcnow() + timedelta(days=30)
    db.commit()

    return {
        "status": "success",
        "message": "Премиум-доступ активирован на 30 дней",
        "subscription_until": user.subscription_until.isoformat()
    }