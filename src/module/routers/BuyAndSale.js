const BuyAndSale = [
  {
    path: '/order_mgt',
    name: 'orderMgt',
    meta: {
      title: '购销订单',
      scrollToTop: true,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '购销订单', path: ''}
      ]
    },
    component: () => import('@/module/views/BuyAndSale/Order')
  },
  {
    path: '/order_mgt/detail/:type/:id/:storeNo',
    name: 'orderMgtDetailTypeId',
    meta: {
      title: '购销订单详情',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '购销订单', path: '/order_mgt'},
        {name: '购销订单详情', path: ''}
      ]
    },
    component: () => import('@/module/views/BuyAndSale/Order/Detail')
  },
  {
    path: '/order_mgt/reject/:type/:id/:storeNo',
    name: 'orderMgtRejectTypeId',
    meta: {
      title: '购销订单拒绝接单',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '购销订单', path: '/order_mgt'},
        {name: '购销订单拒绝接单', path: ''}
      ]
    },
    component: () => import('@/module/views/BuyAndSale/Order/Reject')
  },
  {
    path: '/order_mgt/print/:id/:storeNo',
    meta: {
      title: '打印购销订单',
      scrollToTop: true,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '购销订单', path: '/order_mgt'},
        {name: '打印购销订单', path: ''}
      ]
    },
    component: () => import('@/module/views/BuyAndSale/Order/Print')
  },
  {
    path: '/quote_mgt',
    name: 'quoteMgt',
    meta: {
      title: '购销报价',
      scrollToTop: true,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '购销报价', path: ''}
      ]
    },
    component: () => import('@/module/views/BuyAndSale/QuoteMgt')
  },
  {
    path: '/quote_mgt/add',
    name: 'addQuote',
    meta: {
      title: '新增购销报价',
      scrollToTop: true,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '购销报价', path: '/quoteMgt'},
        {name: '新增购销报价', path: ''}
      ]
    },
    component: () => import('@/module/views/BuyAndSale/QuoteMgt/AddQuote')
  },
  {
    path: '/quote_mgt/:paperNo',
    name: 'detail',
    meta: {
      title: '购销报价详情',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '购销报价', path: '/quoteMgt'},
        {name: '购销报价详情', path: ''}
      ]
    },
    component: () => import('@/module/views/BuyAndSale/QuoteMgt/QuoteDetail')
  },
  {
    path: '/fixprice',
    name: 'fixPrice',
    meta: {
      title: '购销定价',
      scrollToTop: true,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '购销定价', path: ''}
      ]
    },
    component: () => import('@/module/views/BuyAndSale/FixPrice')
  },
  {
    path: '/fixprice/:confirmPaperNo',
    name: 'fixDetail',
    meta: {
      title: '购销定价详情',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '购销定价', path: 'fixprice'},
        {name: '购销定价详情', path: ''}
      ]
    },
    component: () => import('@/module/views/BuyAndSale/FixPrice/Detail')
  }
]

export default BuyAndSale;
