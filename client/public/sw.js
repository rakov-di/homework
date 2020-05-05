'use strict';

const config = {
  cacheName: 'cache-and-update-v8',
  cachedFiles: [
    '/',
    '/favicon.ico',
    '/logo192.png ',
    '/logo512.png ',
    '/static/js/bundle.js',
    '/static/js/0.chunk.js',
    '/static/js/main.chunk.js',
    '/static/media/icons-8a67240e.8a67240e.svg',
    'http://yastatic.net/islands/_/7_GKBdKFbUPzKlghJRv55xgz0FQ.woff2',
    'http://yastatic.net/islands/_/PyVcRbwHetz0gOVWLonWH7Od8zM.woff2'
  ]
};

self.addEventListener('install', (e) => {
  console.log('Service Worker successfully INSTALLED');
  // Сохраняем текущие ресурсы в кэш
  e.waitUntil(
    openCache().then((cache) => cache.addAll(config.cachedFiles))
  );
});

self.addEventListener('activate', (e) => {
  console.log('Service Worker successfully ACTIVATED');
  // Удаляем старый кэш
  e.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return cacheNames.filter(cacheName => !config.cacheName.includes(cacheName));
      })
      .then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      })
      .then(() => self.clients.claim())
      .catch((err) => console.warn('Something goes wrong on Activate' + err))
  );
});

self.addEventListener('fetch', (e) => {
  console.log('Service Worker FETCH');

  // Не кешируем запросы
  if (e.request.method !== 'GET' || e.request.url.indexOf('/api/') !== -1) {
    return;
  }

  // Сначала отдаем ресурсы из кэша
  e.respondWith(fromCache(e.request));
  // Уже потом проверяем, обновился ли он и обновляем при необходимости
  e.waitUntil(updateCache(e.request));
});

function fromCache(request) {
  return openCache()
    .then((cache) =>
      cache.match(request, { ignoreSearch: true }).then((matching) =>
        matching || Promise.reject('no-match')
      ))
    .catch((err) => console.warn('Something goes wrong on getting from cache: ' + err))

}

function updateCache(request) {
  return openCache()
    .then((cache) =>
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            return cache.put(request, response.clone()).then(() => response);
          } else {
            console.warn('Something goes wrong on update cache');
          }
        })
    .catch((err) => console.warn('Something goes wrong: ' + err))
  );
}

function openCache() {
  return caches.open(config.cacheName);
}