const IS_DEV = require('./is_dev');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  test: /\.s[ac]ss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: !IS_DEV,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [ autoprefixer ],
        },
      },
      'sass-loader',
    ],
  }),
};
