<template>
  <div>
    <el-dialog 
      title="修改密码" 
      :visible.sync="dialogFormVisible" 
      width='460px'
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="!isFirstLogin">
      <el-form 
        :model="changePassMesg" 
        :rules="rules" 
        ref="changePassMesg"
        style="width:410px;">
        <el-form-item label="旧密码" :label-width="formLabelWidth" required prop="oldPasswd">
          <el-input type="password" size="small" v-model="changePassMesg.oldPasswd" autocomplete="off" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" size="small" :label-width="formLabelWidth" required prop="newPasswd">
          <el-input type="password" v-model="changePassMesg.newPasswd" autocomplete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" size="small" :label-width="formLabelWidth" required prop="comfirmNewPasswd">
          <el-input type="password" v-model="changePassMesg.comfirmNewPasswd" autocomplete="off" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="注意:" size="small" :label-width="formLabelWidth">
          <p v-if="isFirstLogin" style="color: red;">用户第一次登录强制修改密码</p>
          <p>密码必须包含数字及大、小写字母，至少八位</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini" v-if="!isFirstLogin">取 消</el-button>
        <el-button type="primary" @click="doChangePassHandel" size="mini" :disabled = "isDisabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import config from '@/utils/config'
  import commonUrl from '@/api/Common'
  import Storage from '@/utils/localStorage'
  let Base64 = require('js-base64').Base64
  const reg = config.passwordReg
  export default {
    data() {
      let validPwd = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error('请输入新密码'))
        }
        if (!(reg.test(value))) {
          return callback(new Error('密码必须包含数字及大、小写字母，长度为8-20个字符'))
        }
        callback()
      }
      let validPwd2 = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error('请再次输入新密码'))
        }
        if (value !== this.changePassMesg.newPasswd) {
          return callback(new Error('两次密码输入不一致'))
        }
        callback()
      }
      return {
        isDisabled: false,
        // 修改密码弹框
        formLabelWidth: '90px',
        dialogFormVisible: false,
        routeList: [],
        changePassMesg: {
          oldPasswd: '',
          newPasswd: '',
          comfirmNewPasswd: ''
        },
        rules: {
          oldPasswd: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          newPasswd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            {validator: validPwd, trigger: 'blur'}
          ],
          comfirmNewPasswd: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            {validator: validPwd2, trigger: 'blur'}
          ]
        },
        isFirstLogin: Storage.get('loginInfo') ? Storage.get('loginInfo').isFirstLogin : false
      }
    },
    methods: {
      setDefault() {
        this.dialogFormVisible = true
      },
      /**
       * [doChangePassHandel 处理修改密码事件]
       * @return {[type]} [description]
       */
      doChangePassHandel() {
        this.$refs.changePassMesg.validate((valid) => {
          if(valid) {
            let _params = {
              oldPasswd: Base64.encode(this.changePassMesg.oldPasswd),
              newPasswd: Base64.encode(this.changePassMesg.newPasswd),
              comfirmNewPasswd: Base64.encode(this.changePassMesg.comfirmNewPasswd)
            }
            this.isDisabled = true
            this.$http.post(commonUrl.modifyPwd, { ..._params }).then(res => {
              setTimeout(() => {
                this.isDisabled = false
              }, 800)
              if (res.code === 0) {
                localStorage.removeItem('loginInfo')
                window.location.replace(`${config.baseRouter}/login?status=pok`)
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.isDisabled = false
              this.$notify.error({
                title: '提示',
                message: e.message
              })
            })
          }else {
            return false
          }
        })

      }
    }
  }
</script>