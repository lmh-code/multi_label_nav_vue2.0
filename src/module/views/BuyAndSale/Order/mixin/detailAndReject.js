import requestUrl from '@/module/api/buyAndSale'
import BarCode from '@/components/Common/Tools/BarCode'
import exportExcel from '@/utils/exportExcel'
import {objectToArray} from '@/utils/utils'
export default {
  data() {
    return {
      paperNo: '',
      type: '',
      pageNum: 1,
      pageSize: 50000,
      loading: false,
      exportLoading: false,
      orderMsg: {},
      searchContent: {
        barcode: '', // 条码
        erpGoodsNo: '', // 商品编码
        vendorGoodsNo: '' // 货号
      },
      havePurchaseQty: "",
      row: {},
      orderSumTableData: [],
      orderSumTableColumn: [
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
          ellipsis: true,
          minWidth: 110
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
          dataIndex: 'pack',
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
          dataIndex: 'receiveQty',
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
          dataIndex: 'receiveAmount',
          minWidth: 110
        },
        // {
        //   title: '可订单价',
        //   dataIndex: 'vendorPrice',
        //   minWidth: 110,
        //   input: this.isInput,
        //   placeholder: '可订单价'
        // },
        // {
        //   title: '可订数量',
        //   dataIndex: 'vendorQty',
        //   minWidth: 110,
        //   input: this.isInput,
        //   placeholder: '可订数量'
        // },
        {
          title: '备注',
          dataIndex: 'vendorRemark',
          minWidth: 120,
          input: this.isInput,
          placeholder: '备注'
        }
      ],
      exportConfig: {
        vendorGoodsNo: '货号',
        barcode: '商品条码',
        goodsNo: '商品编码',
        goodsName: '商品名称',
        unit: '单位',
        spec: '规格',
        amount: '订单金额',
        qty: '订货数量',
        pack: '件数',
        price: '订货单价',
        packPrice: '件单价',
        totalReceiveQty: '收货数量',
        giftQty: '赠品数量',
        receivePrice: '收货单价',
        totalReceiveAmount: '收货总金额',
        //   vendorPrice: '可订单价',
        //   vendorQty: '可订数量',
        vendorRemark: '备注'
      },
      storeGoodsTableColumn: [
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
          ellipsis: true,
          minWidth: 110
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
      ],
      exportConfigForStoreGoods: {
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
    }
  },
  components: {
    "bar-code": BarCode
  },
  created() {
    this.paperNo = this.$route.params.id
    this.type = this.$route.params.type
    this.storeNo = this.$route.params.storeNo
    this.havePurchaseQty = this.$route.query.row && this.$route.query.row.havePurchaseQty
    this.row = this.$route.query.row
  },
  async mounted() {
    let orderMsg = await this.getOrderDetail()
    this.orderMsg = {...orderMsg}
    this.paperNo = orderMsg.paperNo // 重置paperNo 以后台数据的paperNo为准
    this.orderSumTableData = orderMsg.listDetail || []
    // this.getOrderSum()
    // if(this.type === '001' && this.orderMsg.havePurchaseQty === 1) {
    //   this.getStoreDetail()
    // }
  },
  methods: {
    /**
     * @description: 获取商品基本信息
     * @param {*} async
     * @return {*}
     */
    async getOrderDetail() {
      let _this = this
      _this.$loading.show()
      return new Promise((resolve, reject) => {
        // _this.$http.post(`${requestUrl.buyAndSaleOrderDetail}${_this.paperNo}`).then(res => {
        _this.$http.post(requestUrl.orderDetail, { paperNo: _this.paperNo, storeNo: _this.storeNo, ...this.row, selectStoreNeed: this.havePurchaseQty === 1 ? 1 : null, selectReceive: 1 }).then(res => {
          _this.$loading.hide()
          if(res.code === 0) {
            let storeGoodsTableDataList = res.data && res.data.listOrderPickDetail && res.data.listOrderPickDetail.length ? res.data.listOrderPickDetail : []
            this.storeGoodsTableData = storeGoodsTableDataList
            this.storeGoodsTableDataTemp = storeGoodsTableDataList
            resolve(res.data)
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          _this.$loading.hide()
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
      })
    },
    /**
     * @description: 获取商品汇总信息
     */
    getOrderSum() {
      this.loading = true
      this.$http.post(requestUrl.orderDetail, {...this.searchContent, paperNo: this.paperNo, pageNum: this.pageNum, pageSize: this.pageSize, storeNo: this.storeNo}).then(res => {
        this.loading = false
        if(res.code === 0) {
          let tableDataList = res.data && res.data.listDetail && res.data.listDetail.length ? res.data.listDetail : []
          this.orderSumTableData = tableDataList
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    exportHandel() {
      this.exportLoading = true
      this.$http.post(requestUrl.orderDetail, {...this.searchContent, paperNo: this.paperNo, pageNum: this.pageNum, pageSize: this.pageSize, storeNo: this.storeNo, selectReceive: 1}).then(res => {
        this.exportLoading = false
        if(res.code === 0) {
          let tableDataList = res.data && res.data.listDetail && res.data.listDetail.length ? res.data.listDetail : []
          const tHeader = objectToArray(this.exportConfig, false)
          const filterVal = objectToArray(this.exportConfig, true)
          exportExcel.ExportJsonToExcel({
            header: tHeader,
            filterVal,
            data: tableDataList,
            filename: `购销订单${this.paperNo}-商品汇总`
          })
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.exportLoading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    isInput() {
      return this.type === '002' ? true : false
    }
  }
}
