import config from '@/utils/config'
const reconciliationUrl = {
  // 对账列表
  reconciliationList: `${config.reqUrl}/indent/vendor/reconciliation/list`,
  // 对账通过
  confirm: `${config.reqUrl}/indent/vendor/reconciliation/confirm`,
  // 对账通过 批量
  batchConfirm: `${config.reqUrl}/indent/vendor/reconciliation/batchConfirm`,
  // 发起争议
  updateDispute: `${config.reqUrl}/indent/vendor/reconciliation/updateDispute`,
  // 对账详情
  detail: `${config.reqUrl}/indent/vendor/reconciliation/detail`,
  // 对账商品列表
  goodsDetail: `${config.reqUrl}/indent/vendor/reconciliation/goodsDetail`,
  // 列表汇总
  listTotal: `${config.reqUrl}/indent/vendor/reconciliation/listTotal`
}

export default reconciliationUrl;
