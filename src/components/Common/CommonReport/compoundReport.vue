<style>
  .common-mixreport-tab {
    margin: 6px 0 0;
  }
  .common-mixreport-tab .el-tabs__header {
    margin-bottom: 0
  }
  .common-mixreport-tab .el-tabs__header .el-tabs__item.is-active{
    background: #fff;
  }
  .common-mixreport-tab .el-tabs__item {
    height: 36px;
    line-height: 36px;
  }
</style>
<template>
  <div>
    <el-tabs type="card" @tab-click="goTab" v-model="activeName" class="common-mixreport-tab" :before-leave="beforeLeave">
      <el-tab-pane :key="item.pageCode" v-for="item in tabInfos" :label="item.title" :name="item.title"></el-tab-pane>
    </el-tabs>
    <common-report ref="CommonReport"></common-report>
  </div>
</template>
<script>
import CommonReport from './index'
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
      pageCode: '',
      searchItems: [],
      queryItems: [],
      weekDates: []
    }
  },
  components: {
    'common-report': CommonReport
  },
  computed: {
  },
  created () {
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?43c5b659702bcb76a4dde9d1eb06afba";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    let routeParams = this.$route.params
    this.pId = routeParams.pid;
    this.pageCode = routeParams.id;
    this.tabInfos = []
    this.getMixReport()
  },
  methods: {
    beforeLeave(activeName, oldActiveName) {
      this.tabInfos.forEach((item, index) => {
        if(oldActiveName === item.title) {
          this.searchItems[index] = this.$refs.CommonReport.searchItems
          this.queryItems[index] = this.$refs.CommonReport.queryItems
          this.weekDates[index] = this.$refs.CommonReport.weekDates
        }
      })
    },
    goTab(tab, event) {
      let pageCode = this.tabInfos[tab.index].pageCode
      let path = ''
      if(this.$route.path.indexOf('mixReport') > -1) {
        path = this.$route.path.match(/\/mixReport\/[1-9]\d*/)[0]
      }else if(this.$route.path.indexOf('previewMix') > -1) {
        path = this.$route.path.match(/\/previewMix\/[1-9]\d*/)[0]
      }
      let realPath = `${path}/${pageCode}`
      let obj = Storage.get('jumpReport')
      if(obj && obj[pageCode]) {
        delete obj[pageCode]
        Storage.set('jumpReport', obj)
      }
      this.$router.push(realPath)
      this.$refs.CommonReport.setDefault(pageCode, this.searchItems[tab.index], this.queryItems[tab.index], this.weekDates[tab.index])
    },
    getMixReport() {
      this.$http.post(commonReport.mix, {id: this.pId}, null, null, 'boomdebug').then((res) => {
        if (res.code === 0) {
          if(res.data && res.data.tabInfos) {
            this.tabInfos = res.data.tabInfos
            let index = 0;
            if(this.pageCode && this.tabInfos && this.tabInfos.length) {
              this.tabInfos.forEach((item, i) => {
                if(item.pageCode == this.pageCode) {
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
