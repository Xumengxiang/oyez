const child = require('child_process');
const symbol = require('log-symbols');
const chalk = require('chalk');
const ora = require('ora');
const util = require('util');
const { updateJsonFile } = require('../util');

const exec = util.promisify(child.exec);

const loadCommand = async (cmd, text) => {
  const loading = ora(`${text}: 命令执行中...`).start();
  await exec(cmd);
  loading.succeed(`${text}: 命令执行完成`);
};

const init = async (username, token) => {
  try {
    await loadCommand('git init', 'git 初始化');
    if (username === '' || token === '') {
      console.log(symbol.warning, chalk.yellow('缺少入参，无法创建远端仓库'));
    } else {
      const projectName = process.cwd().split('/').slice(-1)[0];
      await loadCommand(`curl -u "${username}:${token}" https://api.github.com/user/repos -d '"name":"${projectName}"'`, 'Github仓库创建');
      await loadCommand(`git remote add origin https://github.com/${username}/${projectName}.git`, '关联远端仓库');

      const loading = ora('package.json更新repository: 命令执行中...').start();
      await updateJsonFile('package.json', {
        repository: {
          type: 'git',
          url: `https://github.com/${username}/${projectName}.git`,
        },
      });
      loading.succeed('package.json更新repository: 命令执行完成');
      await loadCommand('git add .', '执行 git add');
      await loadCommand('git commit -a -m \'init\'', '执行 git commit');
      await loadCommand('git push --set-upstream origin master', '执行 git push');
    }
    await loadCommand('npm install', '安装依赖');
  } catch (err) {
    console.log(symbol.error, chalk.red('初始化失败'));
    console.log(symbol.error, chalk.red(err));
    process.exit(1);
  }
};

module.exports = init;
