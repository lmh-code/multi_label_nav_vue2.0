<template>
  <div>
    <el-form label-position="top" ref="form" size="mini" class="common-query-module">
      <form-module ref="FormModule" :queryItems="inputItems" :searchItems="searchItems" :searchItemsAll="searchItemsAll"></form-module>
      <div class="input-paging" v-if="inputPageNo">
        <el-button type="primary" @click="back(i)" size="mini" v-if="inputPageIndex"><i class="el-icon-arrow-left"></i> 上一步</el-button>
        <el-button type="primary" @click="next(i)" size="mini" v-if="inputPageIndex < inputPageNo">下一步 <i class="el-icon-arrow-right"></i></el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  import formModule from './formModule'
  
  const commonReport = {
    // 获取input模块
    getInputByModuleId: '/boom/a/report/module/input/getInputByModuleId',
  }
  export default {
    name: 'input-module',
    props: ['pageId', 'inputModuleId', 'searchItems', 'pageCode', 'collectItems', 'searchItemsAll'],
    data () {
      return {
        inputItems: [], // 查询控件参数
        inputPageNo: 0,
        inputPageIndex: 0,
      }
    },
    components: {
      'form-module': formModule,
    },
    computed: {
    },
    mounted() {
      this.getInputByModuleId()
    },
    watch: {
      searchItems: {
        handler(val) {
          this.collectItems[this.moduleKey] = { ...val}
        },
        deep: true
      },
    },
    methods: {
      // 获取input模块
      getInputByModuleId() {
        this.$http.post(commonReport.getInputByModuleId, {moduleId: this.inputModuleId}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            if(res.data && res.data.inputItems) {
              this.inputItems = [...res.data.inputItems]
              this.moduleKey = res.data.moduleKey
              this.inputItems.forEach(item => {
                if(item.inputPageNo > 0) {
                  item.isShow = false
                  if(item.inputPageNo > this.inputPageNo) {
                    this.inputPageNo = item.inputPageNo
                  }
                }else{
                  item.isShow = true
                }
              })
              setTimeout(() => {
                this.$refs.FormModule.initialize()
              }, 100)
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取input模块失败：" + e.message)
        })
      },
      // 查询-先判断必填项
      requiredFormat(first) {
        return this.$refs.FormModule.requiredFormat(first)
      },
      back() {
        this.inputPageIndex -= 1
        this.inputItems.forEach(item => {
          if(item.inputPageNo == this.inputPageIndex) {
            item.isShow = true
          }else{
            item.isShow = false
          }
        })
        this.$refs.FormModule.changeFold(this.inputItems)
      },
      next() {
        this.inputPageIndex += 1
        this.inputItems.forEach(item => {
          if(item.inputPageNo == this.inputPageIndex) {
            item.isShow = true
          }else{
            item.isShow = false
          }
        })
        this.$refs.FormModule.changeFold(this.inputItems)
      }
    }
  }
</script>
