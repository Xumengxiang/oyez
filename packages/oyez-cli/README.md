[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# 指南

## 安装依赖

```sh
yarn global add oyez-cli
```

## 项目创建

当前目录下执行下面命令（本地调试的时候如果需要 lbc 命令在全局生效，执行 npm link 即可）

```sh
oyez create projectname
```

### 项目初始化

切换到到上一步创建的 projectname 下，执行下面命令

```sh
oyez init -u $username -t $token
```

### 项目启动

```sh
oyez dev -p 8080
```
