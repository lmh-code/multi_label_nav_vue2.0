<template>
  <el-pagination 
    v-if="showPagination" 
    class="tc mt20" 
    :size="size"
    background 
    @size-change="changeSize"
    @current-change="changeCurrent" 
    :current-page.sync="currentPage" 
    :page-sizes="pageSizesDesign"
    :pager-count="pagerCount"
    layout="total, sizes, prev, pager, next, jumper" 
    :total="total">
  </el-pagination>
</template>
<script>
import constant from '@/utils/constant'
export default {
  props: {
    showPagination: {
      type: Boolean,
      default: true
    }, // 是否显示分页条
    size: {
      type: String,
      default: 'small'
    },
    pageNum: {
      type: Number,
      default: 1
    }, 
    pageSizes: {
      type: Array | Number,
      default: () => {
        return constant.pageSizeStart10 || []
      }
    }, 
    total: {
      type: Number,
      default: 0
    },
    pagerCount: {
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSizesDesign: constant.pageSizeStart10
    }
  },
  watch: {
    pageNum(newVal) {
      this.currentPage = newVal
    },
    pageSizes: {
      immediate: true,
      handler: function(newVal) {
        if(Array.isArray(newVal)) {
          this.pageSizesDesign = [...newVal]
        }else if(newVal === 10) {
          this.pageSizesDesign = constant.pageSizeStart10
        }else if(newVal === 20) {
          this.pageSizesDesign = constant.pageSizeStart20
        }else {
          this.pageSizesDesign = constant.pageSizeStart10
        }
      }
    }
  },
  methods: {
    changeSize(value) {
      this.$emit("size-change", value)
    },
    changeCurrent(value) {
      this.$emit("current-change", value)
    }
  }
}
</script>