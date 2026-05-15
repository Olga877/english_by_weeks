# backend/scripts/import_week.py
import json
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from database import SessionLocal, Week
from sqlalchemy.orm import Session


def import_week(json_path: str, db: Session):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    existing = db.query(Week).filter(Week.week_id == data['week_id']).first()
    if existing:
        print(f"Week {data['week_id']} already exists. Updating...")
        for key in ['title', 'description', 'level', 'icon', 'order_num', 'is_published', 'data']:
            setattr(existing, key, data.get(key))
    else:
        week = Week(**data)
        db.add(week)

    db.commit()
    print(f"Week {data['week_id']} imported successfully!")


if __name__ == "__main__":
    import sys

    db = SessionLocal()
    import_week(sys.argv[1], db)
    db.close()