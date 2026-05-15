// frontend/sw.js
self.addEventListener('install', (event) => {
  console.log('SW installed');
  // Сразу переходим в активное состояние
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('SW activated');
  // Захватываем контроль над всеми страницами
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Ничего не кэшируем, просто пускаем запрос в сеть
  // Это ключевой момент!
  event.respondWith(fetch(event.request));
});