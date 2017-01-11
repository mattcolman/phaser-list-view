/* eslint import/no-extraneous-dependencies: 0, no-console: 0 */

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = process.env.PORT || 3001;

const compiler = webpack(Object.assign({}, config, {
  devtool: 'cheap-source-map',
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/dev-server',
    'babel-polyfill',
    path.resolve(__dirname, 'src/example/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'example_app.js',
    publicPath: './dist/'
  },
  plugins: [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}));

const devServer = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: './',
  publicPath: config.output.publicPath,
  quiet: false,
  stats: { colors: true },
  historyApiFallback: true,
  watchOptions: {
    ignored: /node_modules/,
  },
});

devServer.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('//***************************//');
  console.log('Server ready on port %d', port);
  console.log('//***************************//');
});
