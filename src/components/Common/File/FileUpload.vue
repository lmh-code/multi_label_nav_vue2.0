<style scoped>
.filt-item-wrap {
  margin-top: 10px;
  padding-left: 10px;
}
</style>
<template>
  <div>
    <el-upload
      action=""
      :disabled="uploadLoading"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="emitUpload">
      <el-button size="small" :icon="uploadLoading ? 'el-icon-loading' : 'el-icon-upload2'">上传文件</el-button>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{tipText}}</span>
    </el-upload>
    <div :style="styleObj">
      <div v-for="(item, index) in filesList" :key="index" class="filt-item-wrap">
        <el-button size="mini" icon="el-icon-delete" circle @click="deleteHandel(item)"></el-button>
        <span class="item">{{item}}</span>
      </div>
    </div>
    
  </div>
</template>
<script>
  import * as qiniu from 'qiniu-js'
  import config from '@/utils/config'
  const fileUrlList = {
    getQiNiuToken: `${config.reqUrl}/foundation/qiniu/auth/file`
  }
  export default {
    props: {
      // previewFileList 已经有的文件列表
      previewFileList: {
        type: Array,
        default: () => []
      },
      // 接受什么样的文件类型 [jpg, png, jpeg, doc, docx, pdf, xlsx, zip]
      fileAspectType: {
        type: Array,
        default: () => []
      },
      // 最多可传文件数 默认不限
      maxFilesNum: {
        type: Number,
        default: 0
      },
      // 文件大小限制 默认不限 单位kb
      fileSize: {
        type: Number,
        default: 0
      },
      tipText: {
        type: String,
        default: ''
      },
      styleObj: {
        type: Object,
        default: ''
      },
    },
    created() {
      this.filesList = [...this.previewFileList]
    },
    data() {
      return {
        uploadLoading: false,
        filesList: [],
        fileName: '',
        fileExtension: ''
      }
    },
    watch: {
      previewFileList(newVal, oldVal) {
        this.filesList = [...newVal]
      }
    },
    methods: {
      beforeUpload(file) {
        let fileAspectTypeOk = true
        this.fileName = file && file.name.substring(0, file.name.lastIndexOf('.'))
        this.fileExtension = file && file.name.substring(file.name.lastIndexOf('.') + 1)
        if(this.fileAspectType && this.fileAspectType.length > 0) {
          // fileAspectType 有值 就是要加验证 
          if(!this.fileAspectType.includes(this.fileExtension)) {
            fileAspectTypeOk = false
            this.$tip.message(`上传文件格式不正确！`, 'warning')
            return false
          }
        }
        let fileSizeOk = true
        let sizeValiTipStr = ''
        if(this.fileSize) {
          if(this.fileSize < 1024) {
            sizeValiTipStr = `${this.fileSize}KB`
          }else {
            sizeValiTipStr = `${this.fileSize / 1024}M`
          }
          if (file.size > this.fileSize * 1024) {
            fileSizeOk = false
            this.$tip.message(`上传文件大小不能超过${sizeValiTipStr}！`, 'warning')
            return false
          }
        }
        return fileAspectTypeOk && fileSizeOk
      },
      emitUpload (e) {
        if(this.maxFilesNum) {
          if(this.filesList.length >= this.maxFilesNum) {
            this.$tip.message(`最多只能上传${this.maxFilesNum}个文件！`, 'warning')
            return
          }
        }
        this.uploadLoading = true
        this.getToken().then((res) => {
          // 开始上传图片
          let uploader = qiniu.upload(e.file, res.fileName, res.token)
          uploader.subscribe({
            error: () => {
              this.uploadLoading = false
            },
            complete: (res) => {
              this.uploadLoading = false
              const newUrl = `http://retailimg01.benlailife.com/${res.key}`
              this.filesList.push(newUrl)
              this.$emit("files-change", {
                filesList: this.filesList,
                path: newUrl
              })
            },
            next: res => {
            }
          })
        })
      },
      getToken () {
        return this.$http.post(fileUrlList.getQiNiuToken, {
          fileName: this.fileName,
          fileExtension: this.fileExtension
        }).then(res => {
          if (res.code == 0) {
            let token = res.data.token
            let fileName = res.data.key
            return {fileName, token}
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.uploadLoading = false
          this.$notify.error({
            title: '提示',
            message: e.message
          })
        })
      },
      deleteHandel(path) {
        let filesListFilter = this.filesList.filter(file => {
          return file !== path
        })
        this.filesList = [...filesListFilter]
        this.$emit("files-change", {
          filesList: this.filesList,
          path: path
        })
      }
    }
  }
</script>