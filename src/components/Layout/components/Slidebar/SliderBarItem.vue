<template>
  <div>
    <el-submenu 
      v-if="route.children && route.children.length" 
      :index="route.menuId" 
      popper-append-to-body>
      <template slot="title">
        <i class="iconfont" :class="route.menuId" aria-hidden="true"></i>
        <span :class="isCollapse && route.parentSysNo === -1 ? 'no-arrow' : ''" >
          {{route.menuName}}
        </span>
      </template>
      <menus-item
        v-for="child in route.children"
        :key="child.menuId"
        :route="child"/>
    </el-submenu>
    <template v-else>
      <router-link :to="isBoomCreated(route.menuId) ? `${route.menuId}?type=menu` : route.menuId">
        <el-menu-item :index="route.menuId" @click="goAddress(route)">
          <span class="icon iconfont icon-xian" v-if="route.parentSysNo === -1"></span>
          <span slot='title'>{{route.menuName}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
  import {isBoomCreated} from '../../utils'
  export default {
    name: 'MenusItem',
    props: {
      route: {
        type: Object,
        required: true,
        default: {}
      }
    },
    computed: {
      isCollapse() {
        return this.$store.state.common.collapse
      }
    },
    methods: {
      isBoomCreated(menuId) {
        return isBoomCreated(menuId)
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