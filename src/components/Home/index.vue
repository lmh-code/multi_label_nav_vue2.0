<style>
  .welcome-wrap {
    width: 200px;
    height: 150px;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    margin-top: -75px;
    margin-left: -100px;
  }
  .welcome-wrap>img {
    width: 150px;
    height: 150px;
  }
  .welcome-tip {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #B1B1B1;
    line-height: 26px;
    position: absolute;
    bottom: -30px;
    left: 0;
    box-sizing:border-box;
  }
</style>

<template>
  <div class="welcome-wrap">
    <img :src="imgUrl" alt="">
    <div class="welcome-tip">
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
  }
}
</script>
