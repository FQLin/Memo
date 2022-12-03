// 计算 1-1亿之和
//web worker 是一个独立的进程，不能操作dom和bom
//适合做大量的运算
let total = 0;
for (let i = 0; i < 100000000; i++) {
    total += i;
}

//向主线程发送消息
self.postMessage({ total });
