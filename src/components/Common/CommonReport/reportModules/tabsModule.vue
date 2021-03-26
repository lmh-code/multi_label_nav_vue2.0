<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(item, index) in modules" :key="index" :name="item.moduleTabName" :label="item.moduleTabName">
        <!-- 表格模块 -->
        <div v-if="item.moduleType === 1" class="common-layout">
          <table-module :ref="'TableModule' + item.moduleId" :pageId="pageId" :tableModuleId="item.moduleId" :searchItems="searchItems" :searchUrl="searchUrl" :pageName="pageName" :pageCode="pageCode" :getQueryModule="getQueryModule" :system="system" :collectItems="collectItems"></table-module>
        </div>
        <!-- 图表模块 -->
        <div v-if="item.moduleType === 2" class="common-layout">
          <chart-module :ref="'ChartModule' + item.moduleId" :pageId="pageId" :chartModuleId="item.moduleId" :searchItems="searchItems" :getQueryModule="getQueryModule" :searchUrl="searchUrl"></chart-module>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  import tableModule from './tableModule'
  import chartModule from './chartModule'
    
  const commonReport = {
    // 获取tabs模块 
    getTabByModuleId: '/boom/a/report/module/tab/getTabByModuleId',
  }
  
  export default {
    name: 'tabs-module',
    props: ['pageId', 'tabsModuleId', 'searchItems', 'getQueryModule', 'system', 'searchUrl', 'pageName', 'pageCode', 'collectItems'],
    data () {
      return {
        modules: [],
        activeName: '',
      }
    },
    components: {
      'table-module': tableModule,
      'chart-module': chartModule,
    },
    computed: {
    },
    mounted() {
      this.getTabByModuleId()
    },
    watch: {
    },
    methods: {
      getTabByModuleId() {
        this.$http.post(commonReport.getTabByModuleId, {moduleId: this.tabsModuleId}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            if(res.data && res.data.moduleVos && res.data.moduleVos.length) {
              this.modules = [...res.data.moduleVos]
              if(this.modules && this.modules[0]) {
                this.activeName = this.modules[0].moduleTabName
              }
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取tabs模块失败：" + e.message)
        })
      },
      searchAll() {
        this.modules.forEach(item => {
          if(item.moduleType === 1) {
            (this.$refs[`TableModule${item.moduleId}`])[0].tableSearch()
          }else if(item.moduleType === 2) {
            (this.$refs[`ChartModule${item.moduleId}`])[0].chartSearch()
          }
        })
      },
    }
  }
</script>
