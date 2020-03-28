import React, {useContext, useState} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const FormTarea = () => {

    //Obtener si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //State para tarea
    const [tarea, guardarTarea] = useState({
        nombre:''
    });

    //Si no hay proyecto seleccionado
    if (!proyecto) return null;

    //Como nos viene como array aplicamos ARRAY DESTRUCTURING
    const [ proyectoActual ] = proyecto;

    //Lee los contenidos del input
    const OnChangeTarea = e => {
        guardarProyecto ({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //Enviar los datos
    const OnSubmitTarea = e => {
        e.preventDefault();
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
        </div>
    );
}

export default FormTarea;