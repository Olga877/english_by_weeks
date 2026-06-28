// frontend/js/school_week.js - для школьных недель

let weekData = null;
let currentGrade = null;
let currentWeekId = null;
let userAnswers = {};
let userProgress = { completedDays: [], dayScores: {} };
let certificateShown = false;

async function init() {
    console.log("🔍 school_week.js init started");

    document.body.classList.add('school-theme');
    document.body.classList.remove('adult-theme');

    const urlParams = new URLSearchParams(window.location.search);
    currentGrade = urlParams.get('grade');
    currentWeekId = urlParams.get('week');

    console.log(`📌 grade: ${currentGrade}, week: ${currentWeekId}`);

    if (!currentGrade || !currentWeekId) {
        window.location.href = '/english_by_weeks/frontend/index.html';
        return;
    }

    setupNavigationButtons();
    await loadWeekData();
    await loadUserProgress();

    if (weekData && typeof loadContextTranslations === 'function') {
        loadContextTranslations(weekData);
    }

    renderWeek();
    initClickableWords();
    checkAndShowCertificate();
}

function setupNavigationButtons() {
    const homeBtns = document.querySelectorAll('#homeBtnTop, #homeBtnBottom');
    const backBtns = document.querySelectorAll('#backBtnTop, #backBtnBottom');

    homeBtns.forEach(btn => {
        if (btn) {
            btn.removeEventListener('click', goHome);
            btn.addEventListener('click', goHome);
        }
    });

    backBtns.forEach(btn => {
        if (btn) {
            btn.removeEventListener('click', goBack);
            btn.addEventListener('click', goBack);
        }
    });
}

function goHome() {
    window.location.href = '/index.html?audience=school';
}

function goBack() {
    const returnToPage = sessionStorage.getItem('returnToPage');
    if (returnToPage && returnToPage !== window.location.href) {
        sessionStorage.removeItem('returnToPage');
        window.location.href = returnToPage;
        return;
    }

    if (document.referrer && document.referrer.includes('/english_by_weeks/frontend/')) {
        window.location.href = document.referrer;
    } else {
        window.location.href = '/english_by_weeks/frontend/index.html?audience=school';
    }
}

async function loadWeekData() {
    try {
        // Новый путь: frontend/data/lessons/school/grade5/ + currentWeekId + .json
        const url = `/data/lessons/school/grade5/${currentWeekId}.json`;
        const response = await fetch(url);

        if (!response.ok) throw new Error('Week not found');
        weekData = await response.json();

        document.getElementById('weekTitle').textContent = weekData.title;
        document.getElementById('weekDescription').textContent = weekData.description;
    } catch (error) {
        console.error('Error loading week:', error);
        document.getElementById('daysContainer').innerHTML = `<div style="text-align: center; padding: 40px; color: var(--danger);">
            ❌ Week not found: ${error.message}
        </div>`;
    }
}

async function loadUserProgress() {
    const savedAnswers = localStorage.getItem(`answers_${currentWeekId}`);
    if (savedAnswers) {
        userAnswers = JSON.parse(savedAnswers);
    }

    const savedProgress = localStorage.getItem(`progress_${currentWeekId}`);
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
    }

    updateStatsDisplay();
}

function saveUserProgress() {
    localStorage.setItem(`answers_${currentWeekId}`, JSON.stringify(userAnswers));
    localStorage.setItem(`progress_${currentWeekId}`, JSON.stringify(userProgress));
    updateStatsDisplay();
}

function updateStatsDisplay() {
    const completedCount = userProgress.completedDays?.length || 0;
    const scores = Object.values(userProgress.dayScores || {});
    const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

    document.getElementById('completedDays').textContent = completedCount;
    document.getElementById('avgScore').textContent = avgScore + '%';
    document.getElementById('currentStreak').textContent = completedCount;
}

