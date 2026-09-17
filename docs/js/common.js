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

// ========== СОВЕТ ДНЯ ==========
const TIPS_LIST = [
    { icon: "🧠", text: "Английский легче учить по 15 минут каждый день, чем 2 часа раз в неделю. Регулярность важнее интенсивности!" },
    { icon: "📖", text: "Самые популярные слова в английском — the, be, to, of, and. На них приходится около 10% любого текста!" },
    { icon: "🎯", text: "Чтобы быстро запомнить слово, придумайте с ним смешное предложение. Эмоции помогают памяти!" },
    { icon: "🗣️", text: "Разговаривайте сами с собой на английском. Да, это не странно — это эффективно!" },
    { icon: "🎬", text: "Смотрите любимые фильмы и сериалы в оригинале с английскими субтитрами." },
    { icon: "📝", text: "Ведите дневник на английском. Хотя бы 2-3 предложения в день." },
    { icon: "🔊", text: "Слушайте подкасты на английском во время прогулки или уборки." },
    { icon: "📚", text: "Читайте книги, которые вы уже читали на русском." },
    { icon: "💬", text: "Используйте новый язык в быту: называйте предметы вокруг на английском." },
    { icon: "🎮", text: "Играйте в видеоигры на английском. Диалоги и интерфейс — отличная практика!" },
    { icon: "📱", text: "Переключите телефон на английский. Вы будете видеть язык каждый день." },
    { icon: "🎵", text: "Слушайте английские песни и пытайтесь подпевать." },
    { icon: "🔍", text: "Слово «каникулы» происходит от латинского «canicula» — так называли звезду Сириус." },
    { icon: "💻", text: "Слово «компьютер» раньше было профессией!" },
    { icon: "🤖", text: "Слово «робот» придумал чешский писатель Карел Чапек." },
    { icon: "🐘", text: "Слоны — единственные млекопитающие, которые не умеют прыгать." },
    { icon: "🦒", text: "Жирафам достаточно 30 минут сна в день." },
    { icon: "🐧", text: "Императорские пингвины могут не есть до 3 месяцев." },
    { icon: "✏️", text: "Обычным карандашом можно написать линию длиной 56 км!" },
    { icon: "⏰", text: "Мозг лучше всего запоминает информацию утром и перед сном." },
    { icon: "🧠", text: "Объясняйте новую тему кому-то другому — так вы запоминаете в 2 раза лучше." },
    { icon: "💪", text: "Ошибки — это не провал, а часть обучения." },
    { icon: "🧘", text: "Делайте короткие перерывы каждые 25–30 минут." }
];

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