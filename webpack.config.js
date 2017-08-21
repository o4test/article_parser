const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// rules
const sass = require('./webpack-rules/sass');
const ts = require('./webpack-rules/typescript');

const CSS_FILE_NAME = `app.css`;

const TSX_INPUT_FILE_NAME = `index.tsx`;
const PUBLIC_DIR = path.resolve(__dirname, './public');

module.exports = {
  entry: `./client/ts/${TSX_INPUT_FILE_NAME}`,
  output: {
    path: `${PUBLIC_DIR}/js/`,
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.sass', '.scss'],
  },
  module: {
    rules: [
      sass,
      ts,
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: `../css/${CSS_FILE_NAME}`, allChunks: true }),
  ],
};
