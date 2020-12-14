'use strict'

// importo el modelo de las listas
const List = require('../models/BuyList')
// importo el modelo de los usuarios para consultar por usuarios
const User = require('../models/user')
// importo el modelo productos
const Product = require('../models/Product')
// importo mongoose para obtener el object ID
const mongoose= require('mongoose')

// constantes para los subdocumentos
const populateUser = {path: 'associatedUsers', select: 'email displayName'}     // usados en populate

const populateProduct = {path: 'products.product',select: 'name tipo precio med'}  // usados en populate





// funciones para el control de las listas


// FUNCIONES DE CREACION Y ELIMINACION DE ELEMENTOS

// creo un LISTA VACIA con el usuario como principal propietario
function createList(req,res){
    req.body.associatedUsers=req.user.sub
    let list=new List(req.body);                                                       // obtengo los valores del cuerpo de la peticion
    if(!req.body.nameList ) return res.status(500).send({message:'debe introducir un nombre para la lista '})    // si no tiene el nombre o el tipo relenado no dejo guardar en la base de datos
    console.log({list})   
    return list.save().then(list => res.status(201).send({list}))   // lo guardo en la base de datos
    
    .catch(error => res.status(500).send(error));                      // si da fallo mando un mensage no discrimina err  tipo y duplicado de entrada 
 }


  







// elimino la lista porque ya no quedan usuarios registrados

function remove(req,res){
    if(req.body.list){
    let list= req.body.list[0]
   
    if(req.body.err) return res.status(500).send({err});                 // si se porduce un error para
  //  if(req.body.list[0].length==0) return res.status(404).send({message:'No existe La lista'});   // si no existe el registro no hace mas
  
    if(list.associatedUsers.length>1)   return  removeUser(req,res,list)


     return req.body.list[0].remove()                                                                   // si no hay mas usuarios borro la lista completamente
                                 .then(list=> res.status(200).send({ message: 'Lista borrada',list})) // si existe lo borro  y muestro el registro borrado
                                 .catch(error => res.status(500).send({message:'Se ha producido un error'})) // capturando un error
                                
     }else{
       return res.status(400).send({message:'No hay listas que eliminar'}) 
    }
    }








//FUNCIONES DE MOSTRAR RESULTADOS


// encuentro un valor en concreto de las listas
function showList(req,res){


    let error=req.body.err;
      if(req.body.err) return res.status(500).send({error});                                      // si se ha producido un error lo envio
      if(!req.body.list || req.body.list.length==0) return res.status(404).send({message:'NO EXISTE LISTAS  CREADAS'});   //  no existe el producto
      //let list = req.body.list[0].products;                                                         // lo meto en una variable
      let list = req.body.list; 

      return res.status(200).send({list});                                                  // si no se ha producido un error y existe mando los productos
      
    
    }


//FUNCIONES INTERMEDIAS DE BUSCAR Y PASAR DATOS A LA SIGUIENTE FUNCION

// busco una lista con un el id de la lista con parametros
function findList(req,res,next){
    
    let listId=req.params.id
    req.params._id=null;
    console.log(req.params)
   // console.log(nombre+ 'ss')
    //console.log(req.user.sub+' hhh')
    List.find({_id:listId})    //busco si hay elementos que tenga el id del usuario logeado
    .populate(populateUser)                                     // muestro las relaciones de usuario y de productos
    .populate(populateProduct)
    .exec((err,list)=>{
        if(err){
        req.body.err=err;                           // si hay un error lo guardo y paso a la siguiente funcion
        next();
        }
        if(list.length==0) {
            console.log(list)
            console.log(list.length)
            return  next();          //si no hay productos sigo
        } 
        req.body.list=list;                         // si los hay los guardos en el cuerpo de la peticion
        console.log(list);
    // console.log(list.length)
        return next();                              // y continua
    });

}

// busco una lista con un nombre de la lista para el usuario registrado para eliminarla
function findOneList(req,res,next){
    
    let listId=req.body._id        // datos del formulario
     console.log(' id de la peticion movil'+listId);
   // console.log(nombre+ 'ss')
    //console.log(req.user.sub+' hhh')
    List.find({_id:listId})    //busco si hay elementos que tenga el id del usuario logeado
    .populate(populateUser)                                     // muestro las relaciones de usuario y de productos
    .populate(populateProduct)
    .exec((err,list)=>{
        if(err){
        req.body.err=err;                           // si hay un error lo guardo y paso a la siguiente funcion
        next();
        }
        if(list.length==0) {
           // console.log(list)
           // console.log(list.length)
            return  next();          //si no hay productos sigo
        } 
        req.body.list=list;                         // si los hay los guardos en el cuerpo de la peticion
     //   console.log(list);
    // console.log(list.length)
        return next();                              // y continua
    });

}

