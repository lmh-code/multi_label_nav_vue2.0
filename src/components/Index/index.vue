<style>
  .index-wraper {
    height: 100%;
  }

  .w220 {
    width: 220px;
  }
  .w64 {
    width: 64px;
  }
  .my-menu {
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    position: relative;
  }

  /*修改滚动条样式*/
  .my-menu .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .my-menu .el-scrollbar__view {
    height: 100%;
  }
</style>

<template>
  <div class="index-wraper" @click="isDoing">
    <el-container style="height: 100%;">
      <!-- 左侧菜单 -->
      <el-aside :width="isCollapse ? '64px' : '220px'" style="height: 100%;">
        <div class="my-menu" :class="isCollapse?'w64':'w220'">
          <el-scrollbar style="height: 100%;overflow-x: hidden;">
            <menus ref="myMenus"></menus>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container v-loading="getIsShowLoading">
        <!-- 顶部 -->
        <el-header style="padding: 0; height: 50px;">
          <header-wraper @closeMenu="closeMenu" @showMenu="showMenu" @cityChange="cityChange" @changePass="changePass" ref="headerWraper"></header-wraper>
        </el-header>
        <!-- 主要内容 -->
        <el-main style="padding: 0 20px 20px; height: 100%; position: relative;">
          <breadcrumb></breadcrumb>
          <router-view :key="activeDate"/>
        </el-main>
      </el-container>
    </el-container>

    <!-- 修改密码 -->
    <change-pass ref="changePass"></change-pass>
  </div>
</template>


<script>
import {mapGetters} from "vuex"
import axios from 'axios'
import Storage from '@/utils/localStorage'
import Header from "@/components/Common/Header"
import Menus from "@/components/Common/Menus"
import Breadcrumb from "@/components/Common/Breadcrumb"
import ChangePass from "@/components/Common/ChangePass"
import commonUrl from '@/api/Common.js'
export default {
  name: 'App',
  data() {
    return {
      loading: false,
      activeDate: new Date().getTime(),
      isCollapse: false,
      lastTime: null,
      currentTime: null,
      timeout: 12 * 60 * 60 * 1000,
      routePath: 'no'
    }
  },
  created() {
    // 记录一次时间
    this.lastTime = new Date().getTime()

    // 检测用户是否处于登录状态
    let routePath = this.$route.path
    if(routePath != "/login" && routePath != "/forget_password" && routePath != "/sacn_code_login" && routePath != "/phone_login") {
      // 检查登录情况
      this.checkLogin()
      // 刷新浏览器就刷新token
      this.refreshToken()
    }
  },
  mounted() {
    let isFirstLogin = Storage.get('loginInfo') ? Storage.get('loginInfo').isFirstLogin : false
    if(isFirstLogin) {
      this.$refs.changePass.setDefault()
    }
  },
  computed: {
    ...mapGetters({
      currentDate: 'common/GET_CURRENT_DATE'
    }),
    getIsShowLoading() {
      let loading = this.$store.state.common.loading
      return loading
    }
  },
  watch: {
    currentDate(newVal) {
      this.activeDate = newVal
    }
  },
  components: {
    "header-wraper": Header,
    "menus": Menus,
    "breadcrumb": Breadcrumb,
    "change-pass": ChangePass
  },
  methods: {
    /**
     * 关闭菜单
     */
    closeMenu () {
      this.isCollapse = true
      this.$refs.myMenus.closeMenu()
    },
    /**
     * 展示菜单
     */
    showMenu () {
      this.isCollapse = false
      this.$refs.myMenus.showMenu()
    },
    /**
     * [clickCloseMenu 点击关闭菜单]
     * @return {[type]} [description]
     */
    clickCloseMenu () {
      this.isCollapse = !this.isCollapse
      this.$refs.headerWraper.setIsShow(this.isCollapse)
    },
    /**
     * 判断用户是否还在操作系统
     */
    isDoing() {
      // 调用隐藏切换平台下拉框的方法
      if(this.$refs.myMenus) this.$refs.myMenus.hidePlaSlowDown()

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
          this.$refs.headerWraper.loginOut()
        }else {
          this.lastTime = new Date().getTime()
        }
      }else {
        this.lastTime = new Date().getTime()
      }
    },
    /**
     * [cityChange 城市发生变化]
     * @return {[type]} [description]
     */
    cityChange() {
      this.activeDate = new Date().getTime()
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
     * @return {[type]} [description]
     */
    checkLogin() {
      if(!Storage.get('loginInfo')) {
        this.$router.push('/login?status=401')
      }
    },
    /**
     * [refreshToken 刷新token ]
     * @return {[type]} [description]
     */
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
