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
      <el-radio-group 
        v-if="showTab"
        size="small"
        v-model="qualificationType" 
        @change="qualificationTypeChange">
        <el-radio-button label="old">旧资质</el-radio-button>
        <el-radio-button label="new">新资质</el-radio-button>
      </el-radio-group>
      <div class="title mt10">基本信息：</div> 
      <el-form-item label="资质名称:">
        {{qualificationModelName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;资质状态：&nbsp;{{formatStatus(status)}}
      </el-form-item>
      <el-form-item label="资质编码:">
        {{qualificationNo}}
      </el-form-item>
      <div class="title">普通信息：</div> 
      <template v-for="(item, index) of qualificationBasicMsgList">
        <el-form-item :label="item.qualificationFieldName + ':'" :key="index">
          {{item.textValue}}
        </el-form-item>
      </template>
      <div class="title">时间信息：</div> 
      <template v-for="(item, index) of qualificationTimeMsgList">
        <el-form-item
          :label="item.qualificationFieldName + ':'" 
          :key="index + 10000">
          {{item.timeValue}}
        </el-form-item>
      </template>
      <div>
        <span class="title">资质图片：</span>(图片格式要求jpg、png ;图片大小不超过3M;上传的资质需是加盖供应商公章的彩色扫描件；资质要求清晰；最多只能上传3张。)
      </div>
      <el-form-item label="图片内容:">
        <image-show
          :previewImageList="qualificationImgList"
          :imgAspect="2"/>
      </el-form-item>
      <el-form-item>
        <hr class="s-slip-tb">
        <el-button size="small" @click="doCancelHandel">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import optionsMixin from '@/module/mixin/options'
import requestUrl from '@/module/api/qualification'
import ImageShow from '@/components/Common/File/ImageShow'
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
      qualificationImgList: [], // 图片信息

      qualificationType: 'old',
      showTab: false,
      oldQualificationDetailMsg: {}, // 旧资质
      newQualificationDetailMsg: {} // 新资质
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
    "image-show": ImageShow
  },
  methods: {
    getDetailMsg() {
      let url = requestUrl.qualificationMsgDetail
      if(this.type === '001') {
        // 供应商资质管理
        url = requestUrl.qualificationMsgDetail
      }else if(this.type === '002') {
        // 商品资质管理
        url = requestUrl.getGoodsDetail
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
          let oldQualificationDetailMsg = res.data && res.data.length ? res.data.filter(item => {
            return item.isNew === 0
          })[0] : null
          let newQualificationDetailMsg = res.data && res.data.length ? res.data.filter(item => {
            return item.isNew === 1
          })[0] : null
          this.oldQualificationDetailMsg = oldQualificationDetailMsg
          this.newQualificationDetailMsg = newQualificationDetailMsg
          this.showTab = oldQualificationDetailMsg && newQualificationDetailMsg ? true : false
          if(this.showTab) {
            this.setStateRenderDom(oldQualificationDetailMsg)
          }else {
            this.setStateRenderDom(oldQualificationDetailMsg || newQualificationDetailMsg)
          }
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
    qualificationTypeChange(value) {
      if(value === 'old') {
        this.setStateRenderDom(this.oldQualificationDetailMsg)
      }else if(value === 'new') {
        this.setStateRenderDom(this.newQualificationDetailMsg)
      }
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