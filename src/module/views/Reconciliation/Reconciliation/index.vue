<template>
  <div>
    <div class="search-form-wraper">
      <el-form :model="searchContent" label-position="top">
        <el-form-item label="供应商">
          <el-select 
            class="search-input" 
            v-model="searchContent.targetNoList" 
            placeholder="选择供应商" 
            multiple
            collapse-tags
            size="small">
            <el-option 
              v-for="item in vendors" 
              :key="item.vendorNo" 
              :label="item.vendorName" 
              :value="item.vendorNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店">
          <el-input 
            v-model.trim="storeNames" 
            size="small" 
            class="search-input" 
            placeholder="点击选择门店"
            readonly>
              <el-button slot="append" icon="el-icon-search" @click="clickInputHandel"></el-button>
            </el-input>
        </el-form-item>
        <el-form-item label="收退货单号">
          <el-input 
            v-model.trim="searchContent.paperNo" 
            size="small" 
            class="search-input" 
            placeholder="请输入收退货单号"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input 
            v-model.trim="searchContent.sourceOrderNo" 
            size="small" 
            class="search-input" 
            placeholder="请输入订单编号"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="对账状态">
          <el-select 
            class="search-input" 
            v-model="searchContent.status" 
            placeholder="状态" 
            filterable
            clearable
            size="small">
            <el-option 
              v-for="item in statusOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有争议">
          <el-select 
            class="search-input" 
            v-model="searchContent.isDispute" 
            placeholder="状态" 
            filterable
            clearable
            size="small">
            <el-option 
              v-for="item in isDisputeOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据开始时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.startOrderOperationDate" 
            type="date" 
            placeholder="单据开始时间"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单据结束时间">
          <el-date-picker 
            class="search-input" 
            v-model="searchContent.endOrderOperationDate" 
            type="date" 
            placeholder="单据结束时间"
            format="yyyy-MM-dd" 
            value-format="yyyy-MM-dd" 
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearchHandle(true)" size="mini">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="checkedList.length === 0" @click="batchConfirmHandel" size="mini" :loading="confirmLoading">批量对账通过</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wraper">
      <bl-table
        :loading="loading"
        :border="false"
        :dataSource="tableData"
        :columns="columns"
        :selection="true"
        :showSummary="true"
        :getSummaries="getSummaries"
        @selection-change="selectionChangeHandel"/>
      <bl-pagination
        :showPagination="tableData.length > 0"
        :pageNum="pageNum"
        :total="total"
        @size-change="changeSize"
        @current-change="changeCurrent"/>
    </div>
    <choose-store 
      ref="chooseStore"
      @confirm="confirmHandel"/>
  </div>
