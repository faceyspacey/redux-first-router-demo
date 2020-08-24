const fs = require('fs');

module.exports = function (nodeModulesPath) {
  const externals = fs
    .readdirSync(nodeModulesPath)
    .filter(
      (x) =>
        !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
          x
        )
    )
    .reduce((externals, mod) => {
      externals[mod] = `commonjs ${mod}`;
      return externals;
    }, {});

  externals['react-dom/server'] = 'commonjs react-dom/server';

  return {externals};
};
