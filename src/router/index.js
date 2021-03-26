import Vue from 'vue'
import Router from 'vue-router'
import Storage from '@/utils/localStorage'
import config from '@/utils/config'
import * as utils from '@/utils/utils'
import Layout from '@/components/Layout'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Phone from '@/components/Login/Phone'
import ForgetPass from '@/components/Login/ForgetPass'
import DDLogin from '@/components/Login/DDLogin'
import SCMRegister from '@/components/Login/SCMRegister'
import PerfectSCMInfo from '@/components/Login/PerfectSCMInfo'
import Redirect from '@/components/Redirect'
// 错误提示页面
import errorRouterList from './errorRouter'
// 通用报表相关路由
import commonReportRoutersList from './commonReportRouters'
// 业务层页面路由
import routersList from '@/module/routers'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
  base: `${config.baseRouter}/`,
  scrollBehavior,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '账号密码登录',
        cantCheck: true
      },
      component: Login
    },
    {
      path: '/phone',
      name: 'phone',
      meta: {
        title: '手机验证登录',
        cantCheck: true
      },
      component: Phone
    },
    {
      path: '/forget',
      name: 'forget',
      meta: {
        title: '忘记密码',
        cantCheck: true
      },
      component: ForgetPass
    },
    {
      path: '/ddLogin',
      name: 'ddLogin',
      meta: {
        title: '钉钉扫码登录',
        cantCheck: true
      },
      component: DDLogin
    },
    {
      path: '/logining',
      name: 'logining',
      meta: {
        title: '钉钉扫码登录',
        cantCheck: true
      },
      component: DDLogin
    },
    {
      path: '/scm_reg',
      name: 'SCMRegister',
      meta: {
        title: '供应商入驻',
        cantCheck: true
      },
      component: SCMRegister
    },
    {
      path: '/perfect',
      name: 'PerfectSCMInfo',
      meta: {
        title: '供应商入驻-补充信息',
        cantCheck: true
      },
      component: PerfectSCMInfo
    },
    ...config.clientId === 4 ? routersList.alarmList : [],
    {
      path: '/',
      redirect: '/index',
      component: Layout,
      children: [
        {
          path: '/index',
          meta: {
            title: '首页',
            cantCheck: true,
            breadcrumbList: [
              {name: '首页', path: ''}
            ]
          },
          component: Home
        },
        {
          path: '/example',
          name: 'example',
          meta: {
            title: '组件文档示例',
            cantCheck: true,
            breadcrumbList: [
              {name: '首页', path: ''},
              {name: '组件文档示例', path: ''}
            ]
          },
          component: () => import('@/components/Example')
        },
        // 通用报表相关路由
        ...commonReportRoutersList.commonReportRoutersList,
        // 业务层路由
        ...config.clientId === 4 ? routersList.routersList : routersList,
        // 错误设置页面   为了美观尽量放置最下边
        ...errorRouterList.errorRouter
      ]
    },
    {
      path: '/redirect',
      component: Layout,
      children: [
        {
          path: '*',
          component: Redirect,
          meta: {
            cantCheck: true
          }
        }
      ]
    },
    {
      path: '/*',
      redirect: '/error'
    }
  ]
})

function isEmpty(...str) {
  return str.some(i => i === undefined || i === null || i === '')
}
/**
 * @description: 在进入路由前验证各种状态
 * @param {type} 
 * @return: 
 */
router.beforeEach((to, from, next) => {
  if (!to.fullPath.startsWith('/redirect')) {
    if (typeof to.meta.dynamicTitle === 'function') {
      to.meta.title = to.meta.dynamicTitle(to, from)
    }
  }
  if(to.meta.cantCheck) {
    const toCommonModule = to.meta.commonModule 
    const fromCommonModule = from.meta.commonModule
    const isComponentReuse = !isEmpty(toCommonModule) && toCommonModule === fromCommonModule
    if (isComponentReuse) {
      next(`/redirect${to.fullPath}`)
    }else {
      next()
    }
  }else {
    if(checkRouter(to.path, to.params)) {
      const toCommonModule = to.meta.commonModule 
      const fromCommonModule = from.meta.commonModule
      const isComponentReuse = !isEmpty(toCommonModule) && toCommonModule === fromCommonModule
      if (isComponentReuse) {
        next(`/redirect${to.fullPath}`)
      }else {
        next()
      }
    }else {
      next('/noopt')
    }
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title ? to.meta.title : '本来鲜'
  to.meta.lastFullPath = to.fullPath
})
/**
 * @description: 检查用户要跳转的路由是否有权限
 * @param {type} 
 * @return: 
 */
const checkRouter = (toPath) => {
  let allMenusList = Storage.get("_menus") && Storage.get("_menus")[config.clientId] && Storage.get("_menus")[config.clientId].length > 0 ? Storage.get("_menus")[config.clientId] : []
  let cPath = `/${toPath.split('/')[1]}`
  return utils.isKeyInArray(cPath, allMenusList) || utils.isKeyInArray(toPath, allMenusList) || utils.isKeyInArray(cPath.substr(1), allMenusList) || utils.isKeyInArray(toPath.substr(1), allMenusList)
}

window.addEventListener('unhandledrejection', event => {
  if (event.reason.stack.startsWith('Error: Redirected when going from')) {
    event.preventDefault()
  }
})

export default router
