from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/api/weeks", tags=["weeks"])

# Полные данные для Money Week (7 дней с упражнениями)
MONEY_WEEK_DATA = {
    "week_id": "money_week",
    "title": "💰 Money Week",
    "description": "Learn Present Perfect vs Past Simple and money vocabulary",
    "level": "B1",
    "icon": "💰",
    "order_num": 1,
    "is_published": True,
    "days": [
        {
            "day": 1,
            "title": "Day 1: Money Verbs & Present Perfect",
            "description": "Learn 12 money verbs and the basics of Present Perfect",
            "grammar": {
                "title": "Present Perfect",
                "rule": "Use Present Perfect (have/has + past participle) for life experiences and recent actions when the time is not specified.",
                "examples": [
                    "I have saved €500 this year.",
                    "She has never borrowed money.",
                    "Have you ever inherited money?"
                ],
                "keywords": "ever, never, already, yet, just, since, for"
            },
            "vocabulary": [
                {"icon": "🤝💰", "word": "borrow", "transcription": "/ˈbɒr.əʊ/", "translation": "занимать", "example": "borrow money from a friend"},
                {"icon": "💰🤝", "word": "lend", "transcription": "/lend/", "translation": "давать в долг", "example": "lend money to someone"},
                {"icon": "🐷💰", "word": "save", "transcription": "/seɪv/", "translation": "копить", "example": "save money in a piggy bank"},
                {"icon": "🗑️💸", "word": "waste", "transcription": "/weɪst/", "translation": "тратить впустую", "example": "waste money on junk"},
                {"icon": "💼💵", "word": "earn", "transcription": "/ɜːn/", "translation": "зарабатывать", "example": "earn a salary"},
                {"icon": "📝💳", "word": "owe", "transcription": "/əʊ/", "translation": "быть должным", "example": "owe money to the bank"},
                {"icon": "👴💎", "word": "inherit", "transcription": "/ɪnˈher.ɪt/", "translation": "унаследовать", "example": "inherit a fortune"},
                {"icon": "🔧💸", "word": "charge", "transcription": "/tʃɑːdʒ/", "translation": "брать плату", "example": "charge for a service"},
                {"icon": "💭🏠", "word": "afford", "transcription": "/əˈfɔːd/", "translation": "позволить себе", "example": "afford a new house"},
                {"icon": "🏷️💲", "word": "cost", "transcription": "/kɒst/", "translation": "стоить", "example": "cost $100"},
                {"icon": "📈💹", "word": "invest", "transcription": "/ɪnˈvest/", "translation": "инвестировать", "example": "invest in stocks"},
                {"icon": "🙌💰", "word": "raise", "transcription": "/reɪz/", "translation": "собирать деньги", "example": "raise money for charity"}
            ],
            "exercises": [
                {"id": 1, "type": "multiple_choice", "question": "Can I _________ €20 from you until Friday?", "options": ["borrow", "lend", "save", "waste"], "correct": "borrow", "explanation": "Borrow means to take money from someone temporarily.", "topic": "verbs"},
                {"id": 2, "type": "multiple_choice", "question": "I need to _________ some money for a new laptop.", "options": ["waste", "spend", "save", "lend"], "correct": "save", "explanation": "Save means to keep money for future use.", "topic": "verbs"},
                {"id": 3, "type": "multiple_choice", "question": "She _________ £2,000 a month in her new job.", "options": ["owes", "earns", "borrows", "charges"], "correct": "earns", "explanation": "Earn means to receive money for work.", "topic": "verbs"},
                {"id": 4, "type": "fill_blank", "question": "I _______________ (save) €800 this year.", "correct": "have saved", "explanation": "Present Perfect for unspecified time.", "topic": "grammar"},
                {"id": 5, "type": "fill_blank", "question": "She _______________ (already / inherit) a fortune.", "correct": "has already inherited", "explanation": "Use 'has' with 'she' and place 'already' before the main verb.", "topic": "grammar"}
            ]
        },
        {
            "day": 2,
            "title": "Day 2: Past Simple & Review",
            "description": "Practice Past Simple and review money verbs",
            "grammar": {
                "title": "Past Simple",
                "rule": "Use Past Simple for completed actions in the past when the time is specified.",
                "examples": [
                    "I borrowed £50 yesterday.",
                    "She lent me £20 last week.",
                    "They bought a car in 2015."
                ],
                "keywords": "yesterday, last week, in 2010, ago"
            },
            "vocabulary": [
                {"icon": "💳✅", "word": "pay by card", "transcription": "/peɪ baɪ kɑːd/", "translation": "платить картой", "example": "pay by credit card"},
                {"icon": "🧾💸", "word": "pay for", "transcription": "/peɪ fɔː/", "translation": "платить за", "example": "pay for dinner"},
                {"icon": "🛍️💷", "word": "spend on", "transcription": "/spend ɒn/", "translation": "тратить на", "example": "spend money on clothes"},
                {"icon": "📊🏠", "word": "invest in", "transcription": "/ɪnˈvest ɪn/", "translation": "инвестировать в", "example": "invest in property"},
                {"icon": "💸➡️👤", "word": "lend to", "transcription": "/lend tuː/", "translation": "одолжить", "example": "lend to a friend"},
                {"icon": "🏦⬅️💰", "word": "borrow from", "transcription": "/ˈbɒr.əʊ frɒm/", "translation": "занять у", "example": "borrow from a bank"}
            ],
            "exercises": [
                {"id": 1, "type": "multiple_choice", "question": "I _________ £50 from my friend yesterday.", "options": ["borrow", "borrowed", "have borrowed", "borrowing"], "correct": "borrowed", "explanation": "Past Simple with 'yesterday'.", "topic": "grammar"},
                {"id": 2, "type": "multiple_choice", "question": "She _________ me £20 last week.", "options": ["lend", "lent", "have lent", "lending"], "correct": "lent", "explanation": "Lent is the past form of lend.", "topic": "grammar"},
                {"id": 3, "type": "correct_mistake", "question": "I have seen him yesterday.", "correct": "I saw him yesterday.", "explanation": "Past Simple with 'yesterday', not Present Perfect.", "topic": "grammar"},
                {"id": 4, "type": "fill_blank", "question": "They _______________ (move) to London in 2015.", "correct": "moved", "explanation": "Past Simple with specific time 'in 2015'.", "topic": "grammar"}
            ]
        },
        {
            "day": 3,
            "title": "Day 3: Present Perfect vs Past Simple",
            "description": "Compare and contrast both tenses",
            "grammar": {
                "title": "Present Perfect vs Past Simple",
                "rule": "Use Present Perfect when time is not important; use Past Simple when time is specified.",
                "examples": [
                    "I have visited Paris. (experience - no time)",
                    "I visited Paris in 2019. (specific time)",
                    "She has never been in debt. (experience)",
                    "She was in debt last year. (specific time)"
                ],
                "keywords": "Present Perfect: ever, never, already, yet, since, for | Past Simple: yesterday, last week, in 2010, ago"
            },
            "vocabulary": [
                {"icon": "📄💸", "word": "bill", "transcription": "/bɪl/", "translation": "счёт", "definition": "money you owe for a service"},
                {"icon": "📊📋", "word": "budget", "transcription": "/ˈbʌdʒ.ɪt/", "translation": "бюджет", "definition": "a plan for spending money"},
                {"icon": "🏦💶", "word": "loan", "transcription": "/ləʊn/", "translation": "кредит", "definition": "money borrowed from a bank"},
                {"icon": "🏠💷", "word": "mortgage", "transcription": "/ˈmɔː.ɡɪdʒ/", "translation": "ипотека", "definition": "a loan to buy a house"},
                {"icon": "💼💰", "word": "salary", "transcription": "/ˈsæl.ər.i/", "translation": "зарплата", "definition": "money earned from work"}
            ],
            "exercises": [
                {"id": 1, "type": "multiple_choice", "question": "I _____ to Paris three times in my life.", "options": ["went", "have been", "go", "was going"], "correct": "have been", "explanation": "Present Perfect for life experiences.", "topic": "grammar"},
                {"id": 2, "type": "multiple_choice", "question": "She _____ a new phone yesterday.", "options": ["has bought", "bought", "buys", "was buying"], "correct": "bought", "explanation": "Past Simple with 'yesterday'.", "topic": "grammar"},
                {"id": 3, "type": "fill_blank", "question": "I _______________ (never / be) to Japan.", "correct": "have never been", "explanation": "Present Perfect with 'never'.", "topic": "grammar"},
                {"id": 4, "type": "fill_blank", "question": "They _______________ (get) married in 2010.", "correct": "got", "explanation": "Past Simple with specific year '2010'.", "topic": "grammar"}
            ]
        },
        {
            "day": 4,
            "title": "Day 4: Money Nouns & Phrasal Verbs",
            "description": "Learn nouns related to money and common phrasal verbs",
            "grammar": {
                "title": "Review: Present Perfect vs Past Simple",
                "rule": "Remember: Present Perfect for experiences, Past Simple for specific past times.",
                "examples": [
                    "I have taken out a loan. (experience)",
                    "I took out a loan last year. (specific time)"
                ]
            },
            "vocabulary": [
                {"icon": "🏦➡️💰", "word": "take out", "transcription": "/teɪk aʊt/", "translation": "взять (кредит)", "example": "take out a loan"},
                {"icon": "💸🔄🤝", "word": "pay back", "transcription": "/peɪ bæk/", "translation": "вернуть долг", "example": "pay back the money"},
                {"icon": "💰🏠", "word": "live on", "transcription": "/lɪv ɒn/", "translation": "жить на", "example": "live on a small salary"},
                {"icon": "🐷📈", "word": "save up", "transcription": "/seɪv ʌp/", "translation": "копить на", "example": "save up for a car"},
                {"icon": "✂️📉", "word": "cut back on", "transcription": "/kʌt bæk ɒn/", "translation": "сократить расходы", "example": "cut back on spending"},
                {"icon": "🚶‍♂️💵", "word": "get by", "transcription": "/get baɪ/", "translation": "сводить концы с концами", "example": "get by on minimum wage"}
            ],
            "exercises": [
                {"id": 1, "type": "multiple_choice", "question": "I need to take _____ a loan to buy a house.", "options": ["out", "off", "back", "up"], "correct": "out", "explanation": "Take out a loan means to borrow from a bank.", "topic": "phrasal"},
                {"id": 2, "type": "multiple_choice", "question": "Can I pay you _____ next week?", "options": ["out", "off", "back", "up"], "correct": "back", "explanation": "Pay back means to return money.", "topic": "phrasal"},
                {"id": 3, "type": "fill_blank", "question": "Many students live _____ their parents.", "correct": "off", "explanation": "Live off means to depend on someone.", "topic": "phrasal"},
                {"id": 4, "type": "fill_blank", "question": "I'm saving _____ for a new phone.", "correct": "up", "explanation": "Save up means to accumulate money.", "topic": "phrasal"}
            ]
        },
        {
            "day": 5,
            "title": "Day 5: Collocations & Listening",
            "description": "Practice common money collocations and listening comprehension",
            "grammar": {
                "title": "Mixed Tenses Practice",
                "rule": "Choose the correct tense based on whether the time is specified.",
                "examples": []
            },
            "vocabulary": [
                {"icon": "💰💼", "word": "make money", "translation": "зарабатывать деньги", "example": "make money online"},
                {"icon": "📉💸", "word": "lose money", "translation": "терять деньги", "example": "lose money on stocks"},
                {"icon": "🗑️💸", "word": "waste money", "translation": "тратить впустую", "example": "waste money on gambling"},
                {"icon": "🐷💰", "word": "save money", "translation": "экономить деньги", "example": "save money on groceries"},
                {"icon": "🤝💰", "word": "borrow money", "translation": "занимать деньги", "example": "borrow money from a friend"},
                {"icon": "💰🤝", "word": "lend money", "translation": "давать в долг", "example": "lend money to a relative"},
                {"icon": "💵✋", "word": "pay cash", "translation": "платить наличными", "example": "pay cash for the car"},
                {"icon": "📈💸", "word": "pay interest", "translation": "платить проценты", "example": "pay interest on a loan"}
            ],
            "exercises": [
                {"id": 1, "type": "multiple_choice", "question": "I need to _____ a loan from the bank.", "options": ["take out", "pay back", "save up", "cut back"], "correct": "take out", "explanation": "Take out a loan is correct collocation.", "topic": "collocations"},
                {"id": 2, "type": "listening", "question": "What does Mark want to buy?", "options": ["A house", "A car", "A phone", "A holiday"], "correct": "A car", "explanation": "Mark says: 'I'm thinking about buying a new car.'", "listeningText": "Mark: I'm thinking about taking out a loan to buy a new car. Lisa: Have you saved up enough? Mark: I've saved £2,000, but the car costs £10,000.", "topic": "listening"},
                {"id": 3, "type": "listening", "question": "How much did Lisa borrow for her holiday?", "options": ["£1,000", "£2,000", "£3,000", "£4,000"], "correct": "£3,000", "explanation": "Lisa says: 'I borrowed £3,000.'", "listeningText": "Lisa: I borrowed £3,000. The interest was high, so I ended up paying back £4,000.", "topic": "listening"}
            ]
        },
        {
            "day": 6,
            "title": "Day 6: Reading & Final Practice",
            "description": "Read about financial habits and practice all topics",
            "grammar": {
                "title": "Final Review",
                "rule": "Test your knowledge of both tenses and money vocabulary.",
                "examples": []
            },
            "vocabulary": [
                {"icon": "🏦📂", "word": "open an account", "translation": "открыть счёт", "example": "open a bank account"},
                {"icon": "🏦🔒", "word": "close an account", "translation": "закрыть счёт", "example": "close an old account"},
                {"icon": "🏧💰", "word": "withdraw money", "translation": "снять деньги", "example": "withdraw money from an ATM"},
                {"icon": "💵🏦", "word": "deposit money", "translation": "положить деньги", "example": "deposit money into savings"},
                {"icon": "💸➡️🏦", "word": "transfer money", "translation": "перевести деньги", "example": "transfer money online"},
                {"icon": "💱🌍", "word": "exchange currency", "translation": "обменять валюту", "example": "exchange currency at the airport"}
            ],
            "exercises": [
                {"id": 1, "type": "reading", "question": "How do many Germans prefer to pay?", "options": ["By credit card", "In cash", "By mobile app", "By cheque"], "correct": "In cash", "explanation": "The text says: 'Many Germans prefer to save money and pay in cash.'", "readingText": "In Germany, many people prefer to save money and pay in cash. In the US, credit cards are very popular. In Japan, digital payments are growing fast.", "topic": "reading"},
                {"id": 2, "type": "reading", "question": "What is the key to financial health?", "options": ["Having many credit cards", "Investing in stocks", "Having a budget and saving regularly", "Paying in cash"], "correct": "Having a budget and saving regularly", "explanation": "Experts agree that having a budget and saving regularly are the keys to financial health.", "topic": "reading"},
                {"id": 3, "type": "fill_blank", "question": "I _______________ (never / be) in debt.", "correct": "have never been", "explanation": "Present Perfect with 'never' for life experience.", "topic": "grammar"}
            ]
        },
        {
            "day": 7,
            "title": "Day 7: Final Test",
            "description": "Test your knowledge of all topics from the week",
            "grammar": {
                "title": "Final Assessment",
                "rule": "Complete all exercises to earn your certificate.",
                "examples": []
            },
            "vocabulary": [],
            "exercises": [
                {"id": 1, "type": "multiple_choice", "question": "Can I _____ £50 from you?", "options": ["borrow", "lend", "save", "earn"], "correct": "borrow", "explanation": "Borrow means to take money temporarily.", "topic": "verbs"},
                {"id": 2, "type": "multiple_choice", "question": "She _____ me £20 yesterday.", "options": ["borrowed", "lent", "saved", "earned"], "correct": "lent", "explanation": "Lent is the past form of lend.", "topic": "verbs"},
                {"id": 3, "type": "multiple_choice", "question": "I can't _____ a new car right now.", "options": ["afford", "cost", "earn", "save"], "correct": "afford", "explanation": "Afford means to have enough money.", "topic": "verbs"},
                {"id": 4, "type": "multiple_choice", "question": "A _____ is a loan to buy a house.", "options": ["mortgage", "budget", "bill", "salary"], "correct": "mortgage", "explanation": "A mortgage is specifically for buying property.", "topic": "nouns"},
                {"id": 5, "type": "multiple_choice", "question": "I _____ a new phone last week.", "options": ["have bought", "bought", "buy", "was buying"], "correct": "bought", "explanation": "Past Simple with 'last week'.", "topic": "grammar"},
                {"id": 6, "type": "multiple_choice", "question": "She _____ never _____ to Japan.", "options": ["has / been", "did / go", "was / going", "is / going"], "correct": "has / been", "explanation": "Present Perfect with 'never'.", "topic": "grammar"},
                {"id": 7, "type": "fill_blank", "question": "I need to take _____ a loan.", "correct": "out", "explanation": "Take out a loan is the correct phrasal verb.", "topic": "phrasal"},
                {"id": 8, "type": "fill_blank", "question": "Can I pay you _____ next week?", "correct": "back", "explanation": "Pay back means to return money.", "topic": "phrasal"},
                {"id": 9, "type": "fill_blank", "question": "I _______________ (save) €500 this year.", "correct": "have saved", "explanation": "Present Perfect for an action this year.", "topic": "grammar"},
                {"id": 10, "type": "fill_blank", "question": "They _______________ (move) to London in 2015.", "correct": "moved", "explanation": "Past Simple with specific year.", "topic": "grammar"}
            ]
        }
    ]
}


@router.get("/")
async def get_weeks():
    return [{
        "week_id": MONEY_WEEK_DATA["week_id"],
        "title": MONEY_WEEK_DATA["title"],
        "description": MONEY_WEEK_DATA["description"],
        "level": MONEY_WEEK_DATA["level"],
        "icon": MONEY_WEEK_DATA["icon"],
        "order_num": MONEY_WEEK_DATA["order_num"],
        "is_published": MONEY_WEEK_DATA["is_published"]
    }]


@router.get("/{week_id}")
async def get_week(week_id: str):
    if week_id == "money_week":
        return MONEY_WEEK_DATA
    return {"error": "Week not found"}