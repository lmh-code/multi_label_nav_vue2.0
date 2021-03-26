<style lang="less" scoped>
  @import './detail.less';
</style>
<template>
  <div>
    <div class="handel-wraper">
      <el-button type="primary" 
        size="mini" 
        icon="el-icon-printer"
        @click="doPrintHandle" 
        >打印</el-button>
    </div>
    <div class="search-form-wraper pr">
      <div class="tow-row">
        <div class="left">
          <div class="row-item">
            <div class="f1">仓库：{{orderMsg.storeName || '--'}}</div>
            <div class="f1">订单编号：{{orderMsg.paperNo}}</div>
          </div>
          <div class="row-item">
            <div class="f1">联系人: {{orderMsg.createUserName || '--'}}</div>
            <div class="f1">联系电话: {{orderMsg.userPhone || '--'}}</div>
          </div>
          <div class="row-item">
            <div class="f1">单据时间: {{orderMsg.createTime || '--'}}</div>
            <div class="f1">期望送达时间: {{orderMsg.expectDate || '--'}}</div>
          </div>
        </div>
        <div class="right">
          <bar-code :barCodeMsg="paperNo"/>
        </div>
        <div class="status-tag">{{orderMsg.tagName}}</div>
      </div>
      <div class="tow-row">备注：{{orderMsg.remark}}</div>
    </div>
    <div class="table-wraper">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="商品汇总" name="first">
          <!-- <div class="search-form-wraper np-tb">
            <el-form :model="searchContent" label-position="top">
              <el-form-item label="货号">
                <el-input 
                  v-model.trim="searchContent.vendorGoodsNo" 
                  size="small" 
                  class="search-input" 
                  placeholder="请输入货号"
                  clearable></el-input>
              </el-form-item>
              <el-form-item label="商品条码">
                <el-input 
                  v-model.trim="searchContent.barcode" 
                  size="small" 
                  class="search-input" 
                  placeholder="请输入商品条码"
                  clearable></el-input>
              </el-form-item>
              <el-form-item label="商品编码">
                <el-input 
                  v-model.trim="searchContent.erpGoodsNo" 
                  size="small" 
                  class="search-input" 
                  placeholder="请输入商品编码"
                  clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getOrderSum" size="mini">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="getOrderSum('export')" size="mini" :loading="exportLoading">导出</el-button>
              </el-form-item>
            </el-form>
          </div> -->
          <bl-table
            :loading="loading"
            :border="false"
            :selection="false"
            :dataSource="orderSumTableData"
            :columns="orderSumTableColumn" />
        </el-tab-pane>
        <el-tab-pane label="门店明细" name="second">
          <!-- <div class="search-form-wraper np-tb">
            <el-form :model="searchStoreGoodsContent" label-position="top">
              <el-form-item label="门店">
                <el-input 
                  v-model.trim="searchStoreGoodsContent.pickStoreNo" 
                  size="small" 
                  class="search-input" 
                  placeholder="请输入门店名称"
                  clearable></el-input>
              </el-form-item>
              <el-form-item label="货号">
                <el-input 
                  v-model.trim="searchStoreGoodsContent.vendorGoodsNo" 
                  size="small" 
                  class="search-input" 
                  placeholder="请输入货号"
                  clearable></el-input>
              </el-form-item>
              <el-form-item label="商品条码">
                <el-input 
                  v-model.trim="searchStoreGoodsContent.barcode" 
                  size="small" 
                  class="search-input" 
                  placeholder="请输入商品条码"
                  clearable></el-input>
              </el-form-item>
              <el-form-item label="商品编码">
                <el-input 
                  v-model.trim="searchStoreGoodsContent.erpGoodsNo" 
                  size="small" 
                  class="search-input" 
                  placeholder="请输入商品编码"
                  clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getStoreDetail" size="mini">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="getStoreDetail('export')" size="mini" :loading="exportLoading">导出</el-button>
              </el-form-item>
            </el-form>
          </div> -->
          <bl-table
            :loading="loading"
            :border="false"
            :selection="false"
            :dataSource="storeGoodsTableData"
            :columns="storeGoodsTableColumn" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <rem-column
      ref="remColumn"
      title="打印信息确认"
      moduleId="con_order"
      :options="checkedColumnOptions"
      :default="defaultChecked"
      @confirm="successHandel" />
  </div>
</template>
<script>
import detailMixin from '../../BuyAndSale/Order/mixin/detailAndReject'
import RemColumn from '@/module/component/RemColumn'
export default {
  mixins: [detailMixin],
  data() {
    return {
      activeName: 'first',
      storeGoodsTableData: [],
      checkedColumnOptions: ['货号', '商品条码', '商品编码', '商品名称', '单位', '规格', '订单金额', '订货数量', '件数', '订货单价', '件单价', '发货数量', '收货数量'],
      defaultChecked: ['货号', '商品条码', '商品编码', '商品名称', '单位', '规格', '订单金额', '订货数量', '订货单价', '发货数量', '收货数量']
    }
  },
  components: {
    "rem-column": RemColumn
  },
  methods: {
    doPrintHandle() {
      if(this.$refs.remColumn) this.$refs.remColumn.setDefaultMsg()
    },
    successHandel() {
      this.$router.push(`/con_order/print/${this.paperNo}/${this.storeNo}`)
    }
  }
}
</script>