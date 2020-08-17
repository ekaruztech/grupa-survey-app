const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv');

const UNIQ_HASH = (Date.now() * (Math.random() + 1)).toFixed(0).toString(36);

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = function() {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: 'voomsway.css',
    }),
    new CleanWebpackPlugin({
      verbose: true,
      dry: false, // true for simulation
    }),
    new MomentLocalesPlugin(),
    new HtmlWebpackPlugin({
      title: 'VoOmsway Booking',
      // hash: true,
      // uniqHash: UNIQ_HASH,
      template: __dirname + '/public/template.html',
      filename: __dirname + '/public/index.html',
      inject: false,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ];

  const envFilePath = './.env';
  const hasEnvFile = isDevelopment || (isProduction && fs.existsSync(envFilePath));

  if (hasEnvFile) {

    const result = dotenv.config();

    if (result.error) {
      throw result.error
    }

    plugins.unshift(new Dotenv());
  } else {
    const envs = {};
    for (let prop in process.env) {
      if (process.env.hasOwnProperty(prop)) {
        if (prop.startsWith('REACT_APP') || prop === 'NODE_ENV') {
          envs[`process.env.${prop}`] = JSON.stringify(process.env[prop]);
        }
      }
    }
    plugins.unshift(new webpack.DefinePlugin(envs));
  }
  return {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'voomsway.js',
      publicPath: '/dist/',
    },
    devtool: 'cheap-module-source-map',
    resolve: {
      extensions: ['*', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
                reloadAll: true,
              },
            },
            {
              // CSS to CommonJS (resolves CSS imports into exported CSS strings)
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
                // url: false,
                // import: false
              },
            },
            {
              loader: 'sass-loader',
              options: {
                data: '@import "variables.scss";',
                includePaths: [path.resolve(__dirname, 'src/stylesheets')],
              },
            },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                disable: true, // webpack@2.x and newer
              },
            },
          ],
        },
      ],
    },
    plugins: plugins,
  };
};
