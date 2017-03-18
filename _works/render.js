const fs = require('fs');
const path = require('path');
const moment = require('moment');
var minify = require('html-minifier').minify;
const config = require('./config');
const database = require('./libs/database');
const tpl = require('./libs/template');
const marked = require('./libs/parsePost');

function minifyHtml(html) {
    return html;
    return minify(html, {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
    });

}

function getTpl(name) {
    var pathname = path.resolve(__dirname, '../', config.directory.templates, name + '.html');
    return fs.readFileSync(pathname);
}

function renderIndex() {
    var posts = database.getAll();
    posts.sort((pre, next) => {
        return moment(pre._date).isBefore(next._date);
    });
    var obj = {
        posts,
        website: config.website
    };

    var indexTpl = getTpl(config.entry.index.template);
    var indexHtml = tpl.render(indexTpl + '', obj);
    indexHtml = minifyHtml(indexHtml);
    var pathname = path.resolve(__dirname, '../', config.directory.publish, 'index.html');
    fs.writeFileSync(pathname, indexHtml);
}

function renderPosts() {
    var posts = database.getAll();
    var obj = {
        posts,
        website: config.website,
    }

    posts.forEach(post => {
        obj.post = post;
        obj.post.content = marked(post.content);
        var postTpl = getTpl(config.entry.post.template);
        var postHtml = tpl.render(postTpl + '', obj);
        postHtml = minifyHtml(postHtml);
        var file = path.parse(post.filepath);
        var pathname = path.resolve(__dirname, '../', config.directory.publish, config.publishDirectory.posts, file.name + '.html');
        fs.writeFileSync(pathname, postHtml);
    })
}

module.exports = function() {
    renderPosts();
    renderIndex();
}