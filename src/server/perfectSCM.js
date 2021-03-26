import axios from '@/utils/request.js'
import requestUrl from '@/api/perfectSCM'

/**
 * @description: 检查应商名称是否存在[创建供应链账号之前调用]
 */
const beforeCreateVendorCheck = params => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.checkVendorName, {...params}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 通过短信验证码创建供应商账号
 */
const createVendorAccount = params => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.createVendorAccountBySmsCode, {...params}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 供应商系统账号登录，获取URL跳转信息，根据跳转信息做对应的跳转
 */
const getUrlGuide = () => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.getUrlGuide).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 获取供应商信息
 */
const getVendorInfo = params => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.vendorInfo, {...params}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 保存供应商信息
 */
const perfectSCMInfoHandle = params => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.perfectSCMInfo, {...params}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 更新供应商信息
 */
const updateSCMInfoHandle = params => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.editSCMInfo, {...params}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 修改供应商状态
 */
const editVendorStatus = params => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.editVendorStatus, {...params}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}
export default {
  beforeCreateVendorCheck,
  createVendorAccount,
  getUrlGuide,
  getVendorInfo,
  perfectSCMInfoHandle,
  updateSCMInfoHandle,
  editVendorStatus
}
