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
            'verdura','legumbre','fruta','lacteo','carne','pescado','helado','limpieza','higiene','detergente','aperitivo','condimento','bebida'
        ]
        },
    precio: Number,
    med:{
        
        type:String,
        enum:[
            'kilos','unidad','litros'
        ]
    }
   


});
ProductSchema.plugin(uniquevalidator,{message:'El producto ya existe en la base de datos modifica el precio si es lo que deseas'});



const Product = mongoose.model('product',ProductSchema);
module.exports = Product;