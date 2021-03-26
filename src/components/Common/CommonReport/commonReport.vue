<template>
  <div class="common-report-module">
    <div v-if="showAction" class="common-layout common-action no-mb">
      <span v-for="(e, i) in buttonItems" :key="i">
        <el-button v-if="e.type === 0" type="text" @click="save(i)" size="small" icon="el-icon-success"> {{e.name || '保存'}}</el-button>
        <el-button v-if="e.type === 1" type="text" @click="close(i)" size="small" icon="el-icon-error"> {{e.name || '关闭'}}</el-button>
        <el-button v-if="e.type === 2" type="text" @click="next(i)" size="small" icon="el-icon-d-arrow-right"> {{e.name || '下一步'}}</el-button>
      </span>
      <hr class="back-division"/>
    </div>
    <el-tooltip effect="dark" placement="left-start" v-if="pageComment">
      <div slot="content" class="title-tooltip">{{pageComment}}</div>
      <i class="el-icon-info tooltip-right-top"></i>
    </el-tooltip>
    <div v-for="(item, index) in layout" :key="index">
      <el-row :gutter="10">
        <el-col :span="24/item.length" v-for="(item_, index_) in item" :key="index_">
          <!-- 搜索模块 -->
          <div v-if="item_.moduleType === 0 && searchModuleShow" class="common-layout">
            <query-module :ref="'QueryModule' + item_.moduleId" :queryModuleId="item_.moduleId" :searchItems="searchItems" :pageCode="pageCode" @searchAll="searchAll" @setSearchUrl="setSearchUrl" @queryModule="queryModule"></query-module>
          </div>
          <!-- 表格模块 -->
          <div v-if="item_.moduleType === 1" class="common-layout">
            <table-module :ref="'TableModule' + item_.moduleId" :pageId="pageId" :tableModuleId="item_.moduleId" :searchItems="searchItems" :searchUrl="searchUrl" :pageName="pageName" :pageCode="pageCode" :getQueryModule="getQueryModule" :system="system" :collectItems="collectItems" @requiredFormat="requiredFormat" @authorityLayer="authorityLayer" @intentSearch="intentSearch"></table-module>
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
            <input-module :ref="'InputModule' + item_.moduleId" :pageId="pageId" :inputModuleId="item_.moduleId" :searchItems="searchItems" :getQueryModule="getQueryModule" :collectItems="collectItems" @requiredFormat="requiredFormat"></input-module>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="很抱歉，您没有权限"
      top="10vh"
      :visible.sync="isauthorityLayer"
      width="60%" >
      <div>本来鲜的开菜单权限流程：发邮件抄送上级领导审批后转交给各区域负责人开通。</div>
      <div>各区域负责人如下：</div>
      <div>广东  钟楚玉(gdit@benlai.com)</div>
      <div>武汉  徐露（xulu01@benlai.com）/李昕（lixin0205@benlai.com）</div>
      <div>天津  李竞成（lijingcheng@benlai.com）</div>
      <div>成都  王宏林（wanghonglin@benlai.com）</div>
      <div>郑州  牛鹏举（niupengju@benlai.com）</div>
      <div>长沙  文诗璟（wenshijing@benlai.com）/涂雒（tuluo@benlai.com）</div>
      <div>优选  chenshanlong@sfmail.sf-express.com</div>
      <span slot="footer" class="dialog-footer"> 
      </span>
    </el-dialog>
  </div>
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
  }
  export default {
    name: 'common-report',
    mixins: [toolsMixin],
    data () {
      return {
        system: config.clientId, // 系统
        pageCode: '', // 表格Code
        pageId: '', // 表格ID
        pageName: '', // 报表名称
        pageComment: '', // 报表提示
        showAction: false,
        layout: [], // 布局
        modules: [], // 模块
        searchItems: {}, // 查询项
        searchModuleShow: true, // 查询模块是否显示
        isauthorityLayer: false,//权限弹窗
        versionId: '', // 历史版本
        searchUrl: '', // 查询地址
        getQueryModule: false, // 是否获取到查询项
        collectItems: {},
        buttonItems: []
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
        this.showAction = false
        this.layout = [] // 布局
        this.modules = []
        this.searchItems = {}
      },
      authorityLayer(data) {
        if(data) {
          this.isauthorityLayer = true
        }
      },
      setDefault(pageCode, searchItems, queryItems) {
        this.clearPage()
        this.pageCode = pageCode
        if(searchItems) {
          this.searchItems = searchItems
        }
        if(queryItems) {
          queryItems.forEach((item, index) => {
            if(item.checkNameVal) {
              setTimeout(() => {
                this.$set(this.queryItems, index, item)
              }, 200)
            }
            if(item.checkCascader) {
              setTimeout(() => {
                this.$set(this.queryItems, index, item)
              }, 200)
            }
          })
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
                    this.buttonItems = [...this.buttonItems, ...res.data.buttonVos]
                    this.buttonItems.forEach(item => {
                      // type: 0-数据 1-跳转 2-数据+跳转
                      if(item.type === 0 || item.type === 1) {
                        this.showAction = true
                      }
                    })
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
      requiredFormat(first, callback) {
        this.modules.forEach(item => {
          if(item.moduleType === 0 && this.$refs[`QueryModule${item.moduleId}`]) {
            callback((this.$refs[`QueryModule${item.moduleId}`])[0].requiredFormat(first))
          }else if(item.moduleType === 4 && this.$refs[`InputModule${item.moduleId}`]) {
            callback((this.$refs[`InputModule${item.moduleId}`])[0].requiredFormat(first))
          }
        })
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
      save(i) {
        this.$http.post(this.buttonItems[i].url, {...this.collectItems}).then((res) => {
          if (res.code === 0) {
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("操作模块点击保存失败" + e.message)
        })
      },
      close(i) {
        this.routerPush(i)
      },
      next(i) {
        this.$http.post(this.buttonItems[i].url, {...this.collectItems}).then((res) => {
          if (res.code === 0) {
            this.routerPush(i)
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("操作模块点击下一步失败" + e.message)
        })
      },
      routerPush(i) {
        let redirectUrl = this.buttonItems[i].path
        let urlArr = redirectUrl.split('/')
        let pageId = urlArr[2]
        let obj = {}
        if(Storage.get('jumpReport') && Storage.get('jumpReport') != 'undefined') {
          obj = Storage.get('jumpReport')
        }
        obj[pageId] = {
          ...this.collectItems
        }
        Storage.set('jumpReport', obj)
        let url = `${redirectUrl}/b0bf68a/report`
        // 跳转
        let newRoute = {
          path: url,
          fullPath: url,
          name: url.slice(1),
          params: {},
          query: {},
          hash: {},
          meta: {
            title: `${this.$route.query.menuName}`,
            usePathKey: true
          }
        }
        newRoute.meta && newRoute.meta.title && this.$store.commit('tagsView/ADD_TAG_ONLY', newRoute)
        this.$router.push(url)
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
    }
  }
</script>
