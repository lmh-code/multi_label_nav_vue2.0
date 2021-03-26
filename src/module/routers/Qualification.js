const Qualification = [
  {
    path: '/sc_qua',
    name: 'supplierQua',
    meta: {
      title: '供应商资质管理',
      scrollToTop: true,
      keepAlive: true,
      breadcrumbList: [
        {name: '资质管理', path: ''},
        {name: '供应商资质管理', path: ''}
      ]
    },
    component: () => import('@/module/views/Qualification/ScQua')
  },
  {
    path: '/sc_qua/detail/:type/:id/:modelId/:supplierId',
    name: 'supplierQuaDetailId',
    meta: {
      title: '查看供应商资质',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '资质管理', path: ''},
        {name: '商品资质管理', path: '/goods_qua'},
        {name: '查看供应商资质', path: ''}
      ]
    },
    component: () => import('@/module/views/Qualification/GoodsQua/Detail')
  },
  {
    path: '/sc_qua/edit/:type/:id/:modelId/:supplierId',
    name: 'supplierQuaEditId',
    meta: {
      title: '上传供应商资质',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '资质管理', path: ''},
        {name: '商品资质管理', path: '/goods_qua'},
        {name: '上传供应商资质', path: ''}
      ]
    },
    component: () => import('@/module/views/Qualification/GoodsQua/Edit')
  },
  {
    path: '/goods_qua',
    name: 'goodsQua',
    meta: {
      title: '商品资质管理',
      scrollToTop: true,
      keepAlive: true,
      breadcrumbList: [
        {name: '资质管理', path: ''},
        {name: '商品资质管理', path: ''}
      ]
    },
    component: () => import('@/module/views/Qualification/GoodsQua')
  },
  {
    path: '/goods_qua/detail/:type/:id/:modelId/:supplierId',
    name: 'goodsQuaDetailId',
    meta: {
      title: '查看商品资质',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '资质管理', path: ''},
        {name: '商品资质管理', path: '/goods_qua'},
        {name: '查看商品资质', path: ''}
      ]
    },
    component: () => import('@/module/views/Qualification/GoodsQua/Detail')
  },
  {
    path: '/goods_qua/edit/:type/:id/:modelId/:supplierId',
    name: 'goodsQuaEditId',
    meta: {
      title: '上传商品资质',
      scrollToTop: true,
      keepAlive: false,
      breadcrumbList: [
        {name: '资质管理', path: ''},
        {name: '商品资质管理', path: '/goods_qua'},
        {name: '上传商品资质', path: ''}
      ]
    },
    component: () => import('@/module/views/Qualification/GoodsQua/Edit')
  }
]

export default Qualification;
