<style lang="less" scoped>
  .login-form-footer {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    p {
      cursor: pointer;
    }
    p:hover {
      color: @colorOption;
    }
  }
</style>
<template>
  <div class="login-form-footer">
    <p class="forget-pass" @click="goAddress('/login')" v-if="!checkPath('/login')">
      <i class="el-icon-user" aria-hidden="true"></i>账号密码登录
    </p>
    <p @click="goAddress('/phone')" v-if="!checkPath('/phone') && checkLoginType('phone')">
      <i class="el-icon-mobile-phone" aria-hidden="true"></i>手机验证登录
    </p>
    <p @click="goAddress('/ddLogin')" v-if="!checkPath('/ddLogin') && checkLoginType('dd')">
      <i class="el-icon-remove-outline" aria-hidden="true"></i>钉钉扫码登录
    </p>
    <p @click="goAddress('/scm_reg')" v-if="!checkPath('/scm_reg') && checkLoginType('scm') && clientId === 6">
      <i class="el-icon-truck" aria-hidden="true"></i>供应商入驻
    </p>
    <p class="forget-pass" @click="goAddress('/forget')" v-if="!checkPath('/forget') && !checkPath('/scm_reg') && checkLoginType('forget')">
      <i class="el-icon-question" aria-hidden="true"></i>忘记密码
    </p>
  </div>
</template>
<script>
import config from '@/utils/config'
import {redirect} from '@/utils/utils'
export default {
  data() {
    return {
      clientId: config.clientId
    }
  },
  methods: {
    checkLoginType(type) {
      return config.loginTypeIncludes.includes(type)
    },
    checkPath(path) {
      return this.$route.path === path
    },
    goAddress(path) {
      if(path === '/scm_reg') {
        window.location.href = 'https://retail.benlai.com/fortune/scm.html?v=20210304'
      }else {
        this.$router.push(path)
      }
    }
  }
}
</script>