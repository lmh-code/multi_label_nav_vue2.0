<style lang="less" scoped>
  @import '../../assets/style/tip.less';
</style>

<template>
  <div class="tip-wrap">
    <img :src="imgUrl" alt="">
    <div class="tip-text">
      欢迎使用本来鲜-{{sysName}}
    </div>
  </div>
</template>

<script>
import config from '@/utils/config';
export default {
  data() {
    return {
      imgUrl: `${config.baseRouter}/static/welcome.png`,
      sysName: config.sysName
    }
  },
  created() {
    if(config.homeRouter) this.$router.replace(config.homeRouter)
  }
}
</script>
