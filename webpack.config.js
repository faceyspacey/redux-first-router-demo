const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [
      {
        "test": /\.js?$/,
        "exclude": /node_modules/,
        "loader": "babel-loader",
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
        "loader": "style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]"
      }
    ]
  },
  resolve: {
    modules: ["node_modules", "src"]
  }
}
