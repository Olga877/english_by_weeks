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
            const registration = await navigator.serviceWorker.register('/sw.js');
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

// ========== АУТЕНТИФИКАЦИЯ ==========

// Запрос ссылки для входа
async function requestLoginLink() {
    const emailInput = document.getElementById('email-input');
    if (!emailInput) {
        showToast('Форма входа не найдена', 'error');
        return;
    }
    const email = emailInput.value.trim();
    if (!email) {
        showToast('Введите email', 'error');
        return;
    }
    try {
        const response = await fetch('/auth/request-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (response.ok) {
            showToast('Ссылка для входа отправлена на почту (проверьте консоль сервера)', 'success');
        } else {
            const data = await response.json();
            showToast(data.detail || 'Ошибка при отправке ссылки', 'error');
        }
    } catch (error) {
        console.error(error);
        showToast('Ошибка сети', 'error');
    }
}

// Выход из системы
function logout() {
    localStorage.removeItem('access_token');
    window.location.reload();
}

// Проверка авторизации и отображение информации о пользователе
function checkAuth() {
    const token = localStorage.getItem('access_token');
    const loginForm = document.getElementById('login-form');
    const userInfo = document.getElementById('user-info');
    const userEmail = document.getElementById('user-email');

    if (loginForm && userInfo) { // только если элементы есть (главная страница)
        if (token) {
            fetch('/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Invalid token');
            })
            .then(user => {
                loginForm.style.display = 'none';
                userInfo.style.display = 'block';
                if (userEmail) userEmail.textContent = user.email;
            })
            .catch(() => {
                localStorage.removeItem('access_token');
                window.location.reload();
            });
        } else {
            loginForm.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

// Получить заголовки для авторизованных запросов
function getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}
// Очистка повреждённых данных в localStorage
function clearCorruptedTips() {
    const raw = localStorage.getItem('dailyTip');
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (typeof parsed !== 'object' || parsed === null || !parsed.icon) {
                localStorage.removeItem('dailyTip');
                localStorage.removeItem('dailyTipHour');
            }
        } catch (e) {
            localStorage.removeItem('dailyTip');
            localStorage.removeItem('dailyTipHour');
        }
    }
}

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
    ['fun', 'весёлый, интересный'],
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

        // ========== НОВЫЕ СЛОВА ИЗ MONEY_WEEK (точные формы) ==========
    ['awesome', 'крутой, потрясающий'],
    ['jacket', 'куртка'],
    ['visit', 'посещать'],
    ['once', 'однажды, один раз'],
    ['ago', 'назад'],
    ['last', 'прошлый, последний'],
    ['week', 'неделя'],
    ['move', 'переезжать, двигаться'],
    ['ever', 'когда-либо'],
    ['practice', 'практика, тренировка'],
    ['gain', 'получать, приобретать'],
    ['weirdest', 'самый странный'],
    ['habit', 'привычка'],
    ['purchase', 'покупка, покупать'],
    ['microchip', 'микросхема'],
    ['skin', 'кожа'],
    ['rude', 'грубый'],
    ['waiter', 'официант'],
    ['awkward', 'неловкий'],
    ['complain', 'жаловаться'],
    ['grumble', 'ворчать'],
    ['motto', 'девиз'],
    ['crazy', 'сумасшедший, безумный'],
    ['prefer', 'предпочитать'],
    ['hour', 'час'],
    ['minute', 'минута'],
    ['year', 'год'],
    ['month', 'месяц'],
    ['open', 'открывать'],
    ['close', 'закрывать'],
    ['withdraw', 'снимать (деньги)'],
    ['mustn\'t', 'нельзя, не должен'],
    ['gambling', 'азартные игры'],
    ['groceries', 'продукты (бакалея)'],
    ['relative', 'родственник'],
    ['wage', 'зарплата (почасовая)'],
    ['property', 'недвижимость'],
    ['arm', 'рука (от плеча до кисти)'],
    ['leg', 'нога (от бедра до стопы)'],
    ['king', 'король'],
    ['round', 'вокруг, кругом'],
    ['makes', 'делает (3-е л. ед.ч. от make)'],
    ['saving', 'копление, экономия (герундий)'],
    ['spending', 'траты (герундий)'],
    ['borrowing', 'заимствование (герундий)'], // если встречается – добавьте, я не нашёл, но на всякий случай
    ['investing', 'инвестирование (герундий)'], // если встречается
    ['charging', 'взимание платы (герундий)'], // если встречается
    ['earning', 'зарабатывание (герундий)'],
    ['grumble', 'ворчать'],

        // ========== НЕДОСТАЮЩИЕ СЛОВА ИЗ ВСЕХ НЕДЕЛЬ ==========
    ['acting', 'игра актёров'],
    ['action', 'боевик, экшн'],
    ['actually', 'на самом деле'],
    ['adventure', 'приключение'],
    ['again', 'снова, опять'],
    ['animated', 'мультипликационный'],
    ['answer', 'ответ'],
    ['article', 'артикль'],
    ['autumn', 'осень'],
    ['baker', 'пекарь (булочная)'],
    ['balloon', 'воздушный шар'],
    ['bell', 'колокол'],
    ['birthday', 'день рождения'],
    ['biscuit', 'печенье'],
    ['bookshop', 'книжный магазин'],
    ['bored', 'скучающий, уставший'],
    ['bottle', 'бутылка'],
    ['bowl', 'миска, чаша'],
    ['box', 'коробка, ящик'],
    ['bread', 'хлеб'],
    ['burger', 'бургер'],
    ['butter', 'сливочное масло'],
    ['cabbage', 'капуста'],
    ['cafe', 'кафе'],
    ['cake', 'торт, пирожное'],
    ['cap', 'кепка, шапка'],
    ['carrots', 'морковь (мн.ч.)'],
    ['carton', 'картонный пакет (упаковка)'],
    ['cashier', 'кассир'],
    ['casual', 'повседневный, неформальный'],
    ['celebration', 'празднование'],
    ['character', 'персонаж, герой'],
    ['cheeseburger', 'чизбургер'],
    ['chemist', 'аптекарь (аптека)'],
    ['chicken', 'курица, курятина'],
    ['chips', 'картофель фри (мн.ч.)'],
    ['chocolate', 'шоколад'],
    ['cinema', 'кинотеатр'],
    ['climb', 'забираться, взбираться'],
    ['clock', 'часы (настенные/башенные)'],
    ['clothes', 'одежда (мн.ч.)'],
    ['cloudy', 'облачный, пасмурный'],
    ['coat', 'пальто, верхняя одежда'],
    ['cold', 'холодный'],
    ['comedy', 'комедия'],
    ['comfortable', 'удобный, комфортный'],
    ['concert', 'концерт'],
    ['container', 'контейнер, ёмкость'],
    ['cookies', 'печенье (мн.ч.)'],
    ['correct', 'правильный, корректный'],
    ['costume', 'костюм (карнавальный)'],
    ['crisps', 'чипсы (мн.ч.)'],
    ['dance', 'танец, танцевать'],
    ['decide', 'решать, принимать решение'],
    ['degree', 'градус'],
    ['delicious', 'вкусный, восхитительный'],
    ['dress', 'платье'],
    ['drink', 'напиток, пить'],
    ['drop', 'ронять, капля'],
    ['eat', 'есть, кушать'],
    ['egg', 'яйцо'],
    ['elephant', 'слон'],
    ['enjoy', 'наслаждаться, получать удовольствие'],
    ['envelope', 'конверт'],
    ['example', 'пример'],
    ['excited', 'взволнованный, возбуждённый'],
    ['exciting', 'захватывающий, волнующий'],
    ['expensive', 'дорогой'],
    ['explanation', 'объяснение'],
    ['fantasy', 'фэнтези, вымысел'],
    ['far', 'далёкий, далеко'],
    ['fashion', 'мода'],
    ['festival', 'фестиваль, праздник'],
    ['film', 'фильм'],
    ['fireworks', 'фейерверки (мн.ч.)'],
    ['fish', 'рыба'],
    ['florist', 'цветочный магазин, флорист'],
    ['foggy', 'туманный'],
    ['food', 'еда, пища'],
    ['freezing', 'морозный, ледяной'],
    ['gallery', 'галерея'],
    ['game', 'игра (компьютерная/настольная)'],
    ['garlic', 'чеснок'],
    ['giant', 'гигант, огромный'],
    ['gift', 'подарок'],
    ['giraffe', 'жираф'],
    ['glass', 'стакан, стекло'],
    ['gloves', 'перчатки (мн.ч.)'],
    ['glue', 'клей'],
    ['grammar', 'грамматика'],
    ['hall', 'зал, холл'],
    ['hand', 'стрелка (часов), рука (как часть тела)'],
    ['harvest', 'урожай, собирать урожай'],
    ['hoodie', 'худи, толстовка с капюшоном'],
    ['horror', 'фильм ужасов, ужас'],
    ['hot', 'горячий, жаркий'],
    ['ice cream', 'мороженое (словосочетание, но можно добавить как есть)'],
    ['incorrect', 'неправильный, неверный'],
    ['inside', 'внутри, внутрь'],
    ['interested', 'заинтересованный'],
    ['jam', 'варенье, джем'],
    ['jeans', 'джинсы (мн.ч.)'],
    ['judge', 'судья, оценивать'],
    ['juice', 'сок'],
    ['keyword', 'ключевое слово'],
    ['kite', 'воздушный змей'],
    ['landmark', 'достопримечательность'],
    ['large', 'большой, крупный'],
    ['lean', 'наклоняться, опираться'],
    ['lemon', 'лимон'],
    ['lemons', 'лимоны (мн.ч.)'],
    ['light', 'лёгкий (по весу), свет'],
    ['listening', 'аудирование, слушание'],
    ['loose', 'свободный, мешковатый (об одежде)'],
    ['luck', 'удача, везение'],
    ['magic', 'магия, волшебство'],
    ['mall', 'торговый центр'],
    ['meal', 'приём пищи, еда'],
    ['meat', 'мясо'],
    ['milk', 'молоко'],
    ['must-see', 'обязательный к просмотру'],
    ['newsagent', 'газетный киоск, продавец газет'],
    ['nickname', 'прозвище, никнейм'],
    ['noodle', 'лапша'],
    ['noodles', 'лапша (мн.ч.)'],
    ['onions', 'лук (мн.ч.)'],
    ['option', 'вариант, опция'],
    ['order', 'заказ, приказ, порядок'],
    ['outfit', 'наряд, комплект одежды'],
    ['outside', 'снаружи, на улице'],
    ['packet', 'пакетик, упаковка'],
    ['painting', 'картина, живопись'],
    ['parade', 'парад'],
    ['pasta', 'паста, макароны'],
    ['picnic', 'пикник'],
    ['pie', 'пирог (обычно с начинкой)'],
    ['piñata', 'пиньята (мексиканская игрушка)'],
    ['place', 'место'],
    ['plan', 'план, планировать'],
    ['play', 'спектакль, пьеса; играть (в театре)'],
    ['plot', 'сюжет'],
    ['popcorn', 'попкорн'],
    ['potato', 'картофель'],
    ['pumpkin', 'тыква'],
    ['queue', 'очередь'],
    ['rainy', 'дождливый'],
    ['reading', 'чтение (уже есть)'],
    ['recommend', 'рекомендовать, советовать'],
    ['restaurant', 'ресторан'],
    ['review', 'отзыв, рецензия'],
    ['rice', 'рис'],
    ['ride', 'аттракцион, поездка, кататься'],
    ['roller', 'ролик (в составе roller coaster)'],
    ['romance', 'романтический фильм, романтика'],
    ['sandals', 'сандалии (мн.ч.)'],
    ['sandwich', 'бутерброд, сэндвич'],
    ['sauce', 'соус'],
    ['scared', 'испуганный, напуганный'],
    ['scarf', 'шарф, платок'],
    ['scary', 'страшный, пугающий'],
    ['scene', 'сцена (в фильме/пьесе)'],
    ['science fiction', 'научная фантастика (словосочетание)'],
    ['season', 'время года, сезон'],
    ['shirt', 'рубашка'],
    ['shoe', 'обувь, туфля'],
    ['shop', 'магазин'],
    ['shorts', 'шорты (мн.ч.)'],
    ['sir', 'сэр (обращение)'],
    ['ski', 'лыжи, кататься на лыжах'],
    ['snack', 'перекус, лёгкая закуска'],
    ['snowman', 'снеговик'],
    ['snowy', 'снежный'],
    ['song', 'песня'],
    ['spring', 'весна'],
    ['star', 'звезда (актёр/актриса)'],
    ['stay', 'оставаться, пребывать'],
    ['step', 'шаг, ступенька'],
    ['strawberries', 'клубника (мн.ч.)'],
    ['strawberry', 'клубника (ед.ч.)'],
    ['style', 'стиль'],
    ['sugar', 'сахар'],
    ['summer', 'лето'],
    ['sunny', 'солнечный'],
    ['surprised', 'удивлённый, удивленный'],
    ['survive', 'выжить, пережить'],
    ['sweet', 'сладкий'],
    ['takeaway', 'еда на вынос (take-away)'],
    ['theatre', 'театр'],
    ['thriller', 'триллер'],
    ['tie', 'галстук, завязывать'],
    ['tight', 'обтягивающий, тесный'],
    ['tomatoes', 'помидоры (мн.ч.)'],
    ['ton', 'тонна'],
    ['tourist', 'турист'],
    ['tower', 'башня'],
    ['toy', 'игрушка'],
    ['tradition', 'традиция'],
    ['trainers', 'кроссовки, кеды (мн.ч.)'],
    ['trousers', 'брюки (мн.ч.)'],
    ['turkey', 'индейка (птица и мясо)'],
    ['unhappy', 'несчастливый, недовольный'],
    ['unfriendly', 'недружелюбный'],
    ['unkind', 'недобрый, жестокий'],
    ['unlucky', 'неудачливый, несчастливый'],
    ['vocabulary', 'словарь, лексика'],
    ['warm', 'тёплый'],
    ['weather', 'погода'],
    ['weigh', 'весить, взвешивать'],
    ['windy', 'ветреный'],
    ['winter', 'зима'],
    ['wizard', 'волшебник'],
    ['zoo', 'зоопарк'],

        // ========== НОВЫЕ СЛОВА ИЗ НЕДЕЛИ "SCHOOL & EDUCATION" ==========
    ['allow', 'разрешать'],
    ['appointment', 'встреча, запись (на приём)'],
    ['behaviour', 'поведение'],
    ['boarding', 'пансион (школа с проживанием)'],
    ['cheat', 'списывать, жульничать'],
    ['college', 'колледж (вуз в США)'],
    ['degree', 'учёная степень, диплом'],
    ['discipline', 'дисциплина'],
    ['elementary', 'начальный (о школе)'],
    ['expel', 'исключать (из школы)'],
    ['fail', 'провалить (экзамен)'],
    ['fizzy', 'газированный'],
    ['grade', 'класс (в школе), оценка'],
    ['graduate', 'выпускник (университета)'],
    ['head', 'директор (школы)'],
    ['kindergarten', 'детский сад (в США)'],
    ['let', 'позволять (кому-то делать что-то)'],
    ['middle', 'средний (о школе)'],
    ['misbehave', 'плохо себя вести'],
    ['nursery', 'детский сад (для самых маленьких)'],
    ['pass', 'сдать (экзамен)'],
    ['primary', 'начальный (о школе)'],
    ['private', 'частный'],
    ['punish', 'наказывать'],
    ['pupil', 'ученик (начальной школы)'],
    ['result', 'результат (экзамена)'],
    ['revise', 'повторять (материал к экзамену)'],
    ['secondary', 'средний (о школе)'],
    ['semester', 'семестр (в США)'],
    ['state', 'государственный (о школе)'],
    ['term', 'семестр, триместр'],
    ['trouble', 'неприятности, проблема'],
    ['uniform', 'школьная форма'],
    ['unless', 'если не'],
    ['until', 'до тех пор, пока не'],
]);


