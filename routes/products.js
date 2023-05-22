const router = require('express').Router();
const productController = require('../controller/productController');

router.get('/', productController.getProduct);
router.get('/search', productController.searchProduct);
router.put('/:id', productController.editProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/', productController.createProduct);

module.exports = router;
