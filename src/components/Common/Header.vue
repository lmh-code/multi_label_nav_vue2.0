<style>
  .header-wraper {
    width: 100%;
    height: 50px;
    background-color: #3080fe;
    position: relative;
    z-index: 9999;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.4);
    border-left-color: rgb(230, 230, 230);
    border-left-style: solid;
    border-left-width: 1px;
    box-sizing: border-box;
  }
  .header-wraper .el-input input{
    background: #fff;
    color: #333;
    border: none;
    text-align: left;
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
  .select-box {
    width: 180px;
    height: 50px;
    float: left;
    line-height: 50px;
  }
  .com-search {
    width: 200px;
    height: 50px;
    float: right;
    line-height: 50px;
    margin-right: 158px;
  }
  .per-mesg {
    padding: 0 20px;
    line-height: 50px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    margin-top: -2px;
  }
  .username>span {
    color: #FFF;
  }
  .username>span:nth-child(1) {
    font-size: 18px;
    position: relative;
    top: 1.5px;
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
    top: -1px;
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

      <div class="select-box" v-if="showSelectCity">
        <el-select v-model="cityId" filterable placeholder="请选择城市" @change="cityChange" size="small" default-first-option>
          <el-option
            v-for="item in cityOptions"
            :key="item.cityId"
            :label="item.cityName"
            :value="item.cityId">
          </el-option>
        </el-select>
      </div>

      <div class="com-search">
        <el-input
          placeholder="订单号/收货人手机号"
          prefix-icon="el-icon-search"
          size="small"
          v-model.trim="buyerPhone"
          @keyup.enter.native="goOrderPage"
          clearable>
        </el-input>
      </div>

      <div class="per-mesg" @mouseenter="showSlowDown" @mouseleave="hideSlowDown">
        <div class="username">
          <span><i class="fa fa-user-circle" aria-hidden="true"></i></span>
          <span>{{this.userName}}</span>
          <span><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
        </div>
        <transition name="el-zoom-in-top">
          <div class="handel-wrap" v-show="isShowSlowDown">
            <a class="slow-icon">▲</a>
            <p @click="changePass">修改密码</p>
            <p @click="loginOut">退出登录</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Storage from '../../utils/localStorage'
const commonUrl = {
  // 获取城市列表
  userStoreCityList: '/foundation/store/userStoreCityList'
}
export default{
  data() {
    return {
      cityId: '', // 默认城市
      cityName: '', // 城市名称
      cityOptions: [],
      userName: Storage.get("loginInfo") && Storage.get("loginInfo").userNickname ? Storage.get("loginInfo").userNickname : (Storage.get("loginInfo") && Storage.get("loginInfo").userName ? Storage.get("loginInfo").userName : '--'), // 用户名
      isShowMenu: true, // 菜单是否展示
      isShowSlowDown: false, // 下拉框是否展示
      // 用户手机号
      buyerPhone: '',
      // 是否展示区域框
      showSelectCity: true
    }
  },
  watch: {
    $route () {
      this.routerChange()
    }
  },
  created() {
    this.routerChange()
    // 获取城市列表
    this.getCityList()
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
      this.$emit('showMenu')
    },
    /**
     * 隐藏菜单
     */
    closeMenu () {
      this.isShowMenu = false
      this.$emit('closeMenu')
    },
    /**
     * 退出登录
     */
    loginOut () {
      Storage.remove('loginInfo')
      sessionStorage.clear()
      this.$router.push('/login')
    },
    /**
     * [changePass 发送修改密码指令]
     * @return {[type]} [description]
     */
    changePass () {
      this.$emit('changePass')
    },
    /**
     * [getCityList 获取城市列表]
     * @return {[type]} [description]
     */
    getCityList () {
      let loginInfo = Storage.get('loginInfo')
      if (!loginInfo) {
        this.$router.push('/login?status=401')
        return
      }
      this.$http.get(commonUrl.userStoreCityList).then(res => {
        if (res && res.code === 0) {
          if (res.data && res.data.length) {
            this.cityOptions = res.data
            this.$store.dispatch('common/setCityOptions', {cityOptions: res.data})
            // 控制缓存中的城市id
            let cityId = Storage.get('cityId')
            if (this.cityOptions.length > 0) {
              if (!cityId) {
                Storage.set('cityId', this.cityOptions[0].cityId)
                Storage.set('cityName', this.cityOptions[0].cityName)
              } else {
                let cityItem = this.cityOptions.filter(item => {
                  return item.cityId === cityId
                })
                // 如果缓存中的城市不在用户权限中,默认用户权限的第一个
                if (cityItem.length === 0) {
                  Storage.set('cityId', this.cityOptions[0].cityId)
                  Storage.set('cityName', this.cityOptions[0].cityName)
                }
              }
            } else {
              Storage.remove('cityId')
              this.$router.push('/noopt')
            }
          }
          // 设置cityId
          if (Storage.get('cityId')) {
            this.cityId = Storage.get('cityId')
            this.cityName = Storage.get('cityName')
          }
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        console.log('提示（获取城市列表）:', e.message)
      })
    },
    /**
       * [cityChange 城市发生变化]
       * @return {[type]} [description]
       */
    cityChange (_val) {
      let cityItem = this.cityOptions.filter(item => {
        return item.cityId === _val
      })
      if (cityItem.length > 0) {
        this.cityId = cityItem[0].cityId
        this.cityName = cityItem[0].cityName
      }
      Storage.set('cityId', this.cityId)
      Storage.set('cityName', this.cityName)
      this.$emit('cityChange')
    },
    /**
       * [goOrderPage 当搜索指定订单，跳转至订单页面]
       * @return {[type]} [description]
       */
    goOrderPage () {
      if (!this.buyerPhone) {
        this.$notify({
          title: '警告',
          message: '请输入搜索条件！',
          type: 'warning'
        })
        return
      }
      let param = {
        buyerPhone: this.buyerPhone,
        showMesg: true
      }
      this.$store.dispatch('orders/setByUserphone', param)
      this.$router.push('/search_result')
    },
    /**
     * @description: 当路由发生变化时触发
     */
    routerChange () {
      if(this.$route.meta.hideSelectCity) {
        this.showSelectCity = false
      }else {
        this.showSelectCity = true
      }
    }
  }
}
</script>
