//Ruta para autenticar un usuario
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//Iniciar sesion
//api/auth
router.post('/', 
  authController.AutenticarUsuario
);

//Obtiene el usuario autenticado
router.get('/',
  auth,
  authController.UsuarioAutenticado
);

module.exports = router;