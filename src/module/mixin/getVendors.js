
/**
 * @description: 列表页中需要用到用户有权限的供应商时混入
 * @param {*}
 * @return vendors {Array} 用户有权限的供应商
 */
import {mapGetters} from 'vuex'
export default {
  created() {
    if(!this.vendors || this.vendors.length === 0) {
      this.$store.dispatch("supplier/GET_VENDORS")
    }
  },
  computed: {
    ...mapGetters({
      vendors: 'supplier/VENDORS'
    })
  }
}
