<style scoped>
  @import "../../assets/style/login.css";
</style>

<template>
  <div class="login-wraper">
    <img :src="loginBgUrl" alt="" width="100%" height="100%">
    <!--登陆框-->
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

        <div class="identify-code-wraper" v-if="false">
          <el-form-item style="flex:1;">
            <el-input placeholder="请输入验证码" v-model="loginFormData.identifyCode" @focus="hideErrorTipHandle" @keyup.enter.native="submitLoginForm">
              <template slot="prepend">
                <i class="fa fa-key" aria-hidden="true"></i>
              </template>
            </el-input>
          </el-form-item>
          <div class="identify-code-box">
            <img :src="codeImg" alt="" class="code-img" height="44px" width="106px" @click="getVerification">
          </div>
        </div>

        <el-form-item>
          <el-button style="width:100%;" class="login-btn" type="primary" @click="submitLoginForm" :disabled="isDisabled" :loading="isDisabled">登 录</el-button>
        </el-form-item>
        <div class="error-tip-box" v-show="isErrorTipShow">{{ this.errorTipMesg }}</div>
      </el-form>
    </div>
    <!--logo框-->
    <div class="logo-wrap">
      <img :src="logoUrl" alt="">
    </div>
    <!--底部-->
    <div class="footer-wraper">
      ©2017-2018 Benlai 京ICP证120338号    京公网安备 11010502022386号
    </div>
  </div>
</template>

<script>
import commonUrl from '@/api/Common.js'
import config from '@/utils/config'
import Uuid from 'uuid/v4'
import axios from 'axios'
import Storage from '@/utils/localStorage'
export default{
  data() {
    return {
      loginBgUrl: `${config.baseRouter}/static/login_bg.jpg`,
      logoUrl: `${config.baseRouter}/static/logo.png`,
      sysName: config.sysName,
      isDisabled: false,
      uuidVal: '', // 获取验证码和登录必带参数
      isErrorTipShow: false, // 控制错误提示框是否展示
      loginFormData: {
        username: '',
        password: '',
        identifyCode: 'test'
      },
      errorTipMesg: 'no error tip',
      codeImg: '',
      allMenus: []
    }
  },
  created() {
    // 获取uuid
    this.uuidVal = Uuid()
    // 如果用户已经登录不再展示登录页
    if(Storage.get('loginInfo')) {
      this.$router.push("/index")
    }
    // 获取状态码
    let statusVal = this.$route.query.status
    if(statusVal == 401) {
      this.$notify({
        title: '警告',
        message: '登录验证超时，请重新登录！',
        type: 'warning'
      })
      return
    }else if(statusVal == 'pok') {
      this.$notify({
        title: '提示',
        message: '修改密码成功，请重新登录！'
      })
      return
    }
  },
  methods: {
    /**
     * [getVerification 获取验证码]
     */
    getVerification() {
      let params = new URLSearchParams()
      params.append('uuid', this.uuidVal)
      axios.post(commonUrl.getVerificationImage, params, {responseType: 'arraybuffer'}).then(res => {
        this.codeImg = 'data:image/png;base64,' + new Buffer(res.data, 'binary').toString('base64')
      }).catch(e => {})
    },
    /**
     * [doLogin 登录]
     * @return {[type]} [description]
     */
    submitLoginForm() {
      if(this.loginFormData.username === '') {
        this.isErrorTipShow = true
        this.errorTipMesg = '请输入用户名'
        return
      }
      if(this.loginFormData.password == '') {
        this.isErrorTipShow = true
        this.errorTipMesg = '请输入密码'
        return
      }
      if(this.loginFormData.identifyCode == '') {
        this.isErrorTipShow = true
        this.errorTipMesg = '请输入验证码'
        return
      }
      let params = new URLSearchParams()
      let headers = {
        'Authorization': 'Basic d2ViOmQ4YmZjMzQwMWE3NTg5ZTc4NGIwNmJkZmdhMmFkMWM0ZQ=='
      }
      params.append('username', this.loginFormData.username)
      params.append('password', this.loginFormData.password)
      params.append('grant_type', 'password')
      params.append('verificationCode', this.loginFormData.identifyCode)
      params.append('uuid', this.uuidVal)

      this.isDisabled = true
      axios.post(commonUrl.token, params, {headers: headers}).then(res => {
        setTimeout(() => {
          this.isDisabled = false
        }, 800)
        let data = res.data
        if (!data || !data.token_type || !data.access_token) {
          return res
        }
        // 移除后再缓存登录信息
        Storage.remove('loginInfo')
        let selectstore = {}
        if(data.selectstore) {
          selectstore = JSON.parse(data.selectstore)
        }
        Storage.set('loginInfo', {
          StoreName: selectstore.storeName,
          Operator: data['user:name'],
          UserNO: data['user:name'],
          UserName: data['user:nickname'],
          token_type: data.token_type,
          StoreSysNo: selectstore.storeSysNo,
          StoreNO: selectstore.storeNo,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          IsFirstLogin: data.isFirstLogin === '1',
          IsDC: true,
          net_token: data.net_token,
          dashboardPermission: data['user:dashboardPermission'],
          userName: data['user:name'],
          userNickname: data['user:nickname'],
          isFirstLogin: data.isFirstLogin === '1',
          expiresTime: data['user:expires'],
          selectStore: data.selectstore,
          loginTime: new Date().getTime()
        })
        // 获取区域信息
        setTimeout(() => {
          this.$router.push('/index')
        }, 300);
      }).catch(({response}) => {
        this.isDisabled = false
        // 获取验证码
        if(response) {
          let msg = response.data.error_description || response.statusText
          this.isErrorTipShow = true
          this.errorTipMesg = msg
        }
      })
    },
    /**
     * [hideErrorTipHandle 隐藏错误提示]
     * @return {[type]} [description]
     */
    hideErrorTipHandle() {
      this.isErrorTipShow = false;
    } 
  }
}
</script>
