/*Conexion a la base*/
const mongoose = require('mongoose');
const {mongodb} = require('./keys');

//abriendo la conexion
mongoose.connect(mongodb.URI,{
    useCreateIndex: true,
    useNewUrlParser:true
})
.then(db=>console.log("Conectado a la base :D"))
.catch(err=>console.error(err));