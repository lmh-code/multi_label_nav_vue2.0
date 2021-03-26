<template>
  <div>
    <div class="handel-wraper">
      <el-row type="flex" align="bottom" :gutter='10'>
        <el-col :span="6">商品：{{orderMsg.goodsName || '-'}}</el-col>
        <el-col :span="6">编码：{{orderMsg.goodsNo || '-'}}</el-col>
        <el-col :span="6">条码：{{orderMsg.goodsBarcode || '-'}}</el-col>
        <el-col :span="6">货号：{{orderMsg.vendorGoodsNo || '-'}}</el-col>
      </el-row>
      <el-row type="flex" align="bottom" :gutter='10'>
        <el-col :span="6">合同编码：{{orderMsg.contractNo || '-'}}</el-col>
        <el-col :span="6">规格：{{orderMsg.spec || '-'}}</el-col>
        <el-col :span="6">单位：{{orderMsg.saleUnit || '-'}}</el-col>
        <el-col :span="6">总销售量：{{orderMsg.saleQty || '-'}}</el-col>
      </el-row>
      <el-row type="flex" align="bottom" :gutter='10'>
        <el-col :span="6">总销售额：￥{{orderMsg.saleAmount}}</el-col>
        <el-col :span="6">毛利额：￥{{orderMsg.grossProfitAmount}}</el-col>
      </el-row>
    </div>
    <div class="search-form-wraper">
      <el-form :model="searchContent" label-position="top">
        <el-form-item label="起始时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.startDate" 
            type="date" 
            placeholder="起始时间"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.endDate" 
            type="date" 
            placeholder="结束时间"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
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
          <el-button type="primary" @click="doSearchHandle" size="mini">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="exportLoading" @click="doExortHandel" size="mini" :loading="exportLoading">导出</el-button>
        </el-form-item>

        <div style="float: right; margin-top: 32px;">
          <el-popover
            placement="bottom"
            width="360"
            trigger="hover"
            title="表格字段说明">
            <div>
              <p>平均售价：联营商品的销售额/联营商品的销售量；</p>
              <p>平均进价：购销商品的进货额/购销商品的销售量；</p>
              <p>销售额：仅显示联营类型的商品销售额；</p>
              <p>平均费率：销售额*费率（扣点）之和/销售额，以每阶段的实际扣点计算；</p>
              <p>参考毛利额：联营商品的销售额减去对应的扣点金额（销售额*费率），以每阶段的实际扣点计算；</p>
            </div>
            <span class="el-icon-question" slot="reference">帮助</span>
          </el-popover>
        </div>
      </el-form>
    </div>
    <div class="table-wraper">
      <bl-table
        :loading="loading"
        :border="false"
        :dataSource="tableData"
        :columns="columns" />
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
import {objectToArray, changeDateToTimestamp, fixedNum} from '@/utils/utils'
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
      goodsNo: '',
      loading: false,
      exportLoading: false,
      total: 0,
      tableData: [],
      searchContent: {
        vendorNoList: [],
        storeNoList: [],
        storeNames: '',
        startDate: '',
        endDate: '',
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
      // 根据供应商选择门店
      checkedStoreList: [],
      vendorNos: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          minWidth: 60
        },
        {
          title: '门店名称',
          ellipsis: true,
          dataIndex: 'storeName',
          minWidth: 100
        },
        {
          title: '所在区域',
          dataIndex: 'areaStr',
          ellipsis: true,
          minWidth: 130
        },
        {
          title: '平均销售价',
          dataIndex: 'storeSalePrice',
          minWidth: 130,
          sortable: true
        },
        {
          title: '销售量+赠品',
          dataIndex: 'storeSaleQty',
          minWidth: 130,
          sortable: true
        },
        {
          title: '销售额',
          dataIndex: 'storeSaleAmount',
          minWidth: 90,
          sortable: true
        },
        {
          title: '销售占比',
          dataIndex: 'storeSaleRatio',
          minWidth: 100,
          sortable: true
        },
        {
          title: '平均进价',
          dataIndex: 'stockPrice',
          minWidth: 120,
          sortable: true
        },
        {
          title: '平均费率',
          dataIndex: 'ratio',
          minWidth: 110,
          sortable: true
        },
        {
          title: '参考毛利额',
          dataIndex: 'cityProfitAmount',
          minWidth: 130,
          sortable: true
        }
      ],
      exportConfig: {
        index: '序号',
        storeName: '门店名称',
        areaStr: '所在区域',
        storeSalePrice: '平均销售价',
        storeSaleQty: '销售量+赠品',
        storeSaleAmount: '销售额',
        storeSaleRatio: '销售占比',
        stockPrice: '平均进价',
        ratio: '平均费率',
        cityProfitAmount: '参考毛利额'
      },
      orderMsg: {} // 订单基本信息
    }
  },
  created() {
    this.goodsNo = this.$route.params.goodsNo
    let searchContent = this.$storage.get('searchInfo')
    if(searchContent) {
      this.checkedStoreList = searchContent.checkedStoreList || []
      this.searchContent = {...searchContent} 
    }
  },
  mounted() {
    this.doSearchHandle(true)
  },
  methods: {
    doSearchHandle(firstSearch) {
      if(this.searchContent.startDate && this.searchContent.endDate && changeDateToTimestamp(this.searchContent.startDate) > changeDateToTimestamp(this.searchContent.endDate)) {
        this.$tip.message('结束时间不能早于开始时间！', 'warning')
        return
      }
      this.loading = true
      let params = {
        ...this.searchContent,
        goodsNo: this.goodsNo,
        startDate: `${this.searchContent.startDate} 00:00:00`,
        endDate: `${this.searchContent.endDate} 23:59:59`
      }
      this.$http.post(requestUrl.summaryGoodsEachStore, {...params}).then(res => {
        this.loading = false
        if(res.code === 0) {
          if(res.data) {
            let citySaleListTemp = res.data.citySaleList && res.data.citySaleList.length ? res.data.citySaleList.map((item, idx) => {
              item.index = idx + 1
              if(item.provinceName && item.cityName) {
                item.areaStr = `${item.provinceName}-${item.cityName}`
              }else if(item.provinceName) {
                item.areaStr = `${item.provinceName}`
              }else if(item.cityName) {
                item.areaStr = `${item.cityName}`
              }else {
                item.areaStr = `-`
              }
              item.storeSalePrice = item.storeSalePrice ? fixedNum(item.storeSalePrice) : item.storeSalePrice
              item.storeSaleQty = item.storeSaleQty ? fixedNum(item.storeSaleQty, 3) : item.storeSaleQty
              item.storeSaleAmount = item.storeSaleAmount ? fixedNum(item.storeSaleAmount) : item.storeSaleAmount
              item.storeSaleRatio = item.storeSaleRatio ? fixedNum(item.storeSaleRatio) : item.storeSaleRatio
              item.stockPrice = item.stockPrice ? fixedNum(item.stockPrice) : item.stockPrice
              item.ratio = item.ratio ? fixedNum(item.ratio) : item.ratio
              item.cityProfitAmount = item.cityProfitAmount ? fixedNum(item.cityProfitAmount) : item.cityProfitAmount
              return item
            }) : []
            this.tableData = citySaleListTemp
            this.orderMsg = {...res.data}
          }else {
            this.tableData = []
          }
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    doExortHandel() {
      this.exportLoading = true
      let goodsName = this.orderMsg.goodsName
      const {startDate, endDate} = this.searchContent
      if(this.tableData.length > 0) {
        const tHeader = objectToArray(this.exportConfig, false)
        const filterVal = objectToArray(this.exportConfig, true)
        exportExcel.ExportJsonToExcel({
          header: tHeader,
          filterVal,
          data: this.tableData,
          filename: `${goodsName}销售数据_${startDate}~${endDate}`
        })
        this.exportLoading = false
      }else {
        this.$tip.message('没有查询到可导出数据！', 'warning')
        this.exportLoading = false
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
    }
  }
}
</script>