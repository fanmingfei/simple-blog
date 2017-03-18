const fs = require('fs');
const path = require('path');
const config = require('./config');
const database = require('./libs/database');
const tpl = require('./libs/template');
const marked = require('./libs/parsePost');

function getTpl(name) {
    var pathname = path.resolve(__dirname, '../', config.directory.templates, name + '.html');
    return fs.readFileSync(pathname);
}

function renderIndex() {
    var posts = database.getAll();
    var obj = {
        posts,
        website: config.website
    }

    var indexTpl = getTpl(config.entry.index.template);
    var indexHtml = tpl.render(indexTpl + '', obj);

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
        var file = path.parse(post.filepath);
        var pathname = path.resolve(__dirname, '../', config.directory.publish, config.publishDirectory.posts, file.name + '.html');
        fs.writeFileSync(pathname, postHtml);
    })
}

module.exports = function() {
    renderPosts();
    renderIndex();
}