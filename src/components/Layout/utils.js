/**
 * @description: 根据菜单唯一ID判断是不是通过boom生成的页面
 * @param {*} menuId
 * @return {*}
 */
export function isBoomCreated(menuId) {
  if(menuId.startsWith('/report') || menuId.startsWith('report') || menuId.startsWith('/preview') || menuId.startsWith('preview') || menuId.startsWith('/mixReport') || menuId.startsWith('mixReport') || menuId.startsWith('/previewMix') || menuId.startsWith('previewMix')) {
    return true
  }else {
    return false
  }
}
