module.exports = (env = {}) => {

  const fs = require('fs');
  const path = require('path');
  const webpack = require('webpack');

  const ENVIRONMENT = process.env.NODE_ENV;
  let environmentConfig;
  let isDevelopment;
  let settings = {};

  try {
    settings = JSON.parse(fs.readFileSync('./config.app.json', 'utf8'))[ENVIRONMENT];
  } catch (error) {
    console.log(error);
    process.exit();
  }

  const babelConfig = {
    test: /(\.js|.jsx)$/,
    exclude: /(node_modules|webpack_cache|config)/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: [
            require('@babel/plugin-proposal-object-rest-spread'),
            require('@babel/plugin-syntax-class-properties'),
          ],
          presets: ['@babel/preset-env', '@babel/react'],
          env: {
            production: {
              plugins: ['transform-remove-console', 'react-optimize'],
            },
          },
        },
      },
    ],
  };

  const plugins = [new webpack.DefinePlugin({ APP_SETTINGS: JSON.stringify(settings) })];

  const entry = ['@babel/polyfill', 'whatwg-fetch', './src/index.jsx'];

  if (ENVIRONMENT === 'development') {
    isDevelopment = true;
    environmentConfig = require('./config/webpack.config.dev.js');
    environmentConfig.configureBabel(babelConfig);
  } else {
    isDevelopment = false;
    environmentConfig = require('./config/webpack.config.prod.js');
  }

  const config = Object.assign(
    {},
    {
      context: __dirname,
      resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      },
      module: {
        rules: [
          babelConfig,
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.less$/,
            use: [
              {
                loader: 'style-loader', // creates style nodes from JS strings
              },
              {
                loader: 'css-loader', // translates CSS into CommonJS
                options: {
                  sourceMap: isDevelopment,
                  importLoaders: true,
                  modules: false,
                  minimize: !isDevelopment,
                },
              },
              {
                loader: 'less-loader', // compiles Less to CSS
              },
            ],
          },
        ],
      },
    },
    environmentConfig.webpackConfig,
  );

  if (!env.disableLint) {

    plugins.unshift(
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            configFile: path.join(__dirname, './.eslintrc'),
          },
        },
      }),
    );

    config.module.rules.push({
      exclude: /(node_modules|webpack_cache|config)/,
      include: /(src)/,
      loader: 'eslint-loader',
      test: /(\.js|.jsx)$/,
    });
  }

  config.plugins = plugins.concat(config.plugins);
  config.entry = config.entry.concat(entry);

  return config;
};
