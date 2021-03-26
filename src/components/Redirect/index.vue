<script>
  function replaceAll(str, substr, replacement) {
    if (str == null) return str
    return str.replace(new RegExp(substr, 'gm'), replacement)
  }
  export default {
    mounted() {
      const {fullPath} = this.$route
      this.$router.replace(`${replaceAll(fullPath, '/redirect', '')}`)
    },
    render: h => h()
  }
</script>
