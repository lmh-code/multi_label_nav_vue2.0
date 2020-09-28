const errorRouter = [
  {
    path: '/error',
    name: '未找到页面',
    meta: {
      title: '未找到页面',
      scrollToTop: true,
      cantCheck: true,
      breadcrumbList: [
        {name: '首页', path: '/'},
        {name: '未找到页面', path: '/error'}
      ]
    },
    component: () => import('@/components/ErrorPage')
  },
  {
    path: '/noopt',
    name: '暂无访问权限',
    meta: {
      title: '暂无访问权限',
      scrollToTop: true,
      cantCheck: true,
      breadcrumbList: [
        {name: '首页', path: '/'},
        {name: '暂无访问权限', path: ''}
      ]
    },
    component: () => import('@/components/NoOpt')
  }
]

export default {
  errorRouter
}

