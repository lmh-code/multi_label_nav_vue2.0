<style lang="less" scoped>
  .title {
    font-weight: bold;
    font-size: 16px;
    color: @colorTitle;
  }
</style>
<template>
  <div class="add-form-wraper">
    <el-form 
      label-position="right" 
      label-width="160px">
      <div class="title">基本信息：</div> 
      <el-form-item label="资质名称:">
        {{qualificationModelName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;资质状态：&nbsp;{{formatStatus(status)}}
      </el-form-item>
      <el-form-item label="资质编码:">
        <el-input 
          v-model.trim="qualificationNo" 
          size="small" 
          class="add-input" 
          placeholder="请输入资质编码"
          clearable></el-input>
      </el-form-item>
      <div class="title">普通信息：</div> 
      <template v-for="(item, index) of qualificationBasicMsgList">
        <el-form-item :label="item.qualificationFieldName + ':'" :key="index">
          <el-input 
            v-model.trim="item.textValue" 
            size="small" 
            class="add-input" 
            :placeholder="item.qualificationFieldName"
            clearable></el-input>
        </el-form-item>
      </template>
      <div class="title">时间信息：</div> 
      <template v-for="(item, index) of qualificationTimeMsgList">
        <el-form-item 
          :label="item.qualificationFieldName + ':'" 
          :key="index + 10000">
          <el-date-picker 
            :clearable="false"
            class="add-input" 
            v-model="item.timeValue" 
            type="date" 
            :placeholder="item.qualificationFieldName"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
      </template>
      <div>
        <span class="title">资质图片：</span>(图片格式要求jpg、png ;图片大小不超过3M;上传的资质需是加盖供应商公章的彩色扫描件；资质要求清晰；最多只能上传3张。)
      </div>
      <el-form-item label="图片内容:">
        <image-upload
          ref="imageUpload" 
          @images-change="setImageList"
          :defaultImages="qualificationImgList"
          :imgAspect="2"
          :maxImgsNum="3"
          :imgSize="3 * 1024"/>
      </el-form-item>
      <el-form-item>
        <hr class="s-slip-tb">
        <el-button type="primary" size="small" @click="doSaveHandel" :disabled="isDisabled" :loading="isDisabled">提交</el-button>
        <el-button size="small" @click="doCancelHandel">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import optionsMixin from '@/module/mixin/options'
import requestUrl from '@/module/api/qualification'
import ImageUpload from '@/components/Common/File/ImageUpload'
export default {
  mixins: [optionsMixin],
  data() {
    return {
      isDisabled: false,
      type: '',
      supplierId: '',
      statusOptions: [
        {
          label: '待上传',
          value: 0
        },
        {
          label: '待审核',
          value: 1
        },
        {
          label: '审核通过',
          value: 2
        },
        {
          label: '已驳回',
          value: 3
        },
        {
          label: '已过期',
          value: 4
        },
        {
          label: '即将过期',
          value: 5
        },
        {
          label: '即将过期-更换中',
          value: 6
        },
      ],
      id: '',
      qualificationModelId: '',
      qualificationModelName: '',
      qualificationNo: '', // 资质编码
      status: '',
      qualificationBasicMsgList: [], // 基本信息
      qualificationTimeMsgList: [], // 时间信息
      qualificationImgList: [] // 图片信息
    }
  },
  created() {
    this.type = this.$route.params.type
    this.id = this.$route.params.id
    this.qualificationModelId = this.$route.params.modelId
    this.supplierId = this.$route.params.supplierId
  },
  mounted() {
    this.getDetailMsg()
  },
  components: {
    "image-upload": ImageUpload
  },
  methods: {
    getDetailMsg() {
      let url = requestUrl.qualificationMsgEdit
      if(this.type === '001') {
        // 供应商资质管理
        url = requestUrl.qualificationMsgEdit
      }else if(this.type === '002') {
        // 商品资质管理
        url = requestUrl.goodsEdit
      }
      let params = {
        id: this.id,
        qualificationModelId: this.qualificationModelId,
        supplierId: this.supplierId
      }
      this.$loading.show()
      this.$http.post(url, {...params}).then(res => {
        this.$loading.hide()
        if(res.code === 0) {
          let qualificationDetailMsg = res.data ? res.data : {}
          this.setStateRenderDom(qualificationDetailMsg)
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.$loading.hide()
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    setStateRenderDom(detail) {
      if(!detail) return
      this.id = detail.id
      this.qualificationModelId = detail.qualificationModelId
      this.qualificationModelName = detail.qualificationModelName
      this.qualificationNo = detail.qualificationNo
      this.status = detail.status
      this.qualificationBasicMsgList = detail.items && detail.items.length ? detail.items.filter(item => {
        return item.fieldType === 0
      }) : []
      this.qualificationTimeMsgList = detail.items && detail.items.length ? detail.items.filter(item => {
        return item.fieldType === 1
      }) : []
      this.qualificationImgList = detail.url ? detail.url.split(',').map((url, index) => {
        return {
          index: index,
          imageUrl: url
        }
      }) : [{
        index: 0,
        imageUrl: ''
      }]
    },
    formatStatus(status) {
      let filterMsg = this.statusOptions.filter(item => {
        return item.value === status
      })[0]
      return filterMsg ? filterMsg.label : ''
    },
    setImageList(params) {
      this.qualificationImgList = params && params.imageList.length ? [...params.imageList] : [{
        index: 0,
        imageUrl: ''
      }]
    },
    doSaveHandel() {
      if(!this.qualificationNo) {
        this.$tip.message('请输入资质编号', 'warning')
        return
      }
      for(let item of this.qualificationBasicMsgList) {
        if(!item.textValue) {
          this.$tip.message(`请输入${item.qualificationFieldName}的内容`, 'warning')
          return
        }else if(item.textValue.length > 50) {
          this.$tip.message(`${item.qualificationFieldName}的内容长度不能超过50`, 'warning')
          return
        }
      }
      for(let item of this.qualificationTimeMsgList) {
        if(!item.timeValue) {
          this.$tip.message(`请选择${item.qualificationFieldName}`, 'warning')
          return
        }
      }
      const urlList = this.qualificationImgList.filter(item => {
        return item.imageUrl
      }).map(item => {
        return item.imageUrl
      })
      if(!urlList || urlList.length === 0) {
        this.$tip.message(`请上传资质图片`, 'warning')
        return
      }
      let params = {
        id: this.id,
        qualificationModelId: this.qualificationModelId,
        qualificationModelName: this.qualificationModelName,
        qualificationNo: this.qualificationNo,
        status: this.status,
        items: [...this.qualificationBasicMsgList, ...this.qualificationTimeMsgList],
        url: urlList.join(',')
      }
      this.isDisabled = true
      let url = requestUrl.uploadQualification
      if(this.type === '001') {
        // 供应商资质管理
        url = requestUrl.uploadQualification
      }else if(this.type === '002') {
        // 商品资质管理
        url = requestUrl.uploadGoodsUpload
      }
      this.$http.post(url, {...params}).then(res => {
        this.isDisabled = false
        if(res.code === 0) {
          this.$tip.message(`提交成功`, 'success')
          if(this.type === '001') {
            // 设置刷新列表页状态
            this.editSuccessHandel('/sc_qua')
            // 关闭当前页并跳转至详情页
            this.closePage(`/sc_qua/detail/001/${this.id}/${this.qualificationModelId}/${this.supplierId}`)
          }else if(this.type === '002') {
            this.editSuccessHandel('/goods_qua')
            this.closePage(`/goods_qua/detail/002/${this.id}/${this.qualificationModelId}/${this.supplierId}`)
          }
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.isDisabled = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    doCancelHandel() {
      if(this.type === '001') {
        this.closePage('/sc_qua')
      }else if(this.type === '002') {
        this.closePage('/goods_qua')
      }
    }
  }
}
</script>