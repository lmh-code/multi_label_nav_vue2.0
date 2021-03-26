<style scoped lang="less">
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
</style>
<style>
  .scroll-container.bl-tabs .el-scrollbar__wrap {
    overflow-y: hidden !important;
  }
  .scroll-container .el-scrollbar__bar {
    opacity: 0 !important;
    display: none !important;
  }
</style>
<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container bl-tabs" @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>
<script>
  const tagAndTagSpacing = 4 // tagAndTagSpacing
  export default {
    name: 'ScrollPane',
    data() {
      return {
        left: 0
      }
    },
    computed: {
      scrollWrapper() {
        return this.$refs.scrollContainer.$refs.wrap
      }
    },
    methods: {
      /**
       * @description: 鼠标滚动
       * @param {type} 
       * @return: 
       */
      handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 40
        const $scrollWrapper = this.scrollWrapper
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
      },
      moveToCurrentTag(currentTag) {
        const $container = this.$refs.scrollContainer.$el
        const $containerWidth = $container.offsetWidth
        const $scrollWrapper = this.scrollWrapper
        const $scrollWrapperWidth = $scrollWrapper.scrollWidth
        const tagList = this.$parent.$refs.tag

        let firstTag = null
        let lastTag = null

        if(tagList && tagList.length > 0) {
          firstTag = tagList[0]
          lastTag = tagList[tagList.length - 1]
        }
        if(firstTag === currentTag) {
          $scrollWrapper.scrollLeft = 0
        }else if(lastTag === currentTag) {
          // 36 这个数值是操作按钮（关闭标签，清空其他标签，清空所有标签）的宽度
          $scrollWrapper.scrollLeft = $scrollWrapperWidth - ($containerWidth - 36)
        }else {
          // 获取到当前标签的上一个和下一个标签
          const currentIndex = tagList.findIndex(item => item === currentTag)
          const prevTag = tagList[currentIndex - 1]
          const nextTag = tagList[currentIndex + 1]

          const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - prevTag.$el.offsetWidth
          const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth

          if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
            $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
          } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
            $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
          }
        }
      }
    }
  }
</script>