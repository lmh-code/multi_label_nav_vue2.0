<style scoped lang="less">
.pt4 {
  padding-top: 4px !important;
}
.last-time-wraper {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 46px;
  .pr20 {
    padding-right: 20px;
  }
}
</style>
<template>
  <div class="main-wrapper pt4">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="汇总" name="first">
        <goods-sum ref = "goodsSum" @setLatestTime="setFirstLatestTime"/>
      </el-tab-pane>
      <el-tab-pane label="门店汇总" name="second">
        <store-goods-sum ref = "storeGoodsSum" @setLatestTime="setSecondLatestTime"/>
      </el-tab-pane>
    </el-tabs>
    <div class="last-time-wraper">
      <span class="pr20">数据更新时间：{{activeName === 'first' ? firstLatestTime : secondLatestTime}}</span>
      <span>
        <el-popover
          placement="bottom"
          width="320"
          trigger="click"
          title="表格字段说明">
          <div v-if="activeName === 'first'">
            <p>参考毛利额：联营商品的每个门店的销售额减去对应的扣点金额（销售额*门店费率）之和，以每阶段的实际扣点计算；</p>
            <p>销售额：仅显示联营类型的商品销售额；</p>
            <p>销售占比：该商品销售额占总销售额的占比；</p>
          </div>
          <div v-else-if="activeName === 'second'">
            <p>参考毛利额：联营商品的每个门店的销售额减去对应的扣点金额（销售额*门店费率）之和，以每阶段的实际扣点计算；</p>
          </div>
          <span class="el-icon-question" slot="reference">帮助</span>
        </el-popover>
      </span>
    </div>
  </div>
</template>
<script>
  import GoodsSum from './GoodsSum'
  import StoreGoodsSum from './StoreGoodsSum'
  export default {
    components: {
      GoodsSum,
      StoreGoodsSum
    },
    data() {
      return {
        activeName: 'first',
        firstLatestTime: '',
        secondLatestTime: ''
      }
    },
    mounted() {
      if(this.$refs.goodsSum) this.$refs.goodsSum.doSearchHandle(true)
      if(this.$refs.storeGoodsSum) this.$refs.storeGoodsSum.doSearchHandle(true)
    },
    methods: {
      setFirstLatestTime(timeStr) {
        this.firstLatestTime = timeStr
      },
      setSecondLatestTime(timeStr) {
        this.secondLatestTime = timeStr
      }
    }
  }
</script>