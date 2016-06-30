/**
 * 引入文件入口 - 模块 自动读取src 已js结尾的文件
 * 文件主入口目录 键key表示 编译出需要引入的JS文件名 值value 表示 需要待编译的js文件
 * @type {{index: string, details: string}}
 */
var path = require('path');
var fs = require('fs');
var controllerPath = path.join(__dirname,'src');
//读取目录夹内容
var files_names= {};
var regtsx = /(.*).js|jsx/;
var fileNames = fs.readdirSync(controllerPath, function(err, files){
  if(err){
  	console.log(err);
  	return false;
  };
  return files
});

fileNames.forEach(function(v){
  var tsx = v.match(regtsx);
  if(tsx){
    if(!files_names[tsx]){
      files_names[tsx[1]] = tsx[1];
    }
  }
});

console.log(files_names);

module.exports = files_names;