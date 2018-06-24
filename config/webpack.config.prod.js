const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpackConfig: {
    entry: [],
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '../build'),
    },
    mode: 'production',
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new CleanWebpackPlugin(['build'], {
        root: path.join(__dirname, '../'),
        verbose: true,
        dry: false,
      }),
    ],
  },
};
