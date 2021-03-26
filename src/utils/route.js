/**
 * 路由控制工具类
 */
import {isCheckType} from "./validate"
import {isEmpty} from './utils'
import router from '../router'
import store from '../store'
/**
 * 路由刷新
 * @param route {string|route} 需要刷新的路由，不传时为当前路由，如果是字符串时请确保以'/'开头
 * @param replace {boolean}    是否使用replace进行跳转
 * @return {Promise}          返回vue-router跳转的结果
 */
export function refreshPage(route = router.currentRoute, replace = true) {
  const target = `/redirect${isCheckType(route, 'String') ? route : route.fullPath}`
  return router[replace ? 'replace' : 'push'](target)
}

/**
 * 已经被缓存的路由刷新
 * @param route {string|route} 需要刷新的路由，不传时为当前路由，如果是字符串时请确保以'/'开头
 * @param replace {boolean}    是否使用replace进行跳转
 * @return {Promise}          返回vue-router跳转的结果
 */
export function refreshCachePage(route = router.currentRoute, replace = true) {
  const target = `/redirect${isCheckType(route, 'String') ? route : route.fullPath}`
  store.commit('tagsView/DEL_CACHE_ONLY', route)
  return router[replace ? 'replace' : 'push'](target)
}


/**
 * 关闭当前页，如果传入next则跳转到next页面
 * @param next 跳转的目标页面，作为第一个参数传入vue-router.replace
 * @return 仅在next有值时，返回vue-router.replace的结果
 */
export function closeCurrentPage(next) {
  store.dispatch('tagsView/DEL_TAG_AND_CACHE', router.currentRoute)
  if (!isEmpty(next)) {
    return router.replace(next)
  }
}

/**
 * @description: 设置列表页重新获取列表数据表示（一般详情编辑成功调用）
 * @param {*} key 页面路由, 此值不可为空
 * @return {*}
 */
function research(key) {
  store.commit('research/SET_RESEARCH_STATE', key)
}
/**
 * @description: 清除列表页重新获取列表数据表示（一般列表页面research成功后调用）
 * @param {*} key 页面路由, 此值不可为空
 * @return {*}
 */
function researched(key) {
  store.commit('research/SET_UNRESEARCH_STATE', key)
}


export default {
  refreshPage,
  refreshCachePage,
  closeCurrentPage,
  research,
  researched
}
