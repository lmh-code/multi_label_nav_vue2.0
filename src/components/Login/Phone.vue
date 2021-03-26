<style lang="less" scoped>
  @import "../../assets/style/login.less";
</style>

<template>
  <div class="login-wraper">
    <img :src="loginBgUrl" alt="" width="100%" height="100%">
    <div class="login-form-box">
      <div class="form-title">本来鲜-{{sysName}}</div>
      <div class="form-title-line"></div>
      <el-form :model="loginFormData" ref="loginForm" label-width="0">
        <el-form-item>
          <el-input placeholder="请输入手机号" v-model="loginFormData.username" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
            <template slot="prepend">
              <i class="el-icon-mobile-phone" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" v-model="loginFormData.code" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
            <template slot="prepend">
              <i class="el-icon-key" aria-hidden="true"></i>
            </template>
            <el-button 
              slot="append"
              @click="sendCodeHandel" 
              :disabled="sendLoading"
              :loading="sendLoading">{{ btnStr }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;" class="login-btn" type="primary" @click="submitLoginForm" :disabled="isDisabled" :loading="isDisabled">登 录</el-button>
        </el-form-item>
        <div class="error-tip-box" v-show="isErrorTipShow">{{ this.errorTipMsg }}</div>
        <!-- 更多登录功能 -->
        <login-form-footer />
      </el-form>
    </div>
    <img class="logo-wrap" :src="logoUrl" alt="">
    <!-- 页面底部备案 -->
    <login-footer/>
  </div>
</template>

<script>
import commonAjaxHandel from '@/server/Common'
import config from '@/utils/config'
import Storage from '@/utils/localStorage'
import {checkStr} from '@/utils/validate'
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
      btnStr: '发送验证码',
      account: 90,
      sendLoading: false,
      loginFormData: {
        username: '',
        source: 'basics',
        grant_type: 'password',
        code: ''
      }
    }
  },
  created() {
    if(!config.loginTypeIncludes.includes('phone')) {
      this.$router.replace('/login')
      return
    }
  },
  methods: {
    sendCodeHandel() {
      if(!this.loginFormData.username) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入手机号'
        return
      }else if(!checkStr(this.loginFormData.username, 'phone')) {
        this.isErrorTipShow = true
        this.errorTipMsg = '手机号格式不正确'
        return
      }
      this.sendLoading = true
      commonAjaxHandel.getSmsCodeHandel({phone: this.loginFormData.username}).then(res => {
        if(res) {
          this.sendLoading = false
          let account = this.account
          this.btnStr = `${account}秒`
          let myTimer = setInterval(() => {
            account--
            this.btnStr = `${account}秒`
            if(account < 1) {
              this.btnStr = '重新发送'
              clearInterval(myTimer);
            }
          }, 1000);
          return
        }
        throw new Error("短信发送失败")
      }).catch(e => {
        this.sendLoading = false
        this.isErrorTipShow = true
        this.errorTipMsg = e.message
      })
    },
    submitLoginForm() {
      if(!this.loginFormData.username) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入手机号'
        return
      }else if(!checkStr(this.loginFormData.username, 'phone')) {
        this.isErrorTipShow = true
        this.errorTipMsg = '手机号格式不正确'
        return
      }else if(!this.loginFormData.code) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入验证码'
        return
      }else if(!checkStr(this.loginFormData.code, 'number') || this.loginFormData.code.length !== 6) {
        this.isErrorTipShow = true
        this.errorTipMsg = '验证码格式不正确'
        return
      }
      this.isDisabled = true
      commonAjaxHandel.loginHandel({...this.loginFormData, uuid: this.uuidVal}).then(res => {
        setTimeout(() => {
          this.isDisabled = false
        }, 800);
        if(res.token_type && res.refresh_token && res.access_token) {
          this.setLoginInfo(res)
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.isDisabled = false
        this.isErrorTipShow = true
        this.errorTipMsg = e.message
      })
    }
  }
}
</script>
