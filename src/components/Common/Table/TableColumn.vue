<template>
  <div>
    <template
      v-for="(column, index) of columns">
      <table-column
        v-if="column.children && column.children.length"
        :key="index"
        :columns="column.children"/>
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
  </div>
</template>

<script>
  export default {
    name: 'tableColumn',
    props: {
      columns: {
        type: Array,
        required: false,
        default: () => []
      } 
    }
  }
</script>