const {Router} = require('express');
const router = Router()

const categoryRouter = require('./router/category');
const flatRouter = require('./router/flat');
const objectRouter = require('./router/object');
const shartnomaRouter = require('./router/shartnoma');
const statusRouter = require('./router/status');
const domRouter = require('./router/dom');


router.use('/tip', categoryRouter);
router.use('/dom', domRouter);
router.use('/flat', flatRouter);
router.use('/object', objectRouter);
router.use('/shartnoma', shartnomaRouter);
router.use('/status', statusRouter);



module.exports = router


