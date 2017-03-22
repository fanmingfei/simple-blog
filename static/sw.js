var version = 'v2';
this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(version).then(function(cache) {
            return cache.addAll([
                '/static/images/avatar.jpeg',
                '/static/styles/reset.css',
                '/static/styles/webfont.css',
                '/static/fonts/webfont.eot',
                '/static/fonts/webfont.svg',
                '/static/fonts/webfont.ttf',
                '/static/fonts/webfont.woff'
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