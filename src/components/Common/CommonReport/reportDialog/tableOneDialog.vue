<template>
  <div>
    <el-dialog :title="tableData.labelName" :visible.sync="isShow" class="dialog-tree" top="10vh" append-to-body>
      <el-row>
        <el-col>
          <el-input style="width:200px;" size="mini" placeholder="输入名称或编号" v-model="filterTableText"></el-input>
          <el-button size="mini" type="primary" @click="getTableData(true)">搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            size="small"
            ref="singleTable"
            v-loading="tableData.loading"
            :data="tableData.tableData"
            style="width:100%;margin: 10px 0"
            height="300"
            highlight-current-row
            @row-dblclick="handleCurrentChange">
            <el-table-column min-width="100" prop="id" label="编号" align="center"></el-table-column>
            <el-table-column min-width="100" prop="name" label="名称" align="center"></el-table-column>
          </el-table>
          <!-- 分页条 -->
          <el-pagination
            @size-change="changeSizeDialog($event, 'one')"
            @current-change="changeCurrentDialog($event, 'one')"
            :pager-count="5"
            :current-page="tableData.pageNum"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="tableData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
          </el-pagination>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  
  export default {
    name: 'table-one-dialog',
    props: ['tableData', 'searchItems'],
    data () {
      return {
        isShow: false,
        filterTableText: '', // 筛选
      }
    },
    components: {
    },
    computed: {
    },
    mounted() {
    },
    watch: {
    },
    methods: {
      show() {
        this.filterTableText = ''
        this.getTableData(true)
        this.isShow = true
      },
      // 弹框-changeSizeDialog
      changeSizeDialog(value) {
        this.tableData.pageSize = value
        this.getTableData()
      },
      // 弹框-changeCurrentDialog
      changeCurrentDialog(value) {
        this.tableData.pageNum = value
        this.getTableData()
      },
      // 弹框--table搜索
      getTableData(param) {
        if(param) {
          this.tableData.pageNum = 1
        }
        let query
        if(this.tableData.query) {
          query = this.searchItems[this.tableData.query]
        }
        this.$set(this.tableData, 'loading', true)
        this.$http.post(this.tableData.urlValue, {q: this.filterTableText, pageNum: this.tableData.pageNum, pageSize: this.tableData.pageSize, query: query}, true).then((res) => {
          if (res.code === 0) {
            this.$set(this.tableData, 'loading', false)
            if(res.data) {
              this.$set(this.tableData, 'tableData', res.data.result)
            }
            if(this.tableData.pageNum === 1) {
              this.$set(this.tableData, 'total', res.data.total)
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.tableData.loading = false
          console.log("获取弹框表格单选模块失败：" + e.message)
        })
      },
      handleCurrentChange(val) {
        let checkNameVal = `${val.id}.${val.name}`  
        let data = {
          index: this.tableData.index,
          checkNameVal: checkNameVal,
          id: val.id
        }
        this.isShow = false
        this.$emit('closeTableOneDialog', data);
      },
    }
  }
</script>
