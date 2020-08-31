// librerias necesarias
const express = require('express'); 
// importamos el controlador

const UserController = require('../controllers/UserController');

// importamos el middleware de autorizacion
const auth = require('../middlewares/auth')

// instanciamos el router de express
const Router = express.Router();


// rutas
Router.get('/',UserController.signUp)                                                          // localhost:3000/product/
        .post('/signup',UserController.signUp)                                                  // registro no devuelve nada 
        .post('/signin',UserController.singIn)                                                  // entrar y token
        .get('/private',auth.isAuth,(req,res)=>{
                res.status(200).send({ message: 'tienes permisos'})
        })
                                             // localhost:3000/product/
       

module.exports = Router;