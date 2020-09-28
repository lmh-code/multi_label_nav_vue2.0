// state
const state = {
  loading: '',
  collapse: false,
  userPermissionMap: {},
  currentDate: new Date().getTime()
}

// actions
const actions = {
  showLoading({ commit, state }, param) {
    commit('showLoading', param)
  },
  setCollapse({commit}, param) {
    commit("setCollapse", param)
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
  setCollapse(state, param) {
    state.collapse = param
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
  getCollapse(state, getters) {
    return state.collapse
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
