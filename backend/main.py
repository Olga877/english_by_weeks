from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

from .routers import weeks, progress, lessons
from .routers import auth
from .routers import payments



load_dotenv()

app = FastAPI(title="English by Weeks", description="Learn English week by week")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры API (они будут доступны по /api/...)
app.include_router(weeks.router)
app.include_router(progress.router)
app.include_router(lessons.router)
app.include_router(auth.router)
app.include_router(payments.router)

# --- Монтируем папку frontend на корень сайта ---
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")