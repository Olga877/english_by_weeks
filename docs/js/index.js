// js/index.js - главная страница (только уровни для взрослых A0-C1)

// Данные об уровнях для взрослых (A0-C1)
const adultLevels = [
{
    id: 'A0',
    title: 'A0 (Beginner)',
    icon: '🌱',
    description: 'Самый старт. Базовые фразы, глагол to be, числа, дни недели.',
    available: true,
    comingSoon: false,
    weeks: [
        { weekId: 'beginner_it_basics', title: '💻 IT Basics: Verb \'to be\' & Daily Routines' }
    ]
},    { id: 'A1', title: 'A1 (Elementary)', icon: '🌿', description: 'Базовые фразы, простые диалоги.', available: false, comingSoon: true },
    { id: 'A2', title: 'A2 (Pre-Intermediate)', icon: '🌳', description: 'Простые разговоры о повседневности.', available: false, comingSoon: true },
    {
        id: 'B1',
        title: 'B1 (Intermediate)',
        icon: '💰',
        description: 'Доступные темы: Money Week, The Body, School & Education',
        available: true,
        comingSoon: false,
        weeks: [
            { weekId: 'money_week', title: '💰 Money Week: Present Perfect & Past Simple' },
            { weekId: 'adult_body_modals', title: '🧍 The Body & Modals of Deduction' },
            { weekId: 'school_education', title: '🎓 School & Education: First Conditional' }
        ]
    },
    { id: 'B2', title: 'B2 (Upper-Intermediate)', icon: '🚀', description: 'Сложные темы, дебаты, бизнес-английский.', available: false, comingSoon: true },
    { id: 'C1', title: 'C1 (Advanced)', icon: '🎓', description: 'Нюансы, идиомы, академический английский.', available: false, comingSoon: true }
];

// Функция перехода к взрослой неделе
function goToAdultWeek(levelId, weekId) {
    window.location.href = `week.html?level=${levelId}&week=${weekId}`;
}

// Инициализация страницы
async function init() {
    loadTheme();
    initClickableWords();
    await loadContent();
}

// Загрузка контента
async function loadContent() {
    const container = document.getElementById('levelsContainer');
    if (!container) return;
    renderAdultLevels(container);
}

// Рендер уровней для взрослых
function renderAdultLevels(container) {
    container.innerHTML = '';

    for (const level of adultLevels) {
        const card = document.createElement('div');
        card.className = `level-card ${!level.available ? 'coming-soon' : ''}`;

        let weeksHtml = '';
        if (level.available && level.weeks && level.weeks.length > 0) {
            weeksHtml = '<div style="margin-top: 12px; font-size: 0.85rem; text-align: left;">📚 Доступные темы:<ul style="margin-top: 5px; margin-left: 20px; list-style: none; padding-left: 0;">';
            for (const week of level.weeks) {
                weeksHtml += `<li style="cursor: pointer; color: var(--primary); margin-bottom: 5px; padding: 3px 8px; border-radius: 8px; transition: background 0.2s;"
                                    onmouseover="this.style.background='rgba(99,102,241,0.1)'"
                                    onmouseout="this.style.background='transparent'"
                                    onclick="event.stopPropagation(); goToAdultWeek('${level.id}', '${week.weekId}')">
                                    📖 ${week.title}
                                </li>`;
            }
            weeksHtml += '</ul></div>';
        }

        card.innerHTML = `
            <div class="level-icon">${level.icon}</div>
            <div class="level-title">${level.title}</div>
            <div class="level-description" style="font-size: 0.85rem; color: var(--gray); margin: 8px 0;">${level.description}</div>
            ${weeksHtml}
            ${!level.available ? '<div class="level-badge" style="background: var(--gray);">🚧 Скоро</div>' : '<div class="level-badge">⭐ Доступен</div>'}
        `;

        container.appendChild(card);
    }
}

// Запуск
init();