function renderWeek() {
    if (!weekData || !weekData.days) {
        console.error("❌ No week data to render");
        return;
    }

    const container = document.getElementById('daysContainer');
    container.innerHTML = '';

    weekData.days.forEach((day, idx) => {
        const dayNum = idx + 1;
        const isCompleted = userProgress.completedDays?.includes(dayNum) || false;
        const score = userProgress.dayScores?.[dayNum] || 0;

        let statusClass = '';
        let statusText = '';
        if (isCompleted) {
            statusClass = 'completed';
            statusText = `✅ Пройден (${score}%)`;
        } else if (score > 0 && score < 70) {
            statusClass = 'current';
            statusText = `📅 ${score}% (нужно 70%)`;
        } else {
            statusClass = 'current';
            statusText = '📅 Готов';
        }

        const dayBlock = document.createElement('div');
        dayBlock.className = 'day-block';
        dayBlock.innerHTML = `
            <div class="day-header" onclick="toggleDay(${dayNum})">
                <h3>День ${dayNum}: ${day.title}</h3>
                <span class="day-status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="day-content" id="day-content-${dayNum}">
                ${renderGrammar(day.grammar)}
                ${renderVocabulary(day.vocabulary)}
                ${renderExercises(day.exercises, dayNum)}
                <button class="btn-next" onclick="saveDayProgress(${dayNum})" style="width: 100%; padding: 12px; margin-top: 20px;">💾 Сохранить прогресс дня</button>
            </div>
        `;
        container.appendChild(dayBlock);
    });

    toggleDay(1);
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderGrammar(grammar) {
    if (!grammar) return '';

    let ruleHtml = grammar.rule;
    if (ruleHtml) {
        // Заменяем переносы строк на <br>
        ruleHtml = ruleHtml.replace(/\n/g, '<br>');

        // Заменяем **текст** на <strong>текст</strong>
        ruleHtml = ruleHtml.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    return `
        <div class="grammar-card">
            <h3>📖 ${grammar.title}</h3>
            <div class="grammar-rule"><strong>Правило:</strong><br>${ruleHtml}</div>
        </div>
    `;
}

function renderVocabulary(vocabulary) {
    if (!vocabulary || vocabulary.length === 0) return '';
    return `
        <h3 style="margin-bottom: 16px;">📚 Словарь</h3>
        <div class="vocab-grid">
            ${vocabulary.map(v => `
                <div class="vocab-item">
                    <div class="vocab-icon">${v.icon || '📖'}</div>
                    <div class="vocab-word">${makeWordsClickable(v.word, '', weekData)}</div>
                    <div class="vocab-transcription">${v.transcription || ''}</div>
                    <div class="vocab-translation">${v.translation || ''}</div>
                    <div class="vocab-example">${makeWordsClickable(v.example || '', '', weekData)}</div>
                    <div style="margin-top: 8px;">
                        <button onclick="event.stopPropagation(); speak('${v.word.replace(/'/g, "\\'")}')" style="background: none; border: none; cursor: pointer;">🔊 Слово</button>
                        <button onclick="event.stopPropagation(); speakSentence('${(v.example || v.word).replace(/'/g, "\\'")}')" style="background: none; border: none; cursor: pointer; margin-left: 8px;">🔊 Пример</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderExercises(exercises, dayNum) {
    if (!exercises || exercises.length === 0) return '';

    return `
        <h3>✍️ Упражнения</h3>
        ${exercises.map((ex, idx) => {
            const savedAnswer = userAnswers[`day${dayNum}_ex${ex.id}`];
            return `
                <div class="exercise-card" id="ex-${dayNum}-${ex.id}" data-correct="${ex.correct}">
                    <div class="exercise-question">${idx+1}. ${makeWordsClickable(ex.question, '', weekData)}
                        <button class="speak-sentence-btn" onclick="event.stopPropagation(); speakSentence('${ex.question.replace(/'/g, "\\'")}')">🔊</button>
                    </div>
                    ${renderExerciseInput(ex, dayNum, savedAnswer)}
                    <button class="btn-check" onclick="checkExercise(${dayNum}, ${ex.id}, '${ex.type}')">✅ Проверить ответ</button>
                    <div class="explanation" id="explanation-${dayNum}-${ex.id}"></div>
                </div>
            `;
        }).join('')}
    `;
}

