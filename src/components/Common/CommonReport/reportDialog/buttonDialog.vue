<template>
  <div>
    <el-dialog :visible.sync="isShow" :title="buttonOperate.name" width="60%" class="common-dialog-input" top="10vh" v-if="isShow">
      <el-form label-position="top" ref="formDialog" size="mini" :model="buttonOperate.items" label-width="80px" style="max-height: 300px;overflow-y:scroll;" class="common-query-module">
        <button-form-module ref="ButtonFormModule" :queryItems="queryItems" :searchItems="buttonOperateItem"></button-form-module>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sureTableItem(false)" size="small">取 消</el-button>
        <el-button @click="sureTableItem(true)" size="small" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  import buttonFormModule from '../reportModules/formModule'

  const commonReport = {
    // 新增
    dynamicReportAdd: '/boom/a/dynamicReport/dynamicReportAdd',
    // 清除
    deleteRedisCache: '/boom/a/dynamicReport/deleteRedisCache',
    // 修改
    dynamicReportUpdate: '/boom/a/dynamicReport/dynamicReportUpdate',
  }
  export default {
    name: 'button-dialog',
    props: ['buttonOperate', 'buttonOperateItem', 'pageId'],
    data () {
      return {
        isShow: false,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        queryItems: []
      }
    },
    components: {
      'button-form-module': buttonFormModule,
    },
    computed: {
    },
    mounted() {
    },
    watch: {
    },
    methods: {
      show() {
        this.isShow = true
        setTimeout(() => {
          this.queryItems = [...this.buttonOperate.buttonItemVoList]
          setTimeout(() => {
            this.$refs.ButtonFormModule.initialize()
          }, 100)
        }, 100)
      },
      // 表格操作-确认
      sureTableItem(param) {
        if(param) {
          if(this.$refs.ButtonFormModule.requiredFormat() === false) {
            return
          }
          if(this.buttonOperate.listType === 1 && this.buttonOperate.moduleKey) {
            if(this.buttonOperate.type === 0) {
              if(this.buttonOperate.buttonItemVoList && this.buttonOperate.buttonItemVoList.length === 1) {
                let idList = []
                for(let key in this.buttonOperateItem) {
                  let arr = [...this.buttonOperateItem[key]]
                  arr.forEach(item => {
                    let obj = {id: item}
                    idList = [...idList, obj]
                  })
                }
                this.isShow = false
                this.$emit('tableCollectArr', idList)
              }else{
                this.isShow = false
                this.$emit('tableCollect', {
                  buttonOperateItem: this.buttonOperateItem
                })
              }
            }else if(this.buttonOperate.type === 1) {
              this.isShow = false
              this.$emit('tableCollect', {
                index_: this.buttonOperate.index_,
                buttonOperateItem: this.buttonOperateItem
              })
            }
          }else{
            if(this.buttonOperate.type === 0) {
              let arr = []
              arr.push(this.buttonOperateItem)
              let url = this.buttonOperate.url || commonReport.dynamicReportAdd
              let boomdebug = this.buttonOperate.url? '' : 'boomdebug'
              this.$http.post(url, {pageId: this.pageId, listId: this.buttonOperate.tableId, buttonId: this.buttonOperate.buttonId, insertItems: arr}, null, null, boomdebug).then((res) => {
                if (res.code === 0) {
                  this.isShow = false
                  this.$message.success("新增成功")
                  // 清除服务器缓存
                  this.$http.get(commonReport.deleteRedisCache, {pageId: this.pageId}).then((res) => {
                    this.$emit('tableSearch')
                  })
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                this.$message(e.message)
              })
            }else if(this.buttonOperate.type === 1) {
              let arr = []
              let obj = {
                id: this.buttonOperate.id,
                ...this.buttonOperateItem,
              }
              arr.push(obj)
              let url = this.buttonOperate.url || commonReport.dynamicReportUpdate
              let boomdebug = this.buttonOperate.url? '' : 'boomdebug'
              this.$http.post(url, {pageId: this.pageId, listId: this.buttonOperate.tableId, updateItems: arr}, null, null, boomdebug).then((res) => {
                if (res.code === 0) {
                  this.isShow = false
                  this.$message.success("修改成功")
                  // 清除服务器缓存
                  this.$http.get(commonReport.deleteRedisCache, {pageId: this.pageId}).then((res) => {
                    this.$emit('tableSearch')
                  })
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                this.$message(e.message)
              })
            }
          }
        }else{
          this.isShow = false
        }
        this.queryItems.forEach((item, i) => {
          if(item.checkNameVal) {
            this.$set(this.queryItems[i], 'checkNameVal', '')
          }
        })
      },
      
    }
  }
</script>
