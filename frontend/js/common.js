// frontend/js/common.js - общие функции для всех страниц

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
        // По умолчанию тёмная тема
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
            const registration = await navigator.serviceWorker.register('/english_by_weeks/frontend/sw.js');
            console.log('✅ Service Worker registered');

            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('✅ Push notifications permission granted');
            }

            return registration;
        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
        }
    } else {
        console.log('❌ Service Worker not supported');
    }
}

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('✅ beforeinstallprompt fired');

    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.style.display = 'block';
        installBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('✅ User accepted install prompt');
                    } else {
                        console.log('❌ User dismissed install prompt');
                    }
                    installBtn.style.display = 'none';
                    deferredPrompt = null;
                });
            }
        });
    }
});

// ========== ОСНОВНОЙ ЛОКАЛЬНЫЙ СЛОВАРЬ ==========
const localDictionary = new Map([
    // Артикли
    ['a', 'неопределённый артикль (перед согласными)'],
    ['an', 'неопределённый артикль (перед гласными)'],
    ['the', 'определённый артикль'],

    // Местоимения
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
    ['her', 'её'],
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

    // Глаголы to be
    ['am', 'являюсь, есть'],
    ['is', 'является, есть'],
    ['are', 'являетесь, являются, есть'],
    ['was', 'был, была, было'],
    ['were', 'были'],
    ['be', 'быть'],
    ['being', 'будучи, являясь'],
    ['been', 'был, была, было, были'],

    // Вспомогательные и модальные глаголы
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

    // ========== MONEY WEEK — ОСНОВНЫЕ ГЛАГОЛЫ ==========
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

    // Формы глаголов
    ['saved', 'накопил, сэкономил'],
    ['borrowed', 'занял'],
    ['lent', 'одолжил'],
    ['earns', 'зарабатывает'],
    ['can\'t', 'не может, не умеет'],
    ['saved up', 'накопил'],
    ['thinking', 'думающий'],
    ['considered', 'считается'],
    ['preferred', 'предпочитал'],
    ['hated', 'ненавидел'],
    ['promised', 'обещал'],
    ['needed', 'нуждался'],
    ['wanted', 'хотел'],
    ['liked', 'нравился'],
    ['loved', 'любил'],
    ['used', 'использовал'],
    ['made', 'сделал'],
    ['lost', 'потерял'],
    ['spent', 'потратил'],
    ['paid', 'заплатил'],
    ['bought', 'купил'],
    ['sold', 'продал'],
    ['kept', 'держал, хранил'],
    ['found', 'нашёл'],
    ['left', 'оставил'],
    ['brought', 'принёс'],
    ['took', 'взял'],
    ['gave', 'дал'],
    ['got', 'получил'],
    ['thought', 'думал'],
    ['knew', 'знал'],
    ['understood', 'понял'],
    ['remembered', 'вспомнил'],
    ['forgot', 'забыл'],
    ['tried', 'пытался'],
    ['meant', 'означал'],

    // ========== MONEY WEEK — СУЩЕСТВИТЕЛЬНЫЕ ==========
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
    ['coins', 'монеты'],
    ['wallet', 'бумажник'],
    ['receipt', 'чек'],
    ['price', 'цена'],
    ['prices', 'цены'],
    ['value', 'ценность, стоимость'],
    ['fortune', 'состояние, богатство'],
    ['wealth', 'богатство'],
    ['piggy bank', 'копилка'],
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
    ['donation', 'пожертвование'],
    ['charity', 'благотворительность'],
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
    ['statement', 'выписка'],
    ['transfer', 'перевод'],
    ['exchange', 'обмен'],
    ['rate', 'курс, ставка'],
    ['commission', 'комиссия'],
    ['deposit', 'депозит, задаток'],
    ['withdrawal', 'снятие'],
    ['overdraft', 'овердрафт'],
    ['bankrupt', 'банкрот'],
    ['poverty', 'бедность'],
    ['fund', 'фонд'],
    ['grant', 'грант'],
    ['allowance', 'пособие'],
    ['bonus', 'бонус'],
    ['dividend', 'дивиденд'],
    ['share', 'акция'],
    ['stock', 'акция'],
    ['bond', 'облигация'],
    ['index', 'индекс'],
    ['portfolio', 'портфель'],
    ['investor', 'инвестор'],
    ['borrower', 'заёмщик'],
    ['lender', 'кредитор'],
    ['asset', 'актив'],
    ['liability', 'обязательство'],
    ['equity', 'собственный капитал'],

    // ========== MONEY WEEK — ПРИЛАГАТЕЛЬНЫЕ ==========
    ['good', 'хороший'],
    ['bad', 'плохой'],
    ['big', 'большой'],
    ['small', 'маленький'],
    ['new', 'новый'],
    ['old', 'старый'],
    ['hard', 'трудный, сложный'],
    ['easy', 'лёгкий'],
    ['fun', 'весёлый', 'интересный'],
    ['boring', 'скучный'],
    ['interesting', 'интересный'],
    ['cool', 'крутой, классный'],
    ['great', 'отличный'],
    ['loud', 'громкий'],
    ['heavy', 'тяжёлый'],
    ['short', 'короткий'],
    ['dead', 'мёртвый, закончившийся'],
    ['close', 'близкий, близко (о расстоянии)'],
    ['halfway', 'на полпути'],
    ['finally', 'наконец-то'],
    ['already', 'уже'],
    ['yet', 'ещё (в отрицаниях и вопросах)'],
    ['just', 'только что, просто'],
    ['still', 'всё ещё'],
    ['very', 'очень'],
    ['really', 'действительно'],
    ['so', 'так, такой, поэтому'],
    ['then', 'затем, тогда'],
    ['now', 'сейчас'],
    ['always', 'всегда'],
    ['never', 'никогда'],
    ['sometimes', 'иногда'],
    ['usually', 'обычно'],
    ['popular', 'популярный'],
    ['fast', 'быстрый'],
    ['slow', 'медленный'],
    ['high', 'высокий'],
    ['low', 'низкий'],
    ['rich', 'богатый'],
    ['poor', 'бедный'],
    ['expensive', 'дорогой'],
    ['cheap', 'дешёвый'],
    ['affordable', 'доступный по цене'],
    ['responsible', 'ответственный'],
    ['financial', 'финансовый'],
    ['economic', 'экономический'],
    ['profitable', 'прибыльный'],
    ['stable', 'стабильный'],
    ['risky', 'рискованный'],
    ['safe', 'безопасный'],
    ['certain', 'определённый'],
    ['uncertain', 'неопределённый'],

    // ========== MONEY WEEK — НАРЕЧИЯ И ПРЕДЛОГИ ==========
    ['about', 'о, примерно, около'],
    ['for', 'для, за, на, в течение'],
    ['with', 'с'],
    ['without', 'без'],
    ['from', 'из, от'],
    ['to', 'к, в, до'],
    ['on', 'на, по (о дне недели)'],
    ['in', 'в, через'],
    ['at', 'у, в, за'],
    ['by', 'к, у, с помощью'],
    ['into', 'в (внутрь)'],
    ['onto', 'на (на поверхность)'],
    ['upon', 'на (книжн.)'],
    ['via', 'через, посредством'],
    ['per', 'в, на (каждый)'],
    ['as', 'как, в качестве'],
    ['than', 'чем'],
    ['because', 'потому что'],
    ['if', 'если'],
    ['when', 'когда'],
    ['while', 'в то время как'],
    ['though', 'хотя'],
    ['although', 'хотя'],
    ['however', 'однако'],
    ['therefore', 'следовательно'],
    ['thus', 'таким образом'],

    // ========== MONEY WEEK — ФРАЗОВЫЕ ГЛАГОЛЫ ==========
    ['take out', 'взять (кредит)'],
    ['pay back', 'вернуть долг'],
    ['live on', 'жить на (сумму)'],
    ['save up', 'копить на что-то'],
    ['cut back', 'сокращать расходы'],
    ['cut back on', 'сокращать расходы на'],
    ['get by', 'сводить концы с концами'],
    ['live off', 'жить за чей-то счёт'],
    ['make money', 'зарабатывать деньги'],
    ['lose money', 'терять деньги'],
    ['save money', 'экономить деньги'],
    ['waste money', 'тратить деньги впустую'],
    ['borrow money', 'занимать деньги'],
    ['lend money', 'одалживать деньги'],
    ['pay cash', 'платить наличными'],
    ['pay interest', 'платить проценты'],
    ['pay by card', 'платить картой'],
    ['pay for', 'платить за'],
    ['spend on', 'тратить на'],
    ['invest in', 'инвестировать в'],
    ['open an account', 'открыть счёт'],
    ['close an account', 'закрыть счёт'],
    ['withdraw money', 'снять деньги'],
    ['deposit money', 'положить деньги'],
    ['transfer money', 'перевести деньги'],
    ['exchange currency', 'обменять валюту'],

    // ========== SCHOOL WEEK — ШКОЛЬНЫЕ ПРЕДМЕТЫ ==========
    ['maths', 'математика'],
    ['mathematics', 'математика'],
    ['english', 'английский язык'],
    ['science', 'естествознание, наука'],
    ['history', 'история'],
    ['pe', 'физкультура'],
    ['physical education', 'физическая культура'],
    ['art', 'рисование, изобразительное искусство'],
    ['music', 'музыка'],
    ['geography', 'география'],
    ['it', 'информатика'],
    ['information technology', 'информационные технологии'],

    // ========== SCHOOL WEEK — ДНИ НЕДЕЛИ ==========
    ['monday', 'понедельник'],
    ['tuesday', 'вторник'],
    ['wednesday', 'среда'],
    ['thursday', 'четверг'],
    ['friday', 'пятница'],
    ['saturday', 'суббота'],
    ['sunday', 'воскресенье'],

    // ========== SCHOOL WEEK — ШКОЛЬНЫЕ ПРИНАДЛЕЖНОСТИ ==========
    ['pen', 'ручка'],
    ['pencil', 'карандаш'],
    ['ruler', 'линейка'],
    ['rubber', 'ластик'],
    ['eraser', 'ластик'],
    ['notebook', 'тетрадь'],
    ['textbook', 'учебник'],
    ['backpack', 'рюкзак'],
    ['book', 'книга'],
    ['phone', 'телефон'],
    ['apple', 'яблоко'],
    ['orange', 'апельсин'],
    ['pizza', 'пицца'],
    ['football', 'футбол'],
    ['club', 'клуб'],
    ['gaming', 'игровой'],
    ['tryouts', 'отбор'],
    ['timetable', 'расписание'],
    ['lunch', 'обед'],
    ['dinner', 'ужин'],
    ['breakfast', 'завтрак'],
    ['homework', 'домашнее задание'],
    ['lesson', 'урок'],
    ['lessons', 'уроки'],
    ['class', 'класс, урок'],
    ['teacher', 'учитель'],
    ['student', 'ученик'],
    ['school', 'школа'],
    ['subject', 'предмет'],
    ['subjects', 'предметы'],
    ['notice', 'объявление'],
    ['notices', 'объявления'],
    ['trip', 'поездка'],
    ['map', 'карта'],
    ['maps', 'карты'],
    ['computer', 'компьютер'],
    ['computers', 'компьютеры'],

    // ========== SCHOOL WEEK — ПРИМЕРЫ ИЗ УРОКОВ ==========
    ['draw', 'рисовать'],
    ['drawing', 'рисование, рисунок'],
    ['doodle', 'каракуля, рисунок'],
    ['write', 'писать'],
    ['reading', 'чтение'],
    ['run', 'бегать'],
    ['running', 'бег, бегает'],
    ['swim', 'плавать'],
    ['swimming', 'плавание'],
    ['sport', 'спорт'],
    ['sports', 'спорт'],
    ['close', 'близко (о расстоянии или времени)'],
    ['halfway', 'на полпути'],
    ['sorry', 'извините'],
    ['please', 'пожалуйста'],
    ['thanks', 'спасибо'],

    // ========== ВОПРОСИТЕЛЬНЫЕ СЛОВА ==========
    ['what', 'что, какой'],
    ['when', 'когда'],
    ['where', 'где'],
    ['who', 'кто'],
    ['whom', 'кого, кому'],
    ['whose', 'чей'],
    ['why', 'почему'],
    ['how', 'как'],
    ['which', 'который'],
    ['how many', 'сколько (для исчисляемых)'],
    ['how much', 'сколько (для неисчисляемых)'],
    ['how long', 'как долго'],
    ['how often', 'как часто'],

    // ========== ЧИСЛА ==========
    ['one', 'один'],
    ['two', 'два'],
    ['three', 'три'],
    ['four', 'четыре'],
    ['five', 'пять'],
    ['six', 'шесть'],
    ['seven', 'семь'],
    ['eight', 'восемь'],
    ['nine', 'девять'],
    ['ten', 'десять'],
    ['eleven', 'одиннадцать'],
    ['twelve', 'двенадцать'],
    ['thirteen', 'тринадцать'],
    ['fourteen', 'четырнадцать'],
    ['fifteen', 'пятнадцать'],
    ['sixteen', 'шестнадцать'],
    ['seventeen', 'семнадцать'],
    ['eighteen', 'восемнадцать'],
    ['nineteen', 'девятнадцать'],
    ['twenty', 'двадцать'],
    ['thirty', 'тридцать'],
    ['forty', 'сорок'],
    ['fifty', 'пятьдесят'],
    ['sixty', 'шестьдесят'],
    ['seventy', 'семьдесят'],
    ['eighty', 'восемьдесят'],
    ['ninety', 'девяносто'],
    ['hundred', 'сто'],
    ['thousand', 'тысяча'],
    ['million', 'миллион'],
    ['billion', 'миллиард'],
    ['first', 'первый'],
    ['second', 'второй'],
    ['third', 'третий'],
    ['fourth', 'четвёртый'],
    ['fifth', 'пятый'],
    ['sixth', 'шестой'],
    ['seventh', 'седьмой'],
    ['eighth', 'восьмой'],
    ['ninth', 'девятый'],
    ['tenth', 'десятый'],
    ['eleventh', 'одиннадцатый'],
    ['twelfth', 'двенадцатый'],
    ['thirteenth', 'тринадцатый'],
    ['fourteenth', 'четырнадцатый'],
    ['fifteenth', 'пятнадцатый'],
    ['sixteenth', 'шестнадцатый'],
    ['seventeenth', 'семнадцатый'],
    ['eighteenth', 'восемнадцатый'],
    ['nineteenth', 'девятнадцатый'],
    ['twentieth', 'двадцатый'],
]);

