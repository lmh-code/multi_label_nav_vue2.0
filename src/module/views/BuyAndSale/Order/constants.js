const isOpenOptions = [
  {
    label: '全部',
    value: -1
  },
  {
    label: '已查看',
    value: 1
  },
  {
    label: '未查看',
    value: 0
  }
]
const statusOptions = [
  {
    label: '全部',
    value: ''//-1
  },
  {
    label: '待接单',
    value: 0
  },
  {
    label: '待收货',
    value: 2
  },
  {
    label: '已收货',
    value: 4
  },
  {
    label: '已取消',
    value: 1
  },
  {
    label: '拒绝接单',
    value: 16
  },
  {
    label: '已违约',
    value: 32
  }
]
const exportConfig = {
  paperNo: '订单编号',
  vendorName: '供应商',
  cityName: '城市',
  storeName: '订货门店/仓库',
  createUserName: '联系人',
  createTime: '单据时间',
  expectDate: '期望到货时间',
  tagName: '状态',
  totalAmount: '订单金额',
  totalQty: '订单数量',
  totalGoodsQty: '订单商品数',
  totalReceiveAmount: '收货金额',
  totalReceiveQty: '收货数量',
  totalReceiveGoodsQty: '收货商品数',
  selectName: '是否查看',
  remark: '备注'
}
export default {
  isOpenOptions,
  statusOptions,
  exportConfig
}
