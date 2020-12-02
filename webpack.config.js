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
const {WebpackPluginServe: Serve} = require('webpack-plugin-serve');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const CopyPlugin = require('copy-webpack-plugin');

const modes = {
  HOTRELOAD: 'hotreload',
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

const res = (p) => path.resolve(__dirname, p);
const optimize = process.env.NODE_ENV === modes.PRODUCTION;
const mode = optimize ? modes.PRODUCTION : modes.DEVELOPMENT;

// конфиг общий для всех
const common = merge(
  {
    mode,
    watch: !optimize,
    entry: ['fetch-everywhere'],
    resolve: {
      extensions: ['.js', '.css'],
    },
    devtool: 'source-map',
  },
  define(mode),
  babelLoader()
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
      entry: [res('./src/index.js')],
      output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: res('./out/buildClient'),
        publicPath: '/static/',
      },
      optimization: {
        runtimeChunk: {
          name: 'bootstrap',
        },
        splitChunks: {
          chunks: 'initial',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-redux|redux|history|transition-group|redux-first-router|redux-first-router-link|fetch-everywhere|babel-polyfill)[\\/]/,
              name: 'vendor',
            },
          },
        },
      },
      plugins: [
        new StatsPlugin('../buildServer/stats.json'),
        new CopyPlugin({
          patterns: [
            {
              from: res('static/favicon.ico'),
            },
          ],
        }),
      ],
    }
  ),
  server: merge.smart(
    common,
    externals(res('./node_modules')),
    cssLoader('css-loader/locals'),
    {
      name: 'server',
      target: 'node',
      entry: [res('./server/render.js')],
      output: {
        filename: 'serverRender.js',
        libraryTarget: 'commonjs2',
        path: res('./out/buildServer'),
      },
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      ],
    }
  ),
};

const serverDevelopment = {
  client: {
    plugins: [
      new WebpackShellPluginNext({
        onBuildEnd: {
          scripts: ['echo "onBuildEnd Client"'],
          blocking: false,
          parallel: true,
        },
      }),
    ],
  },
  server: {
    plugins: [
      new WebpackShellPluginNext({
        onBuildEnd: {
          scripts: ['echo "onBuildEnd Server"'],
          blocking: false,
          parallel: true,
        },
      }),
    ],
  },
};

// мульти-конфиг для разработки
function getDevelopmentConfig() {
  const serve = new Serve({
    port: 3000,
    static: ['out/buildClient'],
    waitForBuild: true,
    middleware, // здесь находятся мидлвари сервера
    client: {
      retry: true, // этот параметр переподключает вебсокет
    },
  });

  return {
    client: merge(
      {
        entry: ['webpack-plugin-serve/client'],
        devtool: 'source-map',
      },
      servePlugin(serve)
    ),
    server: merge(
      {
        devtool: 'source-map',
      },
      servePlugin(serve)
    ),
  };
}

// мульти-конфиг для релиза
const productionConfig = {
  client: {
    devtool: false,
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
  },
  server: {
    devtool: false,
    output: {
      filename: 'serverRender.js',
    },
    plugins: [new webpack.HashedModuleIdsPlugin()],
  },
};

/**
 * Выбор конфига в зависимости от NODE_ENV
 */
function getModeConfig() {
  let config;
  switch (process.env.NODE_ENV) {
    case modes.PRODUCTION:
      config = productionConfig;
      break;
    case modes.DEVELOPMENT:
      config = serverDevelopment;
      break;
    case modes.HOTRELOAD:
    default:
      config = getDevelopmentConfig();
      break;
  }

  return config;
}

module.exports = merge.multiple(baseConfig, getModeConfig());
