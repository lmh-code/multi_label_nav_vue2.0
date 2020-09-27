import Vue from 'vue'
import Router from 'vue-router'
import Storage from '@/utils/localStorage'
import config from '@/utils/config'
import * as utils from '@/utils/utils'
import Layout from '@/components/Index'
import Home from '@/components/Home'
import Login from '@/components/Login'

// 错误提示页面
import errorRouterList from './errorRouter'
// 通用报表相关路由
import commonReportRoutersList from './commonReportRouters'
// 业务层页面路由
import routersList from '@/module/routers'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

/**
 * [router 添加路由规则]
 * 1、正确添加路由，要使用meta
 * 2、为了处理面包屑，请将对应的name和path写到breadcrumbList中
 * 3、meta中配置cantCheck为true，该路由将不会被做权限检查，否则就会被做权限检查
 * 4、meta中配置hideSelectCity为true，页面顶部将不会显示城市下拉框，否则会展示城市下拉框
 * @type {Router}
 */
const router = new Router({
  mode: 'history',
  base: config.baseRouter,
  scrollBehavior,
  routes: [
    {
      path: '/login',
      name: '账号密码登录',
      meta: {
        title: '账号密码登录',
        cantCheck: true
      },
      component: Login
    },
    {
      path: '/',
      redirect: '/index',
      component: Layout,
      children: [
        {
          path: '/index',
          name: '首页',
          meta: {
            title: '首页',
            cantCheck: true,
            breadcrumbList: [
              {name: '首页', path: ''}
            ]
          },
          component: Home
        },
        // 通用报表相关路由
        ...commonReportRoutersList.commonReportRoutersList,
        // 业务层路由
        ...routersList,
        // 错误设置页面   为了美观尽量放置最下边
        ...errorRouterList.errorRouter
      ]
    },
    {
      path: '/*',
      redirect: '/error'
    }
  ]
})

/**
 * @description: 在进入路由前验证各种状态
 * @param {type} 
 * @return: 
 */
router.beforeEach((to, from, next) => {
  if(to.meta.cantCheck) {
    next()
  }else {
    if(checkRouter(to.path, to.params)) {
      next()
    }else {
      next('/noopt')
    }
  }
})

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
/**
 * @description: 检查用户要跳转的路由是否有权限
 * @param {type} 
 * @return: 
 */
const checkRouter = (toPath) => {
  let allMenusList = Storage.get("allMenus") && Storage.get("allMenus").length > 0 ? Storage.get("allMenus") : []
  let cPath = `/${toPath.split('/')[1]}`
  return utils.isKeyInArray(cPath, allMenusList) || utils.isKeyInArray(toPath, allMenusList)
}

export default router
