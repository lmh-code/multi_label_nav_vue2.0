import config from '@/utils/config'
const warehouseUrl = {
  // 收货订货单列表
  receiveList: `${config.reqUrl}/supplier/a/vendor/order/receiveList`,
  // 获取门店仓库数据
  queryStoreBySv: `${config.reqUrl}/foundation/store/queryStoreBySv`,
  // 收货单详情
  receiveDetail: `${config.reqUrl}/supplier/a/vendor/order/receiveDetail`,
  // 退货单列表
  refundList: `${config.reqUrl}/supplier/vendorOrder/listReturnOrderPc`,
  // 退货单详情
  refundDetail: `${config.reqUrl}/supplier/vendorOrder/returnOrderDetailPc`,
  // 根据供应商获取商品列表
  queryVendorGoodsList: `${config.reqUrl}/foundation/contract/queryVendorGoodsList`
}
export default warehouseUrl
