const webpack = require('webpack');

module.exports = function (mode) {
  return {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(mode),
        },
      }),
    ],
  };
};
