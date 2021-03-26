const AgentCamp = [
  {
    path: '/sale_mgt',
    name: 'saleMgt',
    meta: {
      title: '代营商品报价',
      scrollToTop: true,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '代营商品报价', path: ''}
      ]
    },
    component: () => import('@/module/views/AgentCamp/SaleMgt')
  },
  {
    path: '/sale_mgt/add',
    name: 'saleMgtAdd',
    meta: {
      title: '新增报价单',
      scrollToTop: true,
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '代营商品报价', path: '/sale_mgt'},
        {name: '新增报价单', path: ''}
      ]
    },
    component: () => import('@/module/views/AgentCamp/SaleMgt/Add')
  },
  {
    path: '/sale_mgt/:type/:id',
    name: 'saleMgtTypeId',
    meta: {
      title: '代营商品报价单',
      scrollToTop: true,
      keepAlive: false,
      dynamicTitle(to) {
        const {type} = to.params
        switch (type) {
        case 'see':
          return `代营商品报价单详情`
        case 'edit':
          return `编辑代营商品报价单`
        default:
          return '代营商品报价单'
        }
      },
      breadcrumbList: [
        {name: '购销', path: ''},
        {name: '代营商品报价', path: '/sale_mgt'},
        {name: '代营商品报价单', path: ''}
      ],
      commonModule: '@/module/views/AgentCamp/SaleMgt/Edit'
    },
    component: () => import('@/module/views/AgentCamp/SaleMgt/Edit')
  },
  {
    path: '/con_order',
    name: 'conOrder',
    meta: {
      title: '代营订单',
      scrollToTop: true,
      breadcrumbList: [
        {name: '代营', path: ''},
        {name: '代营订单', path: ''}
      ]
    },
    component: () => import('@/module/views/AgentCamp/ConOrder')
  },
  {
    path: '/con_order/detail/:type/:id/:storeNo',
    name: 'conOrderDetailTypeId',
    meta: {
      title: '代营订单详情',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '代营', path: ''},
        {name: '代营订单', path: '/con_order'},
        {name: '代营订单详情', path: ''}
      ]
    },
    component: () => import('@/module/views/AgentCamp/ConOrder/Detail')
  },
  {
    path: '/con_order/print/:id/:storeNo',
    meta: {
      title: '打印代营订单',
      scrollToTop: true,
      breadcrumbList: [
        {name: '代营', path: ''},
        {name: '代营订单', path: '/order_mgt'},
        {name: '打印代营订单', path: ''}
      ]
    },
    component: () => import('@/module/views/AgentCamp/ConOrder/Print')
  }
]

export default AgentCamp;
