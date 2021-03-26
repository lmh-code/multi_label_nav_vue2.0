<style scoped lang="less">
  .row-column {
    padding: 10px;
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow: hidden;
    background-color: @colorWhite;
    position: relative;
    .left {
      width: 240px;
      padding-right: 20px;
      ul>li {
        line-height: 36px;
        text-align: right;
        cursor: pointer;
      }
      li:hover {
        color: @colorMain;
      }
      li.actived {
        color: @colorMain;
      }
    }
    .right {
      flex: 1;
      border-left: 1px solid @colorGrey;
      padding-left: 20px;
      padding-bottom: 50px;
      overflow-y: auto;
      .form-content {
        height: 400px;
      }
    }
    .change-doc {
      position: absolute;
      bottom: 0;
      z-index: 99;
      width: 100%;
      padding-left: 240px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      .change-btn-wrap {
        line-height: 40px;
        padding:0 50px;
        box-sizing: border-box;
        border-radius: 10px;
      }
    }
  }
</style>
<template>
  <div class="row-column">
    <div class="left nav">
      <ul>
        <li 
          :class="currentVal === item.value ? 'actived' : null"
          v-for="item in navList" 
          :key="item.value" 
          @click="goNavList(item.value)">
          {{item.value}}. {{item.lable}}
        </li>
      </ul>
    </div>
    <div class="right content" ref="container" id="mainContainer">
      <dom-element ref="element" v-if="currentVal === 1"/>
      <bl-table ref="table" v-if="currentVal === 2"/>
      <pagination-desc ref="pagination" v-if="currentVal ===3"/>
      <bl-excel ref="excel" v-if="currentVal === 4"/>
      <file-upload ref="file" v-if="currentVal === 5"/>
      <image-upload ref="imageFile" v-if="currentVal === 6"/>
      <bar-code ref="barCode" v-if="currentVal === 7"/>
      <print ref="print" v-if="currentVal === 8"/>
      <message-tip ref="messageTip" v-if="currentVal === 9"/>
      <common-utils ref="commonUtils" v-if="currentVal === 10"/>
      <el-backtop target=".content" :right="40" style="background: #E3E7EA;"></el-backtop>
    </div>
    <div class="change-doc">
      <div class="change-btn-wrap">
        <el-button 
          type="text" 
          size="mini" 
          v-if="currentVal === 1" 
          @click="goNavList(currentVal + 1)">
          {{getNav(currentVal + 1)}}
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
        <el-button 
          type="text" 
          icon="el-icon-arrow-left" 
          size="mini"
          style="margin-right: 20px;"
          v-if="currentVal !== 1 && currentVal !== navList.length"
          @click="goNavList(currentVal - 1)">
          {{getNav(currentVal - 1)}}
        </el-button>
        <el-button 
          type="text" 
          size="mini"
          style="margin-left: 20px;"
          v-if="currentVal !== 1 && currentVal !== navList.length"
          @click="goNavList(currentVal + 1)">
          {{getNav(currentVal + 1)}}
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
        <el-button 
          type="text" 
          icon="el-icon-arrow-left" 
          size="mini" 
          v-if="currentVal === navList.length"
          @click="goNavList(currentVal - 1)">
          {{getNav(currentVal - 1)}}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import DomElement from './components/DomElement'
import Table from './components/Table'
import Pagination from './components/Pagination'
import Excel from './components/Excel'
import FileUpload from './components/FileUpload'
import ImageUpload from './components/ImageUpload'
import BarCode from './components/BarCode'
import Print from './components/Print'
import MessageTip from './components/MessageTip'
import CommonUtils from './components/CommonUtils'
export default {
  data() {
    return {
      navList: [
        {
          lable: '☆内置标签组件☆',
          value: 1,
          ref: 'element'
        },
        {
          lable: 'Table表格组件',
          value: 2,
          ref: 'table'
        },
        {
          lable: 'Pagination分页组件',
          value: 3,
          ref: 'pagination'
        },
        {
          lable: 'Excel组件',
          value: 4,
          ref: 'excel'
        },
        {
          lable: '文件上传组件',
          value: 5,
          ref: 'file'
        },
        {
          lable: '图片上传和展示组件',
          value: 6,
          ref: 'imageFile'
        },
        {
          lable: '条码生成',
          value: 7,
          ref: 'commonTool'
        },
        {
          lable: '打印组件使用',
          value: 8,
          ref: 'print'
        },
        {
          lable: 'Tip消息通知组件',
          value: 9,
          ref: 'tip'
        },
        {
          lable: '通用方法',
          value: 10,
          ref: 'commonUtils'
        }
      ],
      currentVal: 1,
      mainContainer: null
    }
  },
  components: {
    DomElement,
    "bl-table": Table,
    "bl-excel": Excel,
    "pagination-desc": Pagination,
    FileUpload,
    ImageUpload,
    BarCode,
    Print,
    MessageTip,
    CommonUtils
  },
  methods: {
    goNavList(val) {
      this.currentVal = val
    },
    getNav(val) {
      let filterNavMsg = this.navList.filter(item => {
        return item.value === val
      })[0]
      if(filterNavMsg) {
        return `${filterNavMsg.value}.${filterNavMsg.lable}`
      }else {
        return ''
      }
    }
  }
}
</script>