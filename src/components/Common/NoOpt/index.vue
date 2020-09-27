<style>
  .noopt-wraper {
    width: 100%;
    height: 100%;
  }
  .noopt-wrap {
    width: 142px;
    height: 142px;
    background: url('/shop/static/noopt.png') center center no-repeat;
    background-size: 100%;
    position: absolute;
    top: 40%;
    left: 50%;
    margin-top: -71px;
    margin-left: -71px;
  }
  .noopt-tip {
    width: 200px;
    text-align: center;
    font-size: 16px;
    color: #B1B1B1;
    line-height: 26px;
    position: absolute;
    bottom: -30px;
    left: -22px;
    box-sizing:border-box;
  }
</style>

<template>
  <div class="noopt-wraper">
    <div class="noopt-wrap">
      <div class="noopt-tip">
        您没有当前页面的访问权限
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>
