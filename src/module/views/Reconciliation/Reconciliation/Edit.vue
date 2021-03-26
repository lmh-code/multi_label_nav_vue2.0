<style lang="less" scoped>
  .mt6 {
    margin-top: 6px;
  }
</style>
<template>
  <div class="main-wrapper">
    <div class="handel-wraper">
      <el-row type="flex" align="bottom" :gutter="20">
        <el-col :span='10'>收退货单号：{{orderDetail.paperNo}}</el-col>
        <el-col :span='10'>门店/仓库：{{orderDetail.storeName}}</el-col>
      </el-row>
      <el-row type="flex" align="bottom" :gutter="20" class="mt6">
        <el-col :span='10'>收货金额：{{orderDetail.totalAmount}}</el-col>
        <el-col :span='10'>对帐金额：{{orderDetail.reconciliationAmount}}</el-col>
      </el-row>
      <el-row type="flex" align="bottom" :gutter="20" class="mt6">
        <el-col :span='10'>供应商对帐人：{{orderDetail.vReconciliationUserName}}</el-col>
        <el-col :span='10'>供应商对帐时间：{{orderDetail.vReconciliationTime}}</el-col>
      </el-row>
      <el-row type="flex" align="bottom" :gutter="20" class="mt6">
        <el-col :span='10'>本来鲜对帐人：{{orderDetail.reconciliationUserName}}</el-col>
        <el-col :span='10'>本来鲜对帐时间：{{orderDetail.reconciliationDate}}</el-col>
      </el-row>
      <el-row type="flex" align="bottom" :gutter="20" class="mt6">
        <el-col :span='24' v-if="isDispute==='110'">
          争议内容：<span style="color: 'red'">{{orderDetail.disputeText}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="search-form-wraper">
      <el-form :model="searchContent" label-position="top">
        <el-form-item label="商品编码">
          <el-input 
            v-model.trim="searchContent.goodsNo" 
            size="small" 
            class="search-input" 
            placeholder="请输入商品编码"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="条码">
          <el-input 
            v-model.trim="searchContent.barcode" 
            size="small" 
            class="search-input" 
            placeholder="请输入条码"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="货号">
          <el-input 
            v-model.trim="searchContent.vendorGoodsNo" 
            size="small" 
            class="search-input" 
            placeholder="请输入货号"
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getGoodsList" size="mini">搜索</el-button>
        </el-form-item>
      </el-form>
      <bl-table
        :loading="loading"
        :border="false"
        :dataSource="tableData"
        :columns="columns" />
      <hr class="s-slip-tb">
      <el-button type="primary" size="small" @click="doEditHandel" :disabled="isDisabled" :loading="isDisabled">提交</el-button>
      <el-button size="small" @click="doCancelHandel">关闭</el-button>
    </div>
  </div>
</template>
<script>
import optionsMixin from '@/module/mixin/options'
import detailMixin from './mixin/detail'
import constUtil from '@/utils/constant'
import requestUrl from '@/module/api/reconciliation'
export default {
  mixins: [optionsMixin, detailMixin],
  data() {
    return {
      isDisabled: false
    }
  },
  methods: {
    doEditHandel() {
      let paperNo = this.paperNo
      let storeNo = this.storeNo
      let goodsReqListTemp = this.tableData.filter(item => {
        return item.disputePrice || item.disputePrice === '0' || item.disputeQty || item.disputeQty === '0' || item.remarks
      })
      if(goodsReqListTemp.length === 0) {
        this.$tip.message("请填写争议内容!", "warning")
        return
      }else {
        for(let item of goodsReqListTemp) {
          if(item.disputePrice && !constUtil.salePriceReg.test(item.disputePrice)) {
            this.$tip.message("争议单价只允许为大于等于0的数字 (保留两位小数)!", "warning")
            return
          }
          if(item.disputeQty && !constUtil.salePriceReg.test(item.disputeQty)) {
            this.$tip.message("争议单价只允许为大于等于0的数字 (保留两位小数)!", "warning")
            return
          }
          if(item.remarks && item.remarks.length > 50) {
            this.$tip.message("备注：最多允许填写50个字!", "warning")
            return
          }
        }
      }
      let params = {
        paperNo: paperNo,
        storeNo: storeNo,
        goodsReqList: goodsReqListTemp.map(item => {
          return {
            goodsNo: item.goodsNo,
            disputePrice: item.disputePrice,
            disputeQty: item.disputeQty,
            remarks: item.remarks
          }
        })
      }
      this.isDisabled = true
      this.$http.post(requestUrl.updateDispute, {...params}).then(res => {
        this.isDisabled = false
        if(res.code === 0) {
          this.$tip.message("发起争议成功!", "success")
          // 设置列表页重新获取数据状态
          this.editSuccessHandel('/reconciliation')
          this.closePage(`/reconciliation/detail/detail/${this.storeNo}/${this.paperNo}/110`)
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.isDisabled = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    doCancelHandel() {
      this.closePage('/reconciliation')
    }
  }
}
</script>