// Кэш переводов
const translationCache = new Map();

// ========== ФУНКЦИИ ДЛЯ РАБОТЫ СО СЛОВАМИ ==========
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
                for (const ex of day.grammar.examples) {
                    extractAndCacheWords(ex);
                }
            }
        }

        if (day.exercises) {
            for (const ex of day.exercises) {
                if (ex.question) extractAndCacheWords(ex.question);
                if (ex.readingText) extractAndCacheWords(ex.readingText);
                if (ex.listeningText) extractAndCacheWords(ex.listeningText);
                if (ex.explanation) extractAndCacheWords(ex.explanation);
                if (ex.options) {
                    for (const opt of ex.options) {
                        extractAndCacheWords(opt);
                    }
                }
            }
        }
    }

    console.log(`📚 Total cached words for this week: ${translationCache.size}`);
}

// ========== КОНТЕКСТНЫЙ СЛОВАРЬ ==========
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

    console.log(`📚 Loaded ${contextTranslationsMap.size} context translations`);
}

function getContextTranslation(word) {
    if (!word) return null;
    const lowerWord = word.toLowerCase();
    return contextTranslationsMap.get(lowerWord) || null;
}

// ========== ОСНОВНЫЕ ФУНКЦИИ ПРИЛОЖЕНИЯ ==========
function getSessionId() {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
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
        return translationCache.get(cleanWord);
    }

    if (localDictionary.has(cleanWord)) {
        const translation = localDictionary.get(cleanWord);
        translationCache.set(cleanWord, translation);
        return translation;
    }

    translationCache.set(cleanWord, cleanWord);
    return cleanWord;
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

    utterance.onerror = (e) => {
        console.error('Speech error:', e);
    };

    window.speechSynthesis.speak(utterance);
}

