import React, {useContext, useState, useEffect} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //Obtener si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    //Obtener funcion
    const tareasContext = useContext(tareaContext);
    const { errorTarea, seleccionarTarea, AgregarTarea, MostrarError, ObtenerTareas, ActualizarTarea, LimpiarTarea } = tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    //OJO: en [] va los valores de los que depende para ejecutarse
    useEffect(() => {
        if ( seleccionarTarea !== null ) {
            guardarTarea(seleccionarTarea);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [seleccionarTarea]);

    //State para tarea
    const [tarea, guardarTarea] = useState({
        nombre: '',
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

        //Revisar si es editar o agregar
        if ( seleccionarTarea === null ) {
            //agregar la nueva tarea al State
            tarea.proyecto = proyectoActual._id;
            AgregarTarea(tarea);    
        } else {
            ActualizarTarea(tarea);
            LimpiarTarea();
        }
        
        //Obtener las tareas nuevamente
        ObtenerTareas(proyectoActual._id);

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
                        value={ seleccionarTarea? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>
            </form>
            { errorTarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null }
        </div>
    );
}

export default FormTarea;