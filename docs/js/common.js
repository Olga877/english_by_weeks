// js/common.js - общие функции для всех страниц

// ========== ИНИЦИАЛИЗАЦИЯ ТЕМЫ ==========
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    } else if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    } else {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        localStorage.setItem('theme', 'dark');
    }
}

function toggleTheme() {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    } else {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    }
}

// ========== PWA — SERVICE WORKER ==========
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('sw.js');
            console.log('✅ Service Worker registered');
            return registration;
        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
        }
    }
}

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.style.display = 'block';
        installBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    installBtn.style.display = 'none';
                    deferredPrompt = null;
                });
            }
        });
    }
});

// ========== ОСНОВНОЙ ЛОКАЛЬНЫЙ СЛОВАРЬ ==========
const localDictionary = new Map([
    ['a', 'неопределённый артикль (перед согласными)'],
    ['an', 'неопределённый артикль (перед гласными)'],
    ['the', 'определённый артикль'],
    ['i', 'я'],
    ['you', 'ты, вы'],
    ['he', 'он'],
    ['she', 'она'],
    ['it', 'оно, это'],
    ['we', 'мы'],
    ['they', 'они'],
    ['me', 'мне, меня'],
    ['him', 'ему, его'],
    ['her', 'ей, её'],
    ['us', 'нам, нас'],
    ['them', 'им, их'],
    ['my', 'мой'],
    ['your', 'твой, ваш'],
    ['his', 'его'],
    ['its', 'его'],
    ['our', 'наш'],
    ['their', 'их'],
    ['this', 'этот'],
    ['that', 'тот, который'],
    ['these', 'эти'],
    ['those', 'те'],
    ['there', 'там'],
    ['some', 'некоторые, немного'],
    ['any', 'любые, сколько-нибудь'],
    ['every', 'каждый'],
    ['all', 'все'],
    ['both', 'оба'],
    ['neither', 'ни один'],
    ['either', 'любой, либо'],
    ['such', 'такой'],
    ['same', 'такой же'],
    ['am', 'являюсь, есть'],
    ['is', 'является, есть'],
    ['are', 'являетесь, являются, есть'],
    ['was', 'был, была, было'],
    ['were', 'были'],
    ['be', 'быть'],
    ['being', 'будучи, являясь'],
    ['been', 'был, была, было, были'],
    ['have', 'иметь, у меня есть'],
    ['has', 'имеет, у него/неё есть'],
    ['had', 'имел, имела, имело'],
    ['having', 'имеющий, имея'],
    ['do', 'делать (вспомогательный)'],
    ['does', 'делает (для he/she/it)'],
    ['did', 'делал, сделал'],
    ['doing', 'делающий, делая'],
    ['done', 'сделанный'],
    ['can', 'мочь, уметь'],
    ['could', 'мог, умел'],
    ['will', 'буду (вспомогательный)'],
    ['would', 'бы (сослагательное наклонение)'],
    ['should', 'следует, должен'],
    ['may', 'может (вероятность)'],
    ['might', 'мог бы (возможно)'],
    ['must', 'должен (обязанность)'],
    ['borrow', 'занимать (брать взаймы)'],
    ['lend', 'одалживать (давать взаймы)'],
    ['save', 'копить, откладывать'],
    ['waste', 'тратить впустую, разбазаривать'],
    ['earn', 'зарабатывать'],
    ['owe', 'быть должным, задолжать'],
    ['inherit', 'унаследовать'],
    ['charge', 'брать плату, взимать'],
    ['afford', 'позволить себе (по деньгам)'],
    ['cost', 'стоить'],
    ['invest', 'инвестировать, вкладывать'],
    ['raise', 'собирать (деньги)'],
    ['need', 'нуждаться'],
    ['want', 'хотеть'],
    ['like', 'нравиться'],
    ['love', 'любить, очень нравиться'],
    ['hate', 'ненавидеть'],
    ['use', 'использовать'],
    ['make', 'делать, создавать'],
    ['lose', 'терять'],
    ['spend', 'тратить'],
    ['pay', 'платить'],
    ['buy', 'покупать'],
    ['sell', 'продавать'],
    ['keep', 'держать, хранить'],
    ['find', 'находить'],
    ['leave', 'оставлять, уезжать'],
    ['bring', 'приносить'],
    ['take', 'брать'],
    ['give', 'давать'],
    ['get', 'получать, становиться'],
    ['put', 'класть, ставить'],
    ['set', 'устанавливать'],
    ['think', 'думать'],
    ['know', 'знать'],
    ['understand', 'понимать'],
    ['remember', 'помнить'],
    ['forget', 'забывать'],
    ['hope', 'надеяться'],
    ['wish', 'желать'],
    ['try', 'пытаться, пробовать'],
    ['mean', 'означать, иметь в виду'],
    ['money', 'деньги'],
    ['cash', 'наличные'],
    ['card', 'карта (банковская)'],
    ['credit', 'кредит'],
    ['debt', 'долг'],
    ['loan', 'кредит, заём'],
    ['mortgage', 'ипотека'],
    ['salary', 'зарплата'],
    ['income', 'доход'],
    ['expense', 'расход, трата'],
    ['budget', 'бюджет'],
    ['savings', 'сбережения, накопления'],
    ['investment', 'инвестиция, вложение'],
    ['interest', 'процент (по кредиту)'],
    ['bill', 'счёт (к оплате)'],
    ['coin', 'монета'],
    ['wallet', 'бумажник'],
    ['receipt', 'чек'],
    ['price', 'цена'],
    ['value', 'ценность, стоимость'],
    ['bank', 'банк'],
    ['account', 'счёт (банковский)'],
    ['currency', 'валюта'],
    ['profit', 'прибыль'],
    ['loss', 'убыток'],
    ['tax', 'налог'],
    ['fee', 'плата, сбор'],
    ['fine', 'штраф'],
    ['change', 'сдача'],
    ['tip', 'чаевые'],
    ['job', 'работа'],
    ['work', 'работа'],
    ['company', 'компания'],
    ['business', 'бизнес'],
    ['market', 'рынок'],
    ['sale', 'распродажа'],
    ['discount', 'скидка'],
    ['offer', 'предложение'],
    ['deal', 'сделка'],
    ['contract', 'контракт'],
    ['payment', 'платёж'],
    ['balance', 'баланс'],
    ['deposit', 'депозит, задаток'],
    ['fund', 'фонд'],
    ['grant', 'грант'],
    ['bonus', 'бонус'],
    ['share', 'акция'],
    ['stock', 'акция'],
    ['head', 'голова'],
    ['hair', 'волосы'],
    ['face', 'лицо'],
    ['eye', 'глаз'],
    ['eyes', 'глаза'],
    ['ear', 'ухо'],
    ['nose', 'нос'],
    ['mouth', 'рот'],
    ['tooth', 'зуб'],
    ['teeth', 'зубы'],
    ['neck', 'шея'],
    ['shoulder', 'плечо'],
    ['back', 'спина'],
    ['chest', 'грудь'],
    ['stomach', 'живот'],
    ['arm', 'рука (от плеча)'],
    ['hand', 'кисть руки'],
    ['finger', 'палец'],
    ['leg', 'нога'],
    ['knee', 'колено'],
    ['foot', 'стопа'],
    ['feet', 'стопы'],
    ['tall', 'высокий'],
    ['short', 'низкий, короткий'],
    ['slim', 'стройный'],
    ['thin', 'худой'],
    ['overweight', 'полный'],
    ['athletic', 'спортивный'],
    ['beard', 'борода'],
    ['glasses', 'очки'],
    ['curly', 'кудрявый'],
    ['blonde', 'светлый'],
    ['bite', 'кусать'],
    ['clap', 'хлопать'],
    ['kick', 'пинать'],
    ['nod', 'кивать'],
    ['point', 'указывать'],
    ['smell', 'нюхать, пахнуть'],
    ['smile', 'улыбаться'],
    ['stare', 'пристально смотреть'],
    ['taste', 'пробовать на вкус'],
    ['touch', 'трогать'],
    ['whistle', 'свистеть'],
    ['school', 'школа'],
    ['student', 'ученик'],
    ['teacher', 'учитель'],
    ['lesson', 'урок'],
    ['homework', 'домашнее задание'],
    ['class', 'класс, урок'],
    ['subject', 'предмет'],
    ['exam', 'экзамен'],
    ['grade', 'оценка, класс'],
    ['uniform', 'школьная форма'],
    ['pupil', 'ученик'],
    ['nursery', 'детский сад'],
    ['primary', 'начальный'],
    ['secondary', 'средний'],
    ['private', 'частный'],
    ['state', 'государственный'],
    ['boarding', 'пансион'],
    ['term', 'семестр'],
    ['degree', 'диплом, степень'],
    ['graduate', 'выпускник'],
    ['revise', 'повторять'],
    ['pass', 'сдать'],
    ['fail', 'провалить'],
    ['cheat', 'списывать'],
    ['punish', 'наказывать'],
    ['expel', 'исключать'],
    ['discipline', 'дисциплина'],
    ['behaviour', 'поведение'],
    ['allow', 'разрешать'],
    ['let', 'позволять'],
    ['misbehave', 'плохо себя вести'],
    ['unless', 'если не'],
    ['until', 'до тех пор, пока не'],
    ['result', 'результат'],
    ['college', 'колледж'],
    ['university', 'университет'],
    ['kindergarten', 'детский сад'],
    ['elementary', 'начальный'],
    ['middle', 'средний'],
    ['semester', 'семестр'],
    ['trouble', 'неприятности']
]);

const translationCache = new Map();