function renderExerciseInput(ex, dayNum, savedAnswer) {
    if (ex.type === 'multiple_choice') {
        const cleanOptions = ex.options.map(opt => opt.trim());

        return `
            <div class="options" id="options-${dayNum}-${ex.id}">
                ${cleanOptions.map((opt, optIdx) => `
                    <div class="option ${savedAnswer === opt ? 'selected' : ''}"
                         data-value="${opt.replace(/'/g, "\\'")}"
                         onclick="selectOption(${dayNum}, ${ex.id}, ${optIdx}, '${opt.replace(/'/g, "\\'")}')">
                        ${makeWordsClickable(opt, '', weekData)}
                        <button class="speak-sentence-btn" onclick="event.stopPropagation(); speakSentence('${opt.replace(/'/g, "\\'")}')">🔊</button>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (ex.type === 'fill_blank') {
        return `<input type="text" class="fill-input" id="input-${dayNum}-${ex.id}" value="${savedAnswer || ''}" placeholder="Введите ответ...">`;
    } else if (ex.type === 'true_false') {
        return `
            <div class="options" id="options-${dayNum}-${ex.id}">
                <div class="option ${savedAnswer === 'True' ? 'selected' : ''}" data-value="True" onclick="selectOption(${dayNum}, ${ex.id}, 0, 'True')">
                    ✅ True
                    <button class="speak-sentence-btn" onclick="event.stopPropagation(); speakSentence('True')">🔊</button>
                </div>
                <div class="option ${savedAnswer === 'False' ? 'selected' : ''}" data-value="False" onclick="selectOption(${dayNum}, ${ex.id}, 1, 'False')">
                    ❌ False
                    <button class="speak-sentence-btn" onclick="event.stopPropagation(); speakSentence('False')">🔊</button>
                </div>
            </div>
        `;
    } else if (ex.type === 'correct_mistake') {
        return `<input type="text" class="fill-input" id="input-${dayNum}-${ex.id}" value="${savedAnswer || ''}" placeholder="Исправьте ошибку...">`;
    } else if (ex.type === 'listening') {
        let html = '';
        if (ex.listeningText) {
            html += `<button class="btn-check" onclick="speakSentence('${ex.listeningText.replace(/'/g, "\\'")}')" style="margin-bottom: 16px; background: var(--secondary);">🎧 Прослушать текст</button>`;
        }
        html += `<div class="options" id="options-${dayNum}-${ex.id}">`;
        ex.options.forEach((opt, optIdx) => {
            html += `<div class="option ${savedAnswer === opt ? 'selected' : ''}" data-value="${opt}" onclick="selectOption(${dayNum}, ${ex.id}, ${optIdx}, '${opt.replace(/'/g, "\\'")}')">${makeWordsClickable(opt, '', weekData)}</div>`;
        });
        html += `</div>`;
        return html;
    } else if (ex.type === 'reading') {
        let html = '';
        if (ex.readingText) {
            html += `<div style="background: var(--body-bg); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                        ${renderReadingText(ex.readingText)}
                    </div>`;
        }
        html += `<div class="options" id="options-${dayNum}-${ex.id}">`;
        ex.options.forEach((opt, optIdx) => {
            html += `<div class="option ${savedAnswer === opt ? 'selected' : ''}" data-value="${opt}" onclick="selectOption(${dayNum}, ${ex.id}, ${optIdx}, '${opt.replace(/'/g, "\\'")}')">${makeWordsClickable(opt, '', weekData)}</div>`;
        });
        html += `</div>`;
        return html;
    }
    return '';
}

function renderReadingText(readingText) {
    if (!readingText) return '';

    // Проверяем, является ли текст расписанием (с символами ┌ └ │)
    if (readingText.includes('┌') && readingText.includes('└')) {
        const lines = readingText.split('\n');
        let timetableHtml = '<div class="timetable-grid" style="overflow-x: auto;">';

        for (const line of lines) {
            if (line.includes('┌') || line.includes('├') || line.includes('└')) continue;
            if (line.includes('│')) {
                const cells = line.split('│').filter(cell => cell.trim().length > 0);
                if (cells.length >= 6) {
                    let rowHtml = '<div class="timetable-row">';
                    for (let i = 0; i < cells.length; i++) {
                        const cellClass = i === 0 ? 'timetable-time' : 'timetable-subject';
                        rowHtml += `<div class="${cellClass}">${renderReadingTextContent(cells[i].trim())}</div>`;
                    }
                    rowHtml += '</div>';
                    timetableHtml += rowHtml;
                }
            } else if (line.includes('NOTES:')) {
                timetableHtml += `<div style="margin-top: 20px;"><strong>📌 NOTES:</strong></div>`;
            } else if (line.trim().startsWith('•')) {
                timetableHtml += `<div style="margin-left: 20px; margin-top: 5px;">${renderReadingTextContent(line)}</div>`;
            } else if (line.trim() && !line.includes('───')) {
                timetableHtml += `<div>${renderReadingTextContent(line)}</div>`;
            }
        }
        timetableHtml += '</div>';
        return timetableHtml;
    }

    // Обычный текст — используем renderReadingTextContent
    return `<div style="background: var(--body-bg); padding: 16px; border-radius: 12px; line-height: 1.4;">${renderReadingTextContent(readingText)}</div>`;
}

