module.exports = function (name) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: name || 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          ],
        },
      ],
    },
  };
};
