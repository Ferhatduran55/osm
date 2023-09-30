const cacheName = 'osmcache';

const putInCache = async (request, response) => {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
};

const cacheAndRespond = async ({ request, fallbackUrl }) => {
    // First try to get the resource from the cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }
    // Next try to get the resource from the network
    try {
        const responseFromNetwork = await fetch(request);
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            return fallbackResponse;
        }
        return new Response('Network error happened', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
};

//install

self.addEventListener('install', (event) => {
    console.log('installing sw')
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                './assets/json/manifest.json',
                './assets/plugins/createjs/preloadjs.min.js',
                './assets/plugins/custom/loader.js',
                './assets/plugins/custom/main.css',
                './index.html',
                './assets/plugins/custom/style.css',
                './assets/plugins/leaflet/leaflet.css',
                './assets/plugins/jquery/jquery.min.js',
                './assets/plugins/custom/index.js',
                './assets/plugins/leaflet/leaflet.js',
                './assets/plugins/leaflet/leaflet.js.map',
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

    event.respondWith(
        cacheAndRespond({
            request: event.request,
            fallbackUrl: './img/automation.png'
        })
    );
});