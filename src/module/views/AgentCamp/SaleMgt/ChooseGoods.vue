<template>
  <el-dialog 
    :close-on-click-modal = "false"
    :close-on-press-escape = "false"
    :show-close="false"
    :title="title" 
    :visible.sync="visible" 
    width='700px'>
    <div class="search-form-wraper c-g-sfw">
      <el-form 
        :model="searchContent" 
        label-position="top" 
        @submit.native.prevent>
        <el-form-item>
          <el-input 
            class="search-input"
            v-model.trim="searchContent.goodsNo" 
            placeholder="输入商品编码" 
            size="small" 
            @keyup.enter.native="doSearchHandle(true)" 
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input 
            class="search-input" 
            v-model.trim="searchContent.goodsName" 
            placeholder="输入商品名称" 
            size="small" 
            @keyup.enter.native="doSearchHandle(true)" 
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearchHandle(true)" size="mini">搜索</el-button>
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
        :maxHeight="300"
        :defaultChecked="checkedList"
        uniqueStr="goodsNo"
        @select="selectHandel"
        @select-all="selectAllHandel"/>
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
import commonUrl from '@/module/api/common'
export default {
  data() {
    return {
      title: '',
      visible: false,
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchContent: {
        vendorNo: '',
        goodsNo: '',
        goodsName: '',
        tradeModeId: 9
      },
      columns: [
        {
          title: '商品条码',
          dataIndex: 'barCode',
          minWidth: 120,
        },
        {
          title: '商品编码',
          dataIndex: 'goodsNo',
          minWidth: 100,
        },
        {
          title: '商品名称',
          dataIndex: 'name',
          minWidth: 120,
        },
        {
          title: '单位',
          dataIndex: 'saleUnitName',
          minWidth: 80,
        },
        {
          title: '规格',
          dataIndex: 'spec',
          minWidth: 90,
        },
      ],
      tableData: [],
      checkedList: []
    }
  },
  watch: {
    'searchContent.vendorNo'(newVal, oldVal) {
      if(newVal !== oldVal) {
        this.doSearchHandle(true)
      }
    }
  },
  methods: {
    setDefaultMsg(params) {
      this.title = params.title || ''
      this.searchContent.vendorNo = params.vendorNo || ''
      this.checkedList = params.defaultChecked && params.defaultChecked.length ? [...params.defaultChecked] : []
      this.visible = true
    },
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
      this.$http.post(commonUrl.queryContractGoods, {...this.searchContent, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        this.loading = false
        if(res.code === 0) {
          this.tableData = res.data && res.data.result && res.data.result.length ? res.data.result : []
          this.total = res.data && res.data.total ? res.data.total : 0
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        utils.openNotification('error', '系统提示', e.message)
      })
    },
    selectHandel({selection, row}) {
      if(selection.includes(row)) {
        this.checkedList.push(row)
      }else {
        const index = this.checkedList.findIndex(item => {
          return item.goodsNo === row.goodsNo
        })
        this.checkedList.splice(index, 1)
      }
    },
    selectAllHandel({selection}) {
      if(selection.length) {
        // 全选
        this.tableData.forEach(i => {
          const index = this.checkedList.findIndex(j => {
            return j.goodsNo === i.goodsNo
          })
          if(index === -1) {
            this.checkedList.push(i)
          }
        })
      }else {
        // 全不选
        this.tableData.forEach(i => {
          const index = this.checkedList.findIndex(j => {
            return j.goodsNo === i.goodsNo
          })
          if(index !== -1) {
            this.checkedList.splice(index, 1)
          }
        })
      }
    },
    confirm() {
      this.visible = false
      this.$emit("confirm", this.checkedList)
    }
  }
}
</script>