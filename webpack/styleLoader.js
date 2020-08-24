module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: [/node_modules/],
          use: ['style-loader'],
        },
      ],
    },
  };
};
