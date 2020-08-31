'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs') // libreria para encriptar la contraseña
const crypto = require('crypto') // libreria para encriptar el avatar de la pagina


// creamos el esquema
const UserSchema = new Schema({
    email:{type:String , unique:[true, 'el email debe ser distinto'], lowercase:true},
    displayName:{type :String,requided:[true,'necesitas un nombre de usuario']},
    avatar:String,
    password:{ type : String ,select:false, required:true},  // select false hace que al hacer un get de ususariaos no nos devuleva la contraseñar 
    signupDate:{ type: Date, default: Date.now()} ,// fecha del registro
    lastLogin: Date
})

// funciones que se realizan antes de introducir en la base de datos

// esta funcion encripta los datos antes de introducirlo en la base de datos
 UserSchema.pre('save',(next)=>{
      let user= this
  
        bcrypt.genSalt(10,(err,salt)=>{
            if(err) return next();  // 
            // si hay que encriptarlo lo encripto
            bcrypt.hash(this.password,salt,null,(err,hash)=>{
                if(err) return next(err)        // si da error continuo con el programa y paso el error

                // si todo va bien se cambia el valor del password por el del hash
                user.password =hash
                next()      // continuo al siguiente middleware

            })
        })
 })

 //vamos a cargar el avatar a partir de una pagina que devuleve a traves de un email
 UserSchema.method.gravatar = function(){
     if(!this.email) return 'https://gravatar.com/avatar/?s=2006d=retro'

     const md5 = crypto.createHash('md5').update(this.email).digest('hex')
     return `https://gravatar.com/avatar/${md5}?s=2006d=retro`
 }

 // creamos el model
 const User = mongoose.model('user',UserSchema);

 // exportamos el modelo
 module.exports=User;