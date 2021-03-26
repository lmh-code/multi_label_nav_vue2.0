<style lang="less" scoped>
  @import './detail.less';
</style>
<template>
  <div>
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
    <!-- <div class="search-form-wraper">
      <el-form :model="searchContent" label-position="top">
        <el-form-item label="货号">
          <el-input 
            v-model.trim="searchContent.vendorGoodsNo" 
            size="small" 
            class="search-input" 
            placeholder="请输入货号"
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
    <div class="table-wraper">
      <bl-table
        :loading="loading"
        :border="false"
        :selection="false"
        :dataSource="orderSumTableData"
        :columns="orderSumTableColumn" />
      <div>
        <hr class="s-slip-tb">
        <el-button type="primary" size="small" @click="doEditHandel" :disabled="isDisabled" :loading="isDisabled">提交</el-button>
        <el-button size="small" @click="doCancelHandel">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import optionsMixin from '@/module/mixin/options'
  import detailAndRejectMinin from './mixin/detailAndReject'
  import requestUrl from '@/module/api/buyAndSale'
  import constant from '@/utils/constant'
  export default {
    mixins: [detailAndRejectMinin, optionsMixin],
    data() {
      return {
        isDisabled: false
      }
    },
    methods: {
      doCancelHandel() {
        this.closePage('/order_mgt')
      },
      doEditHandel() {
        let paperNo = this.paperNo
        
        let goodsReqListTemp = this.orderSumTableData.filter(item => {
          return item.vendorPrice || item.vendorPrice === '0' || item.vendorQty || item.vendorQty === '0' || item.vendorRemark // 新接口其实已经没有vendorPrice和vendorQty返回了
        })
        if(goodsReqListTemp.length === 0) {
          this.$tip.message('请填写拒绝接单原因!', 'warning')
          return
        }else {
          for(let item of goodsReqListTemp) {
            // if(item.vendorPrice && !constant.salePriceReg.test(item.vendorPrice)) {
            //   this.$tip.message('可订单价只允许为大于等于0的数字 (保留两位小数)!', 'warning')
            //   return
            // }
            // if(item.vendorQty && !constant.salePriceReg.test(item.vendorQty)) {
            //   this.$tip.message('可订数量只允许为大于等于0的数字 (保留两位小数)!', 'warning') 
            //   return
            // }
            if(item.vendorRemark && item.vendorRemark.length > 50) {
              this.$tip.message('备注：最多允许填写50个字!', 'warning')
              return
            }
          }
        }
        let params = {
          paperNo: paperNo,
          orderRefuseDetailReqs: goodsReqListTemp.map(item => {
            return {
              id: item.id,
              erpGoodsNo: item.erpGoodsNo,
              vendorPrice: item.vendorPrice,
              vendorQty: item.vendorQty,
              vendorRemark: item.vendorRemark
            }
          })
        }
        this.isDisabled = true
        this.$http.post(requestUrl.refuseOrder, {...params}).then(res => {
          this.isDisabled = false
          if(res.code === 0) {
            this.$tip.message('拒绝接单成功!', 'success')
            this.editSuccessHandel('/order_mgt')
            this.closePage(`/order_mgt/detail/001/${paperNo}/${this.storeNo}`)
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.isDisabled = false
          this.$tip.notify(e.message || '', 'error', '系统提示')
        }) 
      }
    }
  }
</script>