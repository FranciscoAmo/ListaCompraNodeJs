// variables
const bodyParser = require('body-parser'); // libreria que permite recibir peticiones en modo json
const express = require('express');
const cors= require('cors');


const App = express();  // variable express

// importo el fichero de las rutas
const Product = require('./routes/product')
const Login = require('./routes/login')
const List = require('./routes/list')

// Configurar cabeceras y cors
App.use( cors({ origin: true, credentials: true  }) );


App.use(bodyParser.urlencoded({extended:true}));   // no vamos a recibir peticione directas de formularios si se quiere usar formulario directo se indica true 
App.use(bodyParser.json());         // permite enviar peticiones y manerar en formato json


// Localización de los ficheros estÃ¡ticos

App.use(express.static(__dirname + '/public'));
// direccion raiz debe ser lo ultimo en declarar del router
App.use('/product',Product); // ruta de los producto
App.use('/login',Login);      // ruta del registro  
App.use('/lista',List);         // ruta de Listas

 // Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend   
App.get('/apppp',function(req,res){
    res.sendfile('./public/src/index.html')
})    

module.exports = App;
