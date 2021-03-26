<style scoped>
  .detail-box {
    padding: 10px;
    background-color: #fff;
    margin-top: 5px
  }
</style>
<template>
  <div>
    <div class="search-form-wraper">
      <el-form :model="searchContent" label-position="top">        
        <el-form-item label="结算起始时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.settlementStartDate" 
            type="date" 
            placeholder="结算起始时间"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结算结束时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.settlementEndDate" 
            type="date" 
            placeholder="结算结束时间"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商">
          <el-select
            v-model="searchContent.searchSupplierNumberList"
            multiple
            collapse-tags
            filterable
            class="search-input"
            size="small"
            placeholder="请选择供应商">
            <el-option
              v-for="item in vendors"
              :key="item.vendorNo"
              :label="item.vendorName"
              :value="item.vendorNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchContent.status"
            class="search-input"
            size="small"
            placeholder="请选择状态">
            <el-option
              v-for="item in statusOptionsArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算单号">
          <el-input v-model="searchContent.settlementNumber" class="search-input" size="small" placeholder="结算单号" clearable></el-input>
        </el-form-item>
        <el-form-item label="进货单号">
          <el-input v-model="searchContent.inNumber" class="search-input" size="small" placeholder="进货单号" clearable></el-input>
        </el-form-item>
        <el-form-item label="退货单号">
          <el-input v-model="searchContent.outNumber" class="search-input" size="small" placeholder="退货单号" clearable></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-select
            v-model="searchContent.cooperationMode"
            class="search-input"
            size="small"
            placeholder="结算方式">
            <el-option
              v-for="item in typeIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearchHandle(true)" size="mini">搜索</el-button>
          <el-button size="mini" :disabled="checkedList.length === 0" :loading="exportLoading" @click="doExportDataDetailHandel">批量导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row class="detail-box">
      <el-col :span="6">总金额：￥{{totalSettlementAmount}}</el-col>
      <el-col :span="6">已结算金额：￥{{settledAmount}}</el-col>
      <el-col :span="6">已结算单：{{settledQty}}</el-col>
      <el-col :span="6">未结算单：{{unsettledQty}}</el-col>
    </el-row>
    <div class="table-wraper">
      <bl-table
        :loading="loading"
        :border="false"
        :dataSource="tableData"
        :columns="columns"
        :selection="true"
        :showSummary="false"
        @selection-change="selectionChangeHandel"/>
      <bl-pagination
        :showPagination="tableData.length > 0"
        :pageNum="pageNum"
        :total="total"
        @size-change="changeSize"
        @current-change="changeCurrent"/>
    </div>
    <invoice-dialog ref="invoiceDialog" @parentsHandel="doSearchHandleRequest"></invoice-dialog>
  </div>
