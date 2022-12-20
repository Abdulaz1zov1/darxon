const express = require("express")
const router = express.Router()
const multer = require('multer');
const md5 = require('md5');
const path = require('path');
const {addOrder, getHistoryOrders, information, searchAdmin,deleteOrders,getActiveOrders,getNoactiveOrders,makeOrderActive, makeOrderNoactive} = require('../controllers/orderController')
const {protect, authorize} = require('../middleware/auth')

router.post('/add',protect,  addOrder)
router.get('/activeOrder', protect, authorize('admin'), getActiveOrders)
router.get('/inactiveOrder',protect, authorize('admin'),  getNoactiveOrders)
router.get('/:id', protect, information)
router.get('/search/admin', protect, searchAdmin)
router.get('/byUserId/:id', protect, getHistoryOrders)
router.put('/updateActive/:id',protect, authorize('admin'), makeOrderActive)
router.put('/updateInActive/:id', protect, authorize('admin'), makeOrderNoactive)
router.delete('/:id', protect, authorize('admin'), deleteOrders)
// router.delete('/byUser/:id',  deleteOrderUserSide)


module.exports = router