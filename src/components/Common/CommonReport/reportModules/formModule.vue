<template>
  <span>
    <span v-for="(e, i) in queryItemsChild" :key="i">
      <!-- 无搜索建议的input控件 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 0 && e.subType !== 'autocomplete' && e.isShow">
        <el-input v-model="searchItems[e.columnName]" :clearable="e.canClear === 1" :disabled="e.editAble === 0" @change="instantQuery(e.widgetChildIndexArr)"></el-input>
      </el-form-item>
      <!-- 有搜索建议的input控件 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 0 && e.subType === 'autocomplete' && e.isShow">
        <el-autocomplete v-model="e.checkNameVal" :fetch-suggestions="querySearchAsync" @focus="getSuggestions(e, i)" placeholder="请输入编码或名称" @select="changeSuggestions($event, e, i, 'one')" @input="changeSuggestions($event, e, i, 'one')" @clear="changeSuggestions($event, e, i, 'one', 'clear')" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-autocomplete>
      </el-form-item>
      <!-- select控件 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 1 && e.isShow">
        <el-select v-model="searchItems[e.columnName]" :clearable="e.canClear === 1" :multiple="e.multiple" :disabled="e.editAble === 0" collapse-tags filterable @change="instantQuery(e.widgetChildIndexArr)">
          <el-option
            v-for="item in e.options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 周控件 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 2 && e.dateType === 'dates' && e.isShow">
        <el-date-picker
          :disabled="e.editAble === 0"
          v-model="weekDates[e.columnName]"
          :clearable="e.canClear === 1"
          :editable="false"
          type="dates"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          placeholder="请选择">
        </el-date-picker>
      </el-form-item>
      <!-- 日期联动控件 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 2 && e.dateType === 'dateLinkage' && e.isShow">
        <el-select v-model="searchItems['dateType']" placeholder="请选择" @change="dateOptionsChange($event, e.columnName, e.isRange, e.isRangeWeek, e.isRangeMonth)" :disabled="e.editAble === 0">
          <el-option
            v-for="item in dateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="e.widgetType == 2 && e.dateType === 'dateLinkage' && e.isShow">
        <span v-if="searchItems['dateType'] == 1 && e.isRange == 1">
          <el-form-item>
            <el-date-picker
              v-model="searchItems['start_date']"
              :clearable="e.canClear === 1"
              :editable="false"
              :type="dateLinkage.dateType"
              :value-format="dateLinkage.dateFormat"
              :picker-options="pickerOptions"
              placeholder="请选择">
            </el-date-picker>
          </el-form-item>
          <el-date-picker
            v-model="searchItems['end_date']"
            :clearable="e.canClear === 1"
            :editable="false"
            :type="dateLinkage.dateType"
            :value-format="dateLinkage.dateFormat"
            :picker-options="pickerOptions"
            placeholder="请选择">
          </el-date-picker>
        </span>
        <span v-else-if="searchItems['dateType'] == 3 && e.isRangeMonth == 1">
          <el-form-item>
            <el-date-picker
              v-model="searchItems['start_month']"
              :clearable="e.canClear === 1"
              :editable="false"
              :type="dateLinkage.dateType"
              :value-format="dateLinkage.dateFormat"
              :picker-options="pickerOptions"
              placeholder="请选择">
            </el-date-picker>
          </el-form-item>
          <el-date-picker
            v-model="searchItems['end_month']"
            :clearable="e.canClear === 1"
            :editable="false"
            :type="dateLinkage.dateType"
            :value-format="dateLinkage.dateFormat"
            :picker-options="pickerOptions"
            placeholder="请选择">
          </el-date-picker>
        </span>
        <span v-else-if="searchItems['dateType'] == 2 && e.isRangeWeek == 1">
          <el-form-item>
            <el-date-picker
              v-model="weekDates['start_week']"
              :clearable="e.canClear === 1"
              :editable="false"
              type="dates"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="请选择">
            </el-date-picker>
          </el-form-item>
          <el-date-picker
            v-model="weekDates['end_week']"
            :clearable="e.canClear === 1"
            :editable="false"
            type="dates"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            placeholder="请选择">
          </el-date-picker>
        </span>
        <el-date-picker
          v-else-if="searchItems['dateType'] == 1"
          v-model="searchItems[e.columnName]"
          :clearable="e.canClear === 1"
          :editable="false"
          :type="dateLinkage.dateType"
          :value-format="dateLinkage.dateFormat"
          :picker-options="pickerOptions"
          placeholder="请选择">
        </el-date-picker>
        <el-date-picker
          v-else-if="searchItems['dateType'] == 2"
          v-model="weekDates[e.columnName]"
          :clearable="e.canClear === 1"
          :editable="false"
          type="dates"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          placeholder="请选择">
        </el-date-picker>
        <el-date-picker
          v-else-if="searchItems['dateType'] == 3"
          v-model="searchItems[e.columnName]"
          :clearable="e.canClear === 1"
          :editable="false"
          :type="dateLinkage.dateType"
          :value-format="dateLinkage.dateFormat"
          :picker-options="pickerOptions"
          placeholder="请选择">
        </el-date-picker>
      </el-form-item>
      <!-- 其他日期控件 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 2 && e.dateType !== 'dates' && e.dateType !== 'dateLinkage' && e.isShow">
        <el-date-picker
          :disabled="e.editAble === 0"
          v-model="searchItems[e.columnName]"
          :clearable="e.canClear === 1"
          :editable="false"
          :type="e.dateType"
          :value-format="e.dateFormat"
          :picker-options="pickerOptions"
          placeholder="请选择">
        </el-date-picker>
      </el-form-item>
      <!-- 时间控件 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 3 && e.subType === 'hhmmss' && e.isShow">
        <el-time-picker
          :disabled="e.editAble === 0"
          v-model="searchItems[e.columnName]"
          :clearable="e.canClear === 1"
          value-format="HH:mm:ss"
          placeholder="选择时间">
        </el-time-picker>
      </el-form-item>
      <el-form-item :label="e.labelName" v-if="e.widgetType == 3 && e.subType !== 'hhmmss' && e.isShow">
        <el-time-select
          :disabled="e.editAble === 0"
          v-model="searchItems[e.columnName]"
          :clearable="e.canClear === 1"
          placeholder="选择时间">
        </el-time-select>
      </el-form-item>
      <!-- 日期时间控件 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 4 && e.isShow">
        <el-date-picker
          :disabled="e.editAble === 0"
          v-model="searchItems[e.columnName]"
          :clearable="e.canClear === 1"
          :editable="false"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <!-- 弹窗树形控件-suggest且单选 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 5 && e.suggest === true && e.isShow" class="common-goods-style">
        <el-autocomplete v-model="e.checkNameVal" :fetch-suggestions="querySearchAsyncTree" @focus="getSuggestions(e)" placeholder="请输入编码或名称" @select="changeSuggestions($event, e, i, 'one')" @input="changeSuggestions($event, e, i, 'one')" @clear="changeSuggestions($event, e, i, 'one', 'clear')" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-autocomplete>
        <el-button icon="el-icon-search" @click="showTreeDialog(e, i)" v-model="e.checkNameVal" :disabled="e.editAble === 0"></el-button>
      </el-form-item>
      <!-- 弹窗树形控件 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 5 && e.suggest !== true && e.isShow">
        <el-input v-model="e.checkNameVal" :clearable="e.canClear === 1" @focus="showTreeDialog(e, i)" prefix-icon="el-icon-search" :disabled="e.editAble === 0" placeholder="请选择" @clear="clearTreeList(queryItemsChild, e, i)"></el-input>
      </el-form-item>
      <!-- 弹窗表格suggester控件-单选 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 6 && e.subType === 'selectOne' && e.isShow" class="common-goods-style">
        <el-autocomplete v-model="e.checkNameVal" :fetch-suggestions="querySearchAsyncPost" @focus="getSuggestions(e)" placeholder="请输入编码或名称" @select="changeSuggestions($event, e, i, 'one')" @input="changeSuggestions($event, e, i, 'one')" @clear="changeSuggestions($event, e, i, 'one', 'clear')" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-autocomplete>
        <el-button icon="el-icon-search" @click="showTableDialog(e, i, 'one')" v-model="e.checkNameVal" :disabled="e.editAble === 0"></el-button>
      </el-form-item>
      <!-- 弹窗表格suggester控件-多选 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 6 && e.subType !== 'selectOne' && e.isShow" class="common-goods-style">
        <el-autocomplete v-model="e.checkNameVal" :fetch-suggestions="querySearchAsync" @focus="getSuggestions(e)" placeholder="请输入编码或名称" @select="changeSuggestions($event, e, i)" @input="changeSuggestions($event, e, i)" @clear="changeSuggestions($event, e, i, null, 'clear')" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-autocomplete>
        <el-button icon="el-icon-search" @click="showTableDialog(e, i)" v-model="e.checkNameVal" :disabled="e.editAble === 0"></el-button>
      </el-form-item>
      <!-- 级联选择器 -->
      <el-form-item :label="e.labelName" v-if="e.widgetType == 7 && e.isShow">
        <el-cascader
          placeholder="请选择"
          expand-trigger="hover"
          :clearable="e.canClear === 1"
          :options="e.cascaderOptions"
          :props="e.subType === 'selectOne' ? cascaderPropsF : cascaderPropsT"
          v-model="e.checkCascader"
          @change="handleCascaderChange($event, e)"
          :disabled="e.editAble === 0">
        </el-cascader>
      </el-form-item>
    </span>
    <el-form-item>
      <el-button type="primary" @click="searchAll" v-if="showQueryButton"><i class="el-icon-search"></i> 查询</el-button>
      <el-button @click="reset" v-if="showResetButton"><i class="el-icon-refresh"></i> 重置</el-button>
    </el-form-item>
    <table-dialog ref="TableDialog" :tableData="tableData" :searchItems="searchItems" @closeTableDialog="closeTableDialog"></table-dialog>
    <table-one-dialog ref="TableOneDialog" :tableData="tableData" :searchItems="searchItems" @closeTableOneDialog="closeTableOneDialog"></table-one-dialog>
    <tree-dialog ref="TreeDialog" :treeData="treeData" :searchItems="searchItems" @closeTreeDialog="closeTreeDialog"></tree-dialog>
  </span>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  import tableDialog from '../reportDialog/tableDialog'
  import tableOneDialog from '../reportDialog/tableOneDialog'
  import treeDialog from '../reportDialog/treeDialog'

  export default {
    name: 'form-module',
    props: ['queryItems', 'searchItems', 'showQueryButton', 'showResetButton', 'searchItemsAll'],
    data () {
      return {
        queryItemsChild: [],
        weekDates: {},
        dateOptions: [], // 日期联动控件
        dateLinkage: [], // 日期联动控件
        pickerOptions: {
          firstDayOfWeek: 1
        },
        suggestionsData: {},
        cascaderPropsT: {
          value: 'id',
          label: 'name',
          children: 'children',
          checkStrictly: true 
        },
        cascaderPropsF: {
          value: 'id',
          label: 'name',
          children: 'children',
          checkStrictly: false 
        },
        tableData: {}, // 弹框table参数
        treeData: {}, // 弹框tree参数
        requiredData: true, // 是否可以查询
      }
    },
    components: {
      'table-dialog': tableDialog,
      'table-one-dialog': tableOneDialog,
      'tree-dialog': treeDialog,
    },
    computed: {
    },
    mounted() {
    },
    watch: {
      weekDates: {
        handler(newDate) {
          for(let key in newDate) {
            let dates = newDate[key]
            if(dates === null) {
              this.$set(this.weekDates, key, [])
            }else if(dates && dates.length === 8) {
              this.$set(this.weekDates, key, utils.getAllWeek(dates[7]))
            }else if(dates && dates.length !== 7 && dates[0]) {
              this.$set(this.weekDates, key, utils.getAllWeek(dates[0]))
            }
          }
        },
        deep: true
      },
    },
    methods: {
      initialize() {
        this.queryItemsChild = JSON.parse(JSON.stringify(this.queryItems))
        this.configInt(this.queryItemsChild)
        this.queryItemsChild.forEach(item => {
          if(item.widgetType == 1 && this.searchItems[item.columnName]) {
            item.options.forEach(item_ => {
              if(item_.name === this.searchItems[item.columnName]) {
                this.$set(this.searchItems, item.columnName, item_.id)
              }
            })
          }
        })
      },
      changeFold(param){
        if(param.length) {
          //全部显示
          this.queryItemsChild.forEach((item, i) => {
            item.isShow = param[i].isShow
            this.$set(this.queryItemsChild, i, item)
          })
        }
      },
      // 格式化查询项
      configInt(queryItems) {
        this.configCascade(queryItems)
        queryItems.forEach((item, i) => {
          if(item.widgetType == 0) {
            // 输入框
            // 有默认值
            if(item.defaultValue != '' && item.defaultValue != undefined) {
              this.$set(this.searchItems, item.columnName, item.defaultValue)
            }
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  // suggest
                  item.subType = 'autocomplete'
                }
              }
            }
          }else if(item.widgetType == 1) {
            this.$set(item, 'options', [])
            // select
            item.multiple = false
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  item.multiple = true
                }else if(key === 'subType' && widgetStyle[key] == 2) {
                  // ERP 通用枚举
                  item.queryEnum = item.columnName
                }else if(key === 'subType' && widgetStyle[key] == 3) {
                  item.multiple = true
                  item.queryEnum = item.columnName
                }
              }
            }
            if(item.urlValue && item.urlValue != '') {
              if(item.queryEnum) {
                // ERP通用枚举查询
                let arr = [i]
                this.instantQuery(arr)
              }else if(item.urlValue.indexOf('?') > -1) {
                let str = item.urlValue
                let index = str.indexOf("?");
                let url = str.substr(0, index);
                let result = str.substr(index + 1,str.length);
                let searchArr = result.split('&')
                let obj = {}
                searchArr.forEach(item => {
                  let i = item.indexOf("=")
                  let key = item.substr(0, i);
                  let res = item.substr(i + 1, item.length);
                  obj[key] = res
                })
                this.$http.post(url, obj).then((res) => {
                  if (res.code === 0) {
                    if(res.data) {
                      let options = [...res.data]
                      options.forEach(item => {
                        if(item.id) {
                          item.id = String(item.id)
                        }
                      })
                      this.$set(item, 'options', options)
                      if(item.widgetChildIndexArr) {
                        this.instantQuery(item.widgetChildIndexArr)
                        this.$set(this.queryItemsChild, i, item)
                      }
                    }
                    return
                  }
                  throw new Error(res.msg)
                }).catch(e => {
                  console.log("获取下拉框options失败：" + e.message)
                })
              }else{
                this.$http.post(item.urlValue).then((res) => {
                  if (res.code === 0) {
                    if(res.data) {
                      let options = [...res.data]
                      options.forEach(item => {
                        if(item.id) {
                          item.id = String(item.id)
                        }
                      })
                      this.$set(item, 'options', options)
                      if(item.widgetChildIndexArr) {
                        this.instantQuery(item.widgetChildIndexArr)
                        this.$set(this.queryItemsChild, i, item)
                      }
                    }
                    return
                  }
                  throw new Error(res.msg)
                }).catch(e => {
                  console.log("获取下拉框options失败：" + e.message)
                })
              }
            }else if(item.textValue && item.textValue != '') {
              item.options = JSON.parse(item.textValue)
            }
            // 有默认值
            if(item.defaultValue != '' && item.defaultValue != undefined) {
              this.$set(this.searchItems, item.columnName, item.defaultValue)
            }
          }else if(item.widgetType == 2) {
            // 日期控件
            item.dateType = 'date'
            item.dateFormat = 'yyyy-MM-dd'
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  // 周控件
                  item.dateType = 'dates'
                  this.$set(this.weekDates, item.columnName, utils.getAllWeek(utils.timestampToTimeNoHMS(new Date())))
                }else if(key === 'subType' && widgetStyle[key] == 2) {
                  // 月控件
                  item.dateType = 'month'
                  item.dateFormat = 'yyyy-MM-dd'
                  this.$set(this.searchItems, item.columnName, utils.timestampToTimeNoHMS(new Date()).slice(0, 7) + '-01')
                }else if(key === 'subType' && widgetStyle[key] == 3) {
                  // 年控件
                  item.dateType = 'year'
                  item.dateFormat = 'yyyy'
                  this.$set(this.searchItems, item.columnName, utils.timestampToTimeNoHMS(new Date()).slice(0, 4))
                }else if(key === 'subType' && widgetStyle[key] == 4) {
                  // 日期联动控件
                  item.dateType = 'dateLinkage'
                }
              }
            }
            // 默认日期
            if(item.labelValue && item.labelValue != '') {
              let labelValue = JSON.parse(item.labelValue)
              for(let key in labelValue) {
                if(key === 'preDays' && labelValue[key] !== '') {
                  item.preDays = labelValue[key]
                  this.$set(this.searchItems, item.columnName, utils.timestampToTimeNoHMS(parseInt(Date.parse(new Date().toLocaleDateString())) - 86400000*item.preDays));
                }else if(key === 'checkList') {
                  // 日期联动
                  this.dateOptions = []
                  let checkList = labelValue[key]
                  checkList.forEach(e => {
                    if(e === '日') {
                      this.dateOptions.push({
                        value: 1,
                        label: '日'
                      })
                    }else if(e === '周') {
                      this.$set(this.weekDates, item.columnName, [])
                      this.dateOptions.push({
                        value: 2,
                        label: '周'
                      })
                    }else if(e === '月') {
                      this.dateOptions.push({
                        value: 3,
                        label: '月'
                      })
                    }
                  })
                  if(this.dateOptions[0]) {
                    this.$set(this.searchItems, 'dateType', this.dateOptions[0].value);
                    this.$set(this.searchItems, item.columnName, '');
                    if(item.isRangeWeek == 1) {
                      this.$set(this.weekDates, 'start_week', [])
                      this.$set(this.weekDates, 'end_week', [])
                    }else{
                      this.$set(this.weekDates, item.columnName, [])
                    }
                    if(item.isRange == 1) {
                      this.dateOptionsChange(null, item.columnName, item.isRange)
                    }else{
                      this.dateOptionsChange(null, item.columnName)
                    }
                  }
                }
              }
            }
          }else if(item.widgetType == 3) {
            // 时间控件
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  item.subType = 'hhmmss'
                }
              }
            }
          }else if(item.widgetType == 4) {
            // 默认值
            if(item.labelValue && item.labelValue != '') {
              let labelValue = JSON.parse(item.labelValue)
              for(let key in labelValue) {
                if(key === 'preDays' && labelValue[key] !== '') {
                  item.preDays = labelValue[key]
                  this.$set(this.searchItems, item.columnName, utils.timestampToTimeNoHMS(parseInt(Date.parse(new Date().toLocaleDateString())) - 86400000*item.preDays) + ' 00:00:00');
                }
              }
            }
          }else if(item.widgetType == 5) {
            // 弹窗树结构控件
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  // 城市单选的树控件
                  item.subType = 'selectOneCity'
                }else if(key === 'subType' && widgetStyle[key] == 2) {
                  // 选择分类返回商品
                  item.subType = 'returnGoods'
                }else if(key === 'subType' && widgetStyle[key] == 3) {
                  // 单选控件，子节点全选时传父节点
                  item.subType = 'selectOne'
                  item.parentNode = true
                }else if(key === 'suggest' && widgetStyle[key] == 'true') {
                  // 搜索建议
                  item.suggest = true
                }
              }
              // 选择分类返回商品
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 2) {
                  item.subType = 'returnGoods'
                }
              }
            }
            if(item.urlValue && item.urlValue != '') {
              this.$http.get(item.urlValue).then((res) => {
                if (res.code === 0) {
                  if(res.data) {
                    let temp = JSON.parse(JSON.stringify(res.data))
                    item.treeData = this.transTreeData(temp, 'id', 'pid', 'children')
                    this.configTree(item.treeData)
                    item.checkNameVal = ''
                  }
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                console.log("获取树控件失败：" + e.message)
              })
            }
          }else if(item.widgetType == 6) {
            // 弹窗suggester控件
            if(item.urlValue && item.urlValue != '') {
              item.tableData = []
              item.total = 0
              item.pageNum = 1
              item.pageSize = 10
              item.checkNameVal = ''
            }
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              // 弹窗suggester单选
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  item.subType = 'selectOne'
                }
              }
            }
          }else if(item.widgetType == 7) {
            // 级联选择器
            if(item.urlValue && item.urlValue != '') {
              this.$http.get(item.urlValue).then((res) => {
                if (res.code === 0) {
                  if(res.data) {
                    item.cascaderOptions = this.transTreeData(res.data, 'id', 'pid', 'children')
                    this.configTree(item.cascaderOptions)
                    this.$set(this.queryItemsChild, i, item)
                  }
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                console.log("获取级联选择器失败：" + e.message)
              })
            }
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              // 可单选的树控件
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  item.subType = 'selectOne'
                }
              }
            }
          }
        })
        if(this.searchItemsAll) {
          queryItems.forEach((item) => {
            let key = item.columnName
            if(this.searchItemsAll[key] !== undefined) {
              this.$set(this.searchItems, key, this.searchItemsAll[key])
            }
          })
        }
      },
      // 查询-先判断必填项
      requiredFormat(first) {
        this.requiredData = true
        // 处理日期格式---周
        if((this.searchItems.dateType && this.searchItems.dateType === 2) || (!this.searchItems.dateType && this.weekDates)) {
          for(let key in this.weekDates) {
            let dates = this.weekDates[key]
            if(dates.length === 0) {
                this.searchItems[key] = ''
            }else if(dates && dates[0]) {
              if(dates[0].indexOf('NaN') > -1) {
                this.searchItems[key] = ''
              }else{
                this.searchItems[key] = dates[0]
              }
            }
          }
        }
        this.queryItemsChild.forEach(item => {
          if((item.nonEmpty === 1 || item.required) && this.requiredData) {
            if(item.widgetType == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 1 && item.isRange == 1){
              // 日期联动
              if(this.searchItems['start_date'] === '' || this.searchItems['start_date'] == null || this.searchItems['end_date'] === '' || this.searchItems['end_date'] == null) {
                if(first !== 'first') {
                  this.$message("必填项日期不能为空")
                }
                this.requiredData = false
                return
              }
            }else if(item.widgetType == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 2 && item.isRangeWeek == 1){
              // 日期联动
              if(this.searchItems['start_week'] === '' || this.searchItems['start_week'] == null || this.searchItems['end_week'] === '' || this.searchItems['end_week'] == null) {
                if(first !== 'first') {
                  this.$message("必填项日期不能为空")
                }
                this.requiredData = false
                return
              }
            }else if(item.widgetType == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 3 && item.isRangeMonth == 1){
              // 日期联动
              if(this.searchItems['start_month'] === '' || this.searchItems['start_month'] == null || this.searchItems['end_month'] == '' || this.searchItems['end_month'] == null) {
                if(first !== 'first') {
                  this.$message("必填项日期不能为空")
                }
                this.requiredData = false
                return
              }
            }else if(this.searchItems[item.columnName] == null || this.searchItems[item.columnName] === '' || this.searchItems[item.columnName].length === 0) {
              if(first !== 'first') {
                this.$message("必填项'" + item.labelName + "'不能为空")
              }
              this.requiredData = false
              return
            }
          }
          if(item.widgetType == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 1){
            if((new Date(this.searchItems['end_date']).getTime() - new Date(this.searchItems['start_date']).getTime()) > 86400000*180) {
              this.$message("选择日期间隔不能大于180天")
              this.requiredData = false
            }
          }else if(item.widgetType == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 3){
            if((new Date(this.searchItems['end_month']).getTime() - new Date(this.searchItems['start_month']).getTime()) > 86400000*365) {
              this.$message("选择日期间隔不能大于一年")
              this.requiredData = false
            }
          } 
        })
        return this.requiredData
      },
      // 先格式化级联
      configCascade(queryItems) {
        queryItems.forEach((item, i) => {
          if(item.parentId) {
            let widgetParentArr = String(item.parentId).split(';')
            queryItems.forEach((item_, i_) => {
              widgetParentArr.forEach((item__, i__) => {
                if(item__ == item_.id) {
                  if(!item_.widgetChildIndexArr) {
                    item_.widgetChildIndexArr = [i]
                  }else{
                    item_.widgetChildIndexArr = [...item_.widgetChildIndexArr, i]
                  }
                  if(!item.widgetParentIndexArr) {
                    item.widgetParentIndexArr = [i_]
                  }else{
                    item.widgetParentIndexArr = [...item.widgetParentIndexArr, i_]
                  }
                }
              })
            })
          }
        })
      },
      instantQuery(indexArr) {
        if(!indexArr) {
          return
        }
        indexArr.forEach(itemIndex => {
          let item = this.queryItemsChild[itemIndex]
          let param = {}
          if(item.widgetParentIndexArr && item.widgetParentIndexArr.length) {
            item.widgetParentIndexArr.forEach(item_ => {
              let columnName = this.queryItemsChild[item_].columnName
              param[columnName] = this.searchItems[columnName]
              if(item.widgetParentIndexArr.length === 1) {
                param['q'] = this.searchItems[columnName]
              }
            })
          }else if(item.queryEnum) {
            param['q'] = item.queryEnum
          }
          if(item.urlValue.indexOf('?') > -1) {
            let str = item.urlValue
            let index = str.indexOf("?");
            let url = str.substr(0, index);
            let result = str.substr(index + 1,str.length);
            let searchArr = result.split('&')
            let obj = { ...param}
            searchArr.forEach(item => {
              let i = item.indexOf("=")
              let key = item.substr(0, i);
              let res = item.substr(i + 1, item.length);
              obj[key] = res
            })
            this.$http.post(url, obj).then((res) => {
              if (res.code === 0) {
                if(res.data) {
                  let options = [...res.data]
                  options.forEach(item => {
                    if(item.id) {
                      item.id = String(item.id)
                    }
                  })
                  this.$set(item, 'options', options)
                }
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              console.log(e.message)
            })
          }else{
            this.$http.post(item.urlValue, param).then((res) => {
              if (res.code === 0) {
                if(res.data) {
                  let options = [...res.data]
                  options.forEach(item => {
                    if(item.id) {
                      item.id = String(item.id)
                    }
                  })
                  this.$set(item, 'options', options)
                }
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              console.log(e.message)
            })
          }
        })
      },// 日期控件change
      dateOptionsChange(e, param, isRange, isRangeWeek, isRangMonth) {
        if(this.searchItems['dateType'] == 1) {
          this.dateLinkage.dateType = 'date'
          this.dateLinkage.dateFormat = 'yyyy-MM-dd'
          if(isRange == 1) {
            this.$set(this.searchItems, 'start_date', utils.timestampToTimeNoHMS(parseInt(Date.parse(new Date().toLocaleDateString())) - 86400000));
            this.$set(this.searchItems, 'end_date', utils.timestampToTimeNoHMS(parseInt(Date.parse(new Date().toLocaleDateString())) - 86400000));
          }else{
            this.$set(this.searchItems, param, utils.timestampToTimeNoHMS(parseInt(Date.parse(new Date().toLocaleDateString())) - 86400000));
          }
        }else if(this.searchItems['dateType'] == 2) {
          if(isRangeWeek == 1) {
            this.$set(this.weekDates, 'start_week', utils.getAllWeek(utils.timestampToTimeNoHMS(new Date())))
            this.$set(this.weekDates, 'end_week', utils.getAllWeek(utils.timestampToTimeNoHMS(new Date())))
          }else{
            this.$set(this.weekDates, param, utils.getAllWeek(utils.timestampToTimeNoHMS(new Date())))
          }
        }else if(this.searchItems['dateType'] == 3) {
          this.dateLinkage.dateType = 'month'
          this.dateLinkage.dateFormat = 'yyyy-MM-dd'
          if(isRangMonth) {
            this.$set(this.searchItems, 'start_month', utils.timestampToTimeNoHMS(new Date()).slice(0, 7) + '-01');
            this.$set(this.searchItems, 'end_month', utils.timestampToTimeNoHMS(new Date()).slice(0, 7) + '-01');
          }else{
            this.$set(this.searchItems, param, utils.timestampToTimeNoHMS(new Date()).slice(0, 7) + '-01');
          }
        }
      },
      getSuggestions(e) {
        this.suggestionsData = e
      },
      changeSuggestions(val, e, i, one, clear) {
        if(clear) {
          if(one) {
            this.$set(this.searchItems, e.columnName, '')
            e.checkNameVal = ''
            this.$set(this.queryItemsChild, i, e)
          }else{
            this.$set(this.searchItems, e.columnName, [])
            e.checkNameVal = ''
            this.$set(this.queryItemsChild, i, e)
          }
          return
        }
        if(val && val.value && e && e.columnName) {
          let arr = [], str = ''
          str = val.label
          arr.push(val.label)
          if(one) {
            this.$set(this.searchItems, e.columnName, str)
            e.checkNameVal = val.value
            this.$set(this.queryItemsChild, i, e)
          }else{
            this.$set(this.searchItems, e.columnName, arr)
            e.checkNameVal = val.value
            this.$set(this.queryItemsChild, i, e)
          }
        }else if(val && e && e.columnName) {
          if(typeof(val) === 'string') {
            e.checkNameVal = val
            this.$set(this.queryItemsChild, i, e)
          }
        }else if(e && e.columnName) {
          if(one) {
            this.$set(this.searchItems, e.columnName, '')
            e.checkNameVal = ''
            this.$set(this.queryItemsChild, i, e)
          }else{
            this.$set(this.searchItems, e.columnName, [])
            e.checkNameVal = ''
            this.$set(this.queryItemsChild, i, e)
          }
        }
      },
      querySearchAsync(queryString, cb) {
        this.$http.get(this.suggestionsData.urlValue, {q: queryString, pageNum: 1, pageSize: 100}, true).then((res) => {
          if (res.code === 0) {
            let slecetGoods = []
            if(res.data && res.data.result && res.data.result.length) {
              slecetGoods = res.data.result.map(item => {
                return { value: `${item.id}.${item.name}`, label: item.id}
              })
            }
            cb(slecetGoods);
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取下拉框suggest失败：" + e.message)
        })
      },
      querySearchAsyncPost(queryString, cb) {
        let query
        if(this.suggestionsData.query) {
          query = this.searchItems[this.suggestionsData.query]
        }
        this.$http.post(this.suggestionsData.urlValue, {q: queryString, pageNum: 1, pageSize: 100, query: query}, true).then((res) => {
          if (res.code === 0) {
            let slecetGoods = []
            if(res.data && res.data.result && res.data.result.length) {
              slecetGoods = res.data.result.map(item => {
                return { value: `${item.id}.${item.name}`, label: item.id}
              })
            }
            cb(slecetGoods);
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取弹窗表格suggest失败：" + e.message)
        })
      },
      querySearchAsyncTree(queryString, cb) {
        this.$http.get(this.suggestionsData.urlValue).then((res) => {
          if (res.code === 0) {
            let slecetGoods = []
            if(res.data && res.data && res.data.length) {
              slecetGoods = res.data.map(item => {
                return { value: `${item.id}.${item.name}`, label: item.id}
              })
            }
            var results = queryString ? slecetGoods.filter(this.createFilter(queryString)) : slecetGoods;
            cb(results);
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取弹窗树结构suggest失败：" + e.message)
        })
      },
      clearTreeList(arr, e, i) {
        // 刷新数据
        this.$set(arr, i, e)
        this.$set(this.searchItems, e.columnName, [])
        // 处理选择分类返回商品逻辑
        if(this.treeData.widgetType == 5 && this.treeData.subType == "returnGoods") {
          this.$set(this.searchItems, 'goodList', [])
        }
      },
      // 显示树形弹框
      showTreeDialog(data, i) {
        this.treeData = {
          index: i,
          ...data
        }
        let idList = this.searchItems[this.treeData.columnName] || []
        let checkList = [...idList]
        if(checkList) {
          this.$refs.TreeDialog.show(checkList)
        }
      },
      showTableDialog(data, i, one) {
        this.tableData = {
          index: i,
          ...data
        }
        setTimeout(() => {
          if(one) {
            this.$refs.TableOneDialog.show()
          }else{
            this.$refs.TableDialog.show()
          }
        }, 100)
      },
      handleCascaderChange($event, e) {
        let len = $event.length
        let choose = ''
        if(len) {
          choose = $event[len - 1]
        }else{
          len = undefined
          choose = undefined
        }
        this.$set(this.searchItems, e.columnName, choose)
        this.$set(this.searchItems, e.columnName + 'Level', len)
      },
      closeTableDialog(data) {
        if(data.checkNameVal) {
          let item = this.queryItemsChild[data.index]
          item.checkNameVal = data.checkNameVal
          this.$set(this.queryItemsChild, data.index, item)
        }
        if(data.idList) {
          this.$set(this.searchItems, this.tableData.columnName, data.idList)
        }
      },
      closeTableOneDialog(data) {
        if(data.checkNameVal) {
          let item = this.queryItemsChild[data.index]
          item.checkNameVal = data.checkNameVal
          this.$set(this.queryItemsChild, data.index, item)
        }
        if(data.id) {
          this.$set(this.searchItems, this.tableData.columnName, data.id)
        }
      },
      closeTreeDialog(data) {
        if(data.checkNameVal) {
          let item = this.queryItemsChild[data.index]
          item.checkNameVal = data.checkNameVal
          this.$set(this.queryItemsChild, data.index, item)
        }
        if(data.idList) {
          this.$set(this.searchItems, this.treeData.columnName, data.idList)
        }
        if(data.goodList) {
          this.$set(this.searchItems, 'goodList', data.goodList)
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
      // 查询
      searchAll() {
        this.$emit('searchAll')
      },
      reset() {
        // 重置
        let queryItems = [...this.queryItemsChild]
        queryItems.forEach((item, i) => {
          if(item.editAble !== 0) {
            delete this.searchItems[item.columnName]
          }
        })
        queryItems.forEach((item, i) => {
          if(item.editAble !== 0) {
            if(item.checkNameVal) {
              item.checkNameVal = ''
            }
            if(item.checkCascader) {
              item.checkCascader = []
            }
          }
          this.$set(this.queryItemsChild, i, item)
        })
        for(let key in this.weekDates) {
          this.weekDates[key] = []
        }
        this.initialize()
      },
    }
  }
</script>
