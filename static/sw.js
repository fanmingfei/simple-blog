var version = 'v2';
this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(version).then(function(cache) {
            return cache.addAll([
                '/static/images/avatar.jpeg',
                '/static/styles/reset.css',
                '/static/styles/main.css',
                '/static/styles/webfont.css',
                '/static/fonts/icomoon.eot',
                '/static/fonts/icomoon.svg',
                '/static/fonts/icomoon.ttf',
                '/static/fonts/icomoon.woff'
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    var response;
    event.respondWith(caches.match(event.request).catch(function() {
        return fetch(event.request);
    }).then(function(r) {
        response = r;
        caches.open(version).then(function(cache) {
            cache.put(event.request, response);
        });
        return response.clone();
    }).catch(function() {
        console.log('no cache');
    }));
});