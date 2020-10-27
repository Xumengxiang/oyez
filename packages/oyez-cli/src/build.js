const webpack = require('webpack');
const symbol = require('log-symbols');
const chalk = require('chalk');
const config = require('./webpack.config.build');

const build = () => {
  webpack(config, (err) => {
    if (err !== null) {
      console.log(symbol.error, chalk.red(err));
    } else {
      console.log(symbol.success, chalk.green('打包完成'));
    }
    process.exit(1);
  });
};

module.exports = build;
