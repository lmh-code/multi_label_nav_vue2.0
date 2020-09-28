<style scoped>
  .header-wraper {
    width: 100%;
    height: 50px;
    background-color: #3080fe;
    position: relative;
    z-index: 999;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.4);
    border-left-color: rgb(230, 230, 230);
    border-left-style: solid;
    border-left-width: 1px;
    box-sizing: border-box;
  }
  .menu-switch {
    float: left;
    position: relative;
  }
  .menu-switch>span {
    line-height: 50px;
    padding: 12px 20px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .menu-switch>span>i {
    font-size: 16px;
    color: #FFF;
  }
  .per-mesg {
    padding: 0 20px;
    line-height: 50px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 998;
    margin-top: -2px;
  }
  .username>span {
    color: #FFF;
  }
  .username>span:nth-child(1) {
    font-size: 18px;
    position: relative;
    top: 2px;
  }
  .username>span:nth-child(2) {
    font-size: 16px;
    vertical-align: middle;
    width: 82px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
  }
  .username>span:nth-child(3) {
    font-size: 14px;
    position: relative;
    top: 1px;
  }

  .handel-wrap {
    width: 100%;
    height: auto;
    background-color: #3080fe;
    border-radius: 5px;
    position: relative;
    top: 6px;
    padding: 0 8px;
  }
  .handel-wrap>p {
    line-height: 38px;
    border-bottom: 1px solid #f5f5f5;
    font-size: 14px;
    color: #FFF;
  }
  .handel-wrap>p {
    text-align: center;
  }
  .handel-wrap>p:nth-child(3) {
    border-bottom: 0;
  }
  .handel-wrap>p:hover {
    color: rgb(230, 230, 230);
  }
  .slow-icon {
    position: absolute;
    top: -30px;
    left: 6px;
    color: #3080fe;
  }
</style>

<template>
  <div class="header-wraper">
    <div>
      <div class="menu-switch">
        <span @click="closeMenu" v-if="isShowMenu"><i class="icon iconfont icon-shouqizuo"></i></span>
        <span @click="showMenu" v-else><i class="icon iconfont icon-zhankai"></i></span>
      </div>
      <div class="per-mesg" @mouseenter="showSlowDown" @mouseleave="hideSlowDown">
        <div class="username">
          <span><i class="el-icon-user-solid" aria-hidden="true"></i></span>
          <span>{{userName}}</span>
          <span><i class="el-icon-arrow-down" aria-hidden="true"></i></span>
        </div>
        <transition name="el-zoom-in-top">
          <div class="handel-wrap" v-show="isShowSlowDown">
            <a class="slow-icon">▲</a>
            <p @click="changePass">修改密码</p>
            <p @click="out">退出登录</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {loginOut} from '@/utils/utils'
import Storage from '@/utils/localStorage'
export default{
  data() {
    return {
      userName: Storage.get("loginInfo") && Storage.get("loginInfo").userNickname ? Storage.get("loginInfo").userNickname : (Storage.get("loginInfo") && Storage.get("loginInfo").userName ? Storage.get("loginInfo").userName : '--'), // 用户名
      isShowMenu: true, // 菜单是否展示
      isShowSlowDown: false, // 下拉框是否展示
    }
  },
  methods: {
    /**
     * 展示下拉框
     */
    showSlowDown () {
      this.isShowSlowDown = true
    },
    /**
     * 隐藏下拉框
     */
    hideSlowDown () {
      this.isShowSlowDown = false
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
    }
  }
}
</script>
