const http = require('http');

var srv = http.createServer((req, res) => {
    req.on('data', (d) => {

    })
});

srv.listen(1337, '127.0.0.1');