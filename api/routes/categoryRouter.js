const express = require("express")
const router = express.Router()
const {addCategory, getCategoryAll, getById, deleteCategory, updateCategory} = require('../controllers/categoryController')

router.post('/add',  addCategory)
router.get('/all',  getCategoryAll)
router.get('/:id',  getById)
router.delete('/:id',  deleteCategory)
router.put('/:id',  updateCategory)

module.exports = router