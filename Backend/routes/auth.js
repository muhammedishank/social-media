const router = require("express").Router();
const {register,login, otpValidation, otpConfirmation, checkEmail } = require('../controller/controller')
router.post('/register',register)
router.post('/login',login)
router.post('/otpValidation',otpValidation)
router.post('/otpConfirmation',otpConfirmation)
router.post('/checkEmail',checkEmail) 




module.exports = router




