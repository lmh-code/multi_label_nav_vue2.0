<style lang="less" scoped>
  @import './detail.less';
</style>
<template>
  <div>
    <div class="handel-wraper">
      <el-button type="primary" 
        size="mini" 
        icon="el-icon-printer"
        @click="doPrintHandle">打印</el-button>
    </div>
    <div class="search-form-wraper pr">
      <div class="tow-row">
        <div class="left">
          <div class="row-item">
            <div class="f1">门店/仓库：{{orderMsg.storeName || '--'}}</div>
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
      <div v-if="orderMsg.havePurchaseQty === 1">
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
                  <el-button @click="exportHandel" size="mini" :loading="exportLoading">导出</el-button>
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
                  <el-button type="primary" @click="getStoreDetailJs" size="mini">搜索</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="exportHandel" size="mini" :loading="exportLoading">导出</el-button>
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
      <div v-else>
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
              <el-button @click="exportHandel" size="mini" :loading="exportLoading">导出</el-button>
            </el-form-item>
          </el-form>
        </div> -->
        <bl-table
          :loading="loading"
          :border="false"
          :selection="false"
          :dataSource="orderSumTableData"
          :columns="orderSumTableColumn" />
      </div>
    </div>
    <rem-column
      ref="remColumn"
      title="打印信息确认"
      moduleId="order_mgt"
      :options="checkedColumnOptions"
      :default="defaultChecked"
      @confirm="successHandel" />
  </div>
</template>
<script>
  import detailAndRejectMinin from './mixin/detailAndReject'
  import RemColumn from '@/module/component/RemColumn'
  export default {
    mixins: [detailAndRejectMinin],
    data() {
      return {
        loadingStoreGoods: false,
        activeName: 'first',
        searchStoreGoodsContent: {
          pickStoreNo: '', // 门店
          barcode: '', // 商品条码
          erpGoodsNo: '', // 商品编码
          vendorGoodsNo: '' // 货号
        },
        storeGoodsTableData: [],
        storeGoodsTableDataTemp: [],
        checkedColumnOptions: ['货号', '商品条码', '商品编码', '商品名称', '单位', '规格', '订单金额', '订货数量', '件数', '订货单价', '件单价', '发货数量', '收货数量'],
        defaultChecked: ['货号', '商品条码', '商品编码', '商品名称', '单位', '规格', '订单金额', '订货数量', '订货单价', '发货数量', '收货数量']
      }
    },
    components: {
      RemColumn
    },
    methods: {
      // getStoreDetail() {
      //   this.loadingStoreGoods = true
      //   this.$http.post(requestUrl.storeDetail, {...this.searchStoreGoodsContent, paperNo: this.paperNo, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
      //     this.loadingStoreGoods = false
      //     if(res.code === 0) {
      //       let storeGoodsTableDataList = res.data && res.data.result && res.data.result.length ? res.data.result : []
      //       this.storeGoodsTableData = storeGoodsTableDataList
      //       this.storeGoodsTableDataTemp = storeGoodsTableDataList
      //       return
      //     }
      //     throw new Error(res.msg)
      //   }).catch(e => {
      //     this.loadingStoreGoods = false
      //     this.$tip.notify(e.message || '', 'error', '系统提示')
      //   })
      // },
      // 前端查询门店明细
      getStoreDetailJs() {
        let pickStoreNo = this.searchStoreGoodsContent.pickStoreNo
        let barcode = this.searchStoreGoodsContent.barcode
        let erpGoodsNo = this.searchStoreGoodsContent.erpGoodsNo
        let vendorGoodsNo = this.searchStoreGoodsContent.vendorGoodsNo
        let storeGoodsTableDataTemp = [...this.storeGoodsTableDataTemp]
        debugger
        if(pickStoreNo || barcode || erpGoodsNo || vendorGoodsNo) {
          let filterDataList = storeGoodsTableDataTemp.filter(item => {
            return (item.pickStoreNo && pickStoreNo && item.pickStoreNo.includes(pickStoreNo)) || item.vendorGoodsNo === vendorGoodsNo || item.barcode === barcode || item.goodsNo === erpGoodsNo
          })
          this.storeGoodsTableData = filterDataList
          debugger
        }else {
          this.storeGoodsTableData = storeGoodsTableDataTemp
        }
      },
      doPrintHandle() {
        if(this.$refs.remColumn) this.$refs.remColumn.setDefaultMsg()
      },
      successHandel() {
        this.$router.push(`/order_mgt/print/${this.paperNo}/${this.storeNo}`)
      }
    }
  }
</script>