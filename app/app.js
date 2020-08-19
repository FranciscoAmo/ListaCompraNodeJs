// variables
const bodyParser = require('body-parser'); // libreria que permite recibir peticiones en modo json
const express = require('express');


const App = express();  // variable express

// importo el fichero de las rutas
const Product = require('./routes/product')
const Login = require('./routes/login')




App.use(bodyParser.urlencoded({extended:false}));   // no vamos a recibir peticione directas de formularios si se quiere usar formulario directo se indica true 
App.use(bodyParser.json());         // permite enviar peticiones y manerar en formato json



// direccion raiz debe ser lo ultimo en declarar del router
App.use('/product',Product); // ruta de los producto
App.use('/login',Login);      // ruta del registro  

module.exports = App;
