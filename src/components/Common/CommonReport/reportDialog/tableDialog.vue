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
            ref="multiple"
            v-loading="tableData.loading"
            :data="tableData.tableData"
            style="width:100%;margin: 10px 0"
            height="300"
            @select="handleSelect"
            @select-all="handleSelectAll">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column min-width="100" prop="id" label="编号" align="center"></el-table-column>
            <el-table-column min-width="100" prop="name" label="名称" align="center"></el-table-column>
          </el-table>
          <!-- 分页条 -->
          <el-pagination
            @size-change="changeSizeDialog"
            @current-change="changeCurrentDialog"
            :pager-count="5"
            :current-page="tableData.pageNum"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="tableData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
          </el-pagination>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="closeTableDialog(true)">选择并关闭</el-button>
        <el-button size="mini" @click="closeTableDialog(false)">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  
  export default {
    name: 'table-dialog',
    props: ['tableData', 'searchItems'],
    data () {
      return {
        isShow: false,
        filterTableText: '', // 筛选
        checkedList: [],
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
        this.checkedList = []
        this.isShow = true
        setTimeout(() => {
          this.$refs.multiple.clearSelection();
        }, 100)
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
        this.$http.get(this.tableData.urlValue, {q: this.filterTableText, pageNum: this.tableData.pageNum, pageSize: this.tableData.pageSize}, true).then((res) => {
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
          console.log("获取弹框表格多选模块失败：" + e.message)
        })
      },
      /**
       * [handleSelect 选择某一个]
       * @return {[type]} [description]
       */
      handleSelect(val, row) {
        let hash = {}
        let checkedListTemp = []
        if(utils.isKeyInArrayBykey(row.id, 'id', this.checkedList)) {
          this.checkedList = utils.removeItemByKeyVal('id', row.id, this.checkedList)
          return
        }else {
          checkedListTemp.push(row)
        }

        let checkedListTempArr = [...checkedListTemp, ...this.checkedList]
        this.checkedList = checkedListTempArr.reduceRight((item, next) => {
          hash[next.id] ? '' : hash[next.id] = true && item.push(next)
          return item
        }, [])
      },
      handleSelectAll(val) {
        let hash = {}
        if(val.length > 0) {
          // 全选
          for(let item of val) {
            this.checkedList.push(item)
          }
          // 去重
          this.checkedList = this.checkedList.reduceRight((item, next) => {
            hash[next.id] ? '' : hash[next.id] = true && item.push(next)
            return item
          }, [])
        }else {
          // 全不选 此时val.length<=0
          // 1.获取当前table中每一条的id
          let checkedListTemp = []
          for(let item of this.tableData.tableData) {
            checkedListTemp.push(item)
          }
          // 2.从要传递的参数中去掉这些重复的
          this.checkedList = utils.getSubtract(this.checkedList, checkedListTemp, 'id')
        }
      },
      closeTableDialog(param) {
        let idList = []
        let nameList = []
        // 选择并关闭
        this.checkedList.forEach((item, i) => {
          idList.push(item.id)
          nameList.push(item.name)
        })
        let checkNameVal = nameList.join(',')
        let data = {
          index: this.tableData.index,
          checkNameVal: checkNameVal,
          idList: idList
        }
        this.isShow = false
        this.$emit('closeTableDialog', data);
        // 关闭
      },
    }
  }
</script>
