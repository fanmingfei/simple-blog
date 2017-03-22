const fs = require('fs-extra');
const path = require('path');
const config = require('./config');


module.exports = function() {

    const staticPath = path.resolve(__dirname, '../', config.directory.static);
    const targetPath = path.resolve(__dirname, '../', config.directory.publish, config.directory.static);
    fs.copy(staticPath, targetPath, err => {
        if (err) {
            console.log('创建静态资源出错！')
        }
    });
}