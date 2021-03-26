import router from '@/router'
export default {
  methods: {
    /**
     * @description: 关闭当前页面（一版取消|关闭|返回按钮时调用）, 并返回指定页面
     * @param {*} route 关闭页面后要跳转的页面的全路径
     * @调用结果 {*} 【关闭当前页，有参数会跳转至指定的页面】
     */
    closePage(fullPath) {
      this.$jump.closeCurrentPage(fullPath)
    },
    /**
     * @description: 新增保存成功之后回列表页，需要刷新整个列表页
     * @param {*} path 需要刷新的页面的路径
     * @调用结果 {*}【关闭当前页 ==》跳转至列表页并刷新列表页缓存】
     */
    saveSuccessHandel(path) {
      // 1. 保存成功关闭当前页面
      this.$jump.closeCurrentPage()
      // 2. 刷新指定页面
      this.$jump.refreshCachePage(this.getRoute(path))
    },
    /**
     * @description: 编辑成功之后调
     * @param {*} path 需要重新获取列表数据的页面的全路径作为key来记录
     * @调用结果 {*}【设置列表页重新获取列表数据】
     */
    editSuccessHandel(path) {
      this.$jump.research(path) // 设置重新获取列表数据的状态
    },
    /**
     * @description: 删除成功之后调用
     * @param {*} path 需要重新获取列表数据的页面的全路径
     * @调用结果 {*}【关闭当前页 ==》设置列表页重新获取列表数据 ==》 跳转至列表页】
     */
    deleteSuccessHandel(path) {
      // 1. 删除成功关闭当前页面
      this.$jump.closeCurrentPage()
      // 2. 设置重新获取列表数据的状态
      this.$jump.research(path)
      // 3. 刷新指定页面（只刷新列表数据即可）
      this.$jump.refreshPage(this.getRoute(path))
    },
    /**
     * @description: 从全部路由中根据指定path获取路由信息
     * @param {*} path
     * @return {*} 路由
     */
    getRoute(path) {
      let routerMatch = router.options && router.options.routes && router.options.routes.length > 0 && router.options.routes.filter(item => {
        return item.path === '/'
      })[0]
      let childRoutes = routerMatch && routerMatch.children && routerMatch.children.length ? routerMatch.children : []
      let jumpRoute = childRoutes.filter(item => {
        item.fullPath = item.fullPath ? item.fullPath : item.path
        return item.path === path
      })[0]
      return jumpRoute || path
    }
  }
}
