import React, {useContext, useState} from 'react';
import uuid from 'uuid';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //Obtener si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    //Obtener funcion
    const tareasContext = useContext(tareaContext);
    const { errorTarea, AgregarTarea, MostrarError, ObtenerTareas } = tareasContext;

    //State para tarea
    const [tarea, guardarTarea] = useState({
        nombre:'',
    });

    //Destructuring, extraer nombre
    const { nombre } = tarea;

    //Si no hay proyecto seleccionado
    if (!proyecto) return null;

    //Como nos viene como array aplicamos ARRAY DESTRUCTURING
    const [ proyectoActual ] = proyecto;

    //Lee los contenidos del input
    const OnChangeTarea = e => {
        guardarTarea ({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    //Enviar los datos
    const OnSubmitTarea = e => {
        e.preventDefault();

        //Validar
        //trim() : elimina espacio vacios al inicio y final
        if (nombre.trim() === '') {
          MostrarError();
          return;
        }

        //agregar la nueva tarea al State
        tarea.proyectoId = proyectoActual.id;
        tarea.estado = false;
        tarea.id = uuid.v4();
        AgregarTarea(tarea);

        //Obtener las tareas nuevamente
        ObtenerTareas(proyectoActual.id);

        //Reiniciar el form
        guardarTarea({
            nombre: ''
        });
    }

    return (
        <div className='formulario'>
            <form onSubmit={OnSubmitTarea}>
                <div className='contenedor-input'>
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        onChange= {OnChangeTarea}
                        value={nombre}
                    />
                </div>
                <div className='contenedor-input'>
                    <input
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value='Agregar tarea'
                    />
                </div>
            </form>
            { errorTarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null }
        </div>
    );
}

export default FormTarea;