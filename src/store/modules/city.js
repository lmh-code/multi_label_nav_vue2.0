import commonServer from '@/server/Common'
import Storage from '@/utils/localStorage'
const state = {
  cityList: [] // 获取有权限的城市信息
}
const actions = {
  GET_CITYS({commit}) {
    if(!Storage.get('_city')) {
      Storage.set('_city', {cityId: 0, cityName: ''})
    }
    commonServer.getCityListForZT().then(res => {
      if(res.code === 0) {
        commit('SET_CITYS', res.data && res.data.length > 0 ? res.data : [])
        return
      }
      throw new Error(res.msg)
    }).catch(e => {
      console.log("获取有权限的城市信息：", e.message);
    })
  }
}
const mutations = {
  SET_CITYS(state, cityList) {
    if(Storage.get('_city')) {
      let matched = cityList.some(item => {
        return item.cityId === Storage.get('_city').cityId
      })
      if(!matched) Storage.set('_city', cityList[0]) // 防止越权
    }else {
      Storage.set('_city', cityList[0])
    }
    state.cityList = cityList
  }
}
const getters = {
  CITYS(state, getters) {
    return state.cityList
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
