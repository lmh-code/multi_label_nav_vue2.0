<style scoped lang="less">
  .menu-wraper {
    height: 100%;
    overflow-x: hidden !important;
    padding-top: 50px;
    box-sizing: border-box;
    background-color: @colorSubBlack;
    position: relative;
    .m-loading {
      text-align: center;
      line-height: 60px;
    }
    .logo-wraper {
      height: 50px;
      background-color: @colorSubBlack2;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2021;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      padding: 0 20px;
      box-sizing: border-box;
      .menus-img-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .sys-switch-wrap {
        cursor: pointer;
        span {
          line-height: 50px;
          padding: 10px 0;
          i {
            font-size: 22px;
            color: @colorWhite;
          }
        }
      }
      .logo {
        flex: 1;
        width: 162px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .plat-con-wrap {
        width: 190px;
        background-color: @colorWhite;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        top: 60px;
        left: 15px;
        border-radius: 6px;
        .up-ang-icon {
          position: absolute;
          top: -14px;
          left: 10px;
          color: @colorWhite;
        }
        p {
          line-height: 46px;
          font-size: 15px;
          color: @colorTitle;
          text-align: left;
          cursor: pointer;
          padding: 0 20px;
          box-sizing: border-box;
        }
        p:hover {
          color: @colorMain;
        }
      }
    }
    .w220 {
      width: 220px;
    }
    .w64 {
      width: 64px;
    }
    .option-wrap {
      background-color: @colorSubBlack3;
      .se-txt-wrap {
        padding: 4px 20px;
        color: @colorSubTitle;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        flex-direction: row;
      }
      .search-btn {
        padding-left: 20px;
        cursor: pointer;
      }
    }
  }
</style>
<style lang="less">
  .menu-wraper.bl-menus .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .menu-wraper a:hover {
    text-decoration: none;
  }
  .menu-wraper.bl-menus .el-menu {
    border-right: 0 !important;
  }
  .menu-wraper.bl-menus>.el-menu-vertical {
    border-right-color: @colorSubBlack;
    border-right-style: solid;
    border-right-width: 1px;
    box-sizing: border-box;
  }
</style>
<style>
  #menuWrap >>> span.no-arrow + i.el-submenu__icon-arrow {
    display: none !important;
    opacity: 0 !important;
  } 
</style>

<template>
  <el-scrollbar class="menu-wraper bl-menus" id="menuWrap">
    <div class="logo-wraper" :class="isCollapse?'w64':'w220'">
      <div class="menus-img-wrap" v-if="isCollapse">
        <img :src="menusImgUrl" alt="" height="26">
      </div>
      <div class="sys-switch-wrap" v-if="visibleChangePlatform && !isCollapse">
        <span 
          @click="toggPlaSlowDown">
          <i :class="loading ? 'el-icon-loading' : 'icon iconfont icon-liebiao'" aria-hidden="true"></i>
        </span>
      </div>
      <div class="logo" v-show="!isCollapse">
        <img :src="logoImgUrl" alt="" height="24">
      </div>
      <div class="plat-con-wrap" v-if="isPlatChShow">
        <a class="up-ang-icon">▲</a>
        <p v-for="(item, idx) in platSysOptions" :key="idx" @click="redirectSys(item.path)">
          {{item.clientName}}
        </p>
      </div>
    </div>
    <div class="option-wrap" v-if="!isCollapse && showOptionWrap">
      <div class='se-txt-wrap'>
        <span>{{sysStr}}</span> <span class="search-btn" @click="showMenuSearchHandel"><i class="el-icon-search " ></i></span>
      </div>
      <transition name="el-zoom-in-top">
        <div style="padding: 0 20px 4px 20px;" v-show="showSearchInput">
          <el-autocomplete
            class="inline-input"
            v-model="menuItem"
            value-key="menuName"
            :fetch-suggestions="querySearch"
            placeholder="请输入菜单名称"
            :trigger-on-focus="false"
            @select="handleSelect"
            size="mini"
            clearable
          ></el-autocomplete>
        </div>
      </transition>
    </div>
    <el-menu
      v-if="menus && menus.length > 0"
      :unique-opened="true"
      :default-active="defaultActive"
      class="el-menu-vertical"
      :class="isCollapse?'w64':'w220'"
      :collapse="isCollapse"
      :background-color="backgroundColor"
      :text-color="navTextColor"
      :active-text-color="activeTextColor">
      <slider-bar-item v-for="route in menus" :key="route.menuId" :route="route" />
    </el-menu>
    <div v-if="mLoading" class="m-loading">数据加载中...</div>
  </el-scrollbar>
