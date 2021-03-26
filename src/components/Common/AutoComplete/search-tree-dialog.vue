<template>
  <el-dialog :close-on-click-modal="false" append-to-body lock-scroll :modal="showShadow" :visible="showTreeDialog"
             :before-close="handleClose">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <div class="dialog-inner-tree">
      <el-tree
        :data="treeList"
        :show-checkbox="multiple"
        :node-key="treeKey"
        :default-expanded-keys="treeExpanded"
        :default-checked-keys="defaultTreeChecked"
        :props="treeDefaultProps"
        :filter-node-method="filterNode"
        @node-click="nodeClick"
        :ref="treeRefs"
        @check="nodeSelect">
      </el-tree>
    </div>
    <div class="dialog-confirm-conainer">
      <el-button size="small" @click="handleClose">取消</el-button>
      <el-button size="small" v-if="multiple" @click="handleCancel">清空</el-button>
      <el-button size="small" v-if="multiple" type="primary" @click="confirm">选择并关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 显示遮罩
    showShadow: {
      type: Boolean,
      default: true
    },
    treeData: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    treeKey: {
      type: String,
      default: 'id'
    },
    treeExpanded: {
      type: Array,
      default: () => []
    },
    treeChecked: {
      type: Array,
      default: () => []
    },
    treeDefaultProps: {
      type: Object,
      default: () => {
      }
    },
    treeRefs: {
      type: String,
      default: 'commonTree'
    },
    // 传入什么 返回什么 用作定位Index 等
    backFlag: {
      type: Object,
      default: () => {
      }
    }
  },

  data () {
    return {
      showTreeDialog: false,
      treeList: [],
      curSelectObj: {},
      filterText: '',
      defaultTreeChecked: []
    }
  },
  created () {
    this.showTreeDialog = this.show
    this.defaultTreeChecked = this.treeChecked
    this.treeList = [...this.treeData]
    this.selectLeafList = new Set()  // 选中的全部子集
  },
  methods: {
    handleClose () {
      this.$emit('closeDialog')
    },
    confirm () {
      if (this.multiple) {
        // let selectData = this.$refs[this.treeRefs].getCheckedNodes()
        // selectData = selectData.filter((item) => {
        //   return item[this.treeDefaultProps.children] == null || (Array.prototype.isPrototypeOf(item[this.treeDefaultProps.children]) && item[this.treeDefaultProps.children].length === 0)
        // })
        // this.$emit('onData', selectData)
        let selectList = Array.from(this.selectLeafList)
        let curSelectObj = {...this.curSelectObj}
        delete curSelectObj[this.treeDefaultProps.children]
        this.$emit('onData', {...curSelectObj, selectList, backFlag: this.backFlag})
      }
      // let selectList = Array.from(this.selectLeafList)
      // this.$emit('onData', selectList)
      this.handleClose()
    },
    handleCancel () {
      this.$refs[this.treeRefs].setCheckedNodes([])
      this.$emit('onData', {selectList: [], backFlag: this.backFlag})
      this.handleClose()
    },
    nodeClick (data) {
      console.log(data)
      if (!(data[this.treeDefaultProps.children] instanceof Array) && !this.multiple) {
        let backFlag = {backFlag: this.backFlag}
        this.$emit('onData', [{...backFlag, ...data}])
        this.handleClose()
      }
    },
    /**
     * filter 联动的处理filter的方法
     * @param value
     * @param data
     * @returns {boolean}
     */
    filterNode (value, data) {
      if (!value) return true;
      return data[this.treeDefaultProps.label].indexOf(value) !== -1;
    },
    /**
     * 多选处理数组 存在选中其中一项 再选全选 在取消全选 应该列表为空 但是还是有第一次选中的一项
     * 暂时弃用
     * @param data
     */
    nodeSelect (data) {
      if (this.curSelectObj[this.treeKey] === data[this.treeKey]) {
        this.$refs[this.treeRefs].setCheckedKeys([])
        this.selectLeafList = new Set()
        this.curSelectObj = {}
      } else {
        this.selectLeafList = new Set()
        this.$refs[this.treeRefs].setCheckedKeys([data[this.treeKey]]);
        this._getLifeList(data, this.treeDefaultProps.children)
        this.curSelectObj = data
      }
    },
    _getLifeList (data, props) {
      if (data[props] instanceof Array) {
        for (let item of data[props]) {
          this._getLifeList(item, props)
        }
        return
      }
      if (this.selectLeafList.has(data)) {
        this.selectLeafList.delete(data)
      } else {
        this.selectLeafList.add(data)
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.commonTree.filter(val);
    },
    show (newValue) {
      this.showTreeDialog = newValue
    },
    treeData (newValue) {
      this.treeList = newValue
    },
    treeChecked (newValue) {
      this.defaultTreeChecked = newValue
    }
  }
}
</script>

<style scoped>
.dialog-confirm-conainer {
  text-align: center;
  padding-top: 30px;
}

.dialog-inner-tree {
  max-height: 500px;
  overflow-y: scroll;
}

</style>
