# 前端基本架构
确保构建一个稳定的、统一的、使用简洁方便，用户体验极佳的PC端业务操作系统。注意：仅适合用此框架开发本来鲜PC端业务。

## 一、系统描述
该框架目前基本情况简介。
### 1.1、内置功能
1. boom自动化页面预览和展示功能。
2. 账号密码登录、钉钉扫码登录、手机号验证登录、忘记密码等功。【***可通过业务代码文件夹module下的module.config.js进项配置使用哪些登录形式***】
3. 获取菜单。 ***可通过业务代码文件夹module下的module.config.js进项配置获取指定系统菜单***】
4. 获取每一个菜单中系统有权限的操作，在页面中可通过 this.$store.state.common.userPermissionMap获取数据，然后再做相应的操作。
5. 路由跳转。
6. 系统tab标签栏，可打开、关闭、刷新页面。
### 1.2、现有项目
> 供应商系统
> 账号：liu 密码：123456Qq

## 二、目录结构
```
├─ build                                   // webpack配置文件
├─ config                                  // 项目设置
├─ dist                                    // run build之后生成的文件
├─ src
│  ├─ assets                               // 静态文件
│  │  ├─ style                             // 公共css
│  │  │  ├─ base.less                      // 公共的less变量
│  │  │  ├─ common.less                    // 系统默认样式
│  │  │  ├─ login.less                     // 登录页面样式
│  │  │  └─ tip.less                       // 提示性页面样式
│  │  └─ image                             // 图片文件
│  ├─ components                           
│  │  ├─ Common                            // 公共组件
│  │  │  ├─ CommonReport                   // boom自动化报表展示组件
│  │  │  ├─ Excel                          // excel处理相关的一些公用组件
│  │  │  ├─ File                           // 文件处理相关的一些公用组件
│  │  │  ├─ Table                          // 页面表格相关组件，在页面模板中可直接使用<bl-table/>、<bl-pagination/>
│  │  │  ├─ Tools                          // 页面通用工具组件（条形码生成器等）
│  │  │  └─ ChangePass.vue                 // 修改密码弹窗
│  │  ├─ Layout                            // 布局
│  │  │  ├─ components                     // 布局组件
│  │  │  │  ├─ BlPageView                  // 页面容器
│  │  │  │  ├─ Breadcrumb                  // 面包屑（预留）
│  │  │  │  ├─ Header                      // 顶部导航条
│  │  │  │  ├─ MenuTags                    // 标签栏导航
│  │  │  │  └─ Slidebar                    // 左侧菜单
│  │  │  └─ index.vue                      // 布局主入口
│  │  ├─ ErrorPage                         // 404
│  │  ├─ Home                              // 主页
│  │  ├─ Login                             // 登录相关
│  │  ├─ NoOpt                             // 401 暂无访问权限
│  │  └─ Redirect                          // 页面重定向组件
│  ├─ module                               // 业务代码块【必须文件】
│  │  ├─ routers                           
│  │  │  └─ index.js                       // 业务块路由配置文件，主框架中有引用【必须文件】
│  │  ├─ store                             
│  │  │  └─ index.js                       // 业务块vuex配置文件，主框架中有引用【必须文件】
│  │  ├─ module.config.js                  // 业务代码块配置文件，用于修改主框架指定的一些行为【必需文件】[配置文件中配置homeRouter可自定义首页]
│  │  └─ README.md                         // 业务代码块README
│  ├─ router
│  │  └─ index.js                          // 路由配置
│  ├─ server                               // 一些通用请求，返回Promise
│  ├─ store
│  │  ├─ modules                           // vuex模块
│  │  │  ├─ common                         // 通用模块
│  │  │  ├─ research                       // 设置页面keepAlive状态是否需要重新获取数据
│  │  │  └─ tagsView                       // 标签栏导航和缓存页面
│  │  └─ index.js                          // vuex配置
│  ├─ utils
│  │  ├─ blTip.js                          // 包装时候的系统提示，已写入vue属性，在js中可使用 this.$tip.message()、this.$tip.notify()调用
│  │  ├─ config.js                         // 主框架配置文件。（一些请求的根路径、系统名称、系统logo、系统id等）
│  │  ├─ constant.js                       // 系统常用的一些常量配置
│  │  ├─ exportExcel.js                    // 导入、导出excel方法
│  │  ├─ exportZip.js                      // 压缩文件
│  │  ├─ loading.js                        // 全局loading展示和隐藏，已写入vue属性，在js中可使用 this.$loading.show()、this.$loading.hide()
│  │  ├─ localStorage.js                   // localStorage，已写入vue属性，在js中可使用 this.$storage.xxx()
│  │  ├─ request.js                        // axios二次封装，已写入vue属性，在js中可使用 this.$http.post()、this.$http.get()
│  │  ├─ route.js                          // 页面tab栏标签操作
│  │  ├─ utils.js                          // 系统一些通用方法
│  │  └─ validate.js                       // 系统一些通用验证，已写入vue属性，在js中可使用 this.$validate.xxx()
│  ├─ App.vue                              // 页面入口文件
│  └─ main.js                              // 程序入口文件
├─ static                                  // 静态文件
├─ .babelrc                                // ES6语法编译配置
├─ .editorconfig                           // 代码编写规格配置
├─ .eslintrc.js                            // 代码格式验证
├─ .gitignore                              // git 忽略项
├─ .postcssrc.js
├─ index.html                              // html模板
├─ package-lock.json                        
├─ package.json                            // 配置依赖
├─ README.md                               // README
└─ web.base.config.js                      // 主框架配置文件, 通过引入业务模块module中的配置来修改webpack中的配置
```

## 三、安装部署项目
### 3.1、搭建步骤
项目搭建步骤如下，请一定按照搭建步骤和说明执行。
1. 第一步: 下载基础包
``` bash
  git clone git@codeup.aliyun.com:benlaixian/boomframe.git '项目文件夹名'
```
2. 第二步: 克隆业务代码（在项目中的 src 文件夹下， ***如果src文件夹下存在module文件夹，请先删除module文件夹***）
``` bash
  git clone git@codeup.aliyun.com:benlaixian/retail/xxxxxx.git module
```
3. 第三步: 初始化业务代码（***如果业务代码仓库中已经存在内容，可忽略此步骤***），在其他地方下载业务代码基础包，将业务基础包（myproject）中的代码全部拷贝到 src/module 文件夹下，然后开始写bug吧。
``` bash
  git clone git@codeup.aliyun.com:benlaixian/retail/myproject.git
```
### 3.2、项目部署
项目运行步骤如下。
``` bash
# 安装所需依赖
npm install
# 运行系统
npm run dev
# 打包
npm run build
```
