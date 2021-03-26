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
      <el-button size="small" @click="doCancelHandel">关闭</el-button>
    </div>
  </div>
</template>
<script>
import optionsMixin from '@/module/mixin/options'
import detailMixin from './mixin/detail'
export default {
  mixins: [optionsMixin, detailMixin],
  methods: {
    doCancelHandel() {
      this.closePage('/reconciliation')
    }
  }
}
</script>