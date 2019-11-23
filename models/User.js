const mongoose = require('mongoose');
const {Schema} = mongoose;
//const bcrypt = require('bcrypt-nodejs');

//esquema de usuarios
const userSchema = mongoose.Schema({
    pokemon:{type:String, unique:true, required:true},
    tipo:{type:String,enum:['planta','agua','fuego']},
    evolucion:{type:String},
    habilidad1:{type:String,required:true},
    habilidad2:{type:String,required:true}
});

module.exports = mongoose.model('users',userSchema);