function extractAndCacheWords(text) {
    if (!text || typeof text !== 'string') return;
    const words = text.match(/\b[a-zA-Z]{2,}(?:'[a-zA-Z]+)?\b/g) || [];
    for (const word of words) {
        const lowerWord = word.toLowerCase();
        if (lowerWord.length < 2) continue;
        if (translationCache.has(lowerWord)) continue;
        if (localDictionary.has(lowerWord)) {
            translationCache.set(lowerWord, localDictionary.get(lowerWord));
        } else {
            translationCache.set(lowerWord, `[${lowerWord}]`);
        }
    }
}

function extractAllWordsFromWeek(weekData) {
    if (!weekData || !weekData.days) return;
    for (const day of weekData.days) {
        if (day.vocabulary) {
            for (const vocab of day.vocabulary) {
                if (vocab.word) extractAndCacheWords(vocab.word);
                if (vocab.example) extractAndCacheWords(vocab.example);
                if (vocab.context_example) extractAndCacheWords(vocab.context_example);
            }
        }
        if (day.grammar) {
            if (day.grammar.rule) extractAndCacheWords(day.grammar.rule);
            if (day.grammar.examples) {
                for (const ex of day.grammar.examples) extractAndCacheWords(ex);
            }
        }
        if (day.exercises) {
            for (const ex of day.exercises) {
                if (ex.question) extractAndCacheWords(ex.question);
                if (ex.readingText) extractAndCacheWords(ex.readingText);
                if (ex.listeningText) extractAndCacheWords(ex.listeningText);
                if (ex.explanation) extractAndCacheWords(ex.explanation);
                if (ex.options) {
                    for (const opt of ex.options) extractAndCacheWords(opt);
                }
            }
        }
    }
}

let contextTranslationsMap = new Map();

function loadContextTranslations(weekData) {
    contextTranslationsMap.clear();
    if (!weekData || !weekData.days) return;
    for (const day of weekData.days) {
        if (day.vocabulary) {
            for (const vocab of day.vocabulary) {
                const word = vocab.word.toLowerCase().split(' ')[0];
                const contextTranslation = vocab.context_translation || vocab.translation;
                if (contextTranslation && contextTranslation.length < 50) {
                    contextTranslationsMap.set(word, contextTranslation);
                }
            }
        }
    }
    extractAllWordsFromWeek(weekData);
}

function getContextTranslation(word) {
    if (!word) return null;
    return contextTranslationsMap.get(word.toLowerCase()) || null;
}

function cleanEnglishText(text) {
    if (!text) return '';
    let cleaned = text;
    cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}]/gu, '');
    cleaned = cleaned.replace(/[\u{1F300}-\u{1F5FF}]/gu, '');
    cleaned = cleaned.replace(/[\u{1F680}-\u{1F6FF}]/gu, '');
    cleaned = cleaned.replace(/[\u{2600}-\u{26FF}]/gu, '');
    cleaned = cleaned.replace(/[\u{2700}-\u{27BF}]/gu, '');
    cleaned = cleaned.replace(/[\u{1F900}-\u{1F9FF}]/gu, '');
    cleaned = cleaned.replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '');
    cleaned = cleaned.replace(/[\(\)]/g, '');
    cleaned = cleaned.replace(/[^a-zA-Z0-9\s\.\,\!\?\'\'\£\$\€\-]/g, '');
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
}

async function translateWord(word, context = '') {
    if (!word || word.length < 2) return word;
    const cleanWord = word.replace(/<[^>]*>/g, '').trim().toLowerCase();
    if (cleanWord.length < 2) return word;

    if (translationCache.has(cleanWord)) {
        const cached = translationCache.get(cleanWord);
        if (cached && !cached.startsWith('[')) return cached;
        if (cached && cached.startsWith('[')) translationCache.delete(cleanWord);
    }

    if (localDictionary.has(cleanWord)) {
        const translation = localDictionary.get(cleanWord);
        translationCache.set(cleanWord, translation);
        return translation;
    }

    try {
        const response = await fetch('https://libretranslate.com/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: cleanWord, source: 'en', target: 'ru', format: 'text' })
        });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        if (data && data.translatedText) {
            let translation = data.translatedText;
            if (translation && translation.toLowerCase() !== cleanWord) {
                translationCache.set(cleanWord, translation);
                return translation;
            }
        }
        translationCache.set(cleanWord, `[${cleanWord}]`);
        return cleanWord;
    } catch (error) {
        return cleanWord;
    }
}

function speak(text, lang = 'en-US', rate = 0.85) {
    if (!window.speechSynthesis) {
        showToast('🔊 Озвучка не поддерживается', 'error');
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

function speakSentence(sentence, lang = 'en-US') {
    if (!sentence || sentence.length === 0) return;
    let cleanSentence = sentence.replace(/<[^>]*>/g, '');
    cleanSentence = cleanEnglishText(cleanSentence);
    cleanSentence = cleanSentence.replace(/_{2,}/g, ' ... ');
    cleanSentence = cleanSentence.replace(/[.,!?;:()\[\]{}"']/g, ' ');
    cleanSentence = cleanSentence.replace(/\s+/g, ' ').trim();
    if (cleanSentence.length === 0) return;
    speak(cleanSentence, lang, 0.85);
}

function showToast(message, type = 'success') {
    const oldToasts = document.querySelectorAll('.toast');
    oldToasts.forEach(toast => toast.remove());
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function makeWordsClickable(text, context = '') {
    if (!text) return '';
    const tagPlaceholders = [];
    let processedText = text.replace(/<[^>]+>/g, (match) => {
        const placeholder = `__TAG_${tagPlaceholders.length}__`;
        tagPlaceholders.push(match);
        return placeholder;
    });
    processedText = processedText.replace(/\b([a-zA-Z]{2,}(?:'[a-zA-Z]+)?)\b/g, (match) => {
        const safeWord = match.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `<span class="clickable-word" data-word="${safeWord}" data-context="${context.replace(/'/g, "\\'")}">${match}</span>`;
    });
    tagPlaceholders.forEach((placeholder, index) => {
        processedText = processedText.replace(placeholder, tagPlaceholders[index]);
    });
    return processedText;
}

function renderReadingTextContent(readingText) {
    if (!readingText) return '';
    let processedText = readingText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    processedText = processedText.replace(/\n/g, '<br>');
    const tagPlaceholders = [];
    processedText = processedText.replace(/<[^>]+>/g, (match) => {
        const placeholder = `{{TAG_${tagPlaceholders.length}}}`;
        tagPlaceholders.push({ placeholder, tag: match });
        return placeholder;
    });
    processedText = processedText.replace(/\b([A-Za-z]{2,}(?:'[A-Za-z]+)?)\b/g, (word) => {
        if (word.includes('{{TAG_')) return word;
        const safeWord = word.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `<span class="clickable-word" data-word="${safeWord}" data-context="">${word}</span>`;
    });
    for (const { placeholder, tag } of tagPlaceholders) {
        processedText = processedText.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), tag);
    }
    return processedText;
}

async function handleWordClickEvent(event) {
    const target = event.target;
    if (target.classList && target.classList.contains('clickable-word')) {
        const word = target.getAttribute('data-word') || target.textContent;
        const context = target.getAttribute('data-context') || '';
        const originalText = target.textContent;
        target.textContent = '⏳';
        const translation = await translateWord(word, context);
        target.textContent = originalText;
        showToast(`📖 ${word} → ${translation}`, 'info');
        event.stopPropagation();
    }
}

function initClickableWords() {
    document.body.addEventListener('click', handleWordClickEvent);
}

// ========== СЕРТИФИКАТ ==========
function showCertificate(weekTitle, overallScore, weekIcon = '🏆') {
    const oldModal = document.querySelector('.certificate-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 2000;`;

    const certificate = document.createElement('div');
    certificate.style.cssText = `background: var(--card-bg); border-radius: 24px; padding: 40px; max-width: 500px; width: 90%; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 3px solid var(--primary); animation: fadeInUp 0.5s ease;`;

    if (!document.querySelector('#certificate-animation')) {
        const style = document.createElement('style');
        style.id = 'certificate-animation';
        style.textContent = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`;
        document.head.appendChild(style);
    }

    certificate.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 16px;">${weekIcon}</div>
        <h2 style="color: var(--primary); margin: 16px 0; font-size: 2rem;">Поздравляем!</h2>
        <p style="font-size: 1.1rem; margin-bottom: 16px; color: var(--gray);">Вы успешно завершили</p>
        <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--text);">${weekTitle}</h3>
        <div style="background: var(--success); color: white; padding: 8px 24px; border-radius: 40px; display: inline-block; margin-bottom: 24px; font-weight: bold;">Средний балл: ${overallScore}%</div>
        <p style="margin-bottom: 24px; font-size: 1rem;">🎓 Вы получаете сертификат о прохождении недели!</p>
        <button onclick="this.closest('.certificate-modal').remove();" style="background: var(--primary); color: white; border: none; padding: 12px 32px; border-radius: 40px; cursor: pointer; font-size: 1rem;">Отлично! 🎉</button>
    `;

    modal.appendChild(certificate);
    document.body.appendChild(modal);
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ========== PWA — РЕГИСТРАЦИЯ ПРИ ЗАГРУЗКЕ ==========
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        initTheme();
        registerServiceWorker();
    });
}

// ========== УСТАНОВКА ТЕКУЩЕГО ГОДА В ПОДВАЛЕ ==========
function setCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    } else {
        setTimeout(setCurrentYear, 100);
    }
}

if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setCurrentYear);
    } else {
        setTimeout(setCurrentYear, 50);
    }
}