function speakSentence(sentence, lang = 'en-US') {
    if (!sentence || sentence.length === 0) return;

    let cleanSentence = sentence.replace(/<[^>]*>/g, '');
    cleanSentence = cleanEnglishText(cleanSentence);
    cleanSentence = cleanSentence.replace(/_{2,}/g, ' ... ');

    // Убираем точки и другие знаки препинания, которые мешают озвучке
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

    // Сохраняем HTML-теги
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

// ========== РЕНДЕР ТЕКСТА ДЛЯ ЧТЕНИЯ (УЛУЧШЕННАЯ ВЕРСИЯ) ==========
function renderReadingTextContent(readingText) {
    if (!readingText) return '';

    // Заменяем Markdown **жирный** на <strong>
    let processedText = readingText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Заменяем \n на <br>
    processedText = processedText.replace(/\n/g, '<br>');

    // Сохраняем эмодзи
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    const emojiParts = [];
    let processedWithEmoji = processedText;
    let emojiMatch;
    let emojiIndex = 0;

    while ((emojiMatch = emojiRegex.exec(processedText)) !== null) {
        const emojiPlaceholder = `{{EMOJI_${emojiIndex++}}}`;
        emojiParts.push({ placeholder: emojiPlaceholder, emoji: emojiMatch[0] });
        processedWithEmoji = processedWithEmoji.replace(emojiMatch[0], emojiPlaceholder);
    }

    // Делаем слова кликабельными
    let result = processedWithEmoji.replace(/\b([A-Za-z]{2,}(?:'[A-Za-z]+)?)\b/g, (word) => {
        if (word.includes('{{')) return word;
        const safeWord = word.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `<span class="clickable-word" data-word="${safeWord}" data-context="">${word}</span>`;
    });

    // Возвращаем эмодзи
    for (const { placeholder, emoji } of emojiParts) {
        result = result.split(placeholder).join(emoji);
    }

    // Улучшаем структуру абзацев: заменяем <br><br> на разделители абзацев
    // Разбиваем текст на абзацы по двойным переносам строк
    const paragraphs = result.split(/(<br>\s*){2,}/g).filter(p => p && !p.match(/^<br\s*\/?>$/));

    if (paragraphs.length > 1) {
        // Если есть несколько абзацев, оборачиваем каждый в <p>
        result = paragraphs.map(p => {
            // Убираем лишние <br> внутри абзаца
            let clean = p.replace(/<br>/g, ' ');
            return `<p>${clean}</p>`;
        }).join('');
    } else {
        // Если текст без абзацев, просто оборачиваем в <p>
        result = `<p>${result}</p>`;
    }

    // Добавляем CSS для красивого отображения
    return `<style>
        .reading-text p {
            margin-bottom: 16px;
            line-height: 1.6;
        }
        .reading-text p:last-child {
            margin-bottom: 0;
        }
        .reading-text .clickable-word {
            cursor: pointer;
            border-bottom: 1px dashed var(--primary, #f97316);
            transition: background 0.2s;
        }
        .reading-text .clickable-word:hover {
            background: rgba(249, 115, 22, 0.15);
            border-radius: 3px;
        }
        .reading-text strong {
            color: var(--primary, #f97316);
        }
    </style><div class="reading-text">${result}</div>`;
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

// ========== ПРОГРЕСС НА СЕРВЕРЕ ==========
async function saveProgressToServer(weekId, day, score, completed = true) {
    const sessionId = getSessionId();
    try {
        const response = await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                week_id: weekId,
                day: day,
                score: score,
                session_id: sessionId,
                completed: completed
            })
        });
        return response.ok;
    } catch (error) {
        console.error('Save progress error:', error);
        return false;
    }
}

