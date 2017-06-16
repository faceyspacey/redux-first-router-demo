var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel",
    "query": {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ],
      "plugins": []
    }
  },
  {
    "test": /\.css?$/,
    "loader": "style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]"
  }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'pure-redux-router': path.resolve(__dirname, '../pure-redux-router/src'),
      'redux-first-router-restore-scroll': path.resolve(__dirname, '../redux-first-router-scroll/src'),
      'redux-first-router-scroll-container': path.resolve(__dirname, '../redux-first-router-scroll-container/src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: loaders
  }
};
