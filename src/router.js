const express = require("express");
const router = express();

const PersonController = require('./controllers/PersonController');
const ProductsController = require('./controllers/ProductsController');
const CommentController = require('./controllers/CommentController');
const BoxController = require('./controllers/BoxController');
const AuthController = require('./controllers/AuthController');
const CheckAuthentication = require('./middleware/checkToken');

router.post('/signin', AuthController.signin);
router.post('/registration', AuthController.registration)

router.get('/shopping/product/', ProductsController.find)
router.get('/shopping/product/:id/', ProductsController.findById)
router.get('/comment', CommentController.find)

// only for peoples authenticated
router.use(CheckAuthentication)

router.get('/person', PersonController.find)
router.post('/person/add/', PersonController.create)
router.put('/person/:id', PersonController.update)
router.delete('/person/:id', PersonController.delete)

router.get('/product', ProductsController.find)
router.post('/product/add/', ProductsController.create)
router.put('/product/:id', ProductsController.update)
router.delete('/product/:id', ProductsController.delete)

router.post('/comment/add/', CommentController.create)
router.put('/comment/:id', CommentController.update)
router.delete('/comment/:id', CommentController.delete)

router.get('/box', BoxController.find)
router.post('/box/add/', BoxController.create)
router.put('/box/:id', BoxController.update)
router.delete('/box/:id', BoxController.delete)

module.exports = router;