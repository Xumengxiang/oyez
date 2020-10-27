import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';

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