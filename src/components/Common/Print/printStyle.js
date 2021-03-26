export const strStyleCSS = `<style type="text/css">
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td {
    margin: 0;
    padding: 0;
  }

  body, button, input, select, textarea {
    font: 14px "microsoft yahei"
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
  }

  address, cite, dfn, em, var {
    font-style: normal;
  }

  #app .print-area {
    box-sizing: border-box;
    width: 203mm;
    margin: 10px auto;
    font-weight: 800;
    outline: #fff 12mm solid;
  }

  #app .print-area, .print-area .el-table {
    font-family: "Arial", "SimSun", "SimHei", "Microsoft YaHei";
    font-size: 9pt;
  }
  #app .print-area .el-table .cell, .print-area .el-table th > div {
    padding-left: 5px;
    padding-right: 5px;
  }
  #app .print-area .el-table th {
    text-align: center;
  }

  #app .print-area .el-table::before {
    width: 100%;
    height: 0px;
    background-color: transparent;
  }

  #app .print-area .el-table__footer-wrapper td {
    border-bottom: 0;
  }

  #app .print-area .underline {
    display: inline-block;
    width: 200px;
    border-bottom: 1px solid black;
    vertical-align: baseline;
  }

  #app .print-area .el-table th, .print-area .el-table td, .print-area .el-table th.is-leaf,
  #app .print-area .el-table, .print-area .el-table__footer-wrapper td,
  #app .print-area .el-table--fit {
    border-color: black;
  }

  #app .print-area .el-table--fit {
    border-right: 1px solid black;
  }

  #app .print-area .el-table__footer {
    border-bottom: 1px solid black;
  }

  #app .print-area .el-table__footer-wrapper thead div, .print-area .el-table__header-wrapper thead div,
  #app .print-area .el-table__footer-wrapper tbody td, .print-area .el-table__header-wrapper tbody td,
  #app .print-area .el-table th {
    background-color: transparent;
  }

  /*.print-area .el-table .el-table__row .cell {white-space: nowrap;}*/
  #app .print-area .el-table td, .print-area .el-table th {
    height: 25px;
  }


  .el-row {
    box-sizing: border-box
  }

  .el-row:after, .el-row:before {
    display: table;
    content: "";
  }

  .el-row:after {
    clear: both
  }

  .el-row--flex {
    display: -ms-flexbox;
    display: flex
  }

  .el-col-0, .el-row--flex:after, .el-row--flex:before {
    display: none
  }

  .el-row--flex.is-justify-center {
    -ms-flex-pack: center;
    justify-content: center
  }

  .el-row--flex.is-justify-end {
    -ms-flex-pack: end;
    justify-content: flex-end
  }

  .el-row--flex.is-justify-space-between {
    -ms-flex-pack: justify;
    justify-content: space-between
  }

  .el-row--flex.is-justify-space-around {
    -ms-flex-pack: distribute;
    justify-content: space-around
  }

  .el-row--flex.is-align-middle {
    -ms-flex-align: center;
    align-items: center
  }

  .el-row--flex.is-align-bottom {
    -ms-flex-align: end;
    align-items: flex-end
  }

  .el-col {
    float: left;
    box-sizing: border-box;
  }

  .el-col-1 {
    width: 4.16667%
  }

  .el-col-2 {
    width: 8.33333%
  }

  .el-col-3 {
    width: 12.5%
  }

  .el-col-4 {
    width: 16.66667%
  }

  .el-col-5 {
    width: 20.83333%
  }

  .el-col-6 {
    width: 25%
  }

  .el-col-7 {
    width: 29.16667%
  }

  .el-col-8 {
    width: 33.33333%
  }

  .el-col-9 {
    width: 37.5%
  }

  .el-col-10 {
    width: 41.66667%
  }

  .el-col-11 {
    width: 45.83333%
  }

  .el-col-12 {
    width: 50%
  }

  .el-col-13 {
    width: 54.16667%
  }

  .el-col-14 {
    width: 58.33333%
  }

  .el-col-15 {
    width: 62.5%
  }

  .el-col-16 {
    width: 66.66667%
  }

  .el-col-17 {
    width: 70.83333%
  }

  .el-col-18 {
    width: 75%
  }

  .el-col-19 {
    width: 79.16667%
  }

  .el-col-20 {
    width: 83.33333%
  }

  .el-col-21 {
    width: 87.5%
  }

  .el-col-22 {
    width: 91.66667%
  }

  .el-col-23 {
    width: 95.83333%
  }

  .el-col-24 {
    width: 100%
  }

  .print-header .el-row, .print-footer .el-row {
    line-height: 18px;
    padding: 0;
    margin: 0;
  }
  .tc { 
    text-align: center;
  }
</style>`
