<template>
  <el-dialog 
    :close-on-click-modal = "false"
    :close-on-press-escape = "false"
    :show-close="false"
    :title="title" 
    :visible.sync="visible" 
    width='800px'>
    <div class="search-form-wraper c-g-sfw">
      <el-form 
        :model="searchContent" 
        label-position="top" 
        @submit.native.prevent>
        <el-form-item>
          <el-select 
            class="search-input" 
            v-model="searchContent.regionCode" 
            placeholder="选择区域" 
            collapse-tags
            size="small">
            <el-option 
              v-for="item in regionOptions" 
              :key="item.storeGroupNo" 
              :label="item.storeGroupName" 
              :value="item.storeGroupNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input 
            class="search-input"
            v-model.trim="searchContent.storeNo" 
            placeholder="输入分店编码" 
            size="small" 
            @keyup.enter.native="doSearchHandle" 
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input 
            class="search-input" 
            v-model.trim="searchContent.storeName" 
            placeholder="输入分店名称" 
            size="small" 
            @keyup.enter.native="doSearchHandle" 
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearchHandle" size="mini">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <bl-table
        :loading="loading"
        :border="false"
        :selection="true"
        :dataSource="tableData"
        :columns="columns"
        :maxHeight="330"
        :defaultChecked="defaultChecked"
        uniqueStr="id"
        @selection-change="selectionChangeHandel"/>
      <bl-pagination
        :showPagination="tableData.length > 0"
        :pageNum="pageNum"
        :total="total"
        @size-change="changeSize"
        @current-change="changeCurrent"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false" size="mini">取消</el-button>
      <el-button type="primary" @click="confirm" size="mini">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import requestUrl from '@/module/api/warehouse'
export default {
  data() {
    return {
      title: '选择门店', 
      visible: false,
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      regionOptions: [],
      searchContent: {
        storeNo: '',
        storeName: '',
        regionCode: ''
      },
      tableData: [],
      columns: [
        {
          title: '门店编码',
          dataIndex: 'storeNo',
          minWidth: 100
        },
        {
          title: '门店名称',
          dataIndex: 'storeName',
          minWidth: 130
        }
      ],
      vendorNos: [],
      defaultChecked: [],
      checkedList: []
    }
  },
  methods: {
    setDefault(params) {
      this.visible = true
      this.regionOptions = params.regionOptions || []
      this.vendorNos = params.vendorNos || []
      this.defaultChecked = params.defaultChecked || []
      this.doSearchHandle()
    },
    doSearchHandle() {
      this.loading = true
      this.checkedList = [...this.defaultChecked]
      this.$http.post(requestUrl.queryStoreBySv, {...this.searchContent, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        this.loading = false
        if(res.code === 0) {
          this.tableData = res.data && res.data.result && res.data.result.length ? res.data.result : []
          this.total = res.data && res.data.total
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    selectionChangeHandel({selection}) {
      this.checkedList = [...selection]
    },
    confirm() {
      this.visible = false
      this.$emit("confirm", this.checkedList)
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