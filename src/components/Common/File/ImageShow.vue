<style scoped lang='less'>
.upload-img-wrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.uploadImg3r4, .uploadImg4r3, .uploadImg1r1{
  border: 1px dashed @colorSplit;
  border-radius: 6px;
  margin: 0 5px;
  cursor: pointer;
}
.uploadImg3r4 > img {
  width: 90px;
  height: 120px;
}
.uploadImg4r3 > img {
  width: 120px;
  height: 90px;
}
.uploadImg1r1 > img {
  width: 120px;
  height: 120px;
}
</style>
<template>
  <div class="upload-img-wrap">
    <div 
      :class="imgAspect === 2 ? 'uploadImg3r4' : imgAspect === 3 ? 'uploadImg4r3' : 'uploadImg1r1'" 
      v-for="item in previewImageList" 
      :key="item.imageUrl"
      @click="onPreviewHandel(item.imageUrl)">
        <img v-if="item.imageUrl" :src="item.imageUrl" alt="图片信息"/>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" :src="bigImageUrl" alt=""/>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    previewImageList: {
      type: Array,
      default: () => []
    },
    imgAspect: { // imgAspect 图片尺寸 1表示1:1  2:表示长图 3:4  3: 表示长图 4:3
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialogVisible: false,
      bigImageUrl: ''
    }
  },
  methods: {
    onPreviewHandel(filePath) {
      this.bigImageUrl = filePath
      this.dialogVisible = true
    }
  }
}
</script>