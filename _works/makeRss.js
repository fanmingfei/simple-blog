const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const moment = require('moment');
const marked = require('marked');
const database = require('./libs/database');

var feed;

function init() {
    feed = new RSS({
        title: config.website.title,
        site_url: config.website.domain + config.website.websitePath,
        description: config.website.description,
        language: 'zh-cn',
        pubDate: moment(),
        feed_url: config.website.domain + config.website.websitePath + config.website.rss,
        ttl: '60',
    });
}


module.exports = function() {
    init();
    var posts = database.getAll().splice(0, 40);
    posts = posts.sort((p, n) => n.date - p.date).splice(0, 10);
    posts.forEach(post => {
        feed.item({
            title: post.title,
            description: marked(post.content),
            url: post.url
        });
    });;
    fs.writeFile(path.resolve(__dirname, '../', config.directory.publish, 'rss.xml'), feed.xml(), (err) => {
        if (err) {
            console.log(err);
        }
    })

}