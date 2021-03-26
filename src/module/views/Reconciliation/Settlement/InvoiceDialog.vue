<template>
  <el-dialog
    title="发票"
    :visible.sync="dialogVisible"
    width="1080px"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :show-close="false">
    <el-row class="title-box" v-loading ="loading">
      <el-col :span="8">结算单号：{{settlementNo}}</el-col>
      <el-col :span="8">账期：{{startDate}}至{{endDate}}</el-col>
      <el-col :span="8">状态：{{statusNameForVendor}}</el-col>
      <el-col :span="8">应开票金额：￥{{invoiceAmount}}</el-col>
      <el-col :span="8">已开票金额：￥{{invoicedAmount}}</el-col>
      <el-col :span="8">待开票：￥{{canInvoiceAmount}}</el-col>
    </el-row>
    <el-row class="operation-box">
      <el-button type="primary" @click="addLine">添加发票</el-button>
    </el-row>
    <div class="el-dialog-div">
    <template v-if="invoiceDetailList.length">
      <invoice-line
        v-for="(item, index) in invoiceDetailList"
        :key="index"
        :cantEdit="cantEdit"
        :loading="loading"
        :info="item"
        :invoiceTypeCodeOptions="invoiceTypeCodeOptions"
        :taxCodeOptions="taxCodeOptions"
        @deleteInvoiceLine="deleteInvoiceLine"
        @change="handleChange">
      </invoice-line>
    </template>
     </div>
    <el-row class="invoice-total" v-loading ="loading">
      <el-form>
        <el-col :span="24">
          <el-form-item label="总金额:">
            ￥{{totalAmount}}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="附件:">
            <file-upload
              ref="fileUpload" 
              @files-change="setFileList"
              :previewFileList="previewFileList"
              :fileAspectType="['jpg', 'doc', 'png', 'docx', 'pdf', 'jpeg']"
              :maxFilesNum="5"
              :styleObj="uploadStyleObj"
              tipText="限上传5张图片或PDF，单张不可超20MB"/>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="备注:">
            <el-input
              :disabled="cantEdit"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入备注信息"
              v-model="remark">
            </el-input>
          </el-form-item>
        </el-col> -->
      </el-form>
    </el-row>
    <span slot="footer" class="dialog-footer" v-loading ="loading">
      <el-button @click="handleCancel" size="mini">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" size="mini" :disabled="cantEdit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import commonUrl from '@/module/api/common'
