#!/usr/bin/env python3
"""
Тестовая генерация ОДНОЙ недели
Запуск: python backend/scripts/test_generate_one.py
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
LESSONS_DIR = BASE_DIR / "data" / "lessons" / "school" / "grade5"
LESSONS_DIR.mkdir(parents=True, exist_ok=True)

# ========== УНИКАЛЬНЫЕ ДАННЫЕ ДЛЯ ТЕСТОВОЙ НЕДЕЛИ ==========

TEST_WEEK = {
    "week_id": "test_my_daily_routine",
    "title": "⏰ My Daily Routine",
    "description": "Учимся рассказывать о своём дне с Leo",
    "level": "5 класс",
    "icon": "⏰",
    "order_num": 999,
    "is_published": True,
    "days": [
        {
            "day": 1,
            "title": "Day 1: Morning Routine",
            "description": "Что Leo делает утром?",
            "grammar": {
                "title": "Present Simple for routines",
                "rule": "Present Simple используется для описания ПОВТОРЯЮЩИХСЯ действий (каждый день, обычно, всегда).\n\n✅ I wake up at 7 am every day.\n✅ She goes to school in the morning.\n\n🎯 Запомни: для he/she/it добавляем -s к глаголу!",
                "examples": [
                    "Leo: 'I wake up at 7 am. Actually, my mum wakes me up!' ⏰",
                    "Mia: 'She brushes her teeth every morning. Minty fresh!' 🦷",
                    "Sam: 'He has breakfast at 7:30. Cereal with milk!' 🥣"
                ],
                "keywords": "every day, usually, always, sometimes, never"
            },
            "vocabulary": [
                {"icon": "⏰", "word": "wake up", "transcription": "/weɪk ʌp/", "translation": "просыпаться",
                 "example": "I wake up at 7 am.", "context_translation": "просыпаться",
                 "context_example": "Я просыпаюсь в 7 утра."},
                {"icon": "🪥", "word": "brush teeth", "transcription": "/brʌʃ tiːθ/", "translation": "чистить зубы",
                 "example": "I brush my teeth every morning.", "context_translation": "чистить зубы",
                 "context_example": "Я чищу зубы каждое утро."},
                {"icon": "🥣", "word": "have breakfast", "transcription": "/hæv ˈbrekfəst/", "translation": "завтракать",
                 "example": "I have breakfast at 7:30.", "context_translation": "завтракать",
                 "context_example": "Я завтракаю в 7:30."},
                {"icon": "👕", "word": "get dressed", "transcription": "/get drest/", "translation": "одеваться",
                 "example": "I get dressed after breakfast.", "context_translation": "одеваться",
                 "context_example": "Я одеваюсь после завтрака."},
                {"icon": "🚌", "word": "go to school", "transcription": "/ɡəʊ tuː skuːl/", "translation": "идти в школу",
                 "example": "I go to school at 8 am.", "context_translation": "идти в школу",
                 "context_example": "Я иду в школу в 8 утра."}
            ],
            "exercises": [
                {"id": 1, "type": "multiple_choice", "question": "Leo says: 'I ___ at 7 am.'",
                 "options": ["wake up", "brush teeth", "have breakfast", "go to school"], "correct": "wake up",
                 "explanation": "Правильно! Leo просыпается в 7 утра. ⏰", "topic": "vocabulary"},
                {"id": 2, "type": "fill_blank", "question": "I ___ breakfast at 7:30.", "correct": "have",
                 "explanation": "have breakfast — завтракать. 🥣", "topic": "grammar"},
                {"id": 3, "type": "true_false", "question": "Leo wakes up at 8 am.", "correct": "False",
                 "explanation": "Leo просыпается в 7 am, не в 8!", "topic": "reading"}
            ]
        },
        {
            "day": 2,
            "title": "Day 2: School Day",
            "description": "Что Leo делает в школе?",
            "grammar": {
                "title": "Present Simple (negative and questions)",
                "rule": "Чтобы сказать, что мы НЕ делаем: don't/doesn't + глагол\n\n❌ I don't like Maths.\n❌ She doesn't watch TV in the morning.\n\nЧтобы спросить: Do/Does + подлежащее + глагол?\n\n❓ Do you like PE?\n❓ Does he play football?",
                "examples": [
                    "Leo: 'I don't like History. It's boring!' 📜",
                    "Mia: 'She doesn't watch TV before school. Her mum says no!' 📺",
                    "Sam: 'Do you like Science? I love experiments!' 🔬"
                ],
                "keywords": "don't, doesn't, do, does"
            },
            "vocabulary": [
                {"icon": "📐", "word": "Maths", "transcription": "/mæθs/", "translation": "математика",
                 "example": "Maths is hard but Leo likes it.", "context_translation": "математика",
                 "context_example": "Математика сложная, но Лео она нравится."},
                {"icon": "🇬🇧", "word": "English", "transcription": "/ˈɪŋɡlɪʃ/", "translation": "английский язык",
                 "example": "English helps understand songs!", "context_translation": "английский язык",
                 "context_example": "Английский помогает понимать песни!"},
                {"icon": "🔬", "word": "Science", "transcription": "/ˈsaɪəns/", "translation": "наука",
                 "example": "Science experiments are cool!", "context_translation": "наука",
                 "context_example": "Опыты по науке — это круто!"},
                {"icon": "🏃", "word": "PE", "transcription": "/ˌpiː ˈiː/", "translation": "физкультура",
                 "example": "PE is Leo's favourite!", "context_translation": "физкультура",
                 "context_example": "Физкультура — любимый предмет Лео!"},
                {"icon": "🍕", "word": "lunch", "transcription": "/lʌntʃ/", "translation": "обед",
                 "example": "Lunch is at 12 pm. Pizza day is best!", "context_translation": "обед",
                 "context_example": "Обед в 12 часов. День пиццы — лучший день!"}
            ],
            "exercises": [
                {"id": 1, "type": "multiple_choice", "question": "Leo ___ like History. He says it's boring.",
                 "options": ["doesn't", "don't", "isn't", "aren't"], "correct": "doesn't",
                 "explanation": "Leo doesn't like History — правильно! He/She/It + doesn't", "topic": "grammar"},
                {"id": 2, "type": "fill_blank", "question": "___ you like PE? (Do / Does)", "correct": "Do",
                 "explanation": "Do you like PE? — вопрос с YOU", "topic": "grammar"},
                {"id": 3, "type": "true_false", "question": "Leo loves Maths.", "correct": "False",
                 "explanation": "Leo thinks Maths is okay, but numbers make his brain hurt!", "topic": "reading"}
            ]
        },
        {
            "day": 3,
            "title": "Day 3: After School",
            "description": "Что Leo делает после уроков?",
            "grammar": {
                "title": "Adverbs of frequency",
                "rule": "Наречия частотности показывают, КАК ЧАСТО мы что-то делаем:\n\n🔹 always (100%) — всегда\n🔹 usually (80%) — обычно\n🔹 often (60%) — часто\n🔹 sometimes (40%) — иногда\n🔹 never (0%) — никогда\n\n📌 В предложении они ставятся ПЕРЕД смысловым глаголом, но ПОСЛЕ глагола to be.\n\n✅ I always do my homework.\n✅ She is never late.",
                "examples": [
                    "Leo: 'I always check my phone after school. 15 messages!' 📱",
                    "Mia: 'She sometimes watches TikTok before homework. Don't tell mum!' 🤫",
                    "Sam: 'He never does homework on Friday. Weekend mode!' 🎉"
                ],
                "keywords": "always, usually, often, sometimes, never"
            },
            "vocabulary": [
                {"icon": "🏠", "word": "go home", "transcription": "/ɡəʊ həʊm/", "translation": "идти домой",
                 "example": "I go home after school.", "context_translation": "идти домой",
                 "context_example": "Я иду домой после школы."},
                {"icon": "📱", "word": "check phone", "transcription": "/tʃek fəʊn/", "translation": "проверять телефон",
                 "example": "I check my phone first!", "context_translation": "проверять телефон",
                 "context_example": "Сначала я проверяю телефон!"},
                {"icon": "🎮", "word": "play games", "transcription": "/pleɪ geɪmz/", "translation": "играть в игры",
                 "example": "I play games for one hour.", "context_translation": "играть в игры",
                 "context_example": "Я играю в игры час."},
                {"icon": "📚", "word": "do homework", "transcription": "/duː ˈhəʊmwɜːk/", "translation": "делать уроки",
                 "example": "I do homework after games.", "context_translation": "делать уроки",
                 "context_example": "Я делаю уроки после игр."},
                {"icon": "🍕", "word": "have dinner", "transcription": "/hæv ˈdɪnə/", "translation": "ужинать",
                 "example": "We have dinner at 7 pm.", "context_translation": "ужинать",
                 "context_example": "Мы ужинаем в 7 вечера."}
            ],
            "exercises": [
                {"id": 1, "type": "fill_blank", "question": "Leo always ___ (check) his phone after school.",
                 "correct": "checks", "explanation": "He checks — для he/she/it добавляем -s! 📱", "topic": "grammar"},
                {"id": 2, "type": "multiple_choice", "question": "How often does Leo play games? He plays ___ .",
                 "options": ["always", "usually", "sometimes", "never"], "correct": "usually",
                 "explanation": "Leo usually plays games, but first he checks his phone!", "topic": "reading"},
                {"id": 3, "type": "true_false", "question": "Leo does homework before playing games.",
                 "correct": "False", "explanation": "Leo plays games first, then does homework!", "topic": "reading"}
            ]
        },
        {
            "day": 4,
            "title": "Day 4: Evening Time",
            "description": "Чем Leo занимается вечером?",
            "grammar": {
                "title": "Present Simple review",
                "rule": "Повторяем всё, что учили:\n\n📌 Утверждение: I play, He plays\n📌 Отрицание: I don't play, He doesn't play\n📌 Вопрос: Do you play? Does he play?\n📌 Наречия частотности: always, usually, often, sometimes, never",
                "examples": [
                    "Leo: 'I don't watch TV. I watch YouTube!' 📺",
                    "Mia: 'She often reads before bed. Harry Potter!' 📖",
                    "Sam: 'He never goes to bed early. Night owl!' 🦉"
                ],
                "keywords": "review, practice, test yourself"
            },
            "vocabulary": [
                {"icon": "📺", "word": "watch TV", "transcription": "/wɒtʃ ˌtiː ˈviː/",
                 "translation": "смотреть телевизор", "example": "I watch YouTube, not TV!",
                 "context_translation": "смотреть телевизор", "context_example": "Я смотрю YouTube, а не телевизор!"},
                {"icon": "📖", "word": "read a book", "transcription": "/riːd ə bʊk/", "translation": "читать книгу",
                 "example": "I read before bed.", "context_translation": "читать книгу",
                 "context_example": "Я читаю перед сном."},
                {"icon": "🛁", "word": "take a shower", "transcription": "/teɪk ə ˈʃaʊə/",
                 "translation": "принимать душ", "example": "I take a shower in the evening.",
                 "context_translation": "принимать душ", "context_example": "Я принимаю душ вечером."},
                {"icon": "🌙", "word": "go to bed", "transcription": "/ɡəʊ tuː bed/", "translation": "ложиться спать",
                 "example": "I go to bed at 10 pm.", "context_translation": "ложиться спать",
                 "context_example": "Я ложусь спать в 10 вечера."},
                {"icon": "📱", "word": "scroll phone", "transcription": "/skrəʊl fəʊn/",
                 "translation": "листать телефон", "example": "I scroll on my phone in bed... 🤫",
                 "context_translation": "листать телефон", "context_example": "Я листаю телефон в кровати... 🤫"}
            ],
            "exercises": [
                {"id": 1, "type": "correct_mistake", "question": "Leo go to bed at 10 pm.",
                 "correct": "Leo goes to bed at 10 pm.", "explanation": "Leo — he, поэтому goes, а не go!",
                 "topic": "grammar"},
                {"id": 2, "type": "multiple_choice", "question": "What does Leo do before bed?",
                 "options": ["Watches TV", "Reads a book", "Scrolls on his phone", "Plays games"],
                 "correct": "Scrolls on his phone", "explanation": "Leo scrolls on his phone for another hour... 🤫",
                 "topic": "reading"},
                {"id": 3, "type": "true_false", "question": "Leo goes to bed early.", "correct": "False",
                 "explanation": "Leo goes to bed at 10 pm, but scrolls on phone for another hour!", "topic": "reading"}
            ]
        },
        {
            "day": 5,
            "title": "Day 5: Review Day",
            "description": "Повторяем всё о дне Leo",
            "grammar": {
                "title": "Present Simple — full review",
                "rule": "Сегодня проверяем, как хорошо ты усвоил Present Simple!\n\n📌 Вспомни:\n• Для I/You/We/They — глагол без изменений\n• Для He/She/It — глагол + S\n• Отрицания: don't / doesn't + глагол\n• Вопросы: Do / Does + подлежащее + глагол",
                "examples": [
                    "Leo usually plays games after school. He doesn't do homework first!",
                    "Mia often watches TikTok. Her mum doesn't like it!",
                    "Sam never wakes up early on Sunday. He loves sleeping!"
                ],
                "keywords": "review, practice, quiz"
            },
            "vocabulary": [],
            "exercises": [
                {"id": 1, "type": "multiple_choice", "question": "Leo ___ his phone after school.",
                 "options": ["check", "checks", "checking", "to check"], "correct": "checks",
                 "explanation": "He checks — для he/she/it добавляем -s!", "topic": "grammar"},
                {"id": 2, "type": "fill_blank", "question": "Mia ___ (not/like) getting up early.",
                 "correct": "doesn't like", "explanation": "She doesn't like — отрицание в Present Simple",
                 "topic": "grammar"},
                {"id": 3, "type": "fill_blank", "question": "___ you play video games after school? (Do / Does)",
                 "correct": "Do", "explanation": "Do you — вопрос с YOU", "topic": "grammar"},
                {"id": 4, "type": "correct_mistake", "question": "Sam go to school by bus.",
                 "correct": "Sam goes to school by bus.", "explanation": "Sam — he, поэтому goes", "topic": "grammar"}
            ]
        },
        {
            "day": 6,
            "title": "Day 6: Reading — Leo's Typical Day",
            "description": "Читаем историю о дне Leo",
            "grammar": {
                "title": "Reading Comprehension",
                "rule": "Сегодня читаем текст и отвечаем на вопросы. Будь внимателен! 📖",
                "examples": [],
                "keywords": "reading, comprehension, questions"
            },
            "vocabulary": [],
            "exercises": [
                {
                    "id": 1,
                    "type": "reading",
                    "question": "What time does Leo wake up?",
                    "options": ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM"],
                    "correct": "7:00 AM",
                    "explanation": "Leo says: 'I wake up at 7:00 AM'",
                    "readingText": "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n⏰ A DAY IN LEO'S LIFE\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🌅 MORNING\nI wake up at 7:00 AM. Actually, my mum wakes me up. Three alarms don't work!\nI brush my teeth and have breakfast. Cereal with milk — quick and easy!\nI leave home at 8:15 AM. My school is near my house.\n\n🏫 SCHOOL\nLessons start at 8:30 AM. Maths, English, Science...\nThe best part is lunch at 12:00 PM. Pizza day is the best day!\nAfter lunch, we have PE. That's when I wake up!\n\n🌆 AFTER SCHOOL\nI go home and check my phone. 15 messages from friends!\nI play video games for one hour. Mum says 'Only one hour!'\nThen I do my homework. 😭\n\n🌙 EVENING\nDinner at 7:00 PM. We eat together as a family.\nI watch YouTube for 30 minutes.\nI go to bed at 10:00 PM. But I scroll on my phone for another hour... 🤫\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                    "topic": "reading"
                },
                {
                    "id": 2,
                    "type": "reading",
                    "question": "What does Leo eat for breakfast?",
                    "options": ["Pizza", "Cereal with milk", "Sandwich", "Eggs"],
                    "correct": "Cereal with milk",
                    "explanation": "Leo says: 'Cereal with milk — quick and easy!'",
                    "readingText": "",
                    "topic": "reading"
                },
                {
                    "id": 3,
                    "type": "reading",
                    "question": "What time does Leo have lunch?",
                    "options": ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"],
                    "correct": "12:00 PM",
                    "explanation": "Lunch is at 12:00 PM. Pizza day is the best!",
                    "readingText": "",
                    "topic": "reading"
                },
                {
                    "id": 4,
                    "type": "true_false",
                    "question": "Leo does homework before playing games.",
                    "correct": "False",
                    "explanation": "Leo plays games first, then does homework!",
                    "topic": "reading"
                }
            ]
        }
    ]
}


def main():
    print("🧪 Тестовая генерация ОДНОЙ недели")
    print("=" * 50)

    week_id = TEST_WEEK["week_id"]
    file_path = LESSONS_DIR / f"{week_id}.json"

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(TEST_WEEK, f, ensure_ascii=False, indent=4)

    print(f"✅ Создана тестовая неделя: {file_path}")
    print()
    print("📋 Чтобы проверить в браузере:")
    print(f"http://localhost:8000/static/school_week.html?grade=grade5&week={week_id}")
    print()
    print("💡 После проверки удалите файл или переместите в архив.")
    print("   rm backend/data/lessons/school/grade5/test_my_daily_routine.json")


if __name__ == "__main__":
    main()