import React, { Fragment, useState, useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

  //Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {formulario, errorFormulario, MostrarFormulario, AgregarProyecto, MostrarError } = proyectosContext;

  //State para proyecto
  const [proyecto, guardarProyecto] = useState({
      nombre:''
  });

  //Extraer nombre de proyecto
  const { nombre } = proyecto;

  //Lee los contenidos del input
  const OnChangeProyecto = e => {
      guardarProyecto ({
          ...proyecto,
          [e.target.name] : e.target.value
      })
  }

  //Cuando el usuario envia los contenidos del input
  const OnSubmitProyecto = e => {
      e.preventDefault();

      //Validar el proyecto
      if (nombre === '') {
        MostrarError();
        return;
      }
      //Agregar al state
      AgregarProyecto(proyecto);

      //Reiniciar el form
      guardarProyecto({
        nombre: ''
      });

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
              onSubmit={OnSubmitProyecto}
            >
              <input
                type='text'
                className='input-text'
                placeholder='Nombre Proyecto'
                name='nombre'
                onChange={OnChangeProyecto}
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
      { errorFormulario ? <p className='mensaje error'>El nombre del proyecto es obligatorio</p> : null }
    </Fragment>
  );
}

export default NuevoProyecto;