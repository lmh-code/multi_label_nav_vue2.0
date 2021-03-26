import {mapGetters} from 'vuex';
export default {
  activated() {
    if(this.researchMap[this.$route.path] && this.doSearchHandle) {
      this.doSearchHandle()
      this.$jump.researched(this.$route.path)
    }
  },
  computed: {
    ...mapGetters({
      researchMap: 'research/RESEARCH_MAP'
    })
  }
}
