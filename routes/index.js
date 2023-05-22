const router = require('express').Router();

const User = require('./users');
const Product = require('./products');

router.use('/api/v1/users/', User);
router.use('/api/v1/products/', Product);

module.exports = router