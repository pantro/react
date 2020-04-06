const express = require('express');
const router = express.Router();

const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crea proyectos
//api/proyecto
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.CrearProyecto
);

//Obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.ObtenerProyecto
);

//Actualizar proyecto mediante ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.ActualizarProyecto
);

//Eliminar proyecto mediante ID
router.delete('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.EliminarProyecto
);

module.exports = router;