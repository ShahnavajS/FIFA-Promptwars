const CACHE_NAME = "stadium-pulse-cache-v1";
const OFFLINE_URL = "/offline";

const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/offline",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          if (response.status === 200 && event.request.url.startsWith(self.location.origin)) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
          return new Response("Offline resource unavailable", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
    })
  );
});
