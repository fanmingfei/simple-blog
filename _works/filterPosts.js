const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const moment = require('moment');
// const tpl = require('././libs/template.js');
const config = require('./config');
const parsePost = require('./libs/parsePost');

const database = require('./libs/database');



function getPostIntro(content) {
    const r = content.match(/---(\n|.)+?---/g);
    var infoYaml, desc;
    if (r && r.length > 0) {
        let y = r[0].split(/\n?---\n?/);
        if (y.length > 0) {
            infoYaml = y[1];
        }
        // console.log(r[0].length)
        content = content.substring(r[0].length);
        var info = yaml.load(infoYaml);

        return {
            info,
            content
        }
    }
    return null;
}

module.exports = function() {
    var postsPath = path.resolve(__dirname, '../', config.directory.posts);
    var fileList = fs.readdirSync(postsPath);
    fileList.forEach(filepath => {
        let file = path.parse(filepath);
        if (file.ext == '.md') {
            const content = fs.readFileSync(postsPath + '/' + filepath).toString();
            let intro = getPostIntro(content);
            if (intro) {
                intro.info.filepath = postsPath + '/' + filepath;
                intro.info.content = intro.content;
                intro.info.url = config.website.domain + path.resolve('/', config.website.websitePath, config.publishDirectory.posts, file.name + '.html');
                intro.info._date = intro.info.date;
                intro.info.date = moment(intro.info.date).format('YYYY-MM-DD HH:mm');
                database.addPost(intro.info);
            }
        }
    })
};