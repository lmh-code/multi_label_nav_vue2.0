<style lang="less">
  .bl-draggable-wrap {
    overflow: hidden;
  }
  .bl-draggable-wrap .bl-upload-wrap {
    float: left;
    margin: 0 5px;
  }
  .bl-upload-wrap .uploader11 {
    width: 120px;
    height: 120px;
    display: inline-block;
  }
  .bl-upload-wrap .uploader34 {
    width: 90px;
    height: 120px;
    display: inline-block;
  }
  .bl-upload-wrap .uploader43 {
    width: 120px;
    height: 90px;
    display: inline-block;
  }
  .bl-upload-wrap .el-upload {
    width: 100%;
    height: 100%;
    border: 1px dashed @colorSplit;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bl-upload-wrap .el-upload:hover {
    border-color: @colorMain;
  }
  .bl-upload-wrap img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .upload-img-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: @colorSubTitle;
  }
  .btn-w {
    padding: 0 5px;
    line-height: 0;
    text-align: center;
  }
  .btn-w .up-h-i {
    cursor: pointer;
    padding-left: 4px;
    padding-right: 4px;
  }
  .btn-w .up-h-i:hover {
    color: @colorMain;
  }
</style>

<template>
  <div>
    <!-- 用例如下：
      <image-upload 
        ref="imageUpload" 
        @setImageList="setImageList"
        :maxImgsNum="6"
        :imgSize="2048"
        :width="800"
        :height="800"/> -->
    <draggable v-model="imageList" @update="datadragEnd" @start="datadragStart" class="bl-draggable-wrap">
      <transition-group>
        <div class="bl-upload-wrap" 
          v-for="(item, idx) of imageList" 
          @click="setItemIdx(idx)" 
          :key="item.imageUrl">
          <el-upload
            :class="imgAspect === 2 ? 'uploader34' : imgAspect === 3 ? 'uploader43' : 'uploader11'"
            action=""
            :show-file-list="false"
            :before-upload="imageUploadReg"
            :http-request="emitUpload">
            <div v-loading="imageUploadLoading && currentUpFileIdx == idx" class="upload-img-wrap">
              <img v-if="item.imageUrl" :src="item.imageUrl">
              <i v-else class="el-icon-plus"></i>
            </div>
          </el-upload>
          <div class="btn-w" v-if="item.imageUrl && item.imageUrl != ''"> 
            <span class="up-h-i" 
              @click="onPreviewHandel(item.imageUrl)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span class="up-h-i" 
              @click="deleteUpFile(idx)">
              <i class="el-icon-delete"></i>
            </span>
            <span class="up-h-i">
              <i class="el-icon-rank"></i>
            </span>
          </div>
        </div>
      </transition-group>
    </draggable>
    <el-dialog 
      :visible.sync="dialogVisible" 
      append-to-body>
      <img width="100%" :src="bigImageUrl" alt=""/>
    </el-dialog>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import * as qiniu from 'qiniu-js'
  import config from '@/utils/config'
  const fileUrlList = {
    getQiNiuToken: `${config.reqUrl}/foundation/qiniu/auth/file`
  }
  export default {
    props: {
      // imgAspect 图片宽高比 1表示1:1  2:表示长图 3:4  3: 表示长图 4:3
      imgAspect: {
        type: Number,
        default: 1
      },
      // imgSize 图片尺寸限制大小, 单位kb
      imgSize: {
        type: Number,
        default: 0
      },
      // 最多上传几张：不传默认不限张数
      maxImgsNum: {
        type: Number,
        default: 0
      },
      // 是否检查图片宽度，默认不限
      width: {
        type: Number,
        default: 0
      },
      // 是否检查图片高度，默认不限
      height: {
        type: Number,
        default: 0
      },
      defaultImages: { // 默认已有的图片
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        imageUploadLoading: false,
        currentUpFileIdx: -1,
        imageList: [
          {
            imageUrl: '',
            index: 0
          }
        ],
        dialogVisible: false,
        bigImageUrl: ''
      }
    },
    components: {
      'draggable': Draggable
    },
    watch: {
      defaultImages: {
        immediate: true,
        handler: function(newVal, oldVal) {
          let images = [...newVal]
          let imageListTemp = images.filter((item, index) => {
            item.index = index
            return item.imageUrl
          })
          if(imageListTemp.length < this.maxImgsNum || this.maxImgsNum === 0) {
            imageListTemp.push({
              imageUrl: '',
              index: imageListTemp.length
            })
          }
          this.imageList = imageListTemp
        }
      }
    },
    methods: {
      datadragStart() {
        if(this.imageUploadLoading || this.maxImgsNum === 1) return
      },
      datadragEnd(evt) {
        const imageListTemp = [...this.imageList]
        let newImageList = imageListTemp.filter((item, index) => {
          item.index = index
          return item.imageUrl && item.imageUrl != ''
        });
        // 给父组件发送指令
        this.$emit("images-change", {
          imageList: newImageList
        })
        let imageListItem = {}
        if(this.maxImgsNum) {
          // 验证上传图片文件数
          if(newImageList.length < this.maxImgsNum) {
            imageListItem.imageUrl = ''
            imageListItem.index = imageListTemp.length
            newImageList.push(imageListItem)
          }
        }else {
          imageListItem.imageUrl = ''
          imageListItem.index = imageListTemp.length
          newImageList.push(imageListItem)
        }
        this.imageList = newImageList
      },
      setItemIdx(idx) {
        if(this.imageUploadLoading) return
        this.currentUpFileIdx = idx
      },
      imageUploadReg (file) {
        const isPic = file.type === 'image/jpeg' || 'image/png'
        if (!isPic) {
          this.$tip.message('图片只能是JPG或PNG格式!', 'warning')
          return false
        }
        let isSizeNum = true
        if(this.imgSize) {
          // imgSize：参数有值，对图片大小验证
          let sizeValiTipStr = ''
          if(this.imgSize < 1024) {
            sizeValiTipStr = `${this.imgSize}KB`
          }else {
            sizeValiTipStr = `${this.imgSize / 1024}M`
          }
          if(file.size > this.imgSize * 1024) {
            isSizeNum = false
            this.$tip.message(`图片大小不能超过${sizeValiTipStr}！`, 'warning')
            return false
          }
        }
        let imgWidthHeightCheck = null
        if(this.width && this.height) {
          // 宽和高都检查
          const that = this
          imgWidthHeightCheck = new Promise(function(resolve, reject) {
            let _URL = window.URL || window.webkitURL
            let img = new Image();
            img.onload = function() {
              let valid = img.width == that.width && img.height == that.height
              valid ? resolve() : reject()
            }
            img.src = _URL.createObjectURL(file)
          }).then(() => {
            return file
          }, () => {
            this.$tip.message(`请上传宽度为: ${that.width}，高度为: ${that.height}像素，大小不超过${sizeValiTipStr}的JPG或PNG图片！`, 'warning')
            return Promise.reject()
          })
        }else if(this.width) {
          // 只检查宽度
          const that = this
          imgWidthHeightCheck = new Promise(function(resolve, reject) {
            let _URL = window.URL || window.webkitURL
            let img = new Image();
            img.onload = function() {
              let valid = img.width == that.width
              valid ? resolve() : reject()
            }
            img.src = _URL.createObjectURL(file)
          }).then(() => {
            return file
          }, () => {
            this.$tip.message(`请上传宽度为: ${that.width}像素，大小不超过${sizeValiTipStr}的JPG或PNG图片！`, 'warning')
            return Promise.reject()
          })
        }else if(this.height) {
          // 只检查高度
          const that = this
          imgWidthHeightCheck = new Promise(function(resolve, reject) {
            let _URL = window.URL || window.webkitURL
            let img = new Image();
            img.onload = function() {
              let valid = img.height == that.height
              valid ? resolve() : reject()
            }
            img.src = _URL.createObjectURL(file)
          }).then(() => {
            return file
          }, () => {
            this.$tip.message(`请上传高度为: ${that.height}像素，大小不超过${sizeValiTipStr}的JPG或PNG图片！`, 'warning')
            return Promise.reject()
          })
        }
        if((this.width && this.height) || this.width || this.height) {
          return isPic && isSizeNum && imgWidthHeightCheck
        }else {
          return isPic && isSizeNum
        }
      },
      emitUpload (e) {
        if(this.maxImgsNum) {
          if(this.imageList.length > this.maxImgsNum) {
            this.$tip.message(`最多只能上传${this.maxImgsNum}张图片！`, 'warning')
            return false
          }
        }
        this.imageUploadLoading = true
        this.getToken().then((res) => {
          // 开始上传图片
          let uploader = qiniu.upload(e.file, res.fileName, res.token)
          uploader.subscribe({
            error: () => {
              this.imageUploadLoading = false
            },
            complete: (res) => {
              this.imageUploadLoading = false
              const urlImage = `http://retailimg01.benlailife.com/${res.key}`
              this.imageList[this.currentUpFileIdx].imageUrl = urlImage
              let newImageList = this.imageList.filter(item => {
                return item.imageUrl && item.imageUrl != ''
              })
              // 给父组件发送指令
              this.$emit("images-change", {
                imageList: newImageList
              })
              if(this.maxImgsNum) {
                // 验证上传图片文件数
                if(newImageList.length < this.maxImgsNum) {
                  newImageList.push({
                    index: this.currentUpFileIdx + 1,
                    imageUrl: ''
                  })
                }
              }else {
                newImageList.push({
                  index: this.currentUpFileIdx + 1,
                  imageUrl: ''
                })
              }
              this.imageList = newImageList
            },
            next: res => {
            }
          })
        })
      },
      /**
       * [getToken 通过后台封装的接口获取七牛的token]
       * @param  {Function} callback [description]
       * @return {[type]}            [description]
       */
      getToken () {
        return this.$http.post(fileUrlList.getQiNiuToken, {}).then(res => {
          if (res.code == 0) {
            let token = res.data.token
            let fileName = res.data.key
            return {fileName, token}
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.imageUploadLoading = false
          this.$notify.error({
            title: '提示',
            message: e.message
          })
        })
      },
      deleteUpFile(idx) {
        if(this.imageUploadLoading) return
        this.imageList.splice(idx, 1)
        let newImageList = this.imageList.filter(item => {
          return item.imageUrl && item.imageUrl != ''
        })
        // 给父组件发送指令
        this.$emit("images-change", {
          imageList: newImageList
        })
        newImageList.push({
          index: newImageList.length,
          imageUrl: ''
        })
        newImageList.forEach((item, index) => {
          item.index = index
        })
        this.imageList = newImageList
      },
      onPreviewHandel(filePath) {
        this.bigImageUrl = filePath
        this.dialogVisible = true
      }
    }
  }
</script>