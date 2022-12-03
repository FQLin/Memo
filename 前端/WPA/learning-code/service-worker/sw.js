// 文件变化的时候会重新注册

self.addEventListener("install", async (event) => {
    console.log("install", event);

    // 等待 skipWaiting 结束，才会进入 activate
    // event.waitUntil(self.skipWaiting());

    // 会让 service worker 跳过等待，直接进入 activate状态
    await self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
    console.log("activate", event);

    //service worker 激活之后立刻获取控制权
    // event.waitUntil(self.clients.claim());
    await self.clients.claim();
});

// fetch 事件会在请求发送的时候触发
self.addEventListener("fetch", (event) => {
    console.log("fetch", event);
});
