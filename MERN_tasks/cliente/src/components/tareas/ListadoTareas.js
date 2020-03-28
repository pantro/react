import React, { Fragment, useContext } from 'react';

import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {

    //Obtener el state del proyecto
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, EliminarProyecto } = proyectosContext;

    //Obtener el state del tareas
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;

    //Si no hay proyecto seleccionado
    if (!proyecto) return <h2>Selecciona un proyecto</h2>;

    //Como nos viene como array aplicamos ARRAY DESTRUCTURING
    const [ proyectoActual ] = proyecto;

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className='listado-tareas'>
                { tareasProyecto.length === 0
                    ? (<li className='tarea'><p>No hay tareas</p></li>)
                    : tareasProyecto.map(tarea => (
                        <Tarea 
                          key= {tarea.id}
                          tarea={tarea}
                        ></Tarea>
                    ))
                }
            </ul>

            <button 
                type='button' 
                className='btn btn-eliminar'
                onClick = {()=> EliminarProyecto(proyectoActual.id)}
            >Eliminar proyecto &times;</button>
        </Fragment>
    );
}

export default ListadoTareas;