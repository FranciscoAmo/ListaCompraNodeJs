// importo el modelo
const Product = require('../models/Product');





// funciones que va a responder a cada una de las rutas

//index devuelve todas los documentos  req peticion res respuesta devuelta
 function index(req,res){   
    // busca todos los productos
    Product.find({},(err,productos)=>{
        if(err) return res.status(400).send(err)
        else return res.status(200).send(productos);

    });
        
    
    
        

}
// encuentro un valor en concreto
function show(req,res){
let error=req.body.err;
  if(req.body.err) return res.status(500).send({error});                                      // si se ha producido un error lo envio
  if(!req.body.products) return res.status(404).send({message:'NO EXISTE EL PRODUCTO'});   //  no existe el producto
  let producto = req.body.products;                                                         // lo meto en una variable
  return res.status(200).send({producto});                                                  // si no se ha producido un error y existe mando los productos
  

}



// creo un registro en el documento
function create(req,res){
    
   let product=new Product(req.body);                                                       // obtengo los valores del cuerpo de la peticion
   if(!req.body.name || !req.body.tipo) return res.status(500).send({message:'debe introducir un nombre o tipo'})    // si no tiene el nombre o el tipo relenado no dejo guardar en la base de datos
   console.log({product})   
   return product.save().then(product => res.status(201).send({mensage:"Creado",product}))  // lo guardo en la base de datos
   .catch(error => res.status(500).send({message:'error al introducir a la base de datos',error}));                      // si da fallo mando un mensage no discrimina err  tipo y duplicado de entrada 
}



//actualizo un registro
function update(req,res){
   if(req.body.err) return res.status(500).send({err});                                             // si hay error se acaba la peticion
   if(!req.body.products) return res.status(404).send({message:'No existe el registro a actualizar'})// si no existe el registro no hace nada
   // si llegamos aqui es que existe y no se ha producido un error
   // reemplazamos el registro por otro
   let product = req.body.products[0]; // unico producto que tendria
   product = Object.assign(product,req.body);       // asignamos product al cuerpo de la funcion con los cambios
   product.save().then(product =>                                   // si todo esta bien guardo en la base de datos
     res.status(200).send({message:'Actualizado',product}))         // envio un mensage de actualizacion y el objeto actualizado
     .catch(error => res.status(500).send({error}));                // capturo un posible error
}


// elimino un registro
function remove(req,res){
   if(req.body.err) return res.status(500).send({err});                 // si se porduce un error para
   if(!req.body.products) return res.status(404).send({message:'No existe el registro'});   // si no existe el registro no hace mas
    req.body.products[0].remove()
                                .then(product => res.status(200).send({ message: 'Registro borrado',product})) // si existe lo borro  y muestro el registro borrado
                                .catch(error => res.status(500).send({message:'Se ha producido un error'})) // capturando un error
}




// busco un archivo para realizar otro verbo
function find(req,res,next){
    let query={};                               // busqueda vacia
    query[req.params.key]=req.params.value;     // generacion de busqueda

    Product.find(query)                         //busco si hay elementos
    .then(products=>{                           //devuelve una promesa que la guardo en productos
        if(!products.length>0) return next();   //si no hay productos sigo

        req.body.products=products;             // si los hay los guardos en el cuerpo de la peticion
        return next();                          // y continua
    }).catch(err=>{
        req.body.err=err;                       // si hay un error lo guardo y paso a la siguiente funcion
        next();
    })

}


// exporto los modulos

module.exports ={
    show,
    index,
    find,  
    create,
    update,
    remove
    
}