<template>
  <el-dialog :close-on-click-modal="false" lock-scroll append-to-body :modal-append-to-body="true" :modal="showShadow"
             :title="title" :visible="showDialog" :before-close="handleClose" :width="dialogWidth" class="custom-search-table-dialog">
    <div class="report-form">
      <el-form :model="search" label-position="top">
        <div class="clearfix">
          <el-form-item :label="item.label" v-for="(item,index) in searchList" :key="index">
            <el-input v-if="item.type=== 'input'" class="search-input" v-model="search[item.key]"
                      placeholder="请输入..." @keyup.enter.native="clickSearch"></el-input>
            <el-date-picker v-if="item.type=== 'date'" class="search-input" v-model="search[item.key]" type="date"
                            placeholder="选择日期"></el-date-picker>
            <el-cascader v-if="item.type=== 'cascader'" class="search-input" v-model="searchCascader" :options="item.list" :props="{ expandTrigger: 'hover' }" @change="cascaderChange($event, search, item.key)" :show-all-levels="false"></el-cascader>

            <auto-complete clearable v-if="item.type === 'tree'" type="tree" :show="item.show"
                           @closeDialog="item.show = false" :treeData="item.treeData" :treeKey="item.treeKey"
                           :showTreeShadow="false" :treeMultiple="item.treeMultiple"
                           :singleChooseCategory="item.singleChooseCategory" @onData="treeDialogConfirm"
                           :backFlag="{key:item.key , singleChooseCategory: item.singleChooseCategory, value: item.value, treeMultiple: item.treeMultiple, advanceLabel: item.advanceLabel,searchKey:item.searchKey,treeDefaultProps: item.treeDefaultProps  }"
                           :treeDefaultProps="item.treeDefaultProps" class="search-input"
                           v-model="search[item.advanceLabel]" placeholder="请输入..."></auto-complete>

            <auto-complete :singlePicker="item.singlePicker"
                           v-if="item.type === 'complete'"
                           @onData="autoCompleteChange"
                           :innerAuto="item.innerAuto"
                           :backFlag="{key:item.key, displayName: item.displayName, advanceLabel: item.advanceLabel,singlePicker: item.singlePicker}"
                           v-model="search[item.advanceLabel]"
                           :suggestionKey="item.suggestionKey"
                           :suggestionUrl="item.suggestionUrl"
                           :tableProps="item.tableProps"
                           :searchList="item.searchList"
                           :defaultRegList="item.defaultRegList"
                           :searchUrl="item.searchUrl"
                           :defaultSortList="item.defaultSort"
                           :displayName="item.displayName"></auto-complete>
            <el-select v-if="item.type === 'select'" clearable v-model="search[item.key]">
              <el-option v-for="item in item.list" :label="item.label" :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
            <el-select v-if="item.type === 'moreSelect'" multiple collapse-tags clearable v-model="search[item.key]"
                       @change="setRange($event,item)">
              <el-option v-for="item in item.list" :label="item.label" :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="search-group">
            <el-button size="small" type="primary" @click="clickSearch">查询</el-button>
            <el-button size="small" @click="reset">重置</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-table ref="multipleTable" max-height="350" :data="result" border @select="handleSelect"
                @select-all="handleSelectAll" @row-dblclick="selectSingleRow" v-loading="loading"
                element-loading-text="拼命加载中" class="search-table" :row-class-name="tableRowClassName">
        <el-table-column v-if="!singlePicker" type="selection" width="55" :selectable='checkboxT'></el-table-column>
        <el-table-column v-for="(item, index) in tableProps" :key="index" :prop="item.prop" :label="item.label"
                         :sortable="item.sortable" :show-overflow-tooltip="item.isPop" :width="item.width">
          <template slot-scope="scope">
            <span v-if="item.link" class="table-link-page" @click="linkPage(scope.row, item)">{{scope.row[item.prop]}}</span>
            <span v-else>{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination v-if="pagination" class="page-container" @size-change="changeSize" @current-change="changeCurrent"
                   :current-page="pageNum" :page-sizes="[20, 50, 100, 200]" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
    </el-pagination>
    <div class="dialog-confirm-conainer" v-if="!singlePicker">
      <el-button size="small" @click="handleClose">取消</el-button>
      <el-button size="small" type="primary" @click="confirm(false)" v-if="continueInfo">选择并继续</el-button>
      <el-button size="small" type="primary" @click="confirm(true)">选择并关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as utils from '@/utils/utils'

export default {
  props: {
    title: {type: String, default: '高级搜索'},
    dialogWidth: {type: String, default: '50%'},
    // 显示遮罩
    showShadow: {type: Boolean, default: true},
    selectFlagId: {type: String, default: 'id'},
    show: {type: Boolean, default: false},
    searchUrl: {type: String, default: ''},
    httpMethod: {type: String, default: 'post'},
    // search 组件  eg : [{key:'brandName',label:'商品名字'},{key:'brandId',label:'商品编号'}]
    searchList: {type: Array, default: () => []},
    // 表格的列表字段属性 eg:[{prop:'brandId',label:'品牌编号'},{prop:'brandName',label:'品牌名称'}]"
    tableProps: {type: Array, default: () => []},
    // 默认需要post的params的参数不需要查询
    defaultSortList: {type: Array, default: () => []},
    // 是否必填搜索条件再搜索
    searchRequire: {type: Boolean, default: false},
    // 是否每次点开都重新加载列表数据
    openRefresh: {type: Boolean, default: false},
    backFlag: {
      type: Object, default: () => {
      }
    },
    // 是否分页
    pages: {type: Boolean, default: true},
    disabled: {type: Boolean, default: false},
    singlePicker: {type: Boolean, default: false}, // 是否允许多选
    suggestionKey: {type: String, default: ''}, // 输入文字查询的Key
    suggestionUrl: {type: String, default: ''}, // 输入文字查询的url
    displayName: {type: String, default: ''}, // 展示名
    continueInfo: {type: Boolean, default: true} // 选择并继续
  },
  data() {
    return {
      search: {},
      result: [],
      pageNum: 1,
      pageSize: 20,
      totalRecord: 0,
      loading: false,
      finalList: [],
      checkedList: [],
      showDialog: false,
      pagination: true, // 是否分页
      searchCascader: []
    }
  },
  created() {
    let search = {}
    for (let item of this.searchList) {
      if (item.default) {
        search[item.key] = item.default
      } else {
        search[item.key] = ''
      }
    }
    this.search = search
    this.showDialog = this.show
  },
  methods: {
    initSearchCondition() {
      let search = {}
      for (let item of this.searchList) {
        if (item.default) {
          search[item.key] = item.default
        } else {
          search[item.key] = ''
        }
      }
      this.search = search
    },
    selectSingleRow(row) {
      let flag = row.hasOwnProperty('notOptional') || row.hasOwnProperty('isGoodsSelect') || row.hasOwnProperty('goodsSelect')
      let item = row.hasOwnProperty('noSelectReason')
      if (flag && item) {
        if (row.notOptional != null && row.notOptional === row.isGoodsSelect) {
          if (row.isGoodsSelect) {
            this.checkedList = row
            this._emit([{...row}])
            this.handleClose()
            return
          } else {
            if (item) {
              this.$notify.warning(row.noSelectReason)
            }
            return
          }
        } else if (row.notOptional == false || row.isGoodsSelect == true || row.goodsSelect == true) {
          this.checkedList = row
          this._emit([{...row}])
          this.handleClose()
        } else {
          this.$notify.warning(row.noSelectReason)
          return
        }
      } else if (flag) {
        if (row.notOptional == false || row.isGoodsSelect == true || row.goodsSelect == true) {
          this.checkedList = row
          this._emit([{...row}])
          this.handleClose()
        } else {
          this.$notify.warning(row.message)
          return
        }
      } else {
        this.checkedList = row
        this._emit([{...row}])
        this.handleClose()
      }
    },
    confirm(flag) {
      this._emit(JSON.parse(JSON.stringify(this.checkedList)))
      if (flag) {
        this.handleClose()
      }
    },
    changeSize(value) {
      this.pageSize = value
      this.pageNum = 1
      this.reSearch = true
      this.clickSearch()
    },
    changeCurrent(value) {
      this.pageNum = value
      this.reSearch = false
      this.clickSearch(false)
    },
    _emit(list) {
      let finalList = list
      if (this.backFlag && Object.keys(this.backFlag).length) {
        finalList = list.map(item => {
          return {...item, ...this.backFlag}
        })
      }
      this.$emit('onData', finalList)
    },
    /**
     * 成功后清除高级搜索框中的内容
     */
    reset() {
      let temp = {}
      for (let item of this.searchList) {
        if (item.type === 'moreSelect') {
          if (item.range) {
            temp[item.key] = item.range
          } else {
            temp[item.key] = []
          }
        } else {
          temp[item.key] = ''
        }
      }
      this.search = {...temp}
      this.clickSearch(true)
    },
    clickSearch(research = true) {
      if (this.searchRequire) {
        let regStr = ''
        for (let item of this.searchList) {
          regStr += this.search[item.key]
        }
        if (regStr.toString().trim() === '') {
          this.$notify.error('请至少输入一个查询条件查询')
          return
        }
      }
      this.loading = true
      if (research) {
        this.pageNum = 1
        this.checkedList = []
        if (this.result.length) {
          this.$refs.multipleTable.clearSelection()
        }
      }
      let params = this.search
      params.pageNum = this.pageNum
      params.pageSize = this.pageSize
      if (this.defaultSortList.length) {
        for (let item of this.defaultSortList) {
          params[item.key] = item.value
        }
      }
      this.$http[this.httpMethod](this.searchUrl, params).then(response => {
        this.loading = false
        if (response.code === 0) {
          if (response.data && Array.prototype.isPrototypeOf(response.data)) {
            this.result = response.data
            this.pagination = false
          } else if (response.data && response.data.result) {
            this.result = response.data.result
            this.totalRecord = response.data.total
          } else if (response.data && response.data.list) {
            this.result = response.data.list
            this.totalRecord = response.data.total
          } else {
            if (response.data && response.data.result) {
              this.result = response.data.result
              this.totalRecord = response.data.total
            } else {
              this.result = []
              this.totalRecord = 0
              this.$notify.info('暂无数据')
            }
          }
          this.$nextTick(() => {
            this.defauleSelectFun()
          })
          return
        }
        throw new Error(response.msg)
      }).catch(e => {
        console.log('error', e)
        this.result = []
        this.$message.error(e.message)
      })
    },
    handleClose() {
      this.showDialog = false
      this.$emit('close')
    },
    autoCompleteChange(data) {
      if (Array.isArray(data) && data.length && !data[0].singlePicker) {
        // 选了什么就 只是选择的那个分类  不包含他的小类
        this.$set(this.search, data[0].advanceLabel, data.map(dataItem => dataItem[data[0].advanceLabel]).join(','))
        this.$set(this.search, data[0].key, data.map(dataItem => dataItem[data[0].key]))
      } else if (Array.isArray(data) && data.length && data[0].singlePicker) {
        this.$set(this.search, [data[0].key], data[0][data[0].key])
        this.$set(this.search, [data[0].advanceLabel], data[0][data[0].advanceLabel])
      } else if (Object.prototype.toString.call(data) === '[object Object]') {
        this.search[data.key] = data.singlePicker ? '' : []
      }
    },
    /**
     * data 多选的时候是obj{backFlag:{},...,selectList: []} 单选是array[{}]
     */
    treeDialogConfirm(data) {
      if (!(data instanceof Array) && data.backFlag && data.backFlag.treeMultiple) {
        // searchKey 接口返回的字段 拼接成array 例如 返回的是分类列表 searchKey 就是分类的categoryNo
        // this.search.categoryNo = ['123','12323']
        this.selectLeafList = new Set()
        this._getLifeList({[data.backFlag.treeDefaultProps.children]: data.selectList}, data.backFlag.treeDefaultProps.children)
        let finalArray = Array.from(this.selectLeafList)
        if (data.backFlag.singleChooseCategory) {
          // 选了什么就 只是选择的那个分类  不包含他的小类
          this.search[data.backFlag.key] = data.categoryNo
          this.$set(this.search, data.backFlag.advanceLabel, data[data.backFlag.advanceLabel])
        } else {
          // 选择下面的所有分类小的所有小类
          this.search[data.backFlag.key] = finalArray.map((item) => {
            return item[data.backFlag.searchKey]
          })
        }
        this.$set(this.search, data.backFlag.advanceLabel, data[data.backFlag.advanceLabel])
      } else {
        this.search[data[0].backFlag.key] = data[0][data[0].backFlag.value]
      }
    },
    /**
     * [handleSelect 选择某一个]
     * @return {[type]} [description]
     */
    handleSelect(val, row) {
      let hash = {}
      let checkedListTemp = []
      if (utils.isKeyInArray(row[this.selectFlagId], this.checkedList)) {
        this.checkedList = utils.removeItemByKeyVal(this.selectFlagId, row[this.selectFlagId], this.checkedList)
        return
      } else {
        checkedListTemp.push(row)
      }

      let checkedListTempArr = [...checkedListTemp, ...this.checkedList]

      this.checkedList = checkedListTempArr.reduceRight((item, next) => {
        hash[next[this.selectFlagId]] ? '' : hash[next[this.selectFlagId]] = true && item.push(next)
        return item
      }, [])
    },
    linkPage(row, prop) {
      let id = this.templateFunc(prop.link, row)
      this.$store.dispatch('tabs/addTab', {
        id,
        name: `${prop.linkName}`,
        multiple: false
      })
      this.handleClose()
    },
    /**
     * [handleSelectAll 选择多个]
     * @return {[type]} [description]
     */
    handleSelectAll(val) {
      let hash = {}
      if (val.length > 0) {
        // 全选
        for (let item of val) {
          this.checkedList.push(item)
        }
        // 去重
        this.checkedList = this.checkedList.reduceRight((item, next) => {
          hash[next[this.selectFlagId]] ? '' : hash[next[this.selectFlagId]] = true && item.push(next)
          return item
        }, [])
      } else {
        // 全不选 此时val.length<=0
        // 1.获取当前table中每一条的id
        let checkedListTemp = []
        for (let item of this.result) {
          checkedListTemp.push(item)
        }
        // 2.从要传递的参数中去掉这些重复的
        this.checkedList = utils.getSubtract(this.checkedList, checkedListTemp, 'id')
      }
    },
    /**
     * [defauleSelectFun 设置表格中的默认选中项]
     * @param    {[type]}                 row [description]
     * @return   {[type]}                     [description]
     */
    defauleSelectFun() {
      let _this = this
      let rows = []
      for (let i of this.result) {
        for (let j of this.checkedList) {
          if (i[this.selectFlagId] == j[this.selectFlagId]) {
            rows.push(i)
          }
        }
      }
      if (rows.length > 0) {
        this.$refs.multipleTable.clearSelection()
        setTimeout(function () {
          rows.forEach(rowItem => {
            _this.$refs.multipleTable.toggleRowSelection(rowItem)
          });
        }, 100)
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    _getLifeList(data, props) {
      if (data[props] instanceof Array) {
        for (let item of data[props]) {
          this._getLifeList(item, props)
        }
        return
      }
      if (this.selectLeafList.has(data)) {
        this.selectLeafList.delete(data)
      } else {
        this.selectLeafList.add(data)
      }
    },
    checkboxT(row, index) {
      if (row.hasOwnProperty('notOptional') && row.hasOwnProperty('isGoodsSelect')) {
        if (row.isGoodsSelect === true) {
          return 1;
        } else {
          return 0;
        }
      }
      if (row.hasOwnProperty('notOptional')) {
        if (row.notOptional === true) {
          return 0;
        } else {
          return 1;
        }
      }
      if (row.hasOwnProperty('isGoodsSelect')) {
        if (row.isGoodsSelect === true) {
          return 1;
        } else {
          return 0;
        }
      }
      if (row.hasOwnProperty('goodsSelect')) {
        if (row.goodsSelect === true) {
          return 1;
        } else {
          return 0;
        }
      }
      return 1
    },
    tableRowClassName({row, rowIndex}) {
      if (row.hasOwnProperty('notOptional') && row.hasOwnProperty('isGoodsSelect')) {
        if (row.isGoodsSelect === true) {
          return '';
        } else {
          return 'grey909399';
        }
      }
      if (row.hasOwnProperty('notOptional')) {
        if (row.notOptional === true) {
          return 'grey909399';
        } else {
          return ''
        }
      }
      if (row.hasOwnProperty('isGoodsSelect')) {
        if (row.isGoodsSelect === true) {
          return '';
        } else {
          return 'grey909399';
        }
      }
      if (row.hasOwnProperty('goodsSelect')) {
        if (row.goodsSelect === true) {
          return '';
        } else {
          return 'grey909399';
        }
      }
      return 1
    },
    setRange(data, item) {
      if (data.length === 0 && item.range) {
        this.search[item.key] = item.range;
      }
    },
    templateFunc(str, data) {
      let computed = str.replace(/\{\{(\w+)\}\}/g, function (match, key) {
        return data[key];
      })
      return computed;
    },
    cascaderChange($event, obj, key) {
      let len = $event.length
      let choose = ''
      if (len) {
        choose = $event[len - 1]
      } else {
        choose = undefined
      }
      this.$set(obj, key, choose)
    }
  },
  watch: {
    show(newValue) {
      this.showDialog = newValue
      if (newValue) {
        if (this.result.length) {
          this.$refs.multipleTable.clearSelection()
          this.checkedList = []
        }
        if (!this.searchRequire) {
          this.clickSearch()
        }
        if (this.openRefresh) {
          this.clickSearch()
        }
      }
    }
  }
}
</script>

<style scoped>

.dialog-confirm-conainer {
  text-align: center;
  padding-top: 30px;
}

.page-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.el-pagination .el-select .el-input .el-input__inner {
  padding-right: 25px;
  border-radius: 3px;
  width: 100%;
}
.grey909399 {
  color: #909399;
}
.table-link-page {
  color: #409eff;
  cursor: pointer;
}
.el-tooltip__popper {
  max-width: 800px;
}


/* new style start */
.el-form-item.is-success >>> .el-input__inner, .el-form-item.is-success >>> .el-textarea__inner {
  border-color: #dcdfe6 !important;
}

.el-form-item.is-success >>> .el-textarea__inner:focus, .el-form-item.is-success >>> .el-input__inner:focus {
  border-color: #409EFF !important;
}
.report-form {
  padding: 10px;
  background-color: #fff;
}
.custom-search-table-dialog >>> .el-dialog__header {
  border-bottom: none;
}
.report-form >>> .el-form-item {
  display: inline-block;
  margin-bottom: 15px;
  float: left;
  margin-right: 10px;
}

.report-form >>> .operate-wrapper {
  margin-bottom: 10px;
  border-bottom: 1px solid #EFEFEF;
  position: relative;
}

.report-form >>> .operate-wrapper button {
  margin: 0 10px;
}

.report-form >>> .operate-wrapper .message-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.report-form >>> .form {
  clear: both;
  align-items: center;
}

.report-form >>> .form:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden
}

.report-form >>> .el-table {
  margin-top: 20px;
}

.report-form >>> .el-table td, .report-form >>> .el-table th {
  padding: 4px 0;
}

.report-form >>> .el-table .el-table__header-wrapper th {
  background-color: #EEF1F6;
  padding: 4px 0;
}

.report-form >>> .el-table .el-table__fixed-header-wrapper th {
  background-color: #EEF1F6;
  padding: 4px 0;
}

.report-form >>> .el-table td, .report-form >>> .el-table th {
  padding: 6px 0;
}

.report-form >>> .el-form-item .el-form-item__label {
  line-height: 20px;
  padding: 6px 0;
}

.report-form > .el-form-item:last-child {
  margin-right: 0;
}

.report-form .el-col {
  width: auto !important;
}

.report-form .search-condition .el-select .el-input .el-input__inner {
  width: 160px;
}

.report-form >>> .el-input.lf-temp-input .el-input__inner {
  width: 80px;
  height: 30px !important;
}

.report-form >>> .search-condition .el-select .el-input input {
  width: 160px;
}

.report-form >>> .text-area.el-input input {
  width: 320px;
}

.report-form >>> .text-area .el-input .el-input__inner {
  width: 320px;
}

.el-input-number__decrease,
.el-input-number__increase {
  display: none;
}

.report-form >>> .el-input .el-input__inner {
  width: 160px;
  height: 30px !important;
}

.w200 .el-input >>> .el-input__inner {
  width: 200px;
}

.report-form >>> .el-input.paper .el-input__inner {
  width: 180px;
  height: 30px !important;
}
.report-form >>> .el-input.long .el-input__inner {
  width: 260px;
  height: 30px !important;
}

.report-form >>> .custom-input .el-input .el-input__inner {
  width: 100px;
}

.report-form >>> .el-input input {
  width: 160px;
  height: 30px !important;
}

.report-form >>> .category-input .el-input input {
  width: 150px;
  height: 30px !important;
}

.report-form >>> .el-input-group--append .el-input__inner {
  width: 118px;
}

.report-form >>> .custom-fee .el-input-group--append .el-input__inner {
  width: 160px;
}

.report-form >>> .el-input.el-pagination__editor .el-input__inner {
  width: 118px;
}

.report-form >>> .el-input-group__append {
  padding: 0 12px;
}

.report-form >>> .el-form .search-group {
  float: right;
  margin-top: 24px;
}

.report-form >>> .el-form .search-group button {
  line-height: 20px;
  padding: 6px 16px;
}

.el-upload-list--picture-card .el-upload-list__item {
  width: 148px !important;
  height: 148px !important;
}

.el-input-number--small {
  width: initial !important;
}

.report-form >>> .search-input, .report-form >>> .search-condition .el-select .el-input input, .report-form >>> .el-date-editor.el-input {
  width: 160px !important;
}

.report-form >>> .full-date .el-date-editor.el-input {
  width: 220px !important;
}

.report-form >>> .full-date .el-date-editor.el-input .el-input__inner {
  width: 220px !important;
}

@media all and (max-height: 700px) {
  .tabs {
    height: auto !important;
  }
}

.report-form .remark .el-input .el-input__inner {
  width: 500px;
}

.custom-dialog .el-dialog {
  min-width: 890px !important;
}

.tree-custom-dialog .el-dialog {
  width: 34% !important;
}

.tree-branch-dialog .el-dialog {
  min-width: 700px;
}

.tree-branch.el-tree {
  height: 250px;
  overflow-y: auto;
}

.el-radio.custom-radio .el-radio__label {
  font-size: 0;
}

.tree-branch-dialog .el-dialog {
  min-width: 700px;
}

.tree-branch.el-tree {
  height: 250px;
  overflow-y: auto;
}

.clearfix:after {
  height: 0;
  content: " ";
  display: block;
  overflow: hidden;
  clear: both;
}
.clearfix {
  zoom: 1; /*IE低版本浏览器不支持after伪类所以要加这一句*/
}
/* new style end */

</style>
