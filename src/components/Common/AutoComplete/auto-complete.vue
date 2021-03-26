<template>
  <div class="bl-auto-complete">
    <el-autocomplete ref="input" :placeholder="placeholder"
                     :disabled="disabled || disabledInput"
                     @input="handleInput"
                     :size="size"
                     :value="value"
                     :fetch-suggestions="querySearchAsync" @select="selectSuggestion"
                     @keyup.enter.native="focusOnOrderQty" :popper-class="popperClass" clearable>
      <el-button @click="openSearchQuery" v-loading="loading" slot="append" icon="el-icon-search"
                 :disabled="disabled"></el-button>
    </el-autocomplete>
    <search-table-dialog :dialogWidth="dialogWidth"
                         :innerAuto="innerAuto"
                         :openRefresh="openRefresh"
                         :show="showTableDialog" :pages="pages" :searchRequire="searchRequire"
                         :showShadow="showTableShadow" :searchList="searchList"
                         ref="autoSearchTable"
                         :tableProps="tableProps"
                         :selectFlagId="selectFlagId"
                         :singlePicker="singlePicker"
                         :httpMethod="httpMethod"
                         :backFlag="backFlag"
                         :defaultSortList="watchDefaultSortList" :searchUrl="searchUrl" :title="title"
                         @onData="dialogConfirm"
                         @close="handleDialogClose"></search-table-dialog>

    <search-tree-dialog :show="showTreeDialog" :showShadow="showTreeShadow" @closeDialog="handleTreeDialogClose"
                        :treeData="treeData"
                        :backFlag="backFlag"
                        :treeKey="treeKey" :multiple="curTreeMultiple"
                        :treeExpanded="treeExpanded" :treeChecked="treeChecked"
                        @onData="treeDialogConfirm" :treeDefaultProps="treeDefaultProps"></search-tree-dialog>
  </div>
</template>

<script>
import searchTableDialog from './search-table-dialog'
import searchTreeDialog from './search-tree-dialog'

