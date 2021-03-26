import axios from '@/utils/request.js'
import requestUrl from '@/api/Common'
import config from '@/utils/config'
/**
 * @description: 通过接口导出指定类型的文件操作
 * @param url          {string} 请求接口地址
 * @param params       {object} 请求接口参数
 * @param title        {string} 导出文件名称
 * @param blobType     {string} 导出的流的类型(默认csv文件)
 * @param fileExtent   {string} 文件后缀(默认.csv文件)
 * @return {*}
 */
const exportHandle = (url, params, title, blobType, fileExtent) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {}, 'blob').then(res => {
      const blob = new Blob([res], {
        type: blobType ? blobType : 'text/csv,charset=UTF-8'
      })
      const elink = document.createElement('a');
      elink.download = (title ? title : new Date().toLocaleString()) + (fileExtent ? fileExtent : '.csv');
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click(); // 点击下载
      document.body.removeChild(elink); // 下载完成移除元素
      window.URL.revokeObjectURL(elink.href); // 释放掉blob对象
      return resolve(true)
    }).catch(e => {
      return reject(e)
    });
  })
}

const loginHandel = params => {
  params.system = config.clientId || null
  return new Promise((resolve, reject) => {
    axios.postP(requestUrl.login, {...params}, {urlType: 1}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

const refreshLoginHandel = params => {
  return new Promise((resolve, reject) => {
    axios.postP(requestUrl.login, {...params}, {urlType: 1}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

const getSmsCodeHandel = params => {
  return new Promise((resolve, reject) => {
    axios.postP(`${requestUrl.smsCode}${params.phone}`, {...params}, {urlType: 1}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 发送短信验证码，仅用于修改供应链密码
 * @param {*} params
 */
const vendorSmsCodeForUpdPwd = params => {
  params.mobile = params.phone
  delete params.phone
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.vendorSmsCodeForUpdPwd, {...params}, {urlType: 1}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

const updatePasswordBySmsCode = params => {
  // clientId: 6 为供应商
  let reqUrlPath = config.clientId === 6 ? requestUrl.updateVendorPasswordBySmsCode : requestUrl.updatePasswordBySmsCode
  return new Promise((resolve, reject) => {
    axios.post(reqUrlPath, {...params}, {urlType: 1}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 通过指定code获取共通资料中的信息
 * @param {*} params
 * @return {*}
 */
const getByCommonCodes = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.listByCommonCodes, params).then(res => {
      if(res.code === 0) {
        return resolve(res.data)
      }
      throw new Error(res.msg)
    }).catch(e => {
      console.log("[获取共通资料数据]：", e.message);
      return reject(e)
    })
  })
}

/**
 * @description: 通用控件-一级分类 
 */
const getFirstCategory = () => {
  return new Promise((resolve, reject) => {
    axios.get(requestUrl.getFirstCategory).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 获取省份信息
 */
const getProvinceList = () => {
  return new Promise((resolve, reject) => {
    axios.get(requestUrl.provinceList).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 根据省份获取市的信息
 */
const getCityList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${requestUrl.cityList}${params.pId}`).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 查询银行列表 
 */
const getBankList = params => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.bankList, {...params}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 获取区域信息，树形数据
 */
const getRegionTree = params => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.regionTree, {...params}).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 【FMS专用】获取用户有权限的供应商
 */
const getRegionMains = () => {
  return new Promise((resolve, reject) => {
    axios.post(requestUrl.getUserAccountSetList).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

/**
 * @description: 获取用户有权限的城市列表
 */
const getCityListForZT = () => {
  return new Promise((resolve, reject) => {
    axios.get(requestUrl.userStoreCityList).then(res => {
      return resolve(res)
    }).catch(e => {
      return reject(e)
    })
  })
}

export default {
  exportHandle,
  getByCommonCodes,
  loginHandel,
  refreshLoginHandel,
  getSmsCodeHandel,
  vendorSmsCodeForUpdPwd,
  updatePasswordBySmsCode,
  getFirstCategory,
  getProvinceList,
  getCityList,
  getBankList,
  getRegionTree,
  getRegionMains,
  getCityListForZT
}
