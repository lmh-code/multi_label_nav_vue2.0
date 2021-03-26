<style scoped lang="less">
  @import "../style.less";
</style>
<template>
  <div>
    <p class="title">3. Excel组件</p>
    <p>Excel相关组件说明</p>
    <p class="mt20 sub-title">3.1 展示示例</p>
    <p>Excel相关组件的展示用法。<span class="tip">[代码使用请查看/src/components/Example/components/Excel文件中的内容]</span></p>
    <p class="mt20 sub-title">3.2 导出table表格内容</p>
    <p class="mt10">
      <el-button @click="doExportHandel" size="mini">导出table表格内容</el-button>
    </p>
    <bl-table
      class="mt10"
      :dataSource="tempData"
      :columns="tempColumn"/>
    <p class="mt20 sub-title">3.3 通过AddByExcel组件导入excel内容</p>
    <p class="mt10">
      <el-button @click="doAddByExcelHandel" size="mini">通过AddByExcel组件导入excel内容</el-button>
    </p>
    <p class="mt20 sub-title">3.4 AddByExcel组件 Attributes</p>
    <p>AddByExcel组件参数说明</p>
    <bl-table
      :dataSource="attrData"
      :columns="tableAttrColumn"/>
    <p class="mt20 sub-title">3.5 AddByExcel组件 Events</p>
    <p>AddByExcel组件事件说明</p>
    <bl-table
      :dataSource="eventData"
      :columns="eventColumn"/>
    
    <add-by-excel 
      ref="addByExcel" 
      title="通过excel添加"
      :visible="visible"
      :exportConfig="exportConfig"
      @confirm="doConfirmHandel"
      @close="doCloseHandel"/>
  </div>
</template>
<script>
import {objectToArray} from '@/utils/utils'
import exportExcel from '@/utils/exportExcel'
import constants from '../constants'
import excelMock from '../mock/excel'
import AddByExcel from '@/components/Common/Excel/AddByExcel'
export default {
  components: {
    AddByExcel
  },
  data() {
    return {
      // 表格参数
      tableAttrColumn: constants.tableAttrColumn,
      attrData: excelMock.attrData, // 参数说明内容
      tempData: excelMock.tempData, // 导出table表格内容
      eventColumn: constants.tableEventColumn,
      eventData: excelMock.eventData,
      tempColumn: [
        {
          title: '姓名',
          dataIndex: 'name',
          ellipsis: true
        },
        {
          title: '地址',
          dataIndex: 'address',
          ellipsis: true
        },
        {
          title: '日期',
          dataIndex: 'date',
          ellipsis: true
        }
      ],
      exportConfig: {
        name: '姓名',
        address: '地址',
        date: '日期'
      },

      visible: false
    }
  },
  methods: {
    doExportHandel() {
      const tHeader = objectToArray(this.exportConfig, false)
      const filterVal = objectToArray(this.exportConfig, true)
      exportExcel.ExportJsonToExcel({
        header: tHeader,
        filterVal,
        data: this.tempData,
        filename: '导出table表格内容'
      })
    },
    doAddByExcelHandel() {
      this.visible = true
    },
    doCloseHandel() {
      this.visible = false
    },
    doConfirmHandel(result) {
      console.log("result:", result);
      setTimeout(() => {
        this.visible = false
      }, 1000);
    }
  }
}
</script>
