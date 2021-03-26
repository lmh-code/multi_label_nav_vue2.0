const orderSumTableColumn = [
  {
    title: '货号',
    dataIndex: 'vendorGoodsNo',
    minWidth: 100
  },
  {
    title: '商品条码',
    dataIndex: 'barcode',
    minWidth: 130
  },
  {
    title: '商品编码',
    dataIndex: 'goodsNo',
    minWidth: 90
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
    minWidth: 120
  },
  {
    title: '单位',
    dataIndex: 'unit',
    minWidth: 80
  },
  {
    title: '规格',
    dataIndex: 'spec',
    minWidth: 80
  },
  {
    title: '订单金额',
    dataIndex: 'amount',
    minWidth: 90
  },
  {
    title: '订货数量',
    dataIndex: 'qty',
    minWidth: 90
  },
  {
    title: '件数',
    dataIndex: 'packQty',
    minWidth: 90
  },
  {
    title: '订货单价',
    dataIndex: 'price',
    minWidth: 90
  },
  {
    title: '件单价',
    dataIndex: 'packPrice',
    minWidth: 90
  },
  {
    title: '收货数量',
    dataIndex: 'totalReceiveQty',
    minWidth: 90
  },
  {
    title: '赠品数量',
    dataIndex: 'giftQty',
    minWidth: 90
  },
  {
    title: '收货单价',
    dataIndex: 'receivePrice',
    minWidth: 90
  },
  {
    title: '收货总金额',
    dataIndex: 'totalReceiveAmount',
    minWidth: 110
  },
  {
    title: '备注',
    dataIndex: 'vendorRemark',
    minWidth: 120,
    input: this.isInput,
    placeholder: '备注'
  }
]

const exportConfig = {
  vendorGoodsNo: '货号',
  barcode: '商品条码',
  goodsNo: '商品编码',
  goodsName: '商品名称',
  unit: '单位',
  spec: '规格',
  amount: '订单金额',
  qty: '订货数量',
  packQty: '件数',
  price: '订货单价',
  packPrice: '件单价',
  totalReceiveQty: '收货数量',
  giftQty: '赠品数量',
  receivePrice: '收货单价',
  totalReceiveAmount: '收货总金额',
  vendorRemark: '备注'
}

const storeGoodsTableColumn = [
  {
    title: '门店',
    dataIndex: 'pickStoreNo',
    minWidth: 100
  },
  {
    title: '货号',
    dataIndex: 'vendorGoodsNo',
    minWidth: 100
  },
  {
    title: '商品条码',
    dataIndex: 'barcode',
    minWidth: 100
  },
  {
    title: '商品编码',
    dataIndex: 'goodsNo',
    minWidth: 90
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
    minWidth: 120
  },
  {
    title: '单位',
    dataIndex: 'unit',
    minWidth: 80
  },
  {
    title: '规格',
    dataIndex: 'spec',
    minWidth: 80
  },
  {
    title: '订单总数量',
    dataIndex: 'totalQty',
    minWidth: 110
  },
  {
    title: '门店订货数量',
    dataIndex: 'pickQty',
    minWidth: 110
  }
]

const exportConfigForStoreGoods = {
  pickStoreNo: '门店',
  vendorGoodsNo: '货号',
  barcode: '商品条码',
  erpGoodsNo: '商品编码',
  goodsName: '商品名称',
  unit: '单位',
  spec: '规格',
  qty: '订单总数量',
  pickQty: '门店订货数量'
}

export default {
  orderSumTableColumn,
  exportConfig,
  storeGoodsTableColumn,
  exportConfigForStoreGoods
}
