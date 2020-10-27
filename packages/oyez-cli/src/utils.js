import fs from 'fs';
import symbol from 'log-symbols';
import chalk from 'chalk';
import inquirer from 'inquirer';
import downloadGitRepo from 'download-git-repo';

// 文件夹是否存在
const notExistFolder = async (name) => new Promise((resolve, reject) => {
  if (fs.existsSync(name)) {
    console.log(symbol.error, chalk.red('文件夹名称已被占用，请更换名称重新创建'));
    reject();
  } else {
    resolve();
  }
});

// 询问用户
const promptList = [
  {
    type: 'list',
    name: 'frame',
    message: 'Please choose a project template:',
    choices: ['vue', 'react'],
  }, {
    type: 'input',
    name: 'description',
    message: 'Please enter the project description: ',
  }, {
    type: 'input',
    name: 'author',
    message: 'Please enter the author name:',
  },
];

const prompt = () => new Promise((resolve, reject) => {
  inquirer.prompt(promptList).then((answer) => {
    resolve(answer);
  }, (err) => {
    reject(err);
  });
});

// 项目模板远程下载
const downloadTemplate = async (projectName, gitRepo) => new Promise((resolve, reject) => {
  downloadGitRepo(gitRepo, projectName, { clone: true }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

const updateJsonFile = (fileName, obj) => new Promise((resolve, reject) => {
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName).toString();
    const contentObj = JSON.parse(content);
    Object.keys(obj).forEach((key) => {
      contentObj[key] = obj[key];
    });
    fs.writeFileSync(fileName, JSON.stringify(contentObj, null, '/t'), 'utf-8');
    resolve();
  } else {
    reject();
  }
});

module.exports = {
  notExistFolder, prompt, downloadTemplate, updateJsonFile,
};
