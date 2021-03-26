<template>
  <el-dialog :title="dialogTitle" :visible.sync="isShow" width="60%" class="dialog-tree" top="10vh">
    <div class="common-report-module">
      <el-tooltip effect="dark" placement="left-start" v-if="pageComment">
        <div slot="content" class="title-tooltip">{{pageComment}}</div>
        <i class="el-icon-info tooltip-right-top"></i>
      </el-tooltip>
      <div v-for="(item, index) in layout" :key="index">
        <el-row :gutter="10">
          <el-col :span="24/item.length" v-for="(item_, index_) in item" :key="index_">
            <!-- 搜索模块 -->
            <div v-if="item_.moduleType === 0 && searchModuleShow" class="common-layout">
              <query-module :ref="'QueryModule' + item_.moduleId" :queryModuleId="item_.moduleId" :searchItems="searchItems" :searchItemsAll="searchItemsAll" :pageCode="pageCode" @searchAll="searchAll" @setSearchUrl="setSearchUrl" @queryModule="queryModule"></query-module>
            </div>
            <!-- 表格模块 -->
            <div v-if="item_.moduleType === 1" class="common-layout">
              <table-module :ref="'TableModule' + item_.moduleId" :pageId="pageId" :tableModuleId="item_.moduleId" :searchItems="searchItems" :searchUrl="searchUrl" :pageName="pageName" :pageCode="pageCode" :getQueryModule="getQueryModule" :system="system" :collectItems="collectItems" @requiredFormat="requiredFormat" @intentSearch="intentSearch"></table-module>
            </div>
            <!-- 图表模块 -->
            <div v-if="item_.moduleType === 2" class="common-layout">
              <chart-module :ref="'ChartModule' + item_.moduleId" :pageId="pageId" :chartModuleId="item_.moduleId" :searchItems="searchItems" :getQueryModule="getQueryModule" :searchUrl="searchUrl" @requiredFormat="requiredFormat"></chart-module>
            </div>
            <!-- tab模块 -->
            <div v-if="item_.moduleType === 3" class="common-layout">
              <tabs-module :ref="'TabsModule' + item_.moduleId" :pageId="pageId" :tabsModuleId="item_.moduleId" :searchItems="searchItems" :system="system" :searchUrl="searchUrl" :pageName="pageName" :pageCode="pageCode" :getQueryModule="getQueryModule" :collectItems="collectItems"></tabs-module>
            </div>
            <!-- input模块 -->
            <div v-if="item_.moduleType === 4" class="common-layout">
              <input-module :ref="'InputModule' + item_.moduleId" :pageId="pageId" :inputModuleId="item_.moduleId" :searchItems="searchItems" :getQueryModule="getQueryModule" :collectItems="collectItems" :searchItemsAll="searchItemsAll" @requiredFormat="requiredFormat"></input-module>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div slot="footer">
      <el-button size="mini" type="primary" @click="closeDialog(item)" v-for="(item, index) in buttonItems" :key="index">{{item.name}}</el-button>
      <el-button size="mini" @click="closeDialog(false)">关闭</el-button>
    </div>
    </el-dialog>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  import queryModule from './reportModules/queryModule'
  import tableModule from './reportModules/tableModule'
  import chartModule from './reportModules/chartModule'
  import tabsModule from './reportModules/tabsModule'
  import inputModule from './reportModules/inputModule'
  import config from '@/utils/config'
  import toolsMixin from './mixin/tools'
  const commonReport = {
    // 获取报表基本配置
    getPageByPageId: '/boom/a/dynamicReport/getPageByPageId',
    // 获取操作模块
    getActionByModuleId: '/boom/a/report/module/action/getActionByModuleId',
    // 新增
    insert: '/boom/a/dynamicReport/insert',
    // 修改
    update: '/boom/a/dynamicReport/update',
    // 批量修改
    updateBatch: '/boom/a/dynamicReport/updateBatch'
  }
  export default {
    name: 'common-report',
    mixins: [toolsMixin],
    props: ['dialogTitle', 'dataSource', 'tableName', 'buttonType', 'updateId'],
    data () {
      return {
        isShow: false,
        system: config.clientId, // 系统
        pageCode: '', // 表格Code
        pageId: '', // 表格ID
        pageName: '', // 报表名称
        pageComment: '', // 报表提示
        layout: [], // 布局
        modules: [], // 模块
        searchItems: {}, // 查询项
        searchItemsAll: {},
        searchModuleShow: true, // 查询模块是否显示
        versionId: '', // 历史版本
        searchUrl: '', // 查询地址
        getQueryModule: false, // 是否获取到查询项
        collectItems: {},
        buttonItems: [],
        idList: [],
      }
    },
    components: {
      'query-module': queryModule,
      'table-module': tableModule,
      'chart-module': chartModule,
      'tabs-module': tabsModule,
      'input-module': inputModule,
    },
    computed: {
    },
    watch: {
    },
    methods: {
      // 清除页面数据
      clearPage() {
        this.layout = [] // 布局
        this.modules = []
        this.searchItems = {}
      },
      setDefault(pageCode, searchItems, idList) {
        this.isShow = true
        this.clearPage()
        this.pageCode = pageCode
        if(searchItems) {
          this.searchItemsAll = {...searchItems}
        }
        if(idList && idList.length) {
          this.idList = [...idList]
        }
        this.getPageByPageId()
      },
      setSearchItems() {
        if(this.$route.query.type === 'menu') return // 如果是一级菜单跳转来的就不主动添加搜索条件
        let obj = {}
        if(Storage.get('jumpReport') && Storage.get('jumpReport') != 'undefined') {
          obj = Storage.get('jumpReport')
        }
        for(let key in obj) {
          if(key == this.pageCode) {
            let searchInfo = obj[key].searchInfo
            this.searchItems = {...searchInfo}
          }
        }
      },
      // 获取报表基本配置
      getPageByPageId() {
        this.$loading.show()
        this.$http.post(commonReport.getPageByPageId, {pageCode: this.pageCode, versionId: this.versionId}, null, null, 'boomdebug').then((res) => {
          this.$loading.hide()
          if (res.code === 0) {
            if(res.data) {
              this.pageName = res.data.pageName
              this.modules = res.data.modules || []
              this.pageComment = res.data.pageComment
              this.pageId = res.data.id
              this.formatLayout(res.data.layout)
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.$notify.error({
            title: '提示',
            message: e.message
          })
        })
      },
      // 格式化layout
      formatLayout(val) {
        this.setSearchItems()
        let havequeryModule = false
        // 排除掉空数据
        val.forEach((item, i) => {
          let arr = []
          arr = item.filter((item_, i_) => {
            if(item_.moduleType === 0) {
              havequeryModule = true
            }
            return item_.moduleType !== undefined && item_.moduleId !== undefined
          })
          if(arr.length > 0) {
            val[i] = arr
          }
        })
        if(!havequeryModule) {
          this.getQueryModule = true
        }
        this.layout = val
        this.layout.forEach((item) => {
          item.forEach(item_ => {
            if(item_.moduleType === 5) {
              this.$http.post(commonReport.getActionByModuleId, {moduleId: item_.moduleId}, null, null, 'boomdebug').then((res) => {
                if (res.code === 0) {
                  if(res.data && res.data.buttonVos) {
                    this.buttonItems = [...res.data.buttonVos]
                  }
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                console.log("获取操作模块失败：" + e.message)
              })
            }
          })
        })
      },
      requiredFormat(first) {
        let required
        this.modules.forEach(item => {
          if(item.moduleType === 0 && this.$refs[`QueryModule${item.moduleId}`]) {
            if((this.$refs[`QueryModule${item.moduleId}`])[0].requiredFormat(first) === false) required = false
          }else if(item.moduleType === 4 && this.$refs[`InputModule${item.moduleId}`]) {
            if((this.$refs[`InputModule${item.moduleId}`])[0].requiredFormat(first) === false) required = false
          }
        })
        return required
      },
      searchAll() {
        this.modules.forEach(item => {
          if(item.moduleType === 1 && this.$refs[`TableModule${item.moduleId}`]) {
            (this.$refs[`TableModule${item.moduleId}`])[0].tableSearch()
          }else if(item.moduleType === 2 && this.$refs[`ChartModule${item.moduleId}`]) {
            (this.$refs[`ChartModule${item.moduleId}`])[0].chartSearch()
          }else if(item.moduleType === 3 && this.$refs[`TabsModule${item.moduleId}`]) {
            (this.$refs[`TabsModule${item.moduleId}`])[0].searchAll()
          }
        })
      },
      setSearchUrl(url) {
        this.searchUrl = url
      },
      queryModule(params) {
        this.getQueryModule = params
      },
      save(param) {
        // 先判断必填项
        if(this.requiredFormat() === false) {
          return
        }
        if(this.buttonType === 0) {
          this.$http.post(param.url || commonReport.insert, {pageId: this.pageId, dataSource: this.dataSource, tableName: this.tableName, data: this.searchItems}, null, null, 'boomdebug').then((res) => {
            if (res.code === 0) {
              this.$message.success(`${this.dialogTitle}成功`)
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.$message(e.message)
          })
        }else if(this.buttonType === 1) {
          let obj = {
            id: this.updateId,
            ...this.searchItems,
          }
          this.$http.post(param.url || commonReport.update, {pageId: this.pageId, dataSource: this.dataSource, tableName: this.tableName, data: obj}, null, null, 'boomdebug').then((res) => {
            if (res.code === 0) {
              this.$message.success(`${this.dialogTitle}成功`)
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.$message(e.message)
          })
        }else if(this.buttonType === 7) {
          // batchIds 批量修改的id集合
          this.$http.post(param.url || commonReport.updateBatch, {pageId: this.pageId, dataSource: this.dataSource, tableName: this.tableName, data: this.searchItems, batchIds: [ ...this.idList]}, null, null, 'boomdebug').then((res) => {
            if (res.code === 0) {
              this.$message.success(`${this.dialogTitle}成功`)
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.$message(e.message)
          })
        }
        if(param.afterOption === 0) {
          this.isShow = false
        }
      },
      // 关联查询
      intentSearch(params) {
        if(params && params.moduleId) {
          this.modules.forEach(item => {
            if(item.moduleId === params.moduleId) {
              (this.$refs[`TableModule${item.moduleId}`])[0].tableSearch(null, params.searchItems)
            }
          })
        }
      },
      closeDialog(param) {
        if(param) {
          this.save(param)
        }else{
          this.isShow = false
        }
        this.$emit('closeDialog', param);
      },
    }
  }
</script>
