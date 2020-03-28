import React, { useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

  //Obtener el state del proyecto
  const proyectosContext = useContext(proyectoContext);
  const { ProyectoActual } = proyectosContext;

  //Obtener el state del tareas
  const tareasContext = useContext(tareaContext);
  const { ObtenerTareas } = tareasContext;

  //Funcion para agregar el proyecto actual
  const SeleccionarProyecto = id => {
    ProyectoActual(id); //Mostrar proyecto actual
    ObtenerTareas(id); //Obteniendo las tareas del proyecto
  }

  return(
      <li>
          <button 
            type='button' 
            className='btn btn-blank'
            onClick = {() => SeleccionarProyecto(proyecto.id)}  
          >
              {proyecto.nombre}
          </button>
      </li>
  );
}

export default Proyecto;