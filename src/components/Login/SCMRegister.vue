<style lang="less" scoped>
  @import "../../assets/style/login.less";
  .mb22 {
    margin-bottom: 22px;
  }
</style>

<template>
  <div class="login-wraper">
    <img :src="loginBgUrl" alt="" width="100%" height="100%">
    <div class="login-form-box">
      <div class="form-title">本来鲜-{{sysName}}</div>
      <div class="form-title-line"></div>
      <el-form :model="loginFormData" ref="loginForm" label-width="0">
        <el-form-item>
          <el-input placeholder="请输入企业名称，必填，限50字内" v-model="loginFormData.userName" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
            <template slot="prepend">
              <i class="el-icon-office-building" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入登录名，限20字内字母/数字" v-model="loginFormData.userNo" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
            <template slot="prepend">
              <i class="el-icon-user" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入手机号" v-model="loginFormData.mobile" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
            <template slot="prepend">
              <i class="el-icon-mobile-phone" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" v-model="loginFormData.smsCode" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
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
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="loginFormData.password" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
            <template slot="prepend">
              <i class="el-icon-lock" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请再次输入密码" type="password" v-model="loginFormData.confirmPassword" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
            <template slot="prepend">
              <i class="el-icon-lock" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <div class="mb22">注意：密码必须包含数字及大、小写字母，至少8位</div>
        <el-form-item>
          <el-button style="width:100%;" class="login-btn" type="primary" @click="submitLoginForm" :disabled="isDisabled" :loading="isDisabled">注 册</el-button>
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
import perfectSCMAjaxHandel from '@/server/perfectSCM'
import config from '@/utils/config'
import Storage from '@/utils/localStorage'
import {checkStr} from '@/utils/validate'
import LoginFormFooter from './components/LoginFormFooter'
import LoginFooter from './components/LoginFooter'
import loginMixin from './mixin/login'
let Base64 = require('js-base64').Base64
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
        mobile: '',
        password: '',
        confirmPassword: '',
        smsCode: '',
        userName: '',
        userNo: ''
      }
    }
  },
  created() {
    if(!config.loginTypeIncludes.includes('scm') || config.clientId !== 6) {
      this.$router.replace('/login')
      return
    }
  },
  methods: {
    sendCodeHandel() {
      if(!this.loginFormData.mobile) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入手机号'
        return
      }else if(!checkStr(this.loginFormData.mobile, 'phone')) {
        this.isErrorTipShow = true
        this.errorTipMsg = '手机号格式不正确'
        return
      }
      this.sendLoading = true
      commonAjaxHandel.getSmsCodeHandel({phone: this.loginFormData.mobile}).then(res => {
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
      if (!this.checkFormItem()) return
      let params = {
        ...this.loginFormData,
        password: Base64.encode(this.loginFormData.password)
      } 
      delete params.confirmPassword
      // 检查供应商名称和验证码是否正确
      this.isDisabled = true
      perfectSCMAjaxHandel.beforeCreateVendorCheck({
        vendorName: params.userName,
        mobile: params.mobile,
        smsCode: params.smsCode
      }).then(res => {
        this.isDisabled = false
        if(res.code === 0) {
          // 提交注册信息
          this.isDisabled = true
          perfectSCMAjaxHandel.createVendorAccount(params).then(res => {
            setTimeout(() => {
              this.isDisabled = false
            }, 800);
            if(res.code === 0) {
              // 注册成功，直接登录
              this.doLoginHandle(params)
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.isDisabled = false
            this.isErrorTipShow = true
            this.errorTipMsg = e.message
          })
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.isDisabled = false
        this.isErrorTipShow = true
        this.errorTipMsg = e.message
      })
    },
    checkFormItem() {
      if(!this.loginFormData.userName) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入企业名称'
        return false
      }else if(this.loginFormData.userName.length > 50) {
        this.isErrorTipShow = true
        this.errorTipMsg = '企业名称限50字内'
        return false
      }else if(!this.loginFormData.userNo) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入登录名'
        return false
      }else if(!checkStr(this.loginFormData.userNo, 'count')) {
        this.isErrorTipShow = true
        this.errorTipMsg = '登录名，限20字内字母/数字'
        return false
      }else if(!this.loginFormData.mobile) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入手机号'
        return false
      }else if(!checkStr(this.loginFormData.mobile, 'phone')) {
        this.isErrorTipShow = true
        this.errorTipMsg = '手机号格式不正确'
        return false
      }else if(!this.loginFormData.smsCode) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入验证码'
        return false
      }else if(!checkStr(this.loginFormData.smsCode, 'number') || this.loginFormData.smsCode.length !== 6) {
        this.isErrorTipShow = true
        this.errorTipMsg = '验证码格式不正确'
        return false
      }else if(!this.loginFormData.password) {
        this.isErrorTipShow = true
        this.errorTipMsg = '请输入新密码'
        return false
      }else if(!checkStr(this.loginFormData.password, 'pwd')) {
        this.isErrorTipShow = true
        this.errorTipMsg = '密码格式不正确'
        return false
      }else if(this.loginFormData.password !== this.loginFormData.confirmPassword) {
        this.isErrorTipShow = true
        this.errorTipMsg = '两次输入密码不一致'
        return false
      }
      return true
    },
    doLoginHandle(params) {
      this.isDisabled = true
      commonAjaxHandel.loginHandel({
        username: this.loginFormData.userNo, 
        password: this.loginFormData.password, 
        grant_type: 'password',
        uuid: this.uuidVal
      }).then(res => {
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
