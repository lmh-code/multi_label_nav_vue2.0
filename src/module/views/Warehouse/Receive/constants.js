const timeOptions = [
  {
    label: '审核日期',
    value: 0
  },
  {
    label: '制单日期',
    value: 1
  }
]

const paperStatusOptions = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '已审核',
    value: 2
  },
  {
    label: '被红冲',
    value: 4
  }
]

const paperTypeOptions = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '直送收货单',
    value: 13
  },
  {
    label: '收货红冲单',
    value: 12
  }
]

const checkingStatusOptions = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '未对账',
    value: 0
  },
  {
    label: '供应商已对账',
    value: 2
  },
  {
    label: '已完成对账',
    value: 6
  },
  {
    label: '已结算',
    value: 14
  }
]

const checkingTypeOptions = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '购销',
    value: 1
  },
  {
    label: '代营',
    value: 9
  },
  {
    label: '联营',
    value: 2
  },
  {
    label: '代销',
    value: 4
  }
]

const exportConfig = {
  paperNo: '收货单号',
  sourcePaperNo: '订单号',
  storeName: '门店',
  vendorName: '供应商',
  totalQty: '收货数量',
  totalGiftQty: '赠品数量',
  totalAmount: '含税金额',
  totalNetAmount: '未税金额',
  statusName: '单据状态',
  typeName: '单据类型',
  tradeModeName: '结算方式',
  reconciliationFlagName: '对账状态',
  createTime: '制单时间',
  authDatetime: '审核时间'
}

export default {
  timeOptions,
  paperStatusOptions,
  paperTypeOptions,
  checkingStatusOptions,
  checkingTypeOptions,
  exportConfig
}
