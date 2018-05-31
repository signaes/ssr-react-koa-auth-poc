const path = require('path');

module.exports = {
  entry: {
    main: './app/js/src/index.js',
  },
  output: {
    filename: 'app-[name]-[hash].js',
    path: path.resolve('./app/js/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ],
      },
    ],
  },
};
