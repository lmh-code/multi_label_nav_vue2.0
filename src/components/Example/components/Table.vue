<style scoped lang="less">
  @import "../style.less";
</style>
<template>
  <div>
    <p class="title">1. Table表格组件</p>
    <p>用于展示多条结构类似的数据，可对数据进行排序、筛选、求和或其他自定义操作。</p>
    <p class="mt20 sub-title">1.1 展示示例</p>
    <p>Table表格组件的展示用法。<span class="tip">[代码使用请查看/src/components/Example/components/Table文件中的内容]</span></p>
    <p class="mt10">
      <el-button @click="loadingHandel" size="mini">切换表格loading</el-button>
    </p>
    <bl-table
      class="mt10"
      :loading="loading"
      :selection="true"
      :dataSource="tableData"
      :columns="columns"
      @sort-change="sortChange"
      @selection-change="selectionChangeHandel"
      @row-click="rowClick"/>
    <p class="mt20 sub-title">1.2 Table Attributes</p>
    <p>表格中参数说明</p>
    <bl-table
      :dataSource="tableAttrData"
      :columns="tableAttrColumn"/>
    <p class="mt20 sub-title">1.3 Table Events</p>
    <p>表格中事件说明</p>
    <bl-table
      :dataSource="tableEventData"
      :columns="tableEventColumn"/>
    <p class="mt20 sub-title">1.4 Table-column Attributes</p>
    <p>表格中列的参数说明</p>
    <bl-table
      :dataSource="columnAttrData"
      :columns="tableAttrColumn"
      :maxHeight="10000"/>
    <p class="mt20 sub-title">1.5 Table-column Events</p>
    <p>表格列中单元格事件说明</p>
    <bl-table
      :dataSource="columnEventData"
      :columns="tableEventColumn"/>
    <p class="mt20 sub-title">1.6 Table-column operation Attributes</p>
    <p>操作按钮属性说明</p>
    <bl-table
      :dataSource="columnOptionsData"
      :columns="tableAttrColumn"/>
    <p class="mt20 sub-title">1.5 Table-column operation Events</p>
    <p>操作按钮事件说明</p>
    <bl-table
      :dataSource="columnOptionsEventData"
      :columns="tableEventColumn"/>
  </div>
</template>
<script>
import tableMock from '../mock/table'
import constants from '../constants'
export default {
  data() {
    return {
      loading: false,
      columns: [
        {
          title: '订单编号[router]',
          router: true,
          target: '_blank',
          replace: true,
          newJump: (row) => {
            return 'https://www.baidu.com'
          },
          dataIndex: 'paperNo',
          minWidth: 160
        },
        {
          title: 'html标签展示[htmlEl]',
          htmlEl: true,
          dataIndex: 'htmlMsg',
          minWidth: 160
        },
        {
          title: '图片[img]',
          img: true,
          dataIndex: 'imgMsg',
          minWidth: 160
        },
        {
          title: '供应商[minWidth]',
          dataIndex: 'vendorName',
          minWidth: 140
        },
        {
          title: '门店信息[多级表头]',
          dataIndex: 'storeMsg',
          headerAlign: 'center',
          minWidth: 300,
          children: [
            {
              title: '订货门店/仓库[width]',
              dataIndex: 'storeName',
              width: 160
            },
            {
              title: '门店地址[ellipsis]',
              dataIndex: 'storeAddress',
              ellipsis: true,
              minWidth: 140
            }
          ]
        },
        {
          title: '订单金额[sortable]',
          dataIndex: 'totalAmount',
          sortable: true,
          minWidth: 170
        },
        {
          title: '联系人[showPopover]',
          dataIndex: 'createUserName',
          showPopover: true,
          content: (row) => {
            return `联系人姓名：${row.createUserName}，电话：18339228927`
          },
          minWidth: 170
        },
        {
          title: '单据时间[showTooltip]',
          dataIndex: 'authDatetime',
          showTooltip: true,
          placement: 'top',
          content: (row) => {
            return `单据时间: ${row.authDatetime}`
          },
          minWidth: 180
        },
        {
          title: '输入[input]',
          dataIndex: 'inputMsg',
          input: true,
          minWidth: 100,
          inputChangeFunc: (row) => {
            console.log("row:", row);
          }
        },
        {
          title: '期望到货时间[input条件]',
          dataIndex: 'expectDatetime',
          input: (row) => row.createUserName === 'system',
          minWidth: 190
        },
        {
          title: '选择[select]',
          dataIndex: 'selectMsg',
          select: true,
          minWidth: 120,
          changeSelectFunc: (row) => {
            console.log("row:", row);
          },
          selectOptions: [
            {
              text: '普通会员',
              value: 0
            },
            {
              text: '超级会员',
              value: 1
            }
          ],
        },
        {
          title: '是否查看[formatData]',
          dataIndex: 'isOpen',
          minWidth: 180,
          formatData: (val, row, prop) => {
            return val === 1 ? '已查看' : '未查看'
          }
        },
        {
          title: '操作[fixed]',
          fixed: 'right',
          headerAlign: 'center',
          width: 150,
          operation: [
            {
              label: '详情',
              icon: 'el-icon-view',
              clickFunc: (row) => {
                // alert('点击详情')
                this.$tip.notify(`点击详情: ${row.paperNo}`, 'warning')
              },
              isDisabled: (row) => {
                return row.paperNo === '01Y8012011250302'
              }
            },
            {
              label: '接单',
              icon: 'el-icon-coordinate',
              clickFunc: (row) => {
                this.$tip.notify(`点击接单: ${row.paperNo}`, 'warning')
              },
              isShow: (row) => {
                return row.status === 0
              },
              isDisabled: (row) => {
                return row.paperNo === '01Y8012011250302'
              }
            },
            {
              label: '拒绝接单',
              icon: 'el-icon-coordinate',
              // clickFunc 用法
              clickFunc: (row) => {
                this.$tip.notify(`点击拒绝接单: ${row.paperNo}`, 'warning')
              },
              // isShow 用法
              isShow: (row) => {
                return row.status === 0
              },
              // isDisabled 用法
              isDisabled: (row) => {
                return row.paperNo === '01Y8012011250302'
              }
            }
          ]
        }
      ],
      tableData: tableMock.tableData,
      // 表格参数
      tableAttrColumn: constants.tableAttrColumn,
      tableAttrData: tableMock.tableAttrData, 
      
      // 表格事件
      tableEventColumn: constants.tableEventColumn,
      tableEventData: tableMock.tableEventData,

      // 表格列参数说明
      columnAttrData: tableMock.columnAttrData,
      // 表格列中单元格事件说明
      columnEventData: tableMock.columnEventData,

      // 操作按钮属性和事件说明
      columnOptionsData: tableMock.columnOptionsData,
      // 操作按钮事件说明
      columnOptionsEventData: tableMock.columnOptionsEventData
    }
  },
  methods: {
    loadingHandel() {
      this.loading = !this.loading
    },
    selectionChangeHandel({selection}) {
      console.log("selection:", selection);
    },
    sortChange({column, prop, order}) {
      console.log("column:", column);
      console.log("prop:", prop);
      console.log("order:", order);
    },
    rowClick(row, column, event) {
      console.log("row:",row);
      console.log("column:", column);
      console.log("event:", event);
    }
  }
}
</script>