import settlementUrl from '@/module/api/settlement'
const salePriceReg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
import { fixedNum } from '@/utils/utils'
import FileUpload from '@/components/Common/File/FileUpload'
import InvoiceLine from './invoiceLine'
export default {
  components: {
    'file-upload': FileUpload,
    'invoice-line': InvoiceLine
  },
  data() {
    return {
      type: '',
      dialogVisible: false,
      settlementNo:'',
      startDate: '',
      endDate: '',
      statusNameForVendor: '',
      invoiceAmount: '',
      invoicedAmount: '',
      invoiceTypeCodeOptions: [],
      taxCodeOptions: [],
      loading: false,
      cantEdit: false,
      id: '',
      // 表单数据
      invoiceTypeCode: 1,
      taxCode: ['0'], //税率
      invoiceDate: '',
      invoiceCode: '',
      invoiceNo: '',
      netAmount: '', //发票金额
      taxAmount: '', //税额
      // remark: '',
      filePaths: [],
      invoiceBatchNumber: '',
      previewFileList: [],
      invoiceDetailList: [],
      totalAmount: '',
      uploadStyleObj: {maxHeight: '120px', overflow: 'auto'}
    }
  },
  computed: {
    canInvoiceAmount() {
      return fixedNum(this.invoiceAmount - this.invoicedAmount)
    }
  },
  methods: {
    addLine() {
      let invoiceDetailList = this.invoiceDetailList
      if(invoiceDetailList && invoiceDetailList.length >= 20) {
        this.$tip.message('最多可开20张发票', 'warning')
        return
      }
      invoiceDetailList.push({
        lineId: Date.now(), 
        invoiceTypeCode: '',
        invoiceDate: '',
        invoiceCode: '',
        invoiceNo: '',
        netAmount: '',
        taxCode: '',
        taxAmount: ''
      })
    },
    deleteInvoiceLine(id) {
      this.invoiceDetailList.some((item, i) => {
        if(id === item.lineId) {
          this.invoiceDetailList.splice(i, 1)
          return true
        }
      })
    },
    handleChange(e) {
      let index = this.invoiceDetailList.findIndex(t => t.lineId === e.lineId)
      this.invoiceDetailList.splice(index, 1, e)
      this.calTotalAmount()
    },
    calTotalAmount() {
      let totalAmount = (this.invoiceDetailList || []).reduce((prev, curr) => {
        let result = (prev.amount || 0) + (curr.amount || 0)
        return {amount:result}
      }, {amount:0}).amount
      this.totalAmount = fixedNum(totalAmount)
    },
    setDefaultMsg(header) {
      this.getCommonCodes()
      this.dialogVisible = true;
      this.settlementNo = header.settlementNo;
      this.startDate = header.startDate;
      this.endDate = header.endDate;
      this.statusNameForVendor = header.statusNameForVendor;
      this.invoiceAmount = header.invoiceAmount;
      this.invoicedAmount = header.invoicedAmount
      this.cantEdit = header.cantEdit || false
      this.id = header.invoiceId
      this.invoiceBatchNumber = header.invoiceBatchNumber || ''
      this.invoiceDetailList = header.invoiceDetailList || []
      this.filePaths = header.filePaths
      this.previewFileList = header.filePaths
      // this.remark = header.remark
      this.settlement = header.settlement
      this.type = header.type
      this.calTotalAmount()
    },
    getCommonCodes() {
      this.$http.post(commonUrl.listByCommonCodes, ['TAX', 'InvoiceType']).then(res => {
        if(res.code === 0) {
          this.invoiceTypeCodeOptions = res.data && res.data.InvoiceType && res.data.InvoiceType.length ? res.data.InvoiceType.map((item) => {
            let newItem = {
              id: item.id,
              value: +item.code,
              label: item.value
            }
            return newItem
          }) : []

          this.taxCodeOptions = res.data && res.data.TAX && res.data.TAX.length ? res.data.TAX.map((item) => {
            let newItem = {
              id: item.id,
              value: item.value,
              label: item.value
            }
            return newItem
          }) : []
          return
        }
        throw new Error(res.msg);
      }).catch(e => {
        console.log("【发票种类和税率】:", e.message)
      })
    },
    handleCancel() {
      this.$confirm('取消操作不保存页面任何数据，是否确定取消？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogVisible = false
      })
    },
    checkLine(line) {
      if(!line.invoiceDate) {
        this.$tip.message('请选择发票日期', 'warning')
        return
      }
      if(!line.invoiceCode) {
        this.$tip.message('请输入发票代码', 'warning')
        return
      }
      if(!line.invoiceNo) {
        this.$tip.message('请输入发票号', 'warning')
        return
      }
      if(!line.netAmount && line.netAmount !== 0) {
        this.$tip.message('请输入发票（不含税）金额', 'warning')
        return
      }else if(!salePriceReg.test(Math.abs(line.netAmount))) {
        this.$tip.message('发票（不含税）金额是小数保留小数点后2位', 'warning')
        return
      }
      if(!line.taxAmount && line.taxAmount !== 0) {
        this.$tip.message('请输入税额', 'warning')
        return
      }else if(!salePriceReg.test(Math.abs(line.taxAmount))) {
        this.$tip.message('税额是小数保留小数点后2位', 'warning')
        return
      }
      if(fixedNum(parseFloat(line.totalAmount)) + parseFloat(fixedNum(line.invoicedAmount)) > fixedNum(parseFloat(line.invoiceAmount))) {
        this.$tip.message('开票金额不可超过应开票金额', 'warning')
        return
      }
      return true
    },
    handleSubmit() {
      let invoiceDetailList = this.invoiceDetailList
      if(!invoiceDetailList || !invoiceDetailList.length) {
        this.$tip.message('发票信息不可为空', 'warning')
        return
      }
      for(let i = 0; i < invoiceDetailList.length; i++) {
        if(!this.checkLine(invoiceDetailList[i])) return
      }
      if(this.totalAmount > this.invoiceAmount) { // 编辑时，发票金额不可大于应开票金额
        this.$tip.message('发票金额不可大于待开金额', 'warning')
        return
      }
      invoiceDetailList = invoiceDetailList.map(item => {
        return {
          invoiceCode: item.invoiceCode,
          invoiceDate: item.invoiceDate,
          invoiceNumber: item.invoiceNo,
          invoiceType: item.invoiceTypeCode,
          inTaxs: item.taxCode.join(','),
          invoiceMoney: item.amount,
          taxMoney: item.taxAmount,
          noTaxMoney: item.netAmount
        }
      })
      this.loading = true;
      let reqUrl = ''
      let _params = {}
      let filePathUrls = this.filePaths && this.filePaths.length ? this.filePaths : [];
      if(this.type === 'edit') {
        // 编辑
        reqUrl = settlementUrl.editInvoice
        _params = {
          filePaths: [...filePathUrls],
          invoiceDetailList,
          accountName: this.settlement.accountName,
          accountSet: this.settlement.accountSet,
          settlementNumbers: this.settlementNo,
          supplierName: this.settlement.supplierName,
          batchNumber: this.invoiceBatchNumber,
          supplierNumber: this.settlement.supplierNumber
        }
      } else {
        // 直接添加
        _params = {
          filePaths: [...filePathUrls],
          settlementNumbers: this.settlementNo,
          batchNumber: this.invoiceBatchNumber,
          invoiceDetailList
        }
        reqUrl = settlementUrl.addInvoice
      }
      this.$http.post(reqUrl, {..._params}).then(res => {
        this.loading = false
        if(res.code === 0) {
          this.$tip.message('提交成功，等待本来鲜财务人员审核！', 'success')
          this.dialogVisible = false
          this.$emit('parentsHandel')
          return 
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    setFileList({filesList, path}) {
      this.filePaths = filesList
    }
  }
}
</script>
<style lang="less" scoped>
.title-box {
  padding: 10px 0px;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 10px;
}
.invoice-form /deep/ .el-form-item--small.el-form-item {
  margin-bottom: 5px; 
}
.invoice-total /deep/ .el-form-item {
  margin-bottom: 2px;
}
.el-dialog-div {
  max-height: 280px;
  overflow: auto;
}
.filt-item-wrap {
  max-height: 160px;
}
.dialog-footer {
  text-align: right;
}
.dialog-footer {
  text-align: right;
}
</style>
