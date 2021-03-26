<style>
  .common-report.report-goods .common-dialog-input .el-form-item {
    margin-bottom: 0 !important;
  }
  .dialog-goods-footer {
    margin-top: 10px;
    text-align: center
  }
</style>
<template>
  <div class="common-report report-goods">
    <el-dialog :visible.sync="isShow" width="60%" class="common-dialog-input" top="10vh">
      <div class="common-layout">
        <el-form :model="searchContent" label-position='top' size="mini" class="common-query">
          <el-form-item label="柜组">
            <el-select v-model="searchContent.groupNo" placeholder="请选择" clearable>
              <el-option
                v-for="item in templateList"
                :key="item.goodsGroupNo"
                :label="item.templateName"
                :value="item.goodsGroupNo">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品">
            <el-input v-model="searchContent.searchValue" placeholder="请输入商品名称" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="分类">
            <el-select v-model="searchContent.categoryNoList" placeholder="请选择">
              <el-option
                v-for="item in templateList"
                :key="item.goodsGroupNo"
                :label="item.templateName"
                :value="item.goodsGroupNo">
              </el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item>
            <el-button size="mini" type="primary" @click="doSearchHandel(true)" :disabled="loading">查询</el-button>
            <el-button size="mini" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <div class="common-table">
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="tableData"
          style="width:100%;"
          @select="handleSelect"
          @select-all="handleSelectAll">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="goodsName" :formatter="nullTreating" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="goodsNo" :formatter="nullTreating" label="商品编码" align="center"></el-table-column>
          <el-table-column prop="barCode" :formatter="nullTreating" label="商品条码" align="center"></el-table-column>
          <el-table-column prop="unit" :formatter="nullTreating" label="单位" align="center"></el-table-column>
          <el-table-column prop="stockQty" :formatter="nullTreating" label="门店库存" align="center"></el-table-column>
          <el-table-column prop="pack" :formatter="nullTreating" label="箱装数量" align="center"></el-table-column>
          <el-table-column prop="multiple" :formatter="nullTreating" label="订货倍数" align="center"></el-table-column>
          <el-table-column prop="realBuyPrice" :formatter="nullTreating" label="参考进价" align="center"></el-table-column>
        </el-table>
        <!-- 分页条 -->
        <el-pagination
          @size-change="changeSize"
          @current-change="changeCurrent"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecord">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-goods-footer">
        <el-button @click="sureTableItem(true)"  type="primary" size="small">选择并继续</el-button>
        <el-button @click="sureTableItem(false)" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import * as utils from '@/utils/utils'
  
  const reUrl = {
    // 获取柜组
    getTemplateList: '/storefront/smartGoods/templateList',
    // 获取商品列表
    listStoreGoods: '/storefront/smartGoods/listStoreGoods',
    // 添加商品
    add: '/storefront/smartGoods/add',
  }
  export default {
    props: ['searchItems'],
    data () {
      return {
        isShow: false,
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        loading: false,
        searchContent: {
          storeNo: '',
          dcNo: '',
          groupNo: '', // 柜组
          searchValue: '', // 商品名称
          categoryNoList: [], // 分类
        },
        templateList: [],
        tableData: [], // 表格数据
        checkedDialogList: [],
      }
    },
    mounted() {
    },
    methods: {
      show() {
        this.isShow = true
        this.searchContent.dcNo = this.searchItems.dcNo
        this.searchContent.storeNo = this.searchItems.storeNo
        if(this.searchItems.dcNo) {
          this.checkedDialogList = []
          this.getTemplateList(this.searchItems.dcNo)
          this.doSearchHandel(true)
        }
      },
      /**
       * 数据处理
       */
      nullTreating (row, column, cellValue) {
        if(cellValue == null) {
          cellValue = '-'
        }
        return cellValue
      },
      changeSize (value) {
        this.pageSize = value
        this.doSearchHandel()
      },
      changeCurrent (value) {
        this.currentPage = value
        this.doSearchHandel()
      },
      getTemplateList(dcNo) {
        this.$http.post(reUrl.getTemplateList, {dcNo: dcNo}).then(res => {
          if(res.code === 0) {
            if(res.data && res.data.result) {
              this.templateList = res.data.result
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log(e.message)
        })
      },
      /**
       * [doSearchHandel 点击查询按钮]
       * @param  {[type]} _param [通过参数控制是否是点击查询]
       * @return {[type]}        [description]
       */
      doSearchHandel(_param) {
        if(!this.searchContent.groupNo) {
          this.$message('请先选择柜组')
          return
        }
        if(_param) {
          this.currentPage = 1
        }
        this.loading = true
        this.$http.post(reUrl.listStoreGoods, { ...this.searchContent, pageNum: this.currentPage, pageSize: this.pageSize}).then(res => {
          this.loading = false
          if(res.code === 0) {
            if(res.data && res.data.list && res.data.list.length) {
              this.tableData = res.data.list
            }else {
              this.tableData = []
            }
            if(this.currentPage === 1) {
              this.totalRecord = res.data.total
            }
            return
          }
          throw new Error(res.msg)
        }).catch(err => {
          this.loading = false
          this.$notify.error({
            title: '提示',
            message: err.message
          })
        })
      },
      /**
       * [handleSelect 选择某一个]
       * @return {[type]} [description]
       */
      handleSelect(val, row) {
        let hash = {}
        let checkedListTemp = []
        if(utils.isKeyInArrayBykey(row.goodsNo, 'goodsNo', this.checkedDialogList)) {
          this.checkedDialogList = utils.removeItemByKeyVal('goodsNo', row.goodsNo, this.checkedDialogList)
          return
        }else {
          checkedListTemp.push(row)
        }
        let checkedListTempArr = [...checkedListTemp, ...this.checkedDialogList]
        this.checkedDialogList = checkedListTempArr.reduceRight((item, next) => {
          hash[next.goodsNo] ? '' : hash[next.goodsNo] = true && item.push(next)
          return item
        }, [])
      },
      /**
       * [handleSelectAll 选择多个]
       * @return {[type]} [description]
       */
      handleSelectAll(val) {
        let hash = {}
        if(val.length > 0) {
          // 全选
          for(let item of val) {
            this.checkedDialogList.push(item)
          }
          // 去重
          this.checkedDialogList = this.checkedDialogList.reduceRight((item, next) => {
            hash[next.goodsNo] ? '' : hash[next.goodsNo] = true && item.push(next)
            return item
          }, [])
        }else {
          // 全不选 此时val.length<=0
          // 1.获取当前table中每一条的goodsNo
          let checkedListTemp = []
          for(let item of this.tableData) {
            checkedListTemp.push(item)
          }
          // 2.从要传递的参数中去掉这些重复的
          this.checkedDialogList = utils.getSubtract(this.checkedDialogList, checkedListTemp, 'goodsNo')
        }
      },
      sureTableItem(param) {
        if(param) {
          let goods = []
          this.checkedDialogList.forEach((item, i) => {
            goods[i] = {}
            goods[i].goodsId = item.goodsId
            goods[i].goodsNo = item.goodsNo
            goods[i].vendorNo = item.vendorNo
            goods[i].qty = 1
            goods[i].price = item.realSalePrice
            goods[i].groupNo = this.searchContent.groupNo
          })
          this.isShow  = false
          this.$emit("closeAddGoods", goods)
        }else {
          this.isShow  = false
          this.$emit("closeAddGoods")
        }
      },
      /**
       * [reset 重置]
       * @return {[type]} [description]
       */
      reset() {
        this.searchContent.groupNo = ''
        this.searchContent.searchValue = ''
        this.searchContent.categoryNoList = []
        this.searchContent.checkNameVal = ''
        this.doSearchHandel(true)
      },
    }
  }
</script>
