<script>
import JsBarcode from 'jsbarcode';
export default {
  props: {
    barCodeMsg: { // 要生成的条码内容
      type: String,
      default: ''
    },
    displayValue: { // 是否显示原始值
      type: Boolean,
      default: false
    },
    width: { // 线条宽度
      type: Number,
      default: 1
    },
    height: { // 线条高度
      type: Number,
      default: 50
    },
    background: { // 背景色
      type: String,
      default: '#FFFFFF'
    },
    lineColor: { // 线条颜色
      type: String,
      default: '#000000'
    }
  },
  data() {
    return {
      codeMsg: ''
    }
  },
  watch: {
    barCodeMsg(newVal) {
      this.codeMsg = newVal
      this.createCode()
    }
  },
  mounted() {
    this.codeMsg = this.barCodeMsg
    this.createCode()
  },
  render() {
    return <span>
      <svg ref="barCode" style={{height: 0}}></svg>
    </span>
  },
  methods: {
    createCode() {
      let barCodeMsg = this.codeMsg || 'no'
      JsBarcode(this.$refs.barCode, barCodeMsg, 
        {
          displayValue: this.displayValue, // 不显示原始值
          background: this.background, // 背景色
          lineColor: this.lineColor, // 线条颜色'rgba(0,0,0,1)'
          width: this.width, // 线条宽度
          height: this.height
        }
      )
    }
  }
}
</script>
