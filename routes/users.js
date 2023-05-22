const router = require('express').Router();

const userController = require('../controller/productController');

router.post('/login', userController.login);

module.exports = router;
