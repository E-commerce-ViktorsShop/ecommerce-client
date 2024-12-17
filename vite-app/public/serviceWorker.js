const CACHE_NAME = 'my-cache-v1';

self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/index.html',  // Your HTML files
                "/banners/banner.jpg",  // Your static image files in public
                "/icons/viktorshop-fav.png",
                "/logos/Viktorsshop-comic-png"
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    const requestUrl = event.request.url;

    if (requestUrl.includes('cdn.webhallen.com')) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return (
                    cachedResponse ||
                    fetch(event.request).then((response) => {
                        const clonedResponse = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, clonedResponse);
                        });
                        return response;
                    }).catch((err) => {
                        console.error('Failed to fetch image:', err);
                        return new Response('Image not available', { status: 404 });
                    })
                );
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
        );
    }
});
