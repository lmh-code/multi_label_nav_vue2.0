<style>
  .query-report {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .query-layout{
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  .common-query-module .el-form-item{
    margin: 0 20px 4px 0;
    display: inline-block;
  }
  .common-query-module label{
    padding: 0;
  }
  .common-query-module .common-goods-style{
    position: relative;
  }
  .common-query-module .common-goods-style button{
    position: absolute;
    right: 0;
    top: 0px;
    padding: 5px 10px;
    margin: 2px;
    border: none;
    border-left: 1px solid #DCDFE6;
    border-radius: 0;
  }
  .common-query-module .el-form-item__content input,
  .common-query-module .el-date-editor.el-input,
  .common-query-module .el-date-editor.el-input__inner{
    width: 180px;
  }
  .common-query-module .el-date-editor--datetime.el-input,
  .common-query-module .el-date-editor--datetime input{
    width: 180px !important;
  }
</style>
<template>
  <div class="query-report">
    <div class="query-layout">
      <el-form label-position="top" ref="form" size="mini" class="common-query-module">
        <form-module ref="FormModule" :queryItems="queryItems" :searchItems="searchItems"></form-module>
      </el-form>
    </div>
  </div>
</template>
<script>
import Storage from '@/utils/localStorage'
import formModule from './reportModules/formModule'
const commonReport = {
  //复合表查询
  getWidget: '/boom/p/common/getWidget'
}
export default {
  data () {
    return {
      widgetCode: '',
      queryItems: [],
      searchItems: {}
    }
  },
  components: {
    'form-module': formModule,
  },
  computed: {
  },
  created () {
    this.widgetCode = this.$route.params.id || '';
    this.getWidget()
  },
  methods: {
    getWidget() {
      this.$http.post(commonReport.getWidget, {widgetCode: this.widgetCode}, null, null, 'boomdebug').then((res) => {
        if (res.code === 0) {
          let data = {
            isShow: true,
            labelName: res.data.name,
            columnName: 'test',
            ...res.data
          }
          this.queryItems = [{...data}]
          setTimeout(() => {
            this.$refs.FormModule.initialize()
          }, 100)
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        console.log("获取控件失败：" + e.message)
      })
    },
  }

}
</script>
