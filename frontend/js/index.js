// frontend/js/index.js - главная страница с переключением взрослые/школьники

let currentAudience = 'adults';

// Данные об уровнях для взрослых (A0-C2)
const adultLevels = [
    { id: 'A0', title: 'A0 (Beginner)', icon: '🌱', description: 'Самый старт. Алфавит, цифры, простые фразы.', available: false, comingSoon: true },
    { id: 'A1', title: 'A1 (Elementary)', icon: '🌿', description: 'Базовые фразы, простые диалоги.', available: false, comingSoon: true },
    { id: 'A2', title: 'A2 (Pre-Intermediate)', icon: '🌳', description: 'Простые разговоры о повседневности.', available: false, comingSoon: true },
    { id: 'B1', title: 'B1 (Intermediate)', icon: '💰', description: 'Money Week — первая тема! Деньги, Present Perfect и Past Simple.', available: true, comingSoon: false, weekId: 'money_week' },
    { id: 'B2', title: 'B2 (Upper-Intermediate)', icon: '🚀', description: 'Сложные темы, дебаты, бизнес-английский.', available: false, comingSoon: true },
    { id: 'C1', title: 'C1 (Advanced)', icon: '🎓', description: 'Нюансы, идиомы, академический английский.', available: false, comingSoon: true },
    { id: 'C2', title: 'C2 (Proficiency)', icon: '🏆', description: 'Уровень носителя. Почти как Шекспир.', available: false, comingSoon: true }
];

// Данные о классах для школьников
const schoolGrades = [
    {
        id: 'grade5',
        title: '5 класс',
        icon: '🎒',
        description: 'Английский для 5 класса. 40+ уникальных недель!',
        available: true,
        weeks: [
    { weekId: 'week1_school', title: '📚 School Subjects & I have / I like' },
    { weekId: 'week2_numbers', title: '🔢 Numbers 1-100 & Verb to be (am/is/are)' },
    { weekId: 'week3_capital_letters', title: '🔤 Capital Letters & I can / I can\'t' },
    { weekId: 'week4_countries_nationalities', title: '🌍 Countries & Nationalities / to be from' },
    { weekId: 'week5_personal_things', title: '🎒 Personal Things & This / That / These / Those' },
    { weekId: 'week6_numbers_souvenirs', title: '💰 Numbers & How much? / How many?' },
    { weekId: 'week7_rooms_ordinals', title: '🏠 Rooms & Ordinal numbers (1st-10th)' },
    { weekId: 'week8_furniture_there_is', title: '🛋️ Furniture & There is / There are' },
    { weekId: 'week9_prepositions_house', title: '📍 Prepositions of place & Where is/are?' },
    { weekId: 'week10_family_can', title: '👨‍👩‍👧‍👦 Family & I can / I can\'t (abilities)' },
    { weekId: 'week11_appearance_possessive', title: '😊 Appearance & Possessive adjectives' },
    { weekId: 'week12_famous_people', title: '🎤 Famous People & can / can\'t (способности)' },
    { weekId: 'week13_indian_animals', title: '🐯 Indian Animals & Present Simple (факты о животных)' },
    { weekId: 'week14_at_the_zoo', title: '🦒 At the Zoo & Present Simple (вопросы с do/does)' },
    { weekId: 'week15_my_pet', title: '🐕 My Pet & Present Simple: tag-questions' },
    { weekId: 'week16_daily_routine', title: '⏰ Daily Routine & Adverbs of frequency' },
    { weekId: 'week17_jobs', title: '💼 Jobs & Present Continuous (действия сейчас)' },
    { weekId: 'week18_weekends', title: '🎮 Weekends & Present Simple vs Present Continuous' },
    { weekId: 'week19_big_ben', title: '🏛️ Big Ben & Comparatives (степени сравнения)' },
    { weekId: 'week20_seasons', title: '🌤️ Seasons & Weather (времена года и погода)' }
]
    },
    { id: 'grade6', title: '6 класс', icon: '📚', description: 'Английский для 6 класса — материалы скоро появятся!', available: false, comingSoon: true, weeks: [] },
    { id: 'grade7', title: '7 класс', icon: '📖', description: 'Английский для 7 класса — материалы скоро появятся!', available: false, comingSoon: true, weeks: [] },
    { id: 'grade8', title: '8 класс', icon: '🏫', description: 'Английский для 8 класса — материалы скоро появятся!', available: false, comingSoon: true, weeks: [] }
];

// Функция перехода к школьной неделе
function goToWeek(gradeId, weekId) {
    sessionStorage.setItem('returnToPage', window.location.href);
    window.location.href = `/english_by_weeks/frontend/school_week.html?grade=${gradeId}&week=${weekId}`;
}

// Функция перехода к взрослой неделе
function goToAdultWeek(levelId, weekId) {
    window.location.href = `/english_by_weeks/frontend/week.html?level=${levelId}&week=${weekId}`;
}

