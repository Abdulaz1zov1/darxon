const express = require("express")
const router = express.Router()
const {createOne, deleteOne, basket_of_users, getItems} = require('../controllers/basketController')
const {protect, authorize} = require('../middleware/auth')

router.post('/add', protect, createOne)
router.get('/allByUser/:id', protect, basket_of_users)
router.get('/:id',protect,  getItems)
router.delete('/:id', protect, deleteOne)

module.exports = router