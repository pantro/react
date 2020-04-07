import React, {useReducer} from 'react';

import authContext from './authContext';
import authReducer from './authReducer';
import ClienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Funciones
    const RegistrarUsuario = async datos => {
        try {
            const respuesta = await ClienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            //Obtener usuario
            UsuarioAutenticado();

        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }

    //Retorna el Usuario autenticado
    const UsuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            //Funcion para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const respuesta = await ClienteAxios.get('/api/auth');
            //console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    //Cuando el usuario inicia sesion
    const IniciarSesion = async datos => {
        try {
            const respuesta = await ClienteAxios.post('/api/auth', datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            //Obtener el usuario
            UsuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            };
            
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    //Cierra la sesion del usuario
    const CerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                RegistrarUsuario,
                IniciarSesion,
                UsuarioAutenticado,
                CerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    );
}

export default AuthState;