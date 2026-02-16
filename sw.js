const cacheName = 'sultan-gog-v1';
const assets = ['./', './index.html', './manifest.json', './1000037747.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
