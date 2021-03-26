<style scoped lang="less">
.fr { position: relative; right: 0; }
.row-clolum {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .left {
    flex: 1;
  }
  .right {
    width: 100px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.suggestion { list-style: 'circle inside'!important; }
</style>
<template>
  <div>
    <div class="handel-wraper row-clolum">
      <div class="left">
        <el-button :loading="delLoading" v-if="userPermission && userPermission.includes('删除')" :type="res.state !== 0 ? '' : 'primary'" size="mini" icon="el-icon-delete" @click="operate('delete')" :disabled="res.state !== 0" >废弃
        </el-button>
        <el-button :loading="confLoading" v-if="userPermission && userPermission.includes('审核')" :type="res.state !== 0 ? '' : 'primary'" size="mini" @click="operate('confirm')" :disabled="res.state !== 0" >审核
        </el-button>
      </div>
      <div class="right">
        <el-popover
          class="fr"
          placement="bottom"
          width="320"
          trigger="hover"
          title="说明">
          <ul class="suggestion">
            <li>类型：供应商默认报价类型为自主报价，且不可编辑；采购方可发起采购询报价和促销询报价；</li>
            <li>当单据类型为采购询价及促销询价时，商品不可导入、添加、删除。</li>
            <li>预计进货量：由采购方提供。<br/>
            当前定价：当前供应价；<br/>
            调整额：本次报价-当前定价；
            </li>
            <li>调整率：调整额/本次报价</li>
          </ul>
          <span class="el-icon-question" slot="reference">说明</span>
        </el-popover>
      </div>
    </div>
    <div class="search-form-wraper">
      <el-form label-position="top" ref="ruleForm" :rules="rules" :model="ruleForm">
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
        <el-form-item label="类型" prop="type">
          <el-input 
            v-model.trim="ruleForm.typeName" 
            size="small" 
            class="add-input" 
            disabled
            clearable
            placeholder="类型">
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
        <el-form-item label="供应商" prop="vendorName">
          <el-input 
            v-model.trim="ruleForm.vendorName" 
            size="small" 
            class="add-input" 
            disabled
            clearable
            placeholder="选择供应商">
          </el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="goodsCategoryName">
          <el-input 
            v-model.trim="ruleForm.goodsCategoryName" 
            size="small" 
            class="add-input" 
            disabled
            clearable
            placeholder="选择商品分类">
          </el-input>
        </el-form-item>
        <el-form-item label="生效起始日期" prop="startTime">
          <el-date-picker 
            clearable
            class="add-input" 
            v-model="ruleForm.startTime" 
            type="date" 
            placeholder="生效起始日期"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd"
            disabled 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生效终止日期" prop="endTime">
          <el-date-picker 
            clearable
            class="add-input" 
            v-model="ruleForm.endTime" 
            type="date" 
            placeholder="生效终止日期"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            disabled
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input 
            v-model.trim="ruleForm.remark" 
            size="small" 
            class="add-input" 
            clearable
            placeholder="备注">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-form-wraper">
      <el-form>
        <el-form-item label="选择商品">
          <el-button :type="type !== 2 || res.state !== 0 ? '' : 'primary'" :disabled='type !== 2 || res.state !== 0' @click="showAddGoodsDialog" size="mini"  icon="el-icon-plus">添加商品</el-button>
          <el-button :type="type !== 2 || res.state !== 0 ? '' : 'primary'" :disabled='type !== 2 || res.state !== 0' @click="showModal" size="mini"  icon="el-icon-upload2">导入</el-button>
          <el-button :type="type !== 2 || res.state !== 0 ? '' : 'primary'" :disabled='type !== 2 || res.state !== 0' @click="deleteProcducts" size="mini" icon="el-icon-delete">批量删除</el-button>
        </el-form-item>
        <el-form-item>
          <bl-table
            :border="false"
            :selection="true"
            :dataSource="tableData"
            :columns="columns"
            @selection-change="selectionChange"/>
        </el-form-item>
        <hr class="s-slip">
        <el-form-item>
          <el-button :loading="loading" v-if="userPermission && userPermission.includes('保存')" :type="res.state !== 0 ? '' : 'primary'" size="small" @click="operate('save')" :disabled="res.state !== 0">保存</el-button>
          <el-button size="small" @click="doCancelHandel">关闭</el-button>
        </el-form-item>

        <el-form-item label="操作记录：">
          <bl-table
            :border="false"
            :dataSource="log"
            :columns="logColumns"/>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="批量导入" :visible.sync="visible">
      <ImportExcel requireCheckTotal="true" maxTotal=1000 ref="importFile" @doExportDataHandel="doExportDataHandel" @importHandle="importHandle" @uploadEmit="uploadEmit">
        <div v-if="showImportResult" style="margin-top:30px;color:#000;">
          <span>{{importMsg}}</span>
          <span style="float:right;color:blue;" @click="(e) => {downLoadReasonExcel()}">查看错误原因</span>
        </div>
      </ImportExcel>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
    <choose-goods ref="chooseGoods" @confirm="confirmHandel"/>
  </div>
</template>
<script>
  import ChooseGoods from './ChooseGoods'
  import ImportExcel from './ImportExcel'
  import commonUrl from '@/module/api/common'
  import priceMgtUrl from '@/module/api/buyAndSale'
  import constants from './constants'
  import { fixedNum, objectToArray } from '@/utils/utils'
  import exportExcel from '@/utils/exportExcel'
  import optionsMixin from '@/module/mixin/options'
  export default {
    components: {
      ChooseGoods,
      ImportExcel
    },
    mixins: [optionsMixin],
    data() {
      return {
        userPermission: [],
        moduleId: '/quote_mgt',
        remark: '',
        statusOptions: constants.statusOptions,
        typeOptions: constants.typeOptions,
        type: '',
        tableData: [],
        columns: [
          {
            title: '商品编号',
            dataIndex: 'goodsNo',
            minWidth: 80,
          },
          {
            title: '商品简称',
            dataIndex: 'shortName',
            minWidth: 80,
          },
          {
            title:'商品规格',
            dataIndex: 'spec',
            minWidth: 80,
          },
          {
            title: '单位',
            dataIndex: 'saleUnit',
            minWidth: 60,
          },
          {
            title:'预计进货量',
            dataIndex: 'predictQty',
            minWidth: 90,
          },
          {
            title:'当前定价',
            dataIndex: 'currentPrice',
            minWidth: 80,
          },
          {
            title:'本次报价',
            dataIndex: 'quotationPrice',
            minWidth: 80,
            input: true,
            inputChangeFunc: this.numberFilter
          },
          {
            title:'报货量',
            dataIndex: 'qty',
            minWidth: 80,
            input: true,
            inputChangeFunc: this.intFilter
          },
          {
            title:'调整额',
            dataIndex: 'adjustAmount',
            minWidth: 80,
            filterFn: this.calAdjustAmount
          },
          {
            title:'调整率',
            dataIndex: 'adjustRate',
            minWidth: 80,
            filterFn: this.calAdjustRate
          },
          {
            title: '商品备注',
            dataIndex: 'remark',
            width: 150,
            input: true,
            inputChangeFunc: this.remarkFilter
          },
        ],
        loading: false,
        delLoading: false,
        confLoading: false,
        log: [],
        logColumns: [
          {
            title:'操作人',
            dataIndex: 'operationUserName',
            minWidth: 150
          },
          {
            title: '操作时间',
            dataIndex: 'time',
            minWidth: 150
          },
          {
            title:'操作内容',
            dataIndex: 'operationTypeName',
            minWidth: 150
          },
        ],
        checkedGoodsList: [],
        res: {state: 0},
        // 导入
        visible: false,
        showImportResult: false,
        exportConfig: {
          goodsNo: '商品编码',
          shortName: "商品简称",
          quotationPricetitle:'本次报价',
          qty:'报货量',
          remark: "商品备注",
          errorMsg: "错误原因"
        },
        exportConfig1: {
          goodsNo: '商品编码',
          shortName: "商品简称",
          quotationPrice:'本次报价',
          qty:'报货量',
          remark: "商品备注",
        },
        exportData:[{goodsNo: '',
        shortName: "",
        quotationPrice:'',
        qty:'',
        remark: ""}],
        selectedRowKeys: [],
        rules: {
          storeGroupName: {required: true, message: '请选择区域', trigger: 'change'}, 
          typeName: {required: true, message: '请选择调价类型', trigger: 'change'}, 
          goodsCategoryName: {required: true, message: '请选择分类', trigger: 'change'}, 
          paperNo: {required: true, message: '请输入报价单号', trigger: 'change'}, 
          vendorName: {required: true, message: '请选择供应商', trigger: 'change'}, 
          startTime: {required: true, message: '请选择生效起始日期', trigger: 'change'}, 
          endTime:{required: true, message: '请选择生效终止日期', trigger: 'change'}, 
          remark: {max: 20, message: '备注不能超过20个字', trigger: 'blur'}, 
        },
        ruleForm: {
          storeGroupName: '',
          typeName: '',
          goodsCategoryName: '',
          paperNo: '',
          vendorName: '',
          startTime: '',
          endTime:'',
          remark: '', 
        }
      }
    },
    created() {
      this.ruleForm.paperNo = this.$route.params.paperNo
      this._getQuoteDetail()
      this._getLog()
      this.userPermission = this.$store.state.common.userPermissionMap[this.moduleId]
    },
    methods: {
      _getQuoteDetail() {
        this.$loading.show()
        this.$http.post(`${priceMgtUrl.getQuoteDetail}/${this.$route.params.paperNo}`).then(res => {
          this.$loading.hide()
          if(res && res.code === 0) {
            let tableData = res.data && res.data.details || []
            tableData = (tableData || []).map(t => {
              t.adjustAmount = this.calAdjustAmount(t, t.adjustAmount+'')
              t.adjustRate = this.calAdjustRate(t, t.adjustAmount+'')
              return t
            })
            this.tableData = tableData, 
            this.ruleForm = {...res.data}
            this.res = {...res.data}
          }else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.$loading.hide()
          this.$tip.notify(err.message, 'error')
        })
      },

      showAddGoodsDialog() {
        if(!this.ruleForm.storeGroupNo) {
          this.$tip.message("请选择区域", "warning")
          return
        }
        if(!this.ruleForm.vendorNo) {
          this.$tip.message("请选择供应商", "warning")
          return
        }
        if(!this.ruleForm.goodsCategory) {
          this.$tip.message("请选择分类", "warning")
          return
        }
        this.$nextTick(() => {
          this.$refs.chooseGoods.setDefaultMsg({
            title: '选择商品',
            vendorNo: this.ruleForm.vendorNo,
            categoryNos: this.ruleForm.goodsCategory,
            regionNo: this.ruleForm.storeGroupNo,
            defaultChecked: this.checkedGoodsList
          })
        }, () => {
          this.$refs.chooseGoods.doSearchHandle()
        })
        
      },

      confirmHandel(result) {
        this.checkedGoodsList = [...result]
        let newData = this.checkedGoodsList.filter(t => {
          return !this.tableData.find(k => {
            return k.goodsNo == t.goodsNo
          })
        })
        this.tableData = this.tableData.concat(newData)
      },

      numberFilter(text) {
        if(text) {
          text = text + ''
          // if(text == '') return '0'
          let result = text && text.replace && text.replace(/[^0-9.]/gi, '')
          result = result && result.replace && result.replace(/^(\.)+/g, '')
          result = result && result.replace && result.match(/^(0|([1-9]\d*))(\.\d{1,2})?/g)
          return result && result.length && result[0]
        }
      },

      intFilter(text) {
        text = text + ''
        let result = text && text.replace && text.replace(/[\D]/gi, '')
        result = result && result.replace && result.match(/^(0|[1-9]\d*)/g)
        return result && result.length && result[0]
      },

      calAdjustAmount(record, text) {
        let sign = ((record.quotationPrice || 0) - (record.currentPrice || 0)) < 0 ? '-' : ''
        let result = record ? `${sign}${this.numberFilter(fixedNum((record.quotationPrice || 0) - (record.currentPrice || 0)) + '')}` : ''
        return result
      },

      calAdjustRate(record, text) {
        let sign = ((record.quotationPrice || 0) - (record.currentPrice || 0)) * (record.quotationPrice || 0) < 0 ? '-' : ''
        let adjustAmount = record ? `${sign}${this.numberFilter((record.quotationPrice || 0) - (record.currentPrice || 0) + '')}` : ''
        let result = (record && record.quotationPrice && record.quotationPrice != '0' ) ? fixedNum((adjustAmount || 0) / record.quotationPrice * 100, 0) : ''
        return `${result}${result == 0 ? '' : '%'}`
      },

      remarkFilter(text) {
        if(text) {
          let result = text && text.substring && text.substring(0, 20)
          return result
        }
        
      },

      saveAndLaunch(type) {
        return new Promise((resolve, reject) => {
          this.$refs.ruleForm.validate((valid) => {
            if(!valid) {
              reject(false)
              return
            }
            let { tableData } = this
            let { endTime, startTime, goodsCategory: category,  } = this.ruleForm
            if(!tableData || !tableData.length) {
              this.$tip.message('请选择商品', 'warning')
              reject(false)
              return
            }
            // 至少一条商品有价格信息，才允许提交
            let noPrice = true
            let res = (tableData || []).map(t => {
              if(t.quotationPrice) {
                noPrice = false
              }
              return t
            })
            if(noPrice) {
              this.$tip.message('商品价格信息缺失，请补充', 'warning')
              reject(false)
              return
            }
            this.addOrUpdateQuote(type).then(res => {
              resolve(res)
            }).catch(err => {
              reject(err)
            })
          })
        })
      },

      /**
       * 修改报价单接口请求
       */
      addOrUpdateQuote (type) {
        return new Promise((resolve, reject) => {
          let { startTime, endTime, remark, vendorNo, storeGroupNo, goodsCategory} = this.ruleForm
          let paperNo = this.$route.params.paperNo
          let tableData = this.tableData
          let goods = (tableData || []).map(t => {
            let quotationPrice = this.numberFilter(t.quotationPrice)
            t.quotationPrice = typeof(quotationPrice) === 'string' ? parseFloat(quotationPrice) : quotationPrice
            t.qty = this.intFilter(t.qty)
            return t
          })
          for(let i = 0; i < goods.length; i++) {
            goods[i].remark = this.remarkFilter(goods[i].remark) 
          }
          let param = {
            vendorNo,
            endTime,
            startTime,
            details: goods,
            goodsCategoryNo: goodsCategory,
            storeGroupNo,
            remark,
            paperNo, 
          }
          this.loading = true
          this.$http.post(priceMgtUrl.addOrUpdateQuote, param).then(res => {
            this.loading = false
            if(res && res.code === 0) {
              this.$tip.message('保存成功', 'success')
              if(type === 'save') {
                this._getQuoteDetail()
                this._getLog()
                this.editSuccessHandel('/quote_mgt')
              }
              resolve(res)
            } else {
              this.$tip.notify(res.msg, 'error')
              reject(res.msg)
            }
          }).catch(err => {
            this.loading = false
            this.confirmLoading = false
            this.$tip.notify(err.message, 'error')
            reject(err)
          })
        })
        
      },

      _getLog() {
        let param = { keyValue: this.$route.params.paperNo}
        this.$http.post(priceMgtUrl.getOperationLog, param).then(res => {
          if(res && res.code === 0) {
            this.log = res.data
          } else {
              this.$tip.notify(res.msg, 'error')
            }
          }).catch(err => {
            this.$tip.notify(err.message, 'error')
          })
      },

      operate(type) {
        if(type === 'delete') {
          this.deleteQuote()
        } else if(type === 'confirm'){
          this.confirmQuote()
        } else if(type === 'save') {
          this.saveAndLaunch(type)
        }
      },

      deleteQuote() {
        this.delLoading = true
        this.$http.post(`${priceMgtUrl.deleteQuote}/${this.ruleForm.paperNo}`).then(res => {
          this.delLoading = false
          if(res && res.code === 0) {
            this.$tip.message('废弃成功', 'success')
            // 设置刷新列表页状态
            this.deleteSuccessHandel('/quote_mgt')
          } else {
              this.$tip.notify(res.msg, 'error')
            }
          }).catch(err => {
            this.delLoading = false
            this.$tip.notify(err.message, 'error')
          })
      },

      confirmQuote() {
        this.confLoading = true
        this.saveAndLaunch().then(data => {
          this.$http.post(`${priceMgtUrl.confirmQuote}/${this.ruleForm.paperNo}`).then(res => {
            this.confLoading = false
            if(res && res.code === 0) {
              this.$tip.message('已审核', 'success')
              this._getQuoteDetail()
              this._getLog()
              this.editSuccessHandel('/quote_mgt')
            } else {
              this.$tip.notify(res.msg, 'error')
            }
          }).catch(err => {
            this.confLoading = false
            this.$tip.notify(err.message, 'error')
          })
        }).catch(err => {
          this.confLoading = false
        })
      },
      /**
       * 导入
       */
      showModal() {
        if(!this.ruleForm.storeGroupNo) {
          this.$tip.message('请先选择区域', 'warning')
          return
        }
        if(!this.ruleForm.vendorNo) {
          this.$tip.message('请选择供应商', 'warning')
          return
        }
        if(!this.ruleForm.goodsCategory) {
          this.$tip.message('请选择分类', 'warning')
          return
        }
        this.visible = true
      },

      handleOk() {
        this.visible = false
        if(this.timeout) clearTimeout(this.timeout)
        if(!this.timeout) { // 没有timeout时立即执行
          this.confirmLoading = true
          let tableData = this.tableData
          let importDataUnique = (this.tableDataTmp || []).filter(t => {
            let isDuplicate = tableData.some(k => t.goodsId == k.goodsId)
            return !isDuplicate
          })
          this.visible = false
          this.confirmLoading = false
          this.tableData = (this.tableData || []).concat(importDataUnique || [])
          this.importMsg = ''
          this.showImportResult = false
          this.$refs.importFile.fileName = "未选择文件..."
        }
        this.timeout = setTimeout(() => {
          this.timeout = null
        }, 5000)
      },

      handleCancel() {
        this.visible = false
      },

      doExportDataHandel() {
        let exportData = this.exportData
        const tHeader = objectToArray(this.exportConfig1, false)
        const filterVal = objectToArray(this.exportConfig1, true)
        exportExcel.ExportJsonToExcel({
          header: tHeader,
          filterVal,
          data: exportData, 
          filename: '供应商报价导入模板'
        })
      },

      downLoadReasonExcel() {
        let exportData = this.errDataDownload
        const tHeader = objectToArray(this.exportConfig, false)
        const filterVal = objectToArray(this.exportConfig, true)
        exportExcel.ExportJsonToExcel({
          header: tHeader,
          filterVal,
          data: exportData, 
          filename: '报价导入错误'
        })
      },

      importHandle(data) {
        let tableData = []
        let result = (data || []).map(t => {
          let row = {}
          for(let i in t) {
            switch(i) {
              case "商品编码":
                row['goodsNo'] = t[i]
                break;
              case "商品简称":
                row['shortName'] = t[i]
                break;
              case "本次报价":
                row['quotationPrice'] = t[i]
                break;
              case "报货量":
                row['qty'] = t[i]
                break;
              case "商品备注":
                row['remark'] = t[i]
                break;
              case "错误原因":
                row['errorMsg'] = t[i]
                break;
              default:
                break;
            }
          }
          tableData.push(row)
          return t
        })
        this._checkImportFile(tableData)
      },

      _checkImportFile(tableData) {
        let details = (tableData || []).map(t => {
          t.goodsId = ''
          return t
        })
        let { endTime, startTime, vendorNo, storeGroupNo, goodsCategory, paperNo, remark } = this.ruleForm
        let _param = {
          endTime,
          startTime,
          goodsCategoryNo: goodsCategory,
          storeGroupNo,
          vendorNo,
          // 非必传
          details: details,
          paperNo,
          remark
        }
        this.$http.post(priceMgtUrl.importQuote, _param).then(res => {
          if(res && res.code === 0) {
            let details = res.data.details || []
            let errData = res.data.errorInfos || []
            let importMsg = `导入成功${details.length || 0}条，失败${errData.length}条`
            
            let errDataDownload = tableData.map(t => {
              let index = errData.findIndex(item => {
                return t.goodsNo == item.goodsNo
              })
              if(index != -1) {
                t.errorMsg = errData[index].errorMsg
              }
              return t
            })
            this.showImportResult = true
            this.importMsg = importMsg
            this.errData = errData
            this.errDataDownload = errDataDownload
            this.tableDataTmp = details
          }
        })
      },

      uploadEmit(data) {
        this.importMsg = ''
        this.showImportResult = false
        this.errData = []
        this.errDataDownload = []
        this.tableDataTmp = []
      },
      
      // 批量删除
      deleteProcducts() {
        let newData = [...this.tableData];
        newData = newData.filter(item => {
          return (this.selectedRowKeys || []).indexOf(item.goodsNo) === -1
        })
        this.tableData = newData
        this.selectedRowKeys = [] 
      },

      selectionChange(selections) {
        let selection = selections.selection
        this.selectedRowKeys = selection.map(t => {
          return t.goodsNo
        })
      },

      handleSave(row) {
        const newData = [...this.tableData];
        const index = newData.findIndex(item => row.goodsNo === item.goodsNo);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.tableData = newData
      },

      doCancelHandel() {
        this.closePage('/quote_mgt')
      }
    }
  }
</script>