async function loadProgressFromServer(weekId) {
    const sessionId = getSessionId();
    try {
        const response = await fetch(`/api/progress/${weekId}?session_id=${sessionId}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Load progress error:', error);
    }
    return { completed_days: [], day_scores: {}, current_day: 1, overall_percent: 0 };
}

// ========== СЕРТИФИКАТ ==========
function showCertificate(weekTitle, overallScore, weekIcon = '🏆') {
    const oldModal = document.querySelector('.certificate-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '2000';

    const certificate = document.createElement('div');
    certificate.style.backgroundColor = 'var(--card-bg)';
    certificate.style.borderRadius = '24px';
    certificate.style.padding = '40px';
    certificate.style.maxWidth = '500px';
    certificate.style.width = '90%';
    certificate.style.textAlign = 'center';
    certificate.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.5)';
    certificate.style.border = '3px solid var(--primary)';
    certificate.style.animation = 'fadeInUp 0.5s ease';

    if (!document.querySelector('#certificate-animation')) {
        const style = document.createElement('style');
        style.id = 'certificate-animation';
        style.textContent = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    certificate.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 16px;">${weekIcon}</div>
        <h2 style="color: var(--primary); margin: 16px 0; font-size: 2rem;">Поздравляем!</h2>
        <p style="font-size: 1.1rem; margin-bottom: 16px; color: var(--gray);">Вы успешно завершили</p>
        <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--text);">${weekTitle}</h3>
        <div style="background: var(--success); color: white; padding: 8px 24px; border-radius: 40px; display: inline-block; margin-bottom: 24px; font-weight: bold;">
            Средний балл: ${overallScore}%
        </div>
        <p style="margin-bottom: 24px; font-size: 1rem;">🎓 Вы получаете сертификат о прохождении недели!</p>
        <button onclick="this.closest('.certificate-modal').remove();"
                style="background: var(--primary); color: white; border: none; padding: 12px 32px; border-radius: 40px; cursor: pointer; font-size: 1rem; transition: transform 0.2s;">
            Отлично! 🎉
        </button>
    `;

    modal.appendChild(certificate);
    document.body.appendChild(modal);

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

function getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { id: payload.user_id, email: payload.sub };
    } catch (e) {
        return null;
    }
}

// ========== PWA — РЕГИСТРАЦИЯ ПРИ ЗАГРУЗКЕ ==========
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        initTheme();
        registerServiceWorker();
    });
}

