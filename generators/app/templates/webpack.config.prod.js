const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },

  externals: {
    react: 'React',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize',
            'postcss-loader',
            'less-loader',
          ],
        }),
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
    new ExtractTextPlugin('index.css'),
  ],

};
