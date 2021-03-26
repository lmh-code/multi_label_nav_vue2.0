<style scoped>
  .nopt {
    padding-top: 0 !important;
  }
</style>

<template>
  <div>
    <div class="handel-wraper nopt">
      <el-button 
        @click="doAddHandel"
        type="primary"
        icon="el-icon-plus" 
        size="mini">新增报价单</el-button>
    </div>
    <div class="search-form-wraper">
      <el-form :model="searchContent" label-position="top">
        <el-form-item label="供应商">
          <el-select 
            class="search-input" 
            v-model="searchContent.vendorNos" 
            placeholder="选择供应商" 
            multiple
            collapse-tags
            size="small">
            <el-option 
              v-for="item in vendors" 
              :key="item.vendorNo" 
              :label="item.vendorName" 
              :value="item.vendorNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格有效起始时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.startTime" 
            type="datetime" 
            placeholder="价格有效起始时间"
            format="yyyy-MM-dd HH:mm:ss" 
            value-format="yyyy-MM-dd HH:mm:ss" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="价格有效终止时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.endTime" 
            type="datetime" 
            placeholder="价格有效终止时间"
            format="yyyy-MM-dd HH:mm:ss" 
            value-format="yyyy-MM-dd HH:mm:ss" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="价格状态">
          <el-select 
            class="search-input" 
            v-model="searchContent.showStatus" 
            placeholder="选择状态" 
            filterable
            clearable
            size="small">
            <el-option 
              v-for="item in statusOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报价单号">
          <el-input 
            v-model.trim="searchContent.quoteNo" 
            size="small" 
            class="search-input" 
            placeholder="报价单号"
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearchHandle(true)" size="mini">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="checkedList.length === 0" @click="doExortHandel" size="mini" :loading="exportLoading">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wraper">
      <bl-table
        :loading="loading"
        :border="false"
        :selection="true"
        :dataSource="tableData"
        :columns="columns"
        @selection-change="selectionChangeHandel"/>
      <bl-pagination
        :showPagination="tableData.length > 0"
        :pageNum="pageNum"
        :total="total"
        @size-change="changeSize"
        @current-change="changeCurrent"/>
    </div>
  </div>
</template>
<script>
import vendorsMixin from '@/module/mixin/getVendors'
import requestUrl from '@/module/api/saleMgtUrl'
import {dateFormat, objectToArray, changeDateToTimestamp} from '@/utils/utils'
import exportExcel from '@/utils/exportExcel'
import constants from './constants'
export default {
  mixins: [vendorsMixin],
  data() {
    return {
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchContent: {
        vendorNos: [],
        startTime: `${dateFormat('yyyy-MM-dd', new Date().getTime())} 00:00:00`,
        endTime: `${dateFormat('yyyy-MM-dd', new Date().getTime() + 86400000)} 23:59:59`,
        showStatus: '',
        quoteNo: ''
      },
      statusOptions: constants.statusOptions,
      exportLoading: false,
      checkedList: [],
      columns: [
        {
          title: '供应商',
          dataIndex: 'vendorName',
          minWidth: 120
        },
        {
          title: '报价单号',
          dataIndex: 'quoteNo',
          ellipsis: true,
          minWidth: 170
        },
        {
          title: '最新报价时间',
          dataIndex: 'updateTime',
          ellipsis: true,
          minWidth: 170
        },
        {
          title: '生效时间',
          dataIndex: 'validTimeRange',
          ellipsis: true,
          minWidth: 170
        },
        {
          title: '状态',
          dataIndex: 'showStatus',
          minWidth: 80,
          formatData: this.showStatusFormat
        },
        {
          title: '操作',
          fixed: 'right',
          width: 150,
          operation: [
            {
              label: '查看',
              icon: 'el-icon-view',
              clickFunc: this.goDetailPage
            },
            {
              label: '编辑',
              icon: 'el-icon-edit',
              clickFunc: this.goEditPage,
              isShow: this.showEdit
            },
            {
              label: '发布',
              icon: 'el-icon-top',
              clickFunc: this.publishHandel,
              isShow: this.showPublishAndDelete
            },
            {
              label: '删除',
              icon: 'el-icon-delete',
              clickFunc: this.deleteHandel,
              isShow: this.showPublishAndDelete
            }
          ]
        }
      ],
      tableData: [],
      exportConfig: {
        vendorName: '供应商',
        quoteNo: '报价单号',
        updateTime: '最新报价时间',
        validTimeRange: '生效时间',
        statusDesc: '状态',
      }
    }
  },
  methods: {
    doAddHandel() {
      this.$router.push('/sale_mgt/add')
    },
    changeSize(value) {
      this.pageSize = value
      this.doSearchHandle()
    },
    changeCurrent(value) {
      this.pageNum = value
      this.doSearchHandle()
    },
    doSearchHandle(firstPage) {
      this.checkedList = []
      if (firstPage === true) {
        this.pageNum = 1
      }
      if(this.searchContent.startTime && this.searchContent.endTime) {
        if(changeDateToTimestamp(this.searchContent.startTime) > changeDateToTimestamp(this.searchContent.endTime)) {
          this.$tip.message('价格有效起始时间不能早于终止时间', 'warning')
          return
        }
      }
      this.loading = true
      this.$http.post(requestUrl.getQuoteList, {
        ...this.searchContent,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          let tableDataTemp = res.data && res.data.result && res.data.result.length ? res.data.result : []
          tableDataTemp.forEach(item => {
            item.validTimeRange = `${item.startTime} ~ ${item.endTime}`
          })
          this.tableData = tableDataTemp
          this.total = res.data && res.data.total ? res.data.total : 0
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    selectionChangeHandel({selection}) {
      this.checkedList = [...selection]
    },
    doExortHandel() {
      const tHeader = objectToArray(this.exportConfig, false)
      const filterVal = objectToArray(this.exportConfig, true)
      this.checkedList.forEach(item => {
        item.statusDesc = this.showStatusFormat(item.showStatus)
      })
      exportExcel.ExportJsonToExcel({
        header: tHeader,
        filterVal,
        data: this.checkedList,
        filename: '报价单汇总'
      })
    },
    goDetailPage(row) {
      this.$router.push(`/sale_mgt/see/${row.quoteNo}`)
    },
    showEdit(row) {
      return row.showStatus === 0 || row.showStatus === 1 || row.showStatus === 2 
    },
    goEditPage(row) {
      this.$router.push(`/sale_mgt/edit/${row.quoteNo}`)
    },
    showPublishAndDelete(row) {
      return row.showStatus === 0 
    },
    publishHandel(row) {
      this.$confirm('确定要执行发布操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(requestUrl.publish, { quoteNo: row.quoteNo }).then(res => {
          if(res && res.code === 0) {
            this.$tip.message('发布成功', 'success');
            this.doSearchHandle()
            return
          }
          throw new Error(res.msg)
        }).catch(err => {
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
      }).catch(() => {})
    },
    deleteHandel(row) {
      this.$confirm('确定要执行删除操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(requestUrl.deleteQuote, { quoteNo: row.quoteNo }).then(res => {
          if(res && res.code === 0) {
            this.$tip.message('删除成功', 'success');
            this.doSearchHandle()
            return
          }
          throw new Error(res.msg)
        }).catch(err => {
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
      }).catch(() => {})
    },
    showStatusFormat(value) {
      let statusMsg = this.statusOptions.filter(item => {
        return item.value === value
      })[0]
      return statusMsg ? statusMsg.label : value
    }
  }
}
</script>