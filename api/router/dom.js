const {Router} = require('express');
const router = Router()
const { create, getAllCategory, del, updet, getByIdCategory } = require('../controllers/dom');


router.get('/', getAllCategory);

router.get('/:id', getByIdCategory);

router.post('/', create);

router.put("/:id", updet)

router.delete('/:id', del)




module.exports = router