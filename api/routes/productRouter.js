const express = require('express')
const router = express.Router()
const {addProduct, getAllProduct,getByCategory, getById, updateProduct, deleteOne,updateIsExistField} = require('../controllers/productController')
const multer = require('multer');
const md5 = require('md5');
const path = require('path');
const {protect, authorize} = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/uploads');
    },
    filename: function (req,file,cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});
const upload = multer({storage: storage});



router.post('/add', upload.single('image'),protect, authorize('admin'), addProduct);
router.get('/all',protect, getAllProduct)
router.get('/byCategory',protect, getByCategory)
router.get('/:id',protect, getById)
router.put('/:id',protect, authorize('admin'), updateProduct)
router.put('/isExist/:id',/* protect, authorize('admin'),*/ updateIsExistField)
router.delete('/:id', protect, authorize('admin'), deleteOne)

module.exports = router;