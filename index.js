#!/usr/bin/env node

const program = require('commander');
const packageJson = require('./package.json');

program.version(packageJson.version);

program
  .command('create <name>')
  .description('请输入项目名称')
  .action(name=>{
    console.log(`你要创建的项目名称：${name}`);
  });

program.parse(process.argv);