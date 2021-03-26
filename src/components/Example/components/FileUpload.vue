<style scoped lang="less">
  @import "../style.less";
</style>
<template>
  <div>
    <p class="title">4. 文件上传组件</p>
    <p>文件上传相关组件说明</p>
    <p class="mt20 sub-title">4.1 展示示例</p>
    <p>文件上传组件的展示用法。<span class="tip">[代码使用请查看/src/components/Example/components/FileUpload文件中的内容]</span></p>
    <file-upload 
      :previewFileList="previewFileList"
      :fileAspectType="['doc', 'docx', 'pdf', 'xlsx']"
      :maxFilesNum="3"
      :fileSize="1024"
      tipText="这是提示文案"/>
    <p class="mt20 sub-title">4.2 FileUpload组件 Attributes</p>
    <p>FileUpload组件参数说明</p>
    <bl-table
      :dataSource="attrData"
      :columns="attrColumn"/>
    <p class="mt20 sub-title">4.3 FileUpload组件 Events</p>
    <p>AFileUpload组件事件说明</p>
    <bl-table
      :dataSource="eventData"
      :columns="eventColumn"/>
  </div>
</template>
<script>
import FileUpload from '@/components/Common/File/FileUpload'
import constants from '../constants'
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      previewFileList: [],
      attrColumn: constants.tableAttrColumn,
      attrData: [
        {
          attr: 'previewFileList', // 参数
          desc: '默认已经上传的文件的列表', // 说明
          type: 'Array', // 类型
          val: '-', // 可选值
          defaultVal: '[]'// 默认值
        },
        {
          attr: 'fileAspectType',
          desc: '可接受的文件类型',
          type: 'Array',
          val: 'jpg, png, jpeg, doc, docx, pdf, xlsx, zip',
          defaultVal: '[]'
        },
        {
          attr: 'maxFilesNum',
          desc: '最多可传文件数, 不传此值或此值为0为不限制',
          type: 'Number',
          val: '-',
          defaultVal: '0'
        },
        {
          attr: 'fileSize',
          desc: '文件大小限制，单位kb（不传此值或此值为0为不限制）',
          type: 'Number',
          val: '-',
          defaultVal: '0'
        },
        {
          attr: 'tipText',
          desc: '提示文案，类似于input的placeholder',
          type: 'String',
          val: '-',
          defaultVal: '-'
        }
      ],
      eventColumn: constants.tableEventColumn,
      eventData: [
        {
          eventName: 'files-change',
          desc: '上传的文件发生变化, 返回内容为新的文件地址数组和发生变化的文件地址',
          attr: '{filesList, path}'
        }
      ]
    }
  }
}
</script>
