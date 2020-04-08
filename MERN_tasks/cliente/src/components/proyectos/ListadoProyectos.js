import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import alertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {

  //Obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, ObtenerProyectos } = proyectosContext;

  const alertasContext = useContext(alertaContext);
  const { alerta, MostrarAlerta } = alertasContext;
  
  //OJO: nunca debe haber un return antes de useEffect
  //OJO: en [] va los valores de los que depende para ejecutarse
  //Obtener proyectos cuando carga el componente
  useEffect(() => {
    //Si hay un error
    if (mensaje) {
      MostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    ObtenerProyectos();
    //Eliminamos advertencia por que sabemos que esta bien
    // eslint-disable-next-line
  }, [mensaje]);

  //Revisar si proyectos tiene contenido
  if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className='listado-proyectos'>
      { alerta ? (<div className= {`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
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