const symbol = require('log-symbols');
const chalk = require('chalk');
const ora = require('ora');

const {
  notExistFolder, prompt, downloadTemplate, updateJsonFile,
} = require('../util');

const create = async (projectName) => {
  // 项目名不能为空
  if (!projectName) {
    console.log(symbol.error, chalk.red('创建项目时请输入项目名称'));
  } else {
    // 如果文件名不存在则继续执行，否则退出
    notExistFolder(projectName).then(() => {
      // 用户询问交互
      prompt().then((answer) => {
        // TODO: React 项目模板
        if (answer.frame === 'react') {
          console.log(symbol.warning, chalk.yellow('React模板还在路上，请持续关注~'));
          process.exit(1);
        }

        // 根据用户输入的配置信息下载模板&更新模板配置
        // 下载模板比较耗时，这里通过ora插入下载loading

        const loading = ora('模板下载中...').start();

        let templateRepo = '';
        switch (answer.frame) {
          case 'ts':
            templateRepo = 'direct:https://github.com/Xumengxiang/react-ts-template.git';
            break;
          case 'react':
            templateRepo = 'direct:https://github.com/xumengxiang/react-temlate.git';
            break;

          default:
            break;
        }

        downloadTemplate(projectName, templateRepo).then(() => {
          loading.succeed('模板下载成功');

          // 下载完成后，根据用户输入更新配置文件
          const packageFile = `${projectName}/package.json`;
          // eslint-disable-next-line no-param-reassign
          answer.name = projectName;
          updateJsonFile(packageFile, answer).then(() => {
            console.log(symbol.success, chalk.green('配置文件更新完成'));
          });
        }, () => {
          loading.fail('模板下载失败');
        });
      });
    });
  }
};

module.exports = create;
