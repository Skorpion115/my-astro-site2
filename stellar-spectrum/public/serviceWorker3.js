const CACHE_NAME = 'webapp-v1';
const CACHE_FILES = [
    '/',
    '/instrumentenkauf/',
    '/honorar/',
    '/leistungen'
];

self.addEventListener('install', event => {
    console.log("[serviceWorker3.js] Install event.");
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CACHE_FILES))
            .then(self.skipWaiting())
            .catch(err => console.error("[serviceWorker3.js] Error trying to pre-fetch cache files:", err))
    );
});

self.addEventListener('activate', event => {
    console.log("[serviceWorker3.js] Activate event.");
    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener('fetch', event => {
    if (!event.request.url.startsWith(self.location.origin)) return;
    console.log("[serviceWorker3.js] Fetch event on", event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            console.info("[serviceWorker3.js] Responded to ", event.request.url, "with", response ? "cache hit." : "fetch.");
            return response || fetch(event.request);
        }).catch(err => {
            console.error("[serviceWorker3.js] Error with match or fetch:", err);
        })
    );
});