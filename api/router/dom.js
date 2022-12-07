const {Router} = require('express');
const router = Router()
const { create, getAllCategory, del, updet } = require('../controllers/dom');


router.get('/', getAllCategory);

router.post('/', create);

router.put("/:id", updet)

router.delete('/:id', del)




module.exports = router