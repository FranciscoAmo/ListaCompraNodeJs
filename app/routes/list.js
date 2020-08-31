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
       .put('/:key/:value/add',isAuth,ListController.findList,ListController.findProduct,ListController.addProduct)       // autorizacion token, encuentra la lista, encuentra el producto por id y añade el producto auna lista ya creada
       .put('/:email',isAuth,ListController.findList,ListController.findUser,ListController.addUser)                        // añado un usuario a la lista
       .put('/',isAuth,ListController.findList,ListController.remove)                                            // elimina una lista del usuario 
       .put('/:key/:value/remove',isAuth,ListController.findList,ListController.findProduct,ListController.removeProduct)                                                                             // elimino una lista
        //.get('/private',auth.isAuth,(req,res)=>{ res.status(200).send({ message: 'tienes permisos'}) })
                                             // localhost:3000/product/


module.exports = Router;