// ========== СОВЕТ ДНЯ / BREAKING NEWS ==========
const TIPS_LIST = [
    // ==================== ПСИХОЛОГИЯ И КОГНИТИВНЫЕ ИСКАЖЕНИЯ ====================
    { icon: "🧠", text: "Эффект Барнума (Barnum effect): люди принимают общие, расплывчатые описания личности как точные. На этом основаны гороскопы (horoscopes) и тесты вроде «Вы иногда сомневаетесь в себе, но у вас есть скрытый потенциал»." },
    { icon: "🔍", text: "Эвристика доступности (availability heuristic): мы считаем более вероятными те события, которые легче вспомнить. Именно поэтому люди боятся летать, хотя статистически это безопаснее, чем ездить на машине (driving a car)." },
    { icon: "⚓", text: "Эффект якоря (anchoring effect): первая услышанная цифра (даже случайная) влияет на последующие оценки. Судьи (judges) выносят более строгие приговоры, если перед этим бросают кубик (dice) с высоким числом." },
    { icon: "🎭", text: "Эффект Даннинга-Крюгера (Dunning-Kruger effect): люди с низкой квалификацией склонны переоценивать свои способности, а эксперты (experts) — сомневаться в себе." },
    { icon: "🪞", text: "Эффект «слепого пятна» (bias blind spot): мы легко замечаем когнитивные искажения (cognitive biases) у других, но не у себя." },
    { icon: "🧠", text: "Мозг (brain) не чувствует боли. В нём нет болевых рецепторов (pain receptors), поэтому нейрохирурги (neurosurgeons) могут проводить операции на мозге, когда пациент в сознании (conscious)." },
    { icon: "💧", text: "Мозг примерно на 75% состоит из воды. Обезвоживание (dehydration) даже на 2% ухудшает концентрацию (concentration) и память (memory)." },
    { icon: "😴", text: "«Переспать с мыслью» (sleep on it) — реальная стратегия. Отсрочка решения на ночь помогает делать более рациональный выбор (rational choice)." },
    { icon: "🎨", text: "Психологи из Кембриджа (Cambridge) выяснили: люди, которые смотрят на красивые произведения искусства (works of art), в среднем на 14% лучше решают абстрактные задачи (abstract tasks)." },
    { icon: "🧼", text: "Эффект Леди Макбет (Lady Macbeth effect): мытьё рук (washing hands) физически «смывает» чувство вины (guilt)." },
    { icon: "🚫", text: "Эффект страуса (ostrich effect): люди склонны игнорировать негативную информацию (negative information), если она угрожает их комфорту." },
    { icon: "📈", text: "Иллюзия контроля (illusion of control): мы переоцениваем свою власть над случайными событиями (random events)." },
    { icon: "🗣️", text: "Прайминг (priming): если перед решением задачи показать человеку слово «старый» (old), он будет идти медленнее. Слова и образы незаметно настраивают поведение." },
    { icon: "🤝", text: "Ошибка базовой ставки (base rate fallacy): мы игнорируем общую статистику (statistics), когда есть яркое описание одного случая (single case)." },
    { icon: "🔁", text: "Иллюзия правдивости (illusion of truth): если утверждение слышали раньше, оно кажется более правдоподобным (plausible) — даже если это была шутка." },
    { icon: "🎯", text: "Эффект контекста (context effect): мы охотнее замечаем и запоминаем то, что уже видели или слышали." },
    { icon: "😨", text: "Искажение в сторону негатива (negativity bias): плохие события запоминаются ярче и влияют на решения сильнее, чем хорошие." },
    { icon: "🏛️", text: "Эффект владения (endowment effect): мы ценим вещь выше, если она уже наша. Студентам давали кружки (mugs) и предлагали продать — они просили вдвое больше." },
    { icon: "📉", text: "Неприятие потерь (loss aversion): потеря $100 ощущается примерно в два раза сильнее, чем радость от находки $100." },
    { icon: "🧩", text: "Фрейминг (framing): один и тот же факт можно подать как «90% выживаемости» (survival rate) или «10% смертности» (mortality rate) — и решение будет разным." },
    { icon: "🎓", text: "Хоторнский эффект (Hawthorne effect): люди меняют поведение, когда знают, что за ними наблюдают (being watched)." },
    { icon: "🛒", text: "Эффект приманки (decoy effect): если рядом с дорогим товаром поставить ещё более дорогой, первый начнёт казаться выгодным (a bargain)." },
    { icon: "📊", text: "Ошибка конъюнкции (conjunction fallacy): «Линда — кассир и феминистка» кажется вероятнее, чем просто «Линда — кассир». Хотя логически это невозможно." },
    { icon: "🤔", text: "Эффект Струпа (Stroop effect): если слово «красный» (red) написано зелёным (green), мозгу требуется время, чтобы назвать цвет." },
    { icon: "🧠", text: "Мультизадачность (multitasking) — это миф. Мозг не может выполнять две задачи, требующие внимания, одновременно. Это быстрое переключение (task switching)." },
    { icon: "🧬", text: "Генетика (genetics) влияет на характер (character) примерно на 50%. Остальное — среда (environment), опыт (experience) и воспитание (upbringing)." },
    { icon: "🌙", text: "Во сне мозг обрабатывает информацию и укрепляет память. Лишение сна (sleep deprivation) даже на одну ночь снижает способность запоминать новое на 40%." },
    { icon: "☕", text: "Кофеин (caffeine) не даёт энергии — он блокирует рецепторы аденозина (adenosine receptors), который вызывает сонливость (drowsiness)." },
    { icon: "🍬", text: "Сахар (sugar) вызывает выброс дофамина (dopamine) — нейромедиатора удовольствия (pleasure). Именно поэтому тяга к сладкому так похожа на зависимость." },
    { icon: "🚶", text: "Прогулка (walk) на 20 минут повышает креативность (creativity) на 60%." },
    { icon: "🧘", text: "Медитация (meditation) снижает уровень кортизола (cortisol) — гормона стресса (stress hormone)." },
    { icon: "😊", text: "Улыбка (smile), даже «наигранная» (fake), запускает обратную связь: мышцы лица посылают в мозг сигнал, и настроение действительно улучшается." },

    // ==================== ФИЗИКА И ЗАКОНЫ ПРИРОДЫ ====================
    { icon: "❄️", text: "Парадокс Мпембы (Mpemba effect): горячая вода (hot water) может замёрзнуть быстрее холодной (cold water). В 1963 году школьник из Танзании (Tanzania) заметил это, делая мороженое (ice cream)." },
    { icon: "⚡", text: "Закон Хаббла (Hubble's law): чем дальше от нас галактика (galaxy), тем быстрее она удаляется (receding). Это доказало, что Вселенная (Universe) расширяется (expanding)." },
    { icon: "🌡️", text: "Температура молнии (lightning) достигает 30 000 °C — это в 5 раз горячее поверхности Солнца (the Sun's surface)." },
    { icon: "🧲", text: "Если убрать всё пустое пространство (empty space) внутри атомов (atoms), чайная ложка такого вещества весила бы около 5 миллиардов тонн (tons)." },
    { icon: "🔬", text: "Графен (graphene) — самый прочный материал (the strongest material), известный науке. Он в 200 раз прочнее стали (steel). За его открытие дали Нобелевскую премию (Nobel Prize)." },
    { icon: "🌊", text: "Звук (sound) в воде распространяется в 4,3 раза быстрее, чем в воздухе (air)." },
    { icon: "🌍", text: "Свет от Солнца доходит до Земли за 8 минут 20 секунд. За это время он преодолевает 150 миллионов километров (kilometers)." },
    { icon: "🧊", text: "Лёд (ice) не всегда холоднее воды. В состоянии «переохлаждённой жидкости» (supercooled liquid) вода может оставаться жидкой при −48 °C." },
    { icon: "🌈", text: "Радуга (rainbow) — это не объект, а оптическое явление (optical phenomenon). Исаак Ньютон (Isaac Newton) выделил 7 цветов, но спектр (spectrum) непрерывный." },
    { icon: "🔥", text: "Огонь (fire) не имеет твёрдой или жидкой формы — это плазма (plasma), ионизированный газ (ionized gas)." },
    { icon: "🔭", text: "Вселенная расширяется быстрее скорости света (speed of light). Расширяется само пространство (space itself), а не объекты в нём." },
    { icon: "🌋", text: "Вулканы (volcanoes) есть не только на суше. Более миллиона подводных вулканов (underwater volcanoes) скрыто под океанами (oceans)." },
    { icon: "🌙", text: "Луна (the Moon) удаляется от Земли на 3,8 сантиметра в год. Это выяснили с помощью лазерных отражателей (laser reflectors), установленных астронавтами (astronauts)." },
    { icon: "⚛️", text: "Вакуум (vacuum) не пуст. В нём постоянно рождаются и исчезают виртуальные частицы (virtual particles)." },
    { icon: "🧪", text: "Молекула воды (water molecule) — одна из немногих, которые в твёрдом состоянии легче, чем в жидком. Именно поэтому лёд плавает (floats)." },
    { icon: "🌡️", text: "Абсолютный нуль (absolute zero, −273,15 °C) недостижим. Это фундаментальный закон термодинамики (law of thermodynamics)." },
    { icon: "🪐", text: "Сатурн (Saturn) — единственная планета Солнечной системы (Solar System), плотность которой меньше плотности воды." },
    { icon: "⚡", text: "Электрический ток (electric current) в проводах распространяется со скоростью света, а электроны (electrons) движутся очень медленно." },
    { icon: "🧲", text: "Магнитное поле Земли (Earth's magnetic field) защищает нас от солнечного ветра (solar wind). Без него атмосфера (atmosphere) была бы сдута." },
    { icon: "🌊", text: "Приливы и отливы (tides) вызваны гравитацией (gravity) Луны и Солнца. Луна влияет сильнее, потому что она ближе." },
    { icon: "🌈", text: "Цвет (color) не существует в природе. Это интерпретация мозгом электромагнитных волн (electromagnetic waves) разной длины." },
    { icon: "🔥", text: "Солнце — не шар огня. Это раскалённый газ (hot gas / plasma), в центре которого идут термоядерные реакции (nuclear fusion reactions)." },
    { icon: "❄️", text: "Снежинки (snowflakes) всегда шестиугольные. Это связано с кристаллической решёткой (crystal lattice) льда." },
    { icon: "🌍", text: "Земля (Earth) не круглая. Она сплюснута у полюсов (flattened at the poles) — это называется геоид (geoid)." },
    { icon: "🌪️", text: "Торнадо (tornado) может поднять в воздух автомобиль (car), но не может «всосать» человека и оставить его невредимым. Это миф из фильмов." },
    { icon: "🔊", text: "Звук не распространяется в вакууме. В космосе (outer space) — полная тишина (silence)." },
    { icon: "💡", text: "Скорость света (speed of light) — 299 792 458 метров в секунду. Она постоянна для всех наблюдателей (observers)." },
    { icon: "🧊", text: "Морская вода (sea water) замерзает при −2 °C, а не при 0 °C. Соль (salt) понижает температуру кристаллизации." },
    { icon: "🌡️", text: "Самая низкая температура (lowest temperature), достигнутая человеком, — около −273,14 °C." },
    { icon: "🌈", text: "Северное сияние (Northern Lights / Aurora Borealis) возникает, когда заряженные частицы (charged particles) солнечного ветра сталкиваются с атомами атмосферы." },
    { icon: "⚛️", text: "Масса (mass) — это не количество вещества, а мера энергии (measure of energy). E=mc² означает, что даже покоящееся тело обладает огромной энергией." },
    { icon: "🌌", text: "Нейтронная звезда (neutron star) имеет плотность около 10¹⁷ кг/м³. Чайная ложка её вещества весила бы как гора Эверест (Mount Everest)." },

    // ==================== МАТЕМАТИКА И ЛОГИКА ====================
    { icon: "🔢", text: "Великая теорема Ферма (Fermat's Last Theorem): xⁿ + yⁿ = zⁿ не имеет решений в целых числах (whole numbers) при n > 2. Пьер Ферма написал, что нашёл доказательство (proof), но оно не помещается на полях (margins)." },
    { icon: "🧮", text: "Теорема о четырёх красках (Four Color Theorem): любую карту (map) можно раскрасить всего четырьмя цветами так, чтобы соседние области (neighboring regions) не совпадали." },
    { icon: "🔄", text: "Число π (pi) иррационально (irrational). Его десятичная запись бесконечна и непериодична. В ней встречается любая последовательность цифр (digit sequence)." },
    { icon: "📐", text: "Теорема Пифагора (Pythagorean theorem) была известна за 1000 лет до Пифагора. Вавилонские таблички (Babylonian tablets) с тройками чисел старше греческого математика." },
    { icon: "♾️", text: "Бесконечности (infinities) бывают разными. Количество чисел между 0 и 1 больше, чем количество всех целых чисел (whole numbers). Это доказал Георг Кантор (Georg Cantor)." },
    { icon: "🎲", text: "Парадокс Монти Холла (Monty Hall problem): если вы выбираете одну из трёх дверей (doors), а ведущий открывает пустую, вероятность выигрыша при смене выбора — 2/3." },
    { icon: "📊", text: "Теорема Лагранжа (Lagrange's theorem): любое натуральное число (natural number) можно представить как сумму четырёх квадратов (four squares)." },
    { icon: "🔢", text: "Простые числа (prime numbers) бесконечны. Это доказал Евклид (Euclid) в 300 г. до н.э." },
    { icon: "🧩", text: "Треугольник Паскаля (Pascal's triangle) содержит бесконечное множество закономерностей. В нём спрятаны числа Фибоначчи (Fibonacci numbers) и фракталы (fractals)." },
    { icon: "🌐", text: "Гипотеза Коллатца (Collatz conjecture): возьмите любое число. Если чётное — разделите на 2, если нечётное — умножьте на 3 и прибавьте 1. Рано или поздно придёте к 1." },
    { icon: "📏", text: "Число e (2,718...) — основание натуральных логарифмов (natural logarithms). Оно появляется везде: от сложных процентов (compound interest) до роста популяций (population growth)." },
    { icon: "🔷", text: "Теорема Наполеона (Napoleon's theorem): если на сторонах любого треугольника построить равносторонние треугольники (equilateral triangles), их центры образуют равносторонний треугольник." },
    { icon: "🎯", text: "Парадокс дней рождения (birthday paradox): в группе из 23 человек вероятность совпадения дней рождения (matching birthdays) больше 50%." },
    { icon: "♟️", text: "Число возможных шахматных партий (chess games) больше, чем атомов (atoms) в наблюдаемой Вселенной (observable Universe)." },
    { icon: "🧠", text: "Теорема Гёделя о неполноте (Gödel's incompleteness theorems): в любой достаточно сложной математической системе есть истинные утверждения (true statements), которые нельзя доказать." },
    { icon: "🧮", text: "Умножение на 11 (multiplication by 11): чтобы умножить двузначное число (two-digit number) на 11, сложите его цифры и вставьте между ними. 23 × 11 = 253." },
    { icon: "🔢", text: "Число 6174 — «число Капрекара» (Kaprekar's constant). Возьмите любое четырёхзначное число с разными цифрами, отсортируйте цифры по убыванию и возрастанию, вычтите меньшее из большего. Повторяйте — придёте к 6174." },
    { icon: "📐", text: "Теорема Минковского о выпуклом теле (Minkowski's theorem) — одна из самых красивых в геометрии чисел (geometry of numbers)." },
    { icon: "🎲", text: "Если подбросить монету (coin) 100 раз, вероятность выпадения ровно 50 орлов (heads) составляет всего 8%." },
    { icon: "🧩", text: "Парадокс Банаха-Тарского (Banach-Tarski paradox): шар (ball) можно разбить на конечное число частей и собрать два таких же шара." },
    { icon: "📊", text: "Корреляция не равна причинности (correlation does not imply causation). Продажи мороженого и утопления растут одновременно, но мороженое не топит людей — просто и то и другое происходит летом." },
    { icon: "🧮", text: "Формула Эйлера (Euler's identity) e^(iπ) + 1 = 0 объединяет пять фундаментальных констант. Её называют самой красивой формулой в математике." },
    { icon: "🔢", text: "Числа Фибоначчи (Fibonacci numbers) встречаются в природе: спирали ракушек (shells), семена подсолнуха (sunflower seeds), чешуйки ананаса (pineapple scales)." },
    { icon: "📐", text: "Постулат о параллельных прямых (parallel postulate) нельзя доказать из остальных аксиом Евклида. Это доказал Лобачевский (Lobachevsky), создав неевклидову геометрию (non-Euclidean geometry)." },
    { icon: "🧩", text: "Парадокс лжеца (liar paradox): «Это утверждение ложно». Если оно истинно, то оно ложно. Если ложно, то истинно." },
    { icon: "🎲", text: "Закон больших чисел (law of large numbers): чем больше испытаний, тем ближе результат к математическому ожиданию (expected value)." },
    { icon: "♾️", text: "Отель Гильберта (Hilbert's hotel): если в отеле с бесконечным числом номеров все заняты, можно всё равно заселить нового гостя." },
    { icon: "🔷", text: "Теорема Пифагора имеет более 370 доказательств. Это самая доказываемая теорема в истории математики." },
    { icon: "🧮", text: "Ноль (zero) — единственное число, которое нельзя использовать в знаменателе (denominator). Деление на ноль не определено." },
    { icon: "📊", text: "Парадокс Симпсона (Simpson's paradox): тенденция, видимая в группах, может исчезнуть или измениться при объединении групп." },
    { icon: "🔢", text: "Число 1 не является простым (prime), хотя делится только на себя и на единицу. Простые числа должны иметь ровно два делителя." },

    // ==================== ГЕОГРАФИЯ И СТРАНЫ ====================
    { icon: "🌍", text: "Самая холодная столица мира (the coldest capital) — Улан-Батор (Ulaanbaatar, Монголия). Среднегодовая температура около −0,4 °C." },
    { icon: "💧", text: "В озеро Байкал (Lake Baikal) впадает 336 рек (rivers), а вытекает только одна — Ангара (Angara)." },
    { icon: "🏝️", text: "Индия (India) — единственная страна, расположенная в четырёх полушариях (hemispheres) одновременно." },
    { icon: "🌋", text: "Самое сухое место на Земле (the driest place on Earth) — Сухие Долины Антарктиды (Dry Valleys of Antarctica). Там не было осадков (precipitation) два миллиона лет." },
    { icon: "🏔️", text: "Все 14 гор выше 8000 метров находятся в Азии (Asia). Эверест (Everest, 8848 м) — высочайшая из них." },
    { icon: "🇻🇦", text: "Самое маленькое государство мира (the smallest country) — Ватикан (Vatican). Площадь — 44 гектара (hectares)." },
    { icon: "🇱🇸", text: "Лесото (Lesotho), Ватикан и Сан-Марино (San Marino) — единственные страны, полностью окружённые (landlocked) территорией одного другого государства." },
    { icon: "🇳🇿", text: "Второе по длине географическое название в мире принадлежит холму в Новой Зеландии (New Zealand). Оно состоит из 84 букв." },
    { icon: "🇹🇭", text: "Полное название Бангкока (Bangkok) состоит из 163 букв. В переводе оно означает «Город ангелов, великий город, резиденция изумрудного Будды»." },
    { icon: "🌊", text: "Белое море (the White Sea) в России — одно из самых холодных. Температура воды может опускаться до −2 °C." },
    { icon: "🔥", text: "Персидский залив (the Persian Gulf) — самое тёплое море. Летом вода прогревается до 35,6 °C." },
    { icon: "🕳️", text: "Кольская сверхглубокая скважина (Kola Superdeep Borehole) — самая глубокая дыра, пробурённая человеком. Она достигла 12 262 метров." },
    { icon: "🗺️", text: "Континенты (continents) движутся со скоростью около 2,5 см в год. Это примерно скорость роста ногтя (nail growth)." },
    { icon: "🌏", text: "Россия (Russia) — самая большая страна мира. Её площадь 17,1 млн км²." },
    { icon: "🇮🇸", text: "Исландия (Iceland) — единственная часть Срединно-Атлантического хребта (Mid-Atlantic Ridge), которая находится над уровнем моря." },
    { icon: "🇳🇷", text: "Науру (Nauru) — единственное государство в мире, не имеющее официальной столицы (capital)." },
    { icon: "🌍", text: "Нил (the Nile) — единственная река, которая берёт начало у экватора (equator) и течёт в умеренную зону (temperate zone)." },
    { icon: "🇹🇴", text: "Королевство Тонга (Tonga) — единственная монархия (monarchy) в Океании (Oceania)." },
    { icon: "🇬🇧", text: "Великобритания (the UK) — одна из пяти стран, у которых нет писаной конституции (written constitution)." },
    { icon: "🇸🇲", text: "Сан-Марино (San Marino) — старейшая конституционная республика (constitutional republic) мира. Основана в 301 году." },
    { icon: "🇨🇳", text: "Самый крупный город мира по площади — Хулун-Буир (Hulunbuir) в Китае. Он занимает 263 953 км²." },
    { icon: "🌳", text: "Бамбук (bamboo) — самое быстрорастущее растение (fastest-growing plant). Он может вырасти на 90 см за сутки." },
    { icon: "🐟", text: "Самая большая рыба Амазонки (the Amazon) — пираруку (pirarucu). Она достигает 5 метров в длину." },
    { icon: "🏜️", text: "Сахара (the Sahara) — крупнейшая жаркая пустыня (hot desert) мира." },
    { icon: "🗾", text: "Япония (Japan) на 70% состоит из гор (mountains)." },
    { icon: "🇨🇦", text: "В Канаде (Canada) больше озёр (lakes), чем во всех остальных странах мира вместе взятых." },
    { icon: "🇦🇺", text: "Австралия (Australia) — единственный континент, на котором нет действующих вулканов (active volcanoes)." },
    { icon: "🇧🇷", text: "Бразилия (Brazil) граничит со всеми странами Южной Америки (South America), кроме Чили (Chile) и Эквадора (Ecuador)." },
    { icon: "🇿🇦", text: "ЮАР (South Africa) — единственная страна, в которой три столицы (three capitals): Претория, Кейптаун и Блумфонтейн." },
    { icon: "🗻", text: "Фудзияма (Mount Fuji) — самый высокий вулкан Японии. Последнее извержение (eruption) было в 1707 году." },
    { icon: "🏞️", text: "Аконкагуа (Aconcagua) — высочайший потухший вулкан (extinct volcano) мира. Высота 6960 метров." },
    { icon: "🌍", text: "На Северном полюсе (the North Pole) нет суши — только льды (ice). Под ними — Северный Ледовитый океан (the Arctic Ocean)." },

    // ==================== ИСТОРИЯ ====================
    { icon: "👑", text: "Наполеон (Napoleon) не был коротышкой. Его рост — около 168 см, выше среднего для французов того времени. Миф создала британская пропаганда (propaganda)." },
    { icon: "🔥", text: "Император Нерон (Emperor Nero) не играл на скрипке во время пожара в Риме (the Great Fire of Rome). Скрипку (violin) изобрели только через 1500 лет." },
    { icon: "🏺", text: "Древние греки (Ancient Greeks) придумали «жадную чашу» (greedy cup) для шуток над гостями. Она имела потайное отверстие, через которое незаметно вытекало вино (wine)." },
    { icon: "😂", text: "Древнегреческий философ Хрисипп (Chrysippus) умер от смеха над собственной шуткой." },
    { icon: "🚢", text: "Первую подводную лодку (submarine) в России построил Ефим Никонов в 1721 году. Она называлась «Потаённое судно»." },
    { icon: "🏛️", text: "Одной из причин падения Римской империи (the fall of the Roman Empire) учёные называют отравление свинцом (lead poisoning)." },
    { icon: "📜", text: "Майя (the Maya) использовали одно и то же слово для обозначения пространства (space) и времени (time)." },
    { icon: "🗿", text: "Дрезденский кодекс майя (Dresden Codex) содержит расчёты Венеры (Venus) с точностью до одного дня за 6000 лет." },
    { icon: "🧮", text: "Лестница пирамиды Чичен-Ица (Chichen Itza) имеет 91 ступень с каждой стороны. Вместе с верхней площадкой — 365, число дней в году." },
    { icon: "🍽️", text: "В Древнем Риме богатые гости вытирали руки о головы кудрявых детей вместо салфеток (napkins)." },
    { icon: "🎭", text: "Тиран Фаларид (Phalaris) сжигал людей в медном быке (brazen bull). При этом он считается первым прозаиком Греции." },
    { icon: "🏛️", text: "В Древнем Риме рядом с аренами гладиаторов (gladiator arenas) всегда стояли торговые палатки (shops)." },
    { icon: "🕰️", text: "Возраст Вселенной (the age of the Universe) — 13,8 миллиарда лет." },
    { icon: "📖", text: "Древние египтяне (Ancient Egyptians) отправляли экспедиции в Землю Пунта (Land of Punt) за благовониями (incense) и миррой (myrrh)." },
    { icon: "🎓", text: "Платон (Plato) умер, по одной из версий, от «слишком большого количества вечеринок»." },
    { icon: "🏺", text: "Эсхил (Aeschylus) погиб, по легенде, от того, что ему на голову упала черепаха (tortoise). Орёл принял его лысину (bald head) за камень." },
    { icon: "👑", text: "В истории зафиксированы долгожители (centenarians): англичанин Томас Парр (Thomas Parr) умер в 152 года." },
    { icon: "🗡️", text: "В 1577 году во время Ливонской войны (Livonian War) русские воеводы использовали лазутчиков (spies) для сбора сведений о шведах (Swedes)." },
    { icon: "🌲", text: "Тис (yew) — растение, которое может менять пол (sex)." },
    { icon: "📜", text: "Испанские миссионеры (Spanish missionaries) сожгли около 2–3 десятков рукописей майя (Maya manuscripts)." },
    { icon: "🏛️", text: "В Древней Греции существовал обычай «жертвоприношения первенцев» (firstborn sacrifice) в медной статуе бога." },
    { icon: "🗿", text: "Древние майя умели предсказывать затмения (eclipses). Они понимали, что Луну «пожирает» не бог, а тень Земли." },
    { icon: "⚔️", text: "В Древнем Риме существовала практика «децимации» (decimation) — казни каждого десятого в легионе за трусость (cowardice)." },
    { icon: "🏺", text: "Первые Олимпийские игры (Olympic Games) прошли в 776 году до н.э. Изначально это был религиозный праздник в честь Зевса (Zeus)." },
    { icon: "📚", text: "Александрийская библиотека (Library of Alexandria) была крупнейшей в древности. В ней хранилось от 40 000 до 700 000 свитков (scrolls)." },
    { icon: "🏛️", text: "Римский Колизей (the Colosseum) мог вмещать до 50 000 зрителей (spectators)." },
    { icon: "🕰️", text: "Средневековые рыцари (medieval knights) не всегда сражались в доспехах (armor). Полный комплект весил до 30 кг." },
    { icon: "📜", text: "Великую Китайскую стену (the Great Wall of China) строили более 2000 лет. Её общая длина — 21 196 километров." },
    { icon: "🗡️", text: "Древние викинги (Vikings) не носили рогатых шлемов (horned helmets). Это миф, придуманный художниками в XIX веке." },
    { icon: "🏺", text: "Пирамида Хеопса (the Great Pyramid of Giza) — единственное сохранившееся чудо света (Wonder of the World)." },
    { icon: "📖", text: "Самый старый письменный документ (the oldest written document) — глиняная табличка из Месопотамии (Mesopotamia). Ей более 5000 лет." },

    // ==================== ТЕХНОЛОГИИ И НАУКА ====================
    { icon: "💻", text: "В 2026 году автономная лаборатория (autonomous lab) с ИИ (AI) всего за 12 часов открыла новый яркий наноматериал (nanomaterial) без свинца (lead)." },
    { icon: "🔬", text: "Учёные создали «левитирующие» временные кристаллы (time crystals). Частицы в них левитируют на звуковой подушке (sound cushion)." },
    { icon: "🧠", text: "ИИ получил «мозжечок» (cerebellum): новая электронная система потребляет в 10 000 раз меньше энергии." },
    { icon: "⚛️", text: "Израильские учёные создали устойчивую квантовую память (quantum memory) на графене." },
    { icon: "💡", text: "Австралийские учёные создали сверхкомпактный AI-чип (chip), который выполняет вычисления (computations) со скоростью света." },
    { icon: "🧬", text: "В 2026 году представлены персонализированные мРНК-вакцины (mRNA vaccines) против рака (cancer)." },
    { icon: "🔋", text: "Технология «всё в сеть» (everything-to-grid): здания и машины могут отдавать накопленную энергию в общую сеть (power grid)." },
    { icon: "🌊", text: "Прямое извлечение лития (lithium extraction) из солевых растворов (brine) занимает часы вместо месяцев." },
    { icon: "🧪", text: "Пассивные радиационные охлаждающие материалы (passive radiative cooling materials) отражают тепло в космос без электричества." },
    { icon: "♻️", text: "Технология разрушения PFAS («вечных химикатов», forever chemicals) превращает их в безвредные природные вещества." },
    { icon: "🍺", text: "Точная ферментация (precision fermentation): генетически запрограммированные микробы (microbes) производят пищевые ингредиенты." },
    { icon: "💊", text: "Доставка лекарств (drug delivery) с помощью экзосом (exosomes) использует естественные «посылки» организма." },
    { icon: "🔐", text: "Решётчатая криптография (lattice-based cryptography) — новое поколение шифрования (encryption), устойчивое к атакам квантовых компьютеров." },
    { icon: "🌍", text: "Квантовое моделирование (quantum simulation) ускоряет разработку лекарств (drug development)." },
    { icon: "🤖", text: "Гибридные свето-материальные частицы (hybrid light-matter particles) открывают путь к сверхбыстрым вычислениям." },
    { icon: "⚡", text: "Метод «резервуарных вычислений» (reservoir computing) снизил энергопотребление (power consumption) гибких роботов в 75 раз." },
    { icon: "🖥️", text: "Самый мощный суперкомпьютер (supercomputer) в 2026 году выполняет более 10²¹ операций в секунду." },
    { icon: "📡", text: "В 2025 году впервые передали 2 Тбит/с по свободному пространству (free space) с помощью оптических терминалов (optical terminals) на спутниках." },
    { icon: "🕰️", text: "Временные кристаллы (time crystals) — новая форма материи (state of matter). Они «тикают» без внешней энергии." },
    { icon: "🔬", text: "Магнетар (magnetar) подтвердил предсказание Гейзенберга (Heisenberg) 90-летней давности: вакуум не пуст." },
    { icon: "🧠", text: "Нейроморфные чипы (neuromorphic chips) имитируют работу мозга." },
    { icon: "💻", text: "Квантовые компьютеры (quantum computers) в 2026 году научились решать задачи оптимизации (optimization problems)." },
    { icon: "🌐", text: "Интернет вещей (Internet of Things, IoT) в 2026 году объединяет более 50 миллиардов устройств." },
    { icon: "🚀", text: "Частные космические компании (private space companies) в 2026 году запустили более 2000 спутников (satellites)." },
    { icon: "🔋", text: "Твердотельные аккумуляторы (solid-state batteries) достигли плотности 500 Вт·ч/кг." },
    { icon: "🧬", text: "Генная терапия CRISPR (CRISPR gene therapy) вылечила серповидноклеточную анемию (sickle cell anemia) у 95% пациентов." },
    { icon: "🌱", text: "Вертикальные фермы (vertical farms) производят урожай в 100 раз эффективнее традиционных." },
    { icon: "🤖", text: "Роботы-хирурги (surgical robots) провели более 1 миллиона операций. Точность движений — 0,1 мм." },
    { icon: "📱", text: "Смартфоны в 2026 году получили нейроморфные чипы (neuromorphic chips), которые распознают речь без интернета." },
    { icon: "🔬", text: "Микроскопы (microscopes) в 2026 году видят атомы в реальном времени (real time)." },
    { icon: "🌍", text: "Системы ИИ предсказывают погоду (weather forecast) на 2 недели с точностью 90%." },
    { icon: "💡", text: "Фотонные процессоры (photonic processors) достигли скорости 100 ГГц. Они работают на свете, а не на электричестве." },

    // ==================== ЭКОНОМИКА ====================
    { icon: "📈", text: "Закон спроса и предложения (law of supply and demand): цена товара определяется балансом между желанием покупателей купить и готовностью продавцов продать. Если спрос растёт, а предложение нет — цена растёт." },
    { icon: "💸", text: "Инфляция (inflation) — это рост общего уровня цен. При инфляции 3% в год деньги обесцениваются примерно на треть за 30 лет." },
    { icon: "🏦", text: "Ключевая ставка (key interest rate) — главный инструмент центрального банка (central bank). Повышая ставку, ЦБ замедляет инфляцию, но охлаждает экономику." },
    { icon: "📉", text: "Дефляция (deflation) опаснее инфляции. Когда цены падают, люди откладывают покупки в ожидании ещё большего снижения — экономика останавливается." },
    { icon: "💼", text: "Закон Парето (Pareto principle): 80% результатов приносят 20% усилий. В экономике это означает, что 20% компаний создают 80% ВВП." },
    { icon: "💰", text: "ВВП (GDP, Gross Domestic Product) — это стоимость всех товаров и услуг, произведённых в стране за год. Это главный показатель размера экономики." },
    { icon: "📊", text: "Кривая Лаффера (Laffer curve): с определённого момента повышение налогов снижает поступления в бюджет, потому что люди начинают уклоняться от налогов (tax evasion)." },
    { icon: "🌍", text: "Закон сравнительного преимущества (comparative advantage) Дэвида Риккардо: даже если одна страна производит всё дешевле другой, взаимная торговля выгодна обеим, если каждая специализируется на том, что делает относительно лучше." },
    { icon: "💵", text: "Закон Грешема (Gresham's law): «плохие деньги вытесняют хорошие». Когда в обращении есть монеты с разным содержанием металла, люди тратят «плохие», а «хорошие» копят." },
    { icon: "🏭", text: "Невидимая рука рынка (invisible hand of the market) Адама Смита: каждый, преследуя свою выгоду, невольно способствует благу общества через механизм цен и конкуренции." },
    { icon: "🚀", text: "Эффект бабочки в экономике (butterfly effect in economics): небольшое событие — например, падение крупного банка — может спровоцировать мировой кризис. Это называется системным риском (systemic risk)." },
    { icon: "🧮", text: "Закон убывающей отдачи (law of diminishing returns): наращивание ресурсов даёт всё меньше результата. Первый работник удвоит выпуск, а десятый добавит лишь 5%." },
    { icon: "📈", text: "Правило 72 (Rule of 72): чтобы узнать, за сколько лет деньги удвоятся, разделите 72 на годовую процентную ставку. При ставке 6% капитал удвоится за 12 лет." },
    { icon: "💳", text: "Сложный процент (compound interest) — восьмое чудо света по словам Альберта Эйнштейна. Деньги, вложенные под 10% годовых, удваиваются каждые 7 лет." },
    { icon: "🏦", text: "Эффект мультипликатора (multiplier effect): каждый рубль, потраченный государством, увеличивает ВВП на 1,5–3 рубля за счёт цепочки расходов." },
    { icon: "🛒", text: "Закон Энгеля (Engel's law): чем богаче страна, тем меньшую долю доходов люди тратят на еду. В бедных странах — до 50%, в богатых — менее 10%." },
    { icon: "📉", text: "Кривая Филлипса (Phillips curve): между инфляцией и безработицей (unemployment) обычно есть обратная связь. Когда безработица падает, инфляция растёт." },
    { icon: "💼", text: "Естественный уровень безработицы (natural rate of unemployment): даже в здоровой экономике всегда есть 4–5% безработных. Это люди в поиске работы или меняющие профессию." },
    { icon: "🏛️", text: "Фискальная политика (fiscal policy) — это налоги и расходы государства. Монетарная политика (monetary policy) — это действия центробанка со ставкой и деньгами." },
    { icon: "💎", text: "Парадокс воды и алмазов (water-diamond paradox): вода жизненно необходима, но стоит копейки, а алмазы бесполезны, но дороги. Стоимость определяется редкостью и предельной полезностью (marginal utility)." },
    { icon: "🛍️", text: "Трагедия общин (tragedy of the commons): когда ресурс принадлежит всем, каждый старается взять больше, и ресурс истощается. Пример — вылов рыбы в мировом океане." },
    { icon: "🏦", text: "Эффект храповика (ratchet effect): цены и зарплаты растут легко, но с трудом снижаются. Поэтому инфляция редко бывает отрицательной." },
    { icon: "💰", text: "Ликвидность (liquidity) — это то, как быстро актив превращается в деньги. Наличные — абсолютная ликвидность, квартира — низкая." },
    { icon: "📊", text: "Индекс потребительских цен (CPI, Consumer Price Index) — главный показатель инфляции. Он измеряет изменение стоимости корзины типичного потребителя." },
    { icon: "🌐", text: "Глобализация (globalization) увеличила мировой ВВП в 5 раз с 1980 года, но и привела к росту неравенства (inequality) внутри стран." },
    { icon: "💵", text: "Закон Оукена (Okun's law): рост безработицы на 1% ведёт к падению ВВП на 2–3%." },
    { icon: "🏭", text: "Экономика масштаба (economies of scale): чем больше производство, тем ниже стоимость единицы товара. Именно поэтому крупные корпорации вытесняют мелких." },
    { icon: "🛢️", text: "Ресурсное проклятие (resource curse): страны, богатые нефтью (oil) и газом (gas), часто развиваются медленнее, чем страны без ресурсов. Это связано с коррупцией и слабыми институтами." },
    { icon: "📉", text: "Рынок медведей (bear market) — падение цен на 20% и более. Рынок быков (bull market) — устойчивый рост. Термины пришли из поведения животных: медведь бьёт лапой вниз, бык поднимает рогами вверх." },
    { icon: "💼", text: "Эффект богатства (wealth effect): когда растут цены на акции и недвижимость, люди чувствуют себя богаче и тратят больше, даже если доходы не изменились." },
    { icon: "🧾", text: "Закон Вагнера (Wagner's law): с ростом доходов государства растёт и доля государственных расходов в ВВП. Богатые страны тратят больше на социальные программы." },
    { icon: "💳", text: "Правило 50/30/20 в личных финансах: 50% дохода — на необходимое, 30% — на желания, 20% — на сбережения и инвестиции." },
    { icon: "🏦", text: "Диверсификация (diversification) — главный принцип инвестиций. Не кладите все яйца в одну корзину (don't put all your eggs in one basket)." },
    { icon: "📈", text: "Индекс S&P 500 (S&P 500) — главный индикатор американского фондового рынка (stock market). Он включает 500 крупнейших компаний США." },

    // ==================== АНГЛИЙСКИЙ ЯЗЫК: ИДИОМЫ, ЭТИМОЛОГИЯ, КУЛЬТУРА ====================
    { icon: "🐱", text: "Идиома (idiom) «It's raining cats and dogs» означает «льёт как из ведра» (raining heavily). Точное происхождение неизвестно, но это яркий пример образности английского." },
    { icon: "🇬🇧", text: "В британском английском (British English) «очередь» — это queue, а «лифт» — lift. В американском (American English) — line и elevator." },
    { icon: "📖", text: "Слово «butterfly» (бабочка) дословно переводится как «масляная муха» (butter + fly). По одной из версий, это связано со средневековым поверьем, что бабочки крадут масло." },
    { icon: "🐴", text: "Идиома «dark horse» (тёмная лошадка) впервые появилась в романе Бенджамина Дизраэли (Benjamin Disraeli) в 1831 году." },
    { icon: "🎭", text: "«A red herring» (отвлекающий манёвр) буквально переводится как «красная селёдка». Копчёная рыба с сильным запахом использовалась, чтобы сбить собак со следа (throw dogs off the scent)." },
    { icon: "🦶", text: "«To pull someone's leg» (тянуть за ногу) означает «морочить голову» (to joke with someone)." },
    { icon: "❤️", text: "«Wear one's heart on one's sleeve» — «носить сердце на рукаве» означает открыто проявлять чувства (to show emotions openly)." },
    { icon: "🐝", text: "«Know one's onions» — «знать свой лук» означает хорошо разбираться в чём-то (to know one's stuff)." },
    { icon: "🍔", text: "Американцы (Americans) могут показаться британцам слишком прямолинейными (too direct), а британцы американцам — излишне сдержанными (too reserved)." },
    { icon: "📝", text: "Разница в написании (spelling): британское colour, flavour, behaviour. Американское color, flavor, behavior. Всё дело в реформах Ноя Вебстера (Noah Webster)." },
    { icon: "👞", text: "«Bootlegger» — контрабандист (smuggler). В XIX веке торговцы прятали бутылки с алкоголем (alcohol) в голенищах сапог (boots)." },
    { icon: "🐶", text: "«Hair of the dog» — «шерсть собаки» означает «опохмелиться» (to cure a hangover with more alcohol)." },
    { icon: "🎩", text: "«Mad as a hatter» — «сумасшедший как шляпник». В XIX веке шляпники использовали ртуть (mercury), что вызывало отравление и психические расстройства." },
    { icon: "🍰", text: "«Pie in the sky» — «пирог в небе» означает несбыточные обещания (empty promises)." },
    { icon: "🦷", text: "«Bite the bullet» — «кусать пулю» означает стойко переносить боль (to endure pain bravely)." },
    { icon: "🐑", text: "«Black sheep» — «чёрная овца» — так называют «паршивую овцу» в семье (the odd one out)." },
    { icon: "🍞", text: "«Bring home the bacon» — «принести домой бекон» означает зарабатывать на жизнь (to earn a living)." },
    { icon: "🪨", text: "«Leave no stone unturned» — «не оставить камня на камне» означает сделать всё возможное (to do everything possible)." },
    { icon: "🎯", text: "«Hit the nail on the head» — «ударить гвоздь по шляпке» означает попасть в точку (to be exactly right)." },
    { icon: "🌧️", text: "«It's raining cats and dogs» — возможно, связано с тем, что в средневековых городах (medieval cities) мусор смывало дождём в канавы (gutters)." },
    { icon: "🐘", text: "«White elephant» — «белый слон» означает дорогую, но бесполезную вещь (an expensive but useless possession)." },
    { icon: "🎪", text: "«Bark up the wrong tree» — «лаять не на то дерево» означает ошибаться в выводах (to be mistaken)." },
    { icon: "🍳", text: "«Nest egg» — «яйцо в гнезде» означает сбережения на будущее (savings for the future)." },
    { icon: "🦅", text: "«Wild goose chase» — «погоня за диким гусём» означает бесполезное занятие (a pointless pursuit)." },
    { icon: "🐝", text: "«Bee in one's bonnet» — «пчела в шляпе» означает навязчивую идею (an obsession)." },
    { icon: "🎭", text: "«Break a leg» — «сломай ногу» — театральное пожелание удачи (good luck). Актеры верили, что прямое пожелание удачи может сглазить (jinx it)." },
    { icon: "🐈", text: "«Cat got your tongue?» — «Кошка съела твой язык?» — так спрашивают, почему человек молчит (why someone is silent)." },
    { icon: "🦷", text: "«Long in the tooth» — «длинный в зубе» означает пожилой возраст (old age). У старых лошадей дёсны опускаются." },
    { icon: "🥚", text: "«Egg someone on» — «подкладывать яйцо» означает подстрекать (to encourage someone to do something)." },
    { icon: "🐟", text: "«Big fish in a small pond» — «большая рыба в маленьком пруду» означает человека, важного в узком кругу (important in a small circle)." },
    { icon: "🎪", text: "«Bells and whistles» — «колокольчики и свистки» — дополнительные, часто ненужные функции (extra features)." },
    { icon: "🗡️", text: "«Double-edged sword» — «обоюдоострый меч» означает ситуацию с плюсами и минусами (a situation with pros and cons)." },

    // ==================== ИСКУССТВО ====================
    { icon: "🎨", text: "Леонардо да Винчи (Leonardo da Vinci) зашифровал музыку в «Тайной вечере» (The Last Supper). Куски хлеба на столе соответствуют нотам (notes)." },
    { icon: "🧠", text: "Микеланджело (Michelangelo) спрятал изображение человеческого мозга в «Сотворении Адама» (The Creation of Adam)." },
    { icon: "🖼️", text: "Сальвадор Дали (Salvador Dalí) не изобретал сюрреализм (Surrealism). Его исключили из движения, после чего он заявил: «Сюрреализм — это я»." },
    { icon: "🎭", text: "Рене Магритт (René Magritte) любил давать картинам названия, никак не связанные с изображением." },
    { icon: "🚽", text: "Марсель Дюшан (Marcel Duchamp) сделал обычный унитаз (urinal) произведением искусства. Он назвал его «Фонтан» (Fountain)." },
    { icon: "🎨", text: "Винсент Ван Гог (Vincent van Gogh) продал при жизни только одну картину — «Красные виноградники в Арле» (The Red Vineyard)." },
    { icon: "🖌️", text: "Пабло Пикассо (Pablo Picasso) написал более 50 000 работ. Это около 3 картин в день." },
    { icon: "🎨", text: "Клод Моне (Claude Monet) написал более 250 картин с кувшинками (water lilies)." },
    { icon: "🖼️", text: "«Мона Лиза» (Mona Lisa) Леонардо да Винчи висит в Лувре (the Louvre) за пуленепробиваемым стеклом (bulletproof glass)." },
    { icon: "🖌️", text: "Иван Айвазовский (Ivan Aivazovsky) написал более 6000 картин. Он никогда не писал с натуры (from nature)." },
    { icon: "🎨", text: "Казимир Малевич (Kazimir Malevich) написал «Чёрный квадрат» (Black Square) в 1915 году. Это манифест супрематизма (Suprematism)." },
    { icon: "🖼️", text: "«Крик» (The Scream) Эдварда Мунка (Edvard Munch) был украден дважды." },
    { icon: "🎭", text: "Рембрандт (Rembrandt) обанкротился (went bankrupt) и распродал имущество. Его дом в Амстердаме (Amsterdam) сейчас музей." },
    { icon: "🖌️", text: "Поль Гоген (Paul Gauguin) работал биржевым маклером (stockbroker), прежде чем стать художником." },
    { icon: "🎨", text: "Анри Матисс (Henri Matisse) в конце жизни не мог рисовать кистью. Он создавал аппликации (collages) из цветной бумаги." },
    { icon: "🖼️", text: "«Герника» (Guernica) Пикассо — реакция на бомбардировку (bombing) баскского города." },
    { icon: "🖌️", text: "Илья Репин (Ilya Repin) писал «Бурлаков на Волге» (Barge Haulers on the Volga) 3 года." },
    { icon: "🎨", text: "Василий Кандинский (Wassily Kandinsky) считал, что цвет может вызывать звук (sound)." },
    { icon: "🖼️", text: "«Девочка с персиками» (Girl with Peaches) Валентина Серова — портрет дочери мецената (patron)." },
    { icon: "🖌️", text: "Фрида Кало (Frida Kahlo) написала 55 автопортретов (self-portraits)." },
    { icon: "🎨", text: "«Звёздная ночь» (The Starry Night) Ван Гога написана в психиатрической лечебнице (asylum)." },
    { icon: "🖼️", text: "«Тайная вечеря» (The Last Supper) Леонардо писалась 4 года." },
    { icon: "🎭", text: "Сальвадор Дали и Луис Бунюэль (Luis Buñuel) сняли сюрреалистический фильм «Андалузский пёс» (An Andalusian Dog)." },
    { icon: "🖌️", text: "«Утро в сосновом лесу» (Morning in a Pine Forest) Шишкина — совместная работа с Савицким (Savitsky). Медведей написал Савицкий." },
    { icon: "🎨", text: "«Богатыри» (Bogatyrs) Васнецова (Vasnetsov) писались почти 20 лет." },
    { icon: "🖼️", text: "«Последний день Помпеи» (The Last Day of Pompeii) Брюллова (Bryullov) принёс ему мировую славу." },
    { icon: "🖌️", text: "«Незнакомка» (The Unknown Woman) Крамского (Kramskoy) — символ загадочной женской красоты." },
    { icon: "🎨", text: "«Девятый вал» (The Ninth Wave) Айвазовского — самая известная русская морская картина." },

    // ==================== ТЕХНИКИ ЗАПОМИНАНИЯ И ИЗУЧЕНИЯ ====================
    { icon: "🧠", text: "Метод локусов (method of loci / memory palace): привяжите факты к хорошо знакомому месту. Древние римляне запоминали речи, «расставляя» аргументы по комнатам дома." },
    { icon: "📚", text: "Интервальное повторение (spaced repetition): повторяйте материал через 1 день, 7 дней, 16 дней, 35 дней. Эббингауз (Ebbinghaus) доказал, что так информация запоминается в 5 раз лучше." },
    { icon: "📝", text: "Метод пиктограмм (pictogram method): рисуйте простые символы для каждого слова. Визуальные образы (visual images) запоминаются в 3 раза лучше." },
    { icon: "🎯", text: "Техника Фейнмана (Feynman technique): объясните тему ребёнку. Если не можете — значит, вы её не поняли." },
    { icon: "🔁", text: "Активное припоминание (active recall): не перечитывайте, а пытайтесь вспомнить. Тестирование себя (self-testing) даёт в 2 раза больше." },
    { icon: "🌙", text: "Сон — часть обучения. Мозг обрабатывает информацию во сне (during sleep). Учите перед сном — запомнится лучше." },
    { icon: "💧", text: "Пейте воду (drink water) во время учёбы. Обезвоживание на 2% снижает концентрацию и память на 15%." },
    { icon: "🎵", text: "Музыка без слов (instrumental music) помогает сосредоточиться. Слова конкурируют с текстом." },
    { icon: "📱", text: "Уберите телефон (put your phone away). Даже в беззвучном режиме (silent mode) он снижает концентрацию на 20%." },
    { icon: "🚶", text: "Гуляйте перед учёбой. 20 минут ходьбы повышают креативность на 60%." },
    { icon: "🥜", text: "Перекус (snack): орехи (nuts) и ягоды (berries) улучшают кровоток (blood flow) в мозге." },
    { icon: "📝", text: "Ведите конспект от руки (handwritten notes). Моторика рук активирует больше зон мозга, чем набор текста." },
    { icon: "🗣️", text: "Проговаривайте материал вслух (out loud). Это задействует слуховую память (auditory memory)." },
    { icon: "🧘", text: "Медитация перед учёбой улучшает концентрацию. 10 минут осознанности (mindfulness) снижают уровень стресса." },
    { icon: "📖", text: "Читайте вслух. Это тренирует произношение (pronunciation) и укрепляет нейронные связи (neural connections)." },
    { icon: "🎮", text: "Играйте в игры на английском. Это практика без стресса и скуки." },
    { icon: "🌍", text: "Думайте на английском (think in English). Начните с простых мыслей: «I need coffee»." },
    { icon: "🎬", text: "Смотрите фильмы с субтитрами (subtitles). Сначала русские, потом английские, потом без них." },
    { icon: "📚", text: "Читайте книги, которые уже знаете (familiar books). Сюжет (plot) поможет понять незнакомые слова." },
    { icon: "🎵", text: "Учите песни наизусть (by heart). Ритм (rhythm) и рифма (rhyme) помогают запоминать целые фразы." },
    { icon: "✍️", text: "Пишите от руки (write by hand). Это медленнее, но запоминается лучше." },
    { icon: "🗓️", text: "Занимайтесь по 15 минут в день. Регулярность (consistency) важнее длительности (duration)." },
    { icon: "🎯", text: "Ставьте конкретные цели (specific goals). Не «выучить английский», а «пройти 3 урока сегодня»." },
    { icon: "🏆", text: "Награждайте себя (reward yourself). После урока — чашка кофе или 5 минут TikTok." },
    { icon: "🧩", text: "Используйте карточки (flashcards). Anki и Quizlet автоматически применяют интервальное повторение." },
    { icon: "🌳", text: "Меняйте места учёбы (change your study location). Новая обстановка укрепляет память о материале." },
    { icon: "🎨", text: "Рисуйте схемы (mind maps). Визуализация (visualization) помогает понять связи между темами." },
    { icon: "👥", text: "Учите с другом (study with a friend). Объяснение другому человеку — лучший способ понять самому." },
    { icon: "📝", text: "Пишите короткие эссе (short essays). 5 предложений в день — и через месяц вы заметите прогресс." },
    { icon: "🔊", text: "Слушайте подкасты (podcasts). Даже 10 минут в день тренируют восприятие на слух." },
    { icon: "📱", text: "Переключите телефон на английский. Вы будете учить язык без усилий." },
    { icon: "🎭", text: "Разыгрывайте диалоги (role-play dialogues). Представьте, что вы заказываете кофе в Лондоне." },

    // ==================== ЛОГИЧЕСКИЕ ПАРАДОКСЫ ====================
    { icon: "🤥", text: "Парадокс лжеца (liar paradox): «Это утверждение ложно» (This statement is false). Если оно истинно, то оно ложно. Если ложно, то истинно." },
    { icon: "✂️", text: "Парадокс парикмахера (barber paradox): парикмахер бреет всех, кто не бреется сам. Должен ли он брить себя?" },
    { icon: "🏹", text: "Парадокс Зенона (Zeno's paradox): Ахиллес (Achilles) никогда не догонит черепаху (tortoise)." },
    { icon: "🐦", text: "Парадокс воронов (raven paradox): «Все вороны чёрные» логически эквивалентно «Все не-чёрные объекты — не вороны»." },
    { icon: "🎁", text: "Парадокс неожиданного экзамена (surprise exam paradox): учитель говорит, что экзамен будет на следующей неделе, но никто не будет знать, в какой день." },
    { icon: "🍫", text: "Парадокс кучи (sorites paradox): если убрать одно зерно, куча останется кучей. Но в какой момент куча перестанет быть кучей?" },
    { icon: "⏰", text: "Парадокс времени (time paradox): если время бесконечно, то всё, что может произойти, уже произошло." },
    { icon: "🧩", text: "Парадокс Карри (Curry's paradox): «Если это предложение истинно, то Санта-Клаус существует»." },
    { icon: "💀", text: "Парадокс смертника (surprise hanging paradox): заключённому говорят, что его повесят в один из дней на следующей неделе, но он не будет знать, в какой." },
    { icon: "🚢", text: "Парадокс Тесея (Ship of Theseus): если заменить все доски корабля по одной, останется ли это тем же кораблём?" },
    { icon: "🐔", text: "Парадокс курицы и яйца (chicken and egg paradox): что появилось раньше? С точки зрения эволюции — яйцо." },
    { icon: "🎲", text: "Парадокс игрока (gambler's fallacy): если монета выпала орлом 10 раз подряд, вероятность решки всё равно 50%." },
    { icon: "📊", text: "Парадокс Симпсона (Simpson's paradox): тенденция в группах может исчезнуть при объединении групп." },
    { icon: "🪞", text: "Парадокс близнецов (twin paradox): один близнец летит в космос со скоростью света, другой остаётся. Вернувшись, космонавт будет моложе." },
    { icon: "🌌", text: "Парадокс Ольберса (Olbers' paradox): почему ночное небо тёмное? Если Вселенная бесконечна и полна звёзд, небо должно быть ярким." },
    { icon: "🧠", text: "Парадокс Моравека (Moravec's paradox): роботы легко делают сложные вещи (шахматы), но не могут делать простые (ходьба)." },
    { icon: "🔢", text: "Парадокс Галилея (Galileo's paradox): натуральных чисел столько же, сколько их квадратов (squares)." },
    { icon: "⏳", text: "Парадокс Ньюкома (Newcomb's paradox): предсказатель знает ваш выбор и кладёт деньги в ящик. Парадокс не решён." },
    { icon: "📜", text: "Парадокс Эпименида (Epimenides paradox): «Все критяне лжецы» (All Cretans are liars) — сказал критянин." },
    { icon: "🔮", text: "Парадокс предсказания (prediction paradox): если предсказание известно, оно меняет поведение людей." },
    { icon: "🎯", text: "Парадокс лотереи (lottery paradox): вероятность выигрыша ничтожна, но кто-то всегда выигрывает." },
    { icon: "🧩", text: "Парадокс Рассела (Russell's paradox): множество всех множеств, которые не содержат себя. Содержит ли оно себя?" },
    { icon: "🌍", text: "Парадокс Ферми (Fermi paradox): если внеземные цивилизации (extraterrestrial civilizations) существуют, почему мы не видим их следов?" },
    { icon: "⏰", text: "Парадокс дедушки (grandfather paradox): если вы отправитесь в прошлое и убьёте своего деда, вы не родитесь." },
    { icon: "📖", text: "Парадокс библиотеки (library paradox): в библиотеке есть каталог всех каталогов, которые не ссылаются на себя." },
    { icon: "🎭", text: "Парадокс актёра (actor's paradox): актёр на сцене одновременно и актёр, и персонаж." },
    { icon: "🧠", text: "Парадокс знания (paradox of knowledge): «Я знаю, что ничего не знаю» — сказал Сократ (Socrates)." },
    { icon: "🔍", text: "Парадокс наблюдателя (observer paradox): наблюдение меняет наблюдаемое. В квантовой физике (quantum physics) частица ведёт себя по-разному при наблюдении." },
    { icon: "🎲", text: "Парадокс Бертрана (Bertrand's paradox): какова вероятность, что случайная хорда (chord) круга длиннее стороны вписанного треугольника?" },
    { icon: "🌌", text: "Парадокс бесконечной вселенной (infinite universe paradox): если вселенная бесконечна, то где-то есть точная копия вас." },
    { icon: "📚", text: "Парадокс чтения (reading paradox): чтобы понять книгу, нужно её прочитать. Но чтобы понять, стоит ли её читать, нужно уже её прочитать." },
    { icon: "🎯", text: "Парадокс цели (goal paradox): если вы стремитесь к счастью (happiness), вы не будете счастливы." },
];

