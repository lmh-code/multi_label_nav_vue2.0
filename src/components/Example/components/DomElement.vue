<style scoped lang="less">
  @import "../style.less";
</style>
<template>
  <div>
    <p class="title">1.内置标签组件</p>
    <p>内置标签组件自带一些默认样式，可通用。</p>
    <p><span class="tip">[代码使用请查看/src/components/Example/components/Table文件中的内容]</span></p>
    <p class="mt20 sub-title">1.1 bl-view 标签</p>
    <p>bl-view 标签默认上下左右内边距为10px，背景色为白色，4px的圆角，可直接使用。</p>
    <div>
      bl-view示例如下：
      <div style="background-color: #F56C6C; padding: 10px;">
        <bl-view>
          我是bl-view标签内部的内容
        </bl-view>
      </div>
    </div>

    <p class="mt20 sub-title">1.2 bl-options-view 标签</p>
    <p>bl-options-view 标签默认上下左右内边距为10px，背景色为白色，4px的圆角，2px灰色底部边框，主要用于包裹操作按钮，可直接使用。</p>
    <div>
      bl-options-view示例如下：
      <div style="background-color: #F56C6C; padding: 10px;">
        <bl-options-view>
          我是bl-options-view标签内部的内容
        </bl-options-view>
        <bl-view>
          我是bl-view标签内部的内容
        </bl-view>
      </div>
    </div>

    <p class="mt20 sub-title">1.3 bl-table-view 标签</p>
    <p>bl-table-view 标签默认上下左右内边距为10px，背景色为白色，有6px上边外边距，主要用于包裹表格内容，可直接使用。</p>
    <div>
      bl-table-view示例如下：
      <div style="background-color: #F56C6C; padding: 10px;">
        <bl-options-view>
          我是bl-options-view标签内部的内容
        </bl-options-view>
        <bl-view>
          我是bl-view标签内部的内容
        </bl-view>
        <bl-table-view>
          我是bl-table-view标签内部的内容
        </bl-table-view>
      </div>
    </div>

    <p class="mt20 sub-title">1.3 bl-form-view 标签</p>
    <p>bl-form-view 主要用于包裹form表单内容，可直接使用。</p>
    <div>
      bl-form-view示例如下：
      <div style="background-color: #F56C6C; padding: 10px;">
        <bl-options-view>
          我是bl-options-view标签内部的内容
        </bl-options-view>
        size参数值为 mini：
        <bl-form-view size='mini'>
          <el-form 
            ref="formSearch"  
            label-position="top">
            <el-form-item label="费用单号">
              <el-input size="small" placeholder="费用单号"></el-input>
            </el-form-item>
          </el-form>
        </bl-form-view>
        size参数值为 small(也是默认值):
        <bl-form-view size="small">
          <el-form 
            ref="formSearch"  
            label-position="top">
            <el-form-item label="费用单号">
              <el-input size="small" placeholder="费用单号"></el-input>
            </el-form-item>
          </el-form>
        </bl-form-view>
        size参数值为 medium:
        <bl-form-view size="medium">
          <el-form 
            ref="formSearch"  
            label-position="top">
            <el-form-item label="费用单号">
              <el-input size="small" placeholder="费用单号"></el-input>
            </el-form-item>
          </el-form>
        </bl-form-view>
        size参数值为 large:
        <bl-form-view size="large">
          <el-form 
            ref="formSearch"  
            label-position="top">
            <el-form-item label="费用单号">
              <el-input size="small" placeholder="费用单号"></el-input>
            </el-form-item>
          </el-form>
        </bl-form-view>
        <bl-table-view>
          我是bl-table-view标签内部的内容
        </bl-table-view>
      </div>
    </div>

    <p class="mt20 sub-title">1.3.1 bl-form-view 标签Attributes</p>
    <p> bl-form-view 标签参数说明</p>
    <bl-table
      :dataSource="tableAttrData"
      :columns="tableAttrColumn"/>
  </div>
</template>
<script>
import constants from '../constants'
export default {
  data() {
    return {
      tableAttrColumn: constants.tableAttrColumn,
      tableAttrData: [
        {
          attr: 'size', // 参数
          desc: '表单内容条目宽度： mini(120px) | small(174) | medium(260px) | large(320px)', // 说明
          type: 'String', // 类型
          val: 'mini / small / medium / large', // 可选值
          defaultVal: 'small'// 默认值
        },
        {
          attr: 'mb', // 参数
          desc: '表单条目上下之间的距离 normal： margin-bottom: 22px;', // 说明
          type: 'String', // 类型
          val: 'none / normal', // 可选值
          defaultVal: 'none'// 默认值
        }
      ]
    }
  }
}
</script>