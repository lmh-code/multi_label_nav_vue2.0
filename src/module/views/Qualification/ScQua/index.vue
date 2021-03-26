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
            title: '有效期',
            ellipsis: true,
            dataIndex: 'validDateDesc',
            minWidth: 190
          },
          {
            title: '驳回原因',
            dataIndex: 'rejectInfo',
            ellipsis: true,
            minWidth: 100
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
            width: 150,
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
        },
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
        ]
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
        this.loading = true
        if (firstPage === true) {
          this.pageNum = 1
        }
        this.$http.post(requestUrl.qualificationList, {
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
              item.validDateDesc = item.validDateStart && item.validDateEnd ? `${item.validDateStart}至${item.validDateEnd}` : ''
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
      goDetailPage(row) {
        this.$router.push(`/sc_qua/detail/001/${row.id}/${row.qualificationModelId}/${row.supplierId}`)
      },
      goEditPage(row) {
        this.$router.push(`/sc_qua/edit/001/${row.id}/${row.qualificationModelId}/${row.supplierId}`)
      }
    }
  }
</script>