<style scoped>
  .bl-table-opt-btn {
    margin-left: 0 !important;
    margin-right: 10px !important;
  }
</style>
<template>
  <el-table
    ref="multipleTable"
    v-loading="loading"
    :header-cell-style="{background: '#fafafa'}"
    :stripe="stripe"
    :border="border"
    :size="size"
    :data="dataSource"
    :max-height="maxHeight"
    :show-summary="showSummary"
    :summary-method="getSummaries"
    @sort-change="sortChange"
    @selection-change="selectionChangeHandel"
    @select="selectHandel"
    @select-all="selectAllHandel"
    @row-click="rowClick"
    @row-dblclick="rowDbClick"
    style="width: 100%">
    <el-table-column
      v-if="selection"
      :selectable="selectable"
      type="selection"
      align="center"
      width="66">
    </el-table-column>
    <template
      v-for="(column, index) of columns">
      <el-table-column 
        v-if="column.children && column.children.length"
        :key="index"
        :label="column.title"
        :prop="column.dataIndex"
        :align="column.align || 'left'"
        :header-align="column.headerAlign || column.align"
        :min-width="column.minWidth ? column.minWidth : ''"
        :width="column.width ? column.width : ''"
        :show-overflow-tooltip="column.ellipsis"
        :sortable="column.sortable"
        :fixed="column.fixed">
        <table-column :columns="column.children"/>
      </el-table-column>
      <el-table-column 
        v-else
        :key="index"
        :label="column.title"
        :prop="column.dataIndex"
        :align="column.align || 'left'"
        :header-align="column.headerAlign || column.align"
        :min-width="column.minWidth ? column.minWidth : ''"
        :width="column.width ? column.width : ''"
        :show-overflow-tooltip="column.ellipsis"
        :sortable="column.sortable"
        :fixed="column.fixed">
        <template slot-scope="scope">
          <!-- 操作按钮 -->
          <div v-if="column.operation && column.operation.length > 0">
            <template v-for="(btn, key) in column.operation">
              <span 
                :key="key"
                v-if="!btn.isShow || (btn.isShow && btn.isShow(scope.row, scope.$index))" >
                <el-popover 
                  v-if="btn.showPopover"
                  :placement="btn.placement || 'bottom-start'"
                  width="200"
                  trigger="hover">
                  <div v-html="typeof(btn.content) === 'function' && btn.content(scope.row, scope.$index) || btn.content"></div>
                  <el-button
                    slot="reference"
                    class="bl-table-opt-btn"
                    :icon="btn.icon"
                    :size="size"
                    :type="btn.type || `text`"
                    :disabled="(typeof(btn.isDisabled) === 'function' && btn.isDisabled(scope.row, scope.$index)) || (typeof(btn.isDisabled) === 'boolean' && btn.isDisabled)"
                    :plain="btn.plain"
                    @click="btn.clickFunc(scope.row)">
                      {{btn.label}} 
                  </el-button>
                </el-popover>
                <el-button
                  v-else
                  class="bl-table-opt-btn"
                  :icon="btn.icon"
                  :size="size"
                  :type="btn.type || `text`"
                  :disabled="(typeof(btn.isDisabled) === 'function' && btn.isDisabled(scope.row, scope.$index)) || (typeof(btn.isDisabled) === 'boolean' && btn.isDisabled)"
                  :plain="btn.plain"
                  @click="btn.clickFunc(scope.row)">
                    {{btn.label}} 
                </el-button>
              </span>
            </template>
          </div>
          <!-- 点击跳转页面 -->
          <div v-else-if="column.router">
            <router-link
              :disabled="(typeof(column.isDisabled) === 'function' && column.isDisabled(scope.row, scope.$index)) || (typeof(column.isDisabled) === 'boolean' && column.isDisabled)"
              :target="column.target"
              tag='a'
              :replace="column.replace || false"
              :to="column.newJump(scope.row, column, scope.$index)"
            >
              {{scope.row[column.dataIndex] || column.content}}
            </router-link>
          </div>
          <div v-else>
            <!-- 鼠标滑过显示气泡框 -->
            <el-popover 
              v-if="column.showPopover"
              :placement="column.placement || 'bottom-start'"
              width="200"
              trigger="hover">
              <div v-html="typeof(column.content) === 'function' && column.content(scope.row, scope.$index) || column.content"></div>
              <span slot="reference" style="-webkit-box-orient:vertical">
                {{ scope.row[column.dataIndex] }}
              </span>
            </el-popover>
            <el-tooltip 
              v-else-if="column.showTooltip"
              :placement="column.placement || 'bottom-start'"
              width="200"
              effect="dark"
              trigger="hover">
              <div slot="content" v-html="typeof(column.content) === 'function' && column.content(scope.row, scope.$index) || column.content"></div>
              <span style="-webkit-box-orient:vertical">
                {{ scope.row[column.dataIndex] }}
              </span>
            </el-tooltip>
            <!-- html标签 -->
            <div v-else-if="column.htmlEl" v-html="scope.row[column.dataIndex]"></div>
            <!-- 输入框 -->
            <el-input 
              v-else-if="column.input === true || (column.input && column.input(scope.row, scope.$index))" 
              :disabled="(typeof(column.isDisabled) === 'function' && column.isDisabled(scope.row, scope.$index)) || (typeof(column.isDisabled) === 'boolean' && column.isDisabled)"
              :placeholder="column.placeholder || '请输入'" 
              v-model="scope.row[column.dataIndex]" 
              @input="column.inputChangeFunc && column.inputChangeFunc(scope.row, scope.$index)"
              :size="size" ></el-input>
            <!-- 下拉选择框 -->
            <el-select 
              :size="size"
              v-else-if="column.select === true || (column.select && column.select(scope.row, scope.$index))" 
              :disabled="(typeof(column.isDisabled) === 'function' && column.isDisabled(scope.row, scope.$index)) || (typeof(column.isDisabled) === 'boolean' && column.isDisabled)" 
              v-model="scope.row[column.dataIndex]" 
              @change="column.changeSelectFunc && column.changeSelectFunc(scope.row, scope.$index)" 
              clearable>
              <el-option 
                v-for="(item, index) in column.selectOptions" 
                :value="item.value" 
                :label="item.text" 
                :key="index">
              </el-option>
            </el-select>
            <!-- 图片展示 -->
            <div v-else-if="column.img">
              <el-image 
                fit="contain"
                style="width: 60px; height: 60px;"
                v-for="(url, index) of scope.row[column.dataIndex]"
                :key="index"
                :src="url" 
                :preview-src-list="scope.row[column.dataIndex]">
              </el-image>
            </div>
            <!-- 有formatter的情况，需要格式化数据 -->
            <span v-else-if="column.formatData">
              {{ scope.row[column.dataIndex] | formatters(scope.row, column.dataIndex, column.formatData) }}
            </span>
            <!-- 纯展示数据 -->
            <span v-else>{{ scope.row[column.dataIndex] }}</span>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import tableColumn from './TableColumn'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }, // 加载中动画
    stripe: {
      type: Boolean,
      default: false
    }, // 是否要斑马纹
    border: {
      type: Boolean,
      default: true
    }, // 是否要纵向边框
    selection: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    }, // 表格大小 medium / small / mini
    maxHeight: {
      type: Number,
      default: () => {
        return document.body.clientHeight - 100 || 500
      }
    },
    showSummary: {
      type: Boolean,
      default: false
    }, // 是否在表尾显示合计行
    getSummaries: {
      type: Function,
      default: () => {
        return ['合计']
      }
    }, // 合计行自定义方法
    selectable: {
      type: Function,
      default: () => {
        return true
      }
    },
    dataSource: {
      type: Array,
      default: () => []
    }, // 表格数据
    columns: {
      type: Array,
      default: () => []
    }, // 表格列内容
    defaultChecked: {
      type: Array,
      default: () => []
    }, // 当可多选的时候，默认选中的内容
    uniqueStr: {
      type: String,
      default: 'id'
    } // 需要回显选中列时必传，列表中数据的唯一值的字段名（key）, 默认取 id 的值作为唯一值
  },
  components: {
    tableColumn
  },
  filters: {
    formatters(val, row, prop, format) {
      if(typeof (format) === 'function') {
        return format(val, row, prop)
      }else {
        return val
      }
    }
  },
  watch: {
    dataSource() {
      if(this.defaultChecked && this.defaultChecked.length > 0) this.doCheckedHandel()
    },
    defaultChecked() {
      if(this.defaultChecked && this.defaultChecked.length > 0) this.doCheckedHandel()
    }
  },
  methods: {
    /**
     * @description: 表格选择内容发生变化
     * @param {*} selection
     * @return {*}
     */
    selectionChangeHandel(selection) {
      this.$emit("selection-change", {selection})
    },
    /**
     * @description: 点击某一行的选择框
     * @param {*} selection
     * @param {*} row
     * @return {*}
     */
    selectHandel(selection, row) {
      this.$emit("select", {selection, row})
    },
    /**
     * @description: 全选
     * @param {*} selection 全选的内容
     * @return {*}
     */
    selectAllHandel(selection) {
      this.$emit("select-all", {selection})
    },
    /**
     * @description: 排序，点击排序的时候可调用接口。 只有column中的sortable属性为custom时有效
     * @param {*} column 列内容
     * @param {*} prop 点击的列的字段值
     * @param {*} order 升序或降序
     * @return {*}
     */
    sortChange({column, prop, order}) {
      this.$emit("sort-change", {column, prop, order})
    },
    rowClick(row, column, event) {
      this.$emit("row-click", row, column, event)
    },
    rowDbClick(row, column, event) {
      this.$emit("row-dblclick", row, column, event)
    },
    selectableHandle(row, index) {
      return row.isPass==0 || row.settlementType==4
      // this.$emit("selectable", row, index)
    },
    doCheckedHandel() {
      let checkedRows = []
      this.dataSource.forEach(row => {
        this.defaultChecked.forEach(checkedRow => {
          if(row[this.uniqueStr] && checkedRow[this.uniqueStr] && row[this.uniqueStr] === checkedRow[this.uniqueStr]) {
            checkedRows.push(row)
          }
        })
      })
      if (checkedRows.length > 0) {
        this.$refs.multipleTable.clearSelection()
        setTimeout(() => {
          checkedRows.forEach(rowItem => {
            this.$refs.multipleTable.toggleRowSelection(rowItem)
          });
        }, 100)
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
}
</script>