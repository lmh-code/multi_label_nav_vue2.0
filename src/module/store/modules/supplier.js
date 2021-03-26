import commonServer from '@/module/server/common'
const state = {
  vendors: [] // 用户有权限的供应商信息
}
const actions = {
  GET_VENDORS({commit}) {
    commonServer.getVendors().then(res => {
      if(res.code === 0) {
        commit('SET_VENDORS', res.data && res.data.length > 0 ? res.data : [])
        return
      }
      throw new Error(res.msg)
    }).catch(e => {
      console.log("获取有权限的供应商信息：", e.message);
    })
  }
}
const mutations = {
  SET_VENDORS(state, vendors) {
    state.vendors = vendors
  }
}
const getters = {
  VENDORS(state, getters) {
    return state.vendors
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
