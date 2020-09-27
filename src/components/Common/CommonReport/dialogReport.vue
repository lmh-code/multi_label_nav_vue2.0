<style>
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
    width: 80px;
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
  .common-report .dialog-upload .division {
    clear: both;
    border-top: 1px dashed #ddd;
    border-bottom: 0;
    border-bottom-width: 0px;
    border-bottom-style: initial;
    border-bottom-color: initial;
    margin: 20px 0;
  }

</style>
<template>
  <div class="common-report">
    <div v-for="(item, index) in layout" :key="index">
      <!-- 搜索模块 -->
      <div v-if="item[0].moduleType === 0 && searchHide" class="common-layout">
        <el-form label-position="top" ref="form" size="mini" class="common-query" v-for="(item_, index_) in item" :key="index_">
          <span v-for="(e, i) in queryItems[item_.moduleId]" :key="i">
            <!-- input控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 0 && e.subType !== 'autocomplete' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-input v-model="searchItems[e.columnName]" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-input>
            </el-form-item>
            <!-- 有搜索建议的input控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 0 && e.subType === 'autocomplete' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-autocomplete v-model="e.checkNameVal" :fetch-suggestions="querySearchAsync" @focus="getSuggestions(e)" placeholder="请输入编码或名称" @select="changeSuggestionsOne(e, $event)" @blur="changeSuggestionsOne(e)" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-autocomplete>
            </el-form-item>
            <!-- select控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 1 && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-select v-model="searchItems[e.columnName]" :clearable="e.canClear === 1" :multiple="e.multiple" :disabled="e.editAble === 0" collapse-tags>
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
              <el-select v-model="searchItems['dateType']" placeholder="请选择" @change="dateOptionsChange($event, e.columnName, e.isRange)" :disabled="e.editAble === 0">
                <el-option
                  v-for="item in dateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="e.type == 2 && e.dateType === 'dateLinkage' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-date-picker
                v-if="searchItems['dateType'] == 2"
                v-model="weekDates[e.columnName]"
                :clearable="e.canClear === 1"
                :editable="false"
                type="dates"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                placeholder="请选择">
              </el-date-picker>
              <span v-else-if="searchItems['dateType'] == 1 && e.isRange == 1">
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
                <el-form-item>
                  <el-date-picker
                    v-model="searchItems['end_date']"
                    :clearable="e.canClear === 1"
                    :editable="false"
                    :type="dateLinkage.dateType"
                    :value-format="dateLinkage.dateFormat"
                    :picker-options="pickerOptions"
                    placeholder="请选择">
                  </el-date-picker>
                </el-form-item>
              </span>
              <el-date-picker
                v-else
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
            <!-- 弹窗树形控件-单选 -->
            <el-form-item :label="e.labelName" v-if="e.type == 5 && e.subType === 'selectOne' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-input v-model="e.checkNameVal" :clearable="e.canClear === 1" @focus="showTreeDialog(e)" prefix-icon="el-icon-search" :disabled="e.editAble === 0" placeholder="请选择" @clear="clearTreeList(queryItems[item_.moduleId], e, i)"></el-input>
            </el-form-item>
            <!-- 弹窗树形控件-多选-选分类传商品 -->
            <el-form-item :label="e.labelName" v-if="e.type == 5 && e.subType === 'returnGoods' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-input v-model="e.checkNameVal" :clearable="e.canClear === 1" @focus="showTreeDialog(e)" prefix-icon="el-icon-search" :disabled="e.editAble === 0" placeholder="请选择" @clear="clearTreeList(queryItems[item_.moduleId], e, i)"></el-input>
            </el-form-item>
            <!-- 弹窗树形控件-多选 -->
            <el-form-item :label="e.labelName" v-if="e.type == 5 && e.subType !== 'selectOne' && e.subType !== 'returnGoods' && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-input v-model="e.checkNameVal" :clearable="e.canClear === 1" @focus="showTreeDialog(e)" prefix-icon="el-icon-search" :disabled="e.editAble === 0" placeholder="请选择" @clear="clearTreeList(queryItems[item_.moduleId], e, i)"></el-input>
            </el-form-item>
            <!-- 弹窗suggester控件 -->
            <el-form-item :label="e.labelName" v-if="e.type == 6 && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))" class="common-goods-style">
              <el-autocomplete v-model="e.checkNameVal" :fetch-suggestions="querySearchAsync" @focus="getSuggestions(e)" placeholder="请输入编码或名称" @select="changeSuggestions(e, $event)" @blur="changeSuggestions(e)" :clearable="e.canClear === 1" :disabled="e.editAble === 0"></el-autocomplete>
              <el-button icon="el-icon-search" @click="showTableDialog(e)" v-model="e.checkNameVal" :disabled="e.editAble === 0"></el-button>
            </el-form-item>
            <!-- 级联选择器 -->
            <el-form-item :label="e.labelName" v-if="e.type == 7 && (e.canFold === 0 || (e.canFold === 1 && isNotFold === true))">
              <el-cascader
                placeholder="请选择"
                expand-trigger="hover"
                clearable
                :options="e.cascaderOptions"
                :props="cascaderProps"
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
                </span>
                <hr class="cut-off">
              </div>
              <el-table element-loading-text="拼命加载中" :show-summary="showSummary" :summary-method="getSummaries" :data="tablelist[item_.moduleId].tablelist" style="width: 100%" @sort-change="orderChange($event, item_.moduleId)" border> <!-- :max-height="maxHeight"  -->
                <!-- 多级表头 -->
                <el-table-column min-width="120" :formatter="nullTreating" :min-width="e.width" v-for="(e, i) in listItems[item_.moduleId]" :key="i" :prop="e.field" :label="e.fieldName" :sortable="e.isOrder == 1? 'custom' : false" :render-header="renderHeader" :fixed="isFixed(e.freeze)" v-if="!(e.isShow === false) && Object.keys(tableTree).length !== 0">
                  <template slot-scope="scope">
                    <label v-if="e.field === 'common_operate'" class="common-operate">
                      <span v-for="(e_, i_) in buttonList[item_.moduleId]" :key="i_">
                        <span v-if="e_.type === 1" class="clickable" @click="updateTableItem(item_.moduleId, i_, scope.row)">{{e_.name || '修改'}}</span>
                        <span v-if="e_.type === 2" class="clickable" @click="deleteTableItem(item_.moduleId, i_, scope.row)">{{e_.name || '删除'}}</span>
                      </span>
                    </label>
                    <label v-else-if="e.url && e.url != ''" class="clickable" :class="e.compareWith != ''? scope.row.addColor : ''" @click="clickableurl(e, scope.row)">{{nullTreating(scope.row[e.field])}}</label>
                    <label v-else-if="e.modify" :class="e.compareWith != ''? scope.row.addColor : ''"><!-- {{nullTreating(scope.row[e.field])}} -->
                      <el-input v-model="scope.row[e.field]" placeholder="请输入" size="mini" @focus="inlineModify($event, item_.moduleId, i, scope.row[e.field])"></el-input>
                      <el-button-group v-if="e.showButton">
                        <el-button icon="el-icon-check" size="mini" @click="confirmInlineModify($event, item_.moduleId, i, scope.row[e.field])"></el-button>
                        <el-button icon="el-icon-close" size="mini" @click="cancelInlineModify($event, item_.moduleId, i, scope.$index)"></el-button>
                      </el-button-group>
                    </label>
                    <label v-else :class="e.compareWith != ''? scope.row.addColor : ''">{{nullTreating(scope.row[e.field])}}</label>
                  </template>
                  <span v-if="e.children">
                    <el-table-column :formatter="nullTreating" :min-width="e_.width" v-for="(e_, i_) in e.children" :key="i_" :prop="e_.field" :label="e_.fieldName" :sortable="e_.isOrder == 1? 'custom' : false" :render-header="renderHeader" :fixed="isFixed(e_.freeze)">
                      <template slot-scope="scope">
                        <label v-if="e_.url && e_.url != '' && e_.fieldName != ''" class="clickable" :class="e_.compareWith != ''? scope.row.addColor : ''" @click="clickableurl(e_, scope.row)">{{nullTreating(scope.row[e_.field])}}</label>
                        <!-- <label v-else :class="e_.compareWith != ''? scope.row.addColor : ''">{{nullTreating(scope.row[e_.field])}}</label> -->
                        <label v-else-if="e_.fieldName == ''"></label>
                        <label v-else-if="e_.modify" :class="e_.compareWith != ''? scope.row.addColor : ''"><!-- {{nullTreating(scope.row[e_.field])}} -->
                          <el-input v-model="scope.row[e_.field]" placeholder="请输入"></el-input>
                        </label>
                        <label v-else :class="e_.compareWith != ''? scope.row.addColor : ''">{{nullTreating(scope.row[e_.field])}}</label>
                      </template>
                    </el-table-column>
                  </span>
                </el-table-column>
                <el-table-column min-width="120" :formatter="nullTreating" :min-width="e.width" v-for="(e, i) in listItems[item_.moduleId]" :key="i" :prop="e.field" :label="e.fieldName" :sortable="e.isOrder == 1? 'custom' : false" :render-header="renderHeader" :fixed="isFixed(e.freeze)" v-if="!(e.isShow === false) && Object.keys(tableTree).length === 0">
                  <template slot-scope="scope">
                    <label v-if="e.field === 'common_operate'" class="common-operate">
                      <span v-for="(e_, i_) in buttonList[item_.moduleId]" :key="i_">
                        <span v-if="e_.type === 1" class="clickable" @click="updateTableItem(item_.moduleId, i_, scope.row)">{{e_.name || '修改'}}</span>
                        <span v-if="e_.type === 2" class="clickable" @click="deleteTableItem(item_.moduleId, i_, scope.row)">{{e_.name || '删除'}}</span>
                      </span>
                    </label>
                    <label v-else-if="e.url && e.url != ''" class="clickable" :class="e.compareWith != ''? scope.row.addColor : ''" @click="clickableurl(e, scope.row)">{{nullTreating(scope.row[e.field])}}</label>
                    <label v-else-if="e.modify" :class="e.compareWith != ''? `${scope.row.addColor} inline-modify`  : 'inline-modify'"><!-- {{nullTreating(scope.row[e.field])}} -->
                      <el-input v-model="scope.row[e.field]" placeholder="请输入" size="mini" @focus="inlineModify($event, item_.moduleId, i, scope.row[e.field])"></el-input>
                      <el-button-group v-if="e.showButton">
                        <el-button icon="el-icon-check" size="mini" @click="confirmInlineModify($event, item_.moduleId, i, scope.row[e.field])"></el-button>
                        <el-button icon="el-icon-close" size="mini" @click="cancelInlineModify($event, item_.moduleId, i, scope.$index)"></el-button>
                      </el-button-group>
                    </label>
                    <label v-else :class="e.compareWith != ''? scope.row.addColor : ''">{{nullTreating(scope.row[e.field])}}</label>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                v-if="tablelist[item_.moduleId].pageable != 0"
                @size-change="changeSize($event, item_.moduleId)"
                @current-change="changeCurrent($event, item_.moduleId)"
                :page-sizes="[10, 20, 30, 40, 50]"
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

    <!-- 弹框--按钮 -->
    <el-dialog :visible.sync="showTableItem" :title="tableOperate.name" width="60%" class="common-dialog-input" top="10vh">
      <el-form label-position="top" ref="formDialog" size="mini" :model="tableOperate.items" label-width="80px" style="max-height: 300px;overflow-y:scroll;" class="common-query">
        <span v-for="(item, index) in tableOperate.buttonItemVoList" :key="index">
          <!-- 弹框搜索项 -->
          <el-form-item v-if="item.type == 0" :label="item.labelName">
            <el-input v-model="tableOperateItem[item.columnName]" :required="item.required" :maxlength="item.length" :clearable="item.canClear === 1" :disabled="item.editAble === 0"></el-input>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <el-form-item v-if="item.type == 1" :label="item.labelName">
            <el-select v-model="tableOperateItem[item.columnName]" :required="item.required" :clearable="item.canClear === 1" :disabled="item.editAble === 0">
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
          <el-form-item v-if="item.type == 6" :label="item.labelName" class="common-goods-style">
            <el-autocomplete v-model="item.checkNameVal" :fetch-suggestions="querySearchAsync" @focus="getSuggestions(item)" placeholder="请输入编码或名称" @select="changeSuggestions(e, $event, 'dialog')" @blur="changeSuggestions(e, null, 'dialog')" :disabled="item.editAble === 0"></el-autocomplete>
            <el-button icon="el-icon-search" @click="showTableDialog(item, 'dialog')" v-model="item.checkNameVal" :disabled="item.editAble === 0"></el-button>
            <span class="dialog-input-describe" v-if="item.describe">{{item.describe}}</span>
          </el-form-item>
          <el-form-item v-if="item.type == 7" :label="item.labelName">
            <el-cascader
              placeholder="请选择"
              expand-trigger="hover"
              clearable
              :options="item.cascaderOptions"
              :props="cascaderProps"
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
        <el-button @click="sureTableItem" size="small">确 定</el-button>
        <el-button @click="showTableItem = false" size="small">取 消</el-button>
      </div>
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
            @check-change="handleTreeCheckChange">
          </el-tree>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="closeTreeDialog(true)">选择并关闭</el-button>
        <el-button size="mini" @click="closeTreeDialog(false)">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗--table控件 -->
    <el-dialog :title="tableData.labelName" :visible.sync="isShowTableDialog" class="dialog-tree" top="10vh">
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
            @select-all="handleSelectAll">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column min-width="100" prop="id" label="ID" align="center"></el-table-column>
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
    getGoodsListByCategoryNoList: '/foundation/c/p/goodsCategory/getGoodsListByCategoryNoList'
  }
  const commonReportExcel = baseUrl + '/boom/a/dynamicReport/dynamicReportForExcel'
  export default {
    data () {
      return {
        pageId: '', // 表格ID
        pageName: '', // 报表名称
        showExport: true, // 是否显示导出按钮
        exportLoading: false, // 导出表格loading
        showTableItem: false,
        showUploadItem: false, // 导入弹框
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
        showSummary: false,
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
        isShowTableDialog: false,
        tableData: {}, // 表格弹窗
        suggestionsData: {},
        filterTableText: '',
        checkedDialogList: [],
        cascaderOptions: [],
        cascaderProps: {
          value: 'id',
          label: 'name',
          children: 'children',
          checkStrictly: true 
        },
        file: {name: '', isShow: true}, // 导入数据
        tempConfig: {},
        importMsg: 0,
        importErrorMsg: [],
        searchUrl: '', // 查询url
        isShowNewReportDialog: false, // 新页面弹框
        searchHide: true,
        inlineOperate: {}, // 记录行内操作
      }
    },
    components: {
      'dialog-report': DialogReport
    },
    computed: {
    },
    beforeRouteUpdate(to, from, next) {
      this.pageId = to.params.id
      this.clearPage()
      next()
      if(Storage.get('searchInfo')) {
        let searchInfo = Storage.get('searchInfo')
        for(let key in searchInfo) {
          this.$set(this.searchItems, key, searchInfo[key])
        }
      }
      this.getPageByPageId()
      Storage.remove('searchInfo')
    },
    mounted() {
      let len = this.$route.path.split('/').length
      if(len > 3) {
        return
      }
      let routeParams = this.$route.params
      this.pageId = routeParams.id.split("&")[0];
      if(Storage.get('searchInfo')) {
        let searchInfo = Storage.get('searchInfo')
        for(let key in searchInfo) {
          this.$set(this.searchItems, key, searchInfo[key])
        }
      }
      this.getPageByPageId()
      Storage.remove('searchInfo')
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
            }else{
              return
            }
          }
        },
        deep: true
      },
      filterTreeText(val) {
        this.$refs.tree.filter(val);
      },
    },
    methods: {
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
          let moduleIdQuerys = Object.keys(queryItems)
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
              // document.title = this.pageName
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
                    let listItems = res.data.listItems
                    let obj = {
                      loading: false,
                      tableId: res.data.id,
                      tablelist: [],
                      pageSize: 10,
                      pageNum: 1,
                      total:0,
                      pageable: res.data.pageable
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
                      if(this.requiredFormat() === false) {
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
                      if(this.requiredFormat() === false) {
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
      // 格式化查询项
      configInt(queryItems, searchItem) {
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
            // select
            if(item.urlValue && item.urlValue != '') {
              this.$http.post(item.urlValue).then((res) => {
                if (res.code === 0) {
                  if(res.data) {
                    this.$set(item, 'options', res.data)
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
            }else if(item.textValue && item.textValue != '') {
              item.options = JSON.parse(item.textValue)
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
                  let checkList = labelValue[key]
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
                    this.$set(this.weekDates, item.columnName, [])
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
            // 日期时间控件
          }else if(item.type === 5) {
            // 弹窗树结构控件
            if(item.widgetStyle && item.widgetStyle != '') {
              let widgetStyle = JSON.parse(item.widgetStyle)
              // 可单选的树控件
              for(let key in widgetStyle) {
                if(key === 'subType' && widgetStyle[key] == 1) {
                  item.subType = 'selectOne'
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
          }else if(item.type === 7) {
            // 级联选择器
            if(item.urlValue && item.urlValue != '') {
              this.$http.get(item.urlValue).then((res) => {
                if (res.code === 0) {
                  if(res.data) {
                    item.cascaderOptions = this.transTreeData(res.data, 'id', 'pid', 'children')
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
          }
        })
      },
      // 日期控件change
      dateOptionsChange(e, param, isRange) {
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
          this.$set(this.weekDates, param, utils.getAllWeek(utils.timestampToTimeNoHMS(new Date())))
        }else if(this.searchItems['dateType'] == 3) {
          this.dateLinkage.dateType = 'month'
          this.dateLinkage.dateFormat = 'yyyy-MM-dd'
          this.$set(this.searchItems, param, utils.timestampToTimeNoHMS(new Date()).slice(0, 7) + '-01');
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
        this.tableSearch(moduleIdList, false)
      },
      // 表格方法-changeCurrent
      changeCurrent(value, moduleIdList) {
        this.tablelist[moduleIdList].pageNum = value
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
          let obj = this.listItems[key]
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
                content: tooltip,
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
      requiredFormat(moduleIdQuery) {
        // 处理日期格式---周
        if(this.searchItems.dateType) {
          if(this.searchItems.dateType === 2) {
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
        }else if(this.weekDates) {
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
          let moduleIdQuerys = Object.keys(this.queryItems)
          if(moduleIdQuerys.length < 1) {
            this.requiredData = false
            return this.requiredData
          }
          moduleIdQuerys.forEach(item => {
            this.queryItems[item].forEach(item_ => {
              if(item_.nonEmpty === 1 && this.requiredData) {
                if(this.searchItems[item_.columnName] == '' || this.searchItems[item_.columnName] == null) {
                  this.$message("必填项'" + item_.labelName + "'不能为空")
                  this.requiredData = false
                  return
                }
              }
            })
          })
        }else{
          this.queryItems[moduleIdQuery].forEach(item => {
            if(item.nonEmpty === 1 && this.requiredData) {
              if(this.searchItems[item.columnName] == '' || this.searchItems[item.columnName] == null) {
                this.$message("必填项'" + item.labelName + "'不能为空")
                this.requiredData = false
                return
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
            this.tablelist[moduleIdList].tablelist = res.data.result
            this.tablelist[moduleIdList].total = res.data.total
            let listItems = this.listItems[moduleIdList]
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
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          this.tablelist[moduleIdList].loading = false
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
        // 0-新增 1-编辑 2-删除
        let tableId = this.tablelist[moduleIdList].tableId
        this.$http.post(commonReport.getButtonList, {listId: tableId}).then((res) => {
          if (res.code === 0) {
            // operate
            let buttonList = res.data
            this.$set(this.buttonList, moduleIdList, buttonList)
            let operate = false
            buttonList.forEach(item => {
              if(item.type === 1 && item.isEditable === 1) {
                item.buttonItemVoList.forEach((item_) => {
                  this.listItems[moduleIdList].forEach((e) => {
                    if(item_.columnName === e.field) {
                      e.modify = true
                      e.showButton = false
                      e.tableId = this.tablelist[moduleIdList].tableId
                      e.id = item.id
                      if(item.url) {
                        e.modifyUrl = item.url
                      }
                    }
                  })
                })
              }else if(item.type === 1 || item.type === 2) {
                operate = true
                this.configInt(item.buttonItemVoList)
              }
            })
            if(operate) {
              let obj = {
                field: "common_operate",
                fieldName: "操作"
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
        this.tableOperate.buttonItemVoList = button.buttonItemVoList
        this.tableOperateItem = {}
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
        this.tableOperate.buttonItemVoList = button.buttonItemVoList
        this.tableOperateItem = {}
        this.tableOperate.buttonItemVoList.forEach(item => {
          this.$set(this.tableOperateItem, item.columnName, row[item.columnName])
        })
      },
      // 表格操作-确认
      sureTableItem() {
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
          this.$http.post(this.tableOperate.url || commonReport.dynamicReportAdd, {listId: this.tableOperate.tableId, buttonId: this.tableOperate.buttonId, insertItems: arr}).then((res) => {
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
            console.log(e.message)
          })
        }else if(this.tableOperate.type === 1) {
          let arr = []
          let obj = {
            id: this.tableOperate.id,
            ...this.tableOperateItem,
          }
          arr.push(obj)
          this.$http.post(this.tableOperate.url || commonReport.dynamicReportUpdate, {listId: this.tableOperate.tableId, updateItems: arr}).then((res) => {
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
            console.log(e.message)
          })
        }
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
          this.$http.post(url || commonReport.dynamicReportDelete, {listId: tableId, id: id, deleteType: deleteType}).then((res) => {
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
            console.log(e.message)
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
        this.tableOperate.buttonItemVoList = button.buttonItemVoList
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

          this.$http.post(commonReport.dynamicReportImport, {listId: this.tableOperate.tableId, buttonId: this.tableOperate.buttonId, insertItems: result}).then(res => {
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
          axios({
            method: 'POST',
            url: url,
            responseType:'blob',
            headers: setHeaders(),
            data: {pageId: this.pageId, queryId: tableId,searchItems: this.searchItems}
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
          if(checkList) {
            this.$refs.tree.setCheckedKeys(checkList);
          }
        }, 100)
      },
      filterTreeId(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      closeTreeDialog(param) {
        let checkNodes = this.$refs.tree.getCheckedNodes(true)
        let checkNameArr = []
        let checkIdArr = []
        for(let item of checkNodes) {
          if(item.id) {
            checkNameArr.push(item.name)
            checkIdArr.push(item.id)
          }
        }
        // 先处理选择分类返回商品逻辑
        if(this.treeData.type == 5 && this.treeData.subType == "returnGoods") {
          let categoryNoList = this.searchItems[this.treeData.columnName]
          this.$http.post(commonReport.getGoodsListByCategoryNoList, categoryNoList, true).then((res) => {
            let goodsNoList = []
            res.data.forEach(item => {
              if(item.goodsNo) {
                goodsNoList = [...goodsNoList, item.goodsNo]
              }
            })
            this.searchItems.goodList = goodsNoList
          })
        }
        let checkNameVal = checkNameArr.join(',')
        if(this.treeData.dialog) {
          this.$set(this.treeData, 'checkNameVal', checkNameVal)
          this.$set(this.tableOperateItem, this.treeData.columnName, checkIdArr)
        }else if(param){
          this.$set(this.treeData, 'checkNameVal', checkNameVal)
          this.$set(this.searchItems, this.treeData.columnName, checkIdArr)
        }
        this.isShowTreeDialog = false
      },
      clearTreeList(arr, e, i) {
        // 刷新数据
        this.$set(arr, i, e)
        this.$set(this.searchItems, e.columnName, [])
      },
      getSuggestions(e) {
        this.suggestionsData = e
      },
      changeSuggestions(e, val, dialog) {
        if(e && e.columnName) {
          let arr = []
          if(val && val.label) {
            arr.push(val.label)
          }else if(val === undefined) {
            this.$set(e, 'checkNameVal', '')
          }
          if(dialog) {
            this.$set(this.tableOperateItem, e.columnName, arr)
          }else{
            this.$set(this.searchItems, e.columnName, arr)
          }
        }
      },
      changeSuggestionsOne(e, val, dialog) {
        if(e && e.columnName) {
          let str = ''
          if(val && val.label) {
            str = val.label
          }else if(val === undefined) {
            this.$set(e, 'checkNameVal', '')
          }
          this.$set(this.searchItems, e.columnName, str)
        }
      },
      querySearchAsync(queryString, cb) {
        this.$http.get(this.suggestionsData.urlValue, {q: queryString || '', pageNum: 1, pageSize: 100}).then((res) => {
          if (res.code === 0) {
            let slecetGoods = []
            if(res.data) {
              slecetGoods = res.data.result.map(item => {
                return { value: `${item.id} ${item.name}`, label: item.id}
              })
            }
            cb(slecetGoods);
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
      handleSelectAll(val) {
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
          // 1.获取当前table中每一条的goodsNo
          let checkedListTemp = []
          for(let item of this.tableData.tableData) {
            checkedListTemp.push(item)
          }
          // 2.从要传递的参数中去掉这些重复的
          this.checkedDialogList = utils.getSubtract(this.checkedDialogList, checkedListTemp, 'id')
        }
      },
      showTableDialog(data, dialog) {
        this.tableData = {}
        this.filterTableText = ''
        setTimeout(() => {
          this.tableData = data
          this.tableData.dialog = dialog
          this.isShowTableDialog = true
          this.getTableData(true)
          this.checkedDialogList = []
          setTimeout(() => {
            this.$refs.multiple.clearSelection();
          }, 0)
        }, 100)
      },
      // 弹框--table搜索
      getTableData(param) {
        if(param) {
          this.tableData.pageNum = 1
        }
        this.$set(this.tableData, 'loading', true)
        this.$http.get(this.tableData.urlValue, {q: this.filterTableText, pageNum: this.tableData.pageNum, pageSize: this.tableData.pageSize}).then((res) => {
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
      },
      // 弹框-changeSizeDialog
      changeSizeDialog(value) {
        this.tableData.pageSize = value
        this.getTableData()
      },
      // 弹框-changeCurrentDialog
      changeCurrentDialog(value) {
        this.tableData.pageNum = value
        this.getTableData()
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
      handleTreeCheckChange(data, checked, indeterminate) {
        if(checked && this.treeData.subType === 'selectOne') {
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
      clickableurl(keyVal, val){
        if(keyVal.url) {
          if(keyVal.url.indexOf(';') > 0) {
            let arr = keyVal.url.split(';')
            let searchInfo = {}
            for(let key in val) {
              arr.forEach((item, i) => {
                if(i > 0 && key == item) {
                  searchInfo[key] = val[key]
                }
              })
            }
            if(keyVal.isPop == 1) {
              let urlArr = arr[0].split('/')
              let urlLen = urlArr.length
              let pageId = urlArr[urlLen - 1]
              this.isShowNewReportDialog = true
              setTimeout(() => {
                this.$refs.DialogReport.setDefault(pageId, searchInfo, null, this.weekDates, true)
              }, 100)
            }else{
              Storage.set('searchInfo', searchInfo)
              this.$router.push(arr[0])
            }
          }else{
            if(keyVal.isPop == 1) {
              let urlArr = keyVal.url.split('/')
              let urlLen = urlArr.length
              let pageId = urlArr[urlLen - 1]
              this.isShowNewReportDialog = true
              setTimeout(() => {
                this.$refs.DialogReport.setDefault(pageId, searchInfo, null, this.weekDates, true)
              }, 100)
            }else{
              Storage.set('searchInfo', this.searchItems)
              this.$router.push(val.url)
            }
          }
        }
      },
      inlineModify(event, moduleId, i, data) {
        let e = this.listItems[moduleId][i]
        e.showButton = true
        e.oldData = data
        this.$set(this.listItems[moduleId], i, e)
      },
      confirmInlineModify(event, moduleId, i, data) {
        let e = this.listItems[moduleId][i]
        e.showButton = false
        this.$set(this.listItems[moduleId], i, '')
        setTimeout(() => {
          this.$set(this.listItems[moduleId], i, e)
        }, 1)
        let arr = []
        let obj = {}
        obj.id = e.id
        obj[e.field] = data
        arr.push(obj)
        this.$http.post(e.modifyUrl || commonReport.dynamicReportUpdate, {listId: e.tableId, updateItems: arr}).then((res) => {
          if (res.code === 0) {
            // 清除服务器缓存
            this.$http.get(commonReport.deleteRedisCache).then((res) => {
              this.tableSearch(this.tableOperate.moduleIdList)
            })
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log(e.message)
        })
      },
      cancelInlineModify(event, moduleId, i, index) {
        let e = this.listItems[moduleId][i]
        e.showButton = false
        this.$set(this.listItems[moduleId], i, '')
        this.$set(this.tablelist[moduleId].tablelist[index], e.field, e.oldData)
        setTimeout(() => {
          this.$set(this.listItems[moduleId], i, e)
        }, 1)
      },
      reset(moduleIdQuery) {
        this.searchItems = {}
        let queryItems = this.queryItems[moduleIdQuery]
        this.configInt(queryItems, true)
        queryItems.forEach(item => {
          if(item.checkNameVal) {
            item.checkNameVal = ''
          }
          if(item.checkCascader) {
            item.checkCascader = []
          }
        })
        for(let key in this.weekDates) {
          this.weekDates[key] = []
        }      
      }
    }
  }
</script>
