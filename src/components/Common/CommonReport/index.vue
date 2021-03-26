<style>
  .common-report-module,
  .common-report-module .common-layout{
    position: relative;
  }
  .common-report-module .common-layout{
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  .common-report-module .common-layout.common-action{
    margin-bottom: 0;
    border-bottom: 1px dashed #ddd;
  }
  .common-report-module .common-query-module .el-form-item{
    margin: 0 20px 4px 0;
    display: inline-block;
  }
  .common-report-module .common-query-module label{
    padding: 0;
  }
  .common-report-module .common-query-module .common-goods-style{
    position: relative;
  }
  .common-report-module .common-query-module .common-goods-style button{
    position: absolute;
    right: 0;
    top: 0px;
    padding: 5px 10px;
    margin: 2px;
    border: none;
    border-left: 1px solid #DCDFE6;
    border-radius: 0;
  }
  .common-report-module .common-query-module .common-goods-style .el-input--suffix .el-input__inner{
    padding-right: 55px;
  }
  .common-report-module .common-query-module .common-goods-style .el-input__suffix{
    right: 35px;
  }
  .common-report-module .common-query-module .el-form-item__content input,
  .common-report-module .common-query-module .el-date-editor.el-input,
  .common-report-module .common-query-module .el-date-editor.el-input__inner{
    width: 180px;
  }
  .common-report-module .common-query-module .el-date-editor--datetime.el-input,
  .common-report-module .common-query-module .el-date-editor--datetime input{
    width: 180px !important;
  }
  .common-report-module .common-chart-module{
    background: #fff;
    height: 300px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px
  }
  .common-report-module .common-table-module .el-pagination{
    text-align: center;
    margin-top: 10px;
  }
  .common-report-module .common-table-module .el-table th{
    text-align: center;
  }
  .common-report-module .common-table-module .el-table .is-group th{
    padding: 4px 0;
  }
  .common-report-module .common-table-module .clickable {
    color: #2ca2fc;
    cursor: pointer;
  }
  .common-report-module .common-table-module .common-operate span.clickable{
    margin-right: 8px;
  }
  .common-report-module .common-table-module .inline-modify {
    display: flex;
  }
  .common-report-module .common-table-module .inline-modify .el-input{
    width: 100%;
  }
  .common-report-module .common-table-module .inline-modify input{
    padding: 0 8px;
  }
  .common-report-module .common-table-module .inline-modify button{
    padding: 6px 7px 7px 7px;
  }
  .common-report-module .common-dialog-input .el-form-item{
    margin-bottom: 25px;
  }
  .common-report-module .common-dialog-input .el-form-item__content input{
    width: 140px;
  }
  .common-report-module .common-dialog-input .common-query-module .el-form-item__content input,
  .common-report-module .common-dialog-input .common-query-module .el-date-editor.el-input,
  .common-report-module .common-dialog-input .common-query-module .el-date-editor.el-input__inner{
    width: 140px !important;
  }
  .common-report-module .common-dialog-input .common-query-module .el-date-editor--datetime.el-input,
  .common-report-module .common-dialog-input .common-query-module .el-date-editor--datetime input{
    width: 140px !important;
  }
  .common-report-module .common-dialog-input .dialog-input-describe{
    font-size: 12px;
    position: absolute;
    top: 22px;
    left: 0;
  }
  .common-report-module .common-dialog-input .el-dialog__body{
    padding: 10px 20px;
  }
  .common-report-module .dialog-tree .el-dialog__body{
    padding: 0 20px 20px;
  }
  .common-report-module .laber-color-red{
    color: red;
  }
  .common-report-module .laber-color-green{
    color: lightgreen;
  }
  .common-report-module .dialog-upload .upload{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    padding: 10px 16px;
    font-weight: 500;
    border-radius: 3px;
    background: #2077FF;
    font-size: 12px;
  }
  .filter-right-top {
    position: absolute;
    top: 18px;
    right: 40px;
  }
  .tooltip-right-top{
    position: absolute;
    top: 18px;
    right: 10px;
    z-index: 10;
  }
  .title-tooltip{
    white-space: pre-wrap;
  }
  .input-paging{
    text-align: right;
    margin-top: 10px;
  }
</style>
<template>
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
          <!-- 操作模块 -->
          <div v-if="item_.moduleType === 5" class="common-layout common-action">
            <action-module :ref="'ActionModule' + item_.moduleId" :pageId="pageId" :actionModuleId="item_.moduleId" :collectItems="collectItems" :backReport="backReport"></action-module>
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
  import actionModule from './reportModules/actionModule'
  import config from '@/utils/config'
  import toolsMixin from './mixin/tools'
  const commonReport = {
    // 获取报表基本配置
    getPageByPageId: '/boom/a/dynamicReport/getPageByPageId'
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
        layout: [], // 布局
        modules: [], // 模块
        searchItems: {}, // 查询项
        searchModuleShow: true, // 查询模块是否显示
        isauthorityLayer: false,//权限弹窗
        versionId: '', // 历史版本
        searchUrl: '', // 查询地址
        getQueryModule: false, // 是否获取到查询项
        collectItems: {},
        buttonItems: [],
        backReport: {}
      }
    },
    components: {
      'query-module': queryModule,
      'table-module': tableModule,
      'chart-module': chartModule,
      'tabs-module': tabsModule,
      'input-module': inputModule,
      'action-module': actionModule,
    },
    computed: {
    },
    beforeRouteUpdate(to, from, next) {
      this.pageCode = to.params.id
      this.versionId = to.params.version || ''
      next()
      this.clearPage()
      this.getPageByPageId()
    },
    created() {
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?43c5b659702bcb76a4dde9d1eb06afba";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      this.pageCode = this.$route.params.id
      this.versionId = this.$route.params.version || ''
      let urlArr = this.$route.path.split('/')
      if(urlArr[1] === 'mixReport') {
        return
      }
      this.clearPage()
      this.getPageByPageId()
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
            if(obj[key].backReport) {
              this.backReport.backReport = obj[key].backReport
            }
            if(obj[key].actionType) {
              this.backReport.actionType = obj[key].actionType
            }
            if(obj[key].bottonParmas) {
              this.backReport.bottonParmas = obj[key].bottonParmas
            }
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
              document.title = this.pageName
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
