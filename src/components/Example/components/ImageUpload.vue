<style scoped lang="less">
  @import "../style.less";
</style>
<template>
  <div>
    <p class="title">5. 图片上传和展示组件</p>
    <p>图片上传和展示组件说明, 图片上传组件可支持查看大图、拖拽、删除等功能。</p>
    <p class="mt20 sub-title">5.1 展示示例</p>
    <p>图片上传和展示组件的展示用法。<span class="tip">[代码使用请查看/src/components/Example/components/ImageUpload文件中的内容]</span></p>
    <p class="mt20 third-title">5.1.1 图片上传展示示例</p>
      <image-upload
        ref="imageUpload" 
        @images-change="setImageList"
        :defaultImages="qualificationImgList"
        :imgAspect="2"
        :maxImgsNum="3"
        :imgSize="3 * 1024"/>
    <p class="mt20 third-title">5.1.2 已有图片展示示例（点击图片可放大）</p>
      <image-show 
        ref="imageShow"
        :previewImageList="previewImageList"
        :imgAspect="2"/>
    <p class="mt20 sub-title">5.2 图片上传组件 Attributes</p>
    <p>图片上传组件参数说明</p>
    <bl-table
      :dataSource="attrData"
      :columns="attrColumn"/>
    <p class="mt20 sub-title">5.3 图片上传组件 Events</p>
    <p>图片上传组件事件说明</p>
    <bl-table
      :dataSource="eventData"
      :columns="eventColumn"/>
    <p class="mt20 sub-title">5.4 图片展示组件 Attributes</p>
    <p>图片展示组件参数说明</p>
    <bl-table
      :dataSource="attrDataImageShow"
      :columns="attrColumn"/>
  </div>
</template>
<script>
import ImageUpload from '@/components/Common/File/ImageUpload'
import ImageShow from '@/components/Common/File/ImageShow'
import constants from '../constants'
export default {
  components: {
    ImageUpload,
    ImageShow
  },
  data() {
    return {
      qualificationImgList: [
        {
          imageUrl: 'http://retailimg01.benlailife.com/536fc383b88f40799a30a1f121a53e5b.jpg',
          index: 0
        }
      ],
      previewImageList: [
        {
          imageUrl: 'http://retailimg01.benlailife.com/536fc383b88f40799a30a1f121a53e5b.jpg',
          index: 0
        },
        {
          imageUrl: 'http://retailimg01.benlailife.com/0e4225a4f4bd44f5b2baa90321bb8444.jpg',
          index: 1
        },
        {
          imageUrl: 'http://retailimg01.benlailife.com/8dddf870c5864ecfacb8341c8e5ada8d.jpg',
          index: 2
        }
      ],
      attrColumn: constants.tableAttrColumn,
      attrData: [
        {
          attr: 'defaultImages', // 参数
          desc: '默认已经上传的图片的列表', // 说明
          type: 'Array', // 类型
          val: '-', // 可选值
          defaultVal: '[]'// 默认值
        },
        {
          attr: 'imgAspect',
          desc: '图片宽高比 1表示1:1  2:表示长图 3:4  3: 表示长图 4:3',
          type: 'Number',
          val: '1，2，3',
          defaultVal: '1'
        },
        {
          attr: 'imgSize',
          desc: '图片大小限制，单位kb（不传此值或此值为0为不限制）',
          type: 'Number',
          val: '-',
          defaultVal: '0'
        },
        {
          attr: 'maxImgsNum',
          desc: '最多上传几张：不传或此值为0默认不限张数',
          type: 'Number',
          val: '-',
          defaultVal: '0'
        },
        {
          attr: 'width',
          desc: '是否检查图片宽度，不传或此值为0默认不检查',
          type: 'Number',
          val: '-',
          defaultVal: '0'
        },
        {
          attr: 'height',
          desc: '是否检查图片高度，不传或此值为0默认不检查',
          type: 'Number',
          val: '-',
          defaultVal: '0'
        }
      ],
      eventColumn: constants.tableEventColumn,
      eventData: [
        {
          eventName: 'images-change',
          desc: '上传的图片发生变化, 返回内容为新的图片地址组合的数组',
          attr: '{imageList}'
        }
      ],
      attrDataImageShow: [
        {
          attr: 'previewImageList', // 参数
          desc: '默认已经上传的图片的列表', // 说明
          type: 'Array', // 类型
          val: '-', // 可选值
          defaultVal: '[]'// 默认值
        },
        {
          attr: 'imgAspect',
          desc: '图片宽高比 1表示1:1  2:表示长图 3:4  3: 表示长图 4:3',
          type: 'Number',
          val: '1，2，3',
          defaultVal: '1'
        }
      ]
    }
  },
  methods: {
    setImageList(images) {
      console.log("images:", images);
    }
  }
}
</script>
