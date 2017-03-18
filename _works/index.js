const tpl = require("./libs/template.js");
const fs = require("fs");

const filterPosts = require('./filterPosts.js');
const checkPath = require('./checkPath');
const render = require('./render');



checkPath();

filterPosts();

render();