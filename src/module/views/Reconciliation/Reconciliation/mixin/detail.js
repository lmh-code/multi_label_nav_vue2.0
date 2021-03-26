import requestUrl from '@/module/api/reconciliation'
export default {
  data() {
    return {
      storeNo: '',
      paperNo: '',
      editType: '',
      isDispute: '', // 是否有争议  110 有 001 无
      orderDetail: {},
      pageNum: 1,
      pageSize: -1,
      loading: false,
      tableData: [],
      total: 0,
      searchContent: {
        goodsNo: '', // 商品编码
        barcode: '', // 条码
        vendorGoodsNo: '' // 货号
      },
      columnsTemp: [
        {
          title: '商品编码',
          dataIndex: 'goodsNo',
          ellipsis: true,
          minWidth: 90
        },
        {
          title: '条码',
          dataIndex: 'barcode',
          ellipsis: true,
          minWidth: 100
        },
        {
          title: '货号',
          dataIndex: 'vendorGoodsNo',
          ellipsis: true,
          minWidth: 100
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          ellipsis: true,
          minWidth: 130
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
          title: '收货数量',
          dataIndex: 'qty',
          minWidth: 80
        },
        {
          title: '收货单价',
          dataIndex: 'price',
          minWidth: 80
        },
        {
          title: '不含税收货金额',
          dataIndex: 'netAmount',
          minWidth: 120
        },
        {
          title: '收货总金额',
          dataIndex: 'amount',
          minWidth: 100
        }
      ],
      columns: []
    }
  },
  created() {
    this.storeNo = this.$route.params.storeNo
    this.paperNo = this.$route.params.paperNo
    this.editType = this.$route.params.type
    this.isDispute = this.$route.params.isDispute
    
    let otherColumn = [
      {
        title: '争议单价',
        dataIndex: 'disputePrice',
        minWidth: 110,
        placeholder: '争议单价',
        input: () => {
          return this.editType === 'edit' ? true : false
        }
      },
      {
        title: '争议收货数量',
        dataIndex: 'disputeQty',
        minWidth: 120,
        placeholder: '争议收货数量',
        input: () => {
          return this.editType === 'edit' ? true : false
        }
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        minWidth: 140,
        placeholder: '备注',
        ellipsis: true,
        input: () => {
          return this.editType === 'edit' ? true : false
        }
      }
    ]
    if(this.editType === 'edit') {
      // 编辑
      this.columns = [...this.columnsTemp, ...otherColumn]
    }else {
      // 详情: 判断有没有争议，没有争议不显示争议内容
      if(this.isDispute === '110') {
        this.columns = [...this.columnsTemp, ...otherColumn]
      }else {
        this.columns = [...this.columnsTemp]
      }
    }
  },
  mounted() {
    this.getGoodsDetail()
    this.getGoodsList()
  },
  methods: {
    getGoodsDetail() {
      let reqUrl = `${requestUrl.detail}/${this.storeNo}/${this.paperNo}`
      this.$loading.show()
      this.$http.post(reqUrl).then(res => {
        this.$loading.hide()
        if(res.code === 0) {
          if(res.data) {
            this.orderDetail = {...res.data}
          }
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.$loading.hide()
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    getGoodsList() {
      this.loading = true
      this.$http.post(requestUrl.goodsDetail, {...this.searchContent, paperNo: this.paperNo, storeNo: this.storeNo, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        this.loading = false
        if(res.code === 0) {
          this.tableData = res.data && res.data.result && res.data.result.length ? res.data.result : []
          this.total = res.data && res.data.total ? res.data.total : 0
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    }
  }
}
