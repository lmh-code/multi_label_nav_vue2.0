// ==========********** type 类型判断 **********==========
/**
 * @description: 检查传入的内容是否是指定类型
 * @param o {any} 被检查的内容
 * @param type {any} 是否是指定的类型。[String(是否是字符串)、Boolean(是否boolean)、Number(是否数字)、Null(是否为null)、Undefined(是否undefined)、Function(是否函数)、Object(是否对象)、Array(是否数组)、Date(是否时间)、RegExp(是否是正则)、Symbol(是否是Symbol函数)、Promise(是否是Promise对象)、Set(是否是Set对象)]
 * @return: {boolean} true：是；false：否
 */
export function isCheckType(o, type) {
  return Object.prototype.toString.call(o).slice(8, -1) === type
}
/**
 * @description: 检查是否为false
 * @param o {any} 被检查的内容
 * @return: {boolean} true：是；false：否
 */
export function isFalse(o) {
  if(!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
  else return false
}
export function isTrue(o) {
  return !isFalse(o)
}
/**
 * @description: 获取设备系统型号
 * @return: {String} navigator.userAgent 包含设备系统型号 Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
 */
export function userAgent() {
  return navigator.userAgent
}
/**
 * @description: 检测是不是PC端
 * @param {type} 
 * @return: {boolean} true：是；false：否
 */
export function isPC () {
  let userAgentInfo = navigator.userAgent
  let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  let flag = true;
  for(let item of Agents) {
    if (userAgentInfo.indexOf(item) > 0) {
      flag = false
      break
    }
  }
  return flag
}
/**
 * @description: 检查传入内容是不是指定类型
 * @param str {any} 被检测内容
 * @param type {string} 指定类型。
 * phone(大陆手机号)、
 * tel(座机)、
 * card(身份证)、
 * pwd(密码以字母开头，长度在8~28之间，只能包含字母、数字和下划线)、
 * postal(邮政编码)、
 * QQ(qq号)、
 * email(邮箱)、
 * money(金额(小数点2位))、
 * URL(网址)、
 * IP(IP地址)、
 * number(数字)、
 * english(纯英文)、
 * chinese(中文)、
 * lower(小写)、
 * upper(大写)、
 * count(账号)、
 * bank(银行卡账号)
 * @return: 
 */
export function checkStr (str, type) {
  switch(type) {
  case 'phone':
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
  case 'tel':
    return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
  case 'card':
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
  case 'pwd':
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d`~!@#$%^&*()_+-=,.?]{8,20}$/.test(str)
  case 'postal':
    return /[1-9]\d{5}(?!\d)/.test(str);
  case 'QQ':
    return /^[1-9][0-9]{4,9}$/.test(str);
  case 'email':
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
  case 'money':
    return /^\d*(?:\.\d{0,2})?$/.test(str);
  case 'money4':
    return /^\d*(?:\.\d{0,4})?$/.test(str);
  case 'URL':
    // eslint-disable-next-line no-useless-escape
    return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
  case 'number':
    return /^[0-9]*$/.test(str);
  case 'english':
    return /^[a-zA-Z]+$/.test(str);
  case 'chinese':
    return /^[\\u4E00-\\u9FA5]+$/.test(str);
  case 'lower':
    return /^[a-z]+$/.test(str);
  case 'upper':
    return /^[A-Z]+$/.test(str);
  case 'count':
    return /\w{1,20}$/.test(str);
  case 'bank':
    return /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/.test(str);
  default:
    return false;
  }
}
/**
 * @description: 严格的身份证校验
 * @param sId {type} 身份证id
 * @return: 
 */
export function isCardID(sId) {
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
    console.log('你输入的身份证长度或格式错误')
    return false
  }
  //身份证城市
  let aCity = {11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"};
  if(!aCity[parseInt(sId.substr(0, 2))]) { 
    console.log('你的身份证地区非法')
    return false
  }
  // 出生日期验证
  let sBirthday = `${sId.substr(6, 4)}-${Number(sId.substr(10, 2))}-${Number(sId.substr(12, 2))}`.replace(/-/g, "/")
  let timeStamp = new Date(sBirthday)
  if(sBirthday !== `${timeStamp.getFullYear}/${timeStamp.getMonth + 1}/${timeStamp.getDate}`) {
    console.log('身份证上的出生日期非法')
    return false
  }
  // 身份证号码校验
  let sum = 0
  let weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  let codes = "10X98765432"
  for (let i = 0; i < sId.length - 1; i++) {
    sum += sId[i] * weights[i];
  }
  let last = codes[sum % 11]; // 计算出来的最后一位身份证号码
  if (sId[sId.length - 1] !== last) { 
    console.log('你输入的身份证号非法')
    return false
  }
  return true
}


