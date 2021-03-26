<template>
  <div class="rel">
    <span class="btn">请选择文件</span>
    <div class="chooseFile">{{fileName}}</div>
    <input class="btn-input" type='file' accept='.xlsx, .xls' @change="uploadHandle" @click="(e) => {e.target.value = '';}"/>
    <span class="btn-download" @click="doExportDataHandel">下载模板</span>
    <div class="pop-content">
      <slot></slot>
      <!-- {Array.isArray(this.props.children) ?
      this.props.children.map((child) => {
          return this.renderChild(child)
      }) : this.props.children && this.renderChild(this.props.children)} -->
    </div>
  </div>
</template>

<script>
import exportExcel from '@/utils/exportExcel'
export default {
  
  data() {
    return {
      // requireCheckTotal: '',
      // maxTotal: '',
      fileName: '',
    }
  },
  props: {
    requireCheckTotal:'',
    maxTotal:'',
  },
  methods: {
    uploadHandle(e) {
      let _this = this
      this.$emit('uploadEmit')
      let file = e.target.files[0] || {name: ''}
      exportExcel.parseToJSON(file).then(res => {
        if(_this.requireCheckTotal && res && (res.length > _this.maxTotal)) {
          message.warn(`一次限导入${_this.maxTotal}条`)
          return
        }
        if(res && res.length) {
          this.fileName = file.name
          this.importHandle(res)
        }
      }, err => {
        console.log(err)
      })
    },

    doExportDataHandel() {
      this.$emit('doExportDataHandel')
    },

    importHandle(res) {
      this.$emit('importHandle', res)
    },

    renderChild(child) { // 控制内容的分发
      return child
      // if (child.props.detail) {
      //     return <div className="left" key="left">{child}</div>
      // } else if (child.props.error) {
      //     return <div className="right" key="right">{child}</div>
      // } else if (child.props.center) {
      //     return <div className="center" key="center">{child}</div>
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.chooseFile {
  position: absolute;
  top: 0px;
  left: 80px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  width: 320px;
  height: 28px;
  padding: 0 10px;
  line-height: 28px;
}
.btn-input {
  margin-left: 10px;
  width: 330px;
  opacity: 0;
}
.btn {
  color: #000;
}
.btn-download {
  color: blue;
}
.rel {
  position: relative;
}
</style>