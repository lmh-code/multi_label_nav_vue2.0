<style scoped lang="less">
  .header-wraper {
    width: 100%;
    height: 50px;
    background-color: @colorMain;
    position: relative;
    z-index: 2021;
    border-left-color: @colorBorder;
    border-left-style: solid;
    border-left-width: 1px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    .menu-switch {
      height: 50px;
      width: 60px;
      span {
        line-height: 50px;
        padding: 12px 20px;
        box-sizing: border-box;
        cursor: pointer;
        i {
          font-size: 16px;
          color: @colorWhite;
        }
      }
    }
    .option-wrap {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      span.span-common-style {
        display: flex;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        color: @colorWhite;
        height: 50px;
        cursor: pointer;
        i {
          font-size: 20px;
          color: @colorWhite;
        }
      }
      span.phone {
        i {
          font-size: 18px;
        }
      }
    }
    .per-mesg {
      margin-right: 20px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      z-index: 998;
      .username {
        display: flex;
        align-items: center;
        span {
          color: @colorWhite;
        }
        span.user-icon {
          font-size: 18px;
          margin-right: 4px;
        }
        span.username-info {
          font-size: 16px;
          vertical-align: middle;
          width: 82px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space:nowrap;
        }
        span.arrow-down-icon {
          font-size: 14px;
        }
      }
      .handel-wrap {
        width: 100%;
        height: auto;
        background-color: @colorMain;
        border-radius: 5px;
        position: absolute;
        right: 0;
        top: 50px;
        padding: 0 8px;
        .slow-icon {
          position: absolute;
          top: -12px;
          left: 8px;
          color: @colorMain;
        }
        p {
          line-height: 40px;
          border-bottom: 1px solid @colorMainGrey;
          font-size: 14px;
          color: @colorWhite;
          text-align: center;
        }
        p:last-child {
          border-bottom: 0;
        }
        p:hover {
          color: @colorMainGrey;
        }
      }
    }
  }
</style>

<template>
  <div class="header-wraper">
    <div class="menu-switch" v-if="showSwitch">
      <span @click="closeMenu" v-if="isShowMenu"><i class="icon iconfont icon-shouqizuo"></i></span>
      <span @click="showMenu" v-else><i class="icon iconfont icon-zhankai"></i></span>
    </div>
    <div class="option-wrap">
      <el-dropdown v-if="showScan">
        <span class="span-common-style phone">
          <i class="el-icon-mobile-phone"></i>手机扫码登录
        </span>
        <el-dropdown-menu slot="dropdown">
          <div style="width: 240px; text-align: center;">
            <img width="150px" height="150px" src="http://retailimg01.benlailife.com/21a123c21ce74a65b7487c2943af8b95.jpg" alt="扫码登录小程序">
            <p style="font-size: 18px;">扫码登录小程序</p>
            <p style="color: #9BA3AF;">登录微信小程序快捷处理订单</p>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="span-common-style" @click="refreshPageHandel" v-if="showRefresh">
        <i class="el-icon-refresh"></i>
      </span>
      <span class="span-common-style" @click="bigScreenHandel">
        <i class="el-icon-full-screen"></i>
      </span>
    </div>
    <div 
      class="per-mesg" 
      @mouseenter="showSlowDown" 
      @mouseleave="hideSlowDown">
      <div class="username">
        <span class="user-icon"><i class="el-icon-user-solid" aria-hidden="true"></i></span>
        <span class="username-info">{{loginInfo.userNickname ? loginInfo.userNickname : loginInfo.userName ? loginInfo.userName : userNickname ? userNickname : '--'}}</span>
        <span class="arrow-down-icon"><i class="el-icon-arrow-down" aria-hidden="true"></i></span>
      </div>
      <transition name="el-fade-in">
        <div 
          @mouseenter="showSlowDown"
          class="handel-wrap" 
          v-show="isShowSlowDown">
          <a class="slow-icon">▲</a>
          <p @click="changePass">修改密码</p>
          <p @click="out">退出登录</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {loginOut} from '@/utils/utils'
import Storage from '@/utils/localStorage'
import {refreshPage} from '@/utils/route'
import screenfull from 'screenfull'
import config from '@/utils/config'
let myTimmer = null
export default{
  props: {
    showSwitch: {
      type: Boolean,
      default: true
    },
    showRefresh: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      userNickname: Storage.get("loginInfo") ? Storage.get("loginInfo").userNickname : '',
      isShowMenu: true, // 菜单是否展示
      isShowSlowDown: false // 下拉框是否展示
    }
  },
  computed: {
    showScan() {
      return config.clientId === 6
    },
    loginInfo() {
      return this.$store.state.login.loginInfo
    }
  },
  methods: {
    /**
     * 展示下拉框
     */
    showSlowDown () {
      clearTimeout(myTimmer)
      this.isShowSlowDown = true
    },
    /**
     * 隐藏下拉框
     */
    hideSlowDown () {
      clearTimeout(myTimmer)
      myTimmer = setTimeout(() => {
        this.isShowSlowDown = false
      }, 500)
    },
    /**
     * 展示菜单
     */
    showMenu () {
      this.isShowMenu = true
      this.$store.dispatch('common/setCollapse', false)
    },
    /**
     * 隐藏菜单
     */
    closeMenu () {
      this.isShowMenu = false
      this.$store.dispatch('common/setCollapse', true)
    },
    /**
     * 退出登录
     */
    out () {
      loginOut()
    },
    /**
     * [changePass 发送修改密码指令]
     * @return {[type]} [description]
     */
    changePass () {
      this.$emit('changePass')
    },
    bigScreenHandel() {
      screenfull.toggle()
    },
    refreshPageHandel() {
      this.$store.commit('tagsView/DEL_CACHE_ONLY', this.$route)
      this.$nextTick(() => refreshPage(this.$route))
    }
  }
}
</script>
