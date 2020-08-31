// importamos mongoose
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');


// creamos el esquema
const ProductSchema = new mongoose.Schema({
   
    name: {
        type:String,
         createIndexes :true,
            unique:true,
            required:[true,'campo nombre es necesario']},
    tipo: {
        type:String,
        required:true,
        enum:[
            'verdura','legumbre','fruta'
        ]
        },
    precio: Number,
   


});
ProductSchema.plugin(uniquevalidator,{message:'El producto ya existe en la base de datos modifica el precio si es lo que deseas'});

// convertimos el Schema en modelo parametros: 1 Nombre del modelo(Para referenciarlo),2 Esquema del modelo,3 collecion de la base de datos en la que consultamos

const Product = mongoose.model('product',ProductSchema);
module.exports = Product;