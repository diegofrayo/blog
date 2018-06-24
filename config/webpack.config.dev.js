const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpackConfig: {
    devtool: 'source-map',
    entry: ['react-hot-loader/patch', 'webpack-hot-middleware/client?overlay=false'],
    mode: 'development',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../build/js'),
      publicPath: '/js/',
    },
    plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  },
  configureBabel: babelConfig => {
    babelConfig.use[0].options.plugins.unshift('react-hot-loader/babel');
  },
};
