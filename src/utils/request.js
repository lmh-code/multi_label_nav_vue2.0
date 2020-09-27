import ajax from './ajax'
import * as util from './utils'
/**
 * [processParams 格式化参数]
 * @param  {[type]} paramObj [description]
 * @return {[type]}          [description]
 */
function processParams (paramObj) {
  let arrayBool = Object.prototype.toString.call(paramObj) === '[object Array]'
  if(arrayBool) {
    return paramObj 
  }else {
    let params = {}
    for (let key in paramObj) {
      let item = paramObj[key]
      if (key.indexOf('_options') > -1) {
        continue
      }
      if (item instanceof Date) {
        item = util.formatDate(item)
      }
      if (typeof item !== 'undefined' && typeof item !== 'function' && item !== null && item !== 'null' && item !== undefined && item !== 'undefined' && item !== '') {
        params[key] = item
      }
    }
    return params 
  }
}

/**
 * [get get 请求]
 * @param  {[type]} url    [description]
 * @param  {[type]} params [description]
 * @param  {[type]} noParse [true 表示：不需要进行请求参数格式化  false或者不传 表示：要进行参数格式化]
 * @return {[type]}        [description]
 */
function get (url, params, noParse) {
  return noParse ? ajax.get(url, params) : ajax.get(url, processParams(params))
}

/**
 * [post post请求]
 * @param  {[type]} url     [description]
 * @param  {[type]} params  [description]
 * @param  {[type]} noParse [true 表示：不需要进行请求参数格式化  false或者不传 表示：要进行参数格式化]
 * @return {[type]}         [description]
 */
function post (url, params, noParse) {
  return noParse ? ajax.post(url, params) : ajax.post(url, processParams(params))
}
export default {
  get,
  post
}
