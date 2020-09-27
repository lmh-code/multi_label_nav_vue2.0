<style>
  .common-report-tab .el-tabs__header {
    margin-bottom: 0
  }
  .common-report-tab .el-tabs__header .el-tabs__item.is-active{
    background: #fff;
  }
</style>
<template>
  <div>
    <el-tabs type="card" @tab-click="goTab" v-model="activeName" class="common-report-tab" :before-leave="beforeLeave">
      <el-tab-pane :key="item.pageId" v-for="item in tabInfos" :label="item.title" :name="item.title"></el-tab-pane>
    </el-tabs>
    <common-report ref="NewReport"></common-report>
  </div>
</template>
<script>
import NewReport from './index'
import Storage from '@/utils/localStorage'
const commonReport = {
  //复合表查询
  mix: '/boom/a/dynamicReport/tab/find'
}
export default {
  data () {
    return {
      activeName: '',
      tabInfos: [],
      pId: '',
      pageId: '',
      searchItems: [],
      queryItems: [],
      weekDates: []
    }
  },
  components: {
    'common-report': NewReport
  },
  computed: {
  },
  created () {
    let routeParams = this.$route.params
    this.pId = routeParams.pid;
    this.pageId = routeParams.id;
    this.tabInfos = []
    this.getMixReport()
  },
  beforeRouteUpdate(to, from, next) {
    this.pId = to.params.pid;
    this.pageId = to.params.id;
    this.tabInfos = []
    next()
    this.getMixReport()
  },
  methods: {
    beforeLeave(activeName, oldActiveName) {
      this.tabInfos.forEach((item, index) => {
        if(oldActiveName === item.title) {
          this.searchItems[index] = this.$refs.NewReport.searchItems
          this.queryItems[index] = this.$refs.NewReport.queryItems
          this.weekDates[index] = this.$refs.NewReport.weekDates
        }
      })
    },
    goTab(tab, event) {
      let pageId = this.tabInfos[tab.index].pageId
      let path = ''
      if(this.$route.path.indexOf('mixReport') > -1) {
        path = this.$route.path.match(/\/mixReport\/[1-9]\d*/)[0]
      }else if(this.$route.path.indexOf('previewMix') > -1) {
        path = this.$route.path.match(/\/previewMix\/[1-9]\d*/)[0]
      }
      let realPath = `${path}/${pageId}`
      let obj = Storage.get('jumpReport')
      if(obj && obj[pageId]) {
        delete obj[pageId]
        Storage.set('jumpReport', obj)
      }
      
      this.$router.push(realPath)
      this.$refs.NewReport.setDefault(pageId, this.searchItems[tab.index], this.queryItems[tab.index], this.weekDates[tab.index])
    },
    getMixReport() {
      this.$http.post(commonReport.mix, {id: this.pId}).then((res) => {
        if (res.code === 0) {
          if(res.data && res.data.tabInfos) {
            this.tabInfos = res.data.tabInfos
            let index = 0;
            if(this.pageId && this.tabInfos && this.tabInfos.length) {
              this.tabInfos.forEach((item, i) => {
                if(item.pageId == this.pageId) {
                  index = i
                }
              })
            }
            let tab = {
              'index': index
            }
            this.activeName = this.tabInfos[index].title
            this.goTab(tab)
          }
        }
      })
    }
  }

}
</script>
