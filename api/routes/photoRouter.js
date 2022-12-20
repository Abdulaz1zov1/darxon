const express = require("express")
const router = express.Router()
const multer = require('multer');
const md5 = require('md5');
const path = require('path');
const {addPhoto, photo_of_users} = require('../controllers/photoController')
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

router.post('/add',protect, upload.single('image'),  addPhoto);
router.get('/:userID',protect,  photo_of_users);

module.exports = router