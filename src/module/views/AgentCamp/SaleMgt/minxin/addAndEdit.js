import requestUrl from '@/module/api/saleMgtUrl'
export default {
  created() {
    if(!this.regionsList || this.regionsList.length === 0) {
      this.$store.dispatch("supplier/GET_REGIONS")
    }
  },
  computed: {
    ...mapGetters({
      regionsList: 'supplier/REGIONS'
    })
  }
}
