<style scoped>
  .bread-crumb-wraper {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    font-size: 12px;
  }
  .bread-crumb-wraper .b-c {
    padding-left: 20px;
    position: relative;
  }
  .bread-crumb-wraper .b-c .b-address {
    display:inline-block;
    position:absolute;
    top:-2px;
    left:0;
  }
  .bread-crumb-wraper .b-c .b-address>i {
    font-size: 18px;
  }
</style>

<template>
  <div class="bread-crumb-wraper">
    <el-breadcrumb class='b-c' separator-class="el-icon-arrow-right"> 
      <span class="b-address"><i class="el-icon-location"></i></span>
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
        <span v-if="!item.path || index === breadcrumbList.length - 1">{{ item.name }}</span>
        <router-link v-else :to="item.path">
          {{ item.name }}
        </router-link>
      </el-breadcrumb-item>
    </el-breadcrumb> 
  </div>
</template>

<script>
  export default {
    data() {
      return {
        breadcrumbList: []
      } 
    },
    watch: {
      $route(to) {
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        this.breadcrumbList = this.$route.meta.breadcrumbList && this.$route.meta.breadcrumbList.length ? this.$route.meta.breadcrumbList : [{name: '首页', path: ''}]
      }
    }
  }
</script>