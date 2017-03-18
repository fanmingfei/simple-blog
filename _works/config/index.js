const fs = require('fs');
const path = require('path');
const glob = require('glob');

var config = {};

var list = fs.readdirSync(__dirname);
list.forEach(filepath => {
    let file = path.parse(filepath);
    if (file.ext == '.json') {
        config[file.name] = JSON.parse(fs.readFileSync(__dirname + '/' + filepath));
    }
})
module.exports = config;