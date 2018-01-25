var CACHE = "cache-only";

self.addEventListener("install", function(evt) {
    console.log("The service worker is being installed.");
    evt.waitUntil(precache());
});

self.addEventListener("fetch", function(evt) {
    console.log("The service worker is serving the asset.");
    evt.respondWith(fromCache(evt.request));
});

function precache() {
    return caches.open(CACHE).then(function(cache) {
        return cache.addAll([
            "./index.html",
            "./child.html",
            "./main.css",
            "./favicon.ico",
            "js/child.js",
            "js/cube.js",
            "js/main.js",
            "js/memory.js",
            "js/prime.js",
            "js/sharedworker.js",
            "js/webworker.js",
            "http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/github.min.css",
            "http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js"
        ]);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function(cache) {
        return cache.match(request).then(function(matching) {
            return matching || Promise.reject("no-match");
        });
    });
}