export default {
  name: 'search',
  props: {
    value: String,
    httpMethod: {type: String, default: 'post'},
    size: {type: String, default: 'small'},
    dialogWidth: {type: String, default: '50%'},
    loading: {type: Boolean, default: false},
    // tree 是树结构 normal 正常模式  dialog
    type: {type: String, default: 'normal'},
    // tree的id  防止多个id 一致导致的数据取错
    treeRefs: {type: String, default: ''},
    // tree 是树结构 data
    treeData: {type: Array, default: () => []},
    // tree 是树结构 key
    treeKey: {type: String, default: 'id'},
    // 前提treeMultiple true 最后选择的分类 是否只是当前选中的节点 默认是选中节点的所有子节点（默认: 苹果类下的所有苹果集合）
    singleChooseCategory: {type: Boolean, default: false},
    // tree 多选
    treeMultiple: {type: Boolean, default: false},
    searchRequire: {type: Boolean, default: false},
    openRefresh: {type: Boolean, default: false},
    pages: {type: Boolean, default: true},
    // tree 是树结构  dialog 默认展开
    treeExpanded: {type: Array, default: () => []},
    // tree 是树结构  dialog 默认选中
    treeChecked: {type: Array, default: () => []},
    // tree 的属性  下层tree的 key 和 选中的属性
    treeDefaultProps: {
      type: Object, default: () => {
      }
    },
    // search 组件  eg : [{key:'brandName',label:'商品名字'},{key:'brandId',label:'商品编号'}]
    searchList: {type: Array, default: () => []},
    // 表格的列表字段属性 eg:[{prop:'brandId',label:'品牌编号'},{prop:'brandName',label:'品牌名称'}]"
    tableProps: {type: Array, default: () => []},
    selectFlagId: {type: String, default: 'id'},
    // 默认需要post的params的参数不需要查询
    defaultSortList: {type: Array, default: () => []},
    // 校验默认列表中 是否必填
    defaultRegList: {type: Array, default: () => []},
    // 判断是不是auto 套auto
    innerAuto: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    // 弹窗跳弹出会有问题 所以第二个弹窗要不显示遮罩
    showTreeShadow: {type: Boolean, default: true},
    // 弹窗跳弹出会有问题 所以第二个弹窗要不显示遮罩
    showTableShadow: {type: Boolean, default: true},
    disabledInput: {type: Boolean, default: false},
    // 是否允许多选
    singlePicker: {type: Boolean, default: false},
    // 输入文字查询的Key
    suggestionKey: {type: String, default: ''},
    // 输入文字查询的url
    suggestionUrl: {type: String, default: ''},
    // 展示名
    displayName: {type: String, default: ''},
    // 点击查询的URL
    searchUrl: {type: String, default: ''},
    // backFlag
    backFlag: {
      type: Object, default: () => ({})
    },
    // 搜索框的title
    title: {type: String, default: ''},
    // 搜索框的title
    placeholder: {type: String, default: '请输入商品编码'}
  },
  data () {
    return {
      selected: {
        GoodsNO: ''
      },
      moduleName: 'search',
      search: {},
      currentPage: 1,
      totalRecord: 0,
      pageSize: 10,
      reSearch: true,
      result: [],
      querySearchAsyncResult: [], // 智能搜索框的Input的列表
      popperClass: '', // 智能搜索框的Input的建议列表类名
      selecteLock: false,
      showTableDialog: false,
      showTreeDialog: false,
      curTreeMultiple: false,
      watchDefaultSortList: [] // 监听de'ta'l
    }
  },
  computed: {},
  components: {
    searchTableDialog,
    searchTreeDialog
  },
  created () {
    let temp = {}
    for (let item of this.searchList) {
      temp[item.key] = ''
    }
    this.search = temp
    this.watchDefaultSortList = this.defaultSortList
    this.curTreeMultiple = this.treeMultiple
  },
  methods: {
    handleInput (v) {
      this.$emit('input', v)
      this.$nextTick(() => {
        if(!this.selecteLock && this.innerAuto) {
          this.onData({...this.backFlag})
        } else if (!this.selecteLock) {
          this.onData([])
        }
        this.selecteLock = false
      })
    },
    dialogConfirm (data) {
      this.$emit('onData', data)
    },
    treeDialogConfirm (data) {
      this.$emit('onData', data)
    },
    onData (data) {
      if(Object.keys(this.backFlag).length && data.length) {
        data = data.map(item=> {return {...item, ...this.backFlag}})
      }
      this.$emit('onData', data)
    },
    // 在查询结果中选择一个作为默认值
    setDefault () {
      let params = {}
      if (this.watchDefaultSortList.length) {
        for (let item of this.watchDefaultSortList) {
          params[item.key] = item.value
        }
      }
      this.$http[this.httpMethod](this.suggestionUrl, params).then(response => {
        if (response.data && response.data.result && response.data.result.length) {
          this.onData(response.data.result.slice(0, 1))
        } else if (response.data && response.data.list && response.data.list.length) {
          this.onData(response.data.list.slice(0, 1))
        }
      })
    },
    /**
     * 用户点击回车，如果只查询到一个Item 将triggerEvent 为True 表示需要跳转
     * 查询到了多条Item 默认用户不知道ID 则弹出选择框
     */
    focusOnOrderQty () {
      if (this.type == 'tree') return
      setTimeout(() => {
        if (this.querySearchAsyncResult.length !== 1 && !this.selecteLock) {
          // this.openSearchQuery()
        }
        if (this.querySearchAsyncResult.length === 1 && !this.selecteLock) {
          let data = [{...this.querySearchAsyncResult[0].data}]
          this.$refs.input.select(this.querySearchAsyncResult[0])
          this.selected = Object.assign({}, this.querySearchAsyncResult[0].data)
          this.onData(data)
          this.selecteLock = true
          this.popperClass = 'hide' // 查找到当前Item 关闭建议列表
          this.reset()
        }
      }, 20)
    },
    getData () {
      // let params = {...this[this.moduleName]}
      let params = {}
      this.$http[this.httpMethod](this.searchUrl, params).then(response => {
        if (response.code === 0 && response.data) {
          this.result = response.data
          return
        }
        throw new Error(response.msg)
      }).catch(e => {
        this.$message.error(e.message)
      })
    },
    /**
     * element-ui  联想输入回调
     * @param queryString // this.selected.GoodsID
     * @param cb 适配element-ui 的联想集合 [{value:"31900163.贝亲—婴儿洗发精200ml. data:{......}}]
     */
    querySearchAsync (queryString, cb) {
      if (this.defaultRegList.length) {
        if (!this.watchDefaultSortList.length) {
          console.error('请加入默认必传字段')
        } else {
          for (let item of this.defaultRegList) {
            for (let innerItem of this.watchDefaultSortList) {
              if ((innerItem.key === item && !innerItem.value) || (innerItem.key === item && Array.prototype.isPrototypeOf(innerItem.value) && innerItem.value.length === 0)) {
                this.$notify.error('请先添加' + innerItem.label)
                return
              }
            }
          }
        }
      }
      this.popperClass = ''
      // if (!queryString || queryString.trim() === '') {
      //   cb([])
      //   return
      // }
      // if (this.type === 'tree') return
      if (this.suggestionKey.trim() === '') {
        console.error('autoInput search key undefined')
        return
      }
      // let LookupQuery = 'search'
      let params = {}
      params[this.suggestionKey] = queryString
      if (this.watchDefaultSortList.length) {
        for (let item of this.watchDefaultSortList) {
          params[item.key] = item.value
        }
      }
      params.pageSize = 10
      params.pageNum = 1
      this.$http[this.httpMethod](this.suggestionUrl, params).then(response => {
        if (response.data instanceof Array) {
          let data = response.data.map((item) => {
            return {value: `${item[this.displayName]}`, data: item}
          })
          this.querySearchAsyncResult = data
          cb(data)
          // data : [{value:"31900163.贝亲—婴儿洗发精200ml. data:{......}}]
        } else if (response.data && response.data.list && response.data.list.length) {
          let data = response.data.list.map((item) => {
            return {value: `${item[this.displayName]}`, data: item}
          })
          this.querySearchAsyncResult = data
          cb(data)
        } else {
          if (response.data && response.data.result && response.data.result.length) {
            let data = response.data.result.map((item) => {
              return {value: `${item[this.displayName]}`, data: item}
            })
            this.querySearchAsyncResult = data
            cb(data)
            // data : [{value:"31900163.贝亲—婴儿洗发精200ml. data:{......}}]
          } else {
            cb([])
          }
        }
      })
    },
    selectSuggestion (item) {
      // data : [{value:"31900163.贝亲—婴儿洗发精200ml. data:{......}}]
      // this.selected : {value:"31900163.贝亲—婴儿洗发精200ml. data:{......}}
      this.selecteLock = true
      this.selected = {...item.data}
      let data = [{...item.data}]
      if (this.type === 'tree') {
        data = {...item.data, selectList: [{...item.data}]}
      }
      this.onData(data)
      this.reset()
    },
    openSearchQuery () {
      if (this.defaultRegList.length) {
        if (!this.watchDefaultSortList.length) {
          console.error('请加入默认必传字段')
        } else {
          for (let item of this.defaultRegList) {
            for (let innerItem of this.watchDefaultSortList) {
              if ((innerItem.key === item && !innerItem.value) || (innerItem.key === item && Array.prototype.isPrototypeOf(innerItem.value) && innerItem.value.length === 0)) {
                this.$notify.error('请先添加' + innerItem.label)
                return
              }
            }
          }
        }
      }
      if (this.type === 'normal') {
        this.showTableDialog = true
        this.$refs.autoSearchTable.initSearchCondition()
      } else if (this.type === 'tree') {
        this.showTreeDialog = true
      }
    },
    // 处理对话框关闭
    handleDialogClose () {
      this.showTableDialog = false
    },
    // 处理tree对话框关闭
    handleTreeDialogClose () {
      this.showTreeDialog = false
    },
    /**
     * 成功后清除高级搜索框中的内容
     */
    reset () {
      let temp = {}
      for (let item of this.searchList) {
        temp[item.key] = ''
      }
      this.search = {...temp}
    },
  },
  watch: {
    defaultSortList (newValue) {
      this.watchDefaultSortList = newValue
    },
    treeMultiple (newVlue) {
      this.curTreeMultiple = newVlue
    }
  }
}
</script>

<style scoped>
/*.picker-search-container {*/
/*display: flex;*/
/*padding: 20px;*/
/*flex-wrap: wrap*/
/*}*/

/*.picker-search-container .search-item {*/
/*width: 25%;*/
/*}*/

/*.el-dialog__wrapper .el-form .picker-search-container .el-form-item__label::before {*/
/*content: '';*/
/*margin-right: 4px;*/
/*}*/

/*.search-table .el-table__header-wrapper table th .cell::before {*/
/*content: '';*/
/*color: #ff4949;*/
/*margin-right: 4px;*/
/*}*/
</style>
