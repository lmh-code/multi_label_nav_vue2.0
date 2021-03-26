import config from '@/utils/config'
import Uuid from 'uuid/v4'
import Storage from '@/utils/localStorage'
import perfectSCMAjaxHandel from '@/server/perfectSCM'
export default {
  data() {
    return {
      loginBgUrl: config.loginBgImgUrl ? config.loginBgImgUrl : `${config.baseRouter}/static/login_bg.jpg`,
      logoUrl: `${config.baseRouter}/static/logo.png`,
      sysName: config.sysName,
      isDisabled: false,
      isErrorTipShow: false, // 控制错误提示框是否展示
      errorTipMsg: 'no error tip'
    }
  },
  created() {
    // 获取uuid
    this.uuidVal = Uuid()
    // 如果用户已经登录不再展示登录页
    if(Storage.get('loginInfo')) {
      this.$router.replace("/index")
    }
    // 获取状态码
    let statusVal = this.$route.query.status
    if(statusVal == 401) {
      this.$notify({
        title: '警告',
        message: '登录验证超时，请重新登录！',
        type: 'warning'
      })
    }else if(statusVal == 'pok') {
      this.$notify({
        title: '提示',
        message: '修改密码成功，请重新登录！',
        type: 'success'
      })
    }else if(statusVal == 'timeOut') {
      this.$notify({
        title: '警告',
        message: '长时间未操作，请重新登录！',
        type: 'warning'
      })
    }
  },
  methods: {
    hideErrorTipHandle() {
      this.isErrorTipShow = false;
    },
    /**
     * @description: 设置登录信息并跳转到指定页面
     * @param {*} data 登录成功之后后台返回的信息
     */
    setLoginInfo(data) {
      Storage.remove('loginInfo')
      let selectstore = data.selectstore ? JSON.parse(data.selectstore) : {}
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
      this.$store.commit("login/SET_LOGIN_INFO", {
        userNo: data['user:name'],
        userName: data['user:name'],
        userNickname: data['user:nickname']
      })
      this.getCommonMsg()
      this.redirectHandle()
    },
    getCommonMsg() {
      // 中台系统
      if(config.clientId === 3) {
        this.$store.dispatch('city/GET_CITYS')
      }
      // FMS系统
      if(config.clientId === 9) {
        this.$store.dispatch('regionMains/GET_MAINS')
      }
    },
    redirectHandle() {
      if(config.clientId === 6) {
        // 供应商系统
        this.isDisabled = true
        perfectSCMAjaxHandel.getUrlGuide().then(res => {
          setTimeout(() => {
            this.isDisabled = false
          }, 800)
          if(res.code === 0 && res.data) {
            let loginInfo = Storage.get('loginInfo')
            loginInfo.tag = res.data.tag // 审核状态，-1:待注册 0:已保存 2:待审核 4:已审核
            loginInfo.urlType = res.data.urlType // 供应商入口类型, 0:供应商注册 2:erp注入
            Storage.set('loginInfo', loginInfo)
            if(res.data.urlType === 2 || (res.data.urlType === 0 && res.data.tag === 4)) {
              this.$router.replace('/index')
            }else{
              this.$router.replace('/perfect')
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          Storage.remove('loginInfo')
          this.isDisabled = false
          this.isErrorTipShow = true
          this.errorTipMsg = e.message
        })
      }else {
        this.$router.replace('/index')
      }
    }
  }
}
