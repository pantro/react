import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import authContext from "../../context/auth/authContext";

const Proyectos = () => {

    //Extraer la informacion de autenticacion
    const authsContext = useContext(authContext);
    const { UsuarioAutenticado } = authsContext;

    useEffect(() => {
      UsuarioAutenticado();
      //Para evitar que mande error por que sabemos que esta bien
      // eslint-disable-next-line
    }, []);

    return (
      <div className='contenedor-app'>
        <Sidebar>
        </Sidebar>
        <div className='seccion-principal'>
            <Barra></Barra>
            <main>
                <FormTarea></FormTarea>
                <div className='contenedor-tareas'>
                    <ListadoTareas></ListadoTareas>
                </div>
            </main>
        </div>

      </div>
    );
}

export default Proyectos;