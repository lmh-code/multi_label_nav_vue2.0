<style scoped lang="less">
  .bl-form-view {
    padding: 10px;
    background-color: @colorWhite;
    border-radius: 4px;
  }
</style>
<style lang="less">
  .bl-form-view .el-form .el-form-item {
    display: inline-block;
    margin-bottom: 2px;
    margin-right: 10px;
  }
  .bl-form-view.normal .el-form .el-form-item {
    margin-bottom: 22px;
  }

  .bl-form-view.mini .el-form .el-form-item .el-input {
    width: 120px;
  }
  .bl-form-view.mini .el-form .el-form-item .el-select {
    width: 120px;
  }
  .bl-form-view.mini .el-form .el-form-item .el-textarea {
    width: 120px;
  }
  .bl-form-view.small .el-form .el-form-item .el-input {
    width: 174px;
  }
  .bl-form-view.small .el-form .el-form-item .el-select {
    width: 174px;
  }
  .bl-form-view.small .el-form .el-form-item .el-textarea {
    width: 174px;
  }
  .bl-form-view.medium .el-form .el-form-item .el-input {
    width: 260px;
  }
  .bl-form-view.medium .el-form .el-form-item .el-select {
    width: 260px;
  }
  .bl-form-view.medium .el-form .el-form-item .el-textarea {
    width: 260px;
  }
  .bl-form-view.large .el-form .el-form-item .el-input {
    width: 320px;
  }
  .bl-form-view.large .el-form .el-form-item .el-select {
    width: 320px;
  }
  .bl-form-view.large .el-form .el-form-item .el-textarea {
    width: 320px;
  }

  .bl-form-view .el-form-item .el-form-item__label {
    padding: 0;
    line-height: 20px;
  }
  .bl-form-view .el-form .el-form-item .el-input.el-input--small.el-input-group.el-input-group--append, 
  .bl-form-view .el-form .el-form-item .el-input.el-input--small.el-input-group.el-input-group--prepend{
    top: 4px !important;
  }
</style>
<template>
  <div class="bl-form-view" :class="formSize">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    size: { // 表单内容条目宽度： mini 120px small 174 medium 260px large 320px
      type: String,
      default: 'small' 
    },
    mb: { // 表单条目上下之间的距离 normal： margin-bottom: 22px;
      type: String,
      default: 'none' 
    }
  },
  data() {
    return {
      formSize: 'small'
    }
  },
  watch: {
    size: {
      immediate: true,
      handler: function(newVal, oldVal) {
        this.formSize = newVal === 'mini' ? `mini ${this.mb}` : newVal === 'small' ? `small ${this.mb}` : newVal === 'medium' ? `medium ${this.mb}` : newVal === 'large' ? `large ${this.mb}` : `small ${this.mb}`
      }
    }
  }
}
</script>