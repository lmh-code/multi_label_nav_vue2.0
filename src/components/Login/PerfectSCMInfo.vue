<style scoped lang="less">
  .perfect-container {
    height: 100%;
    .header-wrap {
      padding: 0; 
      height: 50px !important;
    }
    .main-container {
      height: calc(100% - 50px);
      overflow-y: auto;
      padding: 6px 100px 50px;
      box-sizing: border-box;
      .container {
        padding: 10px;
        background-color: #ffffff;
        border-radius: 4px;
        .steps-wrap {
          margin: 0 auto;
          width: 500px;
        }
        .tip {
          color: @colorWarning;
          font-weight: bold;
          font-size: 16px;
        }
        .search-form-wraper {
          .el-form-item {
            margin-bottom: 22px !important;
          }
          .footer-wraper {
            text-align: center;
          }
        }
        .audit-result-wrap {
          text-align: center;
          .audit-status {
            margin: 50px auto 30px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            text-align: center;
            line-height: 100px;
            font-size: 18px;
            font-weight: bold;
            color: @colorWhite;
          }
          .audit-status.success {
            background-color: @colorSuccess;
          }
          .audit-status.warning {
            background-color: @colorWarning;
          }
          .audit-status.error {
            background-color: @colorError;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="perfect-container" v-loading="loading">
    <el-header class="header-wrap">
      <header-wraper 
        :showSwitch="false"
        :showRefresh="false"
        @changePass="changePass" 
        ref="headerWraper"></header-wraper>
    </el-header>
    <div class="main-container">
      <div class="container">
        <div class="steps-wrap">
          <el-steps 
            align-center
            :active="stepActive" 
            finish-status="success">
            <el-step title="企业信息"></el-step>
            <el-step title="审核"></el-step>
          </el-steps>
        </div>
        <div v-show="stepActive === 0">
          <div class="handel-wraper tip">
            请补充相关信息，以便工作人员与您接洽:
          </div>
          <div class="search-form-wraper">
            <el-form 
              label-position="top" 
              ref="ruleForm" 
              :rules="formRules"
              :model="formData">
              <el-form-item label="供应商名称" required>
                <el-input 
                  v-model.trim="formData.vendorName" 
                  size="small" 
                  class="form-item-medium" 
                  disabled
                  placeholder="供应商名称">
                </el-input>
              </el-form-item>
              <el-form-item label="供应商简称" prop="vendorShortName">
                <el-input 
                  v-model.trim="formData.vendorShortName" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="供应商简称"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="供应商类型" prop="vendorTypeCode">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.vendorTypeCode" 
                  placeholder="供应商类型" 
                  clearable
                  size="small"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in vendorTypeOptions" 
                    :key="item.code" 
                    :label="item.value" 
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司类型" prop="orgFormCode">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.orgFormCode" 
                  placeholder="公司类型" 
                  clearable
                  size="small"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in orgFormOptions" 
                    :key="item.code" 
                    :label="item.value" 
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="统一社会信用代码" prop="taxNo">
                <el-input 
                  v-model.trim="formData.taxNo" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="统一社会信用代码"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="经营品类" prop="goodsCategorys">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.goodsCategorys" 
                  placeholder="经营品类" 
                  multiple
                  collapse-tags
                  size="small"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in goodsCategorysOptions" 
                    :key="item.id" 
                    :label="item.name" 
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="服务城市" required>
                <el-popover
                  placement="bottom-end"
                  width="260"
                  trigger="hover">
                  <div style="max-height: 350px; overflow-y: auto;">
                    <el-tree
                      :data="businessCityOptions"
                      show-checkbox
                      node-key="id"
                      ref="businessCityTree"
                      highlight-current
                      :default-expanded-keys="[2]"
                      :props="defaultProps"
                      @check-change="businessCityCheckChange">
                    </el-tree>
                  </div>
                  <el-input 
                    slot="reference"
                    v-model="businessCityNames" 
                    size="small" 
                    class="form-item-medium" 
                    placeholder="选择服务城市"
                    readonly
                    :disabled="isDisabled">
                  </el-input>
                </el-popover>
              </el-form-item>
              <el-form-item label="优势产品" required>
                <div class="form-item-medium">
                  <el-button size="mini" icon="el-icon-upload2" @click="showUploadDialog" :disabled="isDisabled">点击上传</el-button>
                  <el-button type="text" size="mini" v-if="superiorProducts.length > 0" @click="showProductsDialog = true">查看优势产品</el-button>
                </div>
              </el-form-item>
              <el-form-item label="合作模式" prop="tradeModeId">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.tradeModeId" 
                  placeholder="合作模式" 
                  clearable
                  size="small"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in tradeModeIdOptions" 
                    :key="item.code" 
                    :label="item.value" 
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="加工能力" prop="boolMachining">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.boolMachining" 
                  placeholder="加工能力" 
                  clearable
                  size="small"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in boolMachiningOptions" 
                    :key="item.value" 
                    :label="item.label" 
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="注册资金（万元）" prop="registerAmount">
                <el-input 
                  v-model.trim="formData.registerAmount" 
                  size="small" 
                  class="form-item-medium" 
                  clearable
                  placeholder="注册资金（万元）"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="实收资本（万元）" prop="realAmount">
                <el-input 
                  v-model.trim="formData.realAmount" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="实收资本（万元）"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="成立日期" prop="createTime">
                <el-date-picker 
                  clearable
                  class="form-item-medium" 
                  v-model="formData.createTime" 
                  type="date" 
                  placeholder="成立日期"
                  format="yyyy-MM-dd" 
                  value-format="yyyy-MM-dd" 
                  size="small"
                  :disabled="isDisabled">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="经营截止日期" prop="endTime">
                <el-date-picker 
                  clearable
                  class="form-item-medium" 
                  v-model="formData.endTime" 
                  type="date" 
                  placeholder="经营截止日期"
                  format="yyyy-MM-dd" 
                  value-format="yyyy-MM-dd" 
                  size="small"
                  :disabled="isDisabled">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="法定代表人姓名" prop="legalPersonName">
                <el-input 
                  v-model.trim="formData.legalPersonName" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="法定代表人姓名"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="年销售额（万元）" prop="yearSaleAmount">
                <el-input 
                  v-model.trim="formData.yearSaleAmount" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="年销售额（万元）"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="经营范围（按执照内容填写）" prop="businessScope">
                <el-input 
                  v-model.trim="formData.businessScope" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="经营范围（按执照内容填写）"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="服务客户" prop="customerGroup">
                <el-input 
                  v-model.trim="formData.customerGroup" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="服务客户"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="业务联系人" prop="salemanName">
                <el-input 
                  v-model.trim="formData.salemanName" 
                  size="small" 
                  class="form-item-medium" 
                  clearable
                  placeholder="业务联系人"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="业务联系电话" prop="salemanPhone">
                <el-input 
                  v-model.trim="formData.salemanPhone" 
                  size="small" 
                  class="form-item-medium" 
                  clearable
                  placeholder="业务联系电话"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="mail">
                <el-input 
                  v-model.trim="formData.mail" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="邮箱"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="传真">
                <el-input 
                  v-model.trim="formData.fax" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="传真"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="开票类型" prop="taxTypeCode">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.taxTypeCode" 
                  placeholder="开票类型" 
                  clearable
                  size="small"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in taxTypeOptions" 
                    :key="item.code" 
                    :label="item.value" 
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="注册地（省）" prop="registryProvinceId">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.registryProvinceId" 
                  placeholder="注册地（省）" 
                  clearable
                  filterable
                  size="small"
                  @change="provinceChange"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in provinceList" 
                    :key="item.id" 
                    :label="item.name" 
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="注册地（市）" prop="registryCityId">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.registryCityId" 
                  placeholder="注册地（市）" 
                  clearable
                  filterable
                  size="small"
                  @change="cityChange"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in cityList" 
                    :key="item.id" 
                    :label="item.name" 
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="注册地（详细地址）" prop="registryAddress">
                <el-input 
                  v-model.trim="formData.registryAddress" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="注册地（详细地址）"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="开户名" prop="bankUserName">
                <el-input 
                  v-model.trim="formData.bankUserName" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="开户名"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="发卡行" prop="bankId">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.bankId" 
                  placeholder="发卡行" 
                  clearable
                  filterable
                  size="small"
                  @change="getBankBranchList"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in bankList" 
                    :key="item.id" 
                    :label="item.bankName" 
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开户支行" prop="bankBranchId">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.bankBranchId" 
                  placeholder="开户支行" 
                  clearable
                  filterable
                  size="small"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in bankBranchList" 
                    :key="item.id" 
                    :label="item.bankName" 
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="银行账号" prop="account">
                <el-input 
                  v-model.trim="formData.account" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="银行账号"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
              <el-form-item label="付款方式" prop="paymentMethodCode">
                <el-select 
                  class="form-item-medium" 
                  v-model="formData.paymentMethodCode" 
                  placeholder="付款方式" 
                  clearable
                  size="small"
                  :disabled="isDisabled">
                  <el-option 
                    v-for="item in paymentMethodOptions" 
                    :key="item.code" 
                    :label="item.value" 
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="推荐人">
                <el-input 
                  v-model.trim="formData.recommender" 
                  size="small" 
                  clearable
                  class="form-item-medium" 
                  placeholder="推荐人"
                  :disabled="isDisabled">
                </el-input>
              </el-form-item>
            </el-form>
            <hr class="s-slip-tb">
            <div class="footer-wraper">
              <el-button v-if="!isDisabled" :disabled="saveLoading" :loading="saveLoading && saveType === 1" @click="doSaveHandle(1)" size="mini">暂 存</el-button>
              <el-button v-if="!isDisabled" :disabled="saveLoading" :loading="saveLoading && saveType === 2" type='primary' @click="doSaveHandle(2)" size="mini">提 交</el-button>
              <el-button icon="el-icon-right" v-if="isDisabled" size="mini" @click="stepActive = 1">下一步</el-button>
            </div>
          </div>
        </div>
        <div 
          v-show="stepActive === 1" 
          class="audit-result-wrap">
          <div class="audit-status" :class="auditTag === 2 ? 'warning' : auditTag === 32 ? 'error' : auditTag === 4 ? 'success' : ''">
            <!-- tag审核状态: -1:待注册 0:已保存 2:待审核 4:已审核 32:驳回 -->
            {{auditTag === 2 ? '信息审核中' : auditTag === 32 ? '审核未通过' : auditTag === 4 ? '审核通过' : '--'}}
          </div>
          <div>
            {{auditTag === 2 ? '您的入驻申请已提交成功，工作人员将及时与您联络，请您耐心等待并留意消息通知！' : auditTag === 32 ? `您的入驻申请审核未通过，原因：${formData.remark || '--'}` : auditTag === 4 ? '账号审核通过，请退出重新登录！' : ''}}
          </div>
          <hr class="s-slip-tb">
          <el-button icon="el-icon-back" size="mini" @click="stepActive = 0">上一步</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="优势产品" 
      :visible.sync="showProductsDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width='70%'>
      <bl-table 
        :dataSource="superiorProducts"
        :columns="productsTableColumns"
        :maxHeight="400"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showProductsDialog = false" size="mini">关闭</el-button>
      </div>
    </el-dialog>
    <change-pass ref="changePass" />
    <add-by-excel 
      title="上传优势产品"
      ref="uploadByExcel"
      :visible="visible"
      :exportConfig="exportConfig"
      @close="closeDialog"
      @confirm="confirmHandle"/>
  </div>
</template>
<script>
import {checkStr} from '@/utils/validate'
import {changeDateToTimestamp} from '@/utils/utils'
import commonAjaxHandel from '@/server/Common'
import perfectSCMAjaxHandel from '@/server/perfectSCM'
import Storage from '@/utils/localStorage'
import ChangePass from "@/components/Common/ChangePass"
import Header from "@/components/Layout/components/Header"
import AddByExcel from "@/components/Common/Excel/AddByExcel"
export default {
  components: {
    "header-wraper": Header,
    "change-pass": ChangePass,
    "add-by-excel": AddByExcel
  },
  data() {
    const salemanPhoneValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入业务联系电话'));
      } else if(!checkStr(value, 'phone')) {
        callback(new Error('业务联系电话格式不正确'));
      }else {
        callback();
      }
    }
    const mailValidator = (rule, value, callback) => {
      if(value) {
        if(!checkStr(value, 'email')) {
          callback(new Error('邮箱格式不正确'));
        }else { 
          callback();
        }
      }else {
        callback();
      }
    }
    const registerAmountValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入注册资金'));
      } else if(!checkStr(value, 'money4')) {
        callback(new Error('注册资金格式不正确，仅为数字，有小数保留小数点后4位'));
      }else {
        callback();
      }
    }
    const amountValidator = (rule, value, callback) => {
      if(value) {
        if(!checkStr(value, 'money4')) {
          callback(new Error('金额格式不正确，仅为数字，有小数保留小数点后4位'));
        }else {
          callback();
        }
      }else {
        callback();
      }
    }
    const accountValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入银行账号'));
      } else if(!checkStr(value, 'bank')) {
        callback(new Error('银行账号格式不正确'));
      }else {
        callback();
      }
    }
    const checkTimeRange = (rule, value, callback) => {
      if(this.formData.createTime && this.formData.endTime) {
        if(changeDateToTimestamp(this.formData.createTime) > changeDateToTimestamp(this.formData.endTime)) {
          callback(new Error('经营截止时间不能早于成立时间'));
        }else {
          callback();
        }
      }else {
        callback();
      }
    }
    return {
      loading: false,
      stepActive: 0,
      auditTag: -1, // 审核状态
      isDisabled: false, // 可编辑内容的地方是否可编辑
      visible: false,
      saveLoading: false,
      saveType: 1,
      exportConfig: {
        goodsName: '*商品名称',
        spec: '规格',
        unit: '单位',
        advantageLevel: '*优势等级',
        price: '报价（含税）',
        salePrice: '建议零售价 (含税）',
        tax: '税率',
        currency: '币别',
        qualityGuaranteePeriod: '保质期',
        temperature: '储存温区',
        remark: '备注'
      },
      formRules: {
        vendorShortName: [
          { required: true, message: '请输入供应商简称', trigger: 'blur' },
          { min: 1, max: 20, message: '供应商简称长度在1到20个字符', trigger: 'blur' }
        ],
        vendorTypeCode: [
          { required: true, message: '请选择供应商类型', trigger: 'change' }
        ],
        orgFormCode: [
          { required: true, message: '请选择公司类型', trigger: 'change' }
        ],
        taxNo: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          { min: 1, max: 20, message: '统一社会信用代码长度在1到20个字符', trigger: 'blur' }
        ],
        goodsCategorys: [
          { required: true, message: '请选择经营品类', trigger: 'change' }
        ],
        tradeModeId: [
          { required: true, message: '请选择合作模式', trigger: 'change' }
        ],
        boolMachining: [
          { required: true, message: '请选择加工能力', trigger: 'change' }
        ],
        registerAmount: [
          { required: true, validator: registerAmountValidator, trigger: 'blur' }
        ],
        realAmount: [
          { required: false, validator: amountValidator, trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '请选择成立日期', trigger: 'change' },
          { validator: checkTimeRange, trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择经营截止日期', trigger: 'change' },
          { validator: checkTimeRange, trigger: 'change' }
        ],
        legalPersonName: [
          { required: true, message: '请输入法定代表人姓名', trigger: 'blur' },
          { min: 1, max: 50, message: '法定代表人姓名长度在1到50个字符', trigger: 'blur' }
        ],
        yearSaleAmount: [
          { required: false, validator: amountValidator, trigger: 'blur' }
        ],
        businessScope: [
          { required: false, min: 0, max: 500, message: '经营范围长度在限500个字符', trigger: 'change' }
        ],
        customerGroup: [
          { required: false, min: 0, max: 10, message: '服务客户长度在限100个字符', trigger: 'change' }
        ],
        salemanName: [
          { required: true, message: '请输入业务联系人', trigger: 'blur' }
        ],
        salemanPhone: [
          { required: true, validator: salemanPhoneValidator, trigger: 'blur' }
        ],
        mail: [
          { required: false, validator: mailValidator, trigger: 'blur' }
        ],
        taxTypeCode: [
          { required: true, message: '请选择开票类型', trigger: 'change' }
        ],
        registryProvinceId: [
          { required: true, message: '请选择注册地（省）', trigger: 'change' }
        ],
        registryCityId: [
          { required: true, message: '请选择注册地（市）', trigger: 'change' }
        ],
        registryAddress: [
          { required: true, message: '请输入注册地（详细地址）', trigger: 'blur' }
        ],
        bankUserName: [
          { required: true, message: '请输入开户名', trigger: 'blur' }
        ],
        bankId: [
          { required: true, message: '请选择发卡行', trigger: 'change' }
        ],
        bankBranchId: [
          { required: true, message: '请选择开户支行', trigger: 'change' }
        ],
        account: [
          { required: true, validator: accountValidator, trigger: 'blur' }
        ],
        paymentMethodCode: [
          { required: true, message: '请选择付款方式', trigger: 'change' }
        ]
      },
      formData: {
        vendorName: Storage.get('loginInfo') ? Storage.get('loginInfo').userNickname : '',
        vendorShortName: '',
        vendorTypeCode: '',
        orgFormCode: '',
        taxTypeCode: '',
        paymentMethodCode: '',
        taxNo: '',
        tradeModeId: '1', // 合作模式
        goodsCategorys: [], // 经营品类
        businessCityIds: [], // 服务城市
        boolMachining: '',
        registerAmount: '', // 注册资金
        realAmount: '', // 是搜资本
        createTime: '', // 成立日期
        endTime: '', // 经营截止日期
        legalPersonName: '', // 法人
        yearSaleAmount: '',
        businessScope: '',
        customerGroup: '',
        salemanName: '', // 业务联系人
        salemanPhone: '', // 业务联系电话
        mail: '',
        fax: '',
        registryProvinceId: '',
        registryCityId: '',
        registryAddress: '',
        bankUserName: '', // 开户人
        bankId: '',
        bankBranchId: '',
        account: '', // 银行卡账号
        recommender: ''
      },
      taxTypeOptions: [],
      vendorTypeOptions: [],
      orgFormOptions: [],
      paymentMethodOptions: [],
      businessCityNames: '', // 选中的服务城市，仅为展示使用
      businessCityOptions: [], // 服务城市
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      superiorProducts: [], // 优势产品列表
      showProductsDialog: false, // 打开查看优势产品弹窗
      productsTableColumns: [
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          minWidth: 100,
          ellipsis: true
        },
        {
          title: '规格',
          dataIndex: 'spec',
          minWidth: 70,
          ellipsis: true
        },
        {
          title: '单位',
          dataIndex: 'unit',
          minWidth: 70,
          ellipsis: true
        },
        {
          title: '优势等级',
          dataIndex: 'advantageLevel',
          minWidth: 90,
          ellipsis: true
        },
        {
          title: '报价',
          dataIndex: 'price',
          minWidth: 90,
          ellipsis: true
        },
        {
          title: '建议零售价',
          dataIndex: 'salePrice',
          minWidth: 100,
          ellipsis: true
        },
        {
          title: '税率',
          dataIndex: 'tax',
          minWidth: 70,
          ellipsis: true
        },
        {
          title: '币别',
          dataIndex: 'currency',
          minWidth: 70,
          ellipsis: true
        },
        {
          title: '保质期',
          dataIndex: 'qualityGuaranteePeriod',
          minWidth: 80,
          ellipsis: true
        },
        {
          title: '储存温区',
          dataIndex: 'temperature',
          minWidth: 90,
          ellipsis: true
        },
        {
          title: '备注',
          dataIndex: 'remark',
          minWidth: 100,
          ellipsis: true
        }
      ],
      // 合作模式：1购销 2代销 3代营 4商家入驻
      tradeModeIdOptions: [],
      boolMachiningOptions: [
        {
          label: '有',
          value: true
        },
        {
          label: '无',
          value: false
        }
      ],
      goodsCategorysOptions: [],
      provinceList: [],
      cityList: [],
      bankList: [], // 总行信息
      bankBranchList: [] // 支行信息
    }
  },
  async mounted() {
    this.getFirstCategory() // 获取经营品类
    this.getByCommonCodes() // 获取各种状态
    this.getProvinceList() // 获取注册省份
    this.getBankList() // 获取银行
    this.getRegionTree() // 获取区域树状结构

    // 调用接口获取供应商当前提交信息状态
    let guideRes = await perfectSCMAjaxHandel.getUrlGuide()
    if(guideRes.code === 0 && guideRes.data) {
      // tag审核状态: -1:待注册 0:已保存 2:待审核 4:已审核 32:驳回
      this.auditTag = guideRes.data && guideRes.data.tag
      this.stepActive = guideRes.data.tag === 2 || guideRes.data.tag === 4 || guideRes.data.tag === 32 ? 1 : 0
      // TODO: 32:驳回  被驳回之后目前先不支持可再次编辑，下期再优化
      this.isDisabled = guideRes.data.tag === 2 || guideRes.data.tag === 4 || guideRes.data.tag === 32 ? true : false
      if(guideRes.data.tag === 4) this.$router.replace('/index') 
      if(guideRes.data.tag !== -1) this.getSCMInfo()
    }else {
      console.log("获取供应商账号登录状态:", guideRes.msg);
    }
  },
  methods: {
    getSCMInfo() {
      this.loading = true
      perfectSCMAjaxHandel.getVendorInfo().then(res => {
        this.loading = false
        if(res.code === 0) {
          let detailMsg = res.data ? res.data : {}
          this.formData = {
            vendorName: detailMsg.vendorName || '',
            vendorShortName: detailMsg.vendorShortName || '',
            vendorTypeCode: detailMsg.vendorTypeCode || '',
            orgFormCode: detailMsg.orgFormCode || '',
            taxTypeCode: detailMsg.taxTypeCode || '',
            paymentMethodCode: detailMsg.paymentMethodCode || '',
            taxNo: detailMsg.taxNo || '',
            tradeModeId: detailMsg.tradeModeId ? detailMsg.tradeModeId : '',
            goodsCategorys: detailMsg.goodsCategorys || '',
            businessCityIds: detailMsg.businessCityIds || [], // 服务城市
            boolMachining: detailMsg.boolMachining || '',
            registerAmount: detailMsg.registerAmount || '',
            realAmount: detailMsg.realAmount || '',
            createTime: detailMsg.createTime ? detailMsg.createTime.slice(0, 10) : '',
            endTime: detailMsg.endTime ? detailMsg.endTime.slice(0, 10) : '',
            legalPersonName: detailMsg.legalPersonName || '',
            yearSaleAmount: detailMsg.yearSaleAmount || '',
            businessScope: detailMsg.businessScope || '',
            customerGroup: detailMsg.customerGroup || '',
            salemanName: detailMsg.salemanName || '',
            salemanPhone: detailMsg.salemanPhone || '',
            mail: detailMsg.mail || '',
            fax: detailMsg.fax || '',
            registryProvinceId: detailMsg.registryProvinceId || '',
            registryCityId: detailMsg.registryCityId || '',
            registryAddress: detailMsg.registryAddress || '',
            bankUserName: detailMsg.bankUserName || '',
            bankId: detailMsg.bankId || '',
            bankBranchId: detailMsg.bankBranchId || '',
            account: detailMsg.account || '',
            recommender: detailMsg.recommender || '',
            remark: detailMsg.remark
          }
          this.superiorProducts = detailMsg.list && detailMsg.list.length ? detailMsg.list : [] // 优势产品
          this.$refs.businessCityTree && this.$refs.businessCityTree.setCheckedKeys(detailMsg.businessCityIds || []) // 服务城市
          if(detailMsg.registryProvinceId) this.provinceChange(detailMsg.registryProvinceId, true) // 根据注册地省份id获取区域城市信息
          if(detailMsg.bankId) this.getBankBranchList(detailMsg.bankId, true) // 通过总行id获取支行信息
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.loading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    },
    changePass() {
      this.$refs.changePass && this.$refs.changePass.setDefault()
    },
    /**
     * @description: 服务城市
     * types: [0, 1, 2] // 类型，必须传连续的层级 0-全国 1-省 2-市 3-区 4-街道
     */
    getRegionTree() { 
      commonAjaxHandel.getRegionTree({types: [0, 1, 2]}).then(res => {
        if(res.code === 0) {
          this.businessCityOptions = res.data && res.data.length ? res.data : []
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        console.log("[获取区域信息，树状数据]：", e.message);
      })
    },
    businessCityCheckChange(data, checked, indeterminate) {
      setTimeout(() => {
        let checkedBusinessCity = this.$refs.businessCityTree && this.$refs.businessCityTree.getCheckedNodes(true)
        this.businessCityNames = checkedBusinessCity && checkedBusinessCity.map(item => item.name).join(',')
        this.formData.businessCityIds = checkedBusinessCity && checkedBusinessCity.map(item => item.id)
      }, 500);
    },
    getFirstCategory() {
      commonAjaxHandel.getFirstCategory().then(res => {
        if(res.code === 0) {
          let result = res.data || []
          this.goodsCategorysOptions = result.filter(item => {
            return item.id !== '00'
          })
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        console.log("[通用控件-一级分类]：", e.message);
      })
    },
    getByCommonCodes() {
      commonAjaxHandel.getByCommonCodes(['TAXTYPE', 'VendorType', 'OrgForm', 'PaymentMethod', 'VendorCooperation']).then(res => {
        this.taxTypeOptions = res.TAXTYPE || []
        this.vendorTypeOptions = res.VendorType || []
        this.orgFormOptions = res.OrgForm || []
        this.paymentMethodOptions = res.PaymentMethod || []
        this.tradeModeIdOptions = res.VendorCooperation || []
      })
    },
    getProvinceList() {
      commonAjaxHandel.getProvinceList().then(res => {
        if(res.code === 0) {
          this.provinceList = res.data || []
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        console.log("[获取省份信息]：", e.message);
      })
    },
    provinceChange(e, reset) {
      if(!reset) {
        this.formData.registryCityId = ''
        this.formData.bankId = ''
        this.formData.bankBranchId = ''
        this.cityList = []
        this.bankBranchList = []
      }
      if(!e) return
      commonAjaxHandel.getCityList({pId: e || ''}).then(res => {
        if(res.code === 0) {
          this.cityList = res.data || []
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        console.log("[根据身份id获取城市信息]：", e.message);
      })
    },
    cityChange(e) {
      this.formData.bankId = ''
      this.formData.bankBranchId = ''
    },
    getBankList() {
      commonAjaxHandel.getBankList({
        level: 1, 
        pageSize: -1
      }).then(res => {
        if(res.code === 0) {
          this.bankList = res.data && res.data.result && res.data.result.length ? res.data.result : []
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        console.log("[获取银行总行信息]：", e.message);
      })
    },
    getBankBranchList(e, reset) {
      if(!reset) {
        this.formData.bankBranchId = ''
        this.bankBranchList = []
      }
      if(!e) return
      commonAjaxHandel.getBankList({
        level: 2, 
        parentId: e || '', 
        pageSize: -1, 
        cityId: this.formData.registryCityId
      }).then(res => {
        if(res.code === 0) {
          this.bankBranchList = res.data && res.data.result && res.data.result.length ? res.data.result : []
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        console.log("[获取银行支行信息]：", e.message);
      })
    },
    showUploadDialog() {
      this.visible = true
    },
    closeDialog() {
      this.visible = false
    },
    confirmHandle(result) {
      for(let item of result.dataList) {
        if(!item.goodsName) {
          this.$tip.message("请输入优势商品名称", "warning")
          return
        }else if(!item.advantageLevel) {
          this.$tip.message("请输入优势商品的优势等级", "warning")
          return
        }else if(item.qualityGuaranteePeriod && !checkStr(item.qualityGuaranteePeriod, 'number')) {
          this.$tip.message("优势商品的保质期必须是数字", "warning")
          return
        }
      }
      this.superiorProducts = result.dataList
      this.visible = false
    },
    /**
     * @description: 提交页面数据
     * @param {number} type 事件来源 1 暂存按钮， 2 提交按钮
     * @return {*}
     */
    doSaveHandle(type) {
      this.saveType = type
      this.$refs.ruleForm.validate(async (valid) => {
        if(valid) {
          let checkedBusinessCity = this.$refs.businessCityTree && this.$refs.businessCityTree.getCheckedNodes(true)
          this.businessCityNames = checkedBusinessCity.map(item => item.name).join(',')
          this.formData.businessCityIds = checkedBusinessCity.map(item => item.id)
          if(!this.formData.businessCityIds || this.formData.businessCityIds.length === 0) {
            this.$tip.message('请先选择服务城市', 'warning')
            return
          }
          if(!this.superiorProducts || this.superiorProducts.length === 0) {
            this.$tip.message('请先上传优势产品', 'warning')
            return
          }
          let guideRes = await perfectSCMAjaxHandel.getUrlGuide()
          // tag审核状态:  -1:待注册 0:已保存 2:待审核 4:已审核  32: 驳回
          if(guideRes.code === 0 && guideRes.data) {
            let params = {
              ...this.formData,
              createTime: `${this.formData.createTime} 00:00:00`,
              endTime: `${this.formData.endTime} 23:59:59`,
              list: [...this.superiorProducts]
            }
            if(guideRes.data.tag === -1) {
              // 添加
              this.saveLoading = true
              perfectSCMAjaxHandel.perfectSCMInfoHandle({...params}).then(res => {
                this.saveLoading = false
                if(res.code === 0) {
                  if(type === 2) { // 提交
                    this.doEditVendorStatusHandle()
                  }else {
                    this.$tip.message('暂存成功', 'success')
                  }
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                this.saveLoading = false
                this.$tip.notify(e.message || '', 'error', '系统提示')
              })
            }else {
              // 编辑
              this.saveLoading = true
              perfectSCMAjaxHandel.updateSCMInfoHandle({...params}).then(res => {
                this.saveLoading = false
                if(res.code === 0) {
                  if(type === 2) { // 提交
                    this.doEditVendorStatusHandle()
                  }else {
                    this.$tip.message('暂存成功', 'success')
                  }
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                this.saveLoading = false
                this.$tip.notify(e.message || '', 'error', '系统提示')
              })
            }
          }else {
            this.$tip.message(guideRes.msg || '', 'error', '获取供应商账号登录状态')
          }
        }else {
          return false
        }
      })
    },
    /**
     * @description: 编辑成功之后修改供应商状态
     */
    doEditVendorStatusHandle() {
      this.saveLoading = true
      perfectSCMAjaxHandel.editVendorStatus({tag: 2}).then(res => {
        this.saveLoading = false
        if(res.code === 0) {
          this.$tip.message('提交成功', 'success')
          // 提交成功，账号处于待审核状态
          this.isDisabled = true
          this.auditTag = 2
          this.stepActive = 1
          return
        }
        throw new Error(res.msg)
      }).catch(e => {
        this.saveLoading = false
        this.$tip.notify(e.message || '', 'error', '系统提示')
      })
    }
  }
}
</script>