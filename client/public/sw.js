self.addEventListener('install', (e) => {
  console.log('Установлен');
});
self.addEventListener('activate', (e) => {
  console.log('Активирован');
});
self.addEventListener('fetch', (e) => {
  console.log('Происходит запрос на сервер');
});