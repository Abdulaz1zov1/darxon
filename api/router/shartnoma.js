const {Router} = require('express');
const router = Router()
const { create, getAllCategory, del, updet, getQuery, getByIdCategory } = require('../controllers/shartnoma');


router.get('/', getAllCategory);

router.get('/:id', getByIdCategory);

router.post('/', create);

router.get('/query', getQuery);

router.put("/:id", updet)

router.delete('/:id', del)




module.exports = router