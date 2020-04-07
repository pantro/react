import React, {useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import ClienteAxios from "../../config/axios";
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';

const ProyectoState = props => {
  
    const initialState = {
        proyectos : [],
        formulario : false,
        errorFormulario: false,
        proyecto: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //Serie de funciones para el CRUD
    const MostrarFormulario = () => {
        dispatch({
            type:FORMULARIO_PROYECTO
        });
    }

    //Obtener los proyectos
    const ObtenerProyectos = async () => {
        
        try {
            const resultado = await ClienteAxios.get('/api/proyecto');
            //console.log(resultado);

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar proyecto
    const AgregarProyecto = async proyecto => {

        try {
            const resultado = await ClienteAxios.post('/api/proyecto', proyecto);
            console.log(resultado);
            
            //Insertar proyecto en el State
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Mostrar error
    const MostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    //Selecciona el proyecto que el usuario dio clic
    const ProyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    }

    //Eliminar proyecto
    const EliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        });
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                MostrarFormulario,
                ObtenerProyectos,
                AgregarProyecto,
                MostrarError,
                ProyectoActual,
                EliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );
}

export default ProyectoState;