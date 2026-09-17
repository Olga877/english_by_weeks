# backend/schemas.py
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime


class UserCreate(BaseModel):
    name: str
    email: Optional[str] = None
    level: str = "B1"


class UserResponse(BaseModel):
    id: int
    name: str
    email: Optional[str]
    level: str
    created_at: datetime


class WeekResponse(BaseModel):
    week_id: str
    title: str
    description: str
    level: str
    icon: str
    order_num: int
    is_published: bool


class VocabularyItem(BaseModel):
    icon: str
    word: str
    transcription: str
    translation: str
    example: str


class GrammarRule(BaseModel):
    title: str
    rule: str
    examples: List[str]
    keywords: Optional[str] = None


class Exercise(BaseModel):
    id: int
    type: str  # multiple_choice, fill_blank, correct_mistake, listening, reading
    question: str
    options: Optional[List[str]] = None
    correct: str
    explanation: str
    topic: Optional[str] = None
    listening_text: Optional[str] = None
    reading_text: Optional[str] = None


class DayResponse(BaseModel):
    day: int
    title: str
    description: str
    grammar: GrammarRule
    vocabulary: List[VocabularyItem]
    exercises: List[Exercise]


class WeekDetailResponse(BaseModel):
    week_id: str
    title: str
    description: str
    level: str
    icon: str
    days: List[DayResponse]


class ProgressUpdate(BaseModel):
    week_id: str
    day: int
    score: int
    completed: bool = True


class ProgressResponse(BaseModel):
    week_id: str
    completed_days: List[int]
    day_scores: Dict[int, int]
    current_day: int
    started_at: datetime
    completed_at: Optional[datetime]
    badges: List[str]
    total_days: int = 7
    overall_percent: float