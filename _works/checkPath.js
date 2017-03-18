const path = require('path');
const fs = require('fs');
const config = require('./config');


function mkdir(pathname) {

    if (fs.existsSync(pathname)) {
        return;
    }
    if (!fs.existsSync(path.parse(pathname).dir)) {
        mkdir(path.parse(pathname).dir);
    }
    fs.mkdirSync(pathname);
}



module.exports = function() {
    mkdir(__dirname, '../', config.directory.publish);
    Object.values(config.publishDirectory).forEach((p) => {
        let pathname = path.resolve(__dirname, '../', config.directory.publish, p);
        mkdir(pathname);
    })
}