<style lang="less" scoped>
  @import "../../assets/style/login.less";
  .dd-login-wrap {
    display: flex;
    flex-direction: row; 
    align-items: center;
    justify-content: center; 
    height: 300px;
  }
</style>

<template>
  <div class="login-wraper">
    <img :src="loginBgUrl" alt="" width="100%" height="100%">
    <div class="login-form-box">
      <div class="form-title">本来鲜-{{sysName}}</div>
      <div class="form-title-line"></div>
      <!-- 二维码框 -->
      <div id="loginContainer" class="dd-login-wrap" v-loading="loading"></div>
      <!-- 更多登录功能 -->
      <login-form-footer />
    </div>
    <img class="logo-wrap" :src="logoUrl" alt="">
    <!-- 页面底部备案 -->
    <login-footer/>
  </div>
</template>

<script>
import commonAjaxHandel from '@/server/Common'
import commonApi from '@/api/Common'
import config from '@/utils/config'
import Storage from '@/utils/localStorage'
import LoginFormFooter from './components/LoginFormFooter'
import LoginFooter from './components/LoginFooter'
import loginMixin from './mixin/login'
export default{
  mixins: [loginMixin],
  components: {
    "login-form-footer": LoginFormFooter,
    "login-footer": LoginFooter
  },
  data() {
    return {
      appid: '',
      loading: false
    }
  },
  created() {
    if(!config.loginTypeIncludes.includes('dd')) {
      this.$router.replace('/login')
      return
    }
  },
  mounted() {
    let scr = document.createElement('script');
    scr.type = 'text/javascript';
    scr.src = 'https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js'; 
    document.body.appendChild(scr);
    this.getCode();
  },
  methods: {
    getCode() {
      this.loading = true
      this.$http.post(commonApi.qrParams, {urlType: 1}).then(res => {
        if(res) {
          this.loading = false
          this.appid = res
          let protocol = window.location.protocol
          let str = '//'
          let host = window.location.host
          let pathName = `${config.baseRouter}/logining`
          let url = `${protocol}${str}${host}${pathName}`
          let goto = encodeURIComponent(`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`)
          let obj = DDLogin({
            id: 'loginContainer',
            goto: goto, // goto这里需要对url整体做一个urlencode编码
            style: 'border:none;background-color: #FFFFFF;',
            width: '320',
            height: '300'
          })
          let box = document.getElementById('loginContainer')
          box.querySelector('iframe').style.position = 'relative'
          box.querySelector('iframe').style.top = '-18px'
          let that = this
          let handleMessage = function (event) {
            let origin = event.origin;
            if (origin == "https://login.dingtalk.com") { //判断是否来自ddLogin扫码事件。
              let loginTmpCode = event.data;
              //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
              let urlCode = `${url}?code=${loginTmpCode}`
              let urlInfo = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${that.appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${urlCode}&loginTmpCode=${loginTmpCode}`
              window.location.replace(urlInfo)
            }
          };
          if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('message', handleMessage, false);
          } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', handleMessage);
          }
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        console.log("获取钉钉扫码登录参数：", e.message);
      })
    }
  }
}
</script>
