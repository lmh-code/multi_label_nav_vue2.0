<style scoped>
  .page-view {
    height: 100%;
  }
</style>
<script type="text/jsx">
import BlKeepAlive from "./BlKeepAlive"
export default {
  name: "PageView",
  functional: true,
  props: {
    include: {
      type: Array,
      default: () => []
    },
    transitionName: {
      type: String,
      default: 'el-fade-in-linear'
    },
    cacheable: {
      type: Boolean,
      default: true
    }
  },
  render(h, context) {
    const {include, transitionName, cacheable} = context.props
    return cacheable ? <BlKeepAlive include={include}>
      <transition name={transitionName} mode="out-in">
        <router-view />
      </transition>
    </BlKeepAlive> : <transition name={transitionName} mode="out-in">
      <router-view/>
    </transition>
  }
}
</script>
