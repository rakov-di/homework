'use strict';

// Конфиг для кэша
var config = {
  SWVersion: 8,
  cachedFiles: [
    '/index.html',
    '/static/js/main.chunk.js',
    '/static/css/main.chunk.css',
    '/static/css/2.chunk.css',
    'icons-8a67240e.svg'
  ]
};
config.cacheName = 'cache-static-v' + config.SWVersion;

self.addEventListener('install', (e) => {
  console.log('Установлен');
  // Сохраняем текущие ресурсы в кэш
  e.waitUntil(
    caches
      .open(config.cacheName)
      .then((cache) => cache.addAll(config.cachedFiles))
  );
});

self.addEventListener('activate', (e) => {
  console.log('Активирован');
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
  );
});

self.addEventListener('fetch', (e) => {
  console.log('Происходит запрос на сервер');

  // Сначала отдаем ресурсы из кэша
  e.respondWith(fromCache(e.request));
  // Уже потом проверяем, обновился ли он и обновляем при необходимости
  e.waitUntil(
    updateCache(e.request)
      // В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
      .then(refresh)
  );
});

function fromCache(request) {
  return caches.open(config.cacheName).then((cache) =>
    cache.match(request).then((matching) =>
      matching || Promise.reject('no-match')
    ));
}

function updateCache(request) {
  return caches.open(config.cacheName).then((cache) =>
    fetch(request).then((response) =>
      cache.put(request, response.clone()).then(() => response)
    )
  );
}

// Шлём сообщения об обновлении данных всем клиентам.
function refresh(response) {
  return self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      const message = {
        text: 'Данные на странице обновились. Обновить?',
      };
      // Уведомляем клиент об обновлении данных.
      client.postMessage(JSON.stringify(message));
    });
  });
}