function selectOption(dayNum, exId, optIndex, value) {
    const optionsDiv = document.getElementById(`options-${dayNum}-${exId}`);
    if (optionsDiv) {
        const options = optionsDiv.querySelectorAll('.option');
        options.forEach(opt => opt.classList.remove('selected'));
        if (options[optIndex]) options[optIndex].classList.add('selected');
    }

    userAnswers[`day${dayNum}_ex${exId}`] = value;
    saveUserProgress();
}

// ========== ОСНОВНОЕ ИСПРАВЛЕНИЕ: ПОДДЕРЖКА МНОЖЕСТВЕННЫХ ОТВЕТОВ ==========
function isAnswerCorrect(userAnswer, exercise) {
    if (!userAnswer) return false;

    const normalizedUser = userAnswer.toString().toLowerCase().trim();

    // Если есть массив accept — используем его
    if (exercise.accept && Array.isArray(exercise.accept)) {
        const normalizedAccept = exercise.accept.map(a => a.toString().toLowerCase().trim());
        return normalizedAccept.includes(normalizedUser);
    }

    // Иначе сравниваем с correct (один вариант)
    const normalizedCorrect = exercise.correct.toString().toLowerCase().trim();
    return normalizedUser === normalizedCorrect;
}

async function checkExercise(dayNum, exId, exType) {
    const dayData = weekData.days[dayNum - 1];
    const exercise = dayData.exercises.find(e => e.id === exId);

    if (!exercise) {
        showToast('Ошибка: упражнение не найдено', 'error');
        return;
    }

    let userAnswer = userAnswers[`day${dayNum}_ex${exId}`];

    // Для fill_blank и correct_mistake — читаем из input каждый раз
    if ((exType === 'fill_blank' || exType === 'correct_mistake')) {
        const input = document.getElementById(`input-${dayNum}-${exId}`);
        if (input) {
            userAnswer = input.value.trim();
            userAnswers[`day${dayNum}_ex${exId}`] = userAnswer;
            saveUserProgress();
        }
    }

    if (!userAnswer && (exType === 'multiple_choice' || exType === 'true_false' || exType === 'reading' || exType === 'listening')) {
        const selected = document.querySelector(`#options-${dayNum}-${exId} .option.selected`);
        if (selected) {
            userAnswer = selected.getAttribute('data-value') || selected.textContent.trim();
            userAnswers[`day${dayNum}_ex${exId}`] = userAnswer;
            saveUserProgress();
        }
    }

    if (!userAnswer) {
        showToast('Пожалуйста, выберите или введите ответ', 'error');
        return;
    }

    const isCorrect = isAnswerCorrect(userAnswer, exercise);
    const card = document.getElementById(`ex-${dayNum}-${exId}`);
    const explanationDiv = document.getElementById(`explanation-${dayNum}-${exId}`);

    if (isCorrect) {
        card.classList.add('correct');
        card.classList.remove('incorrect');
        explanationDiv.innerHTML = `<div style="color: var(--success);">✅ Правильно! ${exercise.explanation || ''}</div>`;
        showToast('✅ Правильный ответ!', 'success');
    } else {
        card.classList.add('incorrect');
        card.classList.remove('correct');
        explanationDiv.innerHTML = `<div style="color: var(--danger);">❌ Неправильно. Правильный ответ: ${exercise.correct}<br>${exercise.explanation || ''}</div>`;
        showToast('❌ Неправильно. Попробуйте ещё раз!', 'error');

        // ВАЖНО: НЕ блокируем поле ввода — пользователь может исправить ответ
        // НЕ засчитываем как непройденное — просто показываем ошибку
    }
    explanationDiv.classList.add('show');
}

