import React, { Fragment, useState, useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

  //Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {formulario, MostrarFormulario } = proyectosContext;

  //State para proyecto
  const [proyecto, guardarProyecto] = useState({
      nombre:''
  });

  //Extraer nombre de proyecto
  const { nombre } = proyecto;

  //Lee los contenidos del input
  const onChangeProyecto = e => {
      guardarProyecto ({
          ...proyecto,
          [e.target.name] : e.target.value
      })
  }

  //Cuando el usuario envia los contenidos del input
  const onSubmitProyecto = e => {
      e.preventDefault();

      //Validar el proyecto

      //Agregar al state

      //Reiniciar el form

  }

  return (
    <Fragment>
      <button
      type='button'
      className='btn btn-block btn-primario'
      onClick={MostrarFormulario}
      >
      Nuevo Proyecto
      </button>

      { formulario 
        ? (
            <form 
              className='formulario-nuevo-proyecto'
              onSubmit='onSubmitProyecto'
            >
              <input
                type='text'
                className='input-text'
                placeholder='Nombre Proyecto'
                name='nombre'
                onChange='onChangeProyecto'
                value={nombre}
              />
              <input
                type='submit'
                className='btn btn-primario btn-block'
                value='Agregar Proyecto'
              />
            </form>
          )
        :
          null

      }
    </Fragment>
  );
}

export default NuevoProyecto;