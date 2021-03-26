import store from '../store';
/**
 * [showLoading 展示loading]
 */
function show() {
  let param = {
    showLoading: true
  }
  store.dispatch('common/showLoading', param)
}

/**
 * [hideLoading 清除全局loading]
 */
function hide() {
  let param = {
    showLoading: false
  }
  store.dispatch('common/showLoading', param)
}

export default {
  show,
  hide
}
