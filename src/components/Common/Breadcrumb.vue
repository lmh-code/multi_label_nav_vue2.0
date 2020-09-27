<style>
  .bread-crumb-wraper {
    width: 100%;
    padding: 16px 0;
    font-size: 12px;
  }
  .b-c {
    padding-left: 20px;
    position: relative;
  }
  .b-address {
    display:inline-block;
    position:absolute;
    top:-2px;
    left:0;
  }
  .b-address>i {
    font-size: 18px;
  }
</style>
<template>
  <div class="bread-crumb-wraper">
    <el-breadcrumb class='b-c' separator-class="el-icon-arrow-right"> 
      <span class="b-address"><i class="el-icon-location"></i></span>
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
        <router-link v-if="item.path" :to="item.path">
          {{ item.name }}
        </router-link>
        <span v-else>
          {{ item.name }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb> 
  </div>
</template>

<script>
  export default {
    data() {
      return {
        breadList: [] // 路由集合
      }
    },
    created() {
      this.getBreadcrumb()
    },
    watch: {
      $route () {
        this.getBreadcrumb()
      }
    },
    methods: {
      /**
       * [getBreadcrumb 获取面包屑数组]
       * @return {[type]} [description]
       */
      getBreadcrumb() {
        // 获取路由信息
        let breadcrumbList = typeof(this.$route.meta.breadcrumbList) != "undefined" ? this.$route.meta.breadcrumbList : [{name: '首页', path: '/'}] 
        this.breadList = breadcrumbList
      }
    }
  }
</script>