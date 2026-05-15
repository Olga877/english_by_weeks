#!/usr/bin/env python3
"""
Генератор УНИКАЛЬНЫХ недель для 5 класса
Каждая неделя получает ПОЛНОСТЬЮ УНИКАЛЬНЫЙ контент

Запуск: python backend/scripts/generate_all_weeks.py
"""

import json
import random
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
LESSONS_DIR = BASE_DIR / "data" / "lessons" / "school" / "grade5"
LESSONS_DIR.mkdir(parents=True, exist_ok=True)

# ========== УНИКАЛЬНЫЕ ТЕКСТЫ ДЛЯ КАЖДОЙ НЕДЕЛИ ==========
# Каждый текст — отдельная история, не повторяется

TEXTS = {
    # Module 1
    "module1_capital_letters": {
        "title": "Leo's Email Mistake",
        "text": """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 LEO'S EMAIL MISTAKE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Leo wrote an email to his pen pal in England:

'hi! my name is leo. i am from russia. i like playing video games. my favourite day is friday. see you later!'

His teacher, Ms. Johnson, read the email.

'Leo, you forgot capital letters!' she said.

'In English, we use capital letters for:'

🔹 The first letter of a sentence: 'Hi!'
🔹 The word 'I': 'I am Leo'
🔹 Days of the week: 'Friday'
🔹 Names of people: 'Leo'
🔹 Countries and cities: 'Russia'

Leo fixed his email:

'Hi! My name is Leo. I am from Russia. I like playing video games. My favourite day is Friday. See you later!'

'Much better!' Ms. Johnson smiled.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        "questions": [
            {"q": "What did Leo write?", "opts": ["A letter", "An email", "A postcard", "A note"],
             "correct": "An email"},
            {"q": "Where is Leo's pen pal from?", "opts": ["Russia", "USA", "England", "Australia"],
             "correct": "England"},
            {"q": "What is Leo's favourite day?", "opts": ["Monday", "Wednesday", "Friday", "Sunday"],
             "correct": "Friday"}
        ]
    },

    "module1_greetings": {
        "title": "Meeting a New Friend",
        "text": """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👋 MEETING A NEW FRIEND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mia was at the park. A new girl sat on the bench.

'Hi!' Mia said. 'I'm Mia. What's your name?'

'Hello! I'm Emma,' the girl smiled.

'Nice to meet you, Emma! How are you?'

'I'm fine, thanks. And you?'

'Good, thanks! Do you go to Oakwood Academy?'

'Yes! I'm in 5th grade.'

'Me too! What's your favourite subject?'

'I like Art. I love drawing.'

'Mia, time to go home!' Mia's mum called.

'Goodbye, Emma! See you at school!'

'Bye, Mia! See you tomorrow!'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        "questions": [
            {"q": "Where did Mia meet Emma?", "opts": ["At school", "At the park", "At the mall", "At the cinema"],
             "correct": "At the park"},
            {"q": "What is Emma's favourite subject?", "opts": ["Maths", "English", "Art", "Science"],
             "correct": "Art"},
            {"q": "What grade are Mia and Emma in?", "opts": ["4th", "5th", "6th", "7th"], "correct": "5th"}
        ]
    },

    "module1_schools": {
        "title": "Schools Around the World",
        "text": """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏫 SCHOOLS AROUND THE WORLD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Leo's class made a project about schools in different countries.

🇬🇧 ENGLAND
'In England, students wear uniforms,' Leo said. 'They have blazers and ties. School starts at 9 am and finishes at 3:30 pm.'

🇷🇺 RUSSIA
'In Russia, some schools have uniforms, but not all,' Mia added. 'School starts at 8:30 am. We have lessons until 2:30 pm.'

🇯🇵 JAPAN
Sam presented Japan. 'In Japan, students clean their own school! They don't have cleaners. Also, they eat lunch in their classrooms.'

🇧🇷 BRAZIL
'In Brazil, school starts at 7 am!' Emma said. 'But they finish at 12 pm. And they have four months of summer holiday!'

'WOW!' everyone said. 'Every country is different!'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        "questions": [
            {"q": "What time does school start in England?", "opts": ["8:00 am", "8:30 am", "9:00 am", "9:30 am"],
             "correct": "9:00 am"},
            {"q": "What do Japanese students do themselves?",
             "opts": ["Cook lunch", "Clean the school", "Teach lessons", "Drive buses"], "correct": "Clean the school"},
            {"q": "How many months of summer holiday do Brazilian students have?",
             "opts": ["Two", "Three", "Four", "Five"], "correct": "Four"}
        ]
    },

    # Module 2
    "module2_countries": {
        "title": "Where in the World?",
        "text": """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌎 WHERE IN THE WORLD?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The class played a guessing game.

'Guess the country!' Ms. Johnson said.

'This country is famous for pizza and pasta. The capital is Rome.'

'Italy!' Leo shouted.

'Correct! What nationality are people from Italy?'

'Italian!'

'Next: this country is very big. It has kangaroos and koalas. The capital is Canberra.'

'Australia!' Mia said.

'And the nationality?'

'Australian!'

'Last one: this country has bagpipes and kilts. The capital is Edinburgh.'

'Scotland!' Sam said. 'But Scotland is part of the UK, right?'

'Yes! People from Scotland are Scottish.'

'The UK has four countries: England, Scotland, Wales and Northern Ireland.'

'That's why British people can be English, Scottish, Welsh or Northern Irish!' Leo understood.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        "questions": [
            {"q": "What is the capital of Italy?", "opts": ["Venice", "Florence", "Rome", "Naples"], "correct": "Rome"},
            {"q": "Which animal is from Australia?", "opts": ["Tiger", "Elephant", "Kangaroo", "Panda"],
             "correct": "Kangaroo"},
            {"q": "How many countries are in the UK?", "opts": ["Two", "Three", "Four", "Five"], "correct": "Four"}
        ]
    },

    "module2_possessions": {
        "title": "What's in Your Bag?",
        "text": """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎒 WHAT'S IN YOUR BAG?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'Let's check what everyone has in their school bags!' Ms. Johnson said.

Leo opened his bag. 'I've got three pens, a pencil, a ruler, and... a sandwich from yesterday!'

'Leo! Clean your bag!' Mia laughed.

Mia showed her bag. 'I've got a notebook, a textbook, a pencil case, and my phone.'

'Phones aren't allowed in class,' Ms. Johnson reminded.

'I know. It's off!' Mia smiled.

Sam's bag was very heavy. 'I've got five textbooks, two notebooks, a laptop, and a water bottle.'

'Why so many textbooks?' the teacher asked.

'Today we have Maths, English, Science, History and Geography!'

'Poor Sam!' everyone laughed.

'Don't worry, I've also got some chocolate,' Sam whispered.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        "questions": [
            {"q": "What did Leo find in his bag?", "opts": ["An apple", "A sandwich", "A toy", "A sock"],
             "correct": "A sandwich"},
            {"q": "How many textbooks does Sam have?", "opts": ["Two", "Three", "Four", "Five"], "correct": "Five"},
            {"q": "What did Sam have besides textbooks?", "opts": ["Chips", "Chocolate", "Biscuits", "Fruit"],
             "correct": "Chocolate"}
        ]
    },

    "module2_collections": {
        "title": "My Stamp Collection",
        "text": """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💎 MY STAMP COLLECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'For our next project, talk about your collection,' Ms. Johnson said.

Leo went first. 'I collect stamps. I've got 47 stamps from 15 countries.'

'Show us your favourite!'

Leo showed a stamp from Japan. 'It has Mount Fuji. It's beautiful!'

Mia went next. 'I collect key rings. I've got 35. My favourite is from Paris — a tiny Eiffel Tower.'

'Very nice!'

Sam looked nervous. 'I... I don't have a collection.'

'That's OK, Sam. You can start one!'

'Actually... I collect video game achievements. I've got 127 of them!'

'That counts!' the class laughed.

'What about you, Emma?'

'I collect seashells. I've got 52 shells from different beaches.'

'Everyone has something special!' Ms. Johnson smiled.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        "questions": [
            {"q": "How many stamps does Leo have?", "opts": ["35", "47", "52", "127"], "correct": "47"},
            {"q": "What does Mia collect?", "opts": ["Stamps", "Key rings", "Seashells", "Coins"],
             "correct": "Key rings"},
            {"q": "What does Emma collect?", "opts": ["Stamps", "Key rings", "Seashells", "Achievements"],
             "correct": "Seashells"}
        ]
    },

    "module2_souvenirs": {
        "title": "Shopping for Souvenirs",
        "text": """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛍️ SHOPPING FOR SOUVENIRS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Leo's aunt visited from London. She brought souvenirs.

'This is for you, Leo!' She gave him a red bus model.

'Wow! Thank you!'

'And for you, Mia — a phone box key ring!'

'It's so cute! I love it!'

Sam got a small guard doll. 'He looks so serious!' Sam laughed.

'For Emma — a royal family mug.'

'My mum will love this!'

'And for the whole class — English tea and biscuits!'

'Thank you!' everyone cheered.

Leo's aunt told them about London. 'You must visit one day. See Big Ben, the London Eye, and Buckingham Palace!'

'One day...' Leo dreamed.

'Start saving your pocket money!' she winked.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        "questions": [
            {"q": "What souvenir did Leo get?", "opts": ["A key ring", "A bus model", "A guard doll", "A mug"],
             "correct": "A bus model"},
            {"q": "Who got the guard doll?", "opts": ["Leo", "Mia", "Sam", "Emma"], "correct": "Sam"},
            {"q": "What did Leo's aunt bring for the whole class?",
             "opts": ["Chocolate", "Toys", "Tea and biscuits", "Postcards"], "correct": "Tea and biscuits"}
        ]
    }
}

# ========== УНИКАЛЬНЫЕ ГРАММАТИЧЕСКИЕ ПРАВИЛА ==========
GRAMMAR_RULES = {
    "capitalisation": {
        "title": "Заглавные буквы",
        "rule": "В английском языке заглавные буквы используются:\n\n✅ В начале предложения: 'Hello!'\n✅ Для местоимения 'I': 'I am Leo'\n✅ Для дней недели: 'Monday', 'Friday'\n✅ Для имён людей: 'Leo', 'Mia'\n✅ Для стран и городов: 'Russia', 'Moscow'"
    },
    "present_simple": {
        "title": "Present Simple",
        "rule": "Present Simple используется для:\n\n✅ Фактов: 'The sun rises in the east'\n✅ Привычек: 'I drink coffee every morning'\n✅ Регулярных действий: 'She plays tennis on Sundays'\n\n📌 Для he/she/it добавляем -s к глаголу"
    },
    "have_got": {
        "title": "Have got",
        "rule": "Have got используется, чтобы сказать, ЧТО У ТЕБЯ ЕСТЬ.\n\n✅ I have got / I've got\n✅ He/She has got\n❌ I haven't got\n❌ He hasn't got\n❓ Have you got? / Has she got?"
    },
    "to_be_present": {
        "title": "Глагол to be",
        "rule": "Глагол to be — самый важный глагол в английском.\n\n✅ I am\n✅ You/We/They are\n✅ He/She/It is"
    },
    "there_is_are": {
        "title": "There is / There are",
        "rule": "Конструкция there is/there are говорит о том, ЧТО ГДЕ-ТО НАХОДИТСЯ.\n\n✅ There is + единственное число\n✅ There are + множественное число\n❓ Is there? / Are there?"
    },
    "prepositions_of_place": {
        "title": "Предлоги места",
        "rule": "Предлоги места показывают, ГДЕ находится предмет.\n\n📍 on — на\n📍 under — под\n📍 behind — за\n📍 between — между\n📍 next to — рядом с\n📍 in front of — перед"
    },
    "present_continuous": {
        "title": "Present Continuous",
        "rule": "Present Continuous используется, когда действие происходит ПРЯМО СЕЙЧАС.\n\n📌 Ключевые слова: now, at the moment\n✅ I am + -ing (I am reading)\n✅ She is + -ing (She is watching)\n✅ They are + -ing (They are playing)"
    },
    "past_simple": {
        "title": "Past Simple",
        "rule": "Past Simple используется для действий, которые ЗАКОНЧИЛИСЬ в прошлом.\n\n📌 Ключевые слова: yesterday, last week, ago\n✅ Правильные глаголы: +ed (play → played)\n✅ Неправильные глаголы: надо запомнить (go → went)"
    },
    "future_simple": {
        "title": "Future Simple",
        "rule": "Future Simple используется для действий, которые ПРОИЗОЙДУТ в будущем.\n\n📌 Ключевые слова: tomorrow, next week\n✅ will + глагол: 'I will call you'"
    },
    "some_any_much_many": {
        "title": "Some / Any / Much / Many",
        "rule": "Эти слова говорят о КОЛИЧЕСТВЕ.\n\n✅ some — в утверждениях\n✅ any — в вопросах и отрицаниях\n✅ much — с неисчисляемыми (water)\n✅ many — с исчисляемыми (apples)"
    }
}


# ========== ГЕНЕРАЦИЯ УНИКАЛЬНЫХ ПРИМЕРОВ ДЛЯ КАЖДОЙ НЕДЕЛИ ==========
def get_examples(week_id, grammar_key):
    """Возвращает уникальные примеры для конкретной недели"""

    examples_by_week = {
        "module1_capital_letters": [
            "i love english → I love English ✅",
            "my name is leo → My name is Leo ✅",
            "i am from russia → I am from Russia ✅"
        ],
        "module1_greetings": [
            "A: 'Hello! How are you?' B: 'I'm fine, thanks!' 👋",
            "A: 'Nice to meet you!' B: 'Nice to meet you too!' 🤝",
            "A: 'Goodbye! See you later!' B: 'See you!' 👋"
        ],
        "module1_schools": [
            "In England, students wear uniforms. 👔",
            "In Japan, students clean their school. 🧹",
            "In Brazil, school starts at 7 am! ⏰"
        ],
        "module2_countries": [
            "I am from Russia. I am Russian. 🇷🇺",
            "She is from Italy. She is Italian. 🇮🇹",
            "They are from Japan. They are Japanese. 🇯🇵"
        ],
        "module2_possessions": [
            "I have got a pen. ✒️",
            "She has got a notebook. 📓",
            "They haven't got a ruler. 📏"
        ],
        "module2_collections": [
            "I have got 47 stamps in my collection. 💎",
            "She has got 35 key rings from different countries. 🔑",
            "He collects video game achievements. 🏆"
        ],
        "module2_souvenirs": [
            "This red bus is from London. 🚌",
            "This key ring is from Paris. 🗼",
            "This doll is from Russia. 🪆"
        ]
    }

    default = [
        f"Example 1 for {week_id}",
        f"Example 2 for {week_id}",
        f"Example 3 for {week_id}"
    ]

    return examples_by_week.get(week_id, default)


# ========== ГЕНЕРАЦИЯ УНИКАЛЬНОЙ ЛЕКСИКИ ==========
def get_vocab(week_id):
    """Возвращает уникальный словарь для конкретной недели"""

    vocab_by_week = {
        "module1_capital_letters": [
            {"word": "capital letter", "trans": "заглавная буква", "icon": "✏️",
             "example": "Start with a capital letter."},
            {"word": "sentence", "trans": "предложение", "icon": "📝", "example": "This is a sentence."},
            {"word": "name", "trans": "имя", "icon": "👤", "example": "My name is Leo."},
            {"word": "country", "trans": "страна", "icon": "🌍", "example": "Russia is my country."},
            {"word": "email", "trans": "письмо", "icon": "📧", "example": "I write an email."}
        ],
        "module1_greetings": [
            {"word": "hello", "trans": "здравствуйте", "icon": "👋", "example": "Hello! How are you?"},
            {"word": "hi", "trans": "привет", "icon": "👋", "example": "Hi! Nice to meet you."},
            {"word": "goodbye", "trans": "до свидания", "icon": "👋", "example": "Goodbye! See you later."},
            {"word": "fine", "trans": "хорошо", "icon": "😊", "example": "I'm fine, thanks."},
            {"word": "meet", "trans": "встречать", "icon": "🤝", "example": "Nice to meet you."}
        ],
        "module1_schools": [
            {"word": "uniform", "trans": "форма", "icon": "👔", "example": "Students wear a uniform."},
            {"word": "subject", "trans": "предмет", "icon": "📚", "example": "Maths is my favourite subject."},
            {"word": "grade", "trans": "класс", "icon": "🎓", "example": "I am in 5th grade."},
            {"word": "project", "trans": "проект", "icon": "📁", "example": "We have a school project."},
            {"word": "country", "trans": "страна", "icon": "🌍",
             "example": "Different countries have different schools."}
        ],
        "module2_countries": [
            {"word": "country", "trans": "страна", "icon": "🌍", "example": "Russia is a big country."},
            {"word": "nationality", "trans": "национальность", "icon": "🪪", "example": "What is your nationality?"},
            {"word": "capital", "trans": "столица", "icon": "🏛️", "example": "Moscow is the capital of Russia."},
            {"word": "language", "trans": "язык", "icon": "🗣️", "example": "I speak Russian and English."},
            {"word": "famous", "trans": "известный", "icon": "⭐", "example": "Italy is famous for pizza."}
        ],
        "module2_possessions": [
            {"word": "notebook", "trans": "тетрадь", "icon": "📓", "example": "I write in my notebook."},
            {"word": "textbook", "trans": "учебник", "icon": "📚", "example": "My textbook is heavy."},
            {"word": "ruler", "trans": "линейка", "icon": "📏", "example": "I need a ruler."},
            {"word": "pencil case", "trans": "пенал", "icon": "✏️", "example": "My pencil case is blue."},
            {"word": "water bottle", "trans": "бутылка воды", "icon": "💧", "example": "Don't forget your water bottle!"}
        ],
        "module2_collections": [
            {"word": "stamp", "trans": "марка", "icon": "✉️", "example": "I collect stamps."},
            {"word": "collection", "trans": "коллекция", "icon": "💎", "example": "My collection is big!"},
            {"word": "collect", "trans": "коллекционировать", "icon": "📦", "example": "Do you collect anything?"},
            {"word": "key ring", "trans": "брелок", "icon": "🔑", "example": "This key ring is from Paris."},
            {"word": "achievement", "trans": "достижение", "icon": "🏆", "example": "I got a new achievement!"}
        ],
        "module2_souvenirs": [
            {"word": "souvenir", "trans": "сувенир", "icon": "🎁", "example": "I bought a souvenir."},
            {"word": "bus", "trans": "автобус", "icon": "🚌", "example": "The red bus is from London."},
            {"word": "doll", "trans": "кукла", "icon": "🪆", "example": "This is a Russian doll."},
            {"word": "mug", "trans": "кружка", "icon": "☕", "example": "A mug with the royal family."},
            {"word": "key ring", "trans": "брелок", "icon": "🔑", "example": "A phone box key ring."}
        ]
    }

    default = [
        {"word": f"word_{i}", "trans": f"слово_{i}", "icon": "📖", "example": f"Example for word_{i}"}
        for i in range(1, 6)
    ]

    return vocab_by_week.get(week_id, default)


# ========== ГЕНЕРАЦИЯ УНИКАЛЬНЫХ УПРАЖНЕНИЙ ==========
def get_exercises(week_id, day_num):
    """Возвращает уникальные упражнения для конкретной недели и дня"""

    # Получаем уникальные вопросы из текста
    text_data = TEXTS.get(week_id)
    questions = text_data["questions"] if text_data else []

    exercises = []

    # Упражнение 1: Multiple choice (по тексту)
    if questions and day_num >= 5:
        q = questions[0]
        exercises.append({
            "id": 1,
            "type": "multiple_choice",
            "question": q["q"],
            "options": q["opts"],
            "correct": q["correct"],
            "explanation": f"Правильный ответ: {q['correct']}. 👍",
            "topic": "reading"
        })
    else:
        exercises.append({
            "id": 1,
            "type": "multiple_choice",
            "question": get_mc_question(week_id, day_num),
            "options": get_mc_options(week_id, day_num),
            "correct": get_mc_correct(week_id, day_num),
            "explanation": get_mc_explanation(week_id, day_num),
            "topic": "vocabulary"
        })

    # Упражнение 2: Fill in the blank
    exercises.append({
        "id": 2,
        "type": "fill_blank",
        "question": get_fill_question(week_id, day_num),
        "correct": get_fill_correct(week_id, day_num),
        "explanation": get_fill_explanation(week_id, day_num),
        "topic": "grammar"
    })

    # Упражнение 3: True or False
    if questions and day_num >= 5:
        q = questions[1] if len(questions) > 1 else questions[0]
        exercises.append({
            "id": 3,
            "type": "true_false",
            "question": q["q"],
            "correct": q["correct"],
            "explanation": f"Проверь по тексту! Правильный ответ: {q['correct']}",
            "topic": "reading"
        })
    else:
        exercises.append({
            "id": 3,
            "type": "true_false",
            "question": get_tf_question(week_id, day_num),
            "correct": get_tf_correct(week_id, day_num),
            "explanation": get_tf_explanation(week_id, day_num),
            "topic": "grammar"
        })

    # Упражнение 4: Correct the mistake (для дней 4+)
    if day_num >= 4:
        exercises.append({
            "id": 4,
            "type": "correct_mistake",
            "question": get_correct_question(week_id),
            "correct": get_correct_answer(week_id),
            "explanation": get_correct_explanation(week_id),
            "topic": "grammar"
        })

    return exercises


# ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ УПРАЖНЕНИЙ ==========
def get_mc_question(week_id, day_num):
    questions = {
        "module1_capital_letters": "What do we use at the beginning of a sentence?",
        "module1_greetings": "What do you say when you meet someone for the first time?",
        "module1_schools": "What do students in England wear?",
        "module2_countries": "What is the capital of Russia?",
        "module2_possessions": "What do you write in?",
        "module2_collections": "What does Leo collect?",
        "module2_souvenirs": "What did Leo's aunt bring from London?"
    }
    return questions.get(week_id, "What is this week's topic?")


def get_mc_options(week_id, day_num):
    options = {
        "module1_capital_letters": ["A period", "A capital letter", "A question mark", "A comma"],
        "module1_greetings": ["Goodbye", "Nice to meet you", "See you later", "Good night"],
        "module1_schools": ["Jeans", "Uniform", "T-shirts", "Hoodies"],
        "module2_countries": ["St Petersburg", "Novosibirsk", "Moscow", "Kazan"],
        "module2_possessions": ["Notebook", "Textbook", "Pencil case", "All of the above"],
        "module2_collections": ["Coins", "Key rings", "Stamps", "Seashells"],
        "module2_souvenirs": ["Chocolate", "A bus model", "Tea", "Biscuits"]
    }
    return options.get(week_id, ["Option A", "Option B", "Option C", "Option D"])


def get_mc_correct(week_id, day_num):
    correct = {
        "module1_capital_letters": "A capital letter",
        "module1_greetings": "Nice to meet you",
        "module1_schools": "Uniform",
        "module2_countries": "Moscow",
        "module2_possessions": "All of the above",
        "module2_collections": "Stamps",
        "module2_souvenirs": "A bus model"
    }
    return correct.get(week_id, "Option A")


def get_mc_explanation(week_id, day_num):
    return "Правильно! 👍"


def get_fill_question(week_id, day_num):
    questions = {
        "module1_capital_letters": "___ am Leo. (I / i)",
        "module1_greetings": "Nice to ___ you. (meet / met)",
        "module1_schools": "In England, students ___ uniforms. (wear / wears)",
        "module2_countries": "I ___ from Russia. (am / is)",
        "module2_possessions": "I ___ got a pen. (have / has)",
        "module2_collections": "Leo ___ 47 stamps. (have / has)",
        "module2_souvenirs": "This key ring ___ from Paris. (is / are)"
    }
    return questions.get(week_id, "Leo ___ (play) games every day.")


def get_fill_correct(week_id, day_num):
    correct = {
        "module1_capital_letters": "I",
        "module1_greetings": "meet",
        "module1_schools": "wear",
        "module2_countries": "am",
        "module2_possessions": "have",
        "module2_collections": "has",
        "module2_souvenirs": "is"
    }
    return correct.get(week_id, "plays")


def get_fill_explanation(week_id, day_num):
    return "Правильно! 🎯"


def get_tf_question(week_id, day_num):
    questions = {
        "module1_capital_letters": "We write 'monday' with a capital letter.",
        "module1_greetings": "'Goodbye' means hello.",
        "module1_schools": "School in England starts at 8 am.",
        "module2_countries": "The capital of Italy is Rome.",
        "module2_possessions": "Leo's bag was clean.",
        "module2_collections": "Leo has 100 stamps.",
        "module2_souvenirs": "Leo's aunt brought souvenirs from Paris."
    }
    return questions.get(week_id, "Leo likes doing homework.")


def get_tf_correct(week_id, day_num):
    correct = {
        "module1_capital_letters": "True",
        "module1_greetings": "False",
        "module1_schools": "False",
        "module2_countries": "True",
        "module2_possessions": "False",
        "module2_collections": "False",
        "module2_souvenirs": "False"
    }
    return correct.get(week_id, "False")


def get_tf_explanation(week_id, day_num):
    return "Проверь по тексту! 📖"


def get_correct_question(week_id):
    questions = {
        "module1_capital_letters": "i am from russia.",
        "module1_greetings": "Hello! How is you?",
        "module1_schools": "Students in England wears uniform.",
        "module2_countries": "She are from Italy.",
        "module2_possessions": "She have got a notebook.",
        "module2_collections": "Leo have 47 stamps.",
        "module2_souvenirs": "The key ring are from London."
    }
    return questions.get(week_id, "Leo go to school every day.")


def get_correct_answer(week_id):
    answers = {
        "module1_capital_letters": "I am from Russia.",
        "module1_greetings": "Hello! How are you?",
        "module1_schools": "Students in England wear uniforms.",
        "module2_countries": "She is from Italy.",
        "module2_possessions": "She has got a notebook.",
        "module2_collections": "Leo has 47 stamps.",
        "module2_souvenirs": "The key ring is from London."
    }
    return answers.get(week_id, "Leo goes to school every day.")


def get_correct_explanation(week_id):
    return "Исправь ошибку в грамматике! ✏️"


# ========== ГЕНЕРАЦИЯ ОДНОЙ НЕДЕЛИ ==========
def generate_week(week_config, order_num):
    """Генерирует одну уникальную неделю"""

    week_id = week_config["week_id"]
    title = week_config["title"]
    icon = week_config["icon"]
    grammar_key = week_config["grammar"]

    # Получаем уникальный текст
    text_data = TEXTS.get(week_id)
    reading_text = text_data["text"] if text_data else "Text not found"

    # Получаем уникальные примеры
    examples = get_examples(week_id, grammar_key)

    # Получаем уникальный словарь
    vocab_items = get_vocab(week_id)

    # Получаем грамматическое правило
    grammar = GRAMMAR_RULES.get(grammar_key, GRAMMAR_RULES["present_simple"])

    days = []

    for day_num in range(1, 7):
        day_titles = {
            1: f"Let's start! 🚀",
            2: f"Grammar time! 📖",
            3: f"New words! 📚",
            4: f"Practice! ✍️",
            5: f"Almost there! 🎯",
            6: f"Reading time! 📖"
        }

        day_descriptions = {
            1: f"Введение в тему",
            2: f"Изучаем {grammar['title']}",
            3: "Учим новые слова и фразы",
            4: "Тренируемся и закрепляем",
            5: "Повторяем и готовимся к чтению",
            6: "Читаем историю и отвечаем на вопросы"
        }

        day = {
            "day": day_num,
            "title": f"День {day_num}: {day_titles[day_num]}",
            "description": f"Уровень A0. {day_descriptions[day_num]}",
            "grammar": {
                "title": grammar["title"] if day_num <= 2 else "Практика",
                "rule": grammar["rule"] if day_num <= 2 else "Применяем правила на практике!",
                "examples": examples[:3] if day_num <= 2 else examples[3:6] if len(examples) > 3 else examples,
                "keywords": "practice, speak, listen, write"
            },
            "vocabulary": [],
            "exercises": get_exercises(week_id, day_num)
        }

        # Добавляем словарь в дни 3-4
        if day_num == 3 or day_num == 4:
            for item in vocab_items[:5]:
                day["vocabulary"].append({
                    "icon": item["icon"],
                    "word": item["word"],
                    "transcription": f"/{item['word']}/",
                    "translation": item["trans"],
                    "example": item["example"],
                    "context_translation": item["trans"],
                    "context_example": item["example"]
                })

        # Добавляем текст для чтения в день 6
        if day_num == 6 and text_data:
            questions = text_data["questions"]
            for i, q in enumerate(questions[:3]):
                day["exercises"].insert(i, {
                    "id": 10 + i,
                    "type": "reading",
                    "question": q["q"],
                    "options": q["opts"],
                    "correct": q["correct"],
                    "explanation": f"Правильный ответ: {q['correct']}. Подробности в тексте!",
                    "readingText": reading_text,
                    "topic": "reading"
                })

        days.append(day)

    return {
        "week_id": week_id,
        "title": title,
        "description": f"Учим {week_id.replace('_', ' ')} с Leo, Mia и Sam. Уровень A0. 6 дней.",
        "level": "5 класс",
        "icon": icon,
        "order_num": order_num,
        "is_published": True,
        "days": days
    }


# ========== ВСЕ НЕДЕЛИ ДЛЯ ГЕНЕРАЦИИ ==========
ALL_WEEKS = [
    # Module 1
    {"week_id": "module1_capital_letters", "title": "✏️ Big or Small Letters?", "icon": "✏️",
     "grammar": "capitalisation"},
    {"week_id": "module1_greetings", "title": "👋 Hello, How Are You?", "icon": "👋", "grammar": "present_simple"},
    {"week_id": "module1_schools", "title": "🏫 My School, Your School", "icon": "🏫", "grammar": "present_simple"},

    # Module 2
    {"week_id": "module2_countries", "title": "🌎 Where Are You From?", "icon": "🌎", "grammar": "to_be_present"},
    {"week_id": "module2_possessions", "title": "🎒 What's in Your Bag?", "icon": "🎒", "grammar": "have_got"},
    {"week_id": "module2_collections", "title": "💎 My Cool Collection", "icon": "💎", "grammar": "have_got"},
    {"week_id": "module2_souvenirs", "title": "🛍️ Let's Go Shopping!", "icon": "🛍️", "grammar": "present_simple"},
]


# ========== ЗАПУСК ==========
def main():
    print("🚀 ГЕНЕРАЦИЯ УНИКАЛЬНЫХ НЕДЕЛЬ ДЛЯ 5 КЛАССА")
    print("=" * 70)
    print("✅ КАЖДАЯ НЕДЕЛЯ ПОЛУЧАЕТ УНИКАЛЬНЫЙ КОНТЕНТ:")
    print("   • Свой текст для чтения (разные сюжеты)")
    print("   • Свои вопросы к тексту")
    print("   • Свои примеры")
    print("   • Свою лексику")
    print("   • Свои упражнения")
    print("=" * 70)
    print()

    generated = []

    for idx, week_config in enumerate(ALL_WEEKS, start=1):
        week_id = week_config["week_id"]
        print(f"📝 [{idx}/{len(ALL_WEEKS)}] Генерация {week_id}...")

        week_data = generate_week(week_config, idx)

        file_path = LESSONS_DIR / f"{week_id}.json"
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(week_data, f, ensure_ascii=False, indent=4)

        generated.append(week_id)
        print(f"   ✅ Сохранено: {file_path}")
        print(f"   📖 Текст: {TEXTS[week_id]['title'] if week_id in TEXTS else 'стандартный'}")

    print()
    print("=" * 70)
    print(f"🎉 Сгенерировано {len(generated)} УНИКАЛЬНЫХ недель!")
    print()
    print("💡 Следующие шаги:")
    print("1. Обнови frontend/js/index.js — добавь новые недели")
    print("2. Перезапусти сервер")
    print("3. Проверь новые уроки в школьном разделе")


if __name__ == "__main__":
    main()