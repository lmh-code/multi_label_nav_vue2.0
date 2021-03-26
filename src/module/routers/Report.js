const Report = [
  {
    path: '/sale_search',
    name: 'saleSearch',
    meta: {
      title: '购销订货查询',
      scrollToTop: true,
      keepAlive: true,
      uniqueId: '/sale_search',
      breadcrumbList: [
        {name: '报表', path: ''},
        {name: '购销订货查询', path: ''}
      ]
    },
    component: () => import('@/module/views/Report/SaleSearch')
  },
  {
    path: '/sale_search/detail/:goodsNo',
    name: 'saleSearchDetailGoodsNo',
    meta: {
      title: '按门店查看商品详情',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '报表', path: ''},
        {name: '购销订货查询', path: '/sale_search'},
        {name: '按门店查看商品详情', path: ''}
      ]
    },
    component: () => import('@/module/views/Report/SaleSearch/Detail')
  },
  {
    path: '/sale_sum',
    name: 'saleSum',
    meta: {
      title: '代营售卖查询',
      scrollToTop: true,
      keepAlive: true,
      uniqueId: '/sale_sum',
      breadcrumbList: [
        {name: '报表', path: ''},
        {name: '代营售卖查询', path: ''}
      ]
    },
    component: () => import('@/module/views/Report/SaleSum')
  }
]

export default Report;
