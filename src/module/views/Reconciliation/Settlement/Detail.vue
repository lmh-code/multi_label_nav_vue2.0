<template>
  <div class="detail-box" v-loading="loading">
    <el-row class="button-size">
      <el-button size="small" :disabled="disabledInvoice" icon="el-icon-tickets" @click="showDialog">开发票</el-button>
      <el-button icon="el-icon-edit"  @click="showDialog('edit')" :disabled="cantEdit||invoiceVoDis"  size="small">编辑发票</el-button>
      <el-button icon="el-icon-refresh-left" @click="doCancelHandel" size="small" :disabled="cantEdit||invoiceVoDis" >撤回发票</el-button>
      <el-popover v-if="filePopContent"
        placement="top-start"
        width="400"
        trigger="hover">
        <div v-html="filePopContent"></div>
        <el-button slot="reference" size="small" :disabled="!filePopContent">下载附件</el-button>
      </el-popover>
      <el-button v-else size="small" :disabled="!filePopContent">下载附件</el-button>
      <el-button type="primary" icon="el-icon-printer" @click="goPrint" size="small">打印</el-button>
      <el-button type="primary" @click="doExortHandel('结算单单据明细', 'reconciliationColumns', 'reconciliationVoList')" size="small" :disabled="!reconciliationVoList.length">导出单据</el-button>
      <el-button type="primary" @click="doExortHandel('结算单商品明细', 'goodsColumns', 'goodsList')" size="small" :disabled="!goodsList.length">导出商品</el-button>
    </el-row>
    <el-row class="settlement-detail">
      <el-row class="mt-5">
        <el-col :span="6">结算单号：{{settlementNo}}</el-col>
        <el-col :span="6">结算主体：{{settlement.accountName}}</el-col>
        <el-col :span="6">供应商名称：{{settlement.supplierName}}</el-col>
        <el-col :span="6">单据状态：{{settlement.statusName}}</el-col>
      </el-row>
      <el-row class="mt-5">
        <el-col :span="6">创建时间：{{settlement.addTime}}</el-col>
        <el-col :span="6">类型：{{settlement.cooperationModeName}}</el-col>
        <el-col :span="6">账期：{{settlement.settlementStartDate}}至{{settlement.settlementEndDate}}</el-col>
        <el-col :span="6">应结算日：{{settlement.settlementEndDate}}</el-col>
      </el-row>
      <el-row class="mt-5">
        <el-col :span="6">单据金额：￥{{ioOrderTotalMoney}}</el-col>
        <el-col :span="6">费用金额：￥{{chargeAmount}}</el-col>
        <el-col :span="6">应结金额：￥{{settlement.shouldPay}}</el-col>
        <el-col :span="6">应开票金额：￥{{settlement.shoudInvoiceMoney}}</el-col>
      </el-row>
      <el-row class="mt-5">
        <el-col :span="6">已开票金额：￥{{settlement.havedInvoiceMoney}}</el-col>
      </el-row>
      <el-col class="mt-5" :span="24">备注：{{settlement.remark}}</el-col>
    </el-row>
    <el-tabs type="card" v-model="activeTabName" class="search-form-wraper">
      <el-tab-pane label="单据" :key="0" name="first" v-if="typeCooperationMode==1">
        <bl-table
        :loading="loading"
        :border="false"
        :dataSource="reconciliationVoList"
        :columns="reconciliationColumns"
        :selection="false"
        :showSummary="true"
        :getSummaries="getSummariesOfReceipt"/>
      </el-tab-pane>
      <el-tab-pane label="其他费用" name="second" :key="1">
        <bl-table
        :loading="loading"
        :border="false"
        :dataSource="chargeVoList"
        :columns="chargeColumns"
        :selection="false"
        :showSummary="true"
        :getSummaries="getSummariesOfOther"/>
      </el-tab-pane>
      <el-tab-pane label="商品明细" name="third" :key="2">
        <bl-table
        :loading="loading"
        :border="false"
        :dataSource="goodsList"
        :columns="goodsColumns"
        :selection="false"
        :showSummary="true"
        :getSummaries="getSummariesOfGood"/>
      </el-tab-pane>
      <el-tab-pane label="门店明细" name="fourth" :key="3">
        <bl-table
        :loading="loading"
        :border="false"
        :dataSource="storeList"
        :columns="storeColumns"
        :selection="false"
        :showSummary="true"
        :getSummaries="getSummariesOfStore"/>
      </el-tab-pane>
      <el-tab-pane label="发票明细" name="five" :key="4">
        <bl-table
        :loading="loading"
        :border="false"
        :dataSource="invoiceVoList"
        :columns="invoiceColumns"
        :selection="false"
        :showSummary="true"
        :getSummaries="getSummariesOfInvoice"/>
      </el-tab-pane>
    </el-tabs>
    <invoice-dialog ref="invoiceDialog" @parentsHandel="settlementDetail"></invoice-dialog>
  </div>
