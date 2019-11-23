var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');
  //mostrar todos los usuarios
  router.get('/', userController.index);
  //mostrar un usuario
  router.get('/:pokemon',userController.findUser);
  //insertar usuario
  router.post('/',userController.store);
  //actualizar usuarios
  router.put('/:index',userController.update);
  //eliminando usarios
  router.delete('/:index',userController.delete);
module.exports = router;