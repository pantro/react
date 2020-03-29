import React, {useContext} from 'react';

import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    //Obtener funcion
    const tareasContext = useContext(tareaContext);
    const { EliminarTarea, ObtenerTareas, EstadoTarea, EditarTarea } = tareasContext;

    //Eliminar tarea
    const HandleEliminar = () => {
        EliminarTarea(tarea.id);

        //Obtener nuevamente las tareas del proyecto
        ObtenerTareas(tarea.proyectoId);
    }

    //Cambiar el estado de una tarea
    const HandleEstado = () => {
        //Cambiando estado
        if( tarea.estado )
            tarea.estado = false;
        else
            tarea.estado = true;
        EstadoTarea(tarea);
    }

    return (
        <li className='tarea sombra'>
            <p>{tarea.nombre}</p>
            <div className='estado'>
                {tarea.estado
                  ? (
                        <button 
                            type='button'
                            className='completo'
                            onClick={ HandleEstado }
                        >Completo</button>
                    )
                  : (
                    <button 
                        type='button'
                        className='incompleto'
                        //Es around function cuando se pasa un parametro
                        onClick={ HandleEstado }
                    >Incompleto</button>
                    )
                }
            </div>
            <div className='acciones'>
                <button 
                    type='button' 
                    className='btn btn-primario'
                    onClick= {()=> EditarTarea(tarea)}
                >Editar</button>
                <button 
                    type='button' 
                    className='btn btn-secundario'
                    onClick = {HandleEliminar}
                >Eliminar</button>
            </div>
        </li>
    );
}

export default Tarea;