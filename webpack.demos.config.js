/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/example/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'example_app.js',
  },
  watch: true,
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
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3001,
      server: {
        baseDir: ['./', './build']
      }
    })
  ]
}
