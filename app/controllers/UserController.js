'use strict'


const User = require('../models/user')          // modelo del usuario
// importamos el servicio
const service = require('../service/service')
const email_validator = require('isemail')// validador de correos electronicos
const bcrypt = require('bcrypt-nodejs') // libreria para encriptar la contraseña




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

    if(email_validator.validate(req.body.email,{errorLevel:17})>0)
    return  res.status(500).send({message: `El correo no tiene un formato valido`}) // si hay un error muestra el mensage
      
    if(req.body.displayName === undefined|| req.body.displayName === null|| req.body.displayName=="")
        return res.status(500).send({message:'el campo nombre es necesario'})
    

    // buscamos en la base de datos el email 
    User.findOne({email:req.body.email},(err,usero)=>{
    if(err) {return res.status(500).send({  err})} // error al consultar

    if(usero) {return res.status(404).send({existe:true, message:'ya existe el usuario '})}

else{
    // salvamos el usuario
    user.save((err)=>{
        if(err) return res.status(500).send({message: `La contraseña es requerida`}) // si hay un error muestra el mensage

        return res.status(200).send({   
            user: user.displayName,
            useremail: user.email,
            
            message :'Te has registrado correntamente',token: service.createToken(user)}) // servicio que crea un token metodo creado por mi
    })
     }
});
   
}



// autentificacion una vez registrado el login
function singIn(req, res){
    if(req.body.password==null || req.body.email==null){
    
    res.status(404).send({message:' debes introducir email o password'})
    }else{
        let password =req.body.password   // obtengo el password introducido
    // cojo el password y lo encripto para compararlo con la base de datos

    // buscamos en la base de datos el email 
    User.findOne({email:req.body.email},(err,user)=>{
                if(err) {return res.status(500).send({  err})} // error al consultar

                if(!user) {return res.status(404).send({ message:'No existe el usuario '})}

                else{
                
                    //console.log(user.password)
                    //console.log(password)
                    
                        // si pasa todo esto es que existe el usuario
                        req.user = user // asigno el usuario al req
                        // si existe el usuario comparo con la clave guardada en la base de datos
                        let isMatch=bcrypt.compareSync(password,user.password)
                           // if(err) return  res.status(400).send({err})

                            if(!isMatch) return res.status(400).send({message:'contraseña no valida'})
                            
                            else{
                               
                        
                        //    console.log(user)
                        //    console.log(req.body.email)
                        //    console.log(password)
                            return res.status(200).send({
                                user: user.displayName,
                                useremail: user.email,
                                message :'Te has logueado correntamente',
                                token: service.createToken(user)    // envio el token creado 
                             
                            }) 
                        }  
                    
                }

             })
    }
}

module.exports={
    signUp,
    singIn
}