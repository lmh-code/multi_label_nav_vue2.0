<style>
.common-table-module .el-table{
  width: 99.9%;
}
.mb6{
  margin-bottom: 6px;
}
</style>
<template>
  <div>
    <i class="el-icon-setting filter-right-top" @click="chooseColumn"></i>
    <div class="common-table-module" style="width:100%" v-loading="tablelist.loading">
      <div class="mb6">
        <el-button type="info" :loading="exportLoading" @click="exportSheet" size="mini" v-if="showExportButton"><i class="el-icon-download"></i> 导出</el-button>
        <span v-for="(e, i) in buttonList" :key="i">
          <el-button v-if="e.type === 0" type="primary" @click="addTableItem(i)" size="mini"><i class="el-icon-plus"></i> {{e.name || '新增'}}</el-button>
          <el-button v-if="e.type === 3" @click="uploadTableItem(i)" size="mini"><i class="el-icon-upload2"></i> {{e.name || '导入'}}</el-button>
          <el-button v-if="e.type === 4" type="primary" @click="batchOperation(i)" size="mini"><i class="el-icon-setting"></i> {{e.name || '批量审核'}}</el-button>
          <el-button v-if="e.type === 6 && searchItems.status == 500" type="primary" @click="addSmartReplenishGoods" size="mini"><i class="el-icon-plus"></i> {{e.name || '新增'}}</el-button>
          <el-button v-if="e.type === 7" type="primary" @click="batchOperation(i)" size="mini"><i class="el-icon-setting"></i> {{e.name || '批量编辑'}}</el-button>
        </span>
      </div>
      <el-table element-loading-text="拼命加载中" stripe :show-summary="showSummary" :summary-method="getSummaries" :data="tablelist.tablelist" style="width: 100%" @sort-change="orderChange" border :max-height="tablelist.height" :header-cell-style="{background:'#F2F6FC'}" @select="handleSelect" @select-all="handleSelectAll" @expand-change="expandChange" row-key="index__" :expand-row-keys="expandArr" :highlight-current-row="tablelist.intentModuleId !== ''" @current-change="handleCurrentChange">
        <el-table-column type="selection" width="55" align="center" v-if="tablelist.showSelection"></el-table-column>
        <el-table-column type="expand" width="55" align="center" v-if="tablelist.showExpand">
          <template slot-scope="props">
            <common-report ref="RowReport" v-if="props.row.isShowExpand"></common-report>
          </template>
        </el-table-column>
        <!-- 多级表头 -->
        <el-table-column :min-width="e.width || '120'" v-for="(e, i) in listItems" :key="i" :prop="e.field" :sortable="e.isOrder == 1? 'custom' : false" :fixed="isFixed(e.freeze)" v-if="!(e.isShow === false) && headerTree.length !== 0" show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>
              <span>{{e.fieldName}}</span>
              <el-tooltip effect="dark" placement="bottom" v-if="e.mixcomment">
                <div slot="content" class="title-tooltip">{{e.mixcomment}}</div>
                <i class="el-icon-question"></i>
              </el-tooltip>
              <el-tooltip effect="dark" placement="bottom" v-else-if="e.comment">
                <div slot="content" class="title-tooltip">{{e.comment}}</div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <label v-if="e.field === 'common_operate'" class="common-operate">
              <span v-for="(e_, i_) in buttonList" :key="i_">
                <span v-if="e_.type === 1 && e_.isEditable !== 1 && !(scope.row.showButton[i_] === false)" class="clickable" @click="updateTableItem(i_, scope.row, scope.$index)">{{e_.name || '修改'}}</span>
                <span v-if="(e_.type === 2 || e_.type === 5) && !(scope.row.showButton[i_] === false)" class="clickable" @click="operateTableItem(i_, scope.row, scope.$index)">{{e_.name || '操作'}}</span>
              </span>
            </label>
            <label v-else-if="e.url && e.url != '' && e.isPop != 3" class="clickable" :class="e.compareWith != ''? scope.row.addColor : ''" @click="clickable(e.isPop, e.url, scope.row)">{{nullTreating(scope.row[e.field])}}</label>
            <label v-else-if="e.modify && !(scope.row.modify === false)" :class="e.compareWith != ''? scope.row.addColor : ''">
              <el-input v-model="scope.row[e.field]" placeholder="请输入" size="mini" @focus="inlineModifyFocus(scope.row, e)" @blur="confirmInlineModify(scope.row, e, scope.$index)"></el-input>
            </label>
            <label v-else-if="scope.row[e.field] === true" :class="e.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-check"></i></label>
            <label v-else-if="scope.row[e.field] === false" :class="e.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-close"></i></label>
            <label v-else :class="e.compareWith != ''? scope.row.addColor : ''">{{nullTreating(scope.row[e.field])}}</label>
          </template>
          <span v-if="e.children">
            <el-table-column :min-width="e_.width || '120'" v-for="(e_, i_) in e.children" :key="i_" :prop="e_.field" :sortable="e_.isOrder == 1? 'custom' : false" :fixed="isFixed(e_.freeze)" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <span>
                  <span>{{e_.fieldName}}</span>
                  <el-tooltip effect="dark" placement="bottom" v-if="e_.comment">
                    <div slot="content" class="title-tooltip">{{e_.comment}}</div>
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
              </template>
              <template slot-scope="scope">
                <label v-if="e_.url && e_.url != '' && e_.fieldName != '' && e.isPop != 3" class="clickable" :class="e_.compareWith != ''? scope.row.addColor : ''" @click="clickable(e_.isPop, e_.url, scope.row)">{{nullTreating(scope.row[e_.field])}}</label>
                <label v-else-if="e_.fieldName == ''"></label>
                <label v-else-if="e_.modify && !(scope.row.modify === false)" :class="e_.compareWith != ''? scope.row.addColor : ''">
                  <el-input v-model="scope.row[e_.field]" placeholder="请输入" size="mini" @focus="inlineModifyFocus(scope.row, e_)" @blur="confirmInlineModify(scope.row, e_, scope.$index)"></el-input>
                </label>
                <label v-else-if="scope.row[e_.field] === true" :class="e_.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-check"></i></label>
                <label v-else-if="scope.row[e_.field] === false" :class="e_.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-close"></i></label>
                <label v-else :class="e_.compareWith != ''? scope.row.addColor : ''">{{nullTreating(scope.row[e_.field])}}</label>
              </template>
            </el-table-column>
          </span>
        </el-table-column>
        <!-- 其他项 -->
        <el-table-column :min-width="e.width || '120'" v-for="(e, i) in listItems" :key="i" :prop="e.field" :sortable="e.isOrder == 1? 'custom' : false" :fixed="isFixed(e.freeze)" v-if="!(e.isShow === false) && headerTree.length === 0" show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>
              <span>{{e.fieldName}}</span>
              <el-tooltip effect="dark" placement="bottom" v-if="e.comment">
                <div slot="content" class="title-tooltip">{{e.comment}}</div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <label v-if="e.field === 'common_operate'" class="common-operate">
              <span v-for="(e_, i_) in buttonList" :key="i_">
                <span v-if="e_.type === 1 && e_.isEditable !== 1 && !(scope.row.showButton[i_] === false)" class="clickable" @click="updateTableItem( i_, scope.row, scope.$index)">{{e_.name || '修改'}}</span>
                <span v-if="(e_.type === 2 || e_.type === 5) && !(scope.row.showButton[i_] === false)" class="clickable" @click="operateTableItem(i_, scope.row, scope.$index)">{{e_.name || '操作'}}</span>
              </span>
            </label>
            <label v-else-if="e.url && e.url != '' && e.isPop != 3" class="clickable" :class="e.compareWith != ''? scope.row.addColor : ''" @click="clickable(e.isPop, e.url, scope.row)">{{nullTreating(scope.row[e.field])}}</label>
            <label v-else-if="e.modify && !(scope.row.modify === false)" :class="e.compareWith != ''? `${scope.row.addColor} inline-modify` : 'inline-modify'">
              <el-input v-model="scope.row[e.field]" placeholder="请输入" size="mini" @focus="inlineModifyFocus(scope.row, e)" @blur="confirmInlineModify(scope.row, e, scope.$index)"></el-input>
            </label>
            <label v-else-if="scope.row[e.field] === true" :class="e.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-check"></i></label>
            <label v-else-if="scope.row[e.field] === false" :class="e.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-close"></i></label>
            <label v-else :class="e.compareWith != ''? scope.row.addColor : ''">{{nullTreating(scope.row[e.field])}}</label>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="tablelist.pageable != 0"
        @size-change="changeSize"
        @current-change="changeCurrent"
        :page-sizes="[10, 20, 50, 100, 500]"
        :page-size="tablelist.pageSize"
        :current-page="tablelist.pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tablelist.total">
      </el-pagination>
      <button-dialog ref="ButtonDialog" :buttonOperateItem="buttonOperateItem" :buttonOperate="buttonOperate" :pageId="pageId" @tableSearch="tableSearch" @tableCollect="tableCollect" @tableCollectArr="tableCollectArr"></button-dialog>
      <upload-dialog ref="UploadDialog" :buttonOperate="buttonOperate" :pageName="pageName" @tableSearch="tableSearch" :pageId="pageId"></upload-dialog>
      <common-report ref="DownReport" v-if="isShowDownReport"></common-report>
      <!-- 弹窗--新页面 -->
      <dialog-report ref="DialogReport" @closeDialog="closeDialog" :dialogTitle="newReportDialogName" :dataSource="dataSource" :tableName="tableName" :buttonType="buttonType" :updateId="updateId"></dialog-report>
      <!-- 弹框--智能补货专用 -->
      <smart-replenish-goods ref="SmartReplenishGoods" :searchItems="searchItems" @closeAddGoods="closeAddGoods"></smart-replenish-goods>
      <el-dialog title="选择展示列" :visible.sync="isShowChooseColumn" width="60%" class="dialog-tree" top="10vh">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllColumns" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedColumns" @change="handlecheckedColumnsChange">
          <el-checkbox v-for="item in listItems" :label="item.field || item.fieldName" :key="item.field || item.fieldName">{{item.fieldName}}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="chooseColumnSure(false)" size="small">取 消</el-button>
          <el-button type="primary" @click="chooseColumnSure(true)" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import config from '@/utils/config'
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  import buttonDialog from '../reportDialog/buttonDialog'
  import uploadDialog from '../reportDialog/uploadDialog'
  import smartReplenishGoods from '../smartReplenishGoods'
  import toolsMixin from '../mixin/tools'
  import newCommonReport from '../commonReport'
  import dialogReport from '../dialogReport'
  let baseUrl = config.reqUrl
  const commonReportExcel = baseUrl + '/boom/a/dynamicReport/dynamicReportForExcel'

  const commonReport = {
    // 获取报表基本配置
    getPageByPageId: '/boom/a/dynamicReport/getPageByPageId',
    // 获取表格模块
    getListByModuleId: '/boom/a/report/module/list/getListByModuleId',
    // 获取表格按钮集合
    getButtonList: '/boom/a/report/module/list/button/getButtonList',
    // 报表查询
    dynamicReportSearch: '/boom/a/dynamicReport/dynamicReportSearch',
    // 修改
    dynamicReportUpdate: '/boom/a/dynamicReport/dynamicReportUpdate',
    // 删除
    dynamicReportDelete: '/boom/a/dynamicReport/dynamicReportDelete',
    // 清除
    deleteRedisCache: '/boom/a/dynamicReport/deleteRedisCache',
    // 获取列表隐藏字段
    getListFieldHint: '/boom/a/report/module/list/cache/getListFieldHint',
    // 保存列表隐藏字段
    saveListFieldHint: '/boom/a/report/module/list/cache/saveListFieldHint',
  }
  export default {
    mixins: [toolsMixin],
    name: 'table-module',
    props: ['pageId', 'tableModuleId', 'searchItems', 'searchUrl', 'pageName', 'pageCode', 'getQueryModule', 'system', 'collectItems', 'backReport'],
    data () {
      return {
        tablelist: {}, // 表格参数
        listItems: [], // 表格设置(表头)
        headerTree: [], // 多级表头
        buttonList: [], // 按钮list
        summary: {}, // 合计
        showSummary: true, // 是否显示合计
        checkedList: [], // 选中
        buttonOperate: { // 操作
          name: '',
        },
        buttonOperateItem: {},
        newReportDialogName: '',
        isShowDownReport: false,
        pageIdChild: '',
        moduleIdChild: '',
        searchItemsChild: {},
        expandArr: [],
        isShowChooseColumn: false,
        checkAllColumns: true,
        checkedColumns: [],
        isIndeterminate: true,
        exportLoading: false, // 导出按钮loading
        tableSearchUrl: '',
        gotButtonList: false,
        showExportButton: true,
        dataSource: '',
        tableName: '',
        buttonType: '',
        updateId: '',
      }
    },
    components: {
      'button-dialog': buttonDialog,
      'upload-dialog': uploadDialog,
      'smart-replenish-goods': smartReplenishGoods,
      'common-report': newCommonReport,
      'dialog-report': dialogReport,
    },
    computed: {
    },
    mounted() {
      this.getListByModuleId()
    },
    watch: {
    },
    methods: {
      // 获取表格模块
      getListByModuleId() {
        this.$http.post(commonReport.getListByModuleId, {moduleId: this.tableModuleId}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            if(res.data && res.data.url) {
              this.tableSearchUrl = res.data.url
            }
            if(res.data && res.data.showExportButton) {
              this.showExportButton = false
            }
            if(res.data) {
              this.dataSource = res.data.dataSource || ''
              this.tableName = res.data.tableName || ''
            }
            if(res.data && res.data.listItems && res.data.listItems.length) {
              let listItems = res.data.listItems
              let obj = {
                loading: false,
                showSelection: false,
                showExpand: false,
                tableId: res.data.id,
                tablelist: [],
                pageSize: 10,
                pageNum: 1,
                total:0,
                pageable: res.data.pageable,
                height: res.data.height || '9999',
                listType: res.data.listType || 0, // 0 展示 1 采集
                moduleKey: res.data.moduleKey || '',
                intentModuleId: res.data.intentModuleId || '',
              }
              // 处理表头合并
              let isHeaderTree = false
              let headerTree = [...listItems]
              let headerTreeKey = {}
              listItems.forEach((item, i) => {
                item.isShow = true
                if(item.excontent) {
                  let reg = /\$\{[^\}]+\}/gi;
                  let arr = item.excontent.match(reg);
                  let associatedArr = []
                  for(let i=0; i<arr.length; i++) {
                    associatedArr[i] = arr[i].replace(/\$\{/gi,'').replace(/\}/gi,'');
                  }
                  listItems.forEach(item_ => {
                    if(associatedArr.includes(item_.field)){
                      if(item_.associatedIndex) {
                        item_.associatedIndex = [...item_.associatedIndex, i]
                      }else{
                        item_.associatedIndex = [i]
                      }
                    }
                  })
                }
                if(item.mergeTitle && !headerTreeKey[item.mergeTitle]) {
                  headerTreeKey[item.mergeTitle] = 1
                  isHeaderTree = true
                  headerTree.push({
                    compareWith: "",
                    fieldName: item.mergeTitle,
                    mixcomment: item.mixcomment,
                  })
                }
                if(item.isPop == 3) {
                  obj.showExpand = true
                  obj.expandUrl = item.url
                }
              })
              this.tablelist = {...obj}
              if(this.tablelist.listType === 1 && this.tablelist.moduleKey) {
                this.tablelist.pageable = 0
              }
              if(isHeaderTree) {
                let newHeaderTree = this.transTreeData(headerTree, 'fieldName', 'mergeTitle', 'children', 'tableTree')
                this.headerTree = [...newHeaderTree]
                this.listItems = [...newHeaderTree]
              }else{
                this.listItems = [...listItems]
              }
              let len = this.listItems.length
              this.getButtonList(len)
              this.getListFieldHint()
              // 先判断查询项是否有值
              this.tablelist.loading = true;
              let timer = setInterval(() => {
                if(this.getQueryModule) {
                  this.tablelist.loading = false;
                  // 先判断必填项
                  let result
                  this.$emit('requiredFormat', 'first', val => {
                    result = val
                  })
                  if(result !== false) {
                    this.tableSearch()
                  }
                  clearInterval(timer)
                }
              }, 100)
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取表格模块失败：" + e.message)
        })
      },
      // 表格操作-获取按钮
      getButtonList(len) {
        // 0-新增 1-编辑 2-删除 3-导入 4-批量审核 5-单项操作 7-批量编辑
        let tableId = this.tablelist.tableId
        this.$http.post(commonReport.getButtonList, {listId: tableId}, null, null, 'boomdebug').then((res) => {
          this.gotButtonList = true
          if (res.code === 0) {
            // operate
            this.buttonList = [...res.data]
            let operate = 0
            this.buttonList.forEach(item => {
              if(item.type === 1 && item.isEditable === 1) {
                item.buttonItemVoList.forEach((item_) => {
                  this.listItems.forEach((e) => {
                    if(item_.columnName === e.field) {
                      e.modify = true
                      e.tableId = this.tablelist.tableId
                      e.id = item.id
                      if(item.url) {
                        e.modifyUrl = item.url
                      }
                    }
                  })
                })
              }else if(item.type === 1 || item.type === 2 || item.type === 5) {
                if(item.name) {
                  operate = operate + item.name.length + 1
                }else{
                  operate += 3
                }
              }else if(item.type === 4) {
                this.$set(this.tablelist, 'showSelection', true)
              }
              if(item.type === 1 || item.type === 2 || item.type === 5) {
                if(item.showCondition) {
                  let condition = item.showCondition.split(';')
                  condition = condition.filter(item => {
                    return item != ''
                  })
                  item.condition = condition
                }
              }
            })
            if(operate) {
              let w = 40 + 12 * operate
              let obj = {
                isShow: true,
                field: "common_operate",
                fieldName: "操作",
                width: w
              }
              let len2 = this.listItems.length
              if(len2 === len) {
                this.listItems.push(obj)
              }
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log(e.message)
        })
      },
      // 表格方法-changeSize
      changeSize(value) {
        this.tablelist.pageSize = value
        this.tableSearch(false)
      },
      // 表格方法-changeCurrent
      changeCurrent(value) {
        this.tablelist.pageNum = value
        this.tableSearch(false)
      },
      // 查询-表格
      tableSearch(research, searchItems) {
        this.checkedList = []
        if (research !== false) {
          // 重新搜索
          this.tablelist.pageNum = 1
        }
        this.tablelist.loading = true;
        let tableId = this.tablelist.tableId
        let search = {}
        if(searchItems) {
          search = {
            ...searchItems,
            queryId: tableId,
            pageId: this.pageId,
            searchItems: searchItems,
            pageSize: this.tablelist.pageSize,
            pageNum: this.tablelist.pageNum,
            orderType: this.tablelist.orderType,
            orderField: this.tablelist.orderField
          }
        }else{
          search = {
            ...this.searchItems,
            queryId: tableId,
            pageId: this.pageId,
            searchItems: this.searchItems,
            pageSize: this.tablelist.pageSize,
            pageNum: this.tablelist.pageNum,
            orderType: this.tablelist.orderType,
            orderField: this.tablelist.orderField
          }
        }

        let url = this.tableSearchUrl || this.searchUrl || commonReport.dynamicReportSearch
        let boomdebug = (this.tableSearchUrl || this.searchUrl)? '' : 'boomdebug'
        this.$http.post(url, {...search}, null, null, boomdebug).then((res) => {
          this.tablelist.loading = false
          if (res.code === 0) {
            if(res.data && res.data.result) {
              this.formatTablelist(res.data.result)
              this.tablelist.total = res.data.total
              if(res.data.summary) {
                let sum = { ...res.data.summary}
                this.listItems.forEach(item => {
                  if(item.isSummer == 0) {
                    let field = item.field
                    delete sum[field]
                  }
                })
                this.summary = {...sum}
                this.showSummary = true
              }
            }else{
              this.tablelist.tablelist = []
            }
            return
          }
          if (res.code === -405) {
            this.$emit('authorityLayer', true)
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.tablelist.loading = false
          this.$notify.error({
            title: '提示',
            message: e.message
          })
        })
      },
      formatTablelist(params) {
        this.tablelist.tablelist = [...params]
        let tablelist = this.tablelist.tablelist
        if(this.tablelist.listType === 1 && this.tablelist.moduleKey) {
          this.collectItems[this.tablelist.moduleKey] = [...this.tablelist.tablelist]
        }
        this.tablelist.tablelist.forEach((item, i) => {
          item.index__ = i
          item.isShowExpand = false
        })
        this.showSummary = false
        this.listItems.forEach(item => {
          // 处理颜色
          if(item.compareWith) {
            let isNum = !isNaN(parseFloat(item.compareWith))
            if(isNum) {
              this.tablelist.tablelist.forEach(item_ => {
                if(parseFloat(item_[item.field]) > parseFloat(item.compareWith)) {
                  item_.addColor = 'laber-color-green'
                }else if(parseFloat(item_[item.field]) < parseFloat(item.compareWith)) {
                  item_.addColor = 'laber-color-red'
                }
              })
            }else{
              this.tablelist.tablelist.forEach(item_ => {
                let compareWith = item_[item.compareWith]
                if(compareWith === undefined) {
                  compareWith = 100
                }
                if(parseFloat(item_[item.field]) > parseFloat(compareWith)) {
                  item_.addColor = 'laber-color-green'
                }else if(parseFloat(item_[item.field]) < parseFloat(compareWith)) {
                  item_.addColor = 'laber-color-red'
                }
              })
            }
          }
        })
        // 处理操作列 condition
        tablelist.forEach(item => {
          this.$set(item, 'showButton', [])
        })
        let timer = setInterval(() => {
          if(this.gotButtonList) {
            clearTimeout(timer)
            tablelist.forEach(item => {
              this.buttonList.forEach((item_, i_) => {
                if(item_.condition) {
                  item_.condition.forEach(item__ => {
                    let arr = item__.split(':')
                    if(item[arr[0]] == arr[1]) {
                      this.$set(item.showButton, i_, false)
                      item.modify = false
                    }
                  })
                }
              })
            })
          }
        }, 100)
      },
      // 表格操作-导出
      exportSheet() {
        this.exportLoading = true
        let tableId = this.tablelist.tableId
        function setHeaders () {
          let loginInfo = Storage.get('loginInfo') || {}
          let headers = {}
          headers['Authorization'] = `${loginInfo.token_type} ${loginInfo.access_token}`
          headers['Content-Type'] = 'application/json;charset=UTF-8'
          headers['Environment']= config.environment
          return headers
        }
        let url = ''
        if(this.tableSearchUrl) {
          url = `${baseUrl}${this.tableSearchUrl}ForExcel`
        }else if(this.searchUrl) {
          url = `${baseUrl}${this.searchUrl}ForExcel`
        }else{
          url = commonReportExcel
        }
        let obj = {...this.searchItems, pageId: this.pageId, queryId: tableId, searchItems: this.searchItems}
        if(this.system == 3) {
          let cityId = Storage.get("cityId")
          let cityName = Storage.get("cityName")
          obj = {...obj, cityId: cityId, cityName: cityName}
        }
        this.$http.post(url, obj, {}, 'blob').then(res => {
          if(res) {
            this.exportLoading = false
            let blob = new Blob([res], {type: 'application/ms-excel'});
            let elink = document.createElement('a');
            elink.download = this.pageName + new Date().getTime() + '.xlsx';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click(); //点击下载
            document.body.removeChild(elink); //下载完成移除元素
            window.URL.revokeObjectURL(elink); //释放掉blob对象
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.exportLoading = false
          console.log("导出：", e.message)
        })
      },
      // 公式计算
      formula(row, _item, index) {
        if(_item.associatedIndex && _item.associatedIndex.length){
          let tablelist = [...this.tablelist.tablelist]
          _item.associatedIndex.forEach(_index => {
            let excontent = this.listItems[_index].excontent.replace(/\$\{/g,'Number(row.').replace(/\}/g,')');
            let result = eval(excontent)
            if(!isNaN(result)) {
              let field = this.listItems[_index].field
              tablelist[index][field] = result
              this.formula(row, this.listItems[_index], index)
            }
          })
          this.tablelist.tablelist = [...tablelist]
        }
      },
      // 表格方法-格式化
      nullTreating(data) {
        if(data == null) {
          data = '-'
        }
        return data
      },
      // 表格方法-对齐
      isFixed(param) {
        if(param == 1) {
          return 'left'
        }else if(param == 2) {
          return 'right'
        }else{
          return false
        }
      },
      // 表格方法-合计
      getSummaries (obj) {
        let {columns} = obj
        const sums = []
        columns.forEach((column, index) => {
          if(this.summary.hasOwnProperty(column.property)) {
            sums[index] = this.summary[column.property]
          }
        });
        if (!sums[0]) {
          sums[0] = ''
        }
        sums[0] = `合计：${sums[0]}`
        return sums;
      },
      // 表格方法-排序
      orderChange({column, prop, order}) {
        if(order == 'descending') {
          this.tablelist.orderType = 2
        }else if(order == 'ascending') {
          this.tablelist.orderType = 1
        }
        this.tablelist.orderField = prop
        this.tableSearch()
      },
      inlineModifyFocus(row, item) {
        row['previousValue_'] = row[item.field]
      },
      confirmInlineModify(row, item, index) {
        if(item.associatedIndex && item.associatedIndex.length){
          this.formula(row, item, index)
          return
        }
        let arr = []
        let obj = {}
        if(row[item.field] == row['previousValue_']) {
          return
        }
        obj[item.field] = row[item.field]
        obj.id = row.id
        arr.push(obj)
        let url = item.modifyUrl || commonReport.dynamicReportUpdate
        let boomdebug = item.modifyUrl? '' : 'boomdebug'
        this.$http.post(url, {pageId: this.pageId, listId: this.tablelist.tableId, updateItems: arr}, null, null, boomdebug).then((res) => {
          if (res.code === 0) {
            if(res.data) {
              for(let key in res.data) {
                row[key] = res.data[key] 
              }
              this.$set(this.tablelist.tablelist, index, row)
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.$message(e.message)
        })
      },
      /**
       * [handleSelect 选择某一个]
       * @return {[type]} [description]
       */
      handleSelect(val, row) {
        let hash = {}
        let checkedListTemp = []
        if(utils.isKeyInArrayBykey(row.id, 'id', this.checkedList)) {
          this.checkedList = utils.removeItemByKeyVal('id', row.id, this.checkedList)
          return
        }else {
          checkedListTemp.push(row)
        }

        let checkedListTempArr = [...checkedListTemp, ...this.checkedList]
        this.checkedList = checkedListTempArr.reduceRight((item, next) => {
          hash[next.id] ? '' : hash[next.id] = true && item.push(next)
          return item
        }, [])
      },
      /**
       * [handleSelectAll 选择多个]
       * @return {[type]} [description]
       */
      handleSelectAll(val) {
        let hash = {}
        if(val.length > 0) {
          for(let item of val) {
            this.checkedList.push(item)
          }
          this.checkedList = this.checkedList.reduceRight((item, next) => {
            hash[next.id] ? '' : hash[next.id] = true && item.push(next)
            return item
          }, [])
        }else {
          let checkedListTemp = []
          for(let item of this.tablelist.tablelist) {
            checkedListTemp.push(item)
          }
          this.checkedList = utils.getSubtract(this.checkedList, checkedListTemp, 'id')
        }
      },
      // 按钮操作-单项操作
      operateTableItem(index, row, i) {
        let tableId = this.tablelist.tableId
        let button = this.buttonList[index]
        let deleteType = button.deleteType
        let url = button.url
        let name = button.contentDesc || button.name
        let id = row.id
        if(this.tablelist.listType === 1 && this.tablelist.moduleKey) {
          this.tablelist.tablelist.splice(i, 1)
          this.collectItems[this.tablelist.moduleKey] = [...this.tablelist.tablelist]
        }else{
          this.$confirm(`确定${name}此条记录?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let url_ = url || commonReport.dynamicReportDelete
            let boomdebug = url? '' : 'boomdebug'
            this.$http.post(url_, {pageId: this.pageId, listId: tableId, id: id, deleteType: deleteType}, null, null, boomdebug).then((res) => {
              if (res.code === 0) {
                this.$message.success(`${name}成功`)
                // 清除服务器缓存
                this.$http.get(commonReport.deleteRedisCache, {pageId: this.pageId}).then((res) => {
                  this.tableSearch()
                })
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.$message(e.message)
            })
          }).catch(() => {
          });
        }
      },
      // 批量
      batchOperation(index) {
        let idList = []
        let tableId = this.tablelist.tableId
        let button = this.buttonList[index]
        let url = button.url
        if(this.checkedList && this.checkedList.length > 0) {
          this.checkedList.forEach(item => {
            idList.push(item.id)
          })
          if(button.type === 7) {
            let url = button.intentType === 1 ? button.path : (button.intentPageCode ? `/report/${button.intentPageCode}` : '')
            if(button.actionType === 0) {
              // 弹框内显示
              this.newReportDialogName = button.name
              this.buttonType = button.type
              this.clickable(1, url, null, idList)
            }else if(button.actionType === 1) {
              // 跳转页面
              this.clickable(null, url, null, idList, 1, button.type)
            }
          }else if(button.type === 4){
            this.$http.post(url, {listId: tableId, idList: idList}).then((res) => {
              if (res.code === 0) {
                let contentDesc = button.contentDesc || button.name
                this.$message.success(`${contentDesc}成功`)
                // 清除服务器缓存
                this.$http.get(commonReport.deleteRedisCache, {pageId: this.pageId}).then((res) => {
                  this.tableSearch()
                })
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.$message(e.message)
            })
          }
        }else{
          this.$message('请先选择操作项')
        }
      },
      addSmartReplenishGoods() {
        this.$refs.SmartReplenishGoods.show()
      },
      closeAddGoods(data) {
        if(data) {
          let params = {
            'dcNo': this.searchItems.vendorNo,
            'storeNo': this.searchItems.storeNo,
            'paperNo': this.searchItems.paperNo,
            'details': data
          }
          this.$http.post(commonReport.addSmartGoods, params).then(res => {
            if(res.code === 0) {
              this.tableSearch()
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            console.log(e.message)
          })
        }
      },
      uploadTableItem(index) {
        let button = this.buttonList[index]
        let tableId = this.tablelist.tableId
        let obj = {
          type: button.type,
          buttonId: button.id,
          tableId: tableId,
          name: button.name || '导入',
          url: button.url,
          buttonItemVoList: [...button.buttonItemVoList],
        }
        this.buttonOperate = {...obj}
        setTimeout(() => {
          this.$refs.UploadDialog.show()
        }, 100)
      },
      // 按钮操作-新增
      addTableItem(index) {
        let button = this.buttonList[index]
        let url = button.intentType === 1 ? button.path : (button.intentPageCode ? `/report/${button.intentPageCode}` : '')
        if(url) {
          if(button.actionType === 0) {
            // 弹框内显示
            this.newReportDialogName = button.name
            this.buttonType = button.type
            this.clickable(1, url)
          }else if(button.actionType === 1) {
            // 跳转页面
            this.clickable(null, url, null, null, 1, button.type)
          }
        }else{
          let obj = {
            type: button.type,
            buttonId: button.id,
            tableId: this.tablelist.tableId,
            listType: this.tablelist.listType,
            moduleKey: this.tablelist.moduleKey,
            name: button.name || '新增',
            url: button.url,
            buttonItemVoList: [...button.buttonItemVoList],
          }
          this.buttonOperateItem = {}
          this.buttonOperate = {...obj}
          this.buttonOperate.buttonItemVoList.forEach(item => {
            item.isShow = true
          })
          this.$refs.ButtonDialog.show()
        }
      },
      // 按钮操作-修改
      updateTableItem(index, row, i) {
        let button = this.buttonList[index]
        let id = row.id
        let url = button.intentType === 1 ? button.path : (button.intentPageCode ? `/report/${button.intentPageCode}` : '')
        if(url) {
          if(button.actionType === 0) {
            // 弹框内显示
            this.newReportDialogName = button.name
            this.buttonType = button.type
            this.updateId = id
            this.clickable(1, url, row)
          }else if(button.actionType === 1) {
            // 跳转页面
            this.clickable(null, url, row, null, 1, button.type)
          }
        }else{
          let obj = {
            type: button.type,
            index_: i,
            tableId: this.tablelist.tableId,
            listType: this.tablelist.listType,
            moduleKey: this.tablelist.moduleKey,
            id: id,
            name: button.name || '修改',
            url: button.url,
            buttonItemVoList: [...button.buttonItemVoList],
          }
          this.buttonOperateItem = {}
          this.buttonOperate = {...obj}
          this.buttonOperate.buttonItemVoList.forEach(item => {
            item.isShow = true
            this.$set(this.buttonOperateItem, item.columnName, row[item.columnName])
          })
          this.$refs.ButtonDialog.show()
        }
      },
      tableCollect(params) {
        if(params) {
          if(params.index_ > -1) {
            let item = this.tablelist.tablelist[params.index_]
            if(params.buttonOperateItem) {
              for(let key in params.buttonOperateItem) {
                item[key] = params.buttonOperateItem[key]
              }
            }
            this.$set(this.tablelist.tablelist, params.index_, item)
            this.collectItems[this.tablelist.moduleKey] = [...this.tablelist.tablelist]
          } else {
            this.$set(this.tablelist.tablelist, this.tablelist.tablelist.length, params.buttonOperateItem)
            this.collectItems[this.tablelist.moduleKey] = [...this.tablelist.tablelist]
          }
        }
      },
      tableCollectArr(params) {
        if(params) {
          let tablelist = [...this.tablelist.tablelist, ...params]
          this.formatTablelist(tablelist)
        }
      },
      /** 
       * json格式转树状结构 
       * @param   {json}      json数据 
       * @param   {String}    id的字符串 
       * @param   {String}    父id的字符串 
       * @param   {String}    children的字符串 
       * @return  {Array}     数组 
       */
      transTreeData(treeData, idStr, pidStr, childrenStr, tableTree){
        let r = [], hash = {}, id = idStr, pid = pidStr, children = childrenStr, i = 0, j = 0, len = treeData.length;
        for(; i < len; i++){
          hash[treeData[i][id]] = treeData[i]
        }
        let index = 0, obj = {}
        for(; j < len; j++){
          let aVal = treeData[j], hashVP = hash[aVal[pid]]
          if(hashVP && hashVP[children] == undefined){
            let key = aVal[pidStr]
            obj[key] = index
            index++
          }
          if(hashVP){
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
          }else{
            if(aVal[childrenStr]) {
              if(pidStr == 'mergeTitle') {
                aVal[childrenStr].unshift({fieldName: '', width: 1})
              }
              let key = aVal[idStr]
              let i = obj[key]
              r.splice(i, 0, aVal)
            }else{
              r.push(aVal);
              index++
            }
          }
        }
        return r;
      },
      configTree(tree) {
        tree.forEach(item => {
          item.name = `${item.id}.${item.name}`
          if(item.children && item.children.length) {
            this.configTree(item.children)
          }
        })
      },
      clickable(isPop, url, params, idList, actionType, type){
        // 可跳转 分四种 弹框 页面下方 展开 和 跳转 ，页面下方和展开暂不考虑
        if(url) {
          let i = url.indexOf(';')
          if(i > -1) {
            url = url.substr(0, i)
          }
          if(isPop == 1) {
            let urlArr = url.split('/')
            if(urlArr[1] == 'report') {
              let pageId = urlArr[2]
              this.getPageChild(pageId, params, isPop, idList)
            }else{
              // 在弹框里 打开新页面
            }
          }else{
            let urlArr = url.split('/')
            if(urlArr.length == 4 && urlArr[1] == 'mixReport') {
              // 复合报表
              let pageId = urlArr[3]
              this.routerPushCommon(params, idList, pageId, url, 'mix/report', actionType, type)
            }else if(urlArr[1] == 'report') {
              let pageId = urlArr[2]
              this.routerPushCommon(params, idList, pageId, url, 'report', actionType, type)
            }else{
              this.$router.push(url)
            }
          }
        }
      },
      routerPushCommon(params, idList, pageId, url, report_, actionType, bottonType) {
        let searchInfo = {...this.searchItems}
        if(params) {
          for(let key in params) {
            searchInfo[key] = params[key]  
          }
        }
        if(pageId) {
          // 跳转到通用报表
          let obj = {}
          if(Storage.get('jumpReport') && Storage.get('jumpReport') != 'undefined') {
            obj = Storage.get('jumpReport')
          }
          let bottonParmas = {
            'bottonType': bottonType,
            'pageId': this.pageId,
            'dataSource': this.dataSource,
            'tableName': this.tableName,
          }
          if(idList) {
            bottonParmas = {
              ...bottonParmas,
              'idList': idList
            }
          }
          obj[pageId] = {
            'searchInfo': searchInfo,
            'actionType': actionType,
            'bottonParmas': bottonParmas,
            'backReport': this.$route.path
          }
          Storage.set('jumpReport', obj)
          // 手动添加tab标签栏并跳转页面
          let redirectUrl = `${url}/b0bf68a/${report_}`
          let filterMenu = this.queryMenuFromStorage(this.$route.path)
          let newRoute = {
            path: redirectUrl,
            fullPath: redirectUrl,
            name: redirectUrl.slice(1),
            params: {},
            query: {},
            hash: {},
            meta: {
              title: `${filterMenu ? filterMenu.menuName : '-'}详情`,
              usePathKey: true
            }
          }
          newRoute.meta && newRoute.meta.title && this.$store.commit('tagsView/ADD_TAG_ONLY', newRoute)
          this.$router.push(redirectUrl)
        }
      },
      getPageChild(pageCode, params, isPop, idList) {
        // 获取关联页面
        let searchInfo = {...this.searchItems}
        if(params) {
          for(let key in params) {
            searchInfo[key] = params[key]  
          }
        }
        if(isPop === 1) {
          setTimeout(() => {
            this.$refs.DialogReport.setDefault(pageCode, searchInfo, idList)
          }, 500)
        }else if(isPop === 2) {
          this.isShowDownReport = true
          setTimeout(() => {
            this.$refs.DownReport.setDefault(pageCode)
          }, 500)
        }else if(isPop === 3) {
          // this.$refs.RowReport.setDefault()
          let pageIdChild, moduleIdChild, searchItemsChild
          if(searchItems) {
            searchItemsChild = searchItems
          }
          this.$http.post(commonReport.getPageByPageId, {pageCode: pageCode}, null, null, 'boomdebug').then((res) => {
            if (res.code === 0) {
              if(res.data) {
                let modules = res.data.modules || []
                pageIdChild = res.data.id
                modules.forEach((e, index) => {
                  if(e.moduleType == 1) {
                    moduleIdChild = e.moduleId
                  }
                })
                searchItems.pageIdChild = pageIdChild
                searchItems.moduleIdChild = moduleIdChild
                searchItems.isShowExpand = true
                this.$set(this.tablelist.tablelist, searchItems.index__, searchItems)
                this.expandArr = [searchItems.index__]
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
        }
      },
      expandChange(row, expandedRows) {
        if(expandedRows.length) {
          let redirectUrl = this.tablelist.expandUrl
          let urlArr = redirectUrl.split('/')
          let pageId = urlArr[2]
          this.getPageChild(pageId, row, 3)
        }
      },
      chooseColumn() {
        this.isShowChooseColumn = true
        this.checkedColumns = []
        this.listItems.forEach(item => {
          if(item.isShow) {
            this.checkedColumns = [item.field || item.fieldName, ...this.checkedColumns]
          }
        })
      },
      handleCheckAllChange(val) {
        let allColumns = []
        this.listItems.forEach(item => {
          allColumns = [...allColumns, item.field || item.fieldName]
        })
        this.checkedColumns = val ? allColumns : [];
        this.isIndeterminate = false;
      },
      handlecheckedColumnsChange(value) {
        let checkedCount = value.length;
        this.checkAllColumns = checkedCount === this.listItems.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.listItems.length;
      },
      chooseColumnSure(param) {
        if(param) {
          this.listItems.forEach(item => {
            if(this.checkedColumns.indexOf(item.field) > -1 || this.checkedColumns.indexOf(item.fieldName) > -1) {
              item.isShow = true
            }else{
              item.isShow = false
            }
          })
        }
        this.saveListFieldHint()
        this.isShowChooseColumn = false
      },
      handleCurrentChange(currentRow) {
        if(this.tablelist.intentModuleId) {
          this.$emit('intentSearch', {
            moduleId: this.tablelist.intentModuleId,
            searchItems: currentRow
          })
        }
      },
      // 获取列表隐藏字段
      getListFieldHint() {
        this.$http.post(commonReport.getListFieldHint, {moduleId: this.tableModuleId, pageCode: this.pageCode}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            if(res.data && res.data.length) {
              let fieldList = []
              res.data.forEach((item) => {
                if(item.field || item.fieldName) {
                  fieldList = [...fieldList, item.field || item.fieldName]
                }
              })
              this.listItems.forEach(item => {
                if(fieldList.indexOf(item.field) > -1 || fieldList.indexOf(item.fieldName) > -1) {
                  item.isShow = true
                }else{
                  item.isShow = false
                }
              })
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取列表隐藏字段失败：" + e.message)
        })
      },
      // 保存列表隐藏字段
      saveListFieldHint() {
        this.$http.post(commonReport.saveListFieldHint, {moduleId: this.tableModuleId, pageCode: this.pageCode, fieldList: this.checkedColumns}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("保存列表隐藏字段失败：" + e.message)
        })
      },
      closeDialog(param) {
        if(param) {
          this.tableSearch()
        }
      }
    }
  }
</script>
