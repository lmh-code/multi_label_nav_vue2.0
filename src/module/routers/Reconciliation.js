const Reconciliation = [
  {
    path: '/reconciliation',
    name: 'reconciliation',
    meta: {
      title: '平台对账',
      scrollToTop: true,
      keepAlive: true,
      breadcrumbList: [
        {name: '对账结算', path: ''},
        {name: '平台对账', path: ''}
      ]
    },
    component: () => import('@/module/views/Reconciliation/Reconciliation')
  },
  {
    path: '/reconciliation/detail/:type/:storeNo/:paperNo/:isDispute',
    name: 'reconciliationDetail',
    meta: {
      title: '对账详情',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '对账结算', path: ''},
        {name: '平台对账', path: '/reconciliation'},
        {name: '对账详情', path: ''}
      ]
    },
    component: () => import('@/module/views/Reconciliation/Reconciliation/Detail')
  },
  {
    path: '/reconciliation/edit/:type/:storeNo/:paperNo/:isDispute',
    name: 'reconciliationEdit',
    meta: {
      title: '发起争议',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '对账结算', path: ''},
        {name: '平台对账', path: '/reconciliation'},
        {name: '发起争议', path: ''}
      ]
    },
    component: () => import('@/module/views/Reconciliation/Reconciliation/Edit')
  },
  {
    path: '/settlement',
    name: 'settlement',
    meta: {
      title: '平台结算',
      scrollToTop: true,
      keepAlive: true,
      breadcrumbList: [
        {name: '对账结算', path: ''},
        {name: '平台结算', path: ''}
      ]
    },
    component: () => import('@/module/views/Reconciliation/Settlement')
  },
  {
    path: '/settlement/:settlementNo',
    name: 'settlementDetail',
    meta: {
      title: '结算详情',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '对账结算', path: ''},
        {name: '平台结算', path: '/settlement'},
        {name: '结算详情', path: ''}
      ]
    },
    component: () => import('@/module/views/Reconciliation/Settlement/Detail')
  },
  {
    path: '/settlement/print/:storeNo/:settlementNo',
    meta: {
      title: '打印结算单',
      scrollToTop: true,
      breadcrumbList: [
        {name: '对账结算', path: ''},
        {name: '平台结算', path: '/settlement'},
        {name: '单据打印', path: ''}
      ]
    },
    component: () => import('@/module/views/Reconciliation/Settlement/Print')
  }
]

export default Reconciliation;
