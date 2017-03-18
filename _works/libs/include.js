const fs = require('fs');
const path = require('path');

const config = require('../config');

var htmlCache = {};
var match = (html) => {
    html = html.replace(/\<include.+?src=\"(.+?)\".+?\/\>/g, (tag, filename) => {
        if (filename) {
            if (!htmlCache[filename]) {
                htmlCache[filename] = fs.readFileSync(path.resolve(__dirname, '../../', config.directory.templates, filename)) + '';
            }
            return htmlCache[filename];
        }
        return '';
    });
    return html;
}

module.exports = match;