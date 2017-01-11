/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'phaser-list-view.js',
    publicPath: './dist/',
  },
  resolve: {
    extensions: ['', '.js'],
    root: __dirname,
    alias: {
      src: path.join(__dirname, 'src'),
    },
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        APP_ENV: JSON.stringify(process.env.APP_ENV),
      },
    }),
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ].concat(isProd ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ] : [])
};
