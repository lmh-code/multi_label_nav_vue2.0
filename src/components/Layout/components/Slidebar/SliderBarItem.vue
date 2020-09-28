<style>
  span.no-arrow {
    display: none !important;
    opacity: 0 !important;
  }
  span.no-arrow + i.el-submenu__icon-arrow {
    display: none !important;
    opacity: 0 !important;
  }
</style>
<template>
  <div>
    <el-submenu 
      v-if="route.children && route.children.length" 
      :index="route.menuId" 
      popper-append-to-body>
      <template slot="title">
        <i :class="route.menuId" aria-hidden="true"></i>
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
      <router-link :to="route.menuId">
        <el-menu-item :index="route.menuId">
          <span class="icon iconfont icon-xian" v-if="route.parentSysNo === -1"></span>
          <span slot='title'>{{route.menuName}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
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
    }
  }
</script>