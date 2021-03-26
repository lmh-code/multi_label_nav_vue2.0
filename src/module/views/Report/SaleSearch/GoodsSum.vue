
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
            v-model.trim="searchContent.storeNames" 
            size="small" 
            class="search-input" 
            placeholder="点击选择门店"
            readonly>
              <el-button slot="append" icon="el-icon-search" @click="clickInputHandel"></el-button>
            </el-input>
        </el-form-item>
        <el-form-item label="商品名称/编码">
          <el-select
            v-model="searchValStr"
            filterable
            remote
            placeholder="商品名称/编码"
            size="small"
            class="search-input"
            clearable
            :remote-method="doFetchGoodsHandel"
            :loading="fetchLoading"
            @change="selectAsyncHandel">
            <el-option
              v-for="item in goodsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品条码">
          <el-input 
            v-model.trim="searchContent.goodsBarcode" 
            size="small" 
            class="search-input" 
            placeholder="商品条码"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="货号">
          <el-input 
            v-model.trim="searchContent.vendorGoodsNo" 
            size="small" 
            class="search-input" 
            placeholder="货号"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="合同编码">
          <el-input 
            v-model.trim="searchContent.contractNo" 
            size="small" 
            class="search-input" 
            placeholder="货号"
            clearable></el-input>
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
      <bl-pagination
        :showPagination="tableData.length > 0"
        :pageNum="pageNum"
        :total="total"
        @size-change="changeSize"
        @current-change="changeCurrent"/>
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
        storeNames: '',
        startDate: dateFormat('yyyy-MM-dd', Date.parse(new Date()) - 86400000),
        endDate: dateFormat('yyyy-MM-dd', Date.parse(new Date()) - 86400000),
        goodsNo: '',
        goodsBarcode: '',
        vendorGoodsNo: '',
        contractNo: '',
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
      // 远程搜索商品
      searchValStr: '',
      goodsOptions: [],
      fetchLoading: false,
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          minWidth: 50
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          ellipsis: true,
          minWidth: 120
        },
        {
          title: '商品编码',
          dataIndex: 'goodsNo',
          ellipsis: true,
          minWidth: 90
        },
        {
          title: '货号',
          dataIndex: 'vendorGoodsNo',
          ellipsis: true,
          minWidth: 90
        },
        {
          title: '商品条码',
          dataIndex: 'goodsBarcode',
          ellipsis: true,
          minWidth: 90
        },
        {
          title: '合同编码',
          dataIndex: 'contractNo',
          ellipsis: true,
          minWidth: 110
        },
        {
          title: '规格',
          dataIndex: 'spec',
          ellipsis: true,
          minWidth: 90
        },
        {
          title: '单位',
          dataIndex: 'saleUnit',
          ellipsis: true,
          minWidth: 90
        },
        {
          title: '销售量+赠品',
          dataIndex: 'saleQty',
          ellipsis: true,
          minWidth: 130,
          sortable: true
        },
        {
          title: '销售额',
          dataIndex: 'saleAmount',
          ellipsis: true,
          minWidth: 100,
          sortable: true
        },
        {
          title: '销售占比',
          dataIndex: 'saleRatio',
          ellipsis: true,
          minWidth: 100,
          sortable: true
        },
        {
          title: '参考毛利额',
          dataIndex: 'grossProfitAmount',
          ellipsis: true,
          minWidth: 120,
          sortable: true
        },
        {
          title: '操作',
          fixed: 'right',
          width: 120,
          operation: [
            {
              label: '按门店查看',
              icon: 'el-icon-view',
              clickFunc: this.goDetailPage
            }
          ]
        }
      ],
      exportConfig: {
        index: '序号',
        goodsName: '商品名称',
        goodsNo: '商品编码',
        vendorGoodsNo: '货号',
        goodsBarcode: '商品条码',
        contractNo: '合同编码',
        spec: '规格',
        saleUnit: '单位',
        saleQty: '销售量+赠品',
        saleAmount: '销售额',
        saleRatio: '销售占比',
        grossProfitAmount: '参考毛利额'
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
      this.$http.post(requestUrl.summaryByGoods, {...params}).then(res => {
        this.loading = false
        if(res.code === 0) {
          let resultVal = res.data ? res.data : {}
          let tableDataList = resultVal.pageVo && resultVal.pageVo.result && resultVal.pageVo.result.length ? resultVal.pageVo.result : []
          let tableDataListTemp = tableDataList.map((item, idx) => {
            item.index = idx + 1
            item.saleQty = item.saleQty ? fixedNum(item.saleQty, 3) : item.saleQty
            item.saleAmount = item.saleAmount ? fixedNum(item.saleAmount) : item.saleAmount
            item.storeSaleRatio = item.storeSaleRatio ? fixedNum(item.storeSaleRatio) : item.storeSaleRatio
            item.grossProfitAmount = item.grossProfitAmount ? fixedNum(item.grossProfitAmount) : item.grossProfitAmount
            return item
          })
          this.tableData = tableDataListTemp
          this.total = resultVal.pageVo ? resultVal.pageVo.total : 0
          this.totalSum = {
            grossProfitAmount: resultVal.totalGrossProfitAmount ? fixedNum(resultVal.totalGrossProfitAmount) : resultVal.totalGrossProfitAmount,
            saleAmount: resultVal.totalSaleAmount ? fixedNum(resultVal.totalSaleAmount) : resultVal.totalSaleAmount
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
      if(this.searchContent.startDate && this.searchContent.endDate && changeDateToTimestamp(this.searchContent.startDate) > changeDateToTimestamp(this.searchContent.endDate)) {
        this.$tip.message('结束时间不能早于开始时间！', 'warning')
        return
      }
      let params = {
        ...this.searchContent,
        startDate: `${this.searchContent.startDate} 00:00:00`,
        endDate: `${this.searchContent.endDate} 23:59:59`
      }
      this.exportLoading = true
      this.$http.post(requestUrl.summaryByGoods, {...params}).then(res => {
        this.exportLoading = false
        if(res.code === 0) {
          let resultVal = res.data ? res.data : {}
          let tableDataList = resultVal.pageVo && resultVal.pageVo.result && resultVal.pageVo.result.length ? resultVal.pageVo.result : []
          let tableDataListTemp = tableDataList.map((item, idx) => {
            item.index = idx + 1
            item.saleQty = item.saleQty ? fixedNum(item.saleQty, 3) : item.saleQty
            item.saleAmount = item.saleAmount ? fixedNum(item.saleAmount) : item.saleAmount
            item.storeSaleRatio = item.storeSaleRatio ? fixedNum(item.storeSaleRatio) : item.storeSaleRatio
            item.grossProfitAmount = item.grossProfitAmount ? fixedNum(item.grossProfitAmount) : item.grossProfitAmount
            return item
          })
          if(tableDataListTemp && tableDataListTemp.length > 0) {
            const tHeader = objectToArray(this.exportConfig, false)
            const filterVal = objectToArray(this.exportConfig, true)
            exportExcel.ExportJsonToExcel({
              header: tHeader,
              filterVal,
              data: tableDataListTemp,
              filename: `本来鲜销售数据_${this.searchContent.startDate}~${this.searchContent.endDate}`
            })
          }else {
            this.$tip.message('没有查询到要导出的数据！', 'warning')
          }
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.exportLoading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
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
      this.searchContent.storeNames = result.map(item => {
        return item.storeName
      }).join(',')
    },
    /**
     * @description: 远程搜索商品
     * @param {type} 
     * @return: 
     */
    doFetchGoodsHandel(e) {
      if(!e) return
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        let vendorNoListTemp = this.searchContent.vendorNoList && this.searchContent.vendorNoList.length > 0 ? this.searchContent.vendorNoList : this.vendors.map(item => {
          return item.vendorNo
        })
        let params = {
          pageNum: 1,
          pageSize: -1,
          vendorNoList: vendorNoListTemp,
          searchValue: e
        }
        this.fetchLoading = true
        this.goodsOptions = []
        this.$http.post(commonUrl.queryVendorGoodsPageList, {...params}).then(res=>{
          this.fetchLoading = false
          if(res.code === 0) {
            let goodsList = res.data && res.data.result && res.data.result.length ? res.data.result : []
            let goodsListTemp = goodsList.map(item => {
              let newItem = { 
                id: item.goodsId,
                value: item.goodsNo,
                label: item.goodsNoName
              }
              return newItem;
            })
            this.goodsOptions = goodsListTemp
            return
          }
          throw new Error(res.msg)
        }).catch(e=>{
          this.fetchLoading = false
          this.goodsOptions = []
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
      }, 500);
    },
    /**
     * @description: 点击搜索结果
     * @param {type} 
     * @return {type} 
     */
    selectAsyncHandel(val) {
      this.searchContent.goodsNo = val
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
    },
    /**
     * @description: 按门店查看
     * @param {*} row 列数据
     */
    goDetailPage(row) {
      this.$storage.set('searchInfo', {...this.searchContent, checkedStoreList: this.checkedStoreList})
      this.$router.push(`/sale_search/detail/${row.goodsNo}`)
    }
  }
}
</script>