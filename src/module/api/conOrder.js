import config from '@/utils/config'
const requestUrl = {
  // 代营订货单列表
  orderList: `${config.reqUrl}/supplier/a/proxySale/list`,
  orderDetail: `${config.reqUrl}/supplier/a/proxySale/`, // 代营订单详情信息
  // 代营订货单详情-商品汇总
  goodsDetail: `${config.reqUrl}/supplier/a/proxySale/detail`,
  // 代营订货单详情-门店汇总
  storeDetail: `${config.reqUrl}/supplier/a/proxySale/storeDetail`,
  // 商品销售汇总
  goodsSaleSummary: `${config.reqUrl}/supplier/a/proxySale/sale/summary`
}

export default requestUrl;
