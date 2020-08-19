'use strict'
// middleware que se encarga de ver en las cabeceras si esta authenticado

// importamos los servicios que tiene funciones de token
const services = require('../service/service')




// funcion de de autorizacion
function isAuth (req,res, next){
    if(!req.headers.authorization){
        return res.status(403).send({ message: 'No tienes autorizacion'})
    }

// guardo el token 
const token = req.headers.authorization.split(' ')[1]        // la primera parte del array es Beared la segunda el token

// llamo a decodificar token del servicio
services.decodeToken(token).then(response=>{
    // si va bien  envia la respuesta del servicio( resolve(payload.sub))
    req.user= response
    next()

})
    .catch(response => {
        res.status(res.status(403).send({ message: 'No tienes autorizacion'}))
    })
}



module.exports={
    isAuth
}


