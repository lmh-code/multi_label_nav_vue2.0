<template>
  <div class="handel-search-wraper"> 
    <div class="search-form-wraper">
      <el-form :model="searchContent" label-position="top">
        <el-form-item label="门店/仓库">
          <el-input class="search-input" size="small" placeholder="门店/仓库" v-model.trim="searchContent.storeNames" readonly clearable>
            <el-button slot="append" icon="el-icon-search" @click="storeSelectHandel"></el-button>
          </el-input> 
        </el-form-item>
        <el-form-item label="供应商">
          <el-select
            @change="vendorSelectChange"
            class="search-input" 
            v-model="vendorNo" 
            placeholder="选择供应商" 
            collapse-tags
            clearable
            size="small">
            <el-option 
              v-for="item in vendors" 
              :key="item.vendorNo" 
              :label="item.vendorName" 
              :value="item.vendorNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退货单号">
          <el-input 
            v-model.trim="searchContent.paperNo" 
            size="small" 
            class="search-input" 
            placeholder="请输入收货单号"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="商品">
          <el-select 
            class="search-input"
            filterable 
            v-model="searchContent.listGoodsNo" 
            placeholder="请选择商品" 
            collapse-tags
            clearable
            size="small">
            <el-option 
              v-for="item in productList"
              :key="item.goodsNo" 
              :label="item.label" 
              :value="item.goodsNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间类型">
          <el-select 
            class="search-input" 
            v-model="timeType" 
            placeholder="时间类型" 
            collapse-tags
            clearable
            size="small">
            <el-option 
              v-for="item in timeOptions"
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 审核开始日期 -->
        <el-form-item label="开始日期" v-if="timeType === 0">
          <el-date-picker 
            clearable
            class="search-input" 
            v-model="startDatetime" 
            type="date" 
            placeholder="开始日期"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <!-- 审核结束日期 -->
        <el-form-item label="结束日期" v-if="timeType === 0">
          <el-date-picker 
            clearable
            class="search-input" 
            v-model="endDatetime" 
            type="date" 
            placeholder="结束日期"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <!-- 制单开始日期 -->
        <el-form-item label="开始日期" v-if="timeType === 1">
          <el-date-picker 
            clearable
            class="search-input" 
            v-model="startCreateDatetime" 
            type="date" 
            placeholder="开始日期"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <!-- 制单结束日期 -->
        <el-form-item label="结束日期" v-if="timeType === 1">
          <el-date-picker 
            clearable
            class="search-input" 
            v-model="endCreateDatetime" 
            type="date" 
            placeholder="结束日期"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单据状态">
          <el-select 
            class="search-input" 
            v-model="searchContent.tag" 
            placeholder="选择单据状态" 
            collapse-tags
            clearable
            size="small">
            <el-option 
              v-for="item in paperStatusOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据类型">
          <el-select 
            class="search-input" 
            v-model="searchContent.orderType" 
            placeholder="单据类型" 
            collapse-tags
            clearable
            size="small">
            <el-option 
              v-for="item in paperTypeOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="对账状态">
          <el-select 
            class="search-input" 
            v-model="searchContent.reconciliationFlag" 
            placeholder="对账状态" 
            collapse-tags
            clearable
            size="small">
            <el-option 
              v-for="item in checkingStatusOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="结算方式">
          <el-select 
            class="search-input" 
            v-model="searchContent.tradeModeId" 
            placeholder="结算方式" 
            collapse-tags
            clearable
            size="small">
            <el-option 
              v-for="item in checkingTypeOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearchHandle(true)" size="mini" :loading="loading">搜索</el-button>
        </el-form-item>
        <el-form-item v-if="userPermission && userPermission.includes('导出')">
          <el-button :disabled="checkedList.length === 0" @click="doExortHandel" size="mini" :loading="exportLoading">导出</el-button>
        </el-form-item>
      </el-form>
      <choose-store ref="chooseStore" @confirm="confirmHandle"></choose-store>
      <div class="table-wraper">
        <bl-table
          :loading="loading"
          :border="false"
          :selection="true"
          :dataSource="tableData"
          :columns="columns"
          :getSummaries="getSummaries"
          :showSummary="tableData && tableData.length ? true : false"
          @selection-change="selectionChangeHandel"/>
        <bl-pagination
          :showPagination="tableData.length > 0"
          :pageNum="pageNum"
          :total="total"
          @size-change="changeSize"
          @current-change="changeCurrent"/>
      </div>
    </div>
  </div>
