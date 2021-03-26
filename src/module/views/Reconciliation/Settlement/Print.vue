<template>
  <div class="print-page" v-loading="loading">
    <printer-panel 
      :showDesign="true" 
      :isWebPrint="true"
      @windowPrint="windowPrintHandel"></printer-panel>
    <div class="print-content" ref="printContent">
      <el-row><h2 class="suppler">本来鲜科技有限公司结算单</h2></el-row>
      <el-row class="mt-10"><h4 class="company">{{settlement.supplierName}}</h4></el-row>
      <el-row class="mt-10">
        <el-col :span="6">结算单号：{{settlementNo}}</el-col>
        <el-col :span="6">账期：{{settlement.settlementStartDate}}至{{settlement.settlementEndDate}}</el-col>
        <el-col :span="6">应结算日：{{settlement.settlementEndDate}}</el-col>
        <el-col :span="6">单据状态：{{settlement.statusName}}</el-col>
        <el-col :span="6">应结金额：￥{{settlement.shouldPay}}</el-col>
        <el-col :span="6">应开票金额：￥{{settlement.shoudInvoiceMoney}}</el-col>
        <el-col :span="6">已开票金额：￥{{settlement.havedInvoiceMoney}}</el-col>
        <el-col :span="24">备注：{{settlement.remark}}</el-col>
      </el-row>
      <div class="mt-20">单据：</div>
      <print-table 
        class="print-table" 
        :pages="false"
        :propsList="reconciliationColumns" 
        :tableData="reconciliationVoList"/>
      <div class="mt-10">其他费用：</div>
      <print-table 
        class="print-table" 
        :pages="false"
        :propsList="chargeColumns" 
        :tableData="chargeVoList"/>
      <div class="mt-10">发票明细：</div>
      <print-table 
        class="print-table" 
        :pages="false"
        :propsList="invoiceColumns"
        :tableData="invoiceVoList"/>
      <el-row class="mt-10">
        <el-col :span="6">打印人:{{userName}} </el-col>
        <el-col :span="6">打印时间:{{currentTime}}</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import PrintTable from '@/components/Common/Print/PrintTable'
import PrinterPanel from '@/components/Common/Print/PrinterPanel'
import settlementUrl from '@/module/api/settlement'
import {dateFormat} from '@/utils/utils'
import winPrinter from '@/utils/winPrinter';
export default {
  components: {
    'printer-panel': PrinterPanel,
    'print-table': PrintTable
  },
  data() {
    return {
      settlementNo: this.$route.params.settlementNo || '',
      storeNo: this.$route.params.storeNo || '',
      loading: false,
      currentTime: dateFormat('yyyy-MM-dd HH:mm:ss', new Date().getTime()),
      settlement: {},
      reconciliationVoList: [], // 单据信息
      chargeVoList: [],
      invoiceVoList: [],
      userName:'',
      reconciliationColumns: [
        {
          name: '序号',
          props: 'index'
        },
        {
          name: '订单编号',
          props: 'reserveField1'
        },
        {
          name: '进/退货单号',
          props: 'oldIoOrderNumber'
        },
        {
          name: '类型',
          props: 'ioTypeName'
        },
        {
          name: '结算金额',
          props: 'totalMoney'
        }
      ],
      chargeColumns: [
        {
          name: '序号',
          props: 'index'
        },
        {
          name: '单号',
          props: 'feeNumber'
        },
        {
          name: '费用类型',
          props: 'feeName'
        },
        {
          name: '费用金额',
          props: 'feeMoney'
        },
        {
          name: '类型',
          props: 'taxReceipt'
        }
      ],
      invoiceColumns: [
        {
          name: '序号',
          props: 'index'
        },
        {
          name: '开票日期',
          props: 'invoiceTimeDate'
        },
        {
          name: '发票代码',
          props: 'invoiceCode'
        },
        {
          name: '发票号',
          props: 'invoiceNumber'
        },
        {
          name: '价税合计',
          props: 'invoiceMoney'
        },
        {
          name: '税率汇总信息',
          props: 'inTax'
        }
      ]
    }
  },
  created() {
    this.settlementDetail()
    this.userName = this.$storage.get('loginInfo') ? this.$storage.get('loginInfo').userNickname || this.$storage.get('loginInfo').userName : ''
  },
  methods: {
    windowPrintHandel() {
      this.currentTime = dateFormat('yyyy-MM-dd HH:mm:ss', new Date().getTime())
      winPrinter(this.$refs.printContent)
    },
    settlementDetail() {
      this.loading = true;
      this.$http.post(`${settlementUrl.settlementDetail}/${this.settlementNo}`).then(res => {
        this.loading = false;
        if(res.code === 0 && res.data) {
          const { settlement, purchaseIOOrderDOList, storeSellList, feeList, invoiceList } = res.data;
          this.settlement = settlement;
          // 单据列表
          const typeCooperationMode = settlement.cooperationMode
          this.reconciliationVoList = typeCooperationMode == 1 ? purchaseIOOrderDOList.map((item,index)=>{
            item.index = index + 1;
            return item
          }): storeSellList.map((item,index)=>{
            item.index = index + 1
            return item
          });
          //其他费用
          this.chargeVoList = feeList && feeList.length >0 ? feeList.map((item,index) =>{
            item.index = index + 1;
            item.taxReceipt = item.taxReceipt ? '票扣' : '非票扣'
            item.happenTime = dateFormat('yyyy-MM-dd', item.happenTime)
            return item
          }): [];
          // 发票明细
          this.invoiceVoList = invoiceList && invoiceList.length > 0 ? invoiceList.map((item,index)=> {
            item.index = index + 1
            return item
          }) : []
        }
      }).catch(e => {
        this.loading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    }
  }
}
</script>
<style scoped>
  .suppler {
    text-align: center;
    font-weight: 700;
    font-size: 20px
  }
  .company {
    text-align: center;
    font-weight: 500;
    font-size: 16
  }
  .mt-10 {
    margin-top: 10px
  }
  .mt-20 {
    margin-top: 20px;
  }
</style>
