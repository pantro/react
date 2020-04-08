const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.CrearTarea = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
      return res.status(400).json({errores: errores.array()});
    } 

    try {
        //Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Creamos la tarea
        const tarea = new Tarea(req.body);

        //Guardar el proyecto
        await tarea.save();
        res.json({tarea});
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

//Obtiene todos las tareas por proyectos del usuario actual
exports.ObtenerTareas = async (req,res) => {
    try {
        //Extraer el proyecto y comprobar si existe
        //Se pone req.query cuando se envia params
        const { proyecto } = req.query;

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Obtener tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1});
        res.json( tareas );

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualiza un proyecto
exports.ActualizarTarea = async(req, res) => {

    try {
        //Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;

        //Si la tarea existe o no
        const existeTarea = await Tarea.findById(req.params.id);
        if (!existeTarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        
        //Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Crear un objeto con la nueva informacion
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        //Guardar la tarea
        const tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, { new : true });
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

//Eliminar un tarea por ID
exports.EliminarTarea = async(req, res) => {

    try {
        //Extraer el proyecto y comprobar si existe
        const  { proyectoId } = req.query;
        
        //Si la tarea existe o no
        const existeTarea = await Tarea.findById(req.params.id);
        if (!existeTarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyectoId);
        
        //Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Eliminar tarea
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}