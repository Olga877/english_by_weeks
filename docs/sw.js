const CACHE_NAME = 'ebw-beta-v2';
const STATIC_CACHE = 'static-beta-v2';
const WEEKS_CACHE = 'weeks-beta-v2';

const STATIC_ASSETS = [
  'index.html',
  'week.html',
  'css/style.css',
  'js/common.js',
  'js/index.js',
  'js/week.js',
  'manifest.json'
];

const WEEK_FILES = [
  'data/lessons/adults/A0/beginner_it_basics.json',
  'data/lessons/adults/B1/money_week.json',
  'data/lessons/adults/B1/adult_body_modals.json',
  'data/lessons/adults/B1/school_education.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => caches.open(WEEKS_CACHE))
      .then(weeksCache => {
        return Promise.all(WEEK_FILES.map(url =>
          fetch(url)
            .then(response => {
              if (response.ok) weeksCache.put(url, response);
            })
            .catch(() => {})
        ));
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
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

  // Игнорируем внешние домены (LibreTranslate и т.п.)
  if (url.origin !== location.origin) {
    return; // пусть идёт как обычно, без SW
  }

  // JS и CSS — сначала сеть, потом кэш
  if (url.pathname.match(/\.(js|css)$/)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const responseToCache = response.clone();
            caches.open(STATIC_CACHE).then(cache => cache.put(event.request, responseToCache));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // HTML и JSON — из кэша, при отсутствии — сеть
  if (url.pathname.match(/\.(html|json|png|jpg|svg|ico)$/)) {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
    return;
  }

  // Всё остальное — сеть, при ошибке кэш
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('index.html'));
});