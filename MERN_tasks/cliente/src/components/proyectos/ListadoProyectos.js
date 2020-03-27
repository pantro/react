import React, { useContext, useEffect } from 'react';

import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {

  //Obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const {proyectos, ObtenerProyectos } = proyectosContext;
  
  //OJO: nunca debe haber un return antes de useEffect
  //Obtener proyectos cuando carga el componente
  useEffect(() => {
    ObtenerProyectos();
  }, []);

  //Revisar si proyectos tiene contenido
  if(proyectos.length === 0) return null;

  return (
    <ul className='listado-proyectos'>
        {proyectos.map(proyecto => (
            <Proyecto
              key={proyecto.id}
              proyecto={proyecto}
            />
        ))}
    </ul>
  );
}

export default ListadoProyectos;