<style scoped lang="less">
.pt4 {
  padding-top: 4px !important;
}
</style>
<template>
  <div class="main-wrapper pt4">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="按报价单查看" name="first">
        <look-by-price ref = "lookByPrice"/>
      </el-tab-pane>
      <el-tab-pane label="按商品查看" name="second">
        <look-by-goods ref = "lookByGoods"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import LookByPrice from './LookByPrice'
  import LookByGoods from './LookByGoods'
  export default {
    components: {
      LookByGoods,
      LookByPrice
    },
    data() {
      return {
        activeName: 'first'
      }
    },
    mounted() {
      if(this.$refs.lookByPrice) this.$refs.lookByPrice.doSearchHandle(true)
      if(this.$refs.lookByGoods) this.$refs.lookByGoods.doSearchHandle(true)
    },
    activated() {
      if(this.researchMap[this.$route.path]) {
        if(this.activeName === 'first') {
          if(this.$refs.lookByPrice) this.$refs.lookByPrice.doSearchHandle()
        }else {
          if(this.$refs.lookByGoods) this.$refs.lookByGoods.doSearchHandle()
        }
        this.$jump.researched(this.$route.path)
      }
    },
    computed: {
      ...mapGetters({
        researchMap: 'research/RESEARCH_MAP'
      })
    }
  }
</script>