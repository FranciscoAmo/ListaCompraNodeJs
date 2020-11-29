'use strict'

// lista de librerias
const mongoose = require('mongoose');
const { index } = require('../controllers/ProductController');
const Product =require('./Product');
const Schema = mongoose.Schema


// creamos el esquema
const ListaSchema = new Schema({
    nameList:{ type:String, required:[true,'debe indicar un nombre a la lista']}, 
    associatedUsers:[{type: Schema.Types.ObjectId, ref: "user", required: true}],   // array de usuarios
    products:[
            {
                _id:false,                                                          // no creo el id de ese objeto solo necesito el id de referencia
               product:{type: Schema.Types.ObjectId, ref: "product"},
               quantity:{type:Number,default:1}, 
              
            }
            ],                                             // producto a incluir
    createdDate:{ type: Date, default: Date.now()} ,// fecha del registro
   

});

// creamos el model
const List = mongoose.model('lista',ListaSchema);

// exportamos el modelo
module.exports=List;

