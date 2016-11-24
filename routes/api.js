const router         = require('express').Router();
const usersRouter    = require('./users.js');
const productsRouter = require('./products.js');

router.use('/users', usersRouter);
router.use('/products', productsRouter);

router.post('/test', (req, res) => {
  console.log(req.body);
  res.json(req.body || 'undef :(');
});

module.exports = router;
