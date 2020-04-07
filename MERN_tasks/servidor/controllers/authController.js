const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');//resultado de la validacion
const jwt = require('jsonwebtoken');

exports.AutenticarUsuario = async (req, res) => {
    
    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
      return res.status(400).json({errores: errores.array()});
    } 

    //Extraer el email y password
    const { email, password } = req.body;

    try {
        //Revisar que sea un asuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
          return res.status(400).json({msg: 'El usuario no existe'});
        }

        //Revisar password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
          return res.status(400).json({msg: 'Password Incorrecto'});
        }

        //Si todod es correcto crear y firmar JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        //Firmar
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600 //1 horas
        }, (error, token)=>{
            if(error) throw error;

            //Mensaje de confirmacion
            res.json({token});
        });
        

    } catch (error) {
        console.log(error);
    }
}

exports.UsuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}