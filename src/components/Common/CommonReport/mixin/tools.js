import config from '@/utils/config'
export default {
  methods: {
    queryMenuFromStorage(pageId) {
      let allMenusList = this.$storage.get("_menus") && this.$storage.get("_menus")[config.clientId] && this.$storage.get("_menus")[config.clientId].length > 0 ? this.$storage.get("_menus")[config.clientId] : []
      let filterMenu = allMenusList.filter(item => {
        return item.menuId === pageId
      })[0]
      return filterMenu
    }
  }
}
