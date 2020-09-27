import axios from 'axios'
import Storage from './localStorage'
import config from './config'
// 设置baseUrl
let baseUrl = config.reqUrl
// 设置超时时间
axios.defaults.timeout = 60000;
// 允许跨域配置
axios.defaults.withCredentials = true;

let requestMap = {}
/**
 * [setHeaders 设置请求头]
 * @return {[type]}          [description]
 */
function setHeaders () {
  let loginInfo = Storage.get('loginInfo') || {}
  let headers = {}
  headers['Authorization'] = `${loginInfo.token_type} ${loginInfo.access_token}`
  headers['device_type'] = 'web'
  headers['version'] = '2.0.1'
  headers['Content-Type'] = 'application/json;charset=UTF-8'
  return headers
}

/**
 * [handleError 接口抛异常处理]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
function handleError (response) {
  if(response == undefined) {
    // Provisional headers are shown 或者请求超时情况
    return {code: "Provisional headers are shown", msg: '未收到服务器响应', status: 504}
  }
  if (response.status === 400) {
    return {code: response.data.error, msg: response.data.error_description, status: response.status}
  }
  if (response.status === 401) {
    Storage.remove('loginInfo')
    sessionStorage.clear()
    window.location.replace(`${config.baseRouter}/login?status=401`)
    return
  }
  if (response.status === 403) {
    return {code: response.data.error, msg: response.data.error_description, status: response.status}
  }
  if (response.status === 404) {
    return {code: response.data.error, msg: "请求接口未找到", status: response.status}
  }
  if (response.status === 500) {
    return {code: response.data.error, msg: "内部服务器错误", status: response.status}
  }
  if (response.status === 504) {
    return {code: response.data.error, msg: "请求接口超时", status: response.status}
  }
  return {
    code: response.data.error,
    msg: response.data.error_description || response.statusText,
    status: response.status
  }
}

/**
 * [get ajax get请求]
 * @param  {[type]}   url      [description]
 * @param  {Object}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function get (url, params = {}, callback) {
  url = baseUrl + url
  let key = url + '_' + JSON.stringify(params)
  if (requestMap[key]) {
    return requestMap[key]
  }

  let res = {}
  let promise = axios.get(url, { params: params, headers: setHeaders() }).then(function (response) {
    delete requestMap[key]
    let res = response.data
    return res
  }).catch(function ({response}) {
    delete requestMap[key]
    return handleError(response)
  })
  if (callback) {
    promise = promise.then(callback)
  }

  requestMap[key] = promise
  return promise
}

/**
 * [post ajax post请求]
 * @param  {[type]}   url      [description]
 * @param  {Object}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function post (url, params = {}, callback) {
  url = baseUrl + url
  let key = url + '_' + JSON.stringify(params)
  if (requestMap[key]) {
    return requestMap[key]
  }

  let promise = axios.post(url, params, { headers: setHeaders() }).then(function (response) {
    delete requestMap[key]
    let res = response.data
    return res
  }).catch(function ({response}) {
    delete requestMap[key]
    return handleError(response)
  })
  if (callback) {
    promise = promise.then(callback)
  }

  requestMap[key] = promise
  return promise
}

export default {
  get,
  post
}