// Инициализация страницы
async function init() {
    loadTheme();
    initClickableWords();

    // Получаем текущую аудиторию из URL
    const urlParams = new URLSearchParams(window.location.search);
    const audienceFromUrl = urlParams.get('audience');
    if (audienceFromUrl === 'adults' || audienceFromUrl === 'school') {
        currentAudience = audienceFromUrl;
    }

    const adultsBtn = document.getElementById('adultsBtn');
    const schoolBtn = document.getElementById('schoolBtn');

    if (adultsBtn) adultsBtn.addEventListener('click', () => switchAudience('adults'));
    if (schoolBtn) schoolBtn.addEventListener('click', () => switchAudience('school'));

    // Обновляем активную кнопку
    updateActiveButton();

    await loadContent();
}

function updateActiveButton() {
    const adultsBtn = document.getElementById('adultsBtn');
    const schoolBtn = document.getElementById('schoolBtn');

    if (adultsBtn && schoolBtn) {
        adultsBtn.classList.toggle('active', currentAudience === 'adults');
        schoolBtn.classList.toggle('active', currentAudience === 'school');
    }
}

// Переключение между аудиториями
async function switchAudience(audience) {
    currentAudience = audience;

    // Обновляем URL без перезагрузки страницы
    const newUrl = `/static/index.html?audience=${audience}`;
    window.history.pushState({}, '', newUrl);

    updateActiveButton();
    await loadContent();
}

// Загрузка контента в зависимости от аудитории
async function loadContent() {
    const container = document.getElementById('levelsContainer');
    if (!container) return;

    if (currentAudience === 'adults') {
        renderAdultLevels(container);
    } else {
        renderSchoolGrades(container);
    }
}

// Рендер уровней для взрослых
function renderAdultLevels(container) {
    container.innerHTML = '';

    for (const level of adultLevels) {
        const card = document.createElement('div');
        card.className = `level-card ${!level.available ? 'coming-soon' : ''}`;

        let weekInfo = '';
        if (level.available && level.weekId) {
            weekInfo = `<div style="margin-top: 12px; font-size: 0.8rem; color: var(--primary);">✅ Доступна: ${level.id === 'B1' ? 'Money Week' : '1 тема'}</div>`;
        }

        card.innerHTML = `
            <div class="level-icon">${level.icon}</div>
            <div class="level-title">${level.title}</div>
            <div class="level-description" style="font-size: 0.85rem; color: var(--gray); margin: 8px 0;">${level.description}</div>
            ${weekInfo}
            ${!level.available ? '<div class="level-badge" style="background: var(--gray);">🚧 Скоро</div>' : '<div class="level-badge">⭐ Доступен</div>'}
        `;

        if (level.available) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                goToAdultWeek(level.id, level.weekId);
            });
        }

        container.appendChild(card);
    }
}

// Рендер классов для школьников
function renderSchoolGrades(container) {
    container.innerHTML = '';

    for (const grade of schoolGrades) {
        const card = document.createElement('div');
        card.className = `level-card ${!grade.available ? 'coming-soon' : ''}`;

        let weeksHtml = '';
        if (grade.available && grade.weeks && grade.weeks.length > 0) {
            weeksHtml = '<div style="margin-top: 12px; font-size: 0.8rem; text-align: left;">📚 Доступные недели:<ul style="margin-top: 5px; margin-left: 20px; list-style: none; padding-left: 0;">';
            for (const week of grade.weeks) {
                weeksHtml += `<li style="cursor: pointer; color: var(--primary); margin-bottom: 5px; padding: 3px 8px; border-radius: 8px; transition: background 0.2s;"
                                    onmouseover="this.style.background='rgba(99,102,241,0.1)'"
                                    onmouseout="this.style.background='transparent'"
                                    onclick="event.stopPropagation(); goToWeek('${grade.id}', '${week.weekId}')">
                                    📖 ${week.title}
                                </li>`;
            }
            weeksHtml += '</ul></div>';
        }

        card.innerHTML = `
            <div class="level-icon">${grade.icon}</div>
            <div class="level-title">${grade.title}</div>
            <div class="level-description" style="font-size: 0.85rem; color: var(--gray); margin: 8px 0;">${grade.description}</div>
            ${weeksHtml}
            ${!grade.available ? '<div class="level-badge" style="background: var(--gray);">📝 Скоро</div>' : '<div class="level-badge">⭐ Доступен</div>'}
        `;

        if (grade.available && grade.weeks && grade.weeks.length === 1) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                goToWeek(grade.id, grade.weeks[0].weekId);
            });
        }

        container.appendChild(card);
    }

    // Добавляем пояснение для школьного раздела
    const info = document.createElement('div');
    info.style.textAlign = 'center';
    info.style.marginTop = '40px';
    info.style.padding = '20px';
    info.style.background = 'var(--card-bg)';
    info.style.borderRadius = '16px';
    info.style.border = '1px solid var(--border)';
    info.innerHTML = `
        <p>🎓 Школьный раздел постепенно пополняется новыми темами.</p>
        <p>📚 Сейчас доступны темы для 5 класса:</p>
        <p><strong>"🏫 School Week"</strong> и <strong>"🔢 Numbers & Me Week"</strong></p>
        <p>✨ Скоро появятся материалы для 6, 7 и 8 классов!</p>
    `;
    container.appendChild(info);
}

// Запуск
init();