<template>
  <div>
    <el-form label-position="top" ref="form" size="mini" class="common-query-module">
      <form-module ref="FormModule" :queryItems="queryItems" :searchItems="searchItems" :showQueryButton="showQueryButton" :showResetButton="showResetButton" :searchItemsAll="searchItemsAll" @searchAll="searchAll"></form-module>
    </el-form>
    <i class="el-icon-setting filter-right-top" @click="chooseColumn"></i>
    <el-dialog title="选择展示列" :visible.sync="isShowChooseColumn" width="60%" class="dialog-tree" top="10vh">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllColumns" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedColumns" @change="handlecheckedColumnsChange">
        <el-checkbox v-for="item in queryItems" :label="item.columnName" :key="item.columnName">{{item.labelName}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chooseColumnSure(false)" size="small">取 消</el-button>
        <el-button type="primary" @click="chooseColumnSure(true)" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  import formModule from './formModule'
  
  const commonReport = {
    // 获取搜索模块
    getQueryByModuleId: '/boom/a/report/module/query/getQueryByModuleId',
    // 获取搜索缓存
    getQueryCache: '/boom/a/report/module/query/cache/getQueryCache',
    // 保存搜索缓存
    saveQueryCache: '/boom/a/report/module/query/cache/saveQueryCache',
    // 获取列表隐藏字段
    getListFieldHint: '/boom/a/report/module/list/cache/getListFieldHint',
    // 保存列表隐藏字段
    saveListFieldHint: '/boom/a/report/module/list/cache/saveListFieldHint',
  }
  export default {
    name: 'query-module',
    props: ['pageId', 'queryModuleId', 'searchItems', 'pageCode', 'searchItemsAll'],
    data () {
      return {
        queryItems: [], // 查询控件参数
        isShowChooseColumn: false,
        checkAllColumns: true,
        checkedColumns: [],
        isIndeterminate: false,
        showQueryButton: true,
        showResetButton: true,
      }
    },
    components: {
      'form-module': formModule,
    },
    computed: {
    },
    mounted() {
      this.getQueryByModuleId()
      // this.getQueryCache()
    },
    watch: {
    },
    methods: {
      // 获取搜索模块
      getQueryByModuleId() {
        this.$http.post(commonReport.getQueryByModuleId, {moduleId: this.queryModuleId}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            if(res.data && res.data.queryItems) {
              this.queryItems = [...res.data.queryItems]
              if(res.data.url) {
                this.$emit('setSearchUrl', res.data.url)
              }
              if(res.data.showQueryButton) {
                this.showQueryButton = false
              }
              if(res.data.showResetButton) {
                this.showResetButton = false
              }
              setTimeout(() => {
                this.$refs.FormModule.initialize()
                this.$emit('queryModule', true)
              }, 100)
              this.getListFieldHint()
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取搜索模块失败：" + e.message)
        })
      },
      // 获取搜索缓存
      getQueryCache() {
        this.$http.post(commonReport.getQueryCache, {pageCode: this.pageCode}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            if(res.data && res.data.length) {
              res.data.forEach((item) => {
                this.searchItems[item.column] = item.cacheValue
              })
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取搜索缓存失败：" + e.message)
        })
      },
      // 保存搜索缓存
      saveQueryCache() {
        let queryList = []
        for(let key in this.searchItems) {
          queryList = [ 
            {
              cacheValue: this.searchItems[key],
              column: key
            },
            ...queryList
          ]
        }
        this.$http.post(commonReport.saveQueryCache, {pageCode: this.pageCode, queryList: queryList}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("保存搜索缓存失败：" + e.message)
        })
      },
      chooseColumn() {
        this.isShowChooseColumn = true
        this.checkedColumns = []
        this.queryItems.forEach(item => {
          if(item.isShow) {
            this.checkedColumns = [item.columnName, ...this.checkedColumns]
          }
        })
      },
      handleCheckAllChange(val) {
        let allColumns = []
        this.queryItems.forEach(item => {
          allColumns = [...allColumns, item.columnName]
        })
        this.checkedColumns = val ? allColumns : [];
        this.isIndeterminate = false;
      },
      handlecheckedColumnsChange(value) {
        let checkedCount = value.length;
        this.checkAllColumns = checkedCount === this.queryItems.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.queryItems.length;
      },
      chooseColumnSure(param) {
        if(param) {
          this.queryItems.forEach(item => {
            if(this.checkedColumns.indexOf(item.columnName) > -1) {
              item.isShow = true
            }else{
              item.isShow = false
            }
          })
        }
        this.$refs.FormModule.changeFold(this.queryItems)
        this.saveListFieldHint()
        this.isShowChooseColumn = false
      },
      // 获取列表隐藏字段
      getListFieldHint() {
        this.$http.post(commonReport.getListFieldHint, {moduleId: this.queryModuleId, pageCode: this.pageCode}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            let noOne  = true
            if(res.data && res.data.length) {
              let fieldList = []
              res.data.forEach((item) => {
                if(item.field) {
                  fieldList = [...fieldList, item.field]
                }
              })
              this.queryItems.forEach(item => {
                if(fieldList.indexOf(item.columnName) > -1) {
                  item.isShow = true
                  noOne  = false
                }else{
                  item.isShow = false
                }
              })
            }
            if(noOne) {
              //全部显示
              this.queryItems.forEach((item, i) => {
                item.isShow = true
              })
            }
            this.$refs.FormModule.changeFold(this.queryItems)
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取搜索缓存失败：" + e.message)
        })
      },
      // 保存列表隐藏字段
      saveListFieldHint() {
        this.$http.post(commonReport.saveListFieldHint, {moduleId: this.queryModuleId, pageCode: this.pageCode, fieldList: this.checkedColumns}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("保存搜索缓存失败：" + e.message)
        })
      },
      // 查询-先判断必填项
      requiredFormat(first) {
        return this.$refs.FormModule.requiredFormat(first)
      },
      // 查询
      searchAll() {
        // 先判断必填项
        if(this.requiredFormat() === false) {
          return
        }
        // this.saveQueryCache()
        this.$emit('searchAll')
      },
    }
  }
</script>
