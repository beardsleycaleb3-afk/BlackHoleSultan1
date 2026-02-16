const CACHE_NAME = 'gog-v4.7';
const ASSETS = [
  './',
  './index.html',
  './assets/maps/200walkable_floor.png',
  './assets/rs/south_idlers.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
