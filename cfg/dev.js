'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

//获取src目录下的所有js文件
//把它们变为{filename1:'filename1', filename2:'filename2'}格式
//用他们来构建webpack的entry
//-----------构建webpack的entry开始-----------//
var filepath = require('../filepath');
function getEntry(){
    var entry = {};
    for (var name in filepath) {
      entry[name] = [
        // WebpackDevServer host and port
        'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
        'webpack/hot/only-dev-server',
        './src/' + filepath[name]
      ];
    }
    return entry;
}
//-----------构建webpack的entry结束-----------//

let config = Object.assign({}, baseConfig, {
  /*  
  entry: {
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    index : './src/index', 
    main : './src/main'
  },
  */
  
  //入口文件配置
  entry: getEntry(),
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    //这个插件可以将多个打包后的资源中的公共部分打包成单独的文件，这里指定公共文件输出为“common.js”
    new webpack.optimize.CommonsChunkPlugin({
        name: "Common",
        filename:"Common.js"
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
