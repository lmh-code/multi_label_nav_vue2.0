<template>
  <el-row class="invoice-form" v-loading ="loading" :gutter="6">
      <el-form label-width="40px" size="small" label-position="top">
        <el-col :span="1">
          <el-button size="mini" icon="el-icon-delete" class="fs28 mt28" circle @click="deleteLine"></el-button>
            <!-- <i class="el-icon-delete fs28 mt28" @click="deleteLine"></i> -->
        </el-col>
        <el-col :span="3">
          <el-form-item label="发票种类:" >
            <el-select v-model="info.invoiceTypeCode" :disabled="cantEdit" placeholder="请选择" @change="handleChange">
              <el-option
                v-for="item in invoiceTypeCodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="发票日期:">
            <el-date-picker 
              :disabled="cantEdit"
              v-model="info.invoiceDate" 
              type="date"
              style="width: 100%"
              placeholder="发票日期"
              format="yyyy-MM-dd" 
              value-format="yyyy-MM-dd"
              @change="handleChange" >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="发票代码:">
            <el-input v-model="info.invoiceCode" :disabled="cantEdit" placeholder="发票代码" clearable @change="handleChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="发票号:">
            <el-input v-model="info.invoiceNo" :disabled="cantEdit" placeholder="发票号" clearable @change="handleChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="发票金额:">
            <el-input v-model="info.netAmount" :disabled="cantEdit" type="number" clearable placeholder="不含税金额" @change="handleChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="税率:">
            <el-select v-model="info.taxCode" :disabled="cantEdit" multiple collapse-tags placeholder="请选择" @change="handleChange">
              <el-option
                v-for="item in taxCodeOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="税额:">
            <el-input v-model="info.taxAmount" :disabled="cantEdit" type="number" clearable placeholder="税额" @change="handleChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="价税合计:">
            {{amount}}
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
</template>

<script>
import { fixedNum } from '@/utils/utils'
export default {
  model: {
    prop: "info",
    event: "change"
  },
  props: {
    cantEdit: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: {
        lineId: '',
        invoiceTypeCode: '',
        invoiceDate: '',
        invoiceCode: '',
        invoiceNo: '',
        netAmount: '',
        taxCode: '',
        taxAmount: ''
      }
    },
    invoiceTypeCodeOptions: {
      type: Array,
      default: []
    },
    taxCodeOptions: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      invoiceTypeCode: 1,
      taxCode: ['0'], //税率
      invoiceDate: '',
      invoiceCode: '',
      invoiceNo: '',
      netAmount: '', //发票金额
      taxAmount: '', //税额
    }
  },
  computed: {
    amount() {
      if(this.info.taxCode.length == 1 && this.info.netAmount) {
        if(this.info.taxCode[0] == '0') {
          this.info.taxAmount = 0
          return fixedNum(this.info.netAmount)
        } else {
          this.info.taxAmount = fixedNum((this.info.netAmount * +this.info.taxCode[0])/100)
          return fixedNum((+this.info.netAmount * 10000 + this.info.taxAmount * 10000)/10000)
        }
      } else if(this.info.taxCode.length > 1 && this.info.netAmount) {
        // this.taxAmount = ''
        return fixedNum((+this.info.taxAmount * 10000 + +this.info.netAmount * 10000)/10000)
      } else if(!this.info.netAmount) {
        this.info.taxAmount = ''
      }
      return '--'
    }
  },
  methods: {
    deleteLine() {
      this.$confirm('确定要删除该发票吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('deleteInvoiceLine', this.info.lineId)
      })
     
    },
    handleChange(e) {
      console.log('nfo::',this.info)
      this.$emit('change', {...this.info, ...{amount: this.amount === '--' ? 0 : this.amount}})
    }
  }
}
</script>
<style scoped>
.fs28 {
  font-size: 28px;
}
.mt28 {
  margin-top: 28px;
}
</style>