const express = require("express")
const router = express.Router()
const {register,login, getMe,editAuth,deleteAuth, getUserAll,forgotPassword,resetPassword} = require('../controllers/userController')
const {protect, authorize} = require('../middleware/auth')

router.post('/add',  register)
router.post('/login',  login)
router.post('/me', protect, getMe)
router.get('/all',protect, authorize('admin'), getUserAll)
router.delete('/:id',protect,  deleteAuth)
router.put('/:id', protect, editAuth)
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);
module.exports = router