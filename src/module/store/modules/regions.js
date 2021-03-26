import commonServer from '@/module/server/common'
const state = {
  regionsList: [] // 用户有权限的区域信息
}
const actions = {
  GET_REGIONS({commit}) {
    commonServer.getRegions().then(res => {
      if(res.code === 0) {
        commit('SET_REGIONS', res.data && res.data.length > 0 ? res.data : [])
        return
      }
      throw new Error(res.msg)
    }).catch(e => {
      console.log("获取有权限的区域信息：", e.message);
    })
  }
}
const mutations = {
  SET_REGIONS(state, regions) {
    state.regionsList = regions
  }
}
const getters = {
  REGIONS(state, getters) {
    return state.regionsList
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
