<style scoped>
  .logo-wraper {
    height: 50px;
    background-color: #002140;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.4);

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .w220 {
    width: 220px;
  }
  .w64 {
    width: 64px;
  }
  .logo {
    width: 162px;
    height: 50px;
    background-image: url("/shop/static/h_logo.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 50%;
    cursor: pointer;
  }

  .sys-switch-wrap {
    padding: 0 0 0 20px;
    cursor: pointer;
  }
  .sys-switch-wrap>span {
    line-height: 50px;
    padding: 10px 0;
  }
  .sys-switch-wrap>span>i {
    font-size: 22px;
    color: #FFF;
  }
  .option-wrap {
    background-color: #1a2226;
  }
  .se-txt-wrap {
    padding: 4px 20px;
    color: #4b646f;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    flex-direction: row;
  }
  .search-btn {
    padding-left: 20px;
    cursor: pointer;
  }
  .up-ang-icon {
    position: absolute;
    top: -14px;
    left: 10px;
    color: #FFFFFF;
  }
  .plat-con-wrap {
    width: 190px;
    background-color: #FFFFFF;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 60px;
    left: 15px;
    border-radius: 6px;
  }
  .plat-con-wrap>p {
    line-height: 46px;
    font-size: 15px;
    color: #555555;
    text-align: left;
    cursor: pointer;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .plat-con-wrap>p:hover {
    color: rgb(64, 158, 255);
  }

  .menu-wraper{
    height: 100%;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    padding-top: 50px;
    box-sizing: border-box;
    background-color: #001529;
    position: relative;
  }
  .menu-wraper>.el-menu-vertical {
    border-right-color: #001529;
    border-right-style: solid;
    border-right-width: 1px;
    box-sizing: border-box;
  }
  .menu-wraper .el-submenu .el-menu-item {
    padding: 0 !important;
  }
  .menu-wraper .router-link-active>a.first-menu-link-a, .menu-wraper .router-link-active>a.second-menu-link-a, .menu-wraper .router-link-active>a.third-menu-link-a, .menu-wraper .router-link-activea.fourth-menu-link-a {
    color: rgb(64, 158, 255) !important;
  }
  .menu-wraper .second-menu-name-i-w {
    padding-left: 6px;
  }
  .menu-wraper .third-menu-name-i-w {
    padding-left: 14px;
  }
  .menu-wraper .fourth-menu-name-i-w {
    padding-left: 100px;
  }
  li.is-active a.first-menu-link-a {
    color: rgb(64, 158, 255) !important;
  }

  .iconfont-mh-icon {
    width: 24px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    margin-right: 5px;
    font-size: 16px;
  }
  .second-menu-link-a, .first-menu-link-a, .third-menu-link-a, .fourth-menu-link-a {
    width: 100%;
    text-decoration: none;
    display: inline-block;
    text-decoration: none;
    color: rgb(204, 204, 204) !important;
    box-sizing: border-box;
  }
  .second-menu-style {
    padding-left: 46px !important;
    padding-right: 10px;
  }
  .second-menu-style:hover {
    text-decoration: none;
  }
  .third-menu-style {
    padding-left: 74px !important;
    padding-right: 10px;
  }
  .third-menu-style:hover {
    text-decoration: none;
  }
  .fourth-menu-style {
    padding-left: 100px !important;
    padding-right: 10px;
  }
  .fourth-menu-style:hover {
    text-decoration: none;
  }
  #menuWrap >>> span.no-arrow + i.el-submenu__icon-arrow {
    display: none !important;
    opacity: 0 !important;
    background-color: red !important;
  }
</style>

<template>
  <div class="menu-wraper" id="menuWrap">
    <div class="logo-wraper" :class="isCollapse?'w64':'w220'">
      <div class="sys-switch-wrap">
        <span @click="toggPlaSlowDown">
          <i class="fa " :class="loading ? 'fa-spinner fa-spin' : 'fa-bars'" aria-hidden="true"></i>
        </span>
      </div>
      <transition name="el-zoom-in-center"><div class="logo" v-show="!isCollapse"></div></transition>
      <div class="plat-con-wrap" v-show="isPlatChShow">
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

    <div v-if="mLoading" style="text-align: center;line-height: 60px;">数据加载中...</div>
    
    <el-menu
      :unique-opened="true"
      :default-active="defaultActive"
      class="el-menu-vertical"
      :class="isCollapse?'w64':'w220'"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#cccccc"
      active-text-color="#409EFF">
      <div v-for="first of menus" :key="first.sysno">
        <el-menu-item :index="first.menuId" v-if="first.children && first.children.length === 0">
          <template v-if="isCollapse">
            <i class="iconfont icon-xian iconfont-mh-icon" aria-hidden="true"></i>
            <span slot="title" @click="goAddress(first.menuId)" style="cursor: pointer;">
              {{first.menuName}}
            </span>
          </template>
          <template v-else>
            <i class="iconfont icon-xian iconfont-mh-icon" aria-hidden="true"></i>
            <router-link :to="first.menuId">
              <a class="first-menu-link-a first-menu-style">{{first.menuName}}</a>
            </router-link>
          </template>
        </el-menu-item>
        <el-submenu :index="first.menuId" v-else>
          <template slot="title">
            <i :class="first.menuId" class="iconfont-mh-icon" aria-hidden="true"></i>
            <span :class="isCollapse ? 'no-arrow' : null" v-show="!isCollapse">{{first.menuName}}</span>
          </template>
          <div v-for="second of first.children" :key="second.sysno">
            <el-menu-item :index="second.menuId" v-if="second.children.length === 0">
              <router-link tag="li" :to="second.menuId">
                <a class="second-menu-link-a" :class="isCollapse ? null : 'second-menu-style'">{{second.menuName}}</a>
              </router-link>
            </el-menu-item>
            <el-submenu :index="second.menuId" v-else>
              <template slot="title">
                <div class="second-menu-name-i-w">{{second.menuName}}</div>
              </template>
              <div v-for="third of second.children" :key="third.sysno">
                <el-menu-item :index="third.menuId" v-if="third.children.length === 0">
                  <router-link tag="li" :to="third.menuId">
                    <a class="third-menu-link-a" :class="isCollapse ? null : 'third-menu-style'">{{third.menuName}}</a>
                  </router-link>
                </el-menu-item>
                <!-- 四级内容 -->
                <el-submenu :index="third.menuId" v-else>
                  <template slot="title">
                    <div class="third-menu-name-i-w">{{third.menuName}}</div>
                  </template>
                  <div v-for="fourth of third.children" :key="fourth.sysno">
                    <el-menu-item :index="fourth.menuId">
                      <router-link tag="li" :to="fourth.menuId">
                        <a class="fourth-menu-link-a" :class="isCollapse ? null : 'fourth-menu-style'">{{fourth.menuName}}</a>
                      </router-link>
                    </el-menu-item>
                  </div>
                </el-submenu>
              </div>
            </el-submenu>
          </div>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>
<script>
import Storage from '@/utils/localStorage'
import config from '@/utils/config'
import commonUrl from '@/api/Common'
export default{
  data() {
    return {
      mLoading: false,
      isCollapse: false,
      defaultActive: this.$route.path,
      allMenus: [],
      allMenusTemp: [],
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
  watch: {
    $route () {
      this.setDefauteActive()
    }
  },
  methods: {
    /**
     * 关闭菜单
     */
    closeMenu () {
      this.isCollapse = true
    },
    /**
     * 展示菜单
     */
    showMenu () {
      this.isCollapse = false
    },
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
          let allMenusItem = {
            menuId: item.menuId
          }
          let allMenusItemTemp = {
            menuName: item.menuName || '',
            menuId: item.menuId
          }
          this.allMenus.push(allMenusItem)
          this.allMenusTemp.push(allMenusItemTemp)
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
      this.$http.post(commonUrl.queryMenu, {'queryUserPower': true, 'clientId': config.clientId, DIFFCITY: true}).then(res => {
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
            // 本地缓存存储菜单
            Storage.set("allMenus", newAllMenusArr)
            this.menus = res.data
            this.$store.dispatch('common/setUserOptions', {...this.userPermissionMap})
          }else {
            // 本地缓存存储菜单
            Storage.set("allMenus", this.allMenus)
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
        this.$notify.error({
          title: '提示(菜单接口)',
          message: e.message
        })
      })
    },
    /**
     * [setDefauteActive 监听路由变化，设置默认菜单啊高亮]
     */
    setDefauteActive() {
      // 设置默认展开项
      if(this.$route.path) {
        this.defaultActive = this.$route.path.match(/\/[^\/]+/)[0] 
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
                this.$message.warning('不好意思，您暂无切换其他系统的权限！')
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
      let protocol = window.location.protocol
      let host = window.location.host
      let pathName = _path
      let str = '//'
      let url = `${protocol}${str}${host}${pathName}`
      window.location.href = url
    },
    showMenuSearchHandel() {
      this.showSearchInput = !this.showSearchInput
    },
    /**
     * 菜单搜索框查询
     */
    querySearch(queryString, cb) {
      let results = this.allMenusTemp.filter((item) => {
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
      this.$router.push(item.menuId)
    },
    goAddress(_path) {
      this.$router.push(_path)
    }
    
  }
}
</script>