</template>
<script>
  import vendorsMixin from '@/module/mixin/getVendors'
  import researchMixin from '@/module/mixin/research'
  import commonUrl from '@/module/api/common'
  import settlementUrl from '@/module/api/settlement'
  import { dateFormat, objectToArray } from '@/utils/utils'
  import exportExcel from '@/utils/exportExcel'
  import InvoiceDialog from '@/module/views/Reconciliation/Settlement/InvoiceDialog'
  export default {
    mixins: [vendorsMixin, researchMixin],
    components: {
      "invoice-dialog": InvoiceDialog
    },
    data() {
      return {
        searchContent: {
          settlementStartDate: dateFormat('yyyy-MM-dd', Date.parse(new Date()) - 6 * 86400000),
          settlementEndDate: dateFormat('yyyy-MM-dd', Date.parse(new Date())),
          searchSupplierNumberList: [],
          status: '',
          settlementNumber: '',
          cooperationMode: '',
          inNumber: '',
          outNumber: ''
        },
        statusOptionsArr: [],
        typeIdOptions: [],
        totalSettlementAmount: '',
        settledAmount: '',
        settledQty: '',
        unsettledQty: '',
        loading: false,
        exportLoading: false,
        tableData: [],
        total: 0,
        pageNum: 1, 
        pageSize: 10,
        checkedList: [],
        exportConfigForDetail: {
          index: '序号',
          settlementNo: '结算单号',
          vendorName: '供应商',
          cooperationModeName: '结算方式',
          accountPeriod: '账期',
          endDate: '应结算日',
          goodsName: '商品名称',
          goodsNo: '商品编码',
          vendorGoodsNo: '货号',
          barcode: '商品条码',
          spec: '规格',
          taxPct: '税率',
          averageUnitPrice: '平均单价',
          qty: '数量',
          amount: '参考结算金额',
        },
        columns: [
          {
            title: '序号',
            dataIndex: 'index',
            minWidth: 50
          },
          {
            title: '结算单号',
            dataIndex: 'settlementNumber',
            ellipsis: true,
            minWidth: 160
          },
          {
            title: '供应商',
            dataIndex: 'supplierName',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '结算方式',
            dataIndex: 'cooperationModeName',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '账期',
            minWidth: 200,
            ellipsis: true,
            dataIndex: 'accountPeriod'
          },
          {
            title: '应结算日',
            dataIndex: 'settlementEndDate',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '应结金额',
            dataIndex: 'shouldPay',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '应开票金额',
            dataIndex: 'shoudInvoiceMoney',
            ellipsis: true,
            minWidth: 120
          },
          {
            title: '已开票金额',
            dataIndex: 'havedInvoiceMoney',
            ellipsis: true,
            minWidth: 120
          },
          {
            title: '状态',
            dataIndex: 'statusName',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '状态更新日期',
            dataIndex: 'lastUpdateTime',
            ellipsis: true,
            minWidth: 140
          },
          {
            title: '结算主体',
            dataIndex: 'accountName',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '创建时间',
            minWidth: 100,
            ellipsis: true,
            dataIndex: 'addTime'
          },
          {
            title: '操作',
            fixed: 'right',
            minWidth: 170,
            operation: [{
              label: '详情',
              icon: 'el-icon-view',
              clickFunc: this.goDetailPage
            },{
              label: '开发票',
              icon: 'el-icon-tickets',
              isDisabled: (row)=> {
                return row.status !== 2
              },
              clickFunc: this.invoiceHandel
            }]
          }
        ]
      }
    },
    mounted() {
      this.getStatus()
      this.initMounted()
    },
    methods: {
      /**
       * @description: 确保调用查询接口的时候，已经拿到用户有权限的供应商
       */
      initMounted() {
        if(this.vendors && this.vendors.length > 0) {
          this.doSearchHandle(true)
        }else {
          setTimeout(() => {
            this.initMounted()
          }, 500);
        }
      },
      getStatus (){
        this.$http.post(commonUrl.listByCommonCodes, ['VendorSettleStatus1','TRADEM4']).then(res => {
          if(res.code === 0) {
            this.statusOptionsArr = res.data && res.data.VendorSettleStatus1 && res.data.VendorSettleStatus1.length ? res.data.VendorSettleStatus1.map((item) => {
              let newItem = {
                id: item.id,
                value: item.code,
                label: item.value
              }
              return newItem
            }) : []
            this.statusOptionsArr.unshift({
              id: -1,
              value: '',
              label: '全部'
            })
            this.typeIdOptions = res.data && res.data.TRADEM4 && res.data.TRADEM4.length ? res.data.TRADEM4.map((item) => {
              let newItem = {
                id: item.id,
                value: +item.code,
                label: item.value
              }
              return newItem
            }) : []
            this.typeIdOptions.unshift({
              value: '',
              label: '全部'
            })
            return
          }
          throw new Error(res.msg);
        }).catch(e => {
          console.log("【对账管理状态】:", e.message)
        })
      },
      getListTotal() {
        let _params = {...this.searchContent}
        // 后台需要，如果用户一个供应商也没有选择，默认传全部供应商编码
        if(!_params.searchSupplierNumberList || _params.searchSupplierNumberList.length <= 0) {
          _params.searchSupplierNumberList = this.vendors.map(item => {
            return item.vendorNo
          })
        }
        this.$http.post(settlementUrl.listTotal, {..._params}).then(res => {
          if(res.code === 0) {
            if(res.data) {
                this.settledAmount = res.data.settledAmount,
                this.settledQty = res.data.settledQty,
                this.totalSettlementAmount = res.data.totalSettlementAmount,
                this.unsettledQty = res.data.unsettledQty
            }else {
                this.settledAmount = '--',
                this.settledQty = '--',
                this.totalSettlementAmount = '--',
                this.unsettledQty = '--'
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {console.log("【列表统计提示】:", e.message || '')})
      },
      selectionChangeHandel({selection}) {
        this.checkedList = [...selection]
      },
      doSearchHandleRequest(firstPage) {
        const { settlementStartDate, settlementEndDate} = this.searchContent
        if( !settlementStartDate || !settlementEndDate ) {
          this.$tip.message('请选择时间！', 'warning')
          return
        }
        let startPayDateTemp = Date.parse(new Date(settlementStartDate.replace(/-/g, '/')))
        let endPayDateTemp = Date.parse(new Date(settlementEndDate.replace(/-/g, '/')))
        if(startPayDateTemp > endPayDateTemp) {
          this.$tip.message('结算结束时间不能早于开始时间！', 'warning')
          return 
        }
        this.loading = true;
        if (firstPage) {
          this.pageNum = 1
        }
        let _params = {
          ...this.searchContent,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        // 后台需要，如果用户一个供应商也没有选择，默认传全部供应商编码
        if(!_params.searchSupplierNumberList || _params.searchSupplierNumberList.length <= 0) {
          _params.searchSupplierNumberList = this.vendors.map(item => {
            return item.vendorNo
          })
        }
        this.$http.post(settlementUrl.settlementList, {..._params}).then(res => {
          this.loading = false
          if(res.code === 0) {
            let tableDataListTemp = res.data && res.data.settlementList && res.data.settlementList.length ? res.data.settlementList : []
            let tableDataList = tableDataListTemp.map((item, index) => {
              item.index = index + 1;
              if(item.settlementStartDate && item.settlementEndDate) {
                item.accountPeriod = `${item.settlementStartDate}至${item.settlementEndDate}`
              }else if(item.settlementStartDate) {
                item.accountPeriod = `${item.settlementStartDate}至--`
              }else if(item.settlementEndDate) {
                item.accountPeriod = `--至${item.settlementEndDate}`
              }
              item.invoiceAmount = !item.invoiceAmount && item.invoiceAmount !== 0 ? '' : item.invoiceAmount
              item.invoicedAmount = !item.invoicedAmount && item.invoicedAmount !== 0 ? '' : item.invoicedAmount
              return item;
            })
            this.total = res.data && res.data.totalSettlementCount ? res.data.totalSettlementCount : 0
            this.tableData = tableDataList;
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.loading = false
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
      },
      doSearchHandle(params) {
        this.doSearchHandleRequest(params)
        this.getListTotal()
      },
      changeSize(value) {
        this.pageSize = value
        this.doSearchHandleRequest()
      },
      changeCurrent(value) {
        this.pageNum = value
        this.doSearchHandleRequest()
      },
      doExportDataDetailHandel() {
        let settlementNoList = this.checkedList.map(item => {
          return item.settlementNumber
        })
        this.exportLoading = true
        this.$http.post(settlementUrl.export, {settlementNoList}).then(res => {
          this.exportLoading = false
          let createTime = dateFormat('yyyy-MM-dd', Date.parse(new Date()))
          if(res.code === 0) {
            if(res.data && res.data && res.data.result.length) {
              res.data.result.forEach((item, index) => {
                item.index = index + 1
                if(item.startDate && item.endDate) {
                  item.accountPeriod = `${dateFormat('yyyy-MM-dd',item.startDate)}至${dateFormat('yyyy-MM-dd',item.endDate)}`
                }else if(item.startDate) {
                  item.accountPeriod = `${dateFormat('yyyy-MM-dd',item.startDate)}至--`
                }else if(item.endDate) {
                  item.accountPeriod = `--至${dateFormat('yyyy-MM-dd',item.endDate)}`
                }
                item.endDate = dateFormat('yyyy-MM-dd',item.endDate);
                if(item.amount && item.qty) {
                  item.averageUnitPrice = (item.amount / item.qty).toFixed(2)
                }else {
                  item.averageUnitPrice = ""
                }
              })
              const tHeader = objectToArray(this.exportConfigForDetail, false)
              const filterVal = objectToArray(this.exportConfigForDetail, true)
              exportExcel.ExportJsonToExcel({
                header: tHeader,
                filterVal,
                data: res.data.result,
                filename: `本来鲜结算数据详细信息_${createTime}.xlsx`
              })
              setTimeout(() => {
                this.$tip.notify('导出成功', 'success', '温馨提示')
              }, 500)
            }else {
              this.$tip.notify('没有查询到可导出数据', 'warning', '系统提示')
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.exportLoading = false;
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
      },
      goDetailPage(row) {
        this.$router.push(`/settlement/${row.settlementNumber}`)
      },
      invoiceHandel(data) {
        const row = {
          cantEdit: data.status === 3 || false,
          settlementNo: data.settlementNumber,
          startDate: data.settlementStartDate,
          endDate: data.settlementEndDate,
          statusNameForVendor: data.statusName,
          invoiceAmount: data.shoudInvoiceMoney,
          invoicedAmount: data.havedInvoiceMoney,
          invoiceBatchNumber: data.invoiceBatchNumber || '',
        }
        this.$refs.invoiceDialog.setDefaultMsg(row)
      }
    }
  }
</script>