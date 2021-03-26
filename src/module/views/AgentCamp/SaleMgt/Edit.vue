<template>
  <div class="add-form-wraper">
    <el-form 
      :model="addParamMsg" 
      label-position="right" 
      label-width="160px"
      ref="ruleForm"
      :rules="rules"
      >
      <el-form-item label="供应商" prop="vendorNo">
        <el-select 
          class="add-input" 
          v-model="addParamMsg.vendorNo" 
          placeholder="选择供应商" 
          size="small"
          disabled
          @change="vendorNoChange">
          <el-option 
            v-for="item in vendors" 
            :key="item.vendorNo" 
            :label="item.vendorName" 
            :value="item.vendorNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格有效起始时间" prop="startTime">
        <el-date-picker
          disabled 
          :clearable="false"
          class="add-input" 
          v-model="addParamMsg.startTime" 
          type="datetime" 
          placeholder="价格有效起始时间"
          format="yyyy-MM-dd HH:mm:ss" 
          value-format="yyyy-MM-dd HH:mm:ss" 
          size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="价格有效终止时间" prop="endTime">
        <el-date-picker 
          disabled
          :clearable="false"
          class="add-input" 
          v-model="addParamMsg.endTime" 
          type="datetime" 
          placeholder="价格有效终止时间"
          format="yyyy-MM-dd HH:mm:ss" 
          value-format="yyyy-MM-dd HH:mm:ss" 
          size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="区域" prop="regionNos">
        <el-select 
          disabled
          class="add-input" 
          v-model="addParamMsg.regionNos" 
          placeholder="选择区域" 
          multiple
          size="small">
          <el-option 
            v-for="item in regionsList" 
            :key="item.storeGroupNo" 
            :label="item.storeGroupName" 
            :value="item.storeGroupNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择商品" required>
        <el-button type="primary" @click="showAddGoodsDialog" size="mini" icon="el-icon-plus" v-if="type === 'edit'">添加商品</el-button>
        <bl-table
          :border="false"
          :dataSource="checkedGoodsList"
          :columns="columns"
          :maxHeight="400"/>
      </el-form-item>
      <el-form-item>
        <hr class="s-slip-tb">
        <el-button type="primary" size="small" @click="doSaveHandel(0)" :disabled="isDisabled" :loading="isDisabled && addParamMsg.status === 0" v-if="type === 'edit'">保存</el-button>
        <el-button type="primary" size="small" @click="doSaveHandel(1)" :disabled="isDisabled" :loading="isDisabled && addParamMsg.status === 1" v-if="type === 'edit'">保存并发布</el-button>
        <el-button size="small" @click="doCancelHandel">关闭</el-button>
      </el-form-item>
    </el-form>
    <choose-goods ref="chooseGoods" @confirm="confirmHandel"/>
  </div>
