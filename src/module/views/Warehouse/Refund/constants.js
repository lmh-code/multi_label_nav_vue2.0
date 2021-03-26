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
  }
]

const paperTypeOptions = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '直送退货单',
    value: 9
  },
  {
    label: '代发退货单',
    value: 25
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
  paperNo: '退货单号',
  storeName: '门店',
  vendorName: '供应商',
  totalQty: '退货数量',
  totalAmount: '含税金额',
  totalNetAmount: '未税金额',
  status: '单据状态',
  typeName: '单据类型',
  tradeModeValue: '结算方式',
  reconciliationFlagName: '对账状态',
  createTime: '制单时间',
  confirmTime: '审核时间'
}

export default {
  timeOptions,
  paperStatusOptions,
  paperTypeOptions,
  checkingStatusOptions,
  checkingTypeOptions,
  exportConfig
}
