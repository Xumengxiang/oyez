const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = require('./webpack.config.dev.js');

const dev = (port) => {
  config.plugins.push(new OpenBrowserPlugin({ url: `http://localhost:${port}` }));
  new WebpackDevServer(webpack(config), {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
  }).listen(port, 'localhost', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
};

module.exports = dev;