</template>
<script>
import vendorsMixin from '@/module/mixin/getVendors'
import regionsMixin from '@/module/mixin/getRegions'
import optionsMixin from '@/module/mixin/options'
import requestUrl from '@/module/api/saleMgtUrl'
import ChooseGoods from './ChooseGoods'
import {dateFormat, changeDateToTimestamp} from '@/utils/utils'
import constantUtil from '@/utils/constant'
import constants from './constants'
export default {
  mixins: [vendorsMixin, regionsMixin, optionsMixin],
  components: {
    ChooseGoods
  },
  data() {
    const vendorNoValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择供应商'))
      }else {
        callback()
      }
    }
    const timeValidator = (rule, value, callback) => {
      if (!this.addParamMsg.startTime) {
        return callback(new Error('请选择价格有效起始时间'))
      }else if (!this.addParamMsg.endTime) {
        return callback(new Error('请选择价格有效终止时间'))
      }else if(changeDateToTimestamp(this.addParamMsg.endTime) < changeDateToTimestamp(this.addParamMsg.startTime)) {
        return callback(new Error('价格有效终止时间不能早于起始时间'))
      }else {
        callback()
      }
    }
    const regionNosValidator = (rule, value, callback) => {
      if (!this.addParamMsg.regionNos || this.addParamMsg.regionNos.length === 0) {
        return callback(new Error('请选择区域'))
      }else {
        callback()
      }
    }
    return {
      type: 'see',
      quoteNo: '',
      isDisabled: false,
      addParamMsg: {
        vendorNo: '',
        vendorName: '',
        startTime: dateFormat('yyyy-MM-dd HH:mm:ss', new Date().getTime()),
        endTime: dateFormat('yyyy-MM-dd HH:mm:ss', new Date().getTime() + 86400000),
        goods: [],
        regionNos: [],
        regions: [],
        status: '' // 0：保存  1：保存并发布
      },
      rules: {
        vendorNo: [
          {required: true, validator: vendorNoValidator, trigger: 'change'}
        ],
        startTime: [
          {required: true, validator: timeValidator, trigger: 'change'}
        ],
        endTime: [
          {required: true, validator: timeValidator, trigger: 'change'}
        ],
        regionNos: [
          {required: true, validator: regionNosValidator, trigger: 'change'}
        ]
      },
      checkedGoodsList: [],
      columns: [
        {
          title: '条形码',
          dataIndex: 'barCode',
          ellipsis: true,
          minWidth: 120
        },
        {
          title: '商品编码',
          dataIndex: 'goodsNo',
          minWidth: 100
        },
        {
          title: '货号',
          dataIndex: 'vendorGoodsNo',
          minWidth: 100
        },
        {
          title: '商品名称',
          dataIndex: 'name',
          ellipsis: true,
          minWidth: 120
        },
        {
          title: '规格',
          dataIndex: 'spec',
          minWidth: 80
        },
        {
          title: '单位',
          dataIndex: 'saleUnitName',
          minWidth: 80
        },
        {
          title: '市场参考价',
          dataIndex: 'showPrice',
          input: this.showInput,
          placeholder: '市场参考价',
          minWidth: 100
        },
        {
          title: '销售价',
          dataIndex: 'salePrice',
          input: this.showInput,
          placeholder: '销售价',
          minWidth: 100
        },
        {
          title: '日均可订货量',
          dataIndex: 'qty',
          input: this.showInput,
          placeholder: '日均可订货量',
          minWidth: 120
        }
      ]
    }
  },
  created() {
    this.type = this.$route.params.type
    this.quoteNo = this.$route.params.id
    let optionColumn = {
      title: '操作',
      width: 80,
      fixed: 'right',
      operation: [
        {
          label: '删除',
          icon: 'el-icon-delete',
          clickFunc: this.deleteHandel
        }
      ]
    }
    if(this.type === 'edit') {
      this.columns.push(optionColumn)
    }
  },
  mounted() {
    this.getDetailMsg()
  },
  methods: {
    showInput() {
      return this.type === 'edit'
    },
    getDetailMsg() {
      this.$loading.show()
      this.$http.post(requestUrl.getQuoteDetail, {quoteNo: this.quoteNo}).then(res => {
        this.$loading.hide()
        if(res.code === 0) {
          let orderMsg = res.data ? {...res.data} : {}
          this.quoteNo = orderMsg.quoteNo
          this.addParamMsg.vendorNo = orderMsg.vendorNo
          this.addParamMsg.vendorName = orderMsg.vendorName
          this.addParamMsg.startTime = orderMsg.startTime
          this.addParamMsg.endTime = orderMsg.endTime
          this.addParamMsg.status = orderMsg.status
          let goodsListTemp = orderMsg.goods && orderMsg.goods.length ? orderMsg.goods : []
          goodsListTemp.forEach(item => {
            item.barCode = item.barcode
            item.goodsNo = item.erpGoodsNo
            item.name = item.goodsName
            item.saleUnitName = item.unit
          })
          this.checkedGoodsList = goodsListTemp
          this.addParamMsg.regionNos = [orderMsg.regionCode]
          this.addParamMsg.regions = [{
            regionCode: orderMsg.regionCode,
            regionName: orderMsg.regionName
          }]
          return
        }
        throw new Error(res.msg)
      }).catch(err => {
        this.$loading.hide()
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    showAddGoodsDialog() {
      if(!this.addParamMsg.vendorNo) {
        this.$tip.message("请先选择供应商", "warning")
        return
      }
      this.$nextTick(() => {
        this.$refs.chooseGoods.setDefaultMsg({
          title: '选择商品',
          vendorNo: this.addParamMsg.vendorNo,
          defaultChecked: this.checkedGoodsList
        })
      })
    },
    confirmHandel(result) {
      this.checkedGoodsList = [...result]
    },
    deleteHandel(row) {
      this.checkedGoodsList = this.checkedGoodsList.filter(item => {
        return item.goodsNo !== row.goodsNo
      })
    },
    doSaveHandel(status) {
      this.$refs.ruleForm.validate((valid) => {
        if(!valid) return false
        if(!this.checkedGoodsList || this.checkedGoodsList.length === 0) {
          this.$tip.message("请选择商品", "warning")
          return
        } 
        for(let item of this.checkedGoodsList) {
          if(!item.showPrice && parseFloat(item.showPrice) != 0) {
            this.$tip.message(`请输入【${item.name}】的市场参考价`, "warning")
            return
          }else if(!constantUtil.salePriceReg.test(item.showPrice)) {
            this.$tip.message(`【${item.name}】的市场参考价应为数字，小数保留两位小数`, "warning")
            return
          }
          if(!item.salePrice && parseFloat(item.salePrice) != 0) {
            this.$tip.message(`请输入【${item.name}】的销售价`, "warning")
            return
          }else if(!constantUtil.salePriceReg.test(item.salePrice)) {
            this.$tip.message(`【${item.name}】的市场销售价应为数字，小数保留两位小数`, "warning")
            return
          }
          if(parseFloat(item.salePrice) > parseFloat(item.showPrice)) {
            this.$tip.message(`【${item.name}】的销售价不能大于市场参考价`, "warning")
          }
          if(!item.qty && parseInt(item.qty) != 0) {
            this.$tip.message(`请输入【${item.name}】的日均可订货量`, "warning")
            return
          }else if(!constantUtil.numReg.test(item.qty)) {
            this.$tip.message(`【${item.name}】的日均可订货量应为整数`, "warning")
            return
          }
        }
        this.addParamMsg.status = status
        // 供应商名称
        let filterVendorMsg = this.vendors.filter(item => {
          return item.vendorNo === this.addParamMsg.vendorNo
        })[0]
        this.addParamMsg.vendorName = filterVendorMsg ? filterVendorMsg.vendorName : ''
        // 区域
        let regionsList = []
        for(let i of this.regionsList) {
          for(let j of this.addParamMsg.regionNos) {
            if(i.storeGroupNo === j) {
              regionsList.push(i)
            }
          }
        }
        this.addParamMsg.regions = regionsList.map(item => {
          return {
            regionCode: item.storeGroupNo,
            regionName: item.storeGroupName
          }
        })
        // 商品
        this.addParamMsg.goods = this.checkedGoodsList.map(item => {
          let newItem = {
            erpGoodsNo: item.goodsNo,
            goodsName: item.name,
            unit: item.saleUnitName,
            barcode: item.barCode,
            ...item
          }
          return newItem
        })
        // 报价单号
        this.addParamMsg.quoteNo = this.quoteNo
        // 保存询价进价
        this.isDisabled = true
        this.$http.post(requestUrl.addOrUpdateQuote, {...this.addParamMsg}).then(res => {
          this.isDisabled = false
          if(res.code === 0) {
            this.$tip.message('编辑成功', 'success');
            // 设置刷新列表页状态
            this.editSuccessHandel('/sale_mgt')
            // 关闭当前页并跳转至详情页
            this.closePage(`/sale_mgt/see/${this.quoteNo}`)
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.isDisabled = false
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
      })
    },
    vendorNoChange() {
      this.checkedGoodsList = []
    },
    doCancelHandel() {
      this.closePage('/sale_mgt')
    }
  }
}
</script>