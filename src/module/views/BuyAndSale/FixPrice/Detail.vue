<template>
  <div>
    <div class="search-form-wraper">
      <el-form label-position="top" ref="ruleForm" :rules="rules" :model="ruleForm">
        <el-form-item label="单号" prop="confirmPaperNo">
          <el-input 
            v-model.trim="ruleForm.confirmPaperNo" 
            size="small" 
            class="add-input" 
            disabled
            clearable
            placeholder="单号">
          </el-input>
        </el-form-item>
        <el-form-item label="区域" prop="storeGroupName">
          <el-input 
            v-model.trim="ruleForm.storeGroupName" 
            size="small"                                               
            class="add-input" 
            disabled
            clearable
            placeholder="选择区域">
          </el-input>
        </el-form-item>
        <el-form-item label="类型" prop="typeName">
          <el-input 
            v-model.trim="ruleForm.typeName" 
            size="small" 
            class="add-input" 
            disabled
            clearable
            placeholder="选择类型">
          </el-input>
        </el-form-item>
          <el-form-item label="审核状态" prop="stateName">
          <el-input 
            v-model.trim="ruleForm.stateName" 
            size="small" 
            class="add-input" 
            disabled
            clearable
            placeholder="审核状态">
          </el-input>
        </el-form-item>
          <el-form-item label="报价单号" prop="paperNo">
            <el-input 
              v-model.trim="ruleForm.paperNo" 
              size="small" 
              class="add-input" 
              disabled
              clearable
              placeholder="报价单号">
            </el-input>
        </el-form-item>
        <el-form-item label="询价单号" prop="enquiryNo">
          <el-input 
            v-model.trim="ruleForm.enquiryNo" 
            size="small" 
            class="add-input" 
            disabled
            clearable
            placeholder="询价单号">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input 
            v-model.trim="ruleForm.remark" 
            size="small"
            clearable 
            class="add-input" 
            placeholder="备注">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="search-form-wraper">
      商品信息：
      <bl-table
      :loading="loading"
      :border="false"
      :dataSource="goods"
      :columns="columns"/>
    </div>
    
  </div>
</template>
<script>
  import commonUrl from '@/module/api/common'
  import priceMgtUrl from '@/module/api/buyAndSale'
  export default {
    data() {
      return {
        loading: false,
        tableData: [],
        confirmPaperNo: '',
        vendorName: '',
        startTime: '',
        endTime: '',
        regionName: '',
        goods: [],
        log: [],
        columns: [
          {
            title: '商品编号',
            dataIndex: 'goodsNo',
            minWidth: 80,
            ellipsis: true
            },
            {
            title: '商品简称',
            dataIndex: 'shortName',
            minWidth: 80,
            ellipsis: true
            },
            {
            title:'商品规格',
            dataIndex: 'spec',
            minWidth: 80,
            ellipsis: true
            },
            {
            title: '单位',
            dataIndex: 'saleUnit',
            minWidth: 60,
            ellipsis: true
            },
            {
            title:'结算方式',
            dataIndex: 'tradeModeName',
            minWidth: 80,
            ellipsis: true
            },
            {
            title: '供应商编码',
            dataIndex: 'vendorNo',
            minWidth: 90,
            ellipsis: true
            },
            {
            title: '供应商名称',
            dataIndex: 'vendorName',
            minWidth: 120,
            ellipsis: true
            },
            {
            title: '报货量',
            dataIndex: 'quotationQty',
            minWidth: 80,
            ellipsis: true
            },
            {
            title:'本次报价',
            dataIndex: 'confirmPrice',
            minWidth: 80,
            ellipsis: true
            },
            {
            title: '原定价',
            dataIndex: 'oldBuyPrice',
            minWidth: 80,
            ellipsis: true
            },
            {
            title: '新定价',
            dataIndex: 'newBuyPrice',
            fixed: 'right',
            width: 100,
            ellipsis: true
            },
        ],
        // 商品反选
        goodsNos: [],
        rules: {
          remark: {max: 20, message: '备注不能超过20个字', trigger: 'blur'}, 
        },
        ruleForm: {
          storeGroupName: '',
          typeName: '',
          stateName: '',
          paperNo: '',
          enquiryNo: '',
          remark: '', 
        }
      }
    },
    created() {
    },
    mounted() {
      this.confirmPaperNo = this.$route.params.confirmPaperNo || '',
      this._getDetail()
    },
    methods: {
      _getDetail() {
        this.$loading.show()
        this.$http.post(`${priceMgtUrl.getFixDetail}/${this.$route.params.confirmPaperNo}`).then(res => {
        this.$loading.hide()
        if(res && res.code === 0) {
            let goods = res.data && res.data.goodsVos
            this.goods = goods
            this.ruleForm = {...res.data}
        } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.$loading.hide()
          this.$tip.notify(err.message, 'error')
        })
      },
    },
  }
</script>