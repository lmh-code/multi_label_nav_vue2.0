<template>
  <el-table-column 
    :label="coloumnHeader.label" 
    :prop="coloumnHeader.property" 
    align="center">
    <template v-for="(item, index) in coloumnHeader.children">
      <tableColumn 
        v-if="item.children && item.children.length" 
        :key="index" 
        :coloumn-header="item">
      </tableColumn>
      <el-table-column 
        v-else 
        :key="index" 
        :label="item.label" 
        :min-width="item.width"
        align="center">
        <template slot-scope="scope">
          <div>
            <div v-if="item.showType === 'input'">
              <el-input v-model="scope.row[item.property]" placeholder="输入内容" size="small"></el-input>
            </div>
            <div v-else-if="item.showType === 'select'">
              <el-select v-model="scope.row[item.defaultVal]" placeholder="请选择" size="small">
                <el-option
                  v-for="item in scope.row[item.property]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div v-else>
              <div v-if="item.property === 'marketPrice'">
                <div v-for="market of scope.row.marketMsg" :key="market.marketNo">
                  <span v-if="item.marketNo === market.marketNo">{{market[item.property]}}</span>
                </div>
              </div>
              <div v-else-if="item.property === 'vendorCurrentPrice' || item.property === 'vendorReportPrice' || item.property === 'vendorReportGoods'">
                <div v-for="vendor of scope.row.vendorMsg" :key="vendor.vendorNo">
                  <span v-if="item.vendorNo === vendor.vendorNo">
                    {{vendor[item.property]}}
                  </span>
                </div>
              </div>
              <div v-else>
                {{scope.row[item.property]}}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
  export default {
    name: 'tableColumn',
    props: {
      coloumnHeader: {
        type: Object,
        required: false
      },
      tableColumnList: {
        type: Array,
        required: false
      } 
    }
  }
</script>