async function saveDayProgress(dayNum) {
    const dayData = weekData.days[dayNum - 1];
    let correct = 0;
    let total = dayData.exercises.length;

    for (const ex of dayData.exercises) {
        let userAnswer = userAnswers[`day${dayNum}_ex${ex.id}`];

        if (!userAnswer && (ex.type === 'fill_blank' || ex.type === 'correct_mistake')) {
            const input = document.getElementById(`input-${dayNum}-${ex.id}`);
            if (input && input.value.trim() !== '') {
                userAnswer = input.value.trim();
                userAnswers[`day${dayNum}_ex${ex.id}`] = userAnswer;
            }
        }

        if (!userAnswer && (ex.type === 'multiple_choice' || ex.type === 'true_false' || ex.type === 'reading' || ex.type === 'listening')) {
            const selected = document.querySelector(`#options-${dayNum}-${ex.id} .option.selected`);
            if (selected) {
                userAnswer = selected.getAttribute('data-value') || selected.textContent.trim();
                userAnswers[`day${dayNum}_ex${ex.id}`] = userAnswer;
            }
        }

        if (userAnswer && isAnswerCorrect(userAnswer, ex)) {
            correct++;
        }
    }

    saveUserProgress();

    const score = Math.round((correct / total) * 100);

    userProgress.dayScores = userProgress.dayScores || {};
    userProgress.dayScores[dayNum] = score;

    if (score >= 70) {
        if (!userProgress.completedDays.includes(dayNum)) {
            userProgress.completedDays.push(dayNum);
        }
        const dayHeader = document.querySelector(`.day-block:nth-child(${dayNum}) .day-status-badge`);
        if (dayHeader) {
            dayHeader.textContent = `✅ Пройден (${score}%)`;
            dayHeader.className = 'day-status-badge completed';
        }
        showToast(`✅ День ${dayNum} сохранён! Результат: ${score}%`, 'success');
    } else {
        // День НЕ считается пройденным — пользователь может вернуться и исправить ответы
        const completedIndex = userProgress.completedDays.indexOf(dayNum);
        if (completedIndex !== -1) {
            userProgress.completedDays.splice(completedIndex, 1);
        }

        const dayHeader = document.querySelector(`.day-block:nth-child(${dayNum}) .day-status-badge`);
        if (dayHeader) {
            dayHeader.textContent = `📅 ${score}% (нужно 70%)`;
            dayHeader.className = 'day-status-badge current';
        }
        showToast(`⚠️ Вы набрали ${score}%. Нужно 70% для прохождения. Исправьте ответы и сохраните снова!`, 'error');
    }

    saveUserProgress();
    updateStatsDisplay();
    checkAndShowCertificate();
}

function checkAndShowCertificate() {
    if (certificateShown) return;

    const totalDays = weekData?.days?.length || 6;
    const completedDays = userProgress.completedDays || [];
    const dayScores = userProgress.dayScores || {};

    let allCompleted = true;
    let totalScore = 0;

    for (let day = 1; day <= totalDays; day++) {
        const score = dayScores[day] || 0;
        totalScore += score;
        if (score < 70) {
            allCompleted = false;
            break;
        }
    }

    if (allCompleted && completedDays.length === totalDays && !certificateShown) {
        certificateShown = true;
        const overallScore = Math.round(totalScore / totalDays);
        showCertificate(weekData.title, overallScore, weekData.icon);
    }
}

function toggleDay(dayNum) {
    const content = document.getElementById(`day-content-${dayNum}`);
    const dayHeader = document.querySelector(`.day-block:nth-child(${dayNum}) .day-header`);

    if (content.classList.contains('open')) {
        content.classList.remove('open');
    } else {
        document.querySelectorAll('.day-content').forEach(c => c.classList.remove('open'));
        content.classList.add('open');

        setTimeout(() => {
            if (dayHeader) {
                dayHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
}

window.toggleDay = toggleDay;
window.selectOption = selectOption;
window.checkExercise = checkExercise;
window.saveDayProgress = saveDayProgress;
window.speak = speak;
window.speakSentence = speakSentence;
window.toggleTheme = toggleTheme;

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

init();