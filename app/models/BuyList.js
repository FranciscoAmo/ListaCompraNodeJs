'use strict'

// lista de librerias
const mongoose = require('mongoose')
const User = require('./user');
const Product = require('./Product');
const Schema = mongoose.Schema

// creamos el esquema
const ListaSchema = new Schema({
    nameList:{ type:String, required:[true,'debe indicar un nombre a la lista']}, 
    associatedUsers:[{type: Schema.Types.ObjectId, ref: "user", required: true}],   // array de usuarios
    products:[{type: Schema.Types.ObjectId, ref: "product"}],                                             // array de productos de la lista
    createdDate:{ type: Date, default: Date.now()} ,// fecha del registro
   

});


// creamos el model
const List = mongoose.model('lista',ListaSchema);

// exportamos el modelo
module.exports=List;

