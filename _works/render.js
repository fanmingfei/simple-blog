const fs = require('fs');
const path = require('path');
const moment = require('moment');
const config = require('./config');
const database = require('./libs/database');
const tplEngine = require('./libs/template');
const marked = require('./libs/parsePost');
const minifyHtml = require('./libs/minifyHtml');
const deepExtend = require('deep-extend');

function getTpl(name) {
    var pathname = path.resolve(__dirname, '../', config.directory.templates, name + '.html');
    return fs.readFileSync(pathname);
}

function renderIndex() {
    var posts = database.getAll();
    posts.sort((pre, next) => {
        return next.timeStr - pre.timeStr
    });
    var tplVar = {
        posts
    };
    var tpl = getTpl(config.entry.index.template);
    var filepath = path.resolve(__dirname, '../', config.directory.publish, 'index.html');
    makePage(tplVar, tpl, filepath)
}

function renderPosts() {
    var posts = database.getAll();
    var tplVar = {
        posts,
        website: config.website,
        title: posts.title
    }

    posts.forEach(post => {
        tplVar.post = post;
        var tpl = getTpl(config.entry.post.template);
        var file = path.parse(post.filepath);
        var filepath = path.resolve(__dirname, '../', config.directory.publish, config.publishDirectory.posts, file.name + '.html');
        makePage(tplVar, tpl, filepath);

    })
}


function renderCategory() {
    var posts = database.getAll();
    // post.
}

function renderArchives() {
    var posts = database.getAll();
    var archives = {};

    posts.sort((pre, next) => {
        return next.timeStr - pre.timeStr
    });

    posts.forEach(post => {
        if (!archives[moment(post.timeStr).format("YYYY-MM")]) {
            archives[moment(post.timeStr).format("YYYY-MM")] = [];
        }
        archives[moment(post.timeStr).format("YYYY-MM")].push(post);
    });

    archives = Object.values(archives);

    var newArchives = [];
    archives.forEach((arcs, i) => {
        newArchives.push({
            date: moment(moment(arcs[0].timeStr).format("YYYY-MM"), "YYYY-MM").valueOf(),
            posts: arcs
        })
    })
    var tplVar = {
        title: '归档',
        archives: newArchives
    };

    var tpl = getTpl(config.entry.archives.template);

    var filepath = path.resolve(__dirname, '../', config.directory.publish, 'archives.html');

    makePage(tplVar, tpl, filepath);
}

function renderCategory() {

    var posts = database.getAll();


    posts.sort((pre, next) => {
        return next.timeStr - pre.timeStr
    });

    var category = {};

    posts.forEach(post => {
        if (!category[post.category]) {
            category[post.category] = [];
        }
        category[post.category].push(post);
    });
    category = Object.values(category);

    var newCategory = [];
    category.forEach(cate => {
        newCategory.push({
            category: cate[0].category,
            posts: cate
        });
    })

    newCategory.sort((p, n) => {
        return p.category > n.category ? 1 : -1;
    })

    var tplVar = {
        title: '分类',
        category: newCategory
    };



    var tpl = getTpl(config.entry.category.template);

    var filepath = path.resolve(__dirname, '../', config.directory.publish, 'category.html');

    makePage(tplVar, tpl, filepath);


}

function makePage(tplVar, tpl, filepath) {
    var defaultTplVar = {
        website: config.website,
        title: config.website.title,
        moment: moment,
        marked: marked
    };
    tplVar = deepExtend(defaultTplVar, tplVar);

    var html = minifyHtml(tplEngine.render(tpl + '', tplVar));

    fs.writeFileSync(filepath, html);

}

module.exports = function() {
    renderPosts();
    renderIndex();
    renderArchives();
    renderCategory();
}