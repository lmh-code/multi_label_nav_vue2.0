<template>
  <div class="add-form-wraper">
    <el-form :model="searchContent"
      label-position="right" 
      label-width="160px"
      ref="ruleForm"
      :rules="rules">
      <el-form-item label="调价类型" prop="type">
        <el-select 
          class="add-input" 
          v-model="searchContent.type" 
          placeholder="调价类型" 
          disabled
          clearable
          size="small">
          <el-option 
            v-for="item in typeOptions" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域" prop="storeGroupNo">
        <el-select 
          class="add-input" 
          v-model="searchContent.storeGroupNo" 
          placeholder="选择区域" 
          collapse-tags
          size="small"
          clearable
          @change="areaChange">
          <el-option 
            v-for="item in regionOptions" 
            :key="item.storeGroupNo" 
            :label="item.storeGroupName" 
            :value="item.storeGroupNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商" prop="vendorNo">
        <el-select 
          class="add-input" 
          v-model="searchContent.vendorNo" 
          placeholder="选择供应商" 
          collapse-tags
          clearable
          size="small">
          <el-option 
            v-for="item in vendorOptions" 
            :key="item.vendorNo" 
            :label="item.vendorName" 
            :value="item.vendorNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品分类" prop="goodsCategoryNo">
        <el-select 
          class="add-input" 
          v-model="searchContent.goodsCategoryNo" 
          placeholder="选择分类" 
          collapse-tags
          clearable
          size="small">
          <el-option 
            v-for="item in categoryList" 
            :key="item.categoryNo" 
            :label="item.categoryName" 
            :value="item.categoryNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生效起始日期" prop="createTimeStart">
        <el-date-picker 
          clearable
          class="add-input" 
          v-model="searchContent.createTimeStart" 
          type="date"
          placeholder="生效起始日期"
          format="yyyy-MM-dd" 
          value-format="yyyy-MM-dd" 
          size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="生效终止日期" prop="createTimeEnd">
        <el-date-picker 
          clearable
          class="add-input" 
          v-model="searchContent.createTimeEnd" 
          type="date" 
          placeholder="生效终止日期"
          format="yyyy-MM-dd" 
          value-format="yyyy-MM-dd" 
          size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input 
          v-model.trim="searchContent.remark" 
          size="small" 
          class="add-input"
          clearable 
          placeholder="备注">
        </el-input>
      </el-form-item>
      <el-form-item label="选择商品">
        <el-button type='primary' @click="showAddGoodsDialog" size="mini"  icon="el-icon-plus">添加商品</el-button>
        <el-button @click="showModal" size="mini"  icon="el-icon-upload2">导入</el-button>
        <el-button type='primary' @click="deleteProcducts" size="mini" icon="el-icon-delete">批量删除</el-button>
      </el-form-item>
      <el-form-item>
        <bl-table
          :loading="loading"
          :border="false"
          :selection="true"
          :dataSource="tableData"
          :columns="columns"
          @selection-change="selectionChange"/>
      </el-form-item>
      <el-form-item>
        <hr class="s-slip-tb">
        <div class="footer-wraper">
          <el-button  v-if="userPermission && userPermission.includes('保存')" type='primary' @click="saveAndLaunch" size="mini">保存</el-button>
          <el-button size="small" @click="doCancelHandel">关闭</el-button>
        </div>
      </el-form-item>
    </el-form>
    <choose-goods ref="chooseGoods" @confirm="confirmHandel"/>
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
  </div>
