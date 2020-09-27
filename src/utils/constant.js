const passwordReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d`~!@#$%^&*()_+-=,.?]{8,20}$/
const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
const numReg = /^\d+$/
const salePriceReg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
export default {
  passwordReg,
  phoneReg,
  numReg,
  salePriceReg
}
