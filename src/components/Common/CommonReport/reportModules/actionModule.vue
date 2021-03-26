<template>
  <div>  
    <el-form label-position="top" ref="form" size="mini" class="common-query-module">
      <span v-for="(e, i) in buttonItems" :key="i">
        <el-button v-if="e.type === 0" type="primary" @click="save(i)" size="mini">{{e.name || '保存'}}</el-button>
        <el-button v-if="e.type === 1" @click="save(i)" size="mini">{{e.name || '关闭'}}</el-button>
        <el-button v-if="e.type === 2" type="primary" @click="save(i)" size="mini">{{e.name || '下一步'}}</el-button>
      </span>
    </el-form>
  </div>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  
  const commonReport = {
    // 获取操作模块
    getActionByModuleId: '/boom/a/report/module/action/getActionByModuleId',
    // 新增
    insert: '/boom/a/dynamicReport/insert',
    // 修改
    update: '/boom/a/dynamicReport/update',
    // 批量修改
    updateBatch: '/boom/a/dynamicReport/updateBatch',
  }
  export default {
    name: 'action-module',
    props: ['pageId', 'actionModuleId', 'collectItems', 'backReport'],
    data () {
      return {
        buttonItems: []
      }
    },
    computed: {
    },
    mounted() {
      this.getActionByModuleId()
    },
    methods: {
      // 获取操作模块
      getActionByModuleId() {
        this.$http.post(commonReport.getActionByModuleId, {moduleId: this.actionModuleId}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            if(res.data && res.data.buttonVos) {
              this.buttonItems = [...res.data.buttonVos]
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取操作模块失败：" + e.message)
        })
      },
      save(i) {
        let bottonTypeUrl = ''
        if(this.backReport.bottonParmas.bottonType === 0) {
          bottonTypeUrl = commonReport.insert
        }else if(this.backReport.bottonParmas.bottonType === 1) {
          bottonTypeUrl = commonReport.update
        }else if(this.backReport.bottonParmas.bottonType === 7) {
          bottonTypeUrl = commonReport.updateBatch
        }
        let url = this.buttonItems[i].url || bottonTypeUrl
        if(this.backReport.bottonParmas) {
          let bottonParmas = {...this.backReport.bottonParmas}
          let obj = {pageId: bottonParmas.pageId, dataSource: bottonParmas.dataSource, tableName: bottonParmas.tableName}
          if(this.backReport.bottonParmas.bottonType === 7) {
            obj.batchIds = [...bottonParmas.idList]
          }
          for(let key in this.collectItems) {
            obj.data = this.collectItems[key]
          }
          this.$http.post(url, {...obj}, null, null, 'boomdebug').then((res) => {
            if (res.code === 0) {
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            console.log("操作模块点击保存失败" + e.message)
          })
        }else{
          this.$http.post(url, {...this.collectItems}, null, null, 'boomdebug').then((res) => {
            if (res.code === 0) {
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            console.log("操作模块点击保存失败" + e.message)
          })
        }
        if(this.buttonItems[i].afterOption === 0) {
          this.routerPush(i)
        }
      },
      routerPush(i) {
        let redirectUrl = this.backReport.backReport
        let urlArr = redirectUrl.split('/')
        let pageId = urlArr[2]
        let obj = {}
        if(Storage.get('jumpReport') && Storage.get('jumpReport') != 'undefined') {
          obj = Storage.get('jumpReport')
        }
        obj[pageId] = {
          ...this.collectItems
        }
        Storage.set('jumpReport', obj)
        // 跳转
        let newRoute = {
          path: redirectUrl,
          fullPath: redirectUrl,
          name: redirectUrl.slice(1),
        }
        newRoute.meta && newRoute.meta.title && this.$store.commit('tagsView/ADD_TAG_ONLY', newRoute)
        this.$router.push(redirectUrl)
      },
    }
  }
</script>