</template>
<script>
  import vendorsMixin from '@/module/mixin/getVendors'
  import researchMixin from '@/module/mixin/research'
  import requestUrl from '@/module/api/reconciliation'
  import {dateFormat, changeDateToTimestamp, fixedNum} from '@/utils/utils'
  import commonUrl from '@/module/api/common'
  import ChooseStore from '@/module/component/SearchItem/ChooseStore'
  export default {
    mixins: [vendorsMixin, researchMixin],
    components: {
      "choose-store": ChooseStore
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        loading: false,
        total: 0,
        tableData: [],
        searchContent: {
          targetNoList: [], // 对账目标编号集合(门店/供应商 编号)
          storeNoList: [], // 门店编号集合
          paperNo: '', // 收货单号
          sourceOrderNo: '', // 订单编号
          status: '', // 状态
          isDispute: '', // 是否有争议 1是 0否 
          startOrderOperationDate: dateFormat('yyyy-MM-dd', Date.parse(new Date()) - 6 * 86400000), // 开始进退货日期/单据开始时间
          endOrderOperationDate: dateFormat('yyyy-MM-dd', Date.parse(new Date())) // 结束进退货日期/单据结束时间
        },
        storeNames: '',
        checkedStoreList: [], // 选中的门店
        statusOptions: [],
        isDisputeOptions: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '是',
            value: 1
          },
          {
            label: '否',
            value: 0
          }
        ],
        columns: [
          {
            title: '收退货单号',
            dataIndex: 'paperNo',
            ellipsis: true,
            minWidth: 120
          },
          {
            title: '订单编号',
            dataIndex: 'sourceOrderNo',
            ellipsis: true,
            minWidth: 120
          },
          {
            title: '订单类型',
            dataIndex: 'orderTypeName',
            minWidth: 100
          },
          {
            title: '单据时间',
            dataIndex: 'orderOperationDate',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '供应商',
            dataIndex: 'targetName',
            ellipsis: true,
            minWidth: 130
          },
          {
            title: '城市',
            dataIndex: 'cityName',
            minWidth: 70
          },
          {
            title: '收货门店/仓库',
            dataIndex: 'storeName',
            minWidth: 120,
          },
          {
            title: '不含税收货总金额',
            dataIndex: 'totalNetAmount',
            minWidth: 140,
          },
          {
            title: '收货总金额',
            dataIndex: 'totalAmount',
            minWidth: 100
          },
          {
            title: '对账金额',
            dataIndex: 'reconciliationAmount',
            minWidth: 100
          },
          {
            title: '差异金额',
            dataIndex: 'differenceAmount',
            minWidth: 80
          },
          {
            title: '供应商对帐人',
            dataIndex: 'vReconciliationUserName',
            minWidth: 120
          },
          {
            title: '供应商对帐时间',
            dataIndex: 'vReconciliationTime',
            ellipsis: true,
            minWidth: 130
          },
          {
            title: '本来鲜对帐人',
            dataIndex: 'reconciliationUserName',
            minWidth: 120
          },
          {
            title: '对帐时间',
            dataIndex: 'reconciliationDate',
            ellipsis: true,
            minWidth: 100
          },
          {
            title: '付款状态',
            dataIndex: 'paidValue',
            minWidth: 100
          },
          {
            title: '对账状态',
            dataIndex: 'statusValue',
            minWidth: 110
          },
          {
            title: '对帐批次号',
            dataIndex: 'batchNo',
            ellipsis: true,
            minWidth: 130
          },
          {
            title: '争议内容',
            dataIndex: 'disputeText',
            ellipsis: true,
            minWidth: 130
          },
          {
            title: '操作',
            fixed: 'right',
            width: 180,
            operation: [
              {
                label: '详情',
                icon: 'el-icon-view',
                clickFunc: this.goDetailPage
              },
              {
                label: '对账通过',
                icon: 'el-icon-circle-check',
                isShow: (row) => {
                  return row.status === 0
                },
                clickFunc: this.recConfirmHandel
              },
              {
                label: '发起争议',
                icon: 'el-icon-warning-outline',
                isShow: (row) => {
                  return row.status === 0
                },
                clickFunc: this.goEditPage
              }
            ]
          }
        ],
        confirmLoading: false, // 批量对账通过loading
        checkedList: [],
        totalSum: {
          differenceAmount: "", // 差异金额
          reconciliationAmount: "", // 对账金额
          totalAmount: "", // 收货总金额
          totalNetAmount: "" // 不含税收货总金额
        }
      }
    },
    mounted() {
      this.getStatus()
      this.initMounted()
    },
    methods: {
      /**
       * @description: 确保调用查询接口的时候，已经拿到用户有权限的供应商
       */
      initMounted() {
        if(this.vendors && this.vendors.length > 0) {
          this.doSearchHandle(true)
        }else {
          setTimeout(() => {
            this.initMounted()
          }, 500);
        }
      },
      getStatus() {
        this.$http.post(commonUrl.listByCommonCodes, ['ReconciliationStatus']).then(res => {
          if(res.code === 0) {
            let statusOptionsArr = res.data && res.data.ReconciliationStatus && res.data.ReconciliationStatus.length ? res.data.ReconciliationStatus.map((item) => {
              let newItem = {
                id: item.id,
                value: item.code,
                label: item.value
              }
              return newItem
            }) : []
            statusOptionsArr.unshift({
              id: -1,
              value: '',
              label: '全部'
            })
            this.statusOptions = statusOptionsArr
            return
          }
          throw new Error(res.msg);
        }).catch(e => {
          console.log("【对账管理状态】:", e.message)
        })
      },
      clickInputHandel() {
        this.vendorNos = this.searchContent.targetNoList && this.searchContent.targetNoList.length > 0 ? this.searchContent.targetNoList : this.vendors.map(item => {
          return item.vendorNo
        })
        this.$refs.chooseStore.setDefault({
          vendorNos: this.vendorNos,
          defaultChecked: this.checkedStoreList
        })
      },
      confirmHandel(result) {
        this.checkedStoreList = result
        this.searchContent.storeNoList = result.map(item => {
          return item.storeNo
        })
        this.storeNames = result.map(item => {
          return item.storeName
        }).join(',')
      },
      selectionChangeHandel({selection}) {
        this.checkedList = [...selection]
      },
      doSearchHandle(firstPage) {
        if(!this.searchContent.startOrderOperationDate || !this.searchContent.endOrderOperationDate) {
          this.$tip.message('单据开始时间和结束时间不能为空', 'warning')
          return
        }else if(changeDateToTimestamp(this.searchContent.startOrderOperationDate) > changeDateToTimestamp(this.searchContent.endOrderOperationDate)) {
          this.$tip.message('单据结束时间不能早于开始时间', 'warning')
          return
        }
        this.doSearchHandleRequest(firstPage)
        this.getListTotal()
      },
      getListTotal() {
        let params = {
          ...this.searchContent,
          startOrderOperationDate: `${this.searchContent.startOrderOperationDate} 00:00:00`,
          endOrderOperationDate: `${this.searchContent.endOrderOperationDate} 23:59:59`,
        }
        // 后台需要，如果用户一个供应商也没有选择，默认传全部供应商编码
        if(!params.targetNoList || params.targetNoList.length <= 0) {
          params.targetNoList = this.vendors.map(item => {
            return item.vendorNo
          })
        }
        this.$http.post(requestUrl.listTotal, {...params}).then(res => {
          if(res.code === 0) {
            if(res.data) {
              this.totalSum = {
                differenceAmount: res.data.differenceAmount,
                reconciliationAmount: res.data.reconciliationAmount,
                totalAmount: res.data.totalAmount,
                totalNetAmount: res.data.totalNetAmount
              }
            }else {
              this.totalSum = {
                differenceAmount: "-",
                reconciliationAmount: "-",
                totalAmount: "-",
                totalNetAmount: "-"
              }
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {console.log("【列表统计提示】:", e.message || '')})
      },
      changeSize(value) {
        this.pageSize = value
        this.doSearchHandleRequest()
      },
      changeCurrent(value) {
        this.pageNum = value
        this.doSearchHandleRequest()
      },
      doSearchHandleRequest(firstPage) {
        this.checkedList = []
        let params = {
          ...this.searchContent,
          startOrderOperationDate: `${this.searchContent.startOrderOperationDate} 00:00:00`,
          endOrderOperationDate: `${this.searchContent.endOrderOperationDate} 23:59:59`,
        }
        // 后台需要，如果用户一个供应商也没有选择，默认传全部供应商编码
        if(!params.targetNoList || params.targetNoList.length <= 0) {
          params.targetNoList = this.vendors.map(item => {
            return item.vendorNo
          })
        }
        if (firstPage === true) {
          this.pageNum = 1
        }
        this.loading = true
        this.$http.post(requestUrl.reconciliationList, {
          ...params,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then(res => {
          this.loading = false
          if (res.code === 0) {
            this.tableData = res.data && res.data.result && res.data.result.length ? res.data.result : []
            this.total = res.data && res.data.total ? res.data.total : 0
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.loading = false
          this.$tip.notify(e.message || '', 'error', '系统提示')
        })
      },
      /**
       * @description: 批量对账通过
       */
      batchConfirmHandel() {
        let ids = this.checkedList.map(item => {
          return item.id
        })
        let canRecList = this.checkedList.filter(item => {
          return item.status === 0
        })
        let sumAmount = 0
        for(let item of canRecList) {
          sumAmount+=parseFloat(item.totalAmount)
        }
        sumAmount = isNaN(fixedNum(sumAmount)) ? '-' : fixedNum(sumAmount)
        const h = this.$createElement;
        this.$msgbox({
          title: '对账通过',
          message: h('p', null, [
            h('span', null, `共选择${this.checkedList.length}个对账单，有${canRecList.length}个未对帐，对账总金额:`),
            h('span', {style: 'color: red;'}, `${sumAmount}`),
            h('span', null, '元，确定对帐通过？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(confirm => {
          if(canRecList.length === 0) {
            this.$tip.message('批量对账通过成功', 'success')
            return
          }
          this.confirmLoading = true
          this.$http.post(requestUrl.batchConfirm, [...ids]).then(res => {
            this.confirmLoading = false
            if(res.code === 0) {
              this.$tip.message('批量对账通过成功', 'success')
              this.doSearchHandleRequest()
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.confirmLoading = false
            this.$tip.notify(e.message || '', 'error', '系统提示')
          })
        }).catch(cancel => {});
      },
      /**
       * @description: 单个对账通过
       */
      recConfirmHandel(row) {
        let amount = row.reconciliationAmount || parseFloat(row.reconciliationAmount) == 0 ? row.reconciliationAmount : row.totalAmount
        const h = this.$createElement;
        this.$msgbox({
          title: '对账通过',
          message: h('p', null, [
            h('span', null, '对账金额:'),
            h('span', {style: 'color: red;'}, `${amount}`),
            h('span', null, '元，确定对帐通过？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(confirm => {
          this.$http.post(requestUrl.confirm, {storeNo: row.storeNo, paperNo: row.paperNo, updateTime: row.updateTime}).then(res => {
            if(res.code === 0) {
              this.$tip.message('对账通过成功', 'success')
              this.doSearchHandleRequest()
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.$tip.notify(e.message || '', 'error', '系统提示')
          })
        }).catch(cancel => {});
      },
      goDetailPage(row) {
        let isDisputeTxt = row.isDispute ? '110' : '001'
        this.$router.push(`/reconciliation/detail/detail/${row.storeNo}/${row.paperNo}/${isDisputeTxt}`)
      },
      goEditPage(row) {
        let isDisputeTxt = row.isDispute ? '110' : '001'
        this.$router.push(`/reconciliation/edit/edit/${row.storeNo}/${row.paperNo}/${isDisputeTxt}`)
      },
      getSummaries(params) {
        let sums = []
        let newArray=[]
        params.columns.forEach(item => {
          if(this.totalSum[item.property] || this.totalSum[item.property] == 0) {
            newArray.push(this.totalSum[item.property])
          }else {
            newArray.push('')
          }
        })
        sums = newArray;
        sums[0] = "合计";
        return sums
      }
    }
  }
</script>