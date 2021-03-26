import commonServer from '@/server/Common'
import Storage from '@/utils/localStorage'
const state = {
  regionMains: [] // 获取有权限的业务主体信息
}
const actions = {
  GET_MAINS({commit}) {
    if(!Storage.get('accountSet')) {
      Storage.set('accountSet', {accountSet: 0, accountName: 0})
    }
    commonServer.getRegionMains().then(res => {
      if(res.code === 0) {
        commit('SET_MAINS', res.data && res.data.length > 0 ? res.data : [])
        return
      }
      throw new Error(res.msg)
    }).catch(e => {
      console.log("获取有权限的业务主体信息：", e.message);
    })
  }
}
const mutations = {
  SET_MAINS(state, regionMains) {
    if(Storage.get('accountSet')) {
      if(Storage.get('accountSet').accountSetName) {
        Storage.set('accountSet', {accountSet: 0, accountSetName: ''})
      } // 兼容老系统字段命名不一致问题
      let matched = regionMains.some(item => {
        return item.accountSet === Storage.get('accountSet').accountSet
      })
      if(!matched) Storage.set('accountSet', regionMains[0]) // 防止越权
    }else {
      Storage.set('accountSet', regionMains[0])
    }
    state.regionMains = regionMains
  }
}
const getters = {
  MAINS(state, getters) {
    return state.regionMains
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
