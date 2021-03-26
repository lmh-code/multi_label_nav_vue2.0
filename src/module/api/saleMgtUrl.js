import config from '@/utils/config'
const saleMgtUrl = {
  // 获取区域数据
  userAreaStoreGroupList: `${config.reqUrl}/foundation/storeGroup/areaStoreGroupList`, //userAreaStoreGroupList`,
  // 查询合同商品分页列表
  queryContractGoods: `${config.reqUrl}/foundation/contract/queryVendorGoodsList`,
  // 报价单维度列表
  getQuoteList: `${config.reqUrl}/supplier/a/quote/list`,
  // 商品维度列表
  getListByProduct: `${config.reqUrl}/supplier/a/quote/goodsList`,
  // 报价单日志
  getQuoteLog: `${config.reqUrl}/supplier/a/quote/log`,
  // 报价单详情
  getQuoteDetail: `${config.reqUrl}/supplier/a/quote/detail`,
  // 删除报价单
  deleteQuote: `${config.reqUrl}/supplier/a/quote/del`,
  // 新增/修改报价单
  addOrUpdateQuote: `${config.reqUrl}/supplier/a/quote/addOrUpdate`,
  // 发布报价单
  publish: `${config.reqUrl}/supplier/a/quote/publish`
}

export default saleMgtUrl;
