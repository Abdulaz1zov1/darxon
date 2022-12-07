const {Router} = require('express');
const router = Router()
const { create, getAllCategory, del, updet } = require('../controllers/object');
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

router.post('/',upload.array('photo', 20), create);

router.put("/:id",upload.array('photo', 20), updet)

router.delete('/:id', del)




module.exports = router