function getRandomTip() {
    if (!TIPS_LIST || TIPS_LIST.length === 0) {
        return { icon: "🧠", text: "Учитесь каждый день!" };
    }
    return TIPS_LIST[Math.floor(Math.random() * TIPS_LIST.length)];
}

function displayDailyTip() {
    const tipBlock = document.getElementById('dailyTipText');
    if (!tipBlock) return;

    let tip = null;
    const raw = localStorage.getItem('dailyTip');
    const lastTipHour = localStorage.getItem('dailyTipHour');
    const currentHour = new Date().getHours();

    if (raw && lastTipHour && parseInt(lastTipHour) === currentHour) {
        try {
            tip = JSON.parse(raw);
            if (!tip || typeof tip !== 'object' || !tip.icon) tip = null;
        } catch (e) {
            tip = null;
        }
    }

    if (!tip) {
        tip = getRandomTip();
        localStorage.setItem('dailyTip', JSON.stringify(tip));
        localStorage.setItem('dailyTipHour', currentHour);
    }

    tipBlock.innerHTML = `<span class="tip-icon">${tip.icon}</span> ${tip.text}`;
}

function refreshDailyTip() {
    const newTip = getRandomTip();
    const tipBlock = document.getElementById('dailyTipText');
    if (tipBlock) {
        tipBlock.innerHTML = `<span class="tip-icon">${newTip.icon}</span> ${newTip.text}`;
        showToast('✨ Факт обновлён!', 'info');
        const currentHour = new Date().getHours();
        localStorage.setItem('dailyTip', JSON.stringify(newTip));
        localStorage.setItem('dailyTipHour', currentHour);
    }
}

