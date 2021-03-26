<template>
  <div>
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
        <el-form-item label="商品名称或编码">
          <el-input 
            v-model.trim="searchContent.goodsName" 
            size="small" 
            class="search-input" 
            placeholder="商品名称或编码"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="报价单号">
          <el-input 
            v-model.trim="searchContent.quoteNo" 
            size="small" 
            class="search-input" 
            placeholder="报价单号"
            clearable></el-input>
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
        :pageSizes="pageSizes"
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
import constantUtil from '@/utils/constant'
import constants from './constants'
export default {
  mixins: [vendorsMixin],
  data() {
    return {
      loading: false,
      pageNum: 1,
      pageSize: 20,
      pageSizes: constantUtil.pageSizeStart20,
      total: 0,
      searchContent: {
        vendorNos: [],
        startTime: `${dateFormat('yyyy-MM-dd', new Date().getTime())} 00:00:00`,
        endTime: `${dateFormat('yyyy-MM-dd', new Date().getTime() + 86400000)} 23:59:59`,
        showStatus: '',
        quoteNo: '',
        goodsName: ''
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
          title: '条形码',
          dataIndex: 'barCode',
          ellipsis: true,
          minWidth: 120
        },
        {
          title: '商品编码',
          dataIndex: 'erpGoodsNo',
          ellipsis: true,
          minWidth: 120
        },
        {
          title: '货号',
          dataIndex: 'vendorGoodsNo',
          ellipsis: true,
          minWidth: 110
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          minWidth: 120
        },
        {
          title: '规格',
          dataIndex: 'spec',
          minWidth: 90
        },
        {
          title: '单位',
          dataIndex: 'unit',
          minWidth: 90
        },
        {
          title: '报价单号',
          dataIndex: 'quoteNo',
          ellipsis: true,
          minWidth: 170
        },
        {
          title:'市场参考价',
          dataIndex: 'showPrice',
          minWidth: 90
        },
        {
          title: '销售价',
          dataIndex: 'salePrice',
          minWidth: 90
        },
        {
          title:'日均可订货量',
          dataIndex: 'qty',
          minWidth: 110
        },
        {
          title: '价格有效期',
          dataIndex: 'validTimeRange',
          ellipsis: true,
          minWidth: 170
        },
        {
          title: '报价时间',
          dataIndex: 'updateTime',
          ellipsis: true,
          minWidth: 170
        }
      ],
      tableData: [],
      exportConfig: {
        vendorName: '供应商',
        barCode:'条形码',
        erpGoodsNo: '商品编码',
        vendorGoodsNo:'货号',
        goodsName: '商品名称',
        spec:'规格',
        unit: '单位',
        quoteNo: '报价单号',
        showPrice:'市场参考价',
        salePrice: '销售价',
        qty:'日均可订货量',
        validTimeRange: '价格有效期',
        updateTime: '报价时间'
      }
    }
  },
  methods: {
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
      this.$http.post(requestUrl.getListByProduct, {
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
      exportExcel.ExportJsonToExcel({
        header: tHeader,
        filterVal,
        data: this.checkedList,
        filename: '报价单汇总（商品维度）'
      })
    },
  }
  
}
</script>