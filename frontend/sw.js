const CACHE_NAME = 'english-by-weeks-v1';
const STATIC_CACHE = 'static-v1';
const WEEKS_CACHE = 'weeks-v1';

// Все статические файлы приложения
const STATIC_ASSETS = [
  '/static/',
  '/static/index.html',
  '/static/week.html',
  '/static/school_week.html',
  '/static/css/style.css',
  '/static/js/common.js',
  '/static/js/index.js',
  '/static/js/week.js',
  '/static/js/school_week.js',
  '/static/manifest.json'
];

// Все JSON-файлы с уроками (5 класс)
const WEEK_FILES = [
  '/api/lessons/school/week/grade5/week1_school',
  '/api/lessons/school/week/grade5/week2_numbers',
  '/api/lessons/school/week/grade5/week3_capital_letters',
  '/api/lessons/school/week/grade5/week4_countries_nationalities',
  '/api/lessons/school/week/grade5/week5_personal_things',
  '/api/lessons/school/week/grade5/week6_numbers_souvenirs',
  '/api/lessons/school/week/grade5/week7_rooms_ordinals',
  '/api/lessons/school/week/grade5/week8_furniture_there_is',
  '/api/lessons/school/week/grade5/week9_prepositions_house',
  '/api/lessons/school/week/grade5/week10_family_can',
  '/api/lessons/school/week/grade5/week11_appearance_possessive'
];

// Установка — кэшируем всё при первом запуске
self.addEventListener('install', (event) => {
  console.log('🔧 SW: Установка...');

  event.waitUntil(async () => {
    // Кэш статики
    const staticCache = await caches.open(STATIC_CACHE);
    await staticCache.addAll(STATIC_ASSETS);

    // Кэш всех недель
    const weeksCache = await caches.open(WEEKS_CACHE);
    for (const url of WEEK_FILES) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await weeksCache.put(url, response);
          console.log(`✅ Загружена: ${url}`);
        }
      } catch (e) {
        console.log(`⚠️ Не загружена: ${url}`);
      }
    }
  }());

  self.skipWaiting();
});

// Активация — чистим старые кэши
self.addEventListener('activate', (event) => {
  console.log('🔧 SW: Активация...');

  event.waitUntil(async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(key => key !== STATIC_CACHE && key !== WEEKS_CACHE)
        .map(key => caches.delete(key))
    );
  });

  event.waitUntil(clients.claim());
});

// Обработка запросов — сначала кэш, потом сеть
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Статика — из кэша
  if (url.pathname.match(/\.(css|js|html|json|png|jpg|svg|ico)$/)) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request);
      })
    );
    return;
  }

  // API с уроками — из кэша недель
  if (url.pathname.includes('/api/lessons/')) {
    event.respondWith(
      caches.open(WEEKS_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;

        const response = await fetch(event.request);
        if (response.ok) cache.put(event.request, response.clone());
        return response;
      })
    );
    return;
  }

  // Всё остальное — сеть, при ошибке кэш
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Уведомления
self.addEventListener('sync', (event) => {
  if (event.tag === 'daily-notification') {
    event.waitUntil(sendDailyNotification());
  }
});

async function sendDailyNotification() {
  const clients = await self.clients.matchAll();
  if (clients.length === 0) return;

  self.registration.showNotification('📚 English by Weeks', {
    body: 'Пора пройти новый день! Ваш прогресс ждёт вас.',
    icon: '/static/icons/icon-192.png',
    badge: '/static/icons/icon-96.png',
    vibrate: [200, 100, 200]
  });
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/static/index.html')
  );
});