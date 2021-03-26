<template>
  <div>
    <el-dialog :visible.sync="isShow" :title="buttonOperate.name" class="dialog-upload" top="10vh">
      <div>
        <el-button size="small" type="info" @click="downloadModel">下载模板</el-button>
        <label for="excelFile">
          <span class="upload">导入数据</span>
          <input type="file" id="excelFile" hidden @change="handleFileSelect" @click="chooseFile" v-if="file.isShow"/>
          <p style="display: inline-block;">{{ file.name }}</p>
        </label>
      </div>
      <div v-show="importMsg != 0">
        <hr class="division"/>
        <div v-if="importMsg == 1">导入消息：
          <ul v-for="item in importErrorMsg" >
            <li>&nbsp;&nbsp;第{{item.index}}行{{item.key}}为空</li>
          </ul>
        </div>
        <div v-if="importMsg == 2">导入成功！</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false" size="small">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  import exportExcel from '@/utils/exportExcel'

  const commonReport = {
    // 导入
    dynamicReportImport: '/boom/a/dynamicReport/dynamicReportImport',
    // 清除
    deleteRedisCache: '/boom/a/dynamicReport/deleteRedisCache',
  }
  export default {
    name: 'upload-dialog',
    props: ['buttonOperate', 'pageName', 'pageId'],
    data () {
      return {
        isShow: false,
        tempConfig: {},
        file: {name: '', isShow: true}, // 导入数据
        importMsg: 0,
        importErrorMsg: [],
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
      show(checkList) {
        this.isShow = true
        this.tempConfig = {}
        this.buttonOperate.buttonItemVoList.forEach(item => {
          if(item.columnName && item.labelName) {
            this.tempConfig[item.columnName] = item.labelName
          }
        })
      },
      downloadModel(){
        let buttonItemVoList = this.buttonOperate.buttonItemVoList
        let obj = {}
        if(buttonItemVoList) {
          buttonItemVoList.forEach(item => {
            if(item.columnName && item.labelName) {
              obj[item.columnName] = ''
            }
          })
        }
        let arr = [obj]
        try {
          const tHeader = utils.objectToArray(this.tempConfig, false)
          const filterVal = utils.objectToArray(this.tempConfig, true)
          exportExcel.ExportJsonToExcel({
            header: tHeader,
            filterVal,
            data: arr,
            filename: `${this.pageName}导入模板`
          })
          this.$notify.success({
            title: '温馨提示',
            message: '模板下载成功'
          })
        } catch (e) {
          this.$notify.error({
            title: '温馨提示',
            message: '下载遇到错误'
          })
        }
      },
      /**
       * [handleFileSelect 选择文件发生变化]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      handleFileSelect(e) {
        // 点击取消不做任何变化
        if(!e.target.files.length) {
          return
        }
        this.file = e.target.files[0] || {name: ''}
        this.$set(this.file, 'isShow', true)
        let idx = this.file.name.lastIndexOf(".")
        let strLength = this.file.name.length
        let postf = this.file.name.substring(idx, strLength) // 后缀名
        if (!this.file.name || postf != '.xlsx') {
          this.$notify.warning({
            title: '提示',
            message: '请选择excel文件'
          })
          return
        }

        let items = []
        let parseConfig = {}
        for (let key in this.tempConfig) {
          parseConfig[this.tempConfig[key]] = key
        }
        items = exportExcel.parseToJSON(this.file, parseConfig)
        items.then((result) => {
          // 过滤空行
          if(result.length <= 0) {
            this.$notify.warning({
              title: '提示',
              message: '表格为空请重新上传'
            })
            return
          }
          result.forEach((item, i) => {
            for(let key in this.tempConfig) {
              if(this.importErrorMsg.length > 2) {
                return
              }
              if(item[key] == undefined || item[key] == '-' || item[key] == '') {
                this.importMsg = 1
                let obj = {
                  index : i + 1,
                  key :  this.tempConfig[key]
                }
                this.importErrorMsg.push(obj)
              }
            }
          })
          if(this.importErrorMsg.length > 0) {
            return
          }

          this.$http.post(this.buttonOperate.url || commonReport.dynamicReportImport, {pageId: this.pageId, listId: this.buttonOperate.tableId, buttonId: this.buttonOperate.buttonId, insertItems: result}, null, null, 'boomdebug').then(res => {
            if (res.code === 0) {
              this.$message.success("导入成功")
              // 清除服务器缓存
              this.$http.get(commonReport.deleteRedisCache, {pageId: this.pageId}).then((res) => {
                this.$emit('tableSearch')
              })
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.$notify.error({
              title: '提示',
              message: e.message
            })
          })
        })
      },
      // 点击选择文件
      chooseFile() {
        this.file = {
          name: '',
          isShow: false
        }
        this.importErrorMsg = []
        setTimeout(() => {
          this.$set(this.file, 'isShow', true)
        }, 100)
      },
    }
  }
</script>
