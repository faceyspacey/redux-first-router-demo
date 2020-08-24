const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (optimize) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // влключае hot в режиме development
                // при обновлении возникает ошибка:
                // TypeError: Cannot read property 'removeChild' of null at HTMLLinkElement.eval
                // но она вроде не мешает процессу
                hmr: !optimize,
                // если hmr не работает, это принудительный метод.
                // пока этот параметр не понадобился
                // reloadAll: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin()],
  };
};
