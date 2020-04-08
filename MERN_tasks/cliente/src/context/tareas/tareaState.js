import React, { useReducer } from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import ClienteAxios from "../../config/axios";
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    
    const initialState = {
      tareasProyecto: [],
      errorTarea: false,
      seleccionarTarea: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer( tareaReducer, initialState);

    //Obtener tareas de proyecto
    const ObtenerTareas = async proyecto => {

        try {
            const resultado = await ClienteAxios.get('/api/tarea', {params: {proyecto}});
            
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar tarea
    const AgregarTarea = async (tarea) => {

        try {
            const resultado = await ClienteAxios.post('/api/tarea', tarea);
            
            dispatch({
                type : AGREGAR_TAREA,
                payload: resultado.data.tarea
            });   
        } catch (error) {
            console.log(error);
        }
    }

    //Mostrar error
    const MostrarError = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    }

    //Eliminar proyecto
    const EliminarTarea = async (tareaId, proyectoId )=> {
        
        try {
            await ClienteAxios.delete(`/api/tarea/${tareaId}`, {params: {proyectoId}});
            
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            });

        } catch (error) {
            console.log(error);
        }

    }

    //Editar tarea
    const EditarTarea = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    //Actualizar tarea
    const ActualizarTarea = async tarea => {
        try {
            const resultado = await ClienteAxios.put(`/api/tarea/${tarea._id}`, tarea); //Se manda la tarea completa para que lo rescriba
            //console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Limpiar tarea
    const LimpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA,
        });
    }

    return (
        <tareaContext.Provider
          value= {{
              tareasProyecto: state.tareasProyecto,
              errorTarea: state.errorTarea,
              seleccionarTarea: state.seleccionarTarea,
              ObtenerTareas,
              AgregarTarea,
              MostrarError,
              EliminarTarea,
              EditarTarea,
              ActualizarTarea,
              LimpiarTarea
          }}
        >
            {props.children}
        </tareaContext.Provider>
    );
}

export default TareaState;