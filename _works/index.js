const tpl = require("./libs/template.js");
const fs = require("fs");
const filterPosts = require('./filterPosts.js');
const checkPath = require('./checkPath');
const moveStatic = require('./moveStatic');
const render = require('./render');
const makeRss = require('./makeRss');
const copyAssest = require("./copyAssest.js");



checkPath();

filterPosts();

render();

copyAssest()

moveStatic();

makeRss();