<template>
  <div>
    <el-dialog :title="treeData.labelName" :visible.sync="isShow" class="dialog-tree" top="10vh" append-to-body>
      <el-row>
        <el-col>
          <el-input style="width:200px;" size="mini" placeholder="输入关键字进行过滤" v-model="filterTreeText"></el-input>
        </el-col>
      </el-row>
      <el-row style="max-height: 300px; margin-top:10px; overflow-y:scroll;border:1px solid #ececec;">
        <el-col :span="24">
          <el-tree
            :props="defaultProps"
            :data="treeData.treeData"
            show-checkbox
            node-key="id"
            :filter-node-method="filterTreeId"
            ref="tree"
            :default-expanded-keys="['00']"
            @check="handleNodeClick"
            @check-change="cityCheckChange">
          </el-tree>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="closeTreeDialog(true)">选择并关闭</el-button>
        <el-button size="mini" @click="closeTreeDialog(false)">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'

  const commonReport = {
    // 根据分类编号集合获取商品信息
    getGoodsListByCategoryNoList: '/foundation/c/p/goodsCategory/getGoodsListByCategoryNoList',
  }
  export default {
    name: 'tree-dialog',
    props: ['treeData', 'searchItems'],
    data () {
      return {
        isShow: false,
        filterTreeText: '', // 筛选
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        checkList: [],
      }
    },
    components: {
    },
    computed: {
    },
    mounted() {
    },
    watch: {
      filterTreeText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      show(checkList) {
        this.filterTreeText = ''
        this.isShow = true
        setTimeout(() => {
          if(checkList) {
            this.$refs.tree.setCheckedKeys(checkList);
          }
        }, 100)
      },
      filterTreeId(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        if(this.treeData.subType === 'selectOne') {
          let checkNodes = this.getSimpleCheckedNodes(this.$refs.tree.store)
          if(checkNodes.length > 1) {
            this.$refs.tree.setCheckedKeys([]);
            setTimeout(() => {
              this.$refs.tree.setCheckedNodes([data])
            }, 100)
          }
        }
      },
      getSimpleCheckedNodes(store) {
        const checkedNodes = [];
        const traverse = function(node) {
          const childNodes = node.root ? node.root.childNodes : node.childNodes;
          childNodes.forEach(child => {
            if (child.checked) {
              checkedNodes.push(child.data);
            }
            if (child.indeterminate) {
              traverse(child);
            }
          });
        };
        traverse(store)
        return checkedNodes;
      },
      cityCheckChange(data, checked, indeterminate) {
        if(checked && this.treeData.subType === 'selectOneCity') {
          let checkNodes = this.$refs.tree.getCheckedNodes(true)
          let cityId = '', sameCity = true
          if(data.children && data.children.length) {
            cityId = data.id
          }else{
            cityId = data.pid
          }
          checkNodes.forEach(item => {
            let checkId = item.pid
            if(checkId !== cityId) {
              sameCity = false
            }
          })
          if(sameCity === false) {
            this.$refs.tree.setCheckedKeys([]);
            setTimeout(() => {
              let keys = []
              keys.push(data.id)
              this.$refs.tree.setCheckedKeys(keys);
            }, 100)
          }
        }
      },
      closeTreeDialog(param) {
        if(param) {
          let checkNodes, checkNameArr, idList, checkNameVal
          if(this.treeData.parentNode) {
            checkNodes = this.getSimpleCheckedNodes(this.$refs.tree.store)
            checkNameVal = checkNodes[0].name
            idList = checkNodes[0].id
          }else{
            checkNodes = this.$refs.tree.getCheckedNodes(true)
            checkNameArr = []
            idList = []
            for(let item of checkNodes) {
              if(item.id) {
                checkNameArr.push(item.name)
                idList.push(item.id)
              }
            }
            checkNameVal = checkNameArr.join(',')
          }
          let data = {
            index: this.treeData.index,
            checkNameVal: checkNameVal,
            idList: idList
          }
          this.$emit('closeTreeDialog', data);
          // 处理选择分类返回商品逻辑
          if(this.treeData.type == 5 && this.treeData.subType == "returnGoods") {
            let categoryNoList = this.searchItems[this.treeData.columnName]
            this.$http.post(commonReport.getGoodsListByCategoryNoList, categoryNoList, true).then((res) => {
              let goodsNoList = []
              if(res.data && res.data.length) {
                res.data.forEach(item => {
                  if(item.goodsNo) {
                    goodsNoList = [...goodsNoList, item.goodsNo]
                  }
                })
                this.$emit('closeTreeDialog', {goodList: goodsNoList});
              }
            })
          }
        }
        this.isShow = false
      },
    }
  }
</script>
