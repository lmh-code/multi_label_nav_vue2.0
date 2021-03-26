# 供应商系统
供应商系统为本来鲜-供应商系统，方便本来鲜的供应商处理订单使用。
# 目录结构
```
├─ api                                     // 接口地址文件
├─ component                               // 业务模块公用组件
├─ mixin                                   // vue混入函数文件
├─ routers                                 // 路由文件
│  ├─ index.js                             // 路由文件入口【必需文件，不可删除】
├─ server                                  // ajax请求，在view视图文件中引用
├─ store
│  ├─ modules                              // vuex模块
│  └─ index.js                             // vuex配置（引用modules模块中的配置）【必须文件，不可删除】
├─ views                                   // 页面视图文件容器
├─ module.config.js                        // 业务模块配置文件共主框架引入使用【必需文件，不可删除】
└─ README.md                               // README 
