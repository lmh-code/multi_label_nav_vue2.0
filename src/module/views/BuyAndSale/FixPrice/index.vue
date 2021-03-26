<template>
  <div class="search-form-wraper">
    <el-form :model="searchContent" label-position="top">
      <el-form-item label="区域">
        <el-select
          @change="FormItemChange"
          class="search-input" 
          v-model="searchContent.region" 
          placeholder="选择区域" 
          collapse-tags
          clearable
          size="small">
          <el-option 
            v-for="item in regionOptions" 
            :key="item.storeGroupNo" 
            :label="item.storeGroupName" 
            :value="item.storeGroupNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
      <el-select 
        @change="FormItemChange"
        class="search-input" 
        v-model="searchContent.type" 
        placeholder="选择类型" 
        clearable
        size="small">
        <el-option 
          v-for="item in typeOptions" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value"
          >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="定价单号">
        <el-input 
          @change="FormItemChange"
          v-model.trim="searchContent.confirmPaperNo" 
          size="small" 
          class="search-input" 
          clearable
          placeholder="定价单号">
        </el-input>
      </el-form-item>
      <el-form-item label="商品编码">
        <el-input 
          @change="FormItemChange"
          v-model.trim="searchContent.goodsNo" 
          size="small" 
          class="search-input" 
          placeholder="请输入商品"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="报价单号">
        <el-input 
          @change="FormItemChange"
          v-model.trim="searchContent.paperNo" 
          size="small" 
          class="search-input" 
          clearable
          placeholder="报价单号">
        </el-input>
      </el-form-item>
      <el-form-item label="供应商" v-if="isAdvanced">
        <el-select 
          @change="FormItemChange"
          class="search-input" 
          v-model="searchContent.supplier" 
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
      <el-form-item label="制单起始日期" v-if="isAdvanced">
        <el-date-picker 
          @change="FormItemChange"
          clearable
          class="search-input" 
          v-model="searchContent.validDateStartTime" 
          type="date" 
          placeholder="制单起始日期"
          format="yyyy-MM-dd" 
          value-format="yyyy-MM-dd" 
          size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="制单终止日期" v-if="isAdvanced">
        <el-date-picker 
          @change="FormItemChange"
          clearable
          class="search-input" 
          v-model="searchContent.validDateEndTime" 
          type="date" 
          placeholder="制单终止日期"
          format="yyyy-MM-dd" 
          value-format="yyyy-MM-dd" 
          size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSearchHandle" size="mini">搜索</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button @click="doResetHandle" size="mini">重置</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="taggleAdvanced" type='' size="mini">{{isAdvanced ? '收起高级查询' : '高级查询'}}</el-button>
      </el-form-item> 
    </el-form>
    <div class="table-wraper">
      <bl-table
        :loading="loading"
        :border="false"
        :dataSource="tableData"
        :columns="columns"/>
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
  import commonUrl from '@/module/api/common'
  import priceMgtUrl from '@/module/api/buyAndSale'
  import vendorsMixin from '@/module/mixin/getVendors'
  // import constants from './constants'
  import localStorage from '@/utils/localStorage'
  export default {
    // name: 'quoteMgt',
    mixins: [vendorsMixin],
    data() {
      return {
        loading: false,
        initData: {
          confirmPaperNo: '',
          region: '',
          type: '',
          goodsNo: '',
          paperNo: '',
          supplier: '',
          validDateStartTime: '',
          validDateEndTime: ''
        },
        searchContent: {},
        regionOptions: [],
        categoryList: [],
        paperNo: '',
        supplier: '',
        // 商品名称或编码
        productInfo: '',
        searchMore: false,
        // 高级查询项
        typeOptions: [
          {
            label: '全部类型',
            value: ''
          },
          {
            label: '调价',
            value: 3
          },
          {
            label: '促销',
            value: 2
          }
        ],
      startTime: '',
      endTime: '',
      checkedList: [],
      selectedRowKeys: [],
      columns: [
        {
          title: '定价单号',
          dataIndex: 'confirmPaperNo',
          minWidth: 120,
          ellipsis: true
        },
        {
          title: '类型',
          dataIndex: 'typeName',
          minWidth: 90,
          ellipsis: true
        },
        {
          title: '区域',
          dataIndex: 'storeGroupName',
          minWidth: 90,
          ellipsis: true
        },
        {
          title: '生效日期',
          dataIndex: 'validTimeRange',
          minWidth: 110,
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'stateName',
          minWidth: 90,
          ellipsis: true
        },
        {
          title: '报价单号',
          dataIndex: 'paperNo',
          minWidth: 90,
          ellipsis: true
        },
        {
          title: '制单时间',
          dataIndex: 'createTime',
          minWidth: 120,
          ellipsis: true
        },
        {
          title: '制单人',
          dataIndex: 'createUserName',
          minWidth: 100,
          ellipsis: true
        },
        {
          title: '审核时间',
          dataIndex: 'confirmTime',
          minWidth: 120,
          ellipsis: true
        },
        {
          title: '审核人',
          dataIndex: 'confirmUserName',
          minWidth: 100,
          ellipsis: true
        },
        {
          title: '操作',
          fixed: 'right',
          minWidth: 80,
          operation: [
            {
              label: '查看',
              icon: 'el-icon-view',
              clickFunc: this.goDetailPage
            },
          ]
        }
      ],
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      isAdvanced: false,
      }
    },
    created() {
      this._getAreas()
      this.doSearchHandle()
    },
    // mounted() {
    //   setTimeout(() => {
    //     this.$set(this.searchContent, 'vendorNo', (this.vendors && this.vendors.length) ? this.vendors[0].vendorNo : '')
    //   }, 2000)
    // },
    methods: {
      FormItemChange() {
        this.pageNum = 1
      },

      taggleAdvanced() {
        this.isAdvanced = !this.isAdvanced
      },

      doSearchHandle() {
        if(this.searchContent.validDateStartTime && this.searchContent.validDateEndTime && (this.searchContent.validDateStartTime > this.searchContent.validDateEndTime) ) {
          this.$tip.message('结束时间不可早于开始时间', 'warning')
          return
        }
        let param = {
          storeGroupNo: this.searchContent.region,
          typeNo: this.searchContent.type,
          confirmPaperNo: this.searchContent.confirmPaperNo,
          paperNo: this.searchContent.paperNo,
          vendorNo: this.searchContent.supplier,
          createTimeStart: this.searchContent.validDateStartTime ? `${this.searchContent.validDateStartTime}  00:00:00` : null,
          createTimeEnd: this.searchContent.validDateEndTime ? `${this.searchContent.validDateEndTime} 23:59:59` : null,
          goodsNo: this.searchContent.goodsNo,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.loading = true
        this.$http.post(priceMgtUrl.fixList, {...param}).then(res => {
          this.loading = false
          if(res && res.code === 0) {
            let tableData = res.data && res.data.result && res.data.result.length && res.data.result.map(t => {
              t.validTimeRange = `${t.startTime} 至 ${t.endTime}`;  
              return t;
            })
            this.tableData = tableData
            this.total = res.data && res.data.total
          } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.loading = false
          this.$tip.notify(err.message, 'error')
        })
      },

      doResetHandle() {
        this.searchContent = {
          ...this.initData
        }
        this.pageNum = 1
        this.pageSize = 20
        this.total = 0
      },

      _getAreas() {
        this.$http.get(commonUrl.areaStoreGroupList).then(res => {
          if(res && res.code === 0) {
            this.regionOptions = res.data || []
          } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
           this.$tip.notify(err.message, 'error')
        })
      },

      goDetailPage(record) {
        this.$router.push(`/fixprice/${record.confirmPaperNo}`)
      },

      changeSize(value) {
        this.pageSize = value
        this.doSearchHandle()
      },

      changeCurrent(value) {
        this.pageNum = value
        this.doSearchHandle()
      },
    },
  }
</script>