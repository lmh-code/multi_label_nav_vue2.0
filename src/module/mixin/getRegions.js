import {mapGetters} from 'vuex'
export default {
  created() {
    if(!this.regionsList || this.regionsList.length === 0) {
      this.$store.dispatch("regions/GET_REGIONS")
    }
  },
  computed: {
    ...mapGetters({
      regionsList: 'regions/REGIONS'
    })
  }
}
