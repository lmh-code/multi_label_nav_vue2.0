<template>
  <div>
    <div class="handel-wraper nopt" v-if="userPermission && userPermission.includes('新增')">
      <el-button type="primary" @click="addQuote" size="mini" icon="el-icon-plus" >新增报价单</el-button>
    </div>
    <div class="handel-search-wraper"> 
      <div class="search-form-wraper">
        <el-form :model="searchContent" label-position="top">
          <el-form-item label="区域">
            <el-select 
              class="search-input" 
              v-model="searchContent.storeGroupNo" 
              placeholder="选择区域" 
              collapse-tags
              size="small"
              clearable
              @change="areaChange">
              <el-option 
                v-for="item in regionOptions" 
                :key="item.storeGroupNo" 
                :label="item.storeGroupName" 
                :value="item.storeGroupNo">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select 
              class="search-input" 
              v-model="searchContent.goodsCategoryNo" 
              placeholder="选择分类" 
              collapse-tags
              clearable
              size="small">
              <el-option 
                v-for="item in categoryList" 
                :key="item.categoryNo" 
                :label="item.categoryName" 
                :value="item.categoryNo">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报价单号">
            <el-input 
              v-model.trim="searchContent.paperNo" 
              size="small" 
              class="search-input"
              clearable 
              placeholder="报价单号">
            </el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select 
              class="search-input" 
              v-model="searchContent.vendorNo" 
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
        <el-form-item label="商品编码">
            <el-input 
              v-model.trim="searchContent.goodsNo" 
              size="small" 
              class="search-input" 
              placeholder="请输入商品"
              clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" v-if="isAdvanced">
            <el-select 
              class="search-input" 
              v-model="searchContent.state" 
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
          <el-form-item label="单据类型" v-if="isAdvanced">
            <el-select 
              class="search-input" 
              v-model="searchContent.type" 
              placeholder="单据类型" 
              filterable
              clearable
              size="small">
              <el-option 
                v-for="item in typeOptions" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="制单起始日期" v-if="isAdvanced">
            <el-date-picker 
              clearable
              class="search-input" 
              v-model="searchContent.createTimeStart" 
              type="date" 
              placeholder="制单起始日期"
              format="yyyy-MM-dd" 
              value-format="yyyy-MM-dd" 
              size="small">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="制单终止日期" v-if="isAdvanced">
            <el-date-picker 
              clearable
              class="search-input" 
              v-model="searchContent.createTimeEnd" 
              type="date" 
              placeholder="制单终止日期"
              format="yyyy-MM-dd" 
              value-format="yyyy-MM-dd" 
              size="small">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSearchHandle(true)" size="mini">搜索</el-button>
          </el-form-item>
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
    </div>
    
  </div>
</template>
<script>
  import commonUrl from '@/module/api/common'
  import priceMgtUrl from '@/module/api/buyAndSale'
  import constants from './constants'
  // import localStorage from '@/utils/localStorage'
  import researchMixin from '@/module/mixin/research'
  export default {
    mixins: [researchMixin],
    data() {
      return {
        loading: false,
        userPermission: [],
        moduleId: '/quote_mgt',
        isAdvanced: false,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        regionOptions: [],
        categoryList: [],
        searchContent: {
          storeGroupNo: '',
          goodsCategoryNo: '',
          goodsNo: '',
          vendorNo: '',
          paperNo:'',
          state: '',
          type: '',
          createTimeStart: '',
          createTimeEnd: '',
        },
        initData: {
          storeGroupNo: '',
          goodsCategoryNo: '',
          goodsNo: '',
          vendorNo: '',
          paperNo:'',
          state: '',
          type: '',
          createTimeStart: '',
          createTimeEnd: '',
        },
        vendors: [],
        statusOptions: constants.statusOptions,
        typeOptions: constants.typeOptions,
        tableData: [],
        columns: [
          {
            title: '报价单号',
            dataIndex: 'paperNo',
            minWidth: 120,
            ellipsis: true
          },
          {
            title: '区域',
            dataIndex: 'storeGroupName',
            minWidth: 60,
            ellipsis: true
          },
          {
            title: '商品分类',
            dataIndex: 'goodsCategoryName',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '类型',
            dataIndex: 'typeName',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '供应商',
            dataIndex: 'vendorName',
            minWidth: 140,
            ellipsis: true
          },
          {
            title: '报价周期',
            dataIndex: 'validTimeRange',
            minWidth: 140,
            ellipsis: true
          },
          {
            title: '状态',
            dataIndex: 'stateName',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '报价商品',
            dataIndex: 'quotationGoods',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '制单时间',
            dataIndex: 'createTime',
            minWidth: 110,
            ellipsis: true
          },
          {
            title: '制单人',
            dataIndex: 'createUserName',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '提交时间',
            dataIndex: 'confirmTime',
            minWidth: 110,
            ellipsis: true
          },
          {
            title: '提交人',
            dataIndex: 'confirmUserName',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '操作',
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
      }
    },
    created() {
      this._getAreas()
      this._getCategoryList()
      this.doSearchHandle(true)
      this.userPermission = this.$store.state.common.userPermissionMap[this.moduleId]
    },
    methods: {
      areaChange() {
        this.vendors = []
        this._getVendors()
      },
      _getVendors() {
        this.$http.post(priceMgtUrl.getQuotableVendors, {storeGroupNo: this.searchContent.storeGroupNo}).then(res => {
          if(res && res.code === 0) {
            this.vendors = (res.data || []).map(t => {
              t.label = t.vendorName
              t.value = t.vendorNo 
              return t
            })
          } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.$tip.notify(err.message, 'error')
        })
      },
      taggleAdvanced() {
        this.isAdvanced = !this.isAdvanced
      },
      doSearchHandle(firstPage) {
        if(firstPage) this.pageNum = 1
        if(this.searchContent.createTimeStart && this.searchContent.createTimeEnd && (this.searchContent.createTimeStart > this.searchContent.createTimeEnd) ) {
          this.$tip.message('结束时间不可早于开始时间', 'warning')
          return
        }
        let param = {
          vendorNos: this.searchContent.vendorNo ? [this.searchContent.vendorNo] : null,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.searchContent,
          createTimeStart: this.searchContent.createTimeStart ? `${this.searchContent.createTimeStart} 00:00:00` : null,
          createTimeEnd: this.searchContent.createTimeEnd ? `${this.searchContent.createTimeEnd} 23:59:59` : null
        }
        this.loading = true
        this.$http.post(priceMgtUrl.getQuoteList, {...param}).then(res => {
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

      _getCategoryList() {
        this.$http.get(priceMgtUrl.categoryList, {parentId: 0}).then(res => {
          if(res && res.code === 0) {
            this.categoryList = res.data || []
          } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.$tip.notify(err.message, 'error')
        })
      },

      goDetailPage(record) {
        // let { vendorNo, startTime, endTime, paperNo, type, storeGroupNo, goodsCategory, typeName, vendorName, storeGroupName, goodsCategoryName } = record
        // let { regionOptions, categoryList, vendors, typeOptions } = this
        // let searchContent = { vendorNo, startTime, endTime, paperNo, type, storeGroupNo, goodsCategory, typeName, vendorName, storeGroupName, goodsCategoryName }
        // localStorage.set("searchContent", searchContent)
        this.$router.push(`/quote_mgt/${record.paperNo}`)
      },

      addQuote() {
        // localStorage.set('searchContent', this.searchContent)
        this.$router.push(`/quote_mgt/add`)
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