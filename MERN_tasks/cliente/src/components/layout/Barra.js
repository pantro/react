import React, { useContext, useEffect } from 'react';

import authContext from "../../context/auth/authContext";

const Barra = () => {

    //Extraer la informacion de autenticacion
    const authsContext = useContext(authContext);
    const { usuario, UsuarioAutenticado, CerrarSesion } = authsContext;

    useEffect(() => {
      UsuarioAutenticado();
    }, []);

    return (
        <header className='app-header'>
            {usuario ? <p className='nombre-usuario'>Hola <span>{usuario.nombre}</span></p> : null}
            
            <nav className='nav-principal'>
                <button
                    className= 'btn btn-blank cerrar-sesion'
                    onClick = {() => CerrarSesion()}
                >Cerrar Sesión
                </button>
            </nav>
        </header>
    );
}

export default Barra;