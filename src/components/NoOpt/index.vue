<style scoped>
@import '../../assets/style/tip.css';
</style>

<template>
  <div class="tip-wrap">
    <img :src="imgUrl" alt="">
    <div class="tip-text">
      您没有当前页面的访问权限
    </div>
  </div>
</template>

<script>
import config from '@/utils/config';
export default {
  data() {
    return {
      imgUrl: `${config.baseRouter}/static/noopt.png`
    }
  }
}
</script>
