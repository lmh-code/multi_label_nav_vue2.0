// state
const state = {
  loading: '',
  userPermissionMap: {},
  currentDate: new Date().getTime()
}

// actions
const actions = {
  showLoading({ commit, state }, param) {
    commit('showLoading', param)
  },
  setUserOptions({commit, state}, param) {
    commit('setUserOptions', param)
  },
  setCurrentDate(state, param) {
    commit('setCurrentDate', param)
  }
}

// mutations
const mutations = {
  showLoading(state, param) {
    state.loading = param.showLoading
  },
  setUserOptions(state, param) {
    state.userPermissionMap = param
  },
  setCurrentDate(state, param) {
    state.currentDate = param
  }
}

const getters = {
  getLoading: (state, getters) => {
    return state.loading
  },
  getPermissionMap: (state, getters) => {
    return state.userPermissionMap
  },
  getCurrentDate(state, getters) {
    return state.currentDate
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
