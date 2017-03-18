const ejs = require('ejs');
const include = require('./include');

const tpl = {
    render(template, obj) {
        template = include(template);
        return ejs.render(template, obj);
    }
}

module.exports = tpl;