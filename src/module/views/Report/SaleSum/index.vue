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
        <el-form-item label="区域">
          <el-select 
            class="search-input" 
            v-model="searchContent.regionCode" 
            placeholder="选择区域"
            collapse-tags
            size="small">
            <el-option 
              v-for="item in regionOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-input 
            v-model.trim="searchContent.searchValue" 
            size="small" 
            class="search-input" 
            placeholder="商品编码或名称"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="订单开始时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.startPayTime" 
            type="datetime" 
            placeholder="订单开始时间"
            format="yyyy-MM-dd HH:mm:ss" 
            value-format="yyyy-MM-dd HH:mm:ss" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单结束时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.endPayTime" 
            type="datetime" 
            placeholder="订单结束时间"
            format="yyyy-MM-dd HH:mm:ss" 
            value-format="yyyy-MM-dd HH:mm:ss" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始提货时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.pickUpTime" 
            type="date" 
            placeholder="开始提货时间"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
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
  import requestUrl from '@/module/api/conOrder'
  import commonUrl from '@/module/api/common'
  import {dateFormat, objectToArray, changeDateToTimestamp} from '@/utils/utils'
  import exportExcel from '@/utils/exportExcel'
  export default {
    mixins: [vendorsMixin],
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        loading: false,
        exportLoading: false,
        total: 0,
        tableData: [],
        columns: [
          {
            title: '供应商',
            dataIndex: 'vendorName',
            ellipsis: true,
            minWidth: 130
          },
          {
            title: '区域',
            dataIndex: 'regionName',
            minWidth: 80
          },
          {
            title: '商品',
            dataIndex: 'goodsName',
            ellipsis: true,
            minWidth: 130
          },
          {
            title: '单位',
            dataIndex: 'saleUnit',
            minWidth: 90
          },
          {
            title: '规格',
            dataIndex: 'spec',
            minWidth: 90
          },
          {
            title: '自提时间',
            dataIndex: 'pickUpTime',
            minWidth: 170
          },
          {
            title: '销量',
            dataIndex: 'quantity',
            minWidth: 80
          },
          {
            title: '销售额',
            dataIndex: 'amount',
            minWidth: 80
          },
          {
            title: '已核销',
            dataIndex: 'completeQty',
            minWidth: 80
          },
          {
            title: '已退货',
            dataIndex: 'refundQty',
            minWidth: 80
          },
          {
            title: '待核销',
            dataIndex: 'awaitQty',
            minWidth: 80
          }
        ],
        searchContent: {
          vendorNos: [],
          startPayTime: `${dateFormat('yyyy-MM-dd', Date.parse(new Date()))} 00:00:00`,
          endPayTime: `${dateFormat('yyyy-MM-dd', Date.parse(new Date()))} 23:59:59`,
          pickUpTime: '',
          searchValue: '',
          regionCode: '',
        },
        regionOptions: [],
        checkedList: [],
        exportConfig: {
          vendorName: '供应商',
          regionName: '区域',
          goodsName: '商品',
          saleUnit: '单位',
          spec: '规格',
          pickUpTime: '自提时间',
          quantity: '销量',
          amount: '销售额',
          completeQty: '已核销',
          refundQty: '已退货',
          awaitQty: '待核销'
        }
      }
    },
    created() {
      this.getRegionList()
    },
    mounted() {
      this.doSearchHandle(true)
    },
    methods: {
      getRegionList() {
        this.$http.get(commonUrl.userAreaStoreGroupList).then(res => {
          if(res && res.code === 0) {
            let regionOptions = res.data && res.data.length ? res.data.map(region => {
              return {
                label: region.storeGroupName,
                value: region.storeGroupNo
              }
            }) : []
            this.regionOptions = regionOptions
          }
        }).catch(err => {
          console.warn("获取区域商品信息：", err.message || '');
        })
      },
      changeSize(value) {
        this.pageSize = value
        this.doSearchHandle()
      },
      changeCurrent(value) {
        this.pageNum = value
        this.doSearchHandle()
      },
      selectionChangeHandel({selection}) {
        this.checkedList = [...selection]
      },
      doSearchHandle(firstPage) {
        this.checkedList = []
        if (firstPage === true) {
          this.pageNum = 1
        }
        if(this.searchContent.startPayTime && this.searchContent.endPayTime) {
          if(changeDateToTimestamp(this.searchContent.startPayTime) > changeDateToTimestamp(this.searchContent.endPayTime)) {
            this.$tip.message('订单结束时间不能早于订单开始时间', 'warning')
            return
          }
        }
        this.loading = true
        this.$http.post(requestUrl.goodsSaleSummary, {...this.searchContent, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
          this.loading = false
          if(res.code === 0) {
            this.tableData = res.data && res.data.result && res.data.result.length ? res.data.result : []
            this.total = res.data && res.data.total ? res.data.total : 0
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.loading = false
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
      },
      doExortHandel() {
        const tHeader = objectToArray(this.exportConfig, false)
        const filterVal = objectToArray(this.exportConfig, true)
        exportExcel.ExportJsonToExcel({
          header: tHeader,
          filterVal,
          data: this.checkedList,
          filename: '商品销售汇总'
        })
      }
    }
  }
</script>