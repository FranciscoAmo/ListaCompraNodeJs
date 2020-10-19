const ListController = require('../controllers/BuyListControler');
const express = require('express');
// importamos el middleware de autorizacion
const auth = require('../middlewares/auth');
const { isAuth } = require('../middlewares/auth');

// instanciamos el router de express
const Router = express.Router();


// rutas
Router.get('/',isAuth,ListController.findAllList,ListController.showList)                 // muestra todas las lista del usuario autorizado
      .get('/:id',isAuth,ListController.findList,ListController.showList)              // muestro una lista del usuario en concreto
       .post('/',isAuth,ListController.createList)                                          // crea una lista vacia con el usuario como propietario
       .put('/:key/:value/add',isAuth,ListController.findOneList,ListController.findProduct,ListController.addProduct)       // autorizacion token, encuentra la lista, encuentra el producto por id y añade el producto auna lista ya creada
       .put('/:email',isAuth,ListController.findOneList,ListController.findUser,ListController.addUser)                        // añado un usuario a la lista
       .put('/',isAuth,ListController.findOneList,ListController.remove)                                            // elimina una lista del usuario 
       .put('/:key/:value/remove',isAuth,ListController.findOneList,ListController.findProduct,ListController.removeProduct)        // elimino un producto de la lista                                                                     // elimino una lista
       .put('/:key/:value/update',isAuth,ListController.findOneList,ListController.findProduct,ListController.updateProduct)       // cambiar la cantidad de producto de la lista


module.exports = Router;