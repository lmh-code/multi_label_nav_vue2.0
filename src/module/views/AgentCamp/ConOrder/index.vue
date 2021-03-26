<style scoped>
.pt4 {
  padding-top: 4px !important;
}
</style>
<template>
  <div>
    <div class="search-form-wraper">
      <el-form :model="searchContent" label-position="top">
        <el-form-item label="供应商">
          <el-select 
            class="search-input" 
            v-model="searchContent.listVendor" 
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
        <el-form-item label="订单编号">
          <el-input 
            v-model.trim="searchContent.paperNo" 
            size="small" 
            class="search-input" 
            placeholder="请输入订单编号"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select 
            class="search-input" 
            v-model="searchContent.tag" 
            placeholder="状态" 
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
        <el-form-item label="单据开始时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.startCreatetime" 
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
            v-model="searchContent.endCreatetime" 
            type="date" 
            placeholder="单据结束时间"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="期望到货开始时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.startExpectDatetime" 
            type="date" 
            placeholder="自提开始时间"
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
    <choose-store 
      ref="chooseStore"
      @confirm="confirmHandel"/>
  </div>
</template>
<script>
  import vendorsMixin from '@/module/mixin/getVendors'
  import researchMixin from '@/module/mixin/research'
  import requestUrl from '@/module/api/buyAndSale'
  import {dateFormat, objectToArray, changeDateToTimestamp} from '@/utils/utils'
  import exportExcel from '@/utils/exportExcel'
  import ChooseStore from '@/module/component/SearchItem/ChooseStore'
  import constants from '../../BuyAndSale/Order/constants'
  export default {
    mixins: [vendorsMixin, researchMixin],
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
            title: '订单编号',
            dataIndex: 'paperNo',
            minWidth: 160
          },
          {
            title: '供应商',
            dataIndex: 'vendorName',
            minWidth: 140
          },
          {
            title: '城市',
            dataIndex: 'cityName',
            minWidth: 80
          },
          {
            title: '仓库',
            dataIndex: 'storeName',
            minWidth: 140
          },
          {
            title: '联系人',
            dataIndex: 'createUserName',
            minWidth: 100
          },
          {
            title: '单据时间',
            dataIndex: 'createTime',
            minWidth: 170
          },
          {
            title: '期望到货时间',
            dataIndex: 'expectDate',
            minWidth: 170
          },
          {
            title: '状态',
            dataIndex: 'tagName',
            minWidth: 80
          },
          {
            title: '订单金额',
            dataIndex: 'totalAmount',
            minWidth: 80
          },
          {
            title: '订货数量',
            dataIndex: 'totalQty',
            minWidth: 80
          },
          {
            title: '订单商品数',
            dataIndex: 'totalGoodsQty',
            minWidth: 90
          },
          {
            title: '收货金额',
            dataIndex: 'totalReceiveAmount',
            minWidth: 80
          },
          {
            title: '收货数量',
            dataIndex: 'totalReceiveQty',
            minWidth: 80
          },
          {
            title: '收货商品数',
            dataIndex: 'totalReceiveGoodsQty',
            minWidth: 90
          },
          {
            title: '备注',
            dataIndex: 'remark',
            minWidth: 140,
            ellipsis: true
          },
          {
            title: '操作',
            fixed: 'right',
            width: 100,
            operation: [
              {
                label: '详情',
                icon: 'el-icon-view',
                clickFunc: this.goDetailPage
              }
            ]
          }
        ],
        searchContent: {
          listVendor: [], // 供应商
          paperNo: '', // 订单编码
          startCreatetime: dateFormat('yyyy-MM-dd', Date.parse(new Date()) - 7 * 86400000), 
          endCreatetime: dateFormat('yyyy-MM-dd', Date.parse(new Date())),
          startExpectDatetime: '', 
          status: -1,
          storeNames: "",
          tag: "",
          selectReceive: 1 // 表示查看收货信息，写死
        },
        checkedList: [],
        statusOptions: constants.statusOptions,
        exportConfig: constants.exportConfig
      }
    },
    components: {
      ChooseStore
    },
    mounted() {
      this.doSearchHandle(true)
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
      selectionChangeHandel({selection}) {
        this.checkedList = [...selection]
      },
      doSearchHandle(firstPage) {
        this.checkedList = []
        if (firstPage === true) {
          this.pageNum = 1
        }
        if(!this.searchContent.startCreatetime || !this.searchContent.endCreatetime) {
          this.$tip.message('单据开始时间和结束时间不能为空', 'warning')
          return
        }else if(changeDateToTimestamp(this.searchContent.startCreatetime) > changeDateToTimestamp(this.searchContent.endCreatetime)) {
          this.$tip.message('单据结束时间不能早于开始时间', 'warning')
          return
        }
        let params = {
          ...this.searchContent,
          tradeModeId: 9, // 结算方式： 1 ：购销； 9: 代营
          startCreatetime: this.searchContent.startCreatetime ? `${this.searchContent.startCreatetime} 00:00:00` : '',
          endCreatetime: this.searchContent.endCreatetime ? `${this.searchContent.endCreatetime} 23:59:59` : '',
          startExpectDatetime: this.searchContent.startExpectDatetime ? `${this.searchContent.startExpectDatetime} 00:00:00` : ''
        }
        this.loading = true
        this.$http.post(requestUrl.orderList, {
          ...params,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then(res => {
          this.loading = false
          if (res.code === 0) {
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
          filename: '订单汇总'
        })
      },
      goDetailPage(row) {
        this.$router.push(`/con_order/detail/003/${row.paperNo}/${row.storeNo}`)
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
        this.searchContent.listStoreNo = result.map(item => {
          return item.storeNo
        })
        this.searchContent.storeNames = result.map(item => {
          return item.storeName
        }).join(',')
      }
    }
  }
</script>