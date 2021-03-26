const state = {
  researchMap: {}
}
const mutations = {
  SET_RESEARCH_STATE(state, key) {
    if(!key) return
    state.researchMap[key] = true
  },
  SET_UNRESEARCH_STATE(state, key) {
    if(!key) return
    state.researchMap[key] = false
  },
  DELETE_RESEARCH_STATE(state, key) {
    delete state.researchMap[key]
  }
}
const getters = {
  RESEARCH_MAP(state, getters) {
    return state.researchMap
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters
}