// Кэш переводов (используется для API-переводов)
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
    // Сохраняем для обратной совместимости (старый localStorage)
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

// ========== ФУНКЦИЯ ПЕРЕВОДА (С ПОДДЕРЖКОЙ MYMEMORY API) ==========
async function translateWord(word, context = '') {
    if (!word || word.length < 2) return word;
    const cleanWord = word.replace(/<[^>]*>/g, '').trim().toLowerCase();
    if (cleanWord.length < 2) return word;

    // 1. Проверяем кэш переводов
    if (translationCache.has(cleanWord)) {
        const cached = translationCache.get(cleanWord);
        if (cached && !cached.startsWith('[')) {
            return cached;
        }
        if (cached && cached.startsWith('[')) {
            translationCache.delete(cleanWord);
        }
    }

    // 2. Проверяем локальный словарь
    if (localDictionary.has(cleanWord)) {
        const translation = localDictionary.get(cleanWord);
        translationCache.set(cleanWord, translation);
        return translation;
    }

    // 3. Если слова нет в словаре, делаем запрос к LibreTranslate
    try {
        const response = await fetch('https://libretranslate.com/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: cleanWord,
                source: 'en',
                target: 'ru',
                format: 'text'
            })
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
        const placeholder = `[${cleanWord}]`;
        translationCache.set(cleanWord, placeholder);
        return cleanWord;
    } catch (error) {
        console.warn('⚠️ LibreTranslate API error:', error);
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
    utterance.onerror = (e) => console.error('Speech error:', e);
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

// ========== РЕНДЕР ТЕКСТА ДЛЯ ЧТЕНИЯ ==========
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

// ========== ПРОГРЕСС НА СЕРВЕРЕ (через API) ==========
async function saveProgressToServer(weekId, day, score, completed = true) {
    const headers = getAuthHeaders();
    if (!headers) return false;

    try {
        const response = await fetch('/api/progress/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                week_id: weekId,
                day: day,
                score: score,
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
    const headers = getAuthHeaders();
    if (!headers) return { completed_days: [], day_scores: {}, current_day: 1, overall_percent: 0 };

    try {
        const response = await fetch(`/api/progress/${weekId}`, {
            headers: headers
        });
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
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); display: flex; align-items: center;
        justify-content: center; z-index: 2000;
    `;

    const certificate = document.createElement('div');
    certificate.style.cssText = `
        background: var(--card-bg); border-radius: 24px; padding: 40px;
        max-width: 500px; width: 90%; text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        border: 3px solid var(--primary); animation: fadeInUp 0.5s ease;
    `;

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
                style="background: var(--primary); color: white; border: none; padding: 12px 32px; border-radius: 40px; cursor: pointer; font-size: 1rem;">
            Отлично! 🎉
        </button>
    `;

    modal.appendChild(certificate);
    document.body.appendChild(modal);

    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
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
        clearCorruptedTips();
        registerServiceWorker();
        displayDailyTip();
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
    window.addEventListener('load', applyThemeByAudience);
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

// ========== УВЕДОМЛЕНИЕ ОБ АВТОРСКИХ ПРАВАХ (ПОПАП) ==========
function showCopyrightPopup() {
    const hasSeen = localStorage.getItem('copyright_popup_seen');
    if (hasSeen === 'true') return;

    const overlay = document.createElement('div');
    overlay.id = 'copyright-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); display: flex; align-items: center;
        justify-content: center; z-index: 10000; backdrop-filter: blur(3px);
    `;

    const popup = document.createElement('div');
    popup.style.cssText = `
        background: var(--card-bg); color: var(--text);
        max-width: 90%; width: 450px; border-radius: 20px;
        padding: 25px; box-shadow: 0 20px 35px rgba(0,0,0,0.3);
        border: 2px solid var(--primary); animation: fadeInUp 0.4s ease;
    `;

    if (!document.querySelector('#copyright-popup-animation')) {
        const style = document.createElement('style');
        style.id = 'copyright-popup-animation';
        style.textContent = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    popup.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px;"><span style="font-size: 3rem;">📚</span></div>
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
        <div style="background: rgba(99,102,241,0.1); padding: 12px; border-radius: 12px; margin-bottom: 20px; font-size: 0.85rem;">
            📖 Подробнее в <a href="/terms.html" target="_blank" style="color: var(--primary);">Условиях использования</a>
        </div>
        <button id="copyright-accept-btn" style="
            width: 100%; padding: 12px; background: var(--primary);
            color: white; border: none; border-radius: 40px;
            font-size: 1rem; font-weight: bold; cursor: pointer;
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
    window.addEventListener('load', () => setTimeout(showCopyrightPopup, 1000));
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
    // === Этимология ===
    { icon: "🔍", text: "Слово «каникулы» происходит от латинского «canicula» — так называли звезду Сириус (собачью звезду). В Древнем Риме в период её появления на небе школы закрывались на отдых." },
    { icon: "📖", text: "Слово «школа» в переводе с греческого означает «досуг». В Древней Греции школой называли место, где люди проводили свободное время в философских беседах." },
    { icon: "💻", text: "Слово «компьютер» раньше было профессией! Так называли людей, которые выполняли сложные расчёты вручную." },
    { icon: "🤖", text: "Слово «робот» придумал чешский писатель Карел Чапек. Оно происходит от слова «robota», что означает «тяжёлая работа»." },
    { icon: "📱", text: "Слово «смартфон» — это два слова: smart (умный) + phone (телефон). Но первый смартфон появился только в 1992 году!" },
    { icon: "🎒", text: "Слово «рюкзак» — буквально «рюха» (мешок) + «зак» (за спиной). А по-английски backpack — это back (спина) + pack (пакет)." },
    // === Забавные факты ===
    { icon: "🐘", text: "Слоны — единственные млекопитающие, которые не умеют прыгать. Зато они отлично плавают и даже ныряют, используя хобот как трубку!" },
    { icon: "🐪", text: "Верблюды хранят жир не в горбах, а вокруг них. Горбы служат «крышей» для защиты от солнца. А воду они действительно могут долго не пить." },
    { icon: "🦒", text: "Жирафам не нужно много спать — достаточно 30 минут в день. А ещё у них самый длинный хвост среди млекопитающих (до 2,5 метров!)." },
    { icon: "🐧", text: "Императорские пингвины могут не есть до 3 месяцев, высиживая яйца в антарктическую зиму при температуре -50°C." },
    { icon: "🍕", text: "Самая популярная пицца в мире — Маргарита. Она названа в честь королевы Италии Маргариты Савойской, которая попробовала её в 1889 году." },
    { icon: "🍿", text: "Попкорн появился тысячи лет назад. Древние индейцы обнаружили, что некоторые зёрна кукурузы взрываются при нагревании." },
    { icon: "✏️", text: "Обычным карандашом можно написать линию длиной около 56 километров — это больше, чем расстояние от Москвы до Подольска и обратно!" },
    // === Мотивация ===
    { icon: "⏰", text: "Учёные выяснили: мозг лучше всего запоминает информацию утром (через 1–2 часа после пробуждения) и перед сном." },
    { icon: "🧠", text: "Объясняйте новую тему кому-то другому. Когда вы учите кого-то, вы запоминаете в 2 раза лучше." },
    { icon: "🎯", text: "Разбивайте большую задачу на маленькие шаги. 5 минут занятий — это лучше, чем ничего. Главное — начать!" },
    { icon: "🎨", text: "Рисование и музыка улучшают память и концентрацию. Ваш мозг работает активнее, когда вы творите." },
    { icon: "💪", text: "Ошибки — это не провал, а часть обучения. Каждая ошибка делает ваш мозг сильнее." },
    { icon: "🧘", text: "Делайте короткие перерывы каждые 25–30 минут. Мозгу нужно время, чтобы усвоить информацию." },
    { icon: "🗣️", text: "Учитесь в комфортной обстановке и не бойтесь говорить вслух. Это помогает тренировать произношение и уверенность." }
];

function getRandomTip() {
    if (!TIPS_LIST || TIPS_LIST.length === 0) {
        return { icon: '🧠', text: 'Учитесь каждый день!' };
    }
    const randomIndex = Math.floor(Math.random() * TIPS_LIST.length);
    return TIPS_LIST[randomIndex];
}

function displayDailyTip() {
    const tipBlock = document.getElementById('dailyTipText');
    if (!tipBlock) {
        console.warn('⚠️ Блок dailyTipText не найден на этой странице');
        return;
    }

    // Очищаем битые данные
    clearCorruptedTips();

    let tip = null;
    const raw = localStorage.getItem('dailyTip');
    const lastTipHour = localStorage.getItem('dailyTipHour');
    const currentHour = new Date().getHours();

    if (raw && lastTipHour && parseInt(lastTipHour) === currentHour) {
        try {
            tip = JSON.parse(raw);
            if (!tip || typeof tip !== 'object' || !tip.icon) {
                tip = null;
            }
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
    console.log('✅ Совет дня отображён:', tip.text);
}

function refreshDailyTip() {
    const newTip = getRandomTip();
    const tipBlock = document.getElementById('dailyTipText');
    if (tipBlock) {
        tipBlock.innerHTML = `<span class="tip-icon">${newTip.icon}</span> ${newTip.text}`;
        showToast('✨ Совет обновлён!', 'info');
        const currentHour = new Date().getHours();
        localStorage.setItem('dailyTip', JSON.stringify(newTip));
        localStorage.setItem('dailyTipHour', currentHour);
        console.log('✅ Совет обновлён:', newTip.text);
    } else {
        console.warn('⚠️ Блок dailyTipText не найден на этой странице');
    }
}

// ========== ПОДПИСКА (ОПЛАТА) ==========
async function startSubscription() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        showToast('Сначала войдите', 'error');
        return;
    }
    try {
        const response = await fetch('/payments/create', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.payment_url) {
            window.location.href = data.payment_url; // переход на страницу ЮKassa
        } else {
            showToast('Ошибка при создании платежа', 'error');
        }
    } catch (error) {
        console.error(error);
        showToast('Ошибка сети', 'error');
    }
}

async function mockPay() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        showToast('Сначала войдите', 'error');
        return;
    }
    try {
        const response = await fetch('/payments/mock', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
            showToast('✅ Премиум активирован!', 'success');
            setTimeout(() => location.reload(), 1000);
        } else {
            showToast(data.message || 'Ошибка', 'error');
        }
    } catch (error) {
        console.error(error);
        showToast('Ошибка сети', 'error');
    }
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
window.requestLoginLink = requestLoginLink;
window.logout = logout;
window.checkAuth = checkAuth;
window.refreshDailyTip = refreshDailyTip;
window.startSubscription = startSubscription;
window.mockPay = mockPay;