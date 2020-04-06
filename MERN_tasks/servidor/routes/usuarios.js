//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

//Crear un usuario
//api/usuarios
router.post('/', 
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //Revisa que no este vacio
    check('email', 'Agregar un email válido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
  ],
  usuarioController.CrearUsuario
);

module.exports = router;