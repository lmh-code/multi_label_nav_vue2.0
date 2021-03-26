<template>
  <table
    style="border: 1px solid #000 ; border-collapse:collapse"
    width="96%"
    cellspacing="0"
    cellpadding="0"
    v-html="tableHtmlData">
  </table>
</template>

<script>
import {fixedNum} from '@/utils/utils'
export default {
  name: 'PrintTable',
  props: {
    /*
    * 此处的tableData 是一个表格的数据, 多个表格要V-for 此组件
    * 格式:[{name:'葡萄',count:'1','payment':'￥12'}]
    * tableData
    *  */
    tableData: {
      type: Array,
      default: []
    },
    /*
    * 格式:[{name:'数量',props:'count'}]
    * data中props的属性
    *  */
    propsList: {
      type: Array,
      default: []
    },
    extraData: {
      type: Array,
      default: () => []
    },
    pages: {
      type: Boolean,
      default: true
    },
    showSequenceNum: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.tableHtmlData = this._getTableHtml(this.tableData, this.propsList)
  },
  watch: {
    tableData (newValue, oldValue) {
      if (newValue === oldValue) {
        return
      }
      this.tableHtmlData = this._getTableHtml(newValue, this.propsList)
    },
    propsList (newValue, oldValue) {
      if (newValue === oldValue) {
        return
      }
      this.tableHtmlData = this._getTableHtml(this.tableData, newValue)
    },
    pages(newValue, oldValue) {
      if (newValue === oldValue) {
        return
      }
      this.tableHtmlData = this._getTableHtml(this.tableData, this.propsList)
    }
  },
  computed: {},
  data () {
    return {
      tableHtmlData: ''
    }
  },
  methods: {
    /**
     *根据propsList创建出一个table 的内部Dom的innerHtml --> string
     * */
    _getTableHtml (data, propsList) {
      if (this.showSequenceNum) {
        let hasOrder = propsList.find((item) => {
          return item.name === '序号'
        })
        if (hasOrder == null) {
          propsList.splice(0, 0, {name: '序号', props: 'index'})
        }
      }
      let tableHtmlStr = '<thead><tr>'
      for (let item of propsList) {
        tableHtmlStr += `<th style="border: 1px solid #000"><font size="3">${item.name}</font></th>`
      }
      tableHtmlStr += '</tr></thead>'
      for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
        let item = data[dataIndex]
        item.index = dataIndex + 1
        let tempLabel = '<tr>'
        for (let i = 0; i < propsList.length; i++) {
          let tempItem = ''
          if (item.hasOwnProperty(propsList[i].props)) {
            if (/^([0-9]{1,}[.][0-9]*)$/.test(item[propsList[i].props])) {
              tempItem = fixedNum(item[propsList[i].props], 4)
            } else {
              tempItem = item[propsList[i].props]
            }
          }
          let width = ''
          if (propsList[i].hasOwnProperty('width')) {
            width = `width: ${propsList[i].width}`
          }
          let align = propsList[i].hasOwnProperty('align') ? propsList[i].align : 'left'
          if (i === propsList.length - 1) {
            tempLabel += `<td style="border: 1px solid #000;text-align: ${align};${width}"><font size="3">${tempItem}<font></td></tr>`
          } else {
            tempLabel += `<td style="border: 1px solid #000;text-align: ${align};${width}"><font size="3">${tempItem}</font></td>`
          }
        }
        tableHtmlStr += tempLabel
      }
      let extraLable = ''
      let colspanLength = propsList.length
      if (this.extraData.length > 0) {
        for (let i = 0; i < this.extraData.length; i++) {
          extraLable += `<tr><td colspan="${colspanLength}" style="border: 1px solid #000;text-align: left;"><font size="3"><span>${this.extraData[i].name}:</span><span style="margin-left: 20px">${this.extraData[i].data}</span><font></td></tr>`
        }
        tableHtmlStr += extraLable
      }
      if (this.pages) {
        tableHtmlStr += `<tfoot><td tdata="pageNO" colspan=2 format="##" align="left"><p align="center">第<font color="#0000FF">##</font>页</p></td>
      <td colspan="${colspanLength - 1}"  tdata="pageCount" format="##" align="left">
        <p align="left">共<font color="#0000FF">##</font>页</p></td></tfoot>`
      }
      return tableHtmlStr
    }
  }
}
</script>
