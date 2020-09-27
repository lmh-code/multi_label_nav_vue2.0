<style>
  .p-t {
    margin-bottom: 10px;
  }
  
  .u-btn-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  
  .file-name-wrap {
    width: 200px;
    height: 32px;
    line-height: 32px;
    overflow: hidden;
    border: 1px solid #ececec;
    border-radius: 4px;
    padding: 0 10px;
    position: relative;
    top: 5px;
  }
  
  .label-wrap {
    border: 1px solid #ececec;
    border-radius: 4px;
    position: relative;
    top: 5px;
    height: 32px;
    line-height: 32px;
  }
  
  .label-wrap > .excel-file-label {
    line-height: 32px;
    cursor: pointer;
    padding: 7px 10px;
  }
  
  .label-wrap > .excel-file-label:hover {
    color: #fff;
    background-color: #66b1ff;
    border-radius: 4px;
  }
</style>
  
<template>
  <div>
    <el-dialog 
      :title="title" 
      :visible.sync="isShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false" 
      width='450px'>
      <el-form ref="form" label-width="80px">
        <el-form-item label="本地上传">
          <div class="excel-u-d-wrap">
            <div class="u-btn-wrap">
              <div class="file-name-wrap">{{ file.name }}</div>
              <div class="label-wrap">
                <label :for="elId" class="excel-file-label">
                  <input type="file" :id="elId" hidden @change="handleFileSelect"/>
                  <span class="u-txt">选择文件</span>
                </label>
              </div>
            </div>
            <div class="d-btn-wrap">
              <span>请按EXCEL模板格式导入</span>
              <el-button type="text" @click="downloadModel" size="mini" :disabled="isDisabled">下载模板</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" size="mini">取消</el-button>
        <el-button type="primary" @click="doConfirmHandel" size="mini" :disabled="!file.name || conDisabled" :loading="saveLoading">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
  import * as utils from '@/utils/utils'
  import exportSheet from '@/utils/exportExcel'
  import Storage from '@/utils/localStorage'
  export default {
    data () {
      return {
        elId: 'addByExcel', // input的唯一标识，防止同一个页面出现多个excel导入，多个的时候可以传入不同的id
        conDisabled: false, // 防止多次点击确定按钮
        isDisabled: false, // 下载模板按钮防止多次点击
        saveLoading: false,
        title: '批量添加',
        isShow: false,
        formLabelWidth: '70px',
        file: {name: ''}, // 导入数据
        // 导入商品
        exportGoods: [],
        tempConfig: {},
        // 批量添加商品集合
        list: []
  
      }
    },
    methods: {
      /**
       * [setDefaultMsg 设置弹框默认属性]
       * @param {[type]} _params [自定义参数]
       */
      setDefaultMsg (_params) {
        this.isShow = true
        this.title = _params.title || ''
        this.tempConfig = _params.tempConfig || {}
        this.elId = _params.elId || 'addByExcel'
        // 清除当前选择的文件信息
        this.resetExcelFile()
      },
      /**
       * [downloadModel 下载模板]
       * @return {[type]} [description]
       */
      downloadModel () {
        this.isDisabled = true
        let tableData = []
        let tableDataItem = {}
        for(let key in this.tempConfig) {
          tableDataItem[key] = ''
        }
        tableData.push(tableDataItem)
        const tHeader = utils.objectToArray(this.tempConfig, false)
        const filterVal = utils.objectToArray(this.tempConfig, true)
        exportSheet.ExportJsonToExcel({
          header: tHeader,
          filterVal,
          data: tableData,
          filename: `${this.title}模板`
        })
        setTimeout(() => {
          this.$notify.success({
            title: '温馨提示',
            message: `${this.title}模板下载成功`
          })
          this.isDisabled = false
        }, 500)
      },
      /**
       * [handleFileSelect 选择文件发生变化]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      handleFileSelect (e) {
        // 点击取消不做任何变化
        if (!e.target.files.length) {
          return
        }
        this.file = e.target.files[0] || {name: ''}
        let idx = this.file.name.lastIndexOf(".")
        let strLength = this.file.name.length
        let postf = this.file.name.substring(idx, strLength) // 后缀名
  
        if (!this.file.name || postf != '.xlsx') {
          this.$notify.warning({
            title: '提示',
            message: '请选择excel文件'
          })
          // 清除当前选择的文件信息
          this.resetExcelFile()
          return
        }
  
        let items = []
        let parseConfig = {}
        for (let key in this.tempConfig) {
          parseConfig[this.tempConfig[key]] = key
        }
        items = exportSheet.parseToJSON(this.file, parseConfig)
        items.then((result) => {
          result.forEach(item => {
            // sfInStockStr 判断顺丰仓是否是现货时使用 默认true
            if(item.sfInStockStr === '是') {
              item.sfInStock = true
            }else if(item.sfInStockStr === '否') {
              item.sfInStock = false
            }else {
              item.sfInStock = true
            }
          })
          this.list = result
        }).catch()
      },
      /**
       * [doConfirmHandel 点击确定]
       * @return {[type]} [description]
       */
      doConfirmHandel() {
        this.conDisabled = true
        let params = {
          dataList: this.list
        }
        this.$emit("doConfirmHandel", params)
      },
      /**
       * @description: 是否可继续提交
       * @param {type} 
       * @return: 
       */
      closeDisabled() {
        this.conDisabled = false
        // 清除当前选择的文件信息
        this.resetExcelFile()
      },
      /**
       * @description: 关闭弹窗
       * @param {type} 
       * @return: 
       */
      closeDialog() {
        this.isShow = false
        // 清除当前选择的文件信息
        this.resetExcelFile()
      },
      resetExcelFile() {
        this.file = {name: ''}
        let excelFileDom = document.getElementById(this.elId)
        if(excelFileDom) excelFileDom.value = ""
      }

    }
  }
</script>
  