// busco un todas las listas del usuario registrado usa el token del registro
function findAllList(req,res,next){
    //let nombre=req.body.name
   // console.log(nombre+ 'ss')
    //console.log(req.user.sub+' hhh')
    List.find({associatedUsers: req.user.sub})     //busco si hay elementos que tenga el id del usuario logeado  
   .populate(populateUser)
   .populate(populateProduct)
    .exec((err,list)=>{
        if(err){
        req.body.err=err;                           // si hay un error lo guardo y paso a la siguiente funcion
        next();
        }
        if(list.length==0) {return next();     }      //si no hay productos sigo

        req.body.list=list;                         // si los hay los guardos en el cuerpo de la peticion
    // console.log(list.length)
        return next();                              // y continua
    });
   

}
// funcion para encontrar usuarios
function findUser(req,res,next){
    // console.log(req.params.email)
    
    User.find({ email: req.params.email })                         //busco si hay elementos
    .then(user=>{                           //devuelve una promesa que la guardo en usuario
        if(!user.length>0) {
       
        return next();   //si no hay usuario sigo
        }
        req.body.userfind=user;             // si los hay los guardos en el cuerpo de la peticion
     // console.log(user)
        return next();                          // y continua
    }).catch(err=>{
        req.body.err=err;                       // si hay un error lo guardo y paso a la siguiente funcion
        next();
    })
  
}



// busco un Producto para realizar otro verbo 
function findProduct(req,res,next){
    let query={};                               // busqueda vacia
    query[req.params.key]=req.params.value;     // generacion de busqueda

    console.log(req.params.key);
    console.log(req.params.value);

    Product.find(query)                         //busco si hay elementos
    .then(product=>{                           //devuelve una promesa que la guardo en productos
        if(!product.length>0) return next();   //si no hay productos sigo

        req.body.product=product;             // si los hay los guardos en el cuerpo de la peticion
       console.log(product)
        return next();                          // y continua
    }).catch(err=>{
        req.body.err=err;                       // si hay un error lo guardo y paso a la siguiente funcion
        next();
    })

}

// eliminar un usuario a una lista

function removeUser(req, res,list) {
    
    let lista=list
    let userId=req.user.sub                     // cogo el id del usuario a añadir 
  //  let list=req.body.list                      // cogo la lista donde voy a añadirlo
   console.log(list)
  /* console.log(userId)
  
    console.log(list)
    console.log(list[0].name)
    console.log(product)
    console.log(product[0]._id)
    console.log(req.user.sub)
    */

    // compruebo que existe el id de usuario y que se ha encontrado la lista
    if (req.user.sub && lista) {         
        // si encuentro la lista cogo el nombre de la lista
        let listId=lista._id

    // console.log(nombrelista)
      // console.log(req.user.sub)

        // busco la lista y actualizo añadiendo un producto  funciona pero debe buscarlo con el $in
        List.findOneAndUpdate({ _id:listId}, 
                 {$pull: 
                        {associatedUsers:
                    { $in: [ userId ] }}},
                   
            // propiedades 
            
           {new:true},
            
          
        ).exec( function(error)  {
            if (error) {
                return res.json({
                    success: false,
                    message: 'No se pudo eliminar',
                    err: {error}
                    
                });
            } else {
                return res.json({
                    success: true,
                    message: 'Se elimino el usuario'
                });
            }
        })
    } else {
        return res.json({
            success: false,
            message: 'No se pudo agregar el usuario, por favor verifique que el _id sea correcto'
        });
    }
};

// funcion de eliminar un producto de la lista

