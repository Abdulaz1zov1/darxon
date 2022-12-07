const {Router} = require('express');
const router = Router()
const { forbank, forstotal } = require('../status/flat');




router.put("/bank/:id", forbank)
router.put("/firs-price/:id", forstotal)




module.exports = router