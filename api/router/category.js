const {Router} = require('express');
const router = Router()
const { create, getAllCategory, del, updet, getQuery, getByIdCategory } = require('../controllers/category');
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    },
})

const upload = multer({ storage })


router.get('/', getAllCategory);

router.get('/:id', getByIdCategory);

router.post('/',upload.array('photo', 20), create);

router.get('/query', getQuery);

router.put("/:id",upload.array('photo', 20), updet)

router.delete('/:id', del)




module.exports = router