import Storage from "@/utils/localStorage"
import config from "@/utils/config"
function getRouterViewCacheKey({name, path, fullPath, meta = {}}) {
  const {usePathKey, useFullPathKey} = meta
  return usePathKey ? path : useFullPathKey ? fullPath : name
}
const maxTags = config.maxTags
const state = {
  visitedViews: Storage.get("_visitedViews") || {}, // 顶部显示的标签
  cachedViews: [] // 缓存的页签 BlKeepAlive的:include值
}

const actions = {
  ADD_TAG_AND_CACHE({commit}, view) {
    commit('ADD_TAG_ONLY', view)
    commit('ADD_CACHE_ONLY', view)
  },
  DEL_TAG_AND_CACHE({commit}, view) {
    commit('DEL_TAG_ONLY', view)
    commit('DEL_CACHE_ONLY', view)
  },
  DEL_OTHER_TAG_AND_CACHE({commit}, view) {
    commit('DEL_OTHER_TAG_AND_CACHE', view)
  },
  DEL_ALL_TAG_AND_CACHE({commit}, view) {
    commit('DEL_ALL_TAG_AND_CACHE', view)
  }
}

const mutations = {
  /**
   * 在页签栏上添加一个页签，path已存在的不会重复添加，调用时需要保证meta.title有值
   * @param view {routeConfig}
   */
  ADD_TAG_ONLY(state, view) {
    let checkStr = view.meta.usePathKey ? 'path' : view.meta.useFullPathKey ? 'fullPath' : 'name'
    let visitedViewsTemp = state.visitedViews[config.clientId] || []
    if (visitedViewsTemp.some(v => v[checkStr] === view[checkStr]) || view.path === '/' || view.path === '/error' || view.path === '/noopt' || view.path === '/index') {
      visitedViewsTemp.forEach(i => {
        if(i[checkStr] === view[checkStr]) {
          i.path = view.path
          i.name = view.name
          i.fullPath = view.fullPath
          i.params = view.params
          i.query = view.query
          i.hash = view.hash
          i.meta = view.meta
          i.title = view.meta.title
        }
      })
      return
    }
    const tagItem = {
      path: view.path,
      name: view.name,
      fullPath: view.fullPath,
      params: view.params,
      query: view.query,
      hash: view.hash,
      meta: view.meta,
      title: view.meta.title
    }
    visitedViewsTemp.push({...tagItem})
    state.visitedViews[config.clientId] = visitedViewsTemp
    Storage.set("_visitedViews", state.visitedViews)
  },
  /**
   * 将传入的routeConfig加入<keep-router-view-alive>的缓存中
   * 以下调用无效：设置了不缓存、是iframe页、未设置唯一标识、已缓存
   * @param view {routeConfig}
   */
  ADD_CACHE_ONLY(state, view) {
    const {noCache, iframe, usePathKey, useFullPathKey} = view.meta || {}
    if (noCache || iframe || (!view.name && !usePathKey && !useFullPathKey)) {
      return
    }

    const key = getRouterViewCacheKey(view)
    if (state.cachedViews.includes(key)) {
      const index = state.cachedViews.indexOf(key)
      index > -1 && state.cachedViews.splice(index, 1)
    }
    state.cachedViews.push(key) // 将最近操作的页面的key放到缓存最后
    if(state.cachedViews.length > maxTags) {
      state.cachedViews = state.cachedViews.slice(-maxTags) // 超过缓存限制，删除最近不常操作的缓存
    }
  },
  /**
   * 根据path从页签栏中移除一个页签
   * @param view {path}，routeConfig
   */
  DEL_TAG_ONLY(state, view) {
    let visitedViewsTemp = state.visitedViews[config.clientId] || []
    const index = visitedViewsTemp.findIndex(i => i.fullPath === view.fullPath)
    index > -1 && visitedViewsTemp.splice(index, 1)
    state.visitedViews[config.clientId] = visitedViewsTemp
    Storage.set("_visitedViews", state.visitedViews)
  },
  /**
   * 删除<keep-router-view-alive>对应的缓存
   * @param view {routeConfig}
   */
  DEL_CACHE_ONLY(state, view) {
    const key = getRouterViewCacheKey(view)
    const index = state.cachedViews.indexOf(key)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  /**
   * @description: 删除其他标签和缓存
   * @param {*} state
   * @param {*} view
   * @return {*}
   */
  DEL_OTHER_TAG_AND_CACHE(state, view) {
    let visitedViewsTemp = state.visitedViews[config.clientId] || []
    const visitedViews = visitedViewsTemp.filter(v => v.path === view.path)
    const key = state.cachedViews.find(key => key === getRouterViewCacheKey(view))
    state.visitedViews[config.clientId] = visitedViews
    state.cachedViews = key ? [key] : []
    Storage.set("_visitedViews", state.visitedViews)
  },
  /**
   * @description: 删除所有的标签和缓存
   * @param {*} state
   * @param {*} view
   * @return {*}
   */
  DEL_ALL_TAG_AND_CACHE(state, view) {
    state.visitedViews[config.clientId] = []
    state.cachedViews = []
    Storage.set("_visitedViews", state.visitedViews)
  },
  SET_VISITED_VIEWS(state, visitedViews) {
    state.visitedViews[config.clientId] = visitedViews
    Storage.set("_visitedViews", state.visitedViews)
  }
}

const getters = {
  GET_VISIT_VIEWS(state, getters) {
    return state.visitedViews
  },
  GET_CACHED_VIEWS(state, getters) {
    return state.cachedViews
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
