<style scoped lang="less">
  @import '../detail.less';
</style>
<template>
<div>
  <div class="search-form-wraper pr">
    <div class="tow-row">
      <div class="left">
        <div class="row-item">
          <div class="f1">收货单号：{{res.paperNo}}</div>
          <div class="f1">含税金额：{{res.totalAmount}}</div>
          <div class="f1">单据状态：{{res.statusName}}</div>
        </div>
        <div class="row-item">
          <div class="f1">门店/仓库：{{res.storeNo}}.{{res.storeName}}</div>
          <div class="f1">未税金额：{{res.totalNetAmount}}</div>
          <div class="f1">结算方式：{{res.tradeModeName}}</div>
        </div>
        <div class="row-item">
          <div class="f1">采购单号：{{res.sourcePaperNo}}</div>
          <div class="f1">供应商：{{res.vendorNo}}.{{res.vendorName}}</div>
          <div class="f1">单据类型：{{res.typeName}}</div>
        </div>
        <div class="row-item">
          <div class="f1">制单时间：{{res.createTime}}</div>
          <div class="f1">审核时间：{{res.authDatetime}}</div>
          <div class="f1">对账状态：{{res.reconciliationFlagName}}</div>
        </div>
        <div class="row-item">
          <div class="f1">
            <el-tooltip :content="res.remark" placement="bottom" effect="light" class="fl" :disabled="!res.remark">
              <div class="remark">备注：{{res.remark}}</div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="tow-row"></div>
   
  </div>
    <div class="table-wraper">
      <bl-table
        :border="false"
        :dataSource="tableData"
        :columns="columns"/>
    </div>
  </div>
</template>
<script>
  import warehouseUrl from '@/module/api/warehouse'
  export default {
    data() {
      return {
        res: {},
        searchContent: {

        },
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        columns: [
          {
            title: '商品编码',
            dataIndex: 'erpGoodsNo',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '条码',
            dataIndex: 'barcode',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '货号',
            dataIndex: 'vendorGoodsNo',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '商品名称',
            dataIndex: 'goodsName',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '商品规格',
            dataIndex: 'spec',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '单位',
            dataIndex: 'unit',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '税率',
            dataIndex: 'taxPct',
            minWidth: 80,
            ellipsis: true,
            formatData:(text) => {
              if(text && text !== '0') return text + '%'
              else return text
            }
          },
          {
            title: '件装数量',
            dataIndex: 'pack',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '采购数量',
            dataIndex: 'purchaseQty',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '收货数量',
            dataIndex: 'qty',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '件数',
            dataIndex: 'packQty',
            minWidth: 80,
            ellipsis: true
          },
          {
            title: '单价',
            dataIndex: 'price',
            minWidth: 100,
            ellipsis: true
          },
          {
            title: '件单价',
            dataIndex: 'packPrice',
            minWidth: 100,
            ellipsis: true
          },
          {
            title: '含税金额',
            dataIndex: 'amount',
            minWidth: 100,
            ellipsis: true
          },
          {
            title: '未税金额',
            dataIndex: 'netAmount',
            minWidth: 100,
            ellipsis: true
          },
          {
            title: '商品备注',
            dataIndex: 'remarks',
            minWidth: 100,
            ellipsis: true
          }
        ],
      }
    },
    created() {
      this.getReceiveDetail()
    },
    filters: {
      checkingStatusFilter(status) {
        let result = ''
        switch (status) {
          case 0:
            result = '未对账'
            break;
          case 2:
            result = '供应商已对账'
            break;
          case 6:
            result = '已完成对账'
            break;
          case 14:
            result = '已结算'
            break;
          default:
            break;
        }
        return result
      },
      statusFilter(status) {
        let result = ''
        switch (status) {
          case 2:
            result = '已审核'
            break;
          case 4:
            result = '被红冲'
            break;
          default:
            break;
        }
        return result
      },
    },

    methods: {
      getReceiveDetail() {
        this.$loading.show()
        this.$http.post(warehouseUrl.receiveDetail, { paperNo: this.$route.params.paperNo}).then(res => {
          this.$loading.hide()
          if(res && res.code === 0) {
            this.res = res.data
            this.tableData = res.data && res.data.listDetail
          } else {
            this.$tip.notify(res.msg, 'error')
          }
        }).catch(err => {
          this.$loading.hide()
          this.$tip.notify(err.message, 'error')
        })
      }
    }
  }
</script>