</template>
<script>
  import ChooseGoods from './ChooseGoods'
  import ImportExcel from './ImportExcel'
  import commonUrl from '@/module/api/common'
  import priceMgtUrl from '@/module/api/buyAndSale'
  import constants from './constants'
  import { fixedNum, objectToArray, dateFormat } from '@/utils/utils'
  import localStorage from '@/utils/localStorage'
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
        regionOptions: '',
        categoryList: '',
        vendorOptions: '',
        searchContent: {
          type: 2, 
          storeGroupNo: '', 
          vendorNo: '',
          goodsCategoryNo: '',
          createTimeStart: dateFormat('yyyy-MM-dd', Date.parse(new Date()) + 1 * 86400000),
          createTimeEnd: dateFormat('yyyy-MM-dd', Date.parse(new Date()) + 3 * 86400000),
          remark: ''
        },
        rules:{
          type: {required: true, message: '请选择调价类型', trigger: 'change'}, 
          storeGroupNo: {required: true, message: '请选择区域', trigger: 'change'}, 
          vendorNo: {required: true, message: '请选择供应商', trigger: 'change'}, 
          goodsCategoryNo: {required: true, message: '请选择分类', trigger: 'change'}, 
          createTimeStart: {required: true, message: '请选择生效起始日期', trigger: 'change'}, 
          createTimeEnd: {required: true, message: '请选择生效终止日期', trigger: 'change'}, 
          remark: {max: 20, message: '备注不能超过20个字', trigger: 'blur'}, 
        },
        statusOptions: constants.statusOptions,
        typeOptions: constants.typeOptions,
        goodsCategoryName: '',
        vendorName: '',
        storeGroupName: '',
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
            minWidth: 150,
            input: true,
            inputChangeFunc: this.remarkFilter
          },
        ],
        loading: false,
        logLoading: false,
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
        
      }
    },
    created() {
      this._getAreas()
      this._getCategoryList()
      this.userPermission = this.$store.state.common.userPermissionMap[this.moduleId]
    },
    methods: {
       _getAreas() {
        this.loading = true
        this.$http.get(commonUrl.areaStoreGroupList).then(res => {
          this.loading = false
          if(res && res.code === 0) {
            this.regionOptions = res.data || []
          } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.loading = false
           this.$tip.notify(err.message, 'error')
        })
      },

      _getCategoryList() {
        this.loading = true
        this.$http.get(priceMgtUrl.categoryList, {parentId: 0}).then(res => {
          this.loading = false
          if(res && res.code === 0) {
            this.categoryList = res.data || []
          } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.loading = false
           this.$tip.notify(err.message, 'error')
        })
      },

      _getVendors() {
        this.loading = true
        this.$http.post(priceMgtUrl.getQuotableVendors, {storeGroupNo: this.region}).then(res => {
          this.loading = false
          if(res && res.code === 0) {
            this.vendorOptions = (res.data || []).map(t => {
              t.label = t.vendorName
              t.value = t.vendorNo 
              return t
            })
            this.$set(this.searchContent, 'vendorNo', (res.data && res.data.length && res.data[0]) ? res.data[0].vendorNo : '')
          } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.loading = false
          this.$tip.notify(err.message, 'error')
        })
      },

      areaChange() {
        this._getVendors()
      },

      showAddGoodsDialog() {
        if(!this.searchContent.storeGroupNo) {
         this.$tip.message("请选择区域", "warning")
          return
        }
        if(!this.searchContent.vendorNo) {
          this.$tip.message("请选择供应商", "warning")
          return
        }
        if(!this.searchContent.goodsCategoryNo) {
          this.$tip.message("请选择分类", "warning")
          return
        }
        this.$nextTick(() => {
          this.$refs.chooseGoods.setDefaultMsg({
            title: '选择商品',
            vendorNo: this.searchContent.vendorNo,
            categoryNos: this.searchContent.goodsCategoryNo,
            regionNo: this.searchContent.storeGroupNo,
            defaultChecked: this.checkedGoodsList
          }, () => {
            this.$refs.chooseGoods.doSearchHandle()
          })
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
        if(text || text === 0) {
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
        let result = text && text.substring && text.substring(0, 20)
        return result
      },

      saveAndLaunch() {
        return new Promise((resolve, reject) => {
          this.$refs.ruleForm.validate((valid) => {
            if(!valid) return false
            let tableData = this.tableData
            if(!tableData || !this.tableData.length) {
              this.$tip.message('请选择商品', 'warning')
              return
            }
            // 至少一条商品有价格信息，才允许提交
            let noPrice = true
            let res = (tableData || []).map(t => {
              if(t.quotationPrice && t.quotationPrice != '0') {
                noPrice = false
              }
              return t
            })
            if(noPrice) {
              this.$tip.message('商品价格信息缺失，请补充', 'warning')
              return
            }
            // 商品本次报价不能为空，可以为0，才允许提交
            // let noQuotationPrice = false
            // let tmp = (tableData || []).map(t => {
            //   if(t.quotationPrice == '' || !(t.quotationPrice || t.quotationPrice == 0)) {
            //     noQuotationPrice = true
            //   }
            //   return t
            // })
            // if(noQuotationPrice) {
            //   this.$tip.message('本次报价不能为空', 'warning')
            //   return
            // }
            this.addOrUpdateQuote().then(res => {
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
      addOrUpdateQuote () {
        return new Promise((resolve, reject) => {
          let { type, storeGroupNo, vendorNo, goodsCategoryNo, createTimeStart, createTimeEnd, remark } = this.searchContent
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
            type: 2,
            vendorNo,
            endTime: createTimeEnd,
            startTime: createTimeStart,
            details: goods,
            goodsCategoryNo: goodsCategoryNo,
            storeGroupNo,
            remark
          }
          this.loading = true
          this.$http.post(priceMgtUrl.addOrUpdateQuote, param).then(res => {
            this.loading = false
            if(res && res.code === 0) {
              this.$tip.message('添加成功', 'success')
              if(res.data) {
                // 保存成功跳转至详情
                this.closePage(`/quote_mgt/${res.data}`)
              } else {
                // 保存成功之后跳转至列表页
                this.saveSuccessHandel('/quote_mgt')
              }
              resolve(res)
            } else {
              this.$tip.notify(res.msg, 'error')
              reject(res.msg)
            }
          }).catch(err => {
            this.loading = false
            this.$tip.notify(err.message, 'error')
            reject(err)
          })
        })
        
      },

      /**
       * 导入
       */
      showModal() {
        if(!this.searchContent.storeGroupNo) {
         this.$tip.message("请选择区域", "warning")
          return
        }
        if(!this.searchContent.vendorNo) {
          this.$tip.message("请选择供应商", "warning")
          return
        }
        if(!this.searchContent.goodsCategoryNo) {
          this.$tip.message("请选择分类", "warning")
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
        this.importMsg = ''
        this.showImportResult = false
        this.$refs.importFile.fileName = "未选择文件..."
      },

      doExportDataHandel() {
        let exportData = this.exportData
        const tHeader = objectToArray(this.exportConfig1, false)
        const filterVal = objectToArray(this.exportConfig1, true)
        exportExcel.ExportJsonToExcel({
          header: tHeader,
          filterVal,
          data: exportData, //this.checkedList,
          filename: '供应商报价导入模板'
        })
        // exportSheet.exportFileByConfig(exportData, '供应商报价导入模板.xlsx', this.exportConfig1)
      },

      downLoadReasonExcel() {
        let exportData = this.errDataDownload
        const tHeader = objectToArray(this.exportConfig, false)
        const filterVal = objectToArray(this.exportConfig, true)
        exportExcel.ExportJsonToExcel({
          header: tHeader,
          filterVal,
          data: exportData, //this.checkedList,
          filename: '报价导入错误'
        })
        // exportSheet.exportFileByConfig(exportData, `报价导入错误.xlsx`, this.exportConfig)
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
        // utils.showLoading()
        let _param = {
          endTime: this.searchContent.createTimeStart,
          startTime: this.searchContent.createTimeEnd,
          goodsCategoryNo: this.searchContent.goodsCategoryNo,
          storeGroupNo:  this.searchContent.storeGroupNo,
          vendorNo: this.searchContent.vendorNo,
          // 非必传
          details: details,
          remark: this.remark
        }
        this.$http.post(priceMgtUrl.importQuote, _param).then(res => {
          // utils.hideLoading()
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
    },
  }
</script>