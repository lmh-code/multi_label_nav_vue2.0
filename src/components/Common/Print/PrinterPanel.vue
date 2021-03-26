<style lang="less" scoped>
.print-panel {
  width: 246px;
  border-right: 1px solid @colorBorder;
}
</style>
<template>
  <div class="print-panel">
    <div>
      <div v-if="preview && !isWebPrint">
        <el-button type="primary" @click="onPreview" size="small" icon="el-icon-printer">点击预览新组件打印</el-button>
      </div>
      <div class="mt20" v-if="showDesign && !isWebPrint">
        <el-button @click="onDesign" size="small" icon="el-icon-printer">手动调整新组件并预览打印</el-button>
      </div>
      <div class="mt20" v-if="!installed && !isWebPrint">
        <el-button @click="downloadComponent" size="small" icon="el-icon-download">下载打印组件</el-button>
      </div>
      <div class="mt20">
        <el-button @click="webPrint" size="small" icon="el-icon-printer">使用普通网页打印</el-button>
      </div>
      <div class="mt20" v-if="paperSizeSetShow">
        <div>
          纸张宽度:
          <el-input 
            style="width: 80px;" type="default" size="small" placeholder="纸张宽度" v-model="paperWidth"/>
        </div>
        <div style="margin-top: 10px;">
          纸张高度:
          <el-input style="width: 80px;" type="default" size="small" placeholder="纸张高度" v-model="paperHeight"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Printer from './printer'
export default {
  data() {
    return {
      installed: true,
      paperWidth: 21.70,
      paperHeight: 13.90
    }
  },
  props: {
    preview: {
      type: Boolean, 
      default: true
    },
    showDesign: {
      type: Boolean, 
      default: false
    },
    isWebPrint: {
      type: Boolean, 
      default: false
    },
    // 显示纸张大小设置开关
    paperSizeSetShow: {
      type: Boolean, 
      default: false
    }
  },
  components: {},
  created() {
    if(!this.isWebPrint) this.injectComponent()
  },
  mounted() {
    this.$emit('paperWidth', this.paperWidth * 100)
    this.$emit('paperHeight', this.paperHeight * 100)
  },
  watch: {
    paperWidth(newValue, oldValue) {
      if (oldValue === newValue) {
        return
      }
      let reg = /\d+\.{0,1}\d{0,2}/g
      let finNum = ''
      let finalData = newValue.match(reg)
      clearTimeout(this.timer)
      if (finalData && finalData.length) {
        finNum = finalData[0]
      }
      this.timer = setTimeout(() => {
        this.paperWidth = finNum
        if (finNum.toString().trim() !== '') {
          console.log('paperWidth', finNum)
          this.$emit('paperWidth', parseFloat(finNum) * 100)
        }
      }, 20)
    },
    paperHeight(newValue, oldValue) {
      if (oldValue === newValue) {
        return
      }
      let reg = /\d+\.{0,1}\d{0,2}/g
      let finNum = ''
      let finalData = newValue.match(reg)
      clearTimeout(this.timer)
      if (finalData && finalData.length) {
        finNum = finalData[0]
      }
      this.timer = setTimeout(() => {
        this.paperHeight = finNum
        if (finNum.toString().trim() !== '') {
          this.$emit('paperHeight', parseFloat(finNum) * 100)
        }
      }, 20)
    }
  },
  methods: {
    injectComponent() {
      var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
      var socket = document.createElement('script')
      if (/^http:/.test(window.location.protocol)) { // http
        socket.src = 'http://localhost:8000/CLodopfuncs.js';
      } else {
        socket.src = 'https://localhost:8443/CLodopfuncs.js?priority=1'
      }
      head.insertBefore(socket, head.firstChild)
      socket.onload = socket.onerror = () => {
        this.checkInstallation()
      }
    },
    onPreview() {
      this.$emit('onPreview')
    },
    onDesign() {
      this.$emit('onDesign')
    },
    checkInstallation() {
      if (Printer.checkInstallation()) {
        return
      }
      this.installed = false
      this.$msgbox({
        title: '温馨提示',
        message: '打印组件未安装，请下载安装后刷新页面重试。如已安装，请运行组件后刷新页面重试',
        showCancelButton: true,
        confirmButtonText: '下载安装',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.downloadComponent()
          this.$msgbox({
            title: '温馨提示',
            message: '我已安装，点击刷新页面',
            showCancelButton: true,
            confirmButtonText: '刷新页面',
            cancelButtonText: '取消'
          }).then(action => {
            if (action === 'confirm') {
              window.location.reload()
            }
          }).catch(() => {
          })
        }
      }).catch(() => {
      })
    },
    downloadComponent() {
      window.open('https://retailimg01.benlailife.com/CLodop_Setup_for_Win32NT_https_3.046Extend.exe')
    },
    webPrint() {
      this.$emit('windowPrint')
    }
  }
}
</script>
