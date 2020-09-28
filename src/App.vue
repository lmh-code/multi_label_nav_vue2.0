<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // 检测浏览器版本
    if(!window.localStorage || !window.sessionStorage) {
      this.$notify({
        title: '警告',
        message: '浏览器版本过低，请升级浏览器！',
        type: 'warning'
      })
    }
  }
}
</script>

<style>
  @import "./assets/style/common.css";
  #app {
    font-family: 'microsoft yahei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #666;
    background-color: #f5f5f5;
  }
</style>
