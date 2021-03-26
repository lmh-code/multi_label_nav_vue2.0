<template>
  <div>
    <div class="search-form-wraper">
      <el-form :model="searchContent" label-position="top">
        <el-form-item label="供应商">
          <el-select 
            class="search-input" 
            v-model="searchContent.supplierIds" 
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
        <el-form-item label="资质名称">
          <el-input 
            v-model.trim="searchContent.qualificationModelName" 
            size="small" 
            class="search-input" 
            placeholder="请输入资质名称"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select 
            class="search-input" 
            v-model="searchContent.status" 
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
        <el-form-item>
          <el-button type="primary" @click="doSearchHandle(true)" size="mini">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        :pageSizes="pageSizes"
        @size-change="changeSize"
        @current-change="changeCurrent"/>
    </div>
  </div>
</template>
<script>
  import vendorsMixin from '@/module/mixin/getVendors'
  import researchMixin from '@/module/mixin/research'
  import commonUrl from '@/module/api/common'
  import requestUrl from '@/module/api/qualification'
  import utilsConst from '@/utils/constant'
  export default {
    mixins: [vendorsMixin, researchMixin],
    data() {
      return {
        pageNum: 1,
        pageSize: 20,
        pageSizes: utilsConst.pageSizeStart20,
        loading: false,
        exportLoading: false,
        total: 0,
        tableData: [],
        columns: [
          {
            title: '供应商',
            dataIndex: 'supplierName',
            ellipsis: true,
            minWidth: 120
          },
          {
            title: '商品编码',
            dataIndex: 'goodsNo',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '条码',
            dataIndex: 'barcode',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '货号',
            dataIndex: 'vendorGoodsNo',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '商品名称',
            dataIndex: 'goodsName',
            ellipsis: true,
            minWidth: 120
          },
          {
            title: '资质名称',
            dataIndex: 'qualificationModelName',
            ellipsis: true,
            minWidth: 120
          },
          {
            title: '状态',
            dataIndex: 'statusVal',
            minWidth: 90
          },
          {
            title: '驳回原因',
            dataIndex: 'rejectInfo',
            ellipsis: true,
            minWidth: 110
          },
          {
            title: '上传时间',
            dataIndex: 'uploadTime',
            ellipsis: true,
            minWidth: 170
          },
          {
            title: '审核时间',
            dataIndex: 'checkTime',
            ellipsis: true,
            minWidth: 170
          },
          {
            title: '操作',
            fixed: 'right',
            minWidth: 150,
            operation: [
              {
                label: '查看',
                icon: 'el-icon-view',
                clickFunc: this.goDetailPage
              },
              {
                label: '上传',
                icon: 'el-icon-top',
                clickFunc: this.goEditPage,
                isShow: (row) => {
                  return row.status === 0 || row.status === 3 || row.status === 4 || row.status === 5
                }
              }
            ]
          }
        ],
        searchContent: {
          supplierIds: [],
          qualificationModelName: '',
          status: '',
          goodsNo: ''
        },
        searchValStr: '',
        statusOptions: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '待上传',
            value: 0
          },
          {
            label: '待审核',
            value: 1
          },
          {
            label: '审核通过',
            value: 2
          },
          {
            label: '已驳回',
            value: 3
          },
          {
            label: '已过期',
            value: 4
          },
          {
            label: '即将过期',
            value: 5
          },
          {
            label: '即将过期-更换中',
            value: 6
          }
        ],
        fetchLoading: false,
        goodsOptions: [],
        timeout: null
      }
    },
    created() {
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
      doSearchHandle(firstPage) {
        this.loading = true
        if (firstPage === true) {
          this.pageNum = 1
        }
        this.$http.post(requestUrl.supplierGoodsList, {
          ...this.searchContent,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then(res => {
          this.loading = false
          if (res.code === 0) {
            let tableDataList = res.data && res.data.result && res.data.result.length ? res.data.result : []
            tableDataList.forEach(item => {
              let statusValResult = this.statusOptions.filter(j => {
                return j.value === item.status
              })[0]
              item.statusVal = statusValResult ? statusValResult.label : '-'
            })
            this.tableData = tableDataList
            this.total = res.data && res.data.total ? res.data.total : 0
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.loading = false
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
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
          let vendorNoListTemp = this.searchContent.supplierIds && this.searchContent.supplierIds.length > 0 ? this.searchContent.supplierIds : this.vendors.map(item => {
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
      goDetailPage(row) {
        this.$router.push(`/goods_qua/detail/002/${row.id}/${row.qualificationModelId}/${row.supplierId}`)
      },
      goEditPage(row) {
        this.$router.push(`/goods_qua/edit/002/${row.id}/${row.qualificationModelId}/${row.supplierId}`)
      }
    }
  }
</script>