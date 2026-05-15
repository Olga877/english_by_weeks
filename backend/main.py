from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
import os
from dotenv import load_dotenv

from .routers import weeks, progress, lessons

load_dotenv()

app = FastAPI(title="English by Weeks", description="Learn English week by week")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры
app.include_router(weeks.router)
app.include_router(progress.router)
app.include_router(lessons.router)


@app.get("/")
def root():
    return RedirectResponse(url="/static/index.html")


# Serve frontend files
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
if os.path.exists(frontend_path):
    app.mount("/static", StaticFiles(directory=frontend_path, html=True), name="static")