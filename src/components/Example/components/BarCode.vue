<style scoped lang="less">
  @import "../style.less";
</style>
<template>
  <div>
    <p class="title">6.条码生成组件</p>
    <p>条码生成组件，使用该组件可根据指定内容生成条码。</p>
    <p class="mt20 sub-title">6.1 展示示例</p>
    <p>条码生成组件的展示用法。<span class="tip">[代码使用请查看/src/components/Example/components/BarCode文件中的内容]</span></p>
    <p class="mt10">
      <el-button @click="change" size="mini">更改条码值</el-button>
    </p>
    <bar-code
      :barCodeMsg="barCodeMsg"
      :displayValue="true"
      :width="2"
      :height="30"
      background="#E3E7EA"
      lineColor="#FDA413" />
    <p class="mt20 sub-title">6.2 Attributes</p>
    <p>条码生成组件参数说明</p>
    <bl-table
      :dataSource="attrData"
      :columns="attrColumn"/>
  </div>
</template>
<script>
import constants from '../constants'
import BarCode from '@/components/Common/Tools/BarCode'
export default {
  components: {
    BarCode
  },
  data() {
    return {
      barCodeMsg: '1606724902090',
      attrData: [
        {
          attr: 'barCodeMsg',
          desc: '要生成的条码内容',
          type: 'String',
          val: '',
          defaultVal: ''
        },
        {
          attr: 'displayValue',
          desc: '是否显示原始值',
          type: 'Boolean',
          val: 'true, false',
          defaultVal: 'false'
        },
        {
          attr: 'width',
          desc: '线条宽度',
          type: 'Number',
          val: '',
          defaultVal: '1'
        },
        {
          attr: 'height',
          desc: '线条高度',
          type: 'Number',
          val: '',
          defaultVal: '50'
        },
        {
          attr: 'background',
          desc: '背景色',
          type: 'String',
          val: '',
          defaultVal: '#FFFFFF'
        },
        {
          attr: 'lineColor',
          desc: '线条颜色',
          type: 'String',
          val: '',
          defaultVal: '#000000'
        }
      ],
      attrColumn: constants.tableAttrColumn,
    }
  },
  methods: {
    change() {
      this.barCodeMsg = new Date().getTime().toString()
    }
  }
}
</script>
