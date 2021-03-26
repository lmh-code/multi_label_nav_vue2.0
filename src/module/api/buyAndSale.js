import config from '@/utils/config'
let baseUrl = config.reqUrl
const requestUrl = {
  // 订货管理
  orderList: `${baseUrl}/supplier/vendorOrder/listOrder`, // 采购订单列表
  orderDetail: `${baseUrl}/supplier/vendorOrder/orderDetail`, // 采购订单详情
  // orderDetail: `${baseUrl}/supplier/a/vendor/order/detail`, // 购销订单详情
  orderOpen: `${baseUrl}/supplier/a/vendor/order/open`, // 已阅
  acceptOrders: `${baseUrl}/supplier/a/vendor/order/accept`, // 接单
  refuseOrder: `${baseUrl}/supplier/a/vendor/order/refuse`, // 拒绝接单
  storeDetail: `${baseUrl}/supplier/a/vendor/order/storeDetail`, // 订单汇总-详情 获取门店相关
  buyAndSaleOrderDetail: `${baseUrl}/supplier/a/vendor/order/`, // 购销订单，单子基本信息
  queryVendorStore: `${baseUrl}/foundation/store/queryVendorStore`, // 获取供应商门店
  moduleIdDetail: `${baseUrl}/supplier/a/print/detail/`, // 打印配置详情
  savePrintDetail: `${baseUrl}/supplier/a/print/save`, // 打印配置保存
  // 根据父级ID查询分类列表
  categoryList: `${baseUrl}/foundation/category/categoryList`,
  // 获取报价单列表
  getQuoteList: `${baseUrl}/supplier/vendorQuotation/listPage`,
  // 导入自主报价
  importQuote: `${baseUrl}/supplier/vendorQuotation/import`,
  // 报价单日志
  getQuoteLog: `${baseUrl}/supplier/a/quote/log`,
  // 报价单详情
  getQuoteDetail: `${baseUrl}/supplier/vendorQuotation`,
  // 删除报价单
  deleteQuote: `${baseUrl}/supplier/vendorQuotation/delete`,
  // 新增/修改报价单
  addOrUpdateQuote: `${baseUrl}/supplier/vendorQuotation/save`,
  // 审核报价单
  confirmQuote: `${baseUrl}/supplier/vendorQuotation/confirm`,
  // 获取进价列表
  fixList: `${baseUrl}/supplier/vendorQuotation/confirmPrice/list`,
  // 获取进价详情
  getFixDetail: `${baseUrl}/supplier/vendorQuotation/confirmPrice/detail`,
  // 获取操作日志
  getOperationLog: `${baseUrl}/foundation/operationLog/list`,
  // 获取当前可报价供应商信息
  getQuotableVendors: `${baseUrl}/foundation/vendor/user/list`
}
export default requestUrl;
