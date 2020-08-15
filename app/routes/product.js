// especificar las direcciones a las que puede acceder en nuestra api
// importamos express y nuestro controlador
const express = require('express');
const ProductController = require('../controllers/ProductController');


// instanciamos el router de express
const Router = express.Router();

// rutas
Router.get('/',ProductController.index)                                                          // localhost:3000/product/
        .post('/',ProductController.create)                                                      // localhost:3000/product/
        .get('/:key/:value',ProductController.find,ProductController.show)                            // localhost:3000/product/category/hogar
        .put('/:key/:value',ProductController.find,ProductController.update)                     // localhost:3000/product/name/SansungGalaxy
        .delete('/:key/:value',ProductController.find,ProductController.remove);                        // localhost:3000/product/name/Sa,sungGalaxy


// exportamos el modulo

module.exports = Router;