// ========== АВТОМАТИЧЕСКАЯ ТЕМА В ЗАВИСИМОСТИ ОТ АУДИТОРИИ ==========
function applyThemeByAudience() {
    const urlParams = new URLSearchParams(window.location.search);
    const audience = urlParams.get('audience');

    if (audience === 'school') {
        document.body.classList.add('school-theme');
        document.body.classList.remove('adult-theme');
    } else if (audience === 'adults') {
        document.body.classList.add('adult-theme');
        document.body.classList.remove('school-theme');
    } else {
        document.body.classList.add('school-theme');
        document.body.classList.remove('adult-theme');
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        applyThemeByAudience();
    });
}

// ========== УСТАНОВКА ТЕКУЩЕГО ГОДА В ПОДВАЛЕ ==========
function setCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
        console.log('✅ Year set to:', yearSpan.textContent);
    } else {
        console.warn('⚠️ Element #currentYear not found yet, will retry...');
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

// ========== УВЕДОМЛЕНИЕ ОБ АВТОРСКИХ ПРАВАХ (ПОПАП) ==========
function showCopyrightPopup() {
    const hasSeen = localStorage.getItem('copyright_popup_seen');
    if (hasSeen === 'true') return;

    const overlay = document.createElement('div');
    overlay.id = 'copyright-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(3px);
    `;

    const popup = document.createElement('div');
    popup.style.cssText = `
        background: var(--card-bg);
        color: var(--text);
        max-width: 90%;
        width: 450px;
        border-radius: 20px;
        padding: 25px;
        box-shadow: 0 20px 35px rgba(0, 0, 0, 0.3);
        border: 2px solid var(--primary);
        animation: fadeInUp 0.4s ease;
    `;

    if (!document.querySelector('#copyright-popup-animation')) {
        const style = document.createElement('style');
        style.id = 'copyright-popup-animation';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    popup.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px;">
            <span style="font-size: 3rem;">📚</span>
        </div>
        <h2 style="color: var(--primary); text-align: center; margin-bottom: 15px;">Уважаемый пользователь!</h2>
        <p style="margin-bottom: 15px; line-height: 1.4;">
            Все материалы на сайте <strong>English by Weeks</strong> являются интеллектуальной собственностью создателя.
        </p>
        <p style="margin-bottom: 15px; line-height: 1.4;">
            <strong>❌ Запрещено:</strong> копировать, распространять, передавать третьим лицам, использовать в коммерческих целях.
        </p>
        <p style="margin-bottom: 20px; line-height: 1.4;">
            <strong>✅ Разрешено:</strong> использовать для личного обучения, проходить уроки с семьёй (один аккаунт на домохозяйство).
        </p>
        <div style="background: rgba(99, 102, 241, 0.1); padding: 12px; border-radius: 12px; margin-bottom: 20px; font-size: 0.85rem;">
            📖 Подробнее в <a href="/english_by_weeks/frontend/terms.html" target="_blank" style="color: var(--primary);">Условиях использования</a>
        </div>
        <button id="copyright-accept-btn" style="
            width: 100%;
            padding: 12px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 40px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            ✅ Я принимаю условия
        </button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    const acceptBtn = document.getElementById('copyright-accept-btn');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('copyright_popup_seen', 'true');
            overlay.remove();
        });
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(showCopyrightPopup, 1000);
    });
}

// ========== СОВЕТ ДНЯ ==========
const TIPS_LIST = [
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

    // === Этимология (происхождение слов) ===
    { icon: "🔍", text: "Слово «каникулы» происходит от латинского «canicula» — так называли звезду Сириус (собачью звезду). В Древнем Риме в период её появления на небе школы закрывались на отдых." },
    { icon: "📖", text: "Слово «школа» в переводе с греческого означает «досуг». В Древней Греции школой называли место, где люди проводили свободное время в философских беседах." },
    { icon: "💻", text: "Слово «компьютер» раньше было профессией! Так называли людей, которые выполняли сложные расчёты вручную." },
    { icon: "🤖", text: "Слово «робот» придумал чешский писатель Карел Чапек. Оно происходит от слова «robota», что означает «тяжёлая работа»." },
    { icon: "📱", text: "Слово «смартфон» — это два слова: smart (умный) + phone (телефон). Но первый смартфон появился только в 1992 году!" },
    { icon: "🎒", text: "Слово «рюкзак» — буквально «рюха» (мешок) + «зак» (за спиной). А по-английски backpack — это back (спина) + pack (пакет)." },

    // === Забавные факты о мире ===
    { icon: "🐘", text: "Слоны — единственные млекопитающие, которые не умеют прыгать. Зато они отлично плавают и даже ныряют, используя хобот как трубку!" },
    { icon: "🐪", text: "Верблюды хранят жир не в горбах, а вокруг них. Горбы служат «крышей» для защиты от солнца. А воду они действительно могут долго не пить." },
    { icon: "🦒", text: "Жирафам не нужно много спать — достаточно 30 минут в день. А ещё у них самый длинный хвост среди млекопитающих (до 2,5 метров!)." },
    { icon: "🐧", text: "Императорские пингвины могут не есть до 3 месяцев, высиживая яйца в антарктическую зиму при температуре -50°C." },
    { icon: "🍕", text: "Самая популярная пицца в мире — Маргарита. Она названа в честь королевы Италии Маргариты Савойской, которая попробовала её в 1889 году." },
    { icon: "🍿", text: "Попкорн появился тысячи лет назад. Древние индейцы обнаружили, что некоторые зёрна кукурузы взрываются при нагревании." },
    { icon: "✏️", text: "Обычным карандашом можно написать линию длиной около 56 километров — это больше, чем расстояние от Москвы до Подольска и обратно!" },

    // === Мотивация и лайфхаки для учёбы ===
    { icon: "⏰", text: "Учёные выяснили: мозг лучше всего запоминает информацию утром (через 1–2 часа после пробуждения) и перед сном." },
    { icon: "🧠", text: "Объясняйте новую тему кому-то другому. Когда вы учите кого-то, вы запоминаете в 2 раза лучше." },
    { icon: "🎯", text: "Разбивайте большую задачу на маленькие шаги. 5 минут занятий — это лучше, чем ничего. Главное — начать!" },
    { icon: "🎨", text: "Рисование и музыка улучшают память и концентрацию. Ваш мозг работает активнее, когда вы творите." },
    { icon: "💪", text: "Ошибки — это не провал, а часть обучения. Каждая ошибка делает ваш мозг сильнее." },
    { icon: "🧘", text: "Делайте короткие перерывы каждые 25–30 минут. Мозгу нужно время, чтобы усвоить информацию." },
    { icon: "🗣️", text: "Учитесь в комфортной обстановке и не бойтесь говорить вслух. Это помогает тренировать произношение и уверенность." }
];


function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * TIPS_LIST.length);
    return TIPS_LIST[randomIndex];
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
        if (refreshBtn) {
            refreshBtn.addEventListener('click', refreshDailyTip);
        }
    });
}

// ========== ЭКСПОРТ В ГЛОБАЛЬНУЮ ОБЛАСТЬ ==========
window.getSessionId = getSessionId;
window.translateWord = translateWord;
window.getContextTranslation = getContextTranslation;
window.loadContextTranslations = loadContextTranslations;
window.speak = speak;
window.speakSentence = speakSentence;
window.showToast = showToast;
window.toggleTheme = toggleTheme;
window.loadTheme = loadTheme;
window.makeWordsClickable = makeWordsClickable;
window.saveProgressToServer = saveProgressToServer;
window.loadProgressFromServer = loadProgressFromServer;
window.initClickableWords = initClickableWords;
window.showCertificate = showCertificate;
window.getCurrentUser = getCurrentUser;
window.registerServiceWorker = registerServiceWorker;
window.renderReadingTextContent = renderReadingTextContent;