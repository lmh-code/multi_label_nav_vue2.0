const state = {
  loginInfo: {}
}
const mutations = {
  SET_LOGIN_INFO(state, loginInfo) {
    state.loginInfo = loginInfo
  }
}
const getters = {
  GET_LOGIN_INFO(state, getters) {
    return state.loginInfo
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters
}
