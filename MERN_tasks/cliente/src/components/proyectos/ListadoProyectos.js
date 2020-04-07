import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {

  //Obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const {proyectos, ObtenerProyectos } = proyectosContext;
  
  //OJO: nunca debe haber un return antes de useEffect
  //OJO: en [] va los valores de los que depende para ejecutarse
  //Obtener proyectos cuando carga el componente
  useEffect(() => {
    
    ObtenerProyectos();
    //Eliminamos advertencia por que sabemos que esta bien
    // eslint-disable-next-line
  }, []);

  //Revisar si proyectos tiene contenido
  if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className='listado-proyectos'>
      <TransitionGroup>
        {proyectos.map(proyecto => (
          <CSSTransition
            key={proyecto._id}
            timeout={200}
            classNames='proyecto'
          >
            <Proyecto
              proyecto={proyecto}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}

export default ListadoProyectos;