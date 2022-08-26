const router = require("express").Router();
const {protect} = require('../middleware/middleware')

const {register,login, otpValidation, otpConfirmation, checkEmail, checkPhoneNum,logout } = require('../controller/controller')
router.post('/register',register)
router.post('/login',login)
router.post('/otpValidation',otpValidation)
router.post('/otpConfirmation',otpConfirmation)
router.post('/checkEmail',checkEmail) 
router.post('/checkPhoneNum',checkPhoneNum) 
router.get('/logout',protect,logout)






module.exports = router




