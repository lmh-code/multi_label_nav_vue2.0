<style lang="less" scoped>
@import '../../assets/style/tip.less';
</style>

<template>
  <div class="tip-wrap">
    <img :src="imgUrl" alt="">
    <div class="tip-text">
      请使用正确路径
    </div>
  </div>
</template>

<script>
import config from '@/utils/config';
export default {
  data() {
    return {
      imgUrl: `${config.baseRouter}/static/error.png`
    }
  }
}
</script>
