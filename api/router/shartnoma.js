const {Router} = require('express');
const router = Router()
const { create, getAllCategory, del, updet, getQuery } = require('../controllers/shartnoma');


router.get('/', getAllCategory);

router.post('/', create);

router.get('/query', getQuery);

router.put("/:id", updet)

router.delete('/:id', del)




module.exports = router