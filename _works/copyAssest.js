const fs = require('fs');
const { copy } = require('fs-extra');
const path = require('path');
const config = require('./config');

module.exports = function () {
  var postsPath = path.resolve(__dirname, '../', config.directory.posts);

  var publishPath = path.resolve(__dirname, '../', config.directory.publish, config.publishDirectory.posts)
  console.log(publishPath)

  var fileList = fs.readdirSync(postsPath);

  // 把fileList列表下的目录移动到上一级
  fileList.forEach(filepath => {

    let dirFileStat = fs.statSync(path.resolve(postsPath, filepath));
    if (dirFileStat.isDirectory()) {
      copy(path.resolve(postsPath, filepath), path.resolve(__dirname, '../', config.directory.publish, config.publishDirectory.posts, filepath))
      
    }

  })
  // fileList.forEach(()=>{

  // })

}