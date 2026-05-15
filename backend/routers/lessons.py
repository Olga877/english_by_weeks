from fastapi import APIRouter, HTTPException
from pathlib import Path
import json

router = APIRouter(prefix="/api/lessons", tags=["lessons"])

# Путь к папке с JSON-файлами уроков
LESSONS_DIR = Path(__file__).parent.parent / "data" / "lessons"

print(f"📁 LESSONS_DIR: {LESSONS_DIR}")
print(f"📁 LESSONS_DIR exists: {LESSONS_DIR.exists()}")


# ========== ВЗРОСЛЫЕ ЭНДПОИНТЫ (с папкой adults) ==========

@router.get("/adults/levels")
async def get_adult_levels():
    """Возвращает список доступных уровней для взрослых"""
    adults_dir = LESSONS_DIR / "adults"
    if not adults_dir.exists():
        return []
    return [d.name for d in adults_dir.iterdir() if d.is_dir()]


@router.get("/adults/weeks/{level}")
async def get_adult_weeks_by_level(level: str):
    """Возвращает список недель для взрослого уровня"""
    level_dir = LESSONS_DIR / "adults" / level
    print(f"🔍 Looking for weeks in adult level: {level_dir}")

    if not level_dir.exists():
        print(f"❌ Level directory not found: {level_dir}")
        return []

    weeks = []
    for json_file in level_dir.glob("*.json"):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                weeks.append({
                    "week_id": data.get("week_id", json_file.stem),
                    "title": data.get("title", json_file.stem),
                    "description": data.get("description", ""),
                    "level": level,
                    "icon": data.get("icon", "📚"),
                    "order_num": data.get("order_num", 0)
                })
                print(f"✅ Loaded week: {data.get('week_id')}")
        except Exception as e:
            print(f"❌ Error reading {json_file}: {e}")

    return sorted(weeks, key=lambda x: x["order_num"])


@router.get("/adults/week/{level}/{week_id}")
async def get_adult_week(level: str, week_id: str):
    """Возвращает полные данные недели для взрослых"""
    print(f"🔍 Looking for adult week: level={level}, week_id={week_id}")

    level_dir = LESSONS_DIR / "adults" / level
    print(f"📁 Level directory: {level_dir}")
    print(f"📁 Exists: {level_dir.exists()}")

    if not level_dir.exists():
        raise HTTPException(404, f"Level '{level}' not found")

    for json_file in level_dir.glob("*.json"):
        print(f"📄 Checking file: {json_file.name}")
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if data.get("week_id") == week_id:
                    print(f"✅ Found week: {week_id}")
                    return data
        except Exception as e:
            print(f"❌ Error reading {json_file}: {e}")

    print(f"❌ Week '{week_id}' not found in level '{level}'")
    raise HTTPException(404, f"Week '{week_id}' not found in level '{level}'")


# ========== ШКОЛЬНЫЕ ЭНДПОИНТЫ (с папкой school) ==========

@router.get("/school/grades")
async def get_school_grades():
    """Возвращает список доступных классов для школьников"""
    school_dir = LESSONS_DIR / "school"
    print(f"🔍 Looking for school grades in: {school_dir}")

    if not school_dir.exists():
        print(f"❌ School directory not found")
        return []

    grades = [d.name for d in school_dir.iterdir() if d.is_dir()]
    print(f"✅ Found grades: {grades}")
    return sorted(grades)


@router.get("/school/weeks/{grade}")
async def get_school_weeks_by_grade(grade: str):
    """Возвращает список недель для школьного класса"""
    grade_dir = LESSONS_DIR / "school" / grade
    print(f"🔍 Looking for weeks in grade: {grade_dir}")

    if not grade_dir.exists():
        print(f"❌ Grade directory not found: {grade_dir}")
        return []

    weeks = []
    for json_file in grade_dir.glob("*.json"):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                weeks.append({
                    "week_id": data.get("week_id", json_file.stem),
                    "title": data.get("title", json_file.stem),
                    "description": data.get("description", ""),
                    "level": data.get("level", grade),
                    "icon": data.get("icon", "📚"),
                    "order_num": data.get("order_num", 0)
                })
                print(f"✅ Loaded school week: {data.get('week_id')}")
        except Exception as e:
            print(f"❌ Error reading {json_file}: {e}")

    return sorted(weeks, key=lambda x: x["order_num"])


@router.get("/school/week/{grade}/{week_id}")
async def get_school_week(grade: str, week_id: str):
    """Возвращает полные данные школьной недели"""
    print(f"🔍 Looking for school week: grade={grade}, week_id={week_id}")

    week_path = LESSONS_DIR / "school" / grade / f"{week_id}.json"
    print(f"📁 File path: {week_path}")
    print(f"📁 Exists: {week_path.exists()}")

    if not week_path.exists():
        raise HTTPException(404, f"School week '{week_id}' not found in grade '{grade}'")

    try:
        with open(week_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            print(f"✅ Loaded school week: {data.get('title')}")
            return data
    except json.JSONDecodeError as e:
        print(f"❌ JSON decode error: {e}")
        raise HTTPException(500, f"Invalid JSON in {week_id}.json")
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        raise HTTPException(500, f"Error reading week file")


# ========== ТЕСТОВЫЙ ЭНДПОИНТ ДЛЯ ДИАГНОСТИКИ ==========

@router.get("/test")
async def test_paths():
    """Тестовый эндпоинт для проверки путей (только для отладки)"""
    adults_dir = LESSONS_DIR / "adults"
    b1_dir = LESSONS_DIR / "adults" / "B1"
    school_dir = LESSONS_DIR / "school"
    grade5_dir = LESSONS_DIR / "school" / "grade5"
    week1_school_path = LESSONS_DIR / "school" / "grade5" / "week1_school.json"

    # Список всех уровней для взрослых
    adult_levels = []
    if adults_dir.exists():
        adult_levels = [d.name for d in adults_dir.iterdir() if d.is_dir()]

    # Список JSON файлов в B1
    b1_files = []
    if b1_dir.exists():
        b1_files = [f.name for f in b1_dir.glob("*.json")]

    return {
        "lessons_dir": str(LESSONS_DIR),
        "lessons_dir_exists": LESSONS_DIR.exists(),
        "adults_dir_exists": adults_dir.exists(),
        "adult_levels": adult_levels,
        "b1_dir_exists": b1_dir.exists(),
        "b1_files": b1_files,
        "money_week_exists": (LESSONS_DIR / "adults" / "B1" / "money_week.json").exists(),
        "school_dir_exists": school_dir.exists(),
        "school_grades": [d.name for d in school_dir.iterdir() if d.is_dir()] if school_dir.exists() else [],
        "grade5_dir_exists": grade5_dir.exists(),
        "week1_school_exists": week1_school_path.exists(),
        "week1_school_path": str(week1_school_path)
    }


# ========== ОБРАТНАЯ СОВМЕСТИМОСТЬ (старые ссылки) ==========
# Эти эндпоинты нужны, чтобы старые ссылки продолжали работать

@router.get("/levels")
async def get_levels_old():
    """Обратная совместимость: перенаправляет на /adults/levels"""
    return await get_adult_levels()


@router.get("/weeks/{level}")
async def get_weeks_by_level_old(level: str):
    """Обратная совместимость: перенаправляет на /adults/weeks/{level}"""
    return await get_adult_weeks_by_level(level)


@router.get("/week/{level}/{week_id}")
async def get_week_old(level: str, week_id: str):
    """Обратная совместимость: перенаправляет на /adults/week/{level}/{week_id}"""
    return await get_adult_week(level, week_id)