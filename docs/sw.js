const CACHE_NAME = 'english-by-weeks-v5';
const STATIC_CACHE = 'static-v1';
const WEEKS_CACHE = 'weeks-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/week.html',
  '/school_week.html',
  '/css/style.css',
  '/js/common.js',
  '/js/index.js',
  '/js/week.js',
  '/js/school_week.js',
  '/manifest.json'
];

const WEEK_FILES = [
  '/data/lessons/school/grade5/week1_school.json',
  '/data/lessons/school/grade5/week2_numbers.json',
  '/data/lessons/school/grade5/week3_capital_letters.json',
  '/data/lessons/school/grade5/week4_countries_nationalities.json',
  '/data/lessons/school/grade5/week5_personal_things.json',
  '/data/lessons/school/grade5/week6_numbers_souvenirs.json',
  '/data/lessons/school/grade5/week7_rooms_ordinals.json',
  '/data/lessons/school/grade5/week8_furniture_there_is.json',
  '/data/lessons/school/grade5/week9_prepositions_house.json',
  '/data/lessons/school/grade5/week10_family_can.json',
  '/data/lessons/school/grade5/week11_appearance_possessive.json',
  '/data/lessons/school/grade5/week12_famous_people.json',
  '/data/lessons/school/grade5/week13_indian_animals.json',
  '/data/lessons/school/grade5/week14_at_the_zoo.json',
  '/data/lessons/school/grade5/week15_my_pet.json',
  '/data/lessons/school/grade5/week16_daily_routine.json',
  '/data/lessons/school/grade5/week17_jobs.json',
  '/data/lessons/school/grade5/week18_weekends.json',
  '/data/lessons/school/grade5/week19_big_ben.json',
  '/data/lessons/school/grade5/week20_seasons.json',
  '/data/lessons/school/grade5/week21_clothes.json',
  '/data/lessons/school/grade5/week22_celebrations.json',
  '/data/lessons/school/grade5/week23_food.json',
  '/data/lessons/school/grade5/week24_birthday.json',
  '/data/lessons/school/grade5/week25_shopping.json',
  '/data/lessons/school/grade5/week26_past_simple.json',
  '/data/lessons/school/grade5/week27_films.json',
  '/data/lessons/adults/B1/money_week.json',
  '/data/lessons/adults/B1/adult_body_modals.json'
];

self.addEventListener('install', (event) => {
  console.log('🔧 SW: Установка...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => caches.open(WEEKS_CACHE))
      .then(weeksCache => {
        return Promise.all(WEEK_FILES.map(url =>
          fetch(url)
            .then(response => {
              if (response.ok) {
                weeksCache.put(url, response);
                console.log(`✅ Загружена: ${url}`);
              }
            })
            .catch(e => console.log(`⚠️ Не загружена: ${url}`))
        ));
      })
      .then(() => console.log('✅ Все ресурсы закэшированы'))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('🔧 SW: Активация...');
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== STATIC_CACHE && key !== WEEKS_CACHE)
            .map(key => caches.delete(key))
      ))
      .then(() => clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ===== JS и CSS — сначала СЕТЬ, потом кэш =====
  if (url.pathname.match(/\.(js|css)$/)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Кэшируем обновлённую версию
          caches.open(STATIC_CACHE).then(cache => {
            cache.put(event.request, response.clone());
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // ===== Остальная статика — из кэша, при ошибке сеть =====
  if (url.pathname.match(/\.(html|json|png|jpg|svg|ico)$/)) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
    return;
  }

  // ===== API с уроками — из кэша недель =====
  if (url.pathname.includes('/api/lessons/')) {
    event.respondWith(
      caches.open(WEEKS_CACHE)
        .then(cache => cache.match(event.request))
        .then(cached => {
          if (cached) return cached;
          return fetch(event.request)
            .then(response => {
              if (response.ok) {
                caches.open(WEEKS_CACHE)
                  .then(cache => cache.put(event.request, response.clone()));
              }
              return response;
            });
        })
    );
    return;
  }

  // ===== Всё остальное — сеть, при ошибке кэш =====
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
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
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-96.png',
    vibrate: [200, 100, 200]
  });
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/index.html')
  );
});