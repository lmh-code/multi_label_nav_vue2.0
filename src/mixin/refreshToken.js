import Storage from '@/utils/localStorage'
import commonAjaxHandel from '@/server/Common'
export default {
  methods: {
    /**
     * [checkLogin 检查是否有登录信息]
     * @return {Boolean} [true 已登录 false 未登录]
     */
    checkLogin() {
      return Storage.get('loginInfo') && this.$route.path !== "/login" ? true : false
    },
    refreshToken() {
      if(!this.checkLogin()) return
      let loginInfo = Storage.get('loginInfo')
      commonAjaxHandel.refreshLoginHandel({grant_type: 'refresh_token', refresh_token: loginInfo.refresh_token}).then(res => {
        if(res.token_type && res.refresh_token && res.access_token) {
          let selectstore = {}
          let data = {...res}
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
        }
      }).catch(e => {
        console.log("刷新token失败错误信息：", e);
      })
    }
  }
}
