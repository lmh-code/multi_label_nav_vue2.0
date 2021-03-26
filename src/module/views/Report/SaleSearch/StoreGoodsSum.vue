<template>
  <div>
    <div class="search-form-wraper">
      <el-form :model="searchContent" label-position="top">
        <el-form-item label="单据开始时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.startDate" 
            type="date" 
            placeholder="单据开始时间"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单据结束时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.endDate" 
            type="date" 
            placeholder="单据结束时间"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商">
          <el-select 
            class="search-input" 
            v-model="searchContent.vendorNoList" 
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
        <el-form-item label="门店">
          <el-input 
            v-model.trim="storeNames" 
            size="small" 
            class="search-input" 
            placeholder="点击选择门店"
            readonly>
              <el-button slot="append" icon="el-icon-search" @click="clickInputHandel"></el-button>
            </el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-select 
            class="search-input" 
            v-model="searchContent.settlementMethodCode" 
            placeholder="结算方式" 
            filterable
            clearable
            size="small">
            <el-option 
              v-for="item in typeIdOptions" 
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
          <el-button :disabled="exportLoading" @click="doExortHandel" size="mini" :loading="exportLoading">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="search-form-wraper">
      <bl-table
        :loading="loading"
        :border="false"
        :dataSource="tableData"
        :columns="columns"
        :showSummary="true"
        :getSummaries="getSummaries"/>
    </div>
    <choose-store 
      ref="chooseStore"
      @confirm="confirmHandel"/>
  </div>
</template>
<script>
import vendorsMixin from '@/module/mixin/getVendors'
import requestUrl from '@/module/api/saleSearch'
import commonUrl from '@/module/api/common'
import {dateFormat, objectToArray, changeDateToTimestamp, fixedNum} from '@/utils/utils'
import exportExcel from '@/utils/exportExcel'
import ChooseStore from '@/module/component/SearchItem/ChooseStore'
import utilConst from '@/utils/constant'
export default {
  mixins: [
    vendorsMixin
  ],
  components: {
    ChooseStore
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      pageSizes: utilConst.pageSizeStart20,
      loading: false,
      exportLoading: false,
      total: 0,
      tableData: [],
      searchContent: {
        vendorNoList: [],
        storeNoList: [],
        startDate: dateFormat('yyyy-MM-dd', Date.parse(new Date()) - 86400000),
        endDate: dateFormat('yyyy-MM-dd', Date.parse(new Date()) - 86400000),
        settlementMethodCode: ''
      },
      typeIdOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '购销'
        },
        {
          value: 2,
          label: '联营'
        },
        {
          value: 9,
          label: '代营'
        }
      ],
      totalSum: {
        totalGrossProfitAmount: 0,
        totalSaleAmount: 0
      },
      // 根据供应商选择门店
      checkedStoreList: [],
      vendorNos: [],
      storeNames: '',
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          minWidth: 60
        },
        {
          title: '门店名称',
          dataIndex: 'storeName',
          minWidth: 130
        },
        {
          title: '所在区域',
          dataIndex: 'areaStr',
          minWidth: 130
        },
        {
          title: '销售额',
          dataIndex: 'storeSaleAmount',
          minWidth: 130,
          sortable: true
        },
        {
          title: '销售占比',
          dataIndex: 'storeSaleRatio',
          minWidth: 130,
          sortable: true
        },
        {
          title: '参考毛利额',
          dataIndex: 'grossProfitAmount',
          minWidth: 130,
          sortable: true
        }
      ],
      exportConfig: {
        index: '序号',
        storeName: '门店名称',
        areaStr: '所在区域',
        storeSaleAmount: '销售额',
        storeSaleRatio: '销售占比',
        grossProfitAmount: '毛利额'
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
      if (firstPage === true) {
        this.pageNum = 1
      }
      if(!this.searchContent.startDate || !this.searchContent.endDate) {
        this.$tip.message('单据开始时间和结束时间都不能为空', 'warning')
        return
      }else if(changeDateToTimestamp(this.searchContent.startDate) > changeDateToTimestamp(this.searchContent.endDate)) {
        this.$tip.message('结束时间不能早于开始时间！', 'warning')
        return
      }
      let params = {
        ...this.searchContent,
        startDate: `${this.searchContent.startDate} 00:00:00`,
        endDate: `${this.searchContent.endDate} 23:59:59`,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.loading = true
      this.$http.post(requestUrl.storeSale, {...params}).then(res => {
        this.loading = false
        if(res.code === 0) {
          let resultVal = res.data ? res.data : {}
          let tableDataList = resultVal.storeSaleList && resultVal.storeSaleList.length ? resultVal.storeSaleList : []
          let tableDataListTemp = tableDataList.map((item, idx) => {
            item.index = idx + 1
            if(item.provinceName && item.cityName) {
              item.areaStr = `${item.provinceName}-${item.cityName}`
            }else if(item.provinceName) {
              item.areaStr = `${item.provinceName}`
            }else if(item.cityName) {
              item.areaStr = `${item.cityName}`
            }else {
              item.areaStr = ''
            }
            item.storeSaleAmount = item.storeSaleAmount ? fixedNum(item.storeSaleAmount) : item.storeSaleAmount
            item.storeSaleRatio = item.storeSaleRatio ? fixedNum(item.storeSaleRatio) : item.storeSaleRatio
            item.grossProfitAmount = item.grossProfitAmount ? fixedNum(item.grossProfitAmount) : item.grossProfitAmount
            return item
          })
          this.tableData = tableDataListTemp
          this.totalSum = {
            grossProfitAmount: resultVal.totalGrossProfitAmount ? fixedNum(resultVal.totalGrossProfitAmount) : resultVal.totalGrossProfitAmount,
            storeSaleAmount: resultVal.totalSaleAmount ? fixedNum(resultVal.totalSaleAmount) : resultVal.totalSaleAmount
          }
          this.$emit("setLatestTime", resultVal.latestTime || '-')
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    doExortHandel() {
      if(this.tableData && this.tableData.length > 0) {
        const tHeader = objectToArray(this.exportConfig, false)
        const filterVal = objectToArray(this.exportConfig, true)
        exportExcel.ExportJsonToExcel({
          header: tHeader,
          filterVal,
          data: this.tableData,
          filename: `本来鲜销售数据_${this.searchContent.startDate}~${this.searchContent.endDate}`
        })
      }else {
        this.$tip.message('没有查询到要导出的数据！', 'warning')
      }
    },
    clickInputHandel() {
      this.vendorNos = this.searchContent.vendorNo && this.searchContent.vendorNo.length > 0 ? this.searchContent.vendorNo : this.vendors.map(item => {
        return item.vendorNo
      })
      this.$refs.chooseStore.setDefault({
        vendorNos: this.vendorNos,
        defaultChecked: this.checkedStoreList
      })
    },
    confirmHandel(result) {
      this.checkedStoreList = result
      this.searchContent.storeNoList = result.map(item => {
        return item.storeNo
      })
      this.storeNames = result.map(item => {
        return item.storeName
      }).join(',')
    },
    getSummaries(params) {
      let sums = []
      let newArray=[]
      params.columns.forEach(item => {
        if(this.totalSum[item.property] || this.totalSum[item.property] == 0) {
          newArray.push(this.totalSum[item.property])
        }else {
          newArray.push('')
        }
      })
      sums = newArray;
      sums[0] = "合计";
      return sums
    }
  }
}
</script>