import config from '@/utils/config'
const settlementUrl = {
  // 列表
  settlementList: `${config.reqUrl}/nfmsservice/supplierapi/settlementList`,
  // 列表汇总
  listTotal: `${config.reqUrl}/nfmsservice/indent/vendor/settlement/listTotal`,
  // 供应商结算单   供应商结算单  导出
  export: `${config.reqUrl}/nfmsservice/indent/vendor/settlement/export`,
  // 详情-基本信息
  settlementDetail: `${config.reqUrl}/nfmsservice/supplierapi/settlement/detail`,
  // 发票删除
  deleteInvoice: `${config.reqUrl}/nfmsservice/supplierInvoice/delete`,
  // 开发票后保存
  settlementUpdate: `${config.reqUrl}/indent/vendor/settlement/update`,
  // 发票添加
  addInvoice: `${config.reqUrl}/nfmsservice/supplierInvoice/supplierAddInvoice`,
  // 发票详情
  invoiceDetails: `${config.reqUrl}/nfmsservice/supplierInvoice/invoiceDetail`,
  // // 发票修改
  // updateInvoice: `${config.reqUrl}/nfmsservice/supplierInvoice/supplierEditInvoice`,
  // 发票修改
  editInvoice: `${config.reqUrl}/nfmsservice/supplierInvoice/editInvoice`
}

export default settlementUrl;