</template>
<script>
  import vendorsMixin from '@/module/mixin/getVendors'
  import researchMixin from '@/module/mixin/research'
  import settlementUrl from '@/module/api/settlement'
  import { dateFormat,fixedNum, objectToArray } from '@/utils/utils'
  import InvoiceDialog from '@/module/views/Reconciliation/Settlement/InvoiceDialog'
  import exportExcel from '@/utils/exportExcel'
  export default {
    mixins: [vendorsMixin, researchMixin],
    components: {
      "invoice-dialog": InvoiceDialog
    },
    computed:{
      disabledInvoice() {
        return this.settlement.status !== 2// && this.settlement.status !== 3
      },
      invoiceVoDis() {
        return this.invoiceVoList.length == 0
      }
    },
    data() {
      return {
        settlementNo: this.$route.params.settlementNo || '',
        loading: false,
        settlement: {},
        ioOrderTotalMoney:'',
        chargeAmount: '',
        activeTabName:'first',
        reconciliationColumns: [
          {
            title: '序号',
            dataIndex: 'index',
            width: 60
          },
          {
            title: '订单编号',
            width: 160,
            dataIndex: 'reserveField1',
            router: true,
            newJump: (item) => {
              return `/reconciliation/detail/detail/${item.warehouseNumber}/${item.oldIoOrderNumber}/${item.isDispute ? '110' : '001'}`
            }
          },
          {
            title: '进/退货单号',
            dataIndex: 'oldIoOrderNumber',
            minWidth: 160
          },
          {
            title: '类型',
            dataIndex: 'ioTypeName',
            minWidth: 100
          },
          {
            title: '结算金额',
            dataIndex: 'totalMoney',
            minWidth: 100
          },
          {
            title: '应结算日',
            minWidth: 110,
            dataIndex: 'inOutTimeStr'
          }
        ],
        reconciliationVoList: [], // 单据信息
        chargeColumns: [
          {
            title: '序号',
            dataIndex: 'index',
            width: 60
          },
          {
            title: '单号',
            dataIndex: 'feeNumber',
            minWidth: 120
          },
          {
            title: '费用类型',
            dataIndex: 'feeName',
            minWidth: 90
          },
          {
            title: '收付类型',
            dataIndex: 'settlementTypeName',
            minWidth: 90
          },
          {
            title: '费用金额',
            dataIndex: 'feeMoney',
            minWidth: 90
          },
          {
            title: '类型',
            dataIndex: 'taxReceipt',
            minWidth: 90
          },
          {
            title: '应结算日',
            dataIndex: 'happenTime',
            minWidth: 100
          },
          {
            title: '备注',
            dataIndex: 'remarks',
            minWidth: 120
          }
        ],
        chargeVoList: [], // 费用信息
        goodsColumns: [
          {
            title: '序号',
            dataIndex: 'index',
            width: 60
          },
          {
            title: '商品名称',
            dataIndex: 'productName',
            minWidth: 100
          },
          {
            title: '商品编码',
            dataIndex: 'productNumber',
            minWidth: 90
          },
          {
            title: '货号',
            dataIndex: 'vendorGoodsNo',
            minWidth: 90
          },
          {
            title: '商品条码',
            dataIndex: 'barcode',
            minWidth: 110
          },
          {
            title: '规格',
            dataIndex: 'invoiceCreateMan',
            minWidth: 80
          },
          {
            title: '平均单价',
            dataIndex: 'inPrice',
            minWidth: 90
          },
          {
            title: '税率',
            dataIndex: 'inTax',
            minWidth: 80
          },
          {
            title: '数量',
            dataIndex: 'num',
            minWidth: 80
          },
          {
            title: '参考结算金额',
            dataIndex: 'productMoney',
            minWidth: 100
          }
        ],
        goodsList: [], // 商品明细
        storeColumns: [
          {
            title: '序号',
            dataIndex: 'index',
            width: 60
          },
          {
            title: '门店',
            minWidth: 170,
            dataIndex: 'storeNo'
          },
          {
            title: '参考结算金额',
            minWidth: 100,
            dataIndex: 'productMoney'
          }
        ],
        storeList: [], // 门店明细
        invoiceColumns: [
          {
            title: '序号',
            dataIndex: 'index',
            width: 60
          },
          {
            title: '种类',
            dataIndex: 'inoviceTypeName',
            minWidth: 90
          },
          {
            title: '开票人',
            dataIndex: 'createUserName',
            minWidth: 80
          },
          {
            title: '开票日期',
            dataIndex: 'invoiceTimeDate',
            minWidth: 100
          },
          {
            title: '发票代码',
            dataIndex: 'invoiceCode',
            minWidth: 80
          },
          {
            title: '发票号',
            dataIndex: 'invoiceNumber',
            minWidth: 100
          },
          {
            title: '价税合计',
            dataIndex: 'invoiceMoney',
            minWidth: 100
          },
          {
            title: '金额（未税）',
            dataIndex: 'noTaxMoney',
            minWidth: 120
          },
          {
            title: '税额',
            dataIndex: 'taxMoney',
            minWidth: 90
          },
          {
            title: '税率汇总信息',
            minWidth: 200,
            dataIndex: 'inTax'
          },
          {
            title: '备注',
            dataIndex: 'remark',
            minWidth: 120
          },
          // {
          //   title: '操作',
          //   fixed: 'right',
          //   width: 180,
          //   operation: [{
          //     label: '编辑',
          //     icon: 'el-icon-edit',
          //     clickFunc: this.showInvoiceDetail,
          //     isDisabled: () => {
          //       return this.cantEdit
          //     }
          //   },{
          //     label: '下载附件',
          //     icon: 'el-icon-download',
          //     isDisabled: ()=> {
          //       return this.filePaths && this.filePaths.length == 0
          //     },
          //     placement:'top-start',
          //     showPopover: true,
          //     content: () => {
          //       return this.filePaths.length>0 ? this.filePaths.map((item,index)=>{
          //         return `<p>附件${index+1}:<a href='${item}' target='_block'>${item}</a></p>`
          //       }).join('') : ''
          //     }
          //   }]
          // }
        ],
        invoiceVoList: [], // 发票信息
        cantEdit: false,
        filePaths: [],
        storeNo: '',
        typeCooperationMode: '',
        filePopContent: ''
      }
    },
    created() {
      this.settlementDetail()
    },
    methods: {
      settlementDetail() {
        this.loading = true;
        this.$http.post(`${settlementUrl.settlementDetail}/${this.settlementNo}`).then(res => {
          this.loading = false;
          if(res.code === 0 && res.data) {
            const { settlement, purchaseIOOrderDOList, feeList, productSummaryList, storeSummaryList, invoiceList, batchVO, ioOrderTotalMoney } = res.data;
            this.settlement = settlement;
            this.ioOrderTotalMoney = ioOrderTotalMoney
            this.batchVO = batchVO
            let filePaths = (batchVO && batchVO.invoiceFiles || [])
            this.filePopContent = filePaths.length>0 ? filePaths.map((item,index)=>{
              return `<p>附件${index+1}:<a href='${item}' target='_block'>${item}</a></p>`
            }).join('') : ''
            // 单据列表
            this.typeCooperationMode = settlement.cooperationMode
            this.reconciliationVoList = purchaseIOOrderDOList && purchaseIOOrderDOList.map((item,index)=>{
              item.index = index + 1;
              return item
            }) || []
            //其他费用
            this.chargeVoList = feeList && feeList.length > 0 ? feeList.map((item,index) =>{
              item.index = index + 1;
              item.taxReceipt = item.taxReceipt ? '票扣' : '非票扣'
              item.happenTime = dateFormat('yyyy-MM-dd', item.happenTime)
              return item
            }): [];
            // 商品明细
            this.goodsList = productSummaryList && productSummaryList.length >0 ? productSummaryList.map((item,index)=>{
              item.index = index + 1,
              item.inPrice = fixedNum(item.inPrice)
              return item
            }): []
            // 门店明细
            this.storeList = storeSummaryList && storeSummaryList.length > 0 ? storeSummaryList.map((item,index)=> {
              item.index = index + 1;
              item.storeNo = `${item.storeCode}${item.storeCode && item.storeName ? '-' : ''}${item.storeName}`
              return item
            }) : []
            // 发票明细
            this.invoiceVoList = invoiceList && invoiceList.length > 0 ? invoiceList.map((item,index)=> {
              item.index = index + 1
              return item
            }) : []
            //发票明细以及判断是否可编辑以及文件列表
            const batchVOList = batchVO
            // 没有发票抬头，或者未审核时，不可编辑。且非已开票未审核状态，不可编辑
            this.cantEdit = (!batchVOList||(batchVOList && batchVOList.status === 0)) ? false : true
            this.storeNo = this.reconciliationVoList&&this.reconciliationVoList.length>0 ? this.reconciliationVoList[0].warehouseNumber : this.storeList&&this.storeList.length>0&&this.storeList[0].storeCode
          }
        }).catch(e => {
          this.loading = false
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
      },
      doExortHandel(filename, configFieldName, data) {
        let exportConfig = this.getConfigFromColumn(this[configFieldName])
        const tHeader = objectToArray(exportConfig, false)
        const filterVal = objectToArray(exportConfig, true)
        exportExcel.ExportJsonToExcel({
          header: tHeader,
          filterVal,
          data: this[data],
          filename
        })
      },
      getConfigFromColumn(columns) {
        let result = {}
        for(let i = 0; i < columns.length; i++) {
          if(!result[columns[i].dataIndex] && columns[i].dataIndex && columns[i].title) {
            result[columns[i].dataIndex] = columns[i].title
          }
        }
        return result
      },
      doCancelHandel() {
        const { invoiceBatchNumber } = this.settlement;
        if(!invoiceBatchNumber) {
          // this.$tip.message('invoiceBatchNumber为空，不可撤回', 'warning')
          console.log('invoiceBatchNumber为空')
          return
        }
        this.$confirm('是否确认撤回？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(settlementUrl.deleteInvoice+ '/' + invoiceBatchNumber).then(res => {
            if(res.code === 0) {
              this.$tip.message('操作成功', 'success')
              this.settlementDetail()
              return
            }
            throw new Error(res.msg);
          }).catch(e => {
            this.$tip.notify(e.message || '', 'error', '系统提示')
          })
        })
      },
      getSummariesOfReceipt(param) {
        const { data } = param;
        const sums = [];
        const values = data.map(item => item.totalMoney)
        sums[4] = fixedNum(values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0));
        sums[0] = '合计'
        return sums
      },
      getSummariesOfOther(param) {
        const { data } = param;
        const sums = [];
        const values = data.map(item => item.feeMoney)
        sums[4] = fixedNum(values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0));
        this.chargeAmount = sums[4]
        sums[0] = '合计'
        return sums
      },
      getSummariesOfGood(param) {
        const { data } = param;
        const sums = [];
        const values = data.map(item => item.productMoney)
        sums[9] = fixedNum(values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0));
        sums[0] = '合计'
        return sums
      },
      getSummariesOfStore(param) {
        const { data } = param;
        const sums = [];
        const values = data.map(item => item.productMoney)
        sums[0] = '合计'
        sums[2] = fixedNum(values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0));
        return sums
      },
      getSummariesOfInvoice(param) {
        const { columns, data } = param;
        const sums = [];
        const list = ['taxMoney','noTaxMoney','invoiceMoney']
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))&&list.includes(column.property)) {
            sums[index] = fixedNum(values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0))
          }
        });
        return sums
      },
      showDialog(type) {
        let invoiceDetailList = []
        if(type === 'edit') {
          invoiceDetailList = (this.invoiceVoList || []).map((item, index) => {
            return {
              lineId: index, // Date.now(), 
              invoiceTypeCode: item.inoviceType,
              invoiceDate: item.invoiceTimeDate,
              invoiceCode: item.invoiceCode,
              invoiceNo: item.invoiceNumber,
              netAmount: item.noTaxMoney,
              taxCode: (item.inTax || item.inTax == 0) ? [item.inTax] : [],
              taxAmount: item.taxMoney,
              amount: item.invoiceMoney
            }
          })
        }
        const header = {
          settlementNo: this.settlementNo,
          startDate: this.settlement.settlementStartDate,
          endDate: this.settlement.settlementEndDate,
          statusNameForVendor: this.settlement.statusName,
          invoiceAmount: this.settlement.shoudInvoiceMoney,
          invoicedAmount: this.settlement.havedInvoiceMoney,
          cantEdit: this.cantEdit,
          invoiceBatchNumber: this.settlement.invoiceBatchNumber || '',
          invoiceDetailList: invoiceDetailList || [],
          filePaths: this.batchVO && this.batchVO.invoiceFiles || [],
          settlement: this.settlement,
          type
        }
        this.$refs.invoiceDialog.setDefaultMsg(header)
      },
      goPrint() {
        this.$router.push(`/settlement/print/${this.storeNo}/${this.settlementNo}`)
      }
    }
  }
</script>
<style scoped>
  .detail-box {
    padding: 10px 0px
  }
  .button-size {
    padding: 10px 0px 10px 10px;
    background-color: #fff;
    margin-bottom: 5px;
  }
  .settlement-detail {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
  }
  .mt-5 {
    margin-top: 5px
  }
</style>
