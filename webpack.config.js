const path = require('path');
const externals = require('./webpack/externals');
const middleware = require('./server/middleware');
const webpack = require('webpack');
const merge = require('webpack-merge');
const StatsPlugin = require('stats-webpack-plugin');
const define = require('./webpack/define');
const babelLoader = require('./webpack/babel');
const servePlugin = require('./webpack/serve');
const cssLoader = require('./webpack/cssLoader');
const miniCssPlugin = require('./webpack/minicss');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const res = p => path.resolve(__dirname, p);
const DIST_DIR = path.resolve(__dirname, 'dist');
const optimize = process.env.NODE_ENV === 'production';
const mode = optimize ? 'production' : 'development'

// конфиг общий для всех
const common = merge({
  mode,
  watch: !optimize,
  entry: [
    'fetch-everywhere',
  ],
  output: {
    path: DIST_DIR,
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.css']
  },
},
  define(mode),
  babelLoader(),
);

// основной мульти-конфиг, но не полноценный
const baseConfig = {
  client: merge.smart(
    common,
    // styleLoader(), // использовать этот вместо экстрактора, если не работает hot reload
    miniCssPlugin(optimize),
    cssLoader(),
    {
      name: 'client',
      target: 'web',
      entry: [
        res('./src/index.js'),
      ],
      output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
      },
      optimization: {
        runtimeChunk: {
          name: 'bootstrap'
        },
        splitChunks: {
          chunks: 'initial',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-redux|redux|history|transition-group|redux-first-router|redux-first-router-link|fetch-everywhere|babel-polyfill)[\\/]/,
              name: 'vendor'
            }
          }
        }
      },
      plugins: [
        new StatsPlugin('stats.json'),
      ]
    }),
  server: merge.smart(
    common,
    externals(res('./node_modules')),
    cssLoader('css-loader/locals'),
    {
      name: 'server',
      target: 'node',
      entry: [
        res('./server/render.js')
      ],
      output: {
        filename: 'serverRender.js',
        libraryTarget: 'commonjs2',
      },
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        }),
      ],
    })
}

// мульти-конфиг для разработки
function getDevelopmentConfig() {
  const serve = new Serve({
    port: 3000,
    static: [DIST_DIR],
    waitForBuild: true,
    middleware, // здесь находятся мидлвари сервера
    client: {
      retry: true, // этот параметр переподключает вебсокет
    },
  });

  return {
    client: merge({
      entry: [
        'webpack-plugin-serve/client'
      ],
      devtool: 'source-map',
    }, servePlugin(serve)),
    server: merge({
      devtool: 'source-map',
    }, servePlugin(serve)),
  }
};

// мульти-конфиг для релиза
const productionConfig = {
  client: {
    devtool: false,
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      path: res('./buildClient'),
    }
  },
  server: {
    devtool: false,
    output: {
      filename: 'serverRender.js',
      path: res('./buildServer'),
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
    ]
  },
};

module.exports = merge.multiple(baseConfig, optimize ? productionConfig : getDevelopmentConfig());
