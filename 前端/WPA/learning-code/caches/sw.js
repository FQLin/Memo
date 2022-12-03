const CACHE_NAME = "cache_v2";
self.addEventListener("install", async (event) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
        "./index.html", //和访问的路径有关
        "./images/logo.png",
        "./manifest.json",
        "./index.css",
    ]);
    await self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
    const keys = await caches.keys();
    keys.forEach((key) => {
        if (key !== CACHE_NAME) {
            caches.delete(key);
        }
    });
    await self.clients.claim();
});

// fetch 事件会在请求发送的时候触发
self.addEventListener("fetch", (event) => {
    // 请求对象
    const req = event.request;
    event.respondWith(networkFirst(req));
    console.log("fetch", event);
});

async function networkFirst(req) {
    try {
        const fresh = await fetch(req);
        return fresh;
    } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(req);
        return cached;
    }
}
