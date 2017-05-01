importScripts('prime.js');

onmessage = function(e) {
    const resultBuffer = doPointlessComputationsWithBlocking().buffer;
    postMessage(resultBuffer, [resultBuffer]);
};
