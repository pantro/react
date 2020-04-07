const express = require('express');
const router = express.Router();

const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crea tarea
//api/tarea
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto de la tarea es obligatorio').not().isEmpty()
    ],
    tareaController.CrearTarea
);

//Obtener todos las tareas
router.get('/',
    auth,
    tareaController.ObtenerTareas
);

//Actualizar tarea mediante ID
router.put('/:id',
    auth,
    tareaController.ActualizarTarea
);

//Eliminar tarea mediante ID
router.delete('/:id',
    auth,
    tareaController.EliminarTarea
);

module.exports = router;