</template>
<script>
import {mapGetters} from 'vuex'
import Storage from '@/utils/localStorage'
import config from '@/utils/config'
import {redirect} from '@/utils/utils'
import commonUrl from '@/api/Common'
import SliderBarItem from './SliderBarItem'
import {isBoomCreated} from '../../utils'
import baseLess from '@/assets/style/base.less'
export default{
  data() {
    return {
      backgroundColor: baseLess.colorSubBlack,
      activeTextColor: baseLess.colorMain,
      navTextColor: baseLess.colorGrey,
      visibleChangePlatform: config.visibleChangePlatform,
      menusImgUrl: `${config.baseRouter}/static/menus.png`,
      logoImgUrl: config.logoImgUrl ? config.logoImgUrl : `${config.baseRouter}/static/logo.png`,
      mLoading: false,
      defaultActive: this.$route.path,
      allMenus: [],
      menus: [],

      // 是否显示平台切换的下拉框
      isPlatChShow: false,
      platSysOptions: [],
      loading: false,
      
      showOptionWrap: true,
      sysStr: config.sysStr,
      showSearchInput: false,
      menuItem: '',

      userPermissionMap: {}
    }
  },
  created() {
    // 获取菜单
    this.getMenus()
    // 设置默认展开项
    this.setDefauteActive();
  },
  computed: {
    isCollapse() {
      return this.$store.state.common.collapse
    }
  },
  watch: {
    $route () {
      this.setDefauteActive()
    }
  },
  components: {
    'slider-bar-item': SliderBarItem
  },
  methods: {
    /**
     * [modifyAllMenus 格式化菜单数据]
     * @param  {[type]} _list [description]
     * @return {[type]}       [description]
     */
    modifyAllMenus(_list) {
      _list.forEach(item => {
        if(item.children.length !== 0) {
          this.modifyAllMenus(item.children)
        }else {
          // 兼容配置菜单的时候开始位置加 '/' 或者不加 '/' 的形式
          item.menuId = item.menuId && item.menuId.startsWith('/') ? item.menuId : `/${item.menuId}`
          let allMenusItem = {
            menuName: item.menuName || '',
            menuId: item.menuId
          }
          this.allMenus.push(allMenusItem)
          if(item.powerList && item.powerList.length) {
            this.userPermissionMap[item.menuId] = item.powerList
          }
        }
      })
    },
    /**
     * [getMenus 获取菜单]
     * @return {[type]} [description]
     */
    getMenus() {
      this.mLoading = true
      this.$http.post(commonUrl.queryMenu, {'queryUserPower': true, 'clientId': config.clientId}).then(res => {
        this.mLoading = false
        // 设置获取到的菜单
        if (res && res.code === 0) {
          // 1、菜单有内容设置新的菜单和缓存
          // 2、菜单没有内容跳转至   暂无访问权限页面
          // 设置获取到的菜单
          if(res.data && res.data.length > 0) {
            // 调用格式化菜单数据
            this.modifyAllMenus(res.data)
            // 数组对象去重
            let hash = {}
            const newAllMenusArr = this.allMenus.reduceRight((item, next) => {
              hash[next.menuId] ? '' : hash[next.menuId] = true && item.push(next);
              return item
            }, [])
            // 根据系统id本地缓存存储菜单
            let allMenusTemp = Storage.get('_menus') ? {...Storage.get('_menus')} : {}
            allMenusTemp[`${config.clientId}`] = [...newAllMenusArr]
            Storage.set('_menus', allMenusTemp)
            this.menus = res.data
            this.$store.dispatch('common/setUserOptions', {...this.userPermissionMap})
          }else {
            // 根据系统id本地缓存存储菜单
            let allMenusTemp = Storage.get('_menus') ? {...Storage.get('_menus')} : {}
            allMenusTemp[`${config.clientId}`] = [...this.allMenus]
            Storage.set('_menus', allMenusTemp)
            this.menus = []
            setTimeout(() => {
              this.$router.push('/noopt')
            }, 300)
          }
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.mLoading = false
        console.log("提示(菜单接口):", e.message);
      })
    },
    /**
     * [setDefauteActive 监听路由变化，设置默认菜单啊高亮]
     */
    setDefauteActive() {
      // 设置默认展开项
      if(this.$route.path) {
        if(isBoomCreated(this.$route.path)) {
          // 通用报表 boom 生成的页面
          if(this.$route.path.startsWith('/mixReport')) {
            // 复合报表
            let pathSplit = this.$route.path.split('/')
            this.defaultActive = `/${pathSplit[1]}/${pathSplit[2]}`
          }else {
            // 普通报表
            this.defaultActive = this.$route.path
          }
        }else {
          this.defaultActive = this.$route.path.match(/\/[^\/]+/)[0]
        }
      }else {
        this.defaultActive = '/index'
      }
    },
    /**
     * [toggPlaSlowDown 显示平台切换]
     * @return {[type]} [description]
     */
    toggPlaSlowDown (event) {
      event.stopPropagation()
      if(this.loading) {
        return;
      }
      if (this.isPlatChShow === true) {
        // 已经展开，再次点击关闭
        this.isPlatChShow = !this.isPlatChShow
      } else {
        // 1、请求接口获取有权限的平台
        // （1）如果有值，不在请求  无值再发送请求
        if (this.platSysOptions.length === 0) {
          this.loading = true
          this.$http.post(commonUrl.sysList, {excludePaths: [config.baseRouter], DIFFCITY: true}).then(res => {
            this.loading = false
            if (res.code === 0) {
              if (res.data && res.data.length) {
                this.platSysOptions = res.data
                // 未展开 未获取平台   获取平台成功之后  点击展开
                this.isPlatChShow = !this.isPlatChShow
              } else {
                this.$tip.message('不好意思，您暂无切换其他系统的权限！', 'warning')
              }
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.loading = false
            console.log('可切换平台列表(提示):', e.message)
          })
        } else {
          // 未展开  点击展开
          this.isPlatChShow = !this.isPlatChShow
        }
      }
    },
    /**
     * [hidePlaSlowDown 隐藏]
     * @return {[type]} [description]
     */
    hidePlaSlowDown () {
      if (this.isPlatChShow === false) {
        return
      }
      this.isPlatChShow = false
    },
    /**
     * [redirectSys 点击切换平台]
     * @param  {[type]} _path [description]
     * @return {[type]}       [description]
     */
    redirectSys (_path) {
      redirect(_path)
    },
    showMenuSearchHandel() {
      this.showSearchInput = !this.showSearchInput
    },
    /**
     * 菜单搜索框查询
     */
    querySearch(queryString, cb) {
      let results = this.allMenus.filter((item) => {
        return item.menuName.includes(queryString)
      });
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    /**
     * @description: 选中的值
     * @param {type} 
     * @return: 
     */
    handleSelect(item) {
      if(isBoomCreated(item.menuId)) {
        // type=menu 表示是主菜单
        this.$router.push(`${item.menuId}?type=menu`)
        this.goAddress(item)
      }else {
        this.$router.push(item.menuId)
      }
    },
    goAddress(route) {
      // 通用报表生成的页面跳转调用生成tab方法
      if(!isBoomCreated(route.menuId)) return
      let newRoute = {
        path: route.menuId,
        fullPath: route.menuId,
        name: route.menuId.slice(1),
        params: {},
        query: {
          type: 'menu'
        },
        hash: {},
        meta: {
          title: route.menuName,
          usePathKey: true
        }
      }
      newRoute.meta && newRoute.meta.title && this.$store.dispatch('tagsView/ADD_TAG_AND_CACHE', newRoute)
    }
  }
}
</script>
