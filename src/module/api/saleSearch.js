import config from '@/utils/config'
const saleSearchUrl = {
  // 销售汇总
  summaryByGoods: `${config.reqUrl}/supplier/a/vendorSale/summaryByGoods`,
  // 门店汇总
  storeSale: `${config.reqUrl}/supplier/a/vendorSale/storeSale`,
  // 单个商品在门店销售汇总
  summaryGoodsEachStore: `${config.reqUrl}/supplier/a/vendorSale/summaryGoodsEachStore`
}

export default saleSearchUrl;
