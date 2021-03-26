const Warehouse = [
  {
    path: '/receiveMgt',
    name: 'receiveMgt',
    meta: {
      title: '收货管理',
      scrollToTop: true,
      breadcrumbList: [
        {name: '出入仓管理', path: ''},
        {name: '收货管理', path: ''}
      ]
    },
    component: () => import('@/module/views/Warehouse/Receive')
  },
  {
    path: '/receiveMgt/:paperNo',
    name: 'receiveDetail',
    meta: {
      title: '收货详情',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '出入仓管理', path: ''},
        {name: '收货管理', path: '/receiveMgt'},
        {name: '收货详情', path: ''}
      ]
    },
    component: () => import('@/module/views/Warehouse/Receive/Detail')
  },
  {
    path: '/refundMgt',
    name: 'refundMgt',
    meta: {
      title: '退货管理',
      scrollToTop: true,
      breadcrumbList: [
        {name: '出入仓管理', path: ''},
        {name: '收货管理', path: ''}
      ]
    },
    component: () => import('@/module/views/Warehouse/Refund')
  },
  {
    path: '/refundMgt/:paperNo/:storeNo',
    name: 'refundDetail',
    meta: {
      title: '退货详情',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '出入仓管理', path: ''},
        {name: '退货管理', path: '/refundeMgt'},
        {name: '退货详情', path: ''}
      ]
    },
    component: () => import('@/module/views/Warehouse/Refund/Detail')
  }
]

export default Warehouse
