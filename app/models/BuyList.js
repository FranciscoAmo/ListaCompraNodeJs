'use strict'

// lista de librerias
const mongoose = require('mongoose')
const User = require('./user')
const Schema = mongoose.Schema

// creamos el esquema
const ListaSchema = new Schema({
    name:{ type:String, required:[true,'debe indicar un nombre a la lista']},
    mainUser: {type: Schema.Types.ObjectId, ref: "users", required: true},
    associatedUsers:{type: Schema.Types.ObjectId, ref: "users"},
    product:{type: Schema.Types.ObjectId, ref: "products"},
    createdDate:{ type: Date, default: Date.now()} ,// fecha del registro
   

});


// creamos el model
const List = mongoose.model('lista',ProductSchema,'listas');

// exportamos el modelo
module.exports=List;

