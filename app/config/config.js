module.exports ={
    PORT : process.env.PORT || 3000 , // que use las variables de entorno o el puerto 3000
    DB: process.env.DB || 'mongodb://localhost:27017/productos'
}

// solo guarda variables de configuracion