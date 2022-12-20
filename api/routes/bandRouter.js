const express = require("express")
const router = express.Router()
const {createOne, deleteOne,getAll, Band_of_users, getItems} = require('../controllers/bandController')
const {protect, authorize} = require('../middleware/auth')

router.post('/add', protect, createOne)
router.get('/allByUser/:id', protect, Band_of_users)
router.get('/all',protect,  getAll)
router.get('/:id',protect,  getItems)
router.delete('/:id', protect, deleteOne)

module.exports = router