</template>
<script>
  import warehouseUrl from '@/module/api/warehouse'
  import commonUrl from '@/module/api/common'
  import constants from './constants'
  import localStorage from '@/utils/localStorage'
  import ChooseStore from '../ChooseStore'
  import vendorsMixin from '@/module/mixin/getVendors'
  import {dateFormat, objectToArray} from '@/utils/utils'
  import exportExcel from '@/utils/exportExcel'
  export default {
    mixins: [vendorsMixin],
    components: {
      'choose-store': ChooseStore
    },
    data() {
      return {
        loading: false,
        userPermission: [],
        moduleId: '/refundMgt',
        timeOptions: constants.timeOptions,
        paperStatusOptions: constants.paperStatusOptions,
        paperTypeOptions: constants.paperTypeOptions,
        checkingStatusOptions: constants.checkingStatusOptions,
        checkingTypeOptions: constants.checkingTypeOptions,
        timeType: 0,
        startDatetime: dateFormat('yyyy-MM-dd', Date.parse(new Date()) - 7 * 86400000), 
        endDatetime: dateFormat('yyyy-MM-dd', Date.parse(new Date())),
        startCreateDatetime: dateFormat('yyyy-MM-dd', Date.parse(new Date()) - 7 * 86400000), 
        endCreateDatetime: dateFormat('yyyy-MM-dd', Date.parse(new Date())),
        vendorNo: "",
        searchContent: {
          storeNames: '',
          listGoodsNo: '',
          listVendor: []
        },
        productList: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        checkedList: [],
        columns: [
          {
            title: '退货单号',
            dataIndex: 'paperNo',
            minWidth: 160,
            ellipsis: true
          },
          {
            title: '门店/仓库',
            dataIndex: 'storeName',
            minWidth: 120,
            ellipsis: true
          },
          {
            title: '供应商',
            dataIndex: 'vendorName',
            minWidth: 100,
            ellipsis: true
          },
          {
            title: '退货数量',
            dataIndex: 'totalQty',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '含税金额',
            dataIndex: 'totalAmount',
            minWidth: 130,
            ellipsis: true
          },
          {
            title: '单据状态',
            dataIndex: 'statusName',
            minWidth: 100,
            ellipsis: true
          },
          // {
          //   title: '对账状态',
          //   dataIndex: 'reconciliationFlagName',
          //   minWidth: 100,
          //   ellipsis: true
          // },
          {
            title: '单据类型',
            dataIndex: 'typeName',
            minWidth: 100,
            ellipsis: true
          },
          {
            title: '结算方式',
            dataIndex: 'tradeModeName',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '制单时间',
            dataIndex: 'createTime',
            minWidth: 100,
            ellipsis: true
          },
          {
            title: '审核时间',
            dataIndex: 'authDatetime',
            minWidth: 100,
            ellipsis: true
          },
          {
            fixed: 'right',
            width: 80,
            operation: [
              {
                label: '查看',
                icon: 'el-icon-view',
                clickFunc: this.goDetailPage
              },
            ]
          }
        ],
        exportLoading: false,
        checkedStoreList: [],
        regionOptions: [],
        exportConfig: constants.exportConfig,
        sumAmount: 0
      }
    },
    created() {
      this.getAreas()
      this.doSearchHandle(true)
      this.userPermission = this.$store.state.common.userPermissionMap[this.moduleId]
    },

    methods: {
      vendorSelectChange(vendorNo) {
        this.pageNum = 1
        this.searchContent.listVendor = vendorNo ? [vendorNo] : []
        this.getProductByVendor(vendorNo)
      },

      storeSelectHandel() {
        let param = {
          regionOptions: this.regionOptions,
          vendorNos: this.vendors,
          defaultChecked: this.checkedStoreList
        }
        this.$refs.chooseStore.setDefault(param)
      },

      doSearchHandle(firstPage) {
        if(firstPage) this.pageNum = 1
        let param = {...this.searchContent, pageNum: this.pageNum, pageSize: this.pageSize, }
        if(this.timeType === 0) {
          param. startConfirmtime = this.startDatetime ? `${this.startDatetime} 00:00:00` : ''
          param.endConfirmtime = this.endDatetime ? `${this.endDatetime} 23:59:59` : ''
        } else if(this.timeType === 1) {
          param.startCreateTime = this.startCreateDatetime ? `${this.startCreateDatetime} 00:00:00` : ''
          param.endCreateTime = this.endCreateDatetime ? `${this.endCreateDatetime} 23:59:59` : ''
        }
        this.loading = true
        this.$http.post(warehouseUrl.refundList, param).then(res => {
          this.loading = false
          if(res && res.code === 0) {
            this.tableData = (res.data && res.data.result) ? res.data.result : []
            this.total = res.data && res.data.total
            this.sumAmount = (res && res.data && res.data.sumAmount) ? res.data.sumAmount : 0
          } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.loading = false
          this.$tip.notify(err.message, 'error')
        })
      },

      getProductByVendor(vendorNo) {
        let param = {
          vendorNo: vendorNo
        }
         if(!vendorNo) {
          this.productList = []
          this.searchContent.listGoodsNo = ''
          return
        }
        this.$http.post(warehouseUrl.queryVendorGoodsList, param).then(res => {
          if(res && res.code === 0) {
            let productList = res.data && res.data.result || []
            productList = productList.map(t => {
              t.label = `${t.goodsNo}-${t.name}`
              return t
            })
            this.productList =  productList
          } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.$tip.notify(err.message, 'error')
        })
      },

      selectionChangeHandel({selection}) {
        this.checkedList = [...selection]
      },

      doExortHandel() {
        if(this.checkedList && this.checkedList.length) {
          let paperNos = this.checkedList.map(item => {
            return item.paperNo
          }).join(",")
          this.exportLoading = true
          const tHeader = objectToArray(this.exportConfig, false)
          const filterVal = objectToArray(this.exportConfig, true)
          exportExcel.ExportJsonToExcel({
            header: tHeader,
            filterVal,
            data: this.checkedList,
            filename: `仓库退货单${dateFormat('yyyy-MM-dd', new Date())}`
          })
          this.exportLoading = false
        }else {
          this.$tip.notify('请选择可导出数据', 'warning')
        }
      },

      goDetailPage(row) {
        this.$router.push(`/refundMgt/${row.paperNo}/${row.storeNo}`)
      },

      getAreas() {
        this.$http.get(commonUrl.areaStoreGroupList).then(res => {
          if(res && res.code === 0) {
            this.regionOptions = res.data || []
          } else {
            console.log(res.msg, 'error')
          }
        }).catch(err => {
          console.log(err.message, 'error')
        })
      },

      getSummaries({ columns, data }) {
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (column.property === 'totalAmount') {
            // sums[index] = values.reduce((prev, curr) => {
            //   const value = Number(curr);
            //   if (!isNaN(value)) {
            //     return prev + curr;
            //   } else {
            //     return prev;
            //   }
            // }, 0);
            // sums[index] += ' 元';
            sums[index] = `${this.sumAmount} 元`
          }
          // else{
          //   sums[index] = '--'
          // }
        })

        return sums;
      },

      confirmHandle(result) {
        this.checkedStoreList = result
        this.searchContent.listStoreNo = result.map(item => {
          return item.storeNo
        })
        this.searchContent.storeNames = result.map(item => {
          return item.storeName
        }).join(',')
      },
      
      changeSize(value) {
        this.pageSize = value
        this.doSearchHandle()
      },

      changeCurrent(value) {
        this.pageNum = value
        this.doSearchHandle()
      },
    }
  }
</script>