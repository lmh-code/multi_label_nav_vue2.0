/*
 * @Descripttion: 配置业务路由
 * 默认列表路由：默认缓存，标签名为meta中的title字段的值
 * {
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
  }
 * 详情路由
 * {
    path: '/order_mgt/:type/:id',
    name: 'orderMgtTypeId',
    meta: {
      title: '购销订单详情',
      scrollToTop: true,
      keepAlive: false, // keepAlive：false，只添加tab标签不缓存页面数据；true：添加tab标签并缓存页面数据 (可不配置：不配置默认为true的状态)
      usePathKey: true, // usePathKey： true 根据页面路由生成tab标签（1、可不配置，2、 keepAlive: false，此值无效，3、不可与useFullPathKey同时存在）
      useFullPathKey: true, // usePathKey： true 根据页面路由生成tab标签（1、可不配置，2、 keepAlive: false，此值无效，3、不可与usePathKey同时存在）
      dynamicTitle(to) { // 详情重新定义tab标签的描述（默认去title的值，可不配置）
        const {type, id} = to.params
        switch (type) {
        case 'detail':
          return `购销订单详情${id}`
        case 'reject':
          return `购销订单拒绝接单${id}`
        default:
          return '购销订单详情'
        }
      },
      breadcrumbList: [ // 面包屑（可不配置，为以后扩展展示面包屑使用）
        {name: '购销', path: ''},
        {name: '购销订单', path: '/order_mgt'},
        {name: '购销订单详情', path: ''}
      ],
      commonModule: '@/module/views/BuyAndSale/Order/Detail' // 非必配置项，使用同一个component的情况必须配置此值
    },
    component: () => import('@/module/views/BuyAndSale/Order/Detail')
  }
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2020-10-19 15:05:56
 * @LastEditTime: 2020-11-27 14:32:35
 */
import AgentCamp from './AgentCamp'; // 引入页面路由
import BuyAndSale from './BuyAndSale'; 
import Qualification from './Qualification'; 
import Reconciliation from './Reconciliation'; 
import Report from './Report'; 
import Warehouse from './Warehouse'
const routersList = [
  ...AgentCamp,
  ...BuyAndSale,
  ...Qualification,
  ...Reconciliation,
  ...Report,
  ...Warehouse
]
export default routersList;
