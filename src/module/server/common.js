import ajax from '@/utils/request'
import commonUrl from '@/module/api/common'
import Storage from '@/utils/localStorage'
/**
 * @description: 获取用户有权限的供应商
 */
const getVendors = () => {
  let userNo = Storage.get('loginInfo') ? Storage.get('loginInfo').UserNO : ''
  return new Promise((resolve, reject) => {
    ajax.post(commonUrl.getVendors, {"requireVendorName": true, userNo}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}
/**
 * @description: 获取用户有权限的商品信息
 */
const getRegions = () => {
  return new Promise((resolve, reject) => {
    ajax.get(commonUrl.getRegions).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

export default {
  getVendors,
  getRegions
}
