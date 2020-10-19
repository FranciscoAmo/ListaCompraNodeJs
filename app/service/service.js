'use strict'
// servicio que crea un token segun el usuario

// importo la libreria de jwt
const jwt = require('jwt-simple')
// libreria moment que grestiona fechas en javascript
const moment = require('moment')
// importamos el secrer
const config= require('../config/config')
// modelo user
//const user = require('../models/user')


// funcion creada
function createToken(user){
     //payload datos qeu viajan entra el cliente y el servidor
    const payload ={
        // id del usuario(recomendado no usar el id de mongo)
        name:user.email,
        sub: user._id,
        iat: moment().unix(),                   // momento en el que se creo el token
        exp:moment().add(14,'days').unix(),                   // momento qen que expira el token
    }

    // codificamos el payload con la clave del servidor
    return jwt.encode(payload,config.SECRET_TOKEN)
}


// Metodo decodifica el token
function decodeToken(token){

    //se usa una promesa
    const decoded= new Promise((resolve,reject)=>{
        try{

            const payload = jwt.decode(token,config.SECRET_TOKEN) // decodificamos el payload
            
            //funcion para ver si el token no ha expirado
            if(payload.exp<= moment().unix()){
                reject({
                    status:401,
                    message: 'token ha expirado'
                })
            }
            // si todo va bien
           
            resolve(payload)
            

        }catch(err){
            reject({
                status:500,
                message:'Invalid token'
            })
        }
    })
    // al final devuleve la promesa
    return decoded
}

// exporto el modulo
module.exports = {
    createToken,
    decodeToken
}