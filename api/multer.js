const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },    
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}${file.originalname}`);
    }
});

module.exports = multer({storage: storage}).single('photo')