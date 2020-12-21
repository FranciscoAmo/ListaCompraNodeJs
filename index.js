// archivo de punto de entrada de la aplicacion
const mongoose= require('mongoose');

// instancia de la base de datos, cofiguracion y fichero app

const CONFIG = require('./app/config/config');
const App = require('./app/app');


// conexion a la base de datos
const option={
    useUnifiedTopology: true,
    useNewUrlParser: true,
   
  
}


App.listen(CONFIG.PORT,function(err){
    if(err){
       return console.log(err);
    }
   
    console.log(`Servidor iniciado y a la escucha en el puerto: ${CONFIG.PORT}`);
});
          



mongoose.connect(CONFIG.DB,option,function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
  });
// hacemos que escuche por un purto la aplicacion


