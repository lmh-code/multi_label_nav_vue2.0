<style scoped lang="less">
  .layout-wrap {
    height: 100%;
    .aside-wrap {
      height: 100%;
      background-color: @colorSubBlack;
    }
    .header-wrap {
      padding: 0; 
      height: 50px !important;
    }
    .menu-tags-wrap {
      padding: 0 20px; 
      background-color: @colorMavBg;
    }
    .el-main-container {
      padding: 4px 20px 20px; 
      height: 100%; 
      position: relative;
    }
  }
</style>

<template>
  <el-container class="layout-wrap" @click.native="isDoing">
    <!-- 左侧菜单 -->
    <el-aside :width="isCollapse ? '64px' : '220px'" class="aside-wrap">
      <slidebar ref="slidebar"/>
    </el-aside>
    <el-container v-loading="getIsShowLoading">
      <!-- 顶部 -->
      <el-header class="header-wrap">
        <header-wraper @changePass="changePass" ref="headerWraper"></header-wraper>
      </el-header>
      <div class="menu-tags-wrap">
        <menu-tags/>
      </div>
      <!-- 主要内容 -->
      <el-main class="el-main-container">
        <bl-page-view :include="cachedViews" :cacheable="true" transition-name="el-fade-in-linear">
        </bl-page-view>
        <el-backtop target=".el-main-container" :right="20" style="background: #E3E7EA;"></el-backtop>
      </el-main>
    </el-container>
    <!-- 修改密码 -->
    <change-pass ref="changePass"></change-pass>
  </el-container>
</template>

<script>
import {mapGetters} from 'vuex'
import Storage from '@/utils/localStorage'
import {loginOut} from '@/utils/utils'
import ChangePass from "@/components/Common/ChangePass"
import Header from "./components/Header"
import Slidebar from "./components/Slidebar"
import MenuTags from "./components/MenuTags"
import BlPageView from './components/BlPageView'
import commonAjaxHandel from '@/server/Common'
import {findIndexByKey} from '@/utils/utils'
import watermark from '@/utils/watermark'
import config from '@/utils/config'
import refreshTokenMixin from '@/mixin/refreshToken'
import perfectSCMAjaxHandel from '@/server/perfectSCM'
export default {
  name: 'App',
  mixins: [refreshTokenMixin],
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
    if(!this.checkLogin()) loginOut()

    // 供应商系统，检测一下当前登录账号状态
    if(config.clientId === 6) this.checkAccountStatus()
    if(config.clientId === 9) this.$store.dispatch('regionMains/GET_MAINS')
  },
  mounted() {
    let isFirstLogin = Storage.get('loginInfo') ? Storage.get('loginInfo').isFirstLogin : false
    config.clientId !== 6 && isFirstLogin && this.changePass()
    // 刷新token
    this.refreshToken()
  },
  computed: {
    ...mapGetters({
      currentDate: 'common/getCurrentDate',
      cachedViews: 'tagsView/GET_CACHED_VIEWS',
    }),
    getIsShowLoading() {
      return this.$store.state.common.loading
    },
    isCollapse() {
      return this.$store.state.common.collapse
    },
    loginInfo() {
      return this.$store.state.login.loginInfo
    }
  },
  watch: {
    loginInfo: {
      immediate: true,
      handler(newVal, oldVal) {
        // 当用户打开系统为BI系统时，设置水印。
        if(config.clientId === 4) this.setWatermark(newVal)
      }
    }
  },
  components: {
    "header-wraper": Header,
    "change-pass": ChangePass,
    "slidebar": Slidebar,
    "menu-tags": MenuTags,
    "bl-page-view": BlPageView
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
          // 调用退出的方法
          loginOut('/login?status=timeOut')
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
      this.$refs.changePass && this.$refs.changePass.setDefault()
    },
    setWatermark(data) {
      if(!this.checkLogin()) return
      watermark.clear()
      watermark.set(data.userNickname, data.userNo)
    },
    checkAccountStatus() {
      perfectSCMAjaxHandel.getUrlGuide().then(res => {
        // tag 审核状态:  -1:待注册 0:已保存 2:待审核 4:已审核 32:驳回
        // urlType 供应商入口类型, 0:供应商注册 2:erp注入
        if(res.code === 0 && res.data) {
          if(res.data.urlType !== 2 && res.data.tag !== 4) this.$router.replace('/perfect')
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        console.log("获取供应商账号登录状态:", e.message);
      })
    }
  }
}
</script>
