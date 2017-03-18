const path = require('path');
const loki = require('lokijs');

const db = new loki(path.resolve(__dirname, '../database/db.json'));
const articles = db.addCollection('articles');
const tags = db.addCollection('tags');

module.exports = {}