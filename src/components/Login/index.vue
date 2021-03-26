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
          <el-input placeholder="请输入用户名" v-model="loginFormData.username" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
            <template slot="prepend">
              <i class="el-icon-user" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="loginFormData.password" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
            <template slot="prepend">
              <i class="el-icon-lock" aria-hidden="true"></i>
            </template>
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
import Storage from '@/utils/localStorage'
import loginMixin from './mixin/login'
import LoginFormFooter from './components/LoginFormFooter'
import LoginFooter from './components/LoginFooter'
export default{
  mixins: [loginMixin],
  components: {
    "login-form-footer": LoginFormFooter,
    "login-footer": LoginFooter
  },
  data() {
    return {
      loginFormData: {
        username: '',
        password: '',
        grant_type: 'password'
      }
    }
  },
  methods: {
    submitLoginForm() {
      if(!this.loginFormData.username) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入用户名'
        return
      }
      if(!this.loginFormData.password) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入密码'
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
