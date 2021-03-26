<template>
  <div class="print-page">
    <printer-panel 
      :showDesign="true" 
      :isWebPrint="true"
      @windowPrint="windowPrintHandel"></printer-panel>
    <div class="print-content" ref="printContent">
      <div class="print-header">
        <h3 style="text-align: center; fontWeight: 700; fontSize: 18;">本来鲜供应商送货单</h3>
        <h4 style="text-align: center; fontWeight: 700; fontSize: 16; paddingBottom: 10px;">供应商名称：{{orderMsg.vendorName}}</h4>
        <el-row :gutter="5">
          <el-col :span="17">
            <el-row>
              <el-col :span="12">
                <span>订单编号：{{orderMsg.paperNo}}</span>
              </el-col>
              <el-col :span="12">
                <span>订货日期: {{orderMsg.createTime || '--'}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span>订货门店/仓库：{{orderMsg.storeName || '--'}}</span>
              </el-col>
              <el-col :span="12">
                <span>所在地址: {{orderMsg.address || '--'}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span>订货人/电话: {{orderMsg.createUserName || '--'}}/{{orderMsg.userPhone || '--'}}</span>
              </el-col>
              <el-col :span="12">
                <span>期望送达时间: {{orderMsg.expectDate || '--'}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>备注: {{orderMsg.remark || '--'}}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="7" style="padding-left:10px;">
            <bar-code :barCodeMsg="paperNo"/>
            <div style="position: relative; top: -10px;">本来鲜小程序扫码快速收货</div>
          </el-col>
        </el-row>
      </div>
      <print-table 
        v-loading="loading"
        class="print-table" 
        :pages="false"
        :propsList="propsList" 
        :tableData="orderSumTableData"/>
      <div class="print-footer">
        <el-row :gutter="5">
          <el-col :span="8">
            <span>收货人(签字): </span>
          </el-col>
          <el-col :span="8">
            <span>收货审核人(签字): </span>
          </el-col>
          <el-col :span="8">
            <span>供应商(签字): </span>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="8">
            <span>打印人: {{userName}}</span>
          </el-col>
          <el-col :span="8">
            <span>打印时间: {{currentTime}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="24">
            <span>注意：必须有收货人签字，并加盖收货专用章后方为有效结账凭证。</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import {dateFormat} from '@/utils/utils'
import PrintTable from '@/components/Common/Print/PrintTable'
import PrinterPanel from '@/components/Common/Print/PrinterPanel'
import detailAndRejectMinin from './mixin/detailAndReject'
import commonUrl from '@/module/api/common'
import winPrinter from '@/utils/winPrinter';
export default {
  mixins: [detailAndRejectMinin],
  data() {
    return {
      propsList: [],
      userName: '',
      currentTime: dateFormat('yyyy-MM-dd HH:mm:ss', new Date().getTime())
    }
  },
  mounted() {
    this.userName = this.$storage.get('loginInfo') ? this.$storage.get('loginInfo').userNickname || this.$storage.get('loginInfo').userName : ''
    this.getTableColumn()
  },
  methods: {
    getTableColumn() {
      this.$loading.show()
      this.$http.post(`${commonUrl.moduleIdDetail}order_mgt`).then(res => {
        this.$loading.hide()
        if(res.code === 0) {
          let tableColumn = [...this.orderSumTableColumn]
          tableColumn.push({
            title: '发货数量',
            dataIndex: 'no',
          })
          let defaultChecked = res.data && res.data.text ? res.data.text.split(',') : ['货号', '商品条码', '商品编码', '商品名称', '单位', '规格', '订单金额', '订货数量', '订货单价', '发货数量', '收货数量']
          let realPropsList = []
          tableColumn.forEach(item => {
            if(defaultChecked.includes(item.title)) {
              realPropsList.push(item)
            }
          })
          this.propsList = realPropsList.map(item => {
            return {
              name: item.title,
              props: item.dataIndex
            }
          })
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.$loading.hide()
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    windowPrintHandel() {
      this.currentTime = dateFormat('yyyy-MM-dd HH:mm:ss', new Date().getTime())
      winPrinter(this.$refs.printContent)
    }
  },
  components: {
    'printer-panel': PrinterPanel,
    'print-table': PrintTable
  }
}
</script>