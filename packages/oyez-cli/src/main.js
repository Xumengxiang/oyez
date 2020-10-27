const program = require('commander');

const create = require('./create');
const init = require('./init');
const dev = require('./dev');
const build = require('./build');

/**
 * oyez-cli 命令列表
 */
const actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目', // 描述
    usages: [ // 使用方法
      'oyez-cli create ProjectName',
      'oyez create ProjectName',
    ],
    alias: 'c', // 简称
  },
  // 项目初始化
  init: {
    description: '初始化项目',
    usages: [
      'oyez-cli init',
      'oyez init',
    ],
    alias: 'i',
  },
  // 启动项目
  dev: {
    description: '本地启动项目',
    usages: [
      'oyez-cli dev',
      'oyez dev',
    ],
    options: [
      {
        flags: '-p --port <port>',
        description: '端口',
        defaultValue: 3000,
      },
    ],
    alias: 'd',
  },
  // 打包
  build: {
    description: '项目打包',
    usages: [
      'oyez-cli build',
      'oyez build',
    ],
    options: [
      {
        flags: '-u --username <username>',
        description: 'Github用户名',
        defaultValue: '',
      },
      {
        flags: '-t --token <token>',
        description: 'Github创建的token',
        defaultValue: '',
      },
    ],
    alias: 'b',
  },
};

// 声明 create、init、dev、build 命令
Object.keys(actionMap).forEach((actionName) => {
  const action = actionMap[actionName];

  if (action.options) {
    Object.keys(action.options).forEach((optionKey) => {
      const option = action.options[optionKey];
      program.option(option.flags, option.description, option.defaultValue);
    });
  }

  program
    .command(actionName)
    .description(action.description)
    .alias(action.alias)
    .action(() => {
      switch (actionName) {
        case 'create':
          create(...process.argv.slice(3));
          break;
        case 'init':
          init(program.username, program.token);
          break;
        case 'dev':
          dev(program.port);
          break;
        case 'build':
          build();
          break;

        default:
          break;
      }
    });
});

// oyez-cli 版本

program
  .version(require('../package.json').version, '-v --version')
  .parse(process.argv);

// oyez-cli 命令后没有携带参数时，输出帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
