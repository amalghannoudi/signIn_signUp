module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|mp4|webm)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/',
              },
            },
          ],
        },
      ],
    },
  };
  