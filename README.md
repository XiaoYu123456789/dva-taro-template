# DVA+Taro 整合模板 （暂时还未整合好TS）
> 该项目为基于DVA+Taro的整合模板包含各种常见组件的应用

## 启动项目(安装+本地运行)

```bash
# 使用 npm
npm install
npm run dev:weapp(其他端方式运行请看package.json文件!);

该目录放置`dist`、使用微信开发者工具打开入口文件`dist/app.js`运行，。

# 使用 yarn
yarn
yarn start
```

## 项目结构目录
```bash
├─config #配置文件可以配置环境变量
│
├─src # 项目根路径
  │  app.config.ts #小程序配置文件（路由、自定义tabBar、subPackages分包配置等）
  │  app.less
  │  app.tsx # 入口程序
  │  index.html
  │   
  ├─models # 用于model的管理
  │      index.ts # 该文件的作用是用来注册当前项目中所有页面组件的mode的
  ├─custom-tab-bar # 自定义tabBar ，在app.config.ts配置了自定义tabBar的时候使用
  │
  │     
  ├─pages # 页面根路径
  │  ├─pageA # 分包A [....分包B]
  │  │
  │  │
  │  └─index # 首页入口，不可分包
  │          index.config.ts
  │          index.less
  │          index.tsx
  │          mode.ts
  │
  │          
  └─utils # 各种工具包
        dva.ts #dva导入的ts
```
## 开发规范 
 - Git Commit
    - `build`: 构建打包
    - `ci`: 持续集成相关修改
    - `chore`: 开发工具（构建，脚手架工具等）的变动
    - `docs`: 文档（documentation）
    - `feat`: 新功能（feature）
    - `fix`: 修复 bug
    - `perf`: 改善性能
    - `refactor`: 重构（即不是新增功能，也不是修改 bug 的代码变动）
    - `revert`: 回滚
    - `style`: 代码风格改动（不影响代码运行的变动）
    - `test`: 增加测试代码
 - 可以使用page.js快速生成模板页面
 ```bash
 # 快速创建模板页面(目前支持最多二级页面创建)
 npm run cratePage [文件目录] {文件名称}
 #例子：npm run cratePage pageB test //子目录创建
 #例子：npm run cratePage  test  //根目录创建

 # 创建模板页面之后，将model.ts和页面路径自行注册到models文件夹下的index.ts和app.congig当中
 #后续准备自动添加页面路径和dva的注册
 ```
## 框架搭建步骤
1. 安装Taro脚手架
```bash
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli
# OR 使用 yarn 安装 CLI
$ yarn global add @tarojs/cli
# OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @tarojs/cli
```
2. 初始化新项目
```bash
taro init template #初始化新的模块框架
```
3. 继承拓展（dva+axios等）
```bash
#在Taro里面使用 async和 await 需要安装这个扩展
npm install --save @tarojs/async-await
#Redux全家桶
npm install --save redux @tarojs/redux @tarojs/redux-h5 redux-thunk redux-logger
#dva 
npm install --save dva-core dva-loading
#在Taro里面使用axios 需要安装他
npm install --save taro-axios 
```
