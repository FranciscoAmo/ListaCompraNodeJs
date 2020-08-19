'use strict'


const User = require('../models/user')          // modelo del usuario
// importamos el servicio
const service = require('../service/service')



// funcion para el registro de un usuario nuevo
function signUp(req, res){
    // creamos un nuevo usuario
    const user = new User({
        // datos del usuario para logearse  email y nombre y contraseña
        email: req.body.email,              
        displayName: req.body.displayName,
        password: req.body.password
        // la contraseña no hace falta guardarla ya que en el model el metodo .pre save ya la creaba
    })
    // salvamos el usuario
    user.save((err)=>{
        if(err) return res.status(500).send({message: `Error al crear el usuario${err}`}) // si hay un error muestra el mensage

        return res.status(200).send({ token: service.createToken(user)}) // servicio que crea un token metodo creado por mi
    })
}


// autentificacion una vez registrado el login
function singIn(req, res){
    // buscamos en la base de datos el email 
    User.find({email:req.body.email},(err,user)=>{
            if(err) return res.status(500).send({  err}) // errpr al consultar
            if(!user) return res.status(404).send({ message:'No existe el usuario'})

            // si pasa totto esto es que existe el usuario
            req.user = user // asigno el usuario al req
            res.status(200).send({
                message :'Te has logueado correntamente',
                token: service.createToken(user)    // envio el token creado 

            })

        })

}

module.exports={
    signUp,
    singIn
}