<style scoped>
  .layout-wrap {
    height: 100%;
  }
  .layout-wrap .aside-wrap {
    height: 100%;
    background-color: #001529;
  }
  .layout-wrap .el-main-container {
    padding: 0 20px 20px; 
    height: 100%; 
    position: relative;
  }
</style>

<template>
  <el-container class="layout-wrap" @click.native="isDoing">
    <!-- 左侧菜单 -->
    <el-aside :width="isCollapse ? '64px' : '220px'" class="aside-wrap">
      <slidebar ref="slidebar"/>
    </el-aside>
    <el-container>
      <!-- 顶部 -->
      <el-header style="padding: 0; height: 46px;">
        <header-wraper @changePass="changePass" ref="headerWraper"></header-wraper>
      </el-header>
      <!-- 主要内容 -->
      <el-main class="el-main-container" v-loading="getIsShowLoading">
        <breadcrumb></breadcrumb>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>

    <!-- 修改密码 -->
    <change-pass ref="changePass"></change-pass>
  </el-container>
</template>


<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import Storage from '@/utils/localStorage'
import {loginOut} from '@/utils/utils'
import ChangePass from "@/components/Common/ChangePass"
import Header from "./components/Header"
import Slidebar from "./components/Slidebar"
import Breadcrumb from "./components/Breadcrumb"
import commonUrl from '@/api/Common.js'
export default {
  name: 'App',
  data() {
    return {
      loading: false,
      collapse: false, 
      lastTime: null,
      currentTime: null,
      timeout: 12 * 60 * 60 * 1000
    }
  },
  created() {
    // 记录一次时间
    this.lastTime = new Date().getTime()
    // 检测用户是否处于登录状态
    if(this.checkLogin()) {
      // 刷新token
      this.refreshToken()
    }else {
      loginOut()
    }
  },
  mounted() {
    let isFirstLogin = Storage.get('loginInfo') ? Storage.get('loginInfo').isFirstLogin : false
    if(isFirstLogin) {
      this.changePass()
    }
  },
  computed: {
    ...mapGetters({
      currentDate: 'common/GET_CURRENT_DATE'
    }),
    getIsShowLoading() {
      return this.$store.state.common.loading
    },
    isCollapse() {
      return this.$store.state.common.collapse
    }
  },
  components: {
    "header-wraper": Header,
    "breadcrumb": Breadcrumb,
    "change-pass": ChangePass,
    "slidebar": Slidebar
  },
  methods: {
    /**
     * 判断用户是否还在操作系统
     */
    isDoing() {
      // 调用隐藏切换平台下拉框的方法
      if(this.$refs.slidebar) this.$refs.slidebar.hidePlaSlowDown()
      this.currentTime = new Date().getTime()
      if(this.currentTime - this.lastTime > this.timeout) {
        // 长时间未操作
        if(this.$route.path !== '/login') {
          this.$notify({
            title: '警告',
            message: '长时间未操作，自动退出',
            type: 'warning'
          })
          // 调用退出的方法
          loginOut()
        }else {
          this.lastTime = new Date().getTime()
        }
      }else {
        this.lastTime = new Date().getTime()
      }
    },
    /**
     * [changePass 调出修改密码弹窗]
     * @return {[type]} [description]
     */
    changePass() {
      this.$refs.changePass.setDefault()
    },
    /**
     * [checkLogin 检查是否有登录信息]
     * @return {Boolean} [true 已登录 false 未登录]
     */
    checkLogin() {
      return Storage.get('loginInfo') && this.$route.path !== "/login" ? true : false
    },
    refreshToken() {
      let loginInfo = Storage.get('loginInfo')
      if(!loginInfo) {
        this.$router.push("/login?status=401")
        return
      }
      // 刷新token
      let headers = {
        'Authorization': 'Basic d2ViOmQ4YmZjMzQwMWE3NTg5ZTc4NGIwNmJkZmdhMmFkMWM0ZQ=='
      }
      let params = new URLSearchParams()
      params.append('grant_type', 'refresh_token')
      params.append('refresh_token', loginInfo.refresh_token)

      axios.post(commonUrl.token, params, {headers: headers}).then(res => {
        let data = res.data
        if (!data || !data.token_type || !data.access_token) {
          return res
        }

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
      }).catch(({response}) => {})
    }
  }
}
</script>
