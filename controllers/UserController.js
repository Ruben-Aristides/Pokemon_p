const User = require('../models/User');
const userController = {};

//mostrar todos los usuarios
userController.index = async function(req,res,next)
{
    //extrallendo a todos los usuarios
    let users = await User.find();
    return res.status(200).json(users);
}

//buscar usuario
userController.findUser = async function(req, res, next)
{
    let {id} = req.params;
    let user = await User.findById(id);
    return res.status(200).json(user);
}
//crear usuario
userController.store = async function(req,res,next)
{
    let user = new User();
    user.pokemon=req.body.pokemon;
    user.tipo = req.body.tipo;
    user.evolucion=req.body.evolucion;
    user.habilidad1 = req.body.habilidad1;
    user.habilidad2 = req.body.habilidad2;

    try{
        await user.save();
        return res.status(200).json({"message":"Pokemon Agregado"});
    }catch(err){
        return res.status(500).json({ err: err, message: "Por favor revise sus datos" });
    }
    
}

//modificar usuario
userController.update = async function (req, res, next) {
    let { id } = req.params;
    let user = {
        pokemon: req.body.pokemon,
        tipo: req.body.tipo,
        evolucion:req.body.evolucion,
        habilidad1: req.body.habilidad1,
        habilidad2: req.body.habilidad2
    }
    console.log(user);
    try {
        await User.update({ _id: id }, user);
        res.status(200).json({ "message": "Pokemon actualizado con exito" });
    }
    catch (err) {
        return res.status(500).json({ err: err, message: "Por favor revise sus datos" });
    }
}
//eliminar usuario
userController.delete = async function(req, res, next)
{
    let {id} = req.params;
    await User.remove({_id:id});
    res.status(200).json({"message":"Pokemon Eliminado con exito"});
}


module.exports = userController;