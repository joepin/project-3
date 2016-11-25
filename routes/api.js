const router           = require('express').Router();
const usersRouter      = require('./users.js');
const productsRouter   = require('./products.js');
// const applicantsRouter = require('./applicants.js');
// const questionsRouter  = require('./questions.js');

router.use('/users', usersRouter);
router.use('/products', productsRouter);

module.exports = router;
