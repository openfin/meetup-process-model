importScripts('prime.js');

self.addEventListener('message', () => {
    const resultBuffer = doPointlessComputationsWithBlocking().buffer;
    postMessage(resultBuffer, [resultBuffer]);
});
