const typeOptions = [
  {
    label: '全部类型',
    value: ''
  },
  {
    label: '采购询价',
    value: 0
  },
  {
    label: '促销询价',
    value: 1
  },
  {
    label: '自主报价',
    value: 2
  }
]

const statusOptions = [
  {
    label: '全部状态',
    value: ''
  },
  {
    label: '待提交',
    value: 0
  },
  {
    label: '待定价',
    value: 2
  },
  {
    label: '已定价',
    value: 4
  },
  {
    label: '已废弃',
    value: 1
  },
  {
    label: '定价待审核',
    value: 16
  }
]

export default {
  typeOptions,
  statusOptions
}
