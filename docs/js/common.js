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

/// ========== СОВЕТ ДНЯ / BREAKING NEWS ==========
const TIPS_LIST = [
    // === ИЗУЧЕНИЕ АНГЛИЙСКОГО ===
    { icon: "🧠", text: "Английский легче учить по 15 минут каждый день, чем 2 часа раз в неделю. Регулярность важнее интенсивности!" },
    { icon: "📖", text: "Самые популярные слова в английском — the, be, to, of, and. На них приходится около 10% любого текста!" },
    { icon: "🎯", text: "Чтобы быстро запомнить слово, придумайте с ним смешное предложение. Эмоции помогают памяти!" },
    { icon: "🗣️", text: "Разговаривайте сами с собой на английском. Да, это не странно — это эффективно!" },
    { icon: "🎬", text: "Смотрите любимые фильмы и сериалы в оригинале с английскими субтитрами. Так вы привыкнете к живой речи!" },
    { icon: "📝", text: "Ведите дневник на английском. Хотя бы 2-3 предложения в день — и прогресс не заставит себя ждать!" },
    { icon: "🔊", text: "Слушайте подкасты на английском во время прогулки или уборки. Так вы тренируете восприятие на слух без дополнительного времени!" },
    { icon: "📚", text: "Читайте книги, которые вы уже читали на русском. Знание сюжета поможет понять незнакомые слова из контекста!" },
    { icon: "💬", text: "Используйте новый язык в быту: называйте предметы вокруг на английском, думайте на английском!" },
    { icon: "🎮", text: "Играйте в видеоигры на английском. Диалоги и интерфейс — отличная языковая практика!" },
    { icon: "📱", text: "Переключите телефон на английский. Вы будете видеть язык каждый день и быстро привыкнете!" },
    { icon: "🎵", text: "Слушайте английские песни и пытайтесь подпевать. Это улучшает произношение и ритм речи!" },
    { icon: "🧘", text: "Делайте короткие перерывы каждые 25–30 минут. Мозгу нужно время, чтобы усвоить информацию." },
    { icon: "💪", text: "Ошибки — это не провал, а часть обучения. Каждая ошибка делает ваш мозг сильнее." },

    // === ИСТОРИЯ И ИЗОБРЕТЕНИЯ ===
    { icon: "🖋️", text: "Шрифт для незрячих людей придумал французский подросток Луи Брайль. Он потерял зрение в 8 лет, а к 15 годам уже разработал свою систему письменности." },
    { icon: "🧊", text: "Первые коньки появились более 3000 лет назад. Древние люди делали их из костей животных и использовали для передвижения по льду." },
    { icon: "🎧", text: "Меховые наушники изобрёл 15-летний Честер Гринвуд в 1873 году. Он просто хотел защитить уши от ветра, когда катался на коньках." },
    { icon: "🛹", text: "Скейтборд придумали в Калифорнии в 1950-х годах. Серферы хотели заниматься любимым делом, когда волны были недостаточно высокими." },
    { icon: "🚴", text: "Первый велосипед назывался «машиной для бега». У него не было педалей — по нему просто отталкивались ногами." },
    { icon: "🧷", text: "Суперклей изобрели случайно. Американский химик пытался создать прозрачный пластик для орудийных прицелов, а получил невероятно прочный клей." },
    { icon: "🧸", text: "Плюшевого мишку назвали в честь президента США Теодора Рузвельта. Однажды он пожалел раненого медвежонка на охоте, и это стало символом доброты." },
    { icon: "🪁", text: "Воздушный змей — одно из первых летательных устройств, изобретённых людьми. Его придумали в Китае более 2000 лет назад." },
    { icon: "📜", text: "Первая в мире атомная электростанция была запущена в 1954 году в городе Обнинске (СССР). Она проработала почти 48 лет без аварий." },
    { icon: "🛰️", text: "Первый искусственный спутник Земли был запущен 4 октября 1957 года. Он назывался «Спутник-1» и весил всего 83,6 килограмма." },
    { icon: "🌐", text: "Первый в мире сайт появился в 1991 году. Его создал Тим Бернерс-Ли, и он был посвящён тому, как работает интернет." },
    { icon: "💡", text: "Лампочку накаливания изобрели более 20 учёных до Эдисона. Но именно Эдисон сделал её долговечной и пригодной для массового производства." },
    { icon: "🖱️", text: "Компьютерную мышь изобрёл Дуглас Энгельбарт в 1964 году. Первая мышь была деревянной и имела только одну кнопку." },

    // === ФИЗИКА И НАУКА ===
    { icon: "⚡", text: "Температура молнии достигает 30 000 °C. Это примерно в 5 раз горячее, чем поверхность Солнца." },
    { icon: "🌍", text: "Свет от Солнца доходит до Земли примерно за 8 минут 20 секунд. За это время он преодолевает почти 150 миллионов километров." },
    { icon: "🧲", text: "Если бы можно было убрать всё пустое пространство внутри атомов, чайная ложка такого «вещества» весила бы около 5 миллиардов тонн." },
    { icon: "🌈", text: "Радуга — это оптическое явление, которое возникает, когда солнечный свет преломляется в каплях воды. Исаак Ньютон выделил 7 цветов, но на самом деле спектр непрерывный." },
    { icon: "🔬", text: "Графен — самый прочный материал, известный науке. Он в 200 раз прочнее стали и был открыт в 2004 году. За это открытие учёные получили Нобелевскую премию." },
    { icon: "🌡️", text: "Самая низкая температура, достигнутая человеком, — около −273,14 °C. При такой температуре атомы почти полностью останавливаются." },
    { icon: "🧬", text: "ДНК человека на 60% совпадает с ДНК банана. Но это не значит, что мы родственники — просто у всех живых организмов есть общие базовые гены." },
    { icon: "🪐", text: "Сатурн — единственная планета Солнечной системы, плотность которой меньше плотности воды. Если бы существовал достаточно большой океан, Сатурн мог бы в нём плавать." },
    { icon: "🌙", text: "Луна удаляется от Земли примерно на 3,8 сантиметра в год. Учёные выяснили это с помощью лазерных отражателей, установленных на Луне астронавтами." },
    { icon: "⭐", text: "Во Вселенной больше звёзд, чем песчинок на всех пляжах Земли. Только в нашей галактике Млечный Путь их около 100–400 миллиардов." },

    // === БИОЛОГИЯ И ЖИВОТНЫЕ ===
    { icon: "🦒", text: "У жирафа самое большое сердце среди наземных животных и очень высокое кровяное давление. А ещё его язык может быть длиной до 45 см и имеет тёмный цвет." },
    { icon: "🐙", text: "У осьминога прямоугольный зрачок и три сердца. Два перекачивают кровь к жабрам, а третье — к остальному телу." },
    { icon: "🐘", text: "Слоны — единственные млекопитающие, которые не умеют прыгать. Зато они отлично плавают, используя хобот как дыхательную трубку." },
    { icon: "🐝", text: "У пчёл пять глаз: два больших сложных и три простых на макушке. Они помогают ориентироваться в пространстве и определять время суток." },
    { icon: "🦘", text: "Кенгуру может прыгнуть до 3 метров в высоту и до 10 метров в длину. Хвост помогает ему балансировать и служит дополнительной опорой." },
    { icon: "🐢", text: "Черепахи могут дышать не только лёгкими, но и через специальные органы в задней части тела. Это помогает им выживать в воде." },
    { icon: "🐨", text: "Отпечатки пальцев коалы почти не отличаются от человеческих. Учёные используют это для изучения эволюции млекопитающих." },
    { icon: "🦁", text: "Львы-самцы могут спать до 20 часов в сутки, а львицы в это время охотятся и заботятся о потомстве." },
    { icon: "🐬", text: "Дельфины дают друг другу имена. Каждый дельфин имеет уникальный «свист», на который откликается, когда его зовут." },
    { icon: "🐜", text: "Муравьи могут поднимать предметы в 50 раз тяжелее собственного веса. Если бы человек был таким же сильным, он мог бы поднять автомобиль." },
    { icon: "🌳", text: "Секвойя — самое долгоживущее дерево на Земле. Некоторые экземпляры живут более 3000 лет и достигают высоты 100 метров." },
    { icon: "🍄", text: "Грибы — это не растения и не животные. Они образуют отдельное царство живой природы и ближе к животным, чем к растениям." },

    // === МОЗГ И ЧЕЛОВЕК ===
    { icon: "🧠", text: "Мозг человека — единственный орган, который продолжает развиваться и после 30 лет. Он никогда не перестаёт учиться." },
    { icon: "⚡", text: "Нервные импульсы в мозге движутся со скоростью до 270 км/ч. Это быстрее, чем гоночный автомобиль." },
    { icon: "💡", text: "Для работы мозга требуется около 20% всей энергии тела. Это сопоставимо с мощностью 10-ваттной лампочки." },
    { icon: "🌙", text: "Ночью мозг работает активнее, чем днём. Во время сна он обрабатывает информацию, полученную за день, и укрепляет память." },
    { icon: "💧", text: "Мозг состоит примерно на 80% из воды. Обезвоживание даже на 2% ухудшает концентрацию и память." },
    { icon: "😴", text: "Мозг не чувствует боли. Именно поэтому нейрохирурги могут проводить операции на мозге, когда пациент в сознании." },
    { icon: "👀", text: "Человеческий глаз различает около 10 миллионов оттенков цвета. Но мозг обрабатывает эту информацию так быстро, что мы не замечаем процесса." },
    { icon: "🦴", text: "У взрослого человека 206 костей. У новорождённого их около 300 — со временем некоторые кости срастаются." },

    // === ГЕОГРАФИЯ И ПЛАНЕТА ===
    { icon: "🌊", text: "Большая часть пресной воды на Земле находится не в реках и озёрах, а в ледниках и полярных шапках. Её можно увидеть только в твёрдом состоянии." },
    { icon: "🏔️", text: "Самая высокая гора в Солнечной системе — Олимп на Марсе. Она в 2,5 раза выше Эвереста и имеет диаметр около 600 км." },
    { icon: "🔥", text: "В Новой Зеландии есть река, температура воды в которой настолько высока, что рыбу можно сварить, не вынимая её из воды." },
    { icon: "🗺️", text: "Самый большой глобус в мире был сделан во Франции. Его диаметр — 13 метров, и внутри него могла бы поместиться целая комната." },
    { icon: "🌋", text: "Большинство вулканов на Земле находятся под водой. Учёные насчитали более миллиона подводных вулканов." },
    { icon: "❄️", text: "Антарктида — самый холодный, ветреный и сухой континент. Там зарегистрирована температура −89,2 °C." },
    { icon: "🌵", text: "В пустыне Атакама в Чили не было дождя более 400 лет. Это самое сухое место на планете." },
    { icon: "🏝️", text: "В Индонезии находится более 17 000 островов. Только около 6000 из них обитаемы." },

    // === КОСМОС ===
    { icon: "🚀", text: "Первым человеком в космосе стал Юрий Гагарин 12 апреля 1961 года. Его полёт длился 108 минут." },
    { icon: "👩‍🚀", text: "Первой женщиной в космосе была Валентина Терешкова. Она отправилась в полёт в 1963 году и провела на орбите почти 3 дня." },
    { icon: "🌍", text: "Земля — единственная известная планета, на которой существует жизнь. Учёные продолжают искать другие обитаемые миры." },
    { icon: "🌟", text: "Каждый год в нашей галактике рождается около 40 новых звёзд. Но большинство из них слишком далеко, чтобы увидеть их с Земли." },
    { icon: "🛸", text: "Марс в 2 раза меньше Земли по диаметру. Его поверхность покрыта кратерами, пустынями и горами из сухого льда." },
    { icon: "☄️", text: "Комета Галлея возвращается к Солнцу каждые 76 лет. В следующий раз её можно будет увидеть в 2061 году." },

    // === ЗАБАВНЫЕ ФАКТЫ ===
    { icon: "✏️", text: "Обычным карандашом можно написать линию длиной около 56 километров. Этого хватит, чтобы обойти небольшой город по периметру." },
    { icon: "🍿", text: "Попкорн появился тысячи лет назад. Древние индейцы обнаружили, что некоторые зёрна кукурузы взрываются при нагревании." },
    { icon: "🍕", text: "Самая популярная пицца в мире — «Маргарита». Её назвали в честь королевы Италии Маргариты Савойской в 1889 году." },
    { icon: "🐧", text: "Императорские пингвины могут не есть до 3 месяцев, высиживая яйца в антарктическую зиму при температуре −50 °C." },
    { icon: "🌻", text: "Подсолнухи поворачиваются вслед за солнцем только в молодом возрасте. Взрослые цветы всегда смотрят на восток." },
    { icon: "🍯", text: "Мёд не портится. Археологи находили мёд в древних гробницах, которому более 3000 лет, и он всё ещё был съедобен." },
    { icon: "🌙", text: "Луна не светит сама. Она отражает свет Солнца, как зеркало. Поэтому мы видим её только тогда, когда на неё попадает солнечный свет." }
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