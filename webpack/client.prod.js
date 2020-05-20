const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  mode: 'production',
  entry: [
    'babel-polyfill',
    'fetch-everywhere',
    path.resolve(__dirname, '../src/index.js')
  ],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  optimization: {
    runtimeChunk: {
      name: 'bootstrap'
    },
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test:/[\\/]node_modules[\\/](react|react-dom|react-redux|redux|history|transition-group|redux-first-router|redux-first-router-link|fetch-everywhere|babel-polyfill)[\\/]/,
          name: 'vendor'
        }
      }
    }
  },
  plugins: [
    new StatsPlugin('stats.json'),
    new ExtractCssChunks(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
  ]
}
