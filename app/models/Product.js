// importamos mongoose
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');


// creamos el esquema
const ProductSchema = new mongoose.Schema({
   
    name: {
        type:String,
         createIndexes :true,
            unique:true,
            required:true},
    tipo: {
        type:String,
        required:true,
        enum:[
            'verdura','legumbre','fruta'
        ]
        },
    precio: Number,
   


});
ProductSchema.plugin(uniquevalidator);

// convertimos el Schema en modelo

const Product = mongoose.model('producto',ProductSchema);
module.exports = Product;