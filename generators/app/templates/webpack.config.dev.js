const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './entry.js',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: [path.join(__dirname, 'build')],
    hot: true,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(bmp|gif|png|jpe?g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'example/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

};