function removeProduct(req, res) {
    let product= req.body.product
    let productId=product[0]._id
    let list=req.body.list
   
  /*  console.log(list)
    console.log(list[0].name)
    console.log(product)
    console.log(product[0]._id)
    console.log(req.user.sub)
    */

    // compruebo que existe el id de usuario y que se ha encontrado la lista
    if (req.user.sub && list) {         
        // si encuentro la lista cogo el nombre de la lista
        let nombrelista=list[0].nameList

        // busco la lista y actualizo añadiendo un producto 
        List.updateMany({ associatedUsers: req.user.sub ,
                       nameList:nombrelista}, 
            {$pull: 
                {products:{
                    product:
            { $in: [productId]  }}}},
            // propiedades 
           {new : true, upsert: true},
            
           
        ).exec((error) => {
            if (error) {
                return res.json({
                    success: false,
                    message : 'No se pudo eliminar el producto',
                    err: {error}
                    
                });
            } else {
                return res.json({
                    success: true,
                    message: 'Se elimino  correctamente el producto'
                });
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'No se pudo agregar el producto, por favor verifique que el _id sea correcto'
        });
    }
};



 // FUNCIONES DE AGREGADO DE ELEMENTOS A LAS LISTAS
// añado un Producto
function addProduct(req, res) {
    let product= req.body.product
    let productId=product[0]._id
    let list=req.body.list
    let quantity=req.body.quantity;
    
  // let productos=list.products.product

  /*  
  console.log(list)
    console.log(list[0].name)
     console.log(product)
    console.log(product[0]._id)
    console.log(req.user.sub)
    */

    // compruebo que existe el id de usuario y que se ha encontrado la lista
    if (req.user.sub && list) {  
       // let productos=list.products.product
      
        // si encuentro la lista cogo el nombre de la lista
        let listId=list[0]._id
        List.find({_id:listId,'products.product':[productId]}).exec((exist)=>{
            if(exist){
                console.log({menssage:'existe'})
            }else{
                console.log('no existe');
            }
        })

        // busco la lista y actualizo añadiendo un producto si el producto esta repetido no lo introduce pero no avisa
        List.findOneAndUpdate({ _id:listId,'products.product': { $ne: [productId] }},
                          
            {$push: 
                {'products':
            {product: productId , quantity:quantity}}},
          
            // propiedades 
           {new:false,      
         useFindAndModify:false},
          
        ).exec(  
            (error) => {
                 if (error) {
                     return res.json({
                         success: false,
                         message: 'No se pudo agregar el producto',
                         err: {error}
                         
                     });
                 } else {
                     return res.json({
                         success: true,
                         message: 'Se agregó correctamente el producto'
                     });


                   
                 }
             })
    } else {
        return res.json({
            success: false,
            message: 'No se pudo agregar el producto, por favor verifique que el _id sea correcto'
        });
    }

};



// añadir un usuario a una lista

function addUser(req, res) {
  
    let userId;
    let user= req.body.userfind                 // cogo el valor del cuerpo de la peticion el usuario encontrado
    console.log(user)
    if(user){
        userId=user[0]._id                      // cogo el id del usuario a añadir 
    }
    let list=req.body.list                      // cogo la lista donde voy a añadirlo
   
   console.log(list)
    //console.log(req.user.sub)
  /*
    console.log(list)
    console.log(list[0].name)
    console.log(product)
    console.log(product[0]._id)
    console.log(req.user.sub)
    */

    // compruebo que existe el id de usuario y que se ha encontrado la lista
    if (userId && list) {         
        // si encuentro la lista cogo el nombre de la lista
        let listId=list[0]._id
       // console.log(nombrelista)
        // busco la lista y actualizo añadiendo un producto 
         // busco la lista y actualizo añadiendo un producto 
         List.findOneAndUpdate({ _id:listId}, 
            {$push: 
                {'associatedUsers':
                {_id: userId}}},
            // propiedades 
           {safe:true,      
         useFindAndModify:false},
            
           (error) => {
                if (error) {
                    return res.json({
                        success: false,
                        message: 'No se pudo agregar el usuario',
                        err: {error}
                        
                    });
                } else {
                    return res.json({
                        success: true,
                        message: 'Se agregó correctamente el usuario'
                    });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            message: 'No se pudo agregar el usuario, por favor verifique que el _id sea correcto'
        });
    }
};

// actualizo el producto de la lista con una nueva cantidad 
function updateProduct(req,res){
    

    let list=req.body.list                      // cogo la lista donde voy a añadirlo
  //  console.log(list)
    let listId=list[0]._id                     // id de la lista
   // console.log(listId)
    let product= req.body.product               // producto seleccionado
    //console.log(product)
    let productId=product[0]._id                // id del producto selecionado
    //console.log(productId)
    let newquantity=req.body.newquantity        // cantidad a cambiar
    //console.log(newquantity)

     List.findOneAndUpdate({_id:listId,
                            'products.product':{_id:productId}},
                            {$set:
                                {'products.$.quantity': newquantity}},  
                                // propiedades 
                                
                                (result)=>{

                                    if(!result){
                                        return res.status(200).send(
                                            {message:'se actualizo la cantidad del producto'}
                                        )
                                    }else{
                                        res.status(401).send(
                                            {message:'no se pudo actualizar la cantidad del producto'}
                                        )
                                    }

                                })
                                
}


module.exports={
   showList,
   createList,
   findList,
   findProduct,
   remove, 
   addProduct, 
   findAllList,
   findUser,
   addUser,
   removeProduct,
   findOneList,
   updateProduct

}