function getRandomTip() {
    return TIPS_LIST[Math.floor(Math.random() * TIPS_LIST.length)];
}

function displayDailyTip() {
    const tipBlock = document.getElementById('dailyTipText');
    if (!tipBlock) return;
    let tip = localStorage.getItem('dailyTip');
    const lastTipHour = localStorage.getItem('dailyTipHour');
    const currentHour = new Date().getHours();
    if (!tip || lastTipHour != currentHour) {
        tip = getRandomTip();
        localStorage.setItem('dailyTip', JSON.stringify(tip));
        localStorage.setItem('dailyTipHour', currentHour);
    } else {
        tip = JSON.parse(tip);
    }
    tipBlock.innerHTML = `<span class="tip-icon">${tip.icon}</span> ${tip.text}`;
}

function refreshDailyTip() {
    const newTip = getRandomTip();
    const tipBlock = document.getElementById('dailyTipText');
    if (tipBlock) {
        tipBlock.innerHTML = `<span class="tip-icon">${newTip.icon}</span> ${newTip.text}`;
        showToast('✨ Совет обновлён!', 'info');
    }
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        displayDailyTip();
        const refreshBtn = document.getElementById('refreshTipBtn');
        if (refreshBtn) refreshBtn.addEventListener('click', refreshDailyTip);
    });
}

// ========== ЭКСПОРТ В ГЛОБАЛЬНУЮ ОБЛАСТЬ ==========
window.translateWord = translateWord;
window.getContextTranslation = getContextTranslation;
window.loadContextTranslations = loadContextTranslations;
window.speak = speak;
window.speakSentence = speakSentence;
window.showToast = showToast;
window.toggleTheme = toggleTheme;
window.loadTheme = loadTheme;
window.makeWordsClickable = makeWordsClickable;
window.initClickableWords = initClickableWords;
window.showCertificate = showCertificate;
window.registerServiceWorker = registerServiceWorker;
window.renderReadingTextContent = renderReadingTextContent;
window.refreshDailyTip = refreshDailyTip;