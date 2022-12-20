const express = require("express")
const router = express.Router()
const {createOne, deleteOne, updateOne, getItems} = require('../controllers/cardController')
const {protect, authorize} = require('../middleware/auth')

router.post('/add', protect, authorize('admin'), createOne)
router.put('/:id', protect, authorize('admin'), updateOne)
router.get('/all',protect,  getItems)
router.delete('/:id', protect, deleteOne)

module.exports = router