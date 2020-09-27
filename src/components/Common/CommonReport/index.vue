<style>
  .common-report {
    padding: 0;
  }
  .common-report .common-layout{
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  .common-report .common-query .el-form-item{
    margin: 0 20px 4px 0;
    display: inline-block;
  }
  .common-report .common-query label{
    padding: 0;
  }
  .common-report .common-query .common-goods-style{
    position: relative;
  }
  .common-report .common-query .common-goods-style button{
    position: absolute;
    right: 0;
    top: 0px;
    padding: 5px 10px;
    margin: 2px;
    border: none;
    border-left: 1px solid #DCDFE6;
    border-radius: 0;
  }
  .common-report .common-query .el-form-item__content input,
  .common-report .common-query .el-date-editor.el-input,
  .common-report .common-query .el-date-editor.el-input__inner{
    width: 180px;
  }
  .common-report .common-query .el-date-editor--datetime.el-input,
  .common-report .common-query .el-date-editor--datetime input{
    width: 180px !important;
  }
  .common-report .common-table .el-pagination{
    text-align: center;
    margin-top: 10px;
  }
  .common-report .common-chart{
    background: #fff;
    height: 300px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px
  }
  .common-report .common-table .el-table th{
    text-align: center;
  }
  .common-report .common-table .el-table .is-group th{
    padding: 4px 0;
  }
  .common-report .common-table .clickable {
    color: #2ca2fc;
    cursor: pointer;
  }
  .common-report .common-table .common-operate span{
    margin-right: 8px;
  }
  .common-report .common-table .cut-off {
    border: 1px solid #f5f5f5;
    margin-top: 10px;
  }
  .common-report .common-table .inline-modify {
    display: flex;
  }
  .common-report .common-table .inline-modify .el-input{
    width: 100%;
  }
  .common-report .common-table .inline-modify input{
    padding: 0 8px;
  }
  .common-report .common-table .inline-modify button{
    padding: 6px 7px 7px 7px;
  }
  .common-report .common-dialog-input .el-form-item{
    margin-bottom: 25px;
  }
  .common-report .common-dialog-input .el-form-item__content input{
    width: 140px;
  }
  .common-report .common-dialog-input .common-query .el-form-item__content input,
  .common-report .common-dialog-input .common-query .el-date-editor.el-input,
  .common-report .common-dialog-input .common-query .el-date-editor.el-input__inner{
    width: 140px !important;
  }
  .common-report .common-dialog-input .common-query .el-date-editor--datetime.el-input,
  .common-report .common-dialog-input .common-query .el-date-editor--datetime input{
    width: 140px !important;
  }
  .common-report .common-dialog-input .dialog-input-describe{
    font-size: 12px;
    position: absolute;
    top: 22px;
    left: 0;
  }
  .common-report .common-dialog-input .el-dialog__body{
    padding: 10px 20px;
  }
  .common-report .dialog-tree .el-dialog__body{
    padding: 0 20px 20px;
  }
  .common-report .laber-color-red{
    color: red;
  }
  .common-report .laber-color-green{
    color: lightgreen;
  }
  .common-report .dialog-upload .upload{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    padding: 10px 16px;
    font-weight: 500;
    border-radius: 3px;
    background: #2077FF;
    font-size: 12px;
  }
  .common-report .dialog-upload .division, .back-division {
    clear: both;
    border-top: 1px dashed #ddd;
    border-bottom: 0;
    border-bottom-width: 0px;
    border-bottom-style: initial;
    border-bottom-color: initial;
    margin: 20px 0;
  }
  .back-division {
    margin: 0 0 10px 0;
  }

</style>
<template>
  <div class="common-report">
    <el-button v-if="showBack" icon="el-icon-arrow-left" type="text" size="small" @click="back">返回</el-button>
    <hr v-if="showBack" class="back-division"/>
    <div v-for="(item, index) in layout" :key="index">
      <!-- 搜索模块 -->
      <div v-if="item[0].moduleType === 0 && searchHide" class="common-layout">
        <el-form label-position="top" ref="form" size="mini" class="common-query" v-for="(item_, index_) in item" :key="index_">
          <span v-for="(e, i) in queryItems[item_.moduleId]" :key="i">
            <!-- input控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 0 && e.subType !== 'autocomplete' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-input v-model="searchItems[e.columnName]" :clearable="e.canClear === 1" :disabled="e.editAble === 0" @change="instantQuery(queryItems[item_.moduleId][e.widgetChildIndex])"></el-input>
            </el-form-item>
            <!-- 有搜索建议的input控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 0 && e.subType === 'autocomplete' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-autocomplete v-model="e.checkNameVal" :fetch-suggestions="querySearchAsync" @focus="getSuggestions(e)" placeholder="请输入编码或名称" @select="changeSuggestions(e, $event, null, 'one')" @clear="changeSuggestions(e, $event, null, 'one', 'clear')" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-autocomplete>
            </el-form-item>
            <!-- select控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 1 && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-select v-model="searchItems[e.columnName]" :clearable="e.canClear === 1" :multiple="e.multiple" :disabled="e.editAble === 0" collapse-tags filterable @change="instantQuery(queryItems[item_.moduleId][e.widgetChildIndex])">
                <el-option
                  v-for="item in e.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 周控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 2 && e.dateType === 'dates' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-date-picker
                :disabled="e.editAble === 0"
                v-model="weekDates[e.columnName]"
                :clearable="e.canClear === 1"
                :editable="false"
                type="dates"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                placeholder="请选择">
              </el-date-picker>
            </el-form-item>
            <!-- 日期联动控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 2 && e.dateType === 'dateLinkage' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-select v-model="searchItems['dateType']" placeholder="请选择" @change="dateOptionsChange($event, e.columnName, e.isRange, e.isRangeWeek, e.isRangeMonth)" :disabled="e.editAble === 0">
                <el-option
                  v-for="item in dateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="e.type == 2 && e.dateType === 'dateLinkage' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <span v-if="searchItems['dateType'] == 1 && e.isRange == 1">
                <el-form-item>
                  <el-date-picker
                    v-model="searchItems['start_date']"
                    :clearable="e.canClear === 1"
                    :editable="false"
                    :type="dateLinkage.dateType"
                    :value-format="dateLinkage.dateFormat"
                    :picker-options="pickerOptions"
                    placeholder="请选择">
                  </el-date-picker>
                </el-form-item>
                <el-date-picker
                  v-model="searchItems['end_date']"
                  :clearable="e.canClear === 1"
                  :editable="false"
                  :type="dateLinkage.dateType"
                  :value-format="dateLinkage.dateFormat"
                  :picker-options="pickerOptions"
                  placeholder="请选择">
                </el-date-picker>
              </span>
              <span v-else-if="searchItems['dateType'] == 3 && e.isRangeMonth == 1">
                <el-form-item>
                  <el-date-picker
                    v-model="searchItems['start_month']"
                    :clearable="e.canClear === 1"
                    :editable="false"
                    :type="dateLinkage.dateType"
                    :value-format="dateLinkage.dateFormat"
                    :picker-options="pickerOptions"
                    placeholder="请选择">
                  </el-date-picker>
                </el-form-item>
                <el-date-picker
                  v-model="searchItems['end_month']"
                  :clearable="e.canClear === 1"
                  :editable="false"
                  :type="dateLinkage.dateType"
                  :value-format="dateLinkage.dateFormat"
                  :picker-options="pickerOptions"
                  placeholder="请选择">
                </el-date-picker>
              </span>
              <span v-else-if="searchItems['dateType'] == 2 && e.isRangeWeek == 1">
                <el-form-item>
                  <el-date-picker
                    v-model="weekDates['start_week']"
                    :clearable="e.canClear === 1"
                    :editable="false"
                    type="dates"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    placeholder="请选择">
                  </el-date-picker>
                </el-form-item>
                <el-date-picker
                  v-model="weekDates['end_week']"
                  :clearable="e.canClear === 1"
                  :editable="false"
                  type="dates"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  placeholder="请选择">
                </el-date-picker>
              </span>
              <el-date-picker
                v-else-if="searchItems['dateType'] == 1"
                v-model="searchItems[e.columnName]"
                :clearable="e.canClear === 1"
                :editable="false"
                :type="dateLinkage.dateType"
                :value-format="dateLinkage.dateFormat"
                :picker-options="pickerOptions"
                placeholder="请选择">
              </el-date-picker>
              <el-date-picker
                v-else-if="searchItems['dateType'] == 2"
                v-model="weekDates[e.columnName]"
                :clearable="e.canClear === 1"
                :editable="false"
                type="dates"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                placeholder="请选择">
              </el-date-picker>
              <el-date-picker
                v-else-if="searchItems['dateType'] == 3"
                v-model="searchItems[e.columnName]"
                :clearable="e.canClear === 1"
                :editable="false"
                :type="dateLinkage.dateType"
                :value-format="dateLinkage.dateFormat"
                :picker-options="pickerOptions"
                placeholder="请选择">
              </el-date-picker>
            </el-form-item>
            <!-- 其他日期控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 2 && e.dateType !== 'dates' && e.dateType !== 'dateLinkage' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-date-picker
                :disabled="e.editAble === 0"
                v-model="searchItems[e.columnName]"
                :clearable="e.canClear === 1"
                :editable="false"
                :type="e.dateType"
                :value-format="e.dateFormat"
                :picker-options="pickerOptions"
                placeholder="请选择">
              </el-date-picker>
            </el-form-item>
            <!-- 时间控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 3 && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-time-select
                :disabled="e.editAble === 0"
                v-model="searchItems[e.columnName]"
                :clearable="e.canClear === 1"
                placeholder="选择时间">
              </el-time-select>
            </el-form-item>
            <!-- 日期时间控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 4 && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-date-picker
                :disabled="e.editAble === 0"
                v-model="searchItems[e.columnName]"
                :clearable="e.canClear === 1"
                :editable="false"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <!-- 弹窗树形控件-suggest且单选 -->
            <el-form-item :label="e.labelName" v-if="e.type == 5 && e.suggest === true && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))" class="common-goods-style">
              <el-autocomplete v-model="e.checkNameVal" :fetch-suggestions="querySearchAsyncTree" @focus="getSuggestions(e)" placeholder="请输入编码或名称" @select="changeSuggestions(e, $event, null, 'one')" @blur="changeSuggestions(e, $event, null, 'one')" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-autocomplete>
              <el-button icon="el-icon-search" @click="showTreeDialog(e)" v-model="e.checkNameVal" :disabled="e.editAble === 0"></el-button>
            </el-form-item>
            <!-- 弹窗树形控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 5 && e.suggest !== true && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-input v-model="e.checkNameVal" :clearable="e.canClear === 1" @focus="showTreeDialog(e)" prefix-icon="el-icon-search" :disabled="e.editAble === 0" placeholder="请选择" @clear="clearTreeList(queryItems[item_.moduleId], e, i)"></el-input>
            </el-form-item>
            <!-- 弹窗suggester控件-单选 -->
            <el-form-item :label="e.labelName" v-if="e.type == 6 && e.subType === 'selectOne' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))" class="common-goods-style">
              <el-autocomplete v-model="e.checkNameVal" :fetch-suggestions="querySearchAsyncPost" @focus="getSuggestions(e)" placeholder="请输入编码或名称" @select="changeSuggestions(e, $event, null, 'one')" @blur="changeSuggestions(e, $event, null, 'one')" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-autocomplete>
              <el-button icon="el-icon-search" @click="showTableDialog(e, null, 'one')" v-model="e.checkNameVal" :disabled="e.editAble === 0"></el-button>
            </el-form-item>
            <!-- 弹窗suggester控件-多选 -->
            <el-form-item :label="e.labelName" v-if="e.type == 6 && e.subType !== 'selectOne' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))" class="common-goods-style">
              <el-autocomplete v-model="e.checkNameVal" :fetch-suggestions="querySearchAsync" @focus="getSuggestions(e)" placeholder="请输入编码或名称" @select="changeSuggestions(e, $event)" @blur="changeSuggestions(e, $event)" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-autocomplete>
              <el-button icon="el-icon-search" @click="showTableDialog(e)" v-model="e.checkNameVal" :disabled="e.editAble === 0"></el-button>
            </el-form-item>
            <!-- 级联选择器 -->
            <el-form-item :label="e.labelName" v-if="e.type == 7 && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-cascader
                placeholder="请选择"
                expand-trigger="hover"
                clearable
                :options="e.cascaderOptions"
                :props="e.subType === 'selectOne' ? cascaderPropsF : cascaderPropsT"
                v-model="e.checkCascader"
                @change="handleCascaderChange($event, e)"
                :disabled="e.editAble === 0">
              </el-cascader>
            </el-form-item>
          </span>
          <el-form-item style="margin-top: 15px;">
            <el-button type="primary" @click="searchAll(item_.moduleId)"><i class="el-icon-search"></i> 查询</el-button>
            <el-button @click="reset(item_.moduleId)"><i class="el-icon-refresh"></i> 重置</el-button>
            <el-button type="primary" v-if="isNotFold === false" @click="isNotFold = true"><i class="el-icon-plus"></i> 高级查询</el-button>
            <el-button type="primary" v-else-if="isNotFold === true"  @click="isNotFold = false"><i class="el-icon-minus"></i> 收起高级查询</el-button>
            <el-button type="info" :loading="exportLoading" @click="exportSheet" size="mini"><i class="el-icon-download"></i> 导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 列表模块 -->
      <div v-if="item[0].moduleType === 1" class="common-layout">
        <el-row :gutter="10">
          <el-col :span="24/item.length" v-for="(item_, index_) in item" :key="index_">
            <div class="common-table" style="width:100%" v-if="tablelist[item_.moduleId]" v-loading="tablelist[item_.moduleId].loading">
              <div>
                <span v-for="(e, i) in buttonList[item_.moduleId]" :key="i">
                  <el-button v-if="e.type === 0" type="primary" @click="addTableItem(item_.moduleId, i)" size="mini"><i class="el-icon-plus"></i> {{e.name || '新增'}}</el-button>
                  <el-button v-if="e.type === 3" @click="uploadTableItem(item_.moduleId, i)" size="mini"><i class="el-icon-upload2"></i> {{e.name || '导入'}}</el-button>
                  <el-button v-if="e.type === 4" type="primary" @click="batchOperation(item_.moduleId, i)" size="mini"><i class="el-icon-setting"></i> {{e.name || '批量操作'}}</el-button>
                  <el-button v-if="e.type === 6 && searchItems.status == 500" type="primary" @click="addGoods(item_.moduleId, i)" size="mini"><i class="el-icon-plus"></i> {{e.name || '新增'}}</el-button>
                </span>
                <hr class="cut-off">
              </div>
              <el-table element-loading-text="拼命加载中" stripe :show-summary="showSummary" :summary-method="getSummaries" :data="tablelist[item_.moduleId].tablelist" style="width: 100%" @sort-change="orderChange($event, item_.moduleId)" border :max-height="tablelist[item_.moduleId].height" :header-cell-style="{background:'#F2F6FC'}" @select="handleSelect" @select-all="handleSelectAllTable($event, item_.moduleId)">
                <el-table-column type="selection" width="55" align="center" v-if="tablelist[item_.moduleId].showSelection"></el-table-column>
                <!-- 多级表头 -->
                <el-table-column :min-width="e.width || '80'" v-for="(e, i) in listItems[item_.moduleId]" :key="i" :prop="e.field" :label="e.fieldName" :sortable="e.isOrder == 1? 'custom' : false" :render-header="renderHeader" :fixed="isFixed(e.freeze)" v-if="!(e.isShow === false) && Object.keys(tableTree).length !== 0" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <label v-if="e.field === 'common_operate'" class="common-operate">
                      <span v-for="(e_, i_) in buttonList[item_.moduleId]" :key="i_">
                        <span v-if="e_.type === 1 &&  e_.isEditable !== 1 && !(scope.row.showButton[i_] === false)" class="clickable" @click="updateTableItem(item_.moduleId, i_, scope.row)">{{e_.name || '修改'}}</span>
                        <span v-if="e_.type === 2 && !(scope.row.showButton[i_] === false)" class="clickable" @click="deleteTableItem(item_.moduleId, i_, scope.row)">{{e_.name || '删除'}}</span>
                        <span v-if="e_.type === 5 && !(scope.row.showButton[i_] === false)" class="clickable" @click="operateTableItem(item_.moduleId, i_, scope.row)">{{e_.name || '操作'}}</span>
                      </span>
                    </label>
                    <label v-else-if="e.url && e.url != ''" class="clickable" :class="e.compareWith != ''? scope.row.addColor : ''" @click="clickableurl(e, scope.row)">{{nullTreating(scope.row[e.field])}}</label>
                    <label v-else-if="e.modify && !(scope.row.modify === false)" :class="e.compareWith != ''? scope.row.addColor : ''">
                      <el-input v-model="scope.row[e.field]" placeholder="请输入" size="mini" @focus="inlineModifyFocus(scope.row, e)" @blur="confirmInlineModify(scope.row, e, item_.moduleId, scope.$index)"></el-input>
                    </label>
                    <label v-else-if="scope.row[e.field] === true" :class="e.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-check"></i></label>
                    <label v-else-if="scope.row[e.field] === false" :class="e.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-close"></i></label>
                    <label v-else :class="e.compareWith != ''? scope.row.addColor : ''">{{nullTreating(scope.row[e.field])}}</label>
                  </template>
                  <span v-if="e.children">
                    <el-table-column :min-width="e_.width" v-for="(e_, i_) in e.children" :key="i_" :prop="e_.field" :label="e_.fieldName" :sortable="e_.isOrder == 1? 'custom' : false" :render-header="renderHeader" :fixed="isFixed(e_.freeze)" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <label v-if="e_.url && e_.url != '' && e_.fieldName != ''" class="clickable" :class="e_.compareWith != ''? scope.row.addColor : ''" @click="clickableurl(e_, scope.row)">{{nullTreating(scope.row[e_.field])}}</label>
                        <label v-else-if="e_.fieldName == ''"></label>
                        <label v-else-if="e_.modify && !(scope.row.modify === false)" :class="e_.compareWith != ''? scope.row.addColor : ''">
                          <el-input v-model="scope.row[e_.field]" placeholder="请输入" size="mini" @focus="inlineModifyFocus(scope.row, e_)" @blur="confirmInlineModify(scope.row, e_, item_.moduleId, scope.$index)"></el-input>
                        </label>
                        <label v-else-if="scope.row[e_.field] === true" :class="e_.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-check"></i></label>
                        <label v-else-if="scope.row[e_.field] === false" :class="e_.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-close"></i></label>
                        <label v-else :class="e_.compareWith != ''? scope.row.addColor : ''">{{nullTreating(scope.row[e_.field])}}</label>
                      </template>
                    </el-table-column>
                  </span>
                </el-table-column>
                <!-- 其他项 -->
                <el-table-column :min-width="e.width || '80'" v-for="(e, i) in listItems[item_.moduleId]" :key="i" :prop="e.field" :label="e.fieldName" :sortable="e.isOrder == 1? 'custom' : false" :render-header="renderHeader" :fixed="isFixed(e.freeze)" v-if="!(e.isShow === false) && Object.keys(tableTree).length === 0" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <label v-if="e.field === 'common_operate'" class="common-operate">
                      <span v-for="(e_, i_) in buttonList[item_.moduleId]" :key="i_">
                        <span v-if="e_.type === 1 &&  e_.isEditable !== 1 && !(scope.row.showButton[i_] === false)" class="clickable" @click="updateTableItem(item_.moduleId, i_, scope.row)">{{e_.name || '修改'}}</span>
                        <span v-if="e_.type === 2 && !(scope.row.showButton[i_] === false)" class="clickable" @click="deleteTableItem(item_.moduleId, i_, scope.row)">{{e_.name || '删除'}}</span>
                        <span v-if="e_.type === 5 && !(scope.row.showButton[i_] === false)" class="clickable" @click="operateTableItem(item_.moduleId, i_, scope.row)">{{e_.name || '操作'}}</span>
                      </span>
                    </label>
                    <label v-else-if="e.url && e.url != ''" class="clickable" :class="e.compareWith != ''? scope.row.addColor : ''" @click="clickableurl(e, scope.row)">{{nullTreating(scope.row[e.field])}}</label>
                    <label v-else-if="e.modify && !(scope.row.modify === false)" :class="e.compareWith != ''? `${scope.row.addColor} inline-modify`  : 'inline-modify'">
                      <el-input v-model="scope.row[e.field]" placeholder="请输入" size="mini" @focus="inlineModifyFocus(scope.row, e)" @blur="confirmInlineModify(scope.row, e, item_.moduleId, scope.$index)"></el-input>
                    </label>
                    <label v-else-if="scope.row[e.field] === true" :class="e.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-check"></i></label>
                    <label v-else-if="scope.row[e.field] === false" :class="e.compareWith != ''? scope.row.addColor : ''"><i class="el-icon-close"></i></label>
                    <label v-else :class="e.compareWith != ''? scope.row.addColor : ''">{{nullTreating(scope.row[e.field])}}</label>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                v-if="tablelist[item_.moduleId].pageable != 0"
                @size-change="changeSize($event, item_.moduleId)"
                @current-change="changeCurrent($event, item_.moduleId)"
                :page-sizes="[10, 20, 50, 100, 500]"
                :page-size="tablelist[item_.moduleId].pageSize"
                :current-page="tablelist[item_.moduleId].pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tablelist[item_.moduleId].total">
              </el-pagination>
            </div>
          </el-col>
        </el-row>  
      </div>
      <!-- 图表模块 -->
      <div v-if="item[0].moduleType === 2" class="common-layout">
        <el-row :gutter="10">
          <el-col :span="24/item.length" v-for="(item_, index_) in item" :key="index_">
            <div class="common-chart" :id="item_.moduleId" style="width:100%" v-if="chartlist[item_.moduleId] && chartlist[item_.moduleId].nodata === false"></div>
            <el-card v-else align="center" :body-style="{height: '300px', padding: '130px 0 0'}" shadow="never">
              暂无数据
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <dialog-report ref="DownReport" v-if="isShowDownReport"></dialog-report>
    <!-- 弹框--按钮 -->
    <el-dialog :visible.sync="showTableItem" :title="tableOperate.name" width="60%" class="common-dialog-input" top="10vh">
      <el-form label-position="top" ref="formDialog" size="mini" :model="tableOperate.items" label-width="80px" style="max-height: 300px;overflow-y:scroll;" class="common-query">
        <span v-for="(item, index) in tableOperate.buttonItemVoList" :key="index">
          <!-- 弹框搜索项 -->
          <el-form-item v-if="item.type == 0 && item.subType !== 'autocomplete'" :label="item.labelName">
            <el-input v-model="tableOperateItem[item.columnName]" :required="item.required" :maxlength="item.length" :clearable="item.canClear === 1" :disabled="item.editAble === 0"></el-input>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <!-- 有搜索建议的input控件 -->
          <el-form-item :label="item.labelName" v-if="item.type == 0 && item.subType === 'autocomplete'">
            <el-autocomplete v-model="item.checkNameVal" :fetch-suggestions="querySearchAsync" @focus="getSuggestions(item)" placeholder="请输入编码或名称" @select="changeSuggestions(item, $event, 'dialog', 'one')" @blur="changeSuggestions(item, $event, 'dialog', 'one')" :clearable="item.canClear === 1" :disabled="item.editAble === 0"></el-autocomplete>
          </el-form-item>
          <el-form-item v-if="item.type == 1" :label="item.labelName">
            <el-select v-model="tableOperateItem[item.columnName]" :required="item.required" :clearable="item.canClear === 1" :disabled="item.editAble === 0" filterable>
              <el-option
                v-for="e in item.options"
                :key="e.id"
                :label="e.name"
                :value="e.id">
              </el-option>
            </el-select>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <el-form-item v-if="item.type == 2 && item.dateType !== 'dates'" :label="item.labelName">
            <el-date-picker
              v-model="tableOperateItem[item.columnName]"
              :editable="false"
              :type="item.dateType"
              :value-format="item.dateFormat"
              :picker-options="pickerOptions"
              placeholder="请选择"
              :clearable="item.canClear === 1"
              :disabled="item.editAble === 0">
            </el-date-picker>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <el-form-item v-if="item.type == 2 && item.dateType === 'dates'" :label="item.labelName">
            <el-date-picker
              v-model="weekDates[item.columnName]"
              :editable="false"
              type="dates"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="请选择"
              :clearable="item.canClear === 1"
              :disabled="item.editAble === 0">
            </el-date-picker>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <el-form-item v-if="item.type == 3" :label="item.labelName">
            <el-time-select
              v-model="tableOperateItem[item.columnName]"
              placeholder="选择时间">
            </el-time-select>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <el-form-item v-if="item.type == 4" :label="item.labelName">
            <el-date-picker
              v-model="tableOperateItem[item.columnName]"
              :editable="false"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              placeholder="选择日期时间">
            </el-date-picker>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <el-form-item v-if="item.type == 5" :label="item.labelName">
            <el-input v-model="item.checkNameVal" @focus="showTreeDialog(item, 'dialog')" prefix-icon="el-icon-search" placeholder="请选择" :clearable="item.canClear === 1" :disabled="item.editAble === 0"></el-input>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <el-form-item v-if="item.type == 6 && item.subType === 'selectOne'" :label="item.labelName" class="common-goods-style">
            <el-autocomplete v-model="item.checkNameVal" :fetch-suggestions="querySearchAsyncPost" @focus="getSuggestions(item)" placeholder="请输入编码或名称" @select="changeSuggestions(item, $event, 'dialog', 'one')" @blur="changeSuggestions(item, $event, 'dialog', 'one')" :disabled="item.editAble === 0"></el-autocomplete>
            <el-button icon="el-icon-search" @click="showTableDialog(item, 'dialog', 'one')" v-model="item.checkNameVal" :disabled="item.editAble === 0"></el-button>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <el-form-item v-if="item.type == 6 && item.subType !== 'selectOne'" :label="item.labelName" class="common-goods-style">
            <el-autocomplete v-model="item.checkNameVal" :fetch-suggestions="querySearchAsync" @focus="getSuggestions(item)" placeholder="请输入编码或名称" @select="changeSuggestions(item, $event, 'dialog')" @blur="changeSuggestions(item, $event, 'dialog')" :disabled="item.editAble === 0"></el-autocomplete>
            <el-button icon="el-icon-search" @click="showTableDialog(item, 'dialog')" v-model="item.checkNameVal" :disabled="item.editAble === 0"></el-button>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <el-form-item v-if="item.type == 7" :label="item.labelName">
            <el-cascader
              placeholder="请选择"
              expand-trigger="hover"
              clearable
              :options="item.cascaderOptions"
              :props="item.subType === 'selectOne' ? cascaderPropsF : cascaderPropsT"
              v-model="item.checkCascader"
              @change="handleCascaderChange($event, item, 'dialog')"
              :clearable="item.canClear === 1"
              :disabled="item.editAble === 0">
            </el-cascader>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
        </span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sureTableItem(true)" size="small">确 定</el-button>
        <el-button @click="sureTableItem(false)" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 弹框--少奎专用 -->
    <el-dialog :visible.sync="showAddGoodsItem" width="60%" class="common-dialog-input" top="10vh">
      <add-goods ref="AddGoods" @closeAddGoods="closeAddGoods"></add-goods>
    </el-dialog>
    <!-- 弹框--导入 -->
    <el-dialog :visible.sync="showUploadItem" :title="tableOperate.name" class="dialog-upload" top="10vh">
      <div>
        <el-button size="small" type="info" @click="downloadModel">下载模板</el-button>
        <label for="excelFile">
          <span class="upload">导入数据</span>
          <input type="file" id="excelFile" hidden @change="handleFileSelect" @click="chooseFile" v-if="file.isShow"/>
          <p style="display: inline-block;">{{ file.name }}</p>
        </label>
      </div>
      <div v-show="importMsg != 0">
        <hr class="division"/>
        <div v-if="importMsg == 1">导入消息：
          <ul v-for="item in importErrorMsg" >
            <li>&nbsp;&nbsp;第{{item.index}}行{{item.key}}为空</li>
          </ul>
        </div>
        <div v-if="importMsg == 2">导入成功！</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showUploadItem = false" size="small">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗--树结构控件 -->
    <el-dialog :title="treeData.labelName" :visible.sync="isShowTreeDialog" class="dialog-tree" top="10vh">
      <el-row>
        <el-col>
          <el-input style="width:200px;" size="mini" placeholder="输入关键字进行过滤" v-model="filterTreeText"></el-input>
        </el-col>
      </el-row>
      <el-row style="max-height: 300px; margin-top:10px; overflow-y:scroll;border:1px solid #ececec;">
        <el-col :span="24">
          <el-tree
            :props="defaultProps"
            :data="treeData.treeData"
            show-checkbox
            node-key="id"
            :filter-node-method="filterTreeId"
            ref="tree"
            :default-expanded-keys="['00']"
            @check="handleNodeClick"
            @check-change="cityCheckChange">
          </el-tree>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="closeTreeDialog(true)">选择并关闭</el-button>
        <el-button size="mini" @click="closeTreeDialog(false)">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗--table控件-one -->
    <el-dialog :title="tableData.labelName" :visible.sync="isShowTableDialogOne" class="dialog-tree" top="10vh" v-if="tableData.selectOne === 'one'">
      <el-row>
        <el-col>
          <el-input style="width:200px;" size="mini" placeholder="输入名称或编号" v-model="filterTableText"></el-input>
          <el-button size="mini" type="primary" @click="getTableData(true, 'one')">搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            size="small"
            ref="singleTable"
            v-loading="tableData.loading"
            :data="tableData.tableData"
            style="width:100%;margin: 10px 0"
            height="300"
            highlight-current-row
            @row-dblclick="handleCurrentChange">
            <el-table-column min-width="100" prop="id" label="编号" align="center"></el-table-column>
            <el-table-column min-width="100" prop="name" label="名称" align="center"></el-table-column>
          </el-table>
          <!-- 分页条 -->
          <el-pagination
            @size-change="changeSizeDialog($event, 'one')"
            @current-change="changeCurrentDialog($event, 'one')"
            :pager-count="5"
            :current-page="tableData.pageNum"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="tableData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
          </el-pagination>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :title="tableData.labelName" :visible.sync="isShowTableDialog" class="dialog-tree" top="10vh" v-else-if="tableData.selectOne !== 'one'">
      <el-row>
        <el-col>
          <el-input style="width:200px;" size="mini" placeholder="输入名称或编号" v-model="filterTableText"></el-input>
          <el-button size="mini" type="primary" @click="getTableData(true)">搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            size="small"
            ref="multiple"
            v-loading="tableData.loading"
            :data="tableData.tableData"
            style="width:100%;margin: 10px 0"
            height="300"
            @select="handleSelect"
            @select-all="handleSelectAllDialog">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column min-width="100" prop="id" label="编号" align="center"></el-table-column>
            <el-table-column min-width="100" prop="name" label="名称" align="center"></el-table-column>
          </el-table>
          <!-- 分页条 -->
          <el-pagination
            @size-change="changeSizeDialog"
            @current-change="changeCurrentDialog"
            :pager-count="5"
            :current-page="tableData.pageNum"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="tableData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
          </el-pagination>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="closeTableDialog(true)">选择并关闭</el-button>
        <el-button size="mini" @click="closeTableDialog(false)">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗--新页面 -->
    <el-dialog :visible.sync="isShowNewReportDialog" width="60%" class="dialog-tree" top="10vh">
      <dialog-report ref="DialogReport"></dialog-report>
    </el-dialog>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import axios from 'axios'
  import config from '@/utils/config'
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
  import exportSheet from './exportSheet'
  import DialogReport from './dialogReport'
  import addGoods from './addGoods'
    
  let baseUrl = config.reqUrl
  const commonReport = {
    // 获取报表基本配置
    getPageByPageId: '/boom/a/dynamicReport/getPageByPageId',
    // 获取指定搜索模块
    getQueryByModuleId: '/boom/a/report/module/query/getQueryByModuleId',
    // 获取指定表格
    getListByModuleId: '/boom/a/report/module/list/getListByModuleId',
    // 获取指定图表
    getChartByModuleId: '/boom/a/report/module/chart/getChartByModuleId', 
    // 获取表格按钮集合
    getButtonList: '/boom/a/report/module/list/button/getButtonList',
    // 报表查询
    dynamicReportSearch: '/boom/a/dynamicReport/dynamicReportSearch',
    // 图表查询
    dynamicReportSearchChart: '/boom/a/dynamicReport/dynamicReportSearchChart',
    dynamicReportSearchPie: '/boom/a/dynamicReport/dynamicReportSearchPie',
    // 新增
    dynamicReportAdd: '/boom/a/dynamicReport/dynamicReportAdd',
    // 修改
    dynamicReportUpdate: '/boom/a/dynamicReport/dynamicReportUpdate',
    // 删除
    dynamicReportDelete: '/boom/a/dynamicReport/dynamicReportDelete',
    // 清除
    deleteRedisCache: '/boom/a/dynamicReport/deleteRedisCache',
    // 导入
    dynamicReportImport: '/boom/a/dynamicReport/dynamicReportImport',
    // 根据分类编号集合获取商品信息
    getGoodsListByCategoryNoList: '/foundation/c/p/goodsCategory/getGoodsListByCategoryNoList',
    // 添加
    addSmartGoods: '/storefront/smartGoods/add',
  }
  const commonReportExcel = baseUrl + '/boom/a/dynamicReport/dynamicReportForExcel'
  export default {
    data () {
      return {
        showBack: false,
        system: '', // 系统
        pageId: '', // 表格ID
        pageName: '', // 报表名称
        showExport: true, // 是否显示导出按钮
        exportLoading: false, // 导出表格loading
        showTableItem: false,
        showUploadItem: false, // 导入弹框
        showAddGoodsItem: false, // 少奎专用
        isNotFold: '',
        tableOperate: { // 操作
          name: '',
        },
        tableOperateItem: {},
        maxHeight: document.documentElement.clientHeight - 130,
        layout: [], // 布局
        layouts: [], // 布局参考
        modules: [],
        queryItems: {}, // 搜索条件
        searchItems: { // 搜索参数
        },
        listItems: {}, // 表格参数
        tablelist: {}, // 查询结果
        tableTree: {}, // 多级表头
        summary: {}, //合计
        showSummary: true,
        buttonList: {}, // 按钮
        chartItems: {}, // 图表参数
        chartlist: {}, // 查询结果
        requiredData: true, // 是否可以查询
        weekDates: {},
        pickerOptions: {
          firstDayOfWeek: 1
        },
        dateOptions: [], // 日期联动控件
        dateLinkage: [], // 日期联动控件
        isShowTreeDialog: false,
        treeData: {}, // 树结构弹窗
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        filterTreeText: '',
        isShowTableDialogOne: false,
        isShowTableDialog: false,
        tableData: {}, // 表格弹窗
        suggestionsData: {},
        filterTableText: '',
        checkedDialogList: [],
        cascaderOptions: [],
        cascaderPropsT: {
          value: 'id',
          label: 'name',
          children: 'children',
          checkStrictly: true 
        },
        cascaderPropsF: {
          value: 'id',
          label: 'name',
          children: 'children',
          checkStrictly: false 
        },
        file: {name: '', isShow: true}, // 导入数据
        tempConfig: {},
        importMsg: 0,
        importErrorMsg: [],
        searchUrl: '', // 查询url
        isShowNewReportDialog: false, // 新页面弹框
        searchHide: true,
        inlineOperate: {}, // 记录行内操作
        isShowDownReport: false,
        tempAutocomplete: '',
        isauthorityLayer: false ,//权限弹窗
      }
    },
    components: {
      'down-report': DialogReport,
      'dialog-report': DialogReport,
      'add-goods': addGoods
    },
    computed: {
    },
    beforeRouteUpdate(to, from, next) {
      this.pageId = to.params.id
      next()
      this.clearPage()
      this.getPageByPageId()
    },
    created() {
      this.pageId = this.$route.params.id
      let urlArr = this.$route.path.split('/')
      if(urlArr[1] === 'mixReport') {
        return
      }
      this.clearPage()
      this.getPageByPageId()
    },
    watch: {
      weekDates: {
        handler(newDate) {
          for(let key in newDate) {
            let dates = newDate[key]
            if(dates === null) {
              this.weekDates[key] = []
            }else if(dates && dates.length === 8) {
              this.weekDates[key] = utils.getAllWeek(dates[7])
            }else if(dates && dates.length !== 7 && dates[0]) {
              this.weekDates[key] = utils.getAllWeek(dates[0])
            }
          }
        },
        deep: true
      },
      filterTreeText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      setSearchItems() {
        let obj = {}
        if(Storage.get('jumpReport') && Storage.get('jumpReport') != 'undefined') {
          obj = Storage.get('jumpReport')
        }
        for(let key in obj) {
          if(key == this.pageId) {
            let searchInfo = obj[key].searchInfo
            this.searchItems = {...searchInfo}
            this.backReport = obj[key].backReport
            if(this.backReport) {
              this.showBack = true
            }
          }
        }
      },
      setDefault(pageId, searchItems, queryItems, weekDates, hide) {
        this.clearPage()
        this.pageId = pageId
        if(searchItems) {
          this.searchItems = searchItems
        }
        if(weekDates) {
          this.weekDates = weekDates
        }
        if(queryItems) {
          let moduleIdQuerys = Object.keys(queryItems) || []
          if(moduleIdQuerys.length < 1) {
            return 
          }
          moduleIdQuerys.forEach(item => {
            queryItems[item].forEach((item_, index) => {
              if(item_.checkNameVal) {
                setTimeout(() => {
                  this.$set(this.queryItems[item], index, item_)
                }, 200)
              }
              if(item_.checkCascader) {
                setTimeout(() => {
                  this.$set(this.queryItems[item], index, item_)
                }, 200)
              }
            })
          })
        }
        if(hide) {
          this.searchHide = false
        }
        this.getPageByPageId()
      },
      // 清除页面数据
      clearPage() {
        this.showBack = false
        this.isShowDownReport = false
        this.layout = [] // 布局
        this.modules = []
        this.queryItems = {} // 搜索条件
        this.searchItems = {}
        this.listItems = {} // 表格参数
        this.tablelist = {} // 查询结果
        this.summary = {} //合计
        this.buttonList = {} // 按钮
        this.chartItems = {} // 图表参数
        this.chartlist = {} // 查询结果
        this.weekDates = {}
        this.isNotFold = ''
      },
      // 获取报表基本配置
      getPageByPageId() {
        this.$http.post(commonReport.getPageByPageId, {pageId: this.pageId}).then((res) => {
          if (res.code === 0) {
            if(res.data) {
              this.pageName = res.data.pageName
              this.modules = res.data.modules
              this.system = res.data.system // 0-BI 1-ERP 2-中台
              document.title = this.pageName
              this.formatLayout(res.data.layout)
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.$notify.error({
            title: '提示',
            message: e.message
          })
        })
      },
      // 格式化layout
      formatLayout(val) {
        this.setSearchItems()
        // 排除掉空数据
        val.forEach((item, i) => {
          let arr = []
          arr = item.filter((item_, i_) => {
            return item_.moduleType !== undefined && item_.moduleId !== undefined
          })
          if(arr.length > 0) {
            val[i] = arr
          }
        })
        this.layout = val
        // 获取指定模块
        this.requiredData = true
        this.layout.forEach((item, index) => {
          item.forEach((e, i) => {
            if(e.moduleType == 0) {
              this.$http.post(commonReport.getQueryByModuleId, {moduleId: e.moduleId}).then((res) => {
                if (res.code === 0) {
                  if(res.data) {
                    let queryItems = res.data.queryItems
                    this.configInt(queryItems, true)
                    this.$set(this.queryItems, e.moduleId, queryItems)
                    this.searchUrl = res.data.url
                  }
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                this.$notify.error({
                  title: '提示',
                  message: e.message
                })
              })
            }else if(e.moduleType == 1) {
              this.$http.post(commonReport.getListByModuleId, {moduleId: e.moduleId}).then((res) => {
                if (res.code === 0) {
                  if(res.data && res.data.listItems && res.data.listItems.length) {
                    let listItems = res.data.listItems || []
                    let obj = {
                      loading: false,
                      showSelection: false,
                      tableId: res.data.id,
                      tablelist: [],
                      pageSize: 10,
                      pageNum: 1,
                      total:0,
                      pageable: res.data.pageable,
                      height: res.data.height || '9999'
                    }
                    this.$set(this.tablelist, e.moduleId, obj)
                    // 处理表头合并
                    let isTableTree = false
                    let tableTree = listItems.slice(0, listItems.length)
                    let tableTreeKey = {}
                    listItems.forEach(item => {
                      if(item.mergeTitle && !tableTreeKey[item.mergeTitle]) {
                        tableTreeKey[item.mergeTitle] = 1
                        isTableTree = true
                        tableTree.push({
                          compareWith: "",
                          fieldName: item.mergeTitle
                        })
                      }
                    })
                    if(isTableTree) {
                      let newTableTree = this.transTreeData(tableTree, 'fieldName', 'mergeTitle', 'children', 'tableTree')
                      this.$set(this.tableTree, e.moduleId, newTableTree)
                      this.$set(this.listItems, e.moduleId, newTableTree)
                    }else{
                      this.$set(this.listItems, e.moduleId, listItems)
                    }
                    let len = this.listItems[e.moduleId].length
                    this.getButtonList(e.moduleId, len)
                    setTimeout(() => {
                      // 先判断必填项
                      if(this.requiredFormat(null, 'first') === false) {
                        return
                      }
                      this.tableSearch(e.moduleId)
                    }, 200)
                  }
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                this.$notify.error({
                  title: '提示',
                  message: e.message
                })
              })
            }else if(e.moduleType == 2) {
              this.$http.post(commonReport.getChartByModuleId, {moduleId: e.moduleId}).then((res) => {
                if (res.code === 0) {
                  if(res.data && res.data.chartItems && res.data.chartItems.length) {
                    this.$set(this.chartItems, e.moduleId, res.data.chartItems)
                    let obj = {
                      nodata: false,
                      chartId: res.data.chartId,
                      chartType: res.data.chartType
                    }
                    this.$set(this.chartlist, e.moduleId, obj)

                    setTimeout(() => {
                      // 先判断必填项
                      if(this.requiredFormat(null, 'first') === false) {
                        return
                      }
                      this.chartSearch(e.moduleId, obj.chartId, obj.chartType)
                    }, 300)
                  }
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                this.$notify.error({
                  title: '提示',
                  message: e.message
                })
              })
            }
          })
        })
      },
      instantQuery(item) {
        let param = {}
        if(item.query) {
          // 从上一页带来的查询条件
          param[item.query] = this.searchItems[item.query]
          param['q'] = this.searchItems[item.query]
        }else if(item.queryClassify) {
          param['q'] = item.queryClassify
        }
        this.$http.post(item.urlValue, param).then((res) => {
          if (res.code === 0) {
            if(res.data) {
              this.$set(item, 'options', res.data)
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log(e.message)
        })
      },
      // 先格式化级联
      configCascade(queryItems) {
        queryItems.forEach((item, i) => {
          if(item.widgetParentId) {
            queryItems.forEach((item_, i_) => {
              if(item.widgetParentId == item_.widgetId) {
                item.query = item_.columnName
                item_.widgetChildIndex = i
                item_.instantQuery = true // 即时查询
              }
            })
          }
        })
      },
      // 格式化查询项
      configInt(queryItems, searchItem) {
        this.configCascade(queryItems)
        queryItems.forEach((item, i) => {
          if(searchItem) {
            if(i > 5) {
              item.canFold = 1
            }else{
              item.canFold = 0
            }
            if(item.canFold == 1) {
              this.isNotFold = false
            }
          }
          if(item.type === 0) {
            // 输入框
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  // suggest
                  item.subType = 'autocomplete'
                }
              }
            }
          }else if(item.type === 1) {
            this.$set(item, 'options', [])
            // select
            item.multiple = false
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  item.multiple = true
                }else if(key === 'subType' && widgetStyle[key] == 2) {
                  item.queryClassify = item.columnName
                }
              }
            }
            if(item.urlValue && item.urlValue != '') {
              if(item.query || item.queryClassify) {
                // 等母控件返回结果再次查询
                // this.instantQuery(item)
              }else if(item.urlValue.indexOf('?') > -1) {
                let str = item.urlValue
                let index = str.indexOf("?");
                let url = str.substr(0, index);
                let result = str.substr(index + 1,str.length);
                let searchArr = result.split('&') || []
                let obj = {}
                searchArr.forEach(item => {
                  let i = item.indexOf("=")
                  let key = item.substr(0, i);
                  let res = item.substr(i + 1, item.length);
                  obj[key] = res
                })
                this.$http.post(url, obj).then((res) => {
                  if (res.code === 0) {
                    if(res.data) {
                      this.$set(item, 'options', res.data)
                      if(item.widgetChildIndex) {
                        this.instantQuery(queryItems[item.widgetChildIndex])
                      }
                    }
                    return
                  }
                  throw new Error(res.msg)
                }).catch(e => {
                  this.$notify.error({
                    title: '提示',
                    message: e.message
                  })
                })
              }else{
                this.$http.post(item.urlValue).then((res) => {
                  if (res.code === 0) {
                    if(res.data) {
                      this.$set(item, 'options', res.data)
                      if(item.widgetChildIndex) {
                        this.instantQuery(queryItems[item.widgetChildIndex])
                      }
                    }
                    return
                  }
                  throw new Error(res.msg)
                }).catch(e => {
                  this.$notify.error({
                    title: '提示',
                    message: e.message
                  })
                })
              }
            }else if(item.textValue && item.textValue != '') {
              item.options = JSON.parse(item.textValue)
            }
            // 有默认项
            if(item.defaultValue != '' && item.defaultValue != undefined) {
              this.$set(this.searchItems, item.columnName, item.defaultValue)
            }
            item.multiple = false
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  item.multiple = true
                }
              }
            }
          }else if(item.type === 2) {
            // 日期控件
            item.dateType = 'date'
            item.dateFormat = 'yyyy-MM-dd'
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  // 周控件
                  item.dateType = 'dates'
                  this.$set(this.weekDates, item.columnName, utils.getAllWeek(utils.timestampToTimeNoHMS(new Date())))
                }else if(key === 'subType' && widgetStyle[key] == 2) {
                  // 月控件
                  item.dateType = 'month'
                  item.dateFormat = 'yyyy-MM-dd'
                  this.$set(this.searchItems, item.columnName, utils.timestampToTimeNoHMS(new Date()).slice(0, 7) + '-01')
                }else if(key === 'subType' && widgetStyle[key] == 3) {
                  // 年控件
                  item.dateType = 'year'
                  item.dateFormat = 'yyyy'
                  this.$set(this.searchItems, item.columnName, utils.timestampToTimeNoHMS(new Date()).slice(0, 4))
                }else if(key === 'subType' && widgetStyle[key] == 4) {
                  // 日期联动控件
                  item.dateType = 'dateLinkage'
                }
              }
            }
            // 默认日期
            if(item.labelValue && item.labelValue != '') {
              let labelValue = JSON.parse(item.labelValue)
              for(let key in labelValue) {
                if(key === 'preDays' && labelValue[key] !== '') {
                  item.preDays = labelValue[key]
                  this.$set(this.searchItems, item.columnName, utils.timestampToTimeNoHMS(parseInt(Date.parse(new Date().toLocaleDateString())) - 86400000*item.preDays));
                }else if(key === 'checkList') {
                  // 日期联动
                  this.dateOptions = []
                  let checkList = labelValue[key] || []
                  checkList.forEach(e => {
                    if(e === '日') {
                      this.dateOptions.push({
                        value: 1,
                        label: '日'
                      })
                    }else if(e === '周') {
                      this.$set(this.weekDates, item.columnName, [])
                      this.dateOptions.push({
                        value: 2,
                        label: '周'
                      })
                    }else if(e === '月') {
                      this.dateOptions.push({
                        value: 3,
                        label: '月'
                      })
                    }
                  })
                  if(this.dateOptions[0]) {
                    this.$set(this.searchItems, 'dateType', this.dateOptions[0].value);
                    this.$set(this.searchItems, item.columnName, '');
                    if(item.isRangeWeek == 1) {
                      this.$set(this.weekDates, 'start_week', [])
                      this.$set(this.weekDates, 'end_week', [])
                    }else{
                      this.$set(this.weekDates, item.columnName, [])
                    }
                    if(item.isRange == 1) {
                      this.dateOptionsChange(null, item.columnName, item.isRange)
                    }else{
                      this.dateOptionsChange(null, item.columnName)
                    }
                  }
                }
              }
            }
          }else if(item.type === 3) {
            // 时间控件
          }else if(item.type === 4) {
            // 默认值
            if(item.labelValue && item.labelValue != '') {
              let labelValue = JSON.parse(item.labelValue)
              for(let key in labelValue) {
                if(key === 'preDays' && labelValue[key] !== '') {
                  item.preDays = labelValue[key]
                  this.$set(this.searchItems, item.columnName, utils.timestampToTimeNoHMS(parseInt(Date.parse(new Date().toLocaleDateString())) - 86400000*item.preDays) + ' 00:00:00');
                }
              }
            }
          }else if(item.type === 5) {
            // 弹窗树结构控件
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  // 城市单选的树控件
                  item.subType = 'selectOneCity'
                }else if(key === 'subType' && widgetStyle[key] == 2) {
                  // 选择分类返回商品
                  item.subType = 'returnGoods'
                }else if(key === 'subType' && widgetStyle[key] == 3) {
                  // 单选控件
                  item.subType = 'selectOne'
                }else if(key === 'parentNode' && widgetStyle[key] == 'true') {
                  // 子节点全选时传父节点
                  item.parentNode = true
                }else if(key === 'suggest' && widgetStyle[key] == 'true') {
                  // 搜索建议
                  item.suggest = true
                }
              }
              // 选择分类返回商品
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 2) {
                  item.subType = 'returnGoods'
                }
              }
            }
            if(item.urlValue && item.urlValue != '') {
              this.$http.get(item.urlValue).then((res) => {
                if (res.code === 0) {
                  if(res.data) {
                    let temp = JSON.parse(JSON.stringify(res.data))
                    item.treeData = this.transTreeData(temp, 'id', 'pid', 'children')
                    this.configTree(item.treeData)
                    item.checkNameVal = ''
                  }
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                this.$notify.error({
                  title: '提示',
                  message: e.message
                })
              })
            }
          }else if(item.type === 6) {
            // 弹窗suggester控件
            if(item.urlValue && item.urlValue != '') {
              item.tableData = []
              item.total = 0
              item.pageNum = 1
              item.pageSize = 10
              item.checkNameVal = ''
            }
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              // 弹窗suggester单选
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  item.subType = 'selectOne'
                }
              }
            }
          }else if(item.type === 7) {
            // 级联选择器
            if(item.urlValue && item.urlValue != '') {
              this.$http.get(item.urlValue).then((res) => {
                if (res.code === 0) {
                  if(res.data) {
                    item.cascaderOptions = this.transTreeData(res.data, 'id', 'pid', 'children')
                    this.configTree(item.cascaderOptions)
                  }
                  return
                }
                throw new Error(res.msg)
              }).catch(e => {
                this.$notify.error({
                  title: '提示',
                  message: e.message
                })
              })
            }
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              // 可单选的树控件
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  item.subType = 'selectOne'
                }
              }
            }
          }
        })
      },
      // 日期控件change
      dateOptionsChange(e, param, isRange, isRangeWeek, isRangMonth) {
        if(this.searchItems['dateType'] == 1) {
          this.dateLinkage.dateType = 'date'
          this.dateLinkage.dateFormat = 'yyyy-MM-dd'
          if(isRange == 1) {
            this.$set(this.searchItems, 'start_date', utils.timestampToTimeNoHMS(parseInt(Date.parse(new Date().toLocaleDateString())) - 86400000));
            this.$set(this.searchItems, 'end_date', utils.timestampToTimeNoHMS(parseInt(Date.parse(new Date().toLocaleDateString())) - 86400000));
          }else{
            this.$set(this.searchItems, param, utils.timestampToTimeNoHMS(parseInt(Date.parse(new Date().toLocaleDateString())) - 86400000));
          }
        }else if(this.searchItems['dateType'] == 2) {
          if(isRangeWeek == 1) {
            this.$set(this.weekDates, 'start_week', utils.getAllWeek(utils.timestampToTimeNoHMS(new Date())))
            this.$set(this.weekDates, 'end_week', utils.getAllWeek(utils.timestampToTimeNoHMS(new Date())))
          }else{
            this.$set(this.weekDates, param, utils.getAllWeek(utils.timestampToTimeNoHMS(new Date())))
          }
        }else if(this.searchItems['dateType'] == 3) {
          this.dateLinkage.dateType = 'month'
          this.dateLinkage.dateFormat = 'yyyy-MM-dd'
          if(isRangMonth) {
            this.$set(this.searchItems, 'start_month', utils.timestampToTimeNoHMS(new Date()).slice(0, 7) + '-01');
            this.$set(this.searchItems, 'end_month', utils.timestampToTimeNoHMS(new Date()).slice(0, 7) + '-01');
          }else{
            this.$set(this.searchItems, param, utils.timestampToTimeNoHMS(new Date()).slice(0, 7) + '-01');
          }
        }
      },
      // 表格方法-格式化
      nullTreating(data) {
        if(data == null) {
          data = '-'
        }
        return data
      },
      // 表格方法-changeSize
      changeSize(value, moduleIdList) {
        this.tablelist[moduleIdList].pageSize = value
        this.checkedDialogList = []
        this.tableSearch(moduleIdList, false)
      },
      // 表格方法-changeCurrent
      changeCurrent(value, moduleIdList) {
        this.tablelist[moduleIdList].pageNum = value
        this.checkedDialogList = []
        this.tableSearch(moduleIdList, false)
      },
      // 表格方法-排序
      orderChange({column, prop, order}, moduleIdList) {
        if(order == 'descending') {
          this.tablelist[moduleIdList].orderType = 2
        }else if(order == 'ascending') {
          this.tablelist[moduleIdList].orderType = 1
        }
        this.tablelist[moduleIdList].orderField = prop
        this.tableSearch(moduleIdList)
      },
      // 表格方法-对齐
      isFixed(param) {
        if(param == 1) {
          return 'left'
        }else if(param == 2) {
          return 'right'
        }else{
          return false
        }
      },
      // 表格方法-提示-未完成
      renderHeader(h, {column, $index}) {
        let tooltip = ''
        for(let key in this.listItems) {
          let obj = this.listItems[key] || []
          obj.forEach(item => {
            if(item.comment && item.field === column.property) {
              tooltip = item.comment
            }
          })
        }
        if(tooltip) {
          return h("span", [
            h("span", [column.label]),
            h("el-tooltip", {
              attrs: {
                effect: "dark",
                content: [h('pre', tooltip)],
                placement: "bottom"
              }
            },
            [h('i', {
              class:'el-icon-question',
              style:'color:#409eff;margin-left:5px;'
            })])
          ])
        }else{
          return h("span", [h("span", [column.label])])
        }
      },
      // 表格方法-合计
      getSummaries (obj) {
        let {columns} = obj
        const sums = []
        columns.forEach((column, index) => {
          if(this.summary.hasOwnProperty(column.property)) {
            sums[index] = this.summary[column.property]
          }
        });
        if (!sums[0]) {
          sums[0] = ''
        }
        sums[0] = `合计：${sums[0]}`
        return sums;
      },
      // 查询-先判断必填项
      requiredFormat(moduleIdQuery, first) {
        // 处理日期格式---周
        if((this.searchItems.dateType && this.searchItems.dateType === 2) || (!this.searchItems.dateType && this.weekDates)) {
          for(let key in this.weekDates) {
            let dates = this.weekDates[key]
            if(dates.length === 0) {
                this.searchItems[key]  = ''
            }else if(dates && dates[0]) {
              if(dates[0].indexOf('NaN') > -1) {
                this.searchItems[key]  = ''
              }else{
                this.searchItems[key] = dates[0]
              }
            }
          }
        }
        if(!moduleIdQuery) {
          let moduleIdQuerys = Object.keys(this.queryItems) || []
          if(moduleIdQuerys.length < 1) {
            this.requiredData = true
            return this.requiredData
          }
          moduleIdQuerys.forEach(item => {
            this.queryItems[item].forEach(item_ => {
              if(item_.nonEmpty === 1 && this.requiredData) {
                if(item_.type == 2 && item_.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 1 && item_.isRange == 1){
                  // 日期联动
                  if(this.searchItems['start_date'] == '' || this.searchItems['start_date'] == null || this.searchItems['end_date'] == '' || this.searchItems['end_date'] == null) {
                    if(first !== 'first') {
                      this.$message("必填项日期不能为空")
                    }
                    this.requiredData = false
                    return
                  }
                }else if(this.searchItems[item_.columnName] == '' || this.searchItems[item_.columnName] == null) {
                  if(first !== 'first') {
                    this.$message("必填项'" + item_.labelName + "'不能为空")
                  }
                  this.requiredData = false
                  return
                }                
              }
              if(item_.type == 2 && item_.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 1){
                if((new Date(this.searchItems['end_date']).getTime() - new Date(this.searchItems['start_date']).getTime()) > 86400000*180) {
                  this.$message("选择日期间隔不能大于180天")
                  this.requiredData = false
                }
              }else if(item.type == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 3){
                if((new Date(this.searchItems['end_month']).getTime() - new Date(this.searchItems['start_month']).getTime()) > 86400000*365) {
                  this.$message("选择日期间隔不能大于一年")
                  this.requiredData = false
                }
              }
            })
          })
        }else{
          this.queryItems[moduleIdQuery].forEach(item => {
            if(item.nonEmpty === 1 && this.requiredData) {
              if(item.type == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 1 && item.isRange == 1){
                // 日期联动
                if(this.searchItems['start_date'] == '' || this.searchItems['start_date'] == null || this.searchItems['end_date'] == '' || this.searchItems['end_date'] == null) {
                  if(first !== 'first') {
                    this.$message("必填项日期不能为空")
                  }
                  this.requiredData = false
                  return
                }
              }else if(item.type == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 2 && item.isRangeWeek == 1){
                // 日期联动
                if(this.searchItems['start_week'] == '' || this.searchItems['start_week'] == null || this.searchItems['end_week'] == '' || this.searchItems['end_week'] == null) {
                  if(first !== 'first') {
                    this.$message("必填项日期不能为空")
                  }
                  this.requiredData = false
                  return
                }
              }else if(item.type == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 3 && item.isRangeMonth == 1){
                // 日期联动
                if(this.searchItems['start_month'] == '' || this.searchItems['start_month'] == null || this.searchItems['end_month'] == '' || this.searchItems['end_month'] == null) {
                  if(first !== 'first') {
                    this.$message("必填项日期不能为空")
                  }
                  this.requiredData = false
                  return
                }
              }else if(this.searchItems[item.columnName] == '' || this.searchItems[item.columnName] == null) {
                if(first !== 'first') {
                  this.$message("必填项'" + item.labelName + "'不能为空")
                }
                this.requiredData = false
                return
              }
            }
            if(item.type == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 1){
              if((new Date(this.searchItems['end_date']).getTime() - new Date(this.searchItems['start_date']).getTime()) > 86400000*180) {
                this.$message("选择日期间隔不能大于180天")
                this.requiredData = false
              }
            }else if(item.type == 2 && item.widgetStyle == '{"subType":"4"}' && this.searchItems['dateType'] == 3){
              if((new Date(this.searchItems['end_month']).getTime() - new Date(this.searchItems['start_month']).getTime()) > 86400000*365) {
                this.$message("选择日期间隔不能大于一年")
                this.requiredData = false
              }
            }
          })
        }
        return this.requiredData
      },
      // 查询
      searchAll(moduleIdQuery) {
        this.requiredData = true
        // 先判断必填项
        if(this.requiredFormat(moduleIdQuery) === false) {
          return
        }
        for(let key in this.tablelist) {
          let obj = this.tablelist[key]
          this.tableSearch(key)
        }
        for(let key in this.chartlist) {
          let obj = this.chartlist[key]
          this.chartSearch(key, obj.chartId, obj.chartType)
        }
      },
      // 查询-表格
      tableSearch(moduleIdList, research) {
        if (research !== false) {
          // 重新搜索
          this.tablelist[moduleIdList].pageNum = 1
        }
        this.tablelist[moduleIdList].loading = true;
        let tableId = this.tablelist[moduleIdList].tableId
        let search = {
          ...this.searchItems,
          queryId: tableId,
          pageId: this.pageId,
          searchItems: this.searchItems,
          pageSize: this.tablelist[moduleIdList].pageSize,
          pageNum: this.tablelist[moduleIdList].pageNum,
          orderType: this.tablelist[moduleIdList].orderType,
          orderField: this.tablelist[moduleIdList].orderField
        }
        this.$http.post(this.searchUrl || commonReport.dynamicReportSearch, {...search}).then((res) => {
          this.tablelist[moduleIdList].loading = false
          if (res.code === 0) {
            this.tablelist[moduleIdList].tablelist = res.data.result || []
            this.tablelist[moduleIdList].total = res.data.total
            let listItems = this.listItems[moduleIdList] || []
            let buttonList = this.buttonList[moduleIdList] || []
            let tablelist = this.tablelist[moduleIdList].tablelist || []
            
            // 处理合计， 先判断有几个表格
            let num = []
            for(let key in this.listItems) {
              num.push(key)
            }
            this.showSummary = false
            if(res.data.summary && num.length < 2) {
              let sum = res.data.summary
              listItems.forEach(item => {
                if(item.isSummer == 0) {
                  let field = item.field
                  delete sum[field]
                }
              })
              this.summary = sum
              this.showSummary = true
            }else if(res.data.summary && num.length > 1){
              let obj = {}
              listItems.forEach((item, index) => {
                if(index == 0) {
                  obj[item.field] = '合计：'
                }else{
                  obj[item.field] = res.data.summary[item.field]
                }
              })
              this.tablelist[moduleIdList].tablelist.push(obj)
            }
            listItems.forEach(item => {
              // 处理颜色
              if(item.compareWith) {
                let isNum = !isNaN(parseFloat(item.compareWith))
                if(isNum) {
                  this.tablelist[moduleIdList].tablelist.forEach(item_ => {
                    if(parseFloat(item_[item.field]) > parseFloat(item.compareWith)) {
                      item_.addColor = 'laber-color-green'
                    }else if(parseFloat(item_[item.field]) < parseFloat(item.compareWith)) {
                      item_.addColor = 'laber-color-red'
                    }
                  })
                }else{
                  this.tablelist[moduleIdList].tablelist.forEach(item_ => {
                    let compareWith = item_[item.compareWith]
                    if(compareWith === undefined) {
                      compareWith = 100
                    }
                    if(parseFloat(item_[item.field]) > parseFloat(compareWith)) {
                      item_.addColor = 'laber-color-green'
                    }else if(parseFloat(item_[item.field]) < parseFloat(compareWith)) {
                      item_.addColor = 'laber-color-red'
                    }
                  })
                }
              }
            })
            // 处理操作列 condition
            tablelist.forEach(item => {
              this.$set(item, 'showButton', [])
              buttonList.forEach((item_, i_) => {
                if(item_.condition) {
                  item_.condition.forEach(item__ => {
                    let arr = item__.split(':')
                    if(item[arr[0]] == arr[1]) {
                      this.$set(item.showButton, i_, false)
                      item.modify = false
                    }
                  })
                }
              })
            })
            return
          }
          // console.log("123", res)
          if (res.code === -405) {
            this.isauthorityLayer = true
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.tablelist[moduleIdList].loading = false
          console.log("sd ", e.message)
          this.$notify.error({
            title: '提示',
            message: e.message
          })
        })
      },
      // 查询-图表
      chartSearch(moduleIdChart, chartId, chartType) {
        let legend = []
        let series = []
        let xAxis = []
        let chartTitle = ''
        let colorList = ['#C1232B','#B5C334','#FCCE10','#BA55D3','#27727B','#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD','#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0']
        this.chartlist[moduleIdChart].nodata = false

        setTimeout(() => {
          let myChart = echarts.init(document.getElementById(moduleIdChart))
          myChart.showLoading({
            text : '正在加载数据'
          })
          let search = {
            ...this.searchItems,
            queryId: chartId,
            pageId: this.pageId,
            searchItems: this.searchItems
          }
          if (chartType == 3) {
            // 折线图
            this.$http.post(commonReport.dynamicReportSearchChart, {...search}).then((res) => {
              if (res.code === 0) {
                legend = res.data.legend
                series = res.data.series
                series.forEach((v, i) => {
                  v['type'] = 'line'
                  let itemStyle = {
                    normal: {
                      color: colorList[i]
                    }
                  }
                  v['itemStyle'] = itemStyle
                })
                xAxis = res.data.xAxis
                chartTitle = res.data.title
                let option = {
                  title: {
                    text: chartTitle,
                    textStyle: {
                      fontSize: 16
                    }
                  },
                  grid: {
                    top: 60,
                    bottom: 10,
                    left: 5,
                    right: 10,
                    containLabel: true
                  },
                  legend: {
                    data: legend,
                    top: 25
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  calculable: true,
                  xAxis: [
                    {
                      type: 'category',
                      axisLabel: {
                        rotate: 30
                      },
                      data: xAxis
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value'
                    }
                  ],
                  series: series
                }
                myChart.hideLoading()
                myChart.setOption(option, true)
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.chartlist[moduleIdChart].nodata = true
              console.log(e.message)
            })
          }else if (chartType == 2) {
            // 柱状图
            this.$http.post(commonReport.dynamicReportSearchChart, {...search}).then((res) => {
              if (res.code === 0) {
                legend = res.data.legend
                series = res.data.series
                series.forEach((v) => {
                  v['type'] = 'bar'
                  v['barMaxWidth'] = '50'
                  let label = {normal: {
                      show: true,
                      position: 'top'
                    }}
                  v['label'] = label
                })
                xAxis = res.data.xAxis
                chartTitle = res.data.title
                let option = {
                  title: {
                      text: chartTitle,
                      textStyle: {
                        fontSize: 16
                      }
                  },
                  legend: {
                      data: legend,
                      top: 25
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  calculable: true,
                  xAxis: [
                    {
                      type: 'category',
                      axisLabel: {
                        interval: 0,
                        rotate: 30
                      },
                      data: xAxis
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value'
                    }
                  ],
                  series: series
                }
                myChart.hideLoading()
                myChart.setOption(option, true)
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.chartlist[moduleIdChart].nodata = true
              console.log(e.message)
            })
          }else if (chartType == 1) {
            // 饼图
            this.$http.post(commonReport.dynamicReportSearchPie, {...search}).then((res) => {
              if (res.code === 0) {
                legend = res.data.legends
                chartTitle = res.data.title
                series = res.data.datas
                let option = {
                  title: {
                    text: chartTitle,
                    textStyle: {
                      fontSize: 16
                    }
                  },
                  tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    data: legend,
                    top: 25
                  },
                  series: [
                    {
                      type: 'pie',
                      radius: '55%',
                      startAngle: '30',
                      center: ['50%', '60%'],
                      data: series,
                      itemStyle: {
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal: {
                          label: {
                            show: true,
                            formatter: '{b}:{c} ({d}%)'
                          },
                          labelLine: {
                            show: true
                          }
                        }
                      }
                    }
                  ]
                };
                myChart.hideLoading()
                myChart.setOption(option, true)
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.chartlist[moduleIdChart].nodata = true
              console.log(e.message)
            })
          }
        },200)
      },
      // 表格操作-获取按钮
      getButtonList(moduleIdList, len) {
        // 0-新增 1-编辑 2-删除 3-导入 4-批量操作 5-单项操作
        let tableId = this.tablelist[moduleIdList].tableId
        this.$http.post(commonReport.getButtonList, {listId: tableId}).then((res) => {
          if (res.code === 0) {
            // operate
            let buttonList = res.data || []
            this.$set(this.buttonList, moduleIdList, buttonList)
            let operate = 0
            buttonList.forEach(item => {
              if(item.type === 1 && item.isEditable === 1) {
                item.buttonItemVoList.forEach((item_) => {
                  this.listItems[moduleIdList].forEach((e) => {
                    if(item_.columnName === e.field) {
                      e.modify = true
                      e.tableId = this.tablelist[moduleIdList].tableId
                      e.id = item.id
                      if(item.url) {
                        e.modifyUrl = item.url
                      }
                    }
                  })
                })
              }else if(item.type === 1 || item.type === 2 || item.type === 5) {
                operate++
              }else if(item.type === 4) {
                this.$set(this.tablelist[moduleIdList],'showSelection', true)
              }
              if(item.type === 1 || item.type === 2 || item.type === 5) {
                if(item.showCondition) {
                  let condition = item.showCondition.split(';')
                  condition = condition.filter(item => {
                    return item != ''
                  })
                  item.condition = condition
                }
              }
              this.configInt(item.buttonItemVoList)
            })
            if(operate) {
              let w = 100 * operate
              let obj = {
                field: "common_operate",
                fieldName: "操作",
                width: w
              }
              let len2 = this.listItems[moduleIdList].length
              if(len2 === len) {
                this.listItems[moduleIdList].push(obj)
              }
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log(e.message)
        })
      },
      // 表格操作-新增
      addTableItem(moduleIdList, index) {
        this.showTableItem = true
        let button = this.buttonList[moduleIdList][index]
        let tableId = this.tablelist[moduleIdList].tableId
        this.tableOperate.type = button.type
        this.tableOperate.buttonId = button.id
        this.tableOperate.tableId = tableId
        this.tableOperate.moduleIdList = moduleIdList
        this.tableOperate.name = button.name || '新增'
        this.tableOperate.url = button.url
        this.$set(this.tableOperate, 'buttonItemVoList', button.buttonItemVoList)
        this.tableOperateItem = {}
      },
      addGoods(moduleIdList, index) {
        this.showAddGoodsItem = true
        setTimeout(() => {
          this.$refs.AddGoods.setDefault(this.searchItems.storeNo, this.searchItems.vendorNo)
        }, 100)
      },
      closeAddGoods(data) {
        this.showAddGoodsItem = data.isShow
        if(data.goods) {
          let params = {
            'dcNo': this.searchItems.vendorNo,
            'storeNo': this.searchItems.storeNo,
            'paperNo': this.searchItems.paperNo,
            'details': data.goods
          }
          this.$http.post(commonReport.addSmartGoods, params).then(res => {
            this.loading = false
            if(res.code === 0) {
              this.searchAll()
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
        }
      },
      // 表格操作-修改
      updateTableItem(moduleIdList, index, row) {
        this.showTableItem = true
        let button = this.buttonList[moduleIdList][index]
        let tableId = this.tablelist[moduleIdList].tableId
        let id = row.id
        this.tableOperate.type = button.type
        this.tableOperate.tableId = tableId
        this.tableOperate.id = id
        this.tableOperate.moduleIdList = moduleIdList
        this.tableOperate.name = button.name || '修改'
        this.tableOperate.url = button.url
        this.$set(this.tableOperate, 'buttonItemVoList', button.buttonItemVoList)
        this.tableOperateItem = {}
        this.tableOperate.buttonItemVoList.forEach(item => {
          if(item.type === 1) {
            item.options.forEach(item_ => {
              if(item_.name === row[item.columnName])
              this.$set(this.tableOperateItem, item.columnName, item_.id)
            })
          }else{
            this.$set(this.tableOperateItem, item.columnName, row[item.columnName])
          }
        })
      },
      // 表格操作-确认
      sureTableItem(param) {
        if(param) {
          // 判断必填项
          let requiredData = true
          this.tableOperate.buttonItemVoList.forEach(item => {
            if(item.required) {
              if(!this.tableOperateItem[item.columnName]) {
                requiredData = false
                this.$message("必填项'" + item.labelName + "'不能为空")
              }
            }
          })
          if(requiredData === false) {
            return
          }
          if(this.tableOperate.type === 0) {
            let arr = []
            arr.push(this.tableOperateItem)
            this.$http.post(this.tableOperate.url || commonReport.dynamicReportAdd, {pageId: this.pageId, listId: this.tableOperate.tableId, buttonId: this.tableOperate.buttonId, insertItems: arr}).then((res) => {
              if (res.code === 0) {
                this.showTableItem = false
                this.$message.success("新增成功")
                // 清除服务器缓存
                this.$http.get(commonReport.deleteRedisCache).then((res) => {
                  this.tableSearch(this.tableOperate.moduleIdList)
                })
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.$message(e.message)
            })
          }else if(this.tableOperate.type === 1) {
            let arr = []
            let obj = {
              id: this.tableOperate.id,
              ...this.tableOperateItem,
            }
            arr.push(obj)
            this.$http.post(this.tableOperate.url || commonReport.dynamicReportUpdate, {pageId: this.pageId, listId: this.tableOperate.tableId, updateItems: arr}).then((res) => {
              if (res.code === 0) {
                this.showTableItem = false
                this.$message.success("修改成功")
                // 清除服务器缓存
                this.$http.get(commonReport.deleteRedisCache).then((res) => {
                  this.tableSearch(this.tableOperate.moduleIdList)
                })
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.$message(e.message)
            })
          }
        }else{
          this.showTableItem = false
        }
        this.tableOperate.buttonItemVoList.forEach((item, i) => {
          if(item.checkNameVal) {
            this.$set(this.tableOperate.buttonItemVoList[i], 'checkNameVal', '')
          }
        })
      },
      // 表格操作-删除
      deleteTableItem(moduleIdList, index, row) {
        let tableId = this.tablelist[moduleIdList].tableId
        let button = this.buttonList[moduleIdList][index]
        let deleteType = button.deleteType
        let url = button.url
        let id = row.id
        this.$confirm('确定删除此条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url || commonReport.dynamicReportDelete, {pageId: this.pageId, listId: tableId, id: id, deleteType: deleteType}).then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功")
              // 清除服务器缓存
              this.$http.get(commonReport.deleteRedisCache).then((res) => {
                this.tableSearch(moduleIdList)
              })
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.$message(e.message)
          })
        }).catch(() => {
        });
      },
      // 表格操作-5
      operateTableItem(moduleIdList, index, row) {
        let tableId = this.tablelist[moduleIdList].tableId
        let button = this.buttonList[moduleIdList][index]
        let deleteType = button.deleteType
        let url = button.url
        let id = row.id
        this.$confirm(`确定${button.name}此条记录?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url || commonReport.dynamicReportDelete, {pageId: this.pageId, listId: tableId, id: id, deleteType: deleteType}).then((res) => {
            if (res.code === 0) {
              this.$message.success(`${button.name}成功`)
              // 清除服务器缓存
              this.$http.get(commonReport.deleteRedisCache).then((res) => {
                this.tableSearch(moduleIdList)
              })
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.$message(e.message)
          })
        }).catch(() => {
        });
      },
      uploadTableItem(moduleIdList, index) {
        this.showUploadItem = true
        let button = this.buttonList[moduleIdList][index]
        let tableId = this.tablelist[moduleIdList].tableId
        this.tableOperate.type = button.type
        this.tableOperate.buttonId = button.id
        this.tableOperate.tableId = tableId
        this.tableOperate.moduleIdList = moduleIdList
        this.tableOperate.name = button.name || '导入'
        this.tableOperate.url = button.url
        this.$set(this.tableOperate, 'buttonItemVoList', button.buttonItemVoList)
        this.tempConfig = {}
        let buttonItemVoList = this.tableOperate.buttonItemVoList
        if(buttonItemVoList) {
          buttonItemVoList.forEach(item => {
            if(item.columnName && item.labelName) {
              this.tempConfig[item.columnName] = item.labelName
            }
          })
        }
      },
      // 批量操作
      batchOperation(moduleIdList, index) {
        let idList = []
        let tableId = this.tablelist[moduleIdList].tableId
        let button = this.buttonList[moduleIdList][index]
        let url = button.url
        if(this.checkedDialogList && this.checkedDialogList.length > 0) {
          this.checkedDialogList.forEach(item => {
            idList.push(item.id)
          })
          this.$http.post(url, {listId: tableId, idList: idList}).then((res) => {
            if (res.code === 0) {
              this.checkedDialogList = []
              this.$message.success(`${button.name}成功`)
              // 清除服务器缓存
              this.$http.get(commonReport.deleteRedisCache).then((res) => {
                this.tableSearch(moduleIdList)
              })
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.$message(e.message)
          })
        }else{
          this.$message('请先选择操作项')
        }
      },
      // 点击选择文件
      chooseFile() {
        this.file = {
          name: '',
          isShow: false
        }
        this.importErrorMsg = []
        setTimeout(() => {
          this.$set(this.file, 'isShow', true)
        }, 100)
      },
      /**
       * [downloadModel 商品下载模板]
       * @return {[type]} [description]
       */
      downloadModel() {
        let buttonItemVoList = this.tableOperate.buttonItemVoList
        let obj = {}
        if(buttonItemVoList) {
          buttonItemVoList.forEach(item => {
            if(item.columnName && item.labelName) {
              obj[item.columnName] = ''
            }
          })
        }
        let arr = [obj]
        try {
          exportSheet.exportFile(arr, `${this.pageName}导入模板.xlsx`, this.tempConfig)
          this.$notify.success({
            title: '温馨提示',
            message: '模板下载成功'
          })
        } catch (e) {
          this.$notify.error({
            title: '温馨提示',
            message: '下载遇到错误'
          })
        }
      },
      /**
       * [handleFileSelect 选择文件发生变化]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      handleFileSelect(e) {
        // 点击取消不做任何变化
        if(!e.target.files.length) {
          return
        }
        this.file = e.target.files[0] || {name: ''}
        this.$set(this.file, 'isShow', true)
        let idx = this.file.name.lastIndexOf(".")
        let strLength = this.file.name.length
        let postf = this.file.name.substring(idx, strLength) // 后缀名

        if (!this.file.name || postf != '.xlsx') {
          this.$notify.warning({
            title: '提示',
            message: '请选择excel文件'
          })
          return
        }

        let items = []
        let parseConfig = {}
        for (let key in this.tempConfig) {
          parseConfig[this.tempConfig[key]] = key
        }
        items = exportSheet.parseToJSON(this.file, parseConfig)
        items.then((result) => {
          // 过滤空行
          if(result.length <= 0) {
            this.$notify.warning({
              title: '提示',
              message: '表格为空请重新上传'
            })
            return
          }
          result.forEach((item, i) => {
            for(let key in this.tempConfig) {
              if(this.importErrorMsg.length > 2) {
                return
              }
              if(item[key] == undefined || item[key] == '-' || item[key] == '') {
                this.importMsg = 1
                let obj = {
                  index : i + 1,
                  key :  this.tempConfig[key]
                }
                this.importErrorMsg.push(obj)
              }
            }
          })
          if(this.importErrorMsg.length > 0) {
            return
          }

          this.$http.post(this.tableOperate.url ||commonReport.dynamicReportImport, {listId: this.tableOperate.tableId, buttonId: this.tableOperate.buttonId, insertItems: result}).then(res => {
            if (res.code === 0) {
              this.$message.success("导入成功")
              // 清除服务器缓存
              this.$http.get(commonReport.deleteRedisCache).then((res) => {
                this.tableSearch(this.tableOperate.moduleIdList)
              })
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.$notify.error({
              title: '提示',
              message: e.message
            })
          })
        })
      },
      // 表格操作-导出
      exportSheet() {
        this.requiredData = true
        for(let key in this.queryItems) {
          // 先判断必填项
          if(this.requiredFormat(key) === false) {
            return
          }
        }
        for(let key in this.tablelist) {
          let tableId = this.tablelist[key].tableId
          let CancelToken = axios.CancelToken
          function setHeaders () {
            let loginInfo = Storage.get('loginInfo') || {}
            let headers = {}
            headers['Authorization'] = `${loginInfo.token_type} ${loginInfo.access_token}`
            headers['Content-Type'] = 'application/json;charset=UTF-8'
            return headers
          }
          this.exportLoading = true;
          let url = ''
          if(this.searchUrl) {
            url = `${baseUrl}${this.searchUrl}ForExcel`
          }else{
            url = commonReportExcel
          }
          
          let cityId = Storage.get("cityId")
          let cityName = Storage.get("cityName")
          axios({
            method: 'POST',
            url: url,
            responseType:'blob',
            headers: setHeaders(),
            data: {...this.searchItems, pageId: this.pageId, queryId: tableId, searchItems: this.searchItems, cityId: cityId, cityName: cityName}
          }).then(res => {
            this.exportLoading = false
            let blob = new Blob([res.data], {type: 'application/ms-excel'});
            let elink = document.createElement('a');
            elink.download = this.pageName + new Date().getTime() + '.xlsx';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click(); //点击下载
            document.body.removeChild(elink); //下载完成移除元素
            window.URL.revokeObjectURL(elink); //释放掉blob对象
            return
            throw new Error(res.msg)
          }).catch(err => {
            this.exportLoading = false
            this.$notify.error({
              title: '提示',
              message: err.message
            })
          })
        }
      },
      /** 
       * json格式转树状结构 
       * @param   {json}      json数据 
       * @param   {String}    id的字符串 
       * @param   {String}    父id的字符串 
       * @param   {String}    children的字符串 
       * @return  {Array}     数组 
       */
      transTreeData(treeData, idStr, pidStr, childrenStr, tableTree){
        let r = [], hash = {}, id = idStr, pid = pidStr, children = childrenStr, i = 0, j = 0, len = treeData.length;
        for(; i < len; i++){
          hash[treeData[i][id]] = treeData[i]
        }
        let index = 0, obj = {}
        for(; j < len; j++){
          let aVal = treeData[j], hashVP = hash[aVal[pid]]
          if(hashVP && hashVP[children] == undefined){
            let key = aVal[pidStr]
            obj[key] = index
            index++
          }
          if(hashVP){
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
          }else{
            if(aVal[childrenStr]) {
              if(pidStr == 'mergeTitle') {
                aVal[childrenStr].unshift({fieldName: '', width: 1})
              }
              let key = aVal[idStr]
              let i = obj[key]
              r.splice(i, 0, aVal)    
            }else{
              r.push(aVal);
              index++
            }
          }
        }
        return r;
      },
      configTree(tree) {
        tree.forEach(item => {
          item.name = `${item.id}.${item.name}`
          if(item.children && item.children.length) {
            this.configTree(item.children)
          }
        })
      },
      showTreeDialog(data, dialog) {
        this.treeData = {}
        this.filterTreeText = ''
        setTimeout(() => {
          this.treeData = data
          this.treeData.dialog = dialog
          this.isShowTreeDialog = true
          let checkList = []
          if(dialog) {
            checkList = this.tableOperateItem[this.treeData.columnName]
          }else{
            checkList = this.searchItems[this.treeData.columnName]
          }
          if(checkList && this.treeData.subType !== 'selectOne') {
            this.$refs.tree.setCheckedKeys(checkList);
          }
        }, 100)
      },
      filterTreeId(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      getSimpleCheckedNodes(store) {
        const checkedNodes = [];
        const traverse = function(node) {
          const childNodes = node.root ? node.root.childNodes : node.childNodes;
        
          childNodes.forEach(child => {
            if (child.checked) {
              checkedNodes.push(child.data);
            }
            if (child.indeterminate) {
              traverse(child);
            }
          });
        };
        traverse(store)
        return checkedNodes;
      },
      closeTreeDialog(param) {
        if(param) {
          let checkNodes, checkNameArr, checkIdArr, checkNameVal
          if(this.treeData.parentNode) {
            checkNodes = this.getSimpleCheckedNodes(this.$refs.tree.store)
            checkNameVal = checkNodes[0].name
            checkIdArr = checkNodes[0].id
          }else{
            checkNodes = this.$refs.tree.getCheckedNodes(true)
            checkNameArr = []
            checkIdArr = []
            for(let item of checkNodes) {
              if(item.id) {
                checkNameArr.push(item.name)
                checkIdArr.push(item.id)
              }
            }
            checkNameVal = checkNameArr.join(',')
          }
          if(this.treeData.dialog) {
            this.$set(this.treeData, 'checkNameVal', checkNameVal)
            this.$set(this.tableOperateItem, this.treeData.columnName, checkIdArr)
          }else if(param){
            this.$set(this.treeData, 'checkNameVal', checkNameVal)
            this.$set(this.searchItems, this.treeData.columnName, checkIdArr)
          }
          // 处理选择分类返回商品逻辑
          if(this.treeData.type == 5 && this.treeData.subType == "returnGoods") {
            let categoryNoList = this.searchItems[this.treeData.columnName]
            this.$http.post(commonReport.getGoodsListByCategoryNoList, categoryNoList, true).then((res) => {
              let goodsNoList = []
              if(res.data && res.data.length) {
                res.data.forEach(item => {
                  if(item.goodsNo) {
                    goodsNoList = [...goodsNoList, item.goodsNo]
                  }
                })
                this.searchItems.goodList = goodsNoList
              }
            })
          }
        }
        this.isShowTreeDialog = false
      },
      clearTreeList(arr, e, i) {
        // 刷新数据
        this.$set(arr, i, e)
        this.$set(this.searchItems, e.columnName, [])
        // 处理选择分类返回商品逻辑
        if(this.treeData.type == 5 && this.treeData.subType == "returnGoods") {
          this.$set(this.searchItems, 'goodList', [])
        }
      },
      getSuggestions(e) {
        this.suggestionsData = e
      },
      changeSuggestions(e, val, dialog, one, clear) {
        if(clear) {
          this.$set(this.searchItems, e.columnName, '')
          return
        }
        if(val && val.value) {
          this.tempAutocomplete = val.value
        }else{
          if(this.tempAutocomplete == e.checkNameVal) {
            return
          }
        }
        if(e && e.columnName) {
          let arr = [], str = ''
          if(val && val.label) {
            str = val.label
            arr.push(val.label)
          }else if(val.label === undefined) {
            this.$set(e, 'checkNameVal', '')
          }
          if(dialog) {
            if(one) {
              this.$set(this.tableOperateItem, e.columnName, str)
            }else{
              this.$set(this.tableOperateItem, e.columnName, arr)
            }
          }else{
            if(one) {
              this.$set(this.searchItems, e.columnName, str)
            }else{
              this.$set(this.searchItems, e.columnName, arr)
            }
          }
        }
      },
      querySearchAsyncTree(queryString, cb) {
        this.$http.get(this.suggestionsData.urlValue).then((res) => {
          if (res.code === 0) {
            let slecetGoods = []
            if(res.data && res.data && res.data.length) {
              slecetGoods = res.data.map(item => {
                return { value: `${item.id}.${item.name}`, label: item.id}
              })
            }
            var results = queryString ? slecetGoods.filter(this.createFilter(queryString)) : slecetGoods;
            cb(results);
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.$notify.error({
            title: '提示',
            message: e.message
          })
        })
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
        };
      },
      querySearchAsync(queryString, cb) {
        this.$http.get(this.suggestionsData.urlValue, {q: queryString, pageNum: 1, pageSize: 100}, true).then((res) => {
          if (res.code === 0) {
            let slecetGoods = []
            if(res.data && res.data.result && res.data.result.length) {
              slecetGoods = res.data.result.map(item => {
                return { value: `${item.id}.${item.name}`, label: item.id}
              })
            }
            cb(slecetGoods);
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.$notify.error({
            title: '提示',
            message: e.message
          })
        })
      },
      querySearchAsyncPost(queryString, cb) {
        let query
        if(this.suggestionsData.query) {
          query = this.tableOperateItem[this.suggestionsData.query]
        }
        this.$http.post(this.suggestionsData.urlValue, {q: queryString, pageNum: 1, pageSize: 100, query: query}, true).then((res) => {
          if (res.code === 0) {
            let slecetGoods = []
            if(res.data && res.data.result && res.data.result.length) {
              slecetGoods = res.data.result.map(item => {
                return { value: `${item.id}.${item.name}`, label: item.id}
              })
            }
            cb(slecetGoods);
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.$notify.error({
            title: '提示',
            message: e.message
          })
        })
      },
      handleCurrentChange(val) {
        if(this.tableData.dialog) {
          this.$set(this.tableData, 'checkNameVal', `${val.id}.${val.name}`)
          this.$set(this.tableOperateItem, this.tableData.columnName, val.id)
        }else{
          this.$set(this.tableData, 'checkNameVal', `${val.id}.${val.name}`)
          this.$set(this.searchItems, this.tableData.columnName, val.id)
        }
        // 关闭
        this.isShowTableDialogOne = false
      },
      /**
       * [handleSelect 选择某一个]
       * @return {[type]} [description]
       */
      handleSelect(val, row) {
        let hash = {}
        let checkedListTemp = []
        if(utils.isKeyInArray(row.id, this.checkedDialogList)) {
          this.checkedDialogList = utils.removeItemByKeyVal('id', row.id, this.checkedDialogList)
          return
        }else {
          checkedListTemp.push(row)
        }

        let checkedListTempArr = [...checkedListTemp, ...this.checkedDialogList]
        this.checkedDialogList = checkedListTempArr.reduceRight((item, next) => {
          hash[next.id] ? '' : hash[next.id] = true && item.push(next)
          return item
        }, [])
      },
      /**
       * [handleSelectAll 选择多个]
       * @return {[type]} [description]
       */
      handleSelectAllTable(val, moduleId) {
        let hash = {}
        if(val.length > 0) {
          for(let item of val) {
            this.checkedDialogList.push(item)
          }
          this.checkedDialogList = this.checkedDialogList.reduceRight((item, next) => {
            hash[next.id] ? '' : hash[next.id] = true && item.push(next)
            return item
          }, [])
        }else {
          let checkedListTemp = []
          for(let item of this.tablelist[moduleId].tablelist) {
            checkedListTemp.push(item)
          }
          this.checkedDialogList = utils.getSubtract(this.checkedDialogList, checkedListTemp, 'id')
        }
      },
      handleSelectAllDialog(val) {
        let hash = {}
        if(val.length > 0) {
          // 全选
          for(let item of val) {
            this.checkedDialogList.push(item)
          }
          // 去重
          this.checkedDialogList = this.checkedDialogList.reduceRight((item, next) => {
            hash[next.id] ? '' : hash[next.id] = true && item.push(next)
            return item
          }, [])
        }else {
          // 全不选 此时val.length<=0
          // 1.获取当前table中每一条的id
          let checkedListTemp = []
          for(let item of this.tableData.tableData) {
            checkedListTemp.push(item)
          }
          // 2.从要传递的参数中去掉这些重复的
          this.checkedDialogList = utils.getSubtract(this.checkedDialogList, checkedListTemp, 'id')
        }
      },
      showTableDialog(data, dialog, one) {
        this.tableData = {}
        this.filterTableText = ''
        setTimeout(() => {
          this.tableData = data
          this.tableData.dialog = dialog
          this.getTableData(true, one)
          this.checkedDialogList = []
          if(one) {
            this.isShowTableDialogOne = true
          }else{
            this.isShowTableDialog = true
            setTimeout(() => {
              this.$refs.multiple.clearSelection();
            }, 0)
          }
        }, 100)
      },
      // 弹框--table搜索
      getTableData(param, one) {
        if(param) {
          this.tableData.pageNum = 1
        }
        let query
        if(this.tableData.query) {
          query = this.tableOperateItem[this.tableData.query]
        }
        this.$set(this.tableData, 'loading', true)
        if(one === 'one') {
          this.$http.post(this.tableData.urlValue, {q: this.filterTableText, pageNum: this.tableData.pageNum, pageSize: this.tableData.pageSize, query: query}, true).then((res) => {
            if (res.code === 0) {
              this.$set(this.tableData, 'loading', false)
              if(res.data) {
                this.$set(this.tableData, 'tableData', res.data.result)
                this.$set(this.tableData, 'selectOne', one)
              }
              if(this.tableData.pageNum === 1) {
                this.$set(this.tableData, 'total', res.data.total)
              }
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.tableData.loading = false
            this.$notify.error({
              title: '提示',
              message: e.message
            })
          })
        }else{
          this.$http.get(this.tableData.urlValue, {q: this.filterTableText, pageNum: this.tableData.pageNum, pageSize: this.tableData.pageSize}, true).then((res) => {
            if (res.code === 0) {
              this.$set(this.tableData, 'loading', false)
              if(res.data) {
                this.$set(this.tableData, 'tableData', res.data.result)
              }
              if(this.tableData.pageNum === 1) {
                this.$set(this.tableData, 'total', res.data.total)
              }
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.tableData.loading = false
            this.$notify.error({
              title: '提示',
              message: e.message
            })
          })
        }
      },
      // 弹框-changeSizeDialog
      changeSizeDialog(value, one) {
        this.tableData.pageSize = value
        this.getTableData(null, one)
      },
      // 弹框-changeCurrentDialog
      changeCurrentDialog(value, one) {
        this.tableData.pageNum = value
        this.getTableData(null, one)
      },
      closeTableDialog(param) {
        let goodsId = []
        let goodsName = []
        // 选择并关闭
        this.checkedDialogList.forEach((item, i) => {
          goodsId.push(item.id)
          goodsName.push(item.name)
        })
        let checkNameVal = goodsName.join(',')
        if(this.tableData.dialog) {
          this.$set(this.tableData, 'checkNameVal', checkNameVal)
          this.$set(this.tableOperateItem, this.tableData.columnName, goodsId)
        }else if(param){
          this.$set(this.tableData, 'checkNameVal', checkNameVal)
          this.$set(this.searchItems, this.tableData.columnName, goodsId)
        }
        // 关闭
        this.isShowTableDialog = false
      },
      handleCascaderChange($event, e, dialog) {
        let len = $event.length
        let choose = ''
        if(len) {
          choose = $event[len - 1]
        }else{
          len = undefined
          choose = undefined
        }
        if(dialog) {
          this.$set(this.tableOperateItem, e.columnName, choose)
          this.$set(this.tableOperateItem, e.columnName + 'Level', len)
        }else{
          this.$set(this.searchItems, e.columnName, choose)
          this.$set(this.searchItems, e.columnName + 'Level', len)
        }
      },
      cityCheckChange(data, checked, indeterminate) {
        if(checked && this.treeData.subType === 'selectOneCity') {
          let checkNodes = this.$refs.tree.getCheckedNodes(true)
          let cityId = '', sameCity = true
          if(data.children && data.children.length) {
            cityId = data.id
          }else{
            cityId = data.pid
          }
          checkNodes.forEach(item => {
            let checkId = item.pid
            if(checkId !== cityId) {
              sameCity = false
            }
          })
          if(sameCity === false) {
            this.$refs.tree.setCheckedKeys([]);
            setTimeout(() => {
              let keys = []
              keys.push(data.id)
              this.$refs.tree.setCheckedKeys(keys);
            },100)
          }
        }
      },
      handleNodeClick(data) {
        if(this.treeData.subType === 'selectOne') {
          let checkNodes = this.getSimpleCheckedNodes(this.$refs.tree.store)
          if(checkNodes.length > 1) {
            this.$refs.tree.setCheckedKeys([]);
            setTimeout(() => {
              this.$refs.tree.setCheckedNodes([data])
            },100)
          }
        }
      },
      clickableurl(keyVal, val){
        let redirectUrl = keyVal.url
        let url = keyVal.url
        let searchInfo = this.searchItems
        if(url) {
          // 如果带参数 参数处理
          if(url.indexOf(';') > 0) {
            let arr = url.split(';')
            redirectUrl = arr[0]
            for(let key in val) {
              arr.forEach((item, i) => {
                if(i > 0 && key == item) {
                  searchInfo[key] = val[key]
                }
              })
            }
          }
          let urlArr = redirectUrl.split('/')
          if(urlArr.length == 4 && urlArr[1] == 'mixReport') {
            // 跳转到复合报表
            let pageId = urlArr[3]
            let obj = {}
            if(Storage.get('jumpReport') && Storage.get('jumpReport') != 'undefined') {
              obj = Storage.get('jumpReport')
            }
            obj[pageId] = {
              'searchInfo': searchInfo
            }
            Storage.set('jumpReport', obj)
            this.$router.push(redirectUrl)
          }else{
            let pageId = urlArr[2]
            if(keyVal.isPop == 1) {
              this.isShowNewReportDialog = true
              setTimeout(() => {
                this.$refs.DialogReport.setDefault(pageId, searchInfo, null, this.weekDates, true)
              }, 100)
            }else if(keyVal.isPop == 2) {
              this.isShowDownReport = true
              setTimeout(() => {
                this.$refs.DownReport.setDefault(pageId, searchInfo, null, this.weekDates, true)
              }, 100)
            }else{
              let obj = {}
              if(Storage.get('jumpReport') && Storage.get('jumpReport') != 'undefined') {
                obj = Storage.get('jumpReport')
              }
              obj[pageId] = {
                'searchInfo': searchInfo,
                'backReport': this.$route.path
              }
              Storage.set('jumpReport', obj)
              if(this.system == 1) {
                this.$http.post(commonReport.getPageByPageId, {pageId: pageId}).then((res) => {
                  if (res.code === 0) {
                    if(res.data) {
                      this.$store.dispatch('tabs/addTab', {
                        id: redirectUrl.slice(1), name: res.data.pageName, multiple: false
                      })
                    }
                    return
                  }
                  throw new Error(res.msg)
                }).catch(e => {
                  console.log(e.message)
                })
              }else{
                this.$router.push(redirectUrl)
              }
            }
          }
        }
      },
      inlineModifyFocus(row, item) {
        row['previousValue_'] = row[item.field]
      },
      confirmInlineModify(row, item, moduleId, index) {
        let arr = []
        let obj = {}
        if(row[item.field] == row['previousValue_']) {
          return
        }
        obj[item.field] = row[item.field]
        obj.id = row.id
        arr.push(obj)
        this.$http.post(item.modifyUrl || commonReport.dynamicReportUpdate, {listId: this.tablelist[moduleId].tableId, updateItems: arr}).then((res) => {
          if (res.code === 0) {
            if(res.data) {
              for(let key in res.data) {
                row[key] = res.data[key] 
              }
              this.$set(this.tablelist[moduleId].tablelist, index, row)
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.$message(e.message)
        })
      },
      reset(moduleIdQuery) {
        let queryItems = this.queryItems[moduleIdQuery]
        queryItems.forEach((item, i) => {
          if(item.editAble !== 0) {
            delete this.searchItems[item.columnName]
          }
        })
        this.configInt(queryItems, true)
        queryItems.forEach((item, i) => {
          if(item.editAble !== 0) {
            if(item.checkNameVal) {
              item.checkNameVal = ''
            }
            if(item.checkCascader) {
              item.checkCascader = []
            }
          }
          this.$set(queryItems, i, item)
        })
        for(let key in this.weekDates) {
          this.weekDates[key] = []
        }      
      },
      back() {
        let urlArr = this.backReport.split('/')
        let urlLen = urlArr.length
        let pageId = urlArr[urlLen - 1]
        if(this.system == 1) {
          this.$http.post(commonReport.getPageByPageId, {pageId: pageId}).then((res) => {
            if (res.code === 0) {
              if(res.data) {
                this.$store.dispatch('tabs/removeTab')
                this.$store.dispatch('tabs/addTab', {
                  id: this.backReport.slice(1),
                  name: res.data.pageName,
                  multiple: false
                })
              }
              return
            }
            throw new Error(res.msg)
          }).catch(e => {
            this.$notify.error({
              title: '提示',
              message: e.message
            })
          })
        }else{
          this.$router.push(this.backReport)
        }
      }
    }
  }
</script>
