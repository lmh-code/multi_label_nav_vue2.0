<template>
  <div  
    style="width:100%; height:100%;" 
    v-loading="loading" 
    element-loading-text="钉钉扫码登录中..." element-loading-spinner="el-icon-loading" 
    element-loading-background="rgba(0, 0, 0, 0.2)">
  </div>
</template>

<script>
import commonAjaxHandel from '@/server/Common'
import Uuid from 'uuid/v4'
import axios from 'axios'
import Storage from '@/utils/localStorage'
import loginMixin from './mixin/login'
export default {
  mixins: [loginMixin],
  data () {
    return {
      code: '',
      state: '',
      loading: false,
      loginFormData: {
        dingCode: '',
        grant_type: 'password',
        source: 'basics',
        uuidVal: ''
      }
    }
  },
  created () {
    // 获取uuid
    this.loginFormData.uuidVal = Uuid()
    this.code = this.$route.query.code
    this.state = this.$route.query.state
  },
  mounted () {
    if (this.code && this.state) {
      this.submitLoginForm()
    }
  },
  methods: {
    submitLoginForm () {
      this.loading = true
      this.loginFormData.dingCode = this.code
      commonAjaxHandel.loginHandel({...this.loginFormData}).then(res => {
        this.loading = false
        if(res.token_type && res.refresh_token && res.access_token) {
          this.setLoginInfo(res)
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
      })
    }
  }
}
</script>
