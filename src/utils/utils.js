import store from '../store';
import config from './config';
import Storage from './localStorage';
/**
 * js 工具类
 */

/**
 * 推荐使用此方法格式化日期
 * @description: 将时间戳转换成制定格式的日期
 * @param {fmt} 要转化成的时间格式 yyyy/MM/dd HH:mm:ss 任意变化
 * @param {_timestamp} 时间戳 默认3位长度 10位长度会乘以1000
 * @return: 格式化之后的时间
 */
export function dateFormat (fmt, _timestamp) {
  if(_timestamp.toString().length === 10) {
    _timestamp = _timestamp * 1000
  }
  let date = new Date(_timestamp)
  let ret;
  let opt = {
    "y+": date.getFullYear().toString(),
    "M+": (date.getMonth() + 1).toString(),
    "d+": date.getDate().toString(),
    "H+": date.getHours().toString(),
    "m+": date.getMinutes().toString(),
    "s+": date.getSeconds().toString()
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}
export function timestampToTimeNoHMS(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
  return Y + M + D;
}

/**
 * isKeyInArray 检查对象中是否含有某一个key
 * @param k {String} key的值
 * @param array {Array} 被检查数组
 * @returns {boolean} true：存在   false：不存在
 */
export function isKeyInArray (k, array) {
  let val = false
  for (let item of array) {
    if (val) {
      break
    }
    if (typeof (item) === 'object') {
      for (let key of Object.keys(item)) {
        if (k === item[key]) {
          val = true
          break
        }
      }
    }
  }
  return val
}

/**
 * removeItemByKey 通过某一个key移除对象数组中某一项
 * @param k {String}
 * @param array {Array}
 */
export function removeItemByKey (k, array) {
  array.forEach((item, index) => {
    if (typeof (item) === 'object') {
      for (let key of Object.keys(item)) {
        if (k === item[key]) {
          array.splice(index, 1)
          break
        }
      }
    }
  })
}

/**
 * findIndexByKey 通过key获取元素在数组中的位置
 * @param k {String}
 * @param array {Array}
 * @returns {number} 索引
 */
export function findIndexByKey (k, array) {
  let val = -1
  array.forEach((item, index) => {
    if (typeof (item) === 'object') {
      for (let key of Object.keys(item)) {
        if (k === item[key]) {
          val = index
          break
        }
      }
    }
  })
  return val
}

/**
 * getUrlPath 获取url的最后一个path
 * @returns {string}
 */
export function getUrlPath () {
  const url = location.href
  let path = url.slice(url.lastIndexOf('/') + 1, url.indexOf('?') === -1 ? url.length : url.indexOf('?'))
  return path
}

/**
 * @param obj {Object} {a: 1, b: 2}
 * @returns {string} 格式化之后的内容，如：key=value&key=value
 */
export function toUrlFormat (obj) {
  let str = ''
  for (let key of Object.keys(obj)) {
    str += obj[key] && `${key}=${obj[key]}&`
  }
  str = str.substr(0, str.length - 1)
  return str
}


/**
 * toUpperFirstLetter 生成新的json对象，第一个字符转大写
 * @param obj {Object}
 * @returns {Object}
 */
export function toUpperFirstLetter (obj) {
  const newObj = {}
  for (let key of Object.keys(obj)) {
    let newKey = key.substr(0, 1).toUpperCase() + key.substr(1)
    newObj[newKey] = obj[key]
  }
  return newObj
}

/**
 * isWeChat 是否是微信浏览器打开
 * @returns {boolean}
 */
export function isWeChat () {
  return !!navigator.userAgent.match(/MicroMessenger/i)
}

/**
 * isMobile 是否是移动端
 * @returns {boolean}
 */
export function isMobile () {
  return !!navigator.userAgent.match(/(iPhone|iPod|Android|iOS|iPad|Mobile)/i)
}

/**
 * [moneyToFixed 金额保留两位小数]
 * @param  {[type]} _money [description]
 * @return {[type]}        [description]
 */
export function moneyToFixed(_money) {
  if(_money == null || _money == undefined) {
    return
  }
  if(_money != "") {
    return parseFloat(_money).toFixed(2)
  }else {
    return '0.00'
  }
}

/**
 * [showLoading 展示loading]
 * @return {[type]} [description]
 */
export function showLoading() {
  // 展示loading
  let param = {
    showLoading: true
  }
  store.dispatch('common/showLoading', param)
}

/**
 * [clearLoading 清除全局loading]
 * @param  {[type]} _val [description]
 * @return {[type]}      [description]
 */
export function clearLoading() {
  // 清除loading
  let param = {
    showLoading: false
  }
  store.dispatch('common/showLoading', param)
}

/**
 * @description: 退出登录
 */
export function loginOut(path) {
  Storage.remove('loginInfo')
  sessionStorage.clear()
  path = path ? `${config.baseRouter}${path}` : `${config.baseRouter}/login`
  window.location.replace(path)
}

/**
 * [indexof 获取数组某项元素的位置]
 */
export function indexInArr(arr, item) {
  if(Array.prototype.indexOf) {
    return arr.indexOf(item)
  }else {
    for(var i = 0; i <= arr.length; i++) {
      if(arr[i] == item) {
        return i
      }
    }
  }
}

/**
 * [removeEl 从数组中移除指定项]
 */
export function removeElFromArr(arr, item) {
  return arr.filter(function(ele) {
    return ele != item
  })
}

/**
 * [compareKey 一个对象数组，根据对象中的一个属性排序(制定key的值越小越靠前)]
 * @param  {[type]} pName [description]
 * @return {[type]}       [description]
 */
export function compareKey(pName) {  
  return function(obj1, obj2) {  
    var val1 = obj1[pName];  
    var val2 = obj2[pName];  
      
    if(val1 < val2) {  
      return -1;  
    }else if(val1 > val2) {  
      return 1;  
    }else{  
      return 0;  
    }  
  }  
}  

/**
 * [getSubtract 数组对象求差集]
 * @param  {[type]} unionArr  [description]
 * @param  {[type]} subsetArr [description]
 * @return {[type]}           [description]
 */
export function getSubtract(unionArr, subsetArr, keyStr) {
  let newTmp = []
  for(let i = 0; i < unionArr.length; i++) {
    let flag = true
    for(let j = 0; j < subsetArr.length; j++) {
      if(unionArr[i][keyStr] == subsetArr[j][keyStr]) {
        flag = false
        break
      }
    }
    if(flag) {
      newTmp.push(unionArr[i])
    }
  }
  return newTmp
}
/**
 * [moveArrItem 移动数组位置]
 * @param  {[type]} arr    [数组]
 * @param  {[type]} index1 [当前位置]
 * @param  {[type]} index2 [要移动的位置]
 * @return {[type]}        [description]
 */
export function moveArrItem(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

/**
 * [changeStrToMinutes 将时分秒转换为分钟数]
 * @param  {[type]} _str [description]
 * @return {[type]}      [description]
 */
export function changeStrToMinutes(_str) {
  let minutesArr = _str.split(":")
  if(minutesArr[2]) {
    let seconds = parseInt(minutesArr[0]) * 60 * 60 + parseInt(minutesArr[1]) * 60 + parseInt(minutesArr[2])
    return seconds
  }else {
    let seconds = parseInt(minutesArr[0]) * 60 * 60 + parseInt(minutesArr[1]) * 60
    return seconds
  }
}

/**
 * [removeItemByKeyVal 通过指定的key和value移除对象数组中某一项]
 * @param  {[type]} key   [指定对比的key 接收的是string]
 * @param  {[type]} val   [指定对比的key的值]
 * @param  {[type]} array [数组]
 * @return {[type]}       [description]
 */
export function removeItemByKeyVal(key, val, array) {
  let newArr = array.filter(item => {
    return val !== item[key]
  })
  return newArr
}

/**
 * isKeyInArray 检查对象中是否含有某一个key
 * @param k
 * @param array
 * @returns {boolean}
 */
export function isKeyInArrayBykey (value, key, array) {
  let checkItem = array.filter(item => {
    return item[key] === value
  })[0]
  return checkItem ? true : false
}

/**
 * [compareDate 判断时间是否有冲突]
 * @param  {[type]} _startTime [开始时间数组 存的是转换为分钟的数据]
 * @param  {[type]} _endTime   [结束时间数组]
 * @return {[type]}            [description]
 */
export function compareDate(_startTime, _endTime) {
  let startTime = _startTime.sort()
  let endTime = _endTime.sort()
  for(let i = 1; i < startTime.length; i++) {
    if(startTime[i] <= endTime[i - 1]) {
      return false
    }
  }
  return true
}

/**
 * 获取某日期所在周的一周
 * @param {Number} y
 * @param {Number} m
 * @param {Number} d
 * @returns {Number}
 */
export function getAllWeek(date) {
  let date_ = new Date(date)
  let week = date_.getDay(); //获取时间的星期数
  let allWeek = []
  let minus = week ? week - 1 : 6;
  let i = 0;
  while (i < 7) {
    let dd = new Date(date)
    dd.setDate(dd.getDate() - minus); //获取minus天前的日期
    let y = dd.getFullYear();
    let m = (dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1);
    let d = dd.getDate() < 10 ? ('0' + dd.getDate()) : dd.getDate();
    allWeek.push(y + "-" + m + "-" + d)
    minus--;
    i++;
  }
  return allWeek
}

/**
 * @description: 将对象的key转化成数组
 * @param {type} byeKey true 将key转化成数组   false将key对应的值转化成数组
 * @return: 
 */
export function objectToArray(obj, byeKey) {
  let arrList = []
  for(let key in obj) {
    if(byeKey) {
      arrList.push(key)
    }else {
      arrList.push(obj[key])
    }
  }
  return arrList
}

/**
 * @description: 将标准时间转换为时间戳
 * @param {type} 
 * @return: 
 */
export function changeDateToTimestamp(dateStr) {
  if(dateStr) {
    let dateTime = dateStr.replace(/-/g, '/')
    return Date.parse(new Date(dateTime))
  }else {
    return ''
  }
}

/**
 * @description: excel 列索引（数字）转列名
 * @param {type} columnNumber 索引值
 * @return {type} 
 */
export function indexToColName(columnNumber) {
  let dividend = columnNumber;
  let columnName = '';
  let modulo = 0
  while (dividend > 0) {
    modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = parseInt((dividend - modulo) / 26);
  } 
  return columnName;
}

/**
 * @description: 解决精度丢失问题
 * @param num {number} 要格式化的数字
 * @return pre {number} 格式化的精度
 */
export function fixedNum(num, pre = 2) {
  if (isNaN(parseFloat(num))) return 'error'
  if (num.toString().indexOf('.') === -1) return num
  let decimal = num.toString().split('.')[1]
  if (decimal.length < pre) {
    return num
  } else {
    return (Math.round(num * Math.pow(10, pre)) / Math.pow(10, pre)).toFixed(pre)
  }
}
