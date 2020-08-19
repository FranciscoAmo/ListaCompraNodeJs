module.exports ={
    PORT : process.env.PORT || 3000 , // que use las variables de entorno o el puerto 3000
    DB: process.env.DB || 'mongodb://localhost:27017/productos',
    SECRET_TOKEN: 'miclavedetokens' // token para la parte del servidor
}

// solo guarda variables de configuracion