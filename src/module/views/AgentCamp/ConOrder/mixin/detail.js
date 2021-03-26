import requestUrl from '@/module/api/conOrder'
import BarCode from '@/components/Common/Tools/BarCode'
import exportExcel from '@/utils/exportExcel'
import detailConst from '../constant'
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
      activeName: 'first',
      searchContent: {
        barcode: '', // 商品条码
        erpGoodsNo: '', // 商品编码
        vendorGoodsNo: '' // 货号
      },
      row: {},
      orderSumTableData: [],
      orderSumTableColumn: detailConst.orderSumTableColumn,
      exportConfig: detailConst.exportConfig,

      loadingStoreGoods: false,
      searchStoreGoodsContent: {
        pickStoreNo: '', // 门店
        barcode: '', // 商品条码
        erpGoodsNo: '', // 商品编码
        vendorGoodsNo: '' // 货号
      },
      storeGoodsTableData: [],
      storeGoodsTableColumn: detailConst.storeGoodsTableColumn,
      exportConfigForStoreGoods: detailConst.exportConfigForStoreGoods
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
      return new Promise((resolve) => {
        _this.$http.post(`${requestUrl.orderDetail}${_this.paperNo}`).then(res => {
          _this.$loading.hide()
          if(res.code === 0) {
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
    getOrderSum(type) {
      if(type === 'export') {
        this.exportLoading = true
      }else {
        this.loading = true
      }
      this.$http.post(requestUrl.goodsDetail, {...this.searchContent, paperNo: this.paperNo, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(type === 'export') {
          this.exportLoading = false
        }else {
          this.loading = false
        }
        if(res.code === 0) {
          let tableDataList = res.data && res.data.length ? res.data : []
          if(type === 'export') {
            const tHeader = objectToArray(this.exportConfig, false)
            const filterVal = objectToArray(this.exportConfig, true)
            exportExcel.ExportJsonToExcel({
              header: tHeader,
              filterVal,
              data: tableDataList,
              filename: `代营订单${this.paperNo}-商品汇总`
            })
          }else {
            this.orderSumTableData = tableDataList
          }
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        if(type === 'export') {
          this.exportLoading = false
        }else {
          this.loading = false
        }
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    getStoreDetail(type) {
      if(type === 'export') {
        this.exportLoading = true
      }else {
        this.loadingStoreGoods = true
      }
      this.$http.post(requestUrl.storeDetail, {...this.searchStoreGoodsContent, paperNo: this.paperNo, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(type === 'export') {
          this.exportLoading = false
        }else {
          this.loadingStoreGoods = false
        }
        if(res.code === 0) {
          let storeGoodsTableDataList = res.data && res.data.length ? res.data : []
          if(type === 'export') {
            const tHeader = objectToArray(this.exportConfigForStoreGoods, false)
            const filterVal = objectToArray(this.exportConfigForStoreGoods, true)
            exportExcel.ExportJsonToExcel({
              header: tHeader,
              filterVal,
              data: storeGoodsTableDataList,
              filename: `代营订单${this.paperNo}-门店明细`
            })
          }else {
            this.storeGoodsTableData = storeGoodsTableDataList
          }
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        if(type === 'export') {
          this.exportLoading = false
        }else {
          this.loadingStoreGoods = false
        }
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    }
  }
}
