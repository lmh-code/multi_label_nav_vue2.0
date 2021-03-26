<style scoped>
  .flexWrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .checkboxItem {
    width: 20%;
    margin-right: 0;
    padding-right: 10px;
    overflow: hidden;
  }
</style>
<template>
  <el-dialog 
    :close-on-click-modal = "false"
    :close-on-press-escape = "false"
    :show-close="false"
    :title="title" 
    :visible.sync="visible" 
    width='600px'>
    <div>
      <el-checkbox 
        :indeterminate="isIndeterminate" 
        v-model="checkAll" 
        @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group 
        class="mt10 flexWrap"
        v-model="defaultChecked" 
        @change="handleCheckedChange">
        <el-checkbox 
          class="checkboxItem"
          v-for="(item, index) in options" 
          :label="item" 
          :key="index">{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false" size="mini">取消</el-button>
      <el-button type="primary" @click="confirm" size="mini" :loading="isDisabled">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import requestUrl from '@/module/api/buyAndSale'
export default {
  props: {
    title: { // 标题
      type: String,
      default: '-'
    },
    moduleId: { // 页面路径中的moduleId 
      type: String,
      default: ''
    },
    options: { // 可选列字段
      type: Array,
      default: () => []
    },
    default: { // 默认选中的列字段
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      visible: false,
      isDisabled: false,
      checkAll: false,
      isIndeterminate: true,
      defaultChecked: []
    }
  },
  methods: {
    setDefaultMsg() {
      this.visible = true
      this.getColumnDetail()
    },
    getColumnDetail() {
      this.loading = true
      this.$http.post(`${requestUrl.moduleIdDetail}${this.moduleId}`).then(res => {
        this.loading = false
        if(res.code === 0) {
          this.defaultChecked = res.data && res.data.text ? res.data.text.split(',') : this.default
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    handleCheckAllChange(val) {
      this.defaultChecked = val ? this.options : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
    },
    confirm() {
      if(!this.defaultChecked || this.defaultChecked.length === 0) {
        this.$tip.message('请选择要打印的列', 'warning')
        return
      }
      this.isDisabled = true
      this.$http.post(requestUrl.savePrintDetail, {
        moduleId: this.moduleId,
        text: this.defaultChecked && this.defaultChecked.length > 0 ? this.defaultChecked.join(',') : ''
      }).then(res => {
        this.isDisabled = false
        if(res.code === 0) {
          this.$emit("confirm", this.defaultChecked)
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.isDisabled = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    }
  }
}
</script>