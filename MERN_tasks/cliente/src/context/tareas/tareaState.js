import React, { useReducer } from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA, 
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    
    const initialState = {
      tareas: [
        {id: 1, nombre: 'Elegir plataforma', estado: true, proyectoId: 1},
        {id: 2, nombre: 'Elegir colores', estado: false, proyectoId: 2},
        {id: 3, nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 3},
        {id: 4, nombre: 'Elegir hosting', estado: true, proyectoId: 4},
        {id: 5, nombre: 'Elegir colores', estado: false, proyectoId: 1},
        {id: 6, nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 2},
        {id: 7, nombre: 'Elegir hosting', estado: true, proyectoId: 3}
      ],
      tareasProyecto: null,
      errorTarea: false,
      seleccionarTarea: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer( tareaReducer, initialState);

    //Obtener tareas de proyecto
    const ObtenerTareas = (proyectoId) => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        });
    }

    //Agregar tarea
    const AgregarTarea = (tarea) => {
        dispatch({
            type : AGREGAR_TAREA,
            payload: tarea
        });
    }

    //Mostrar error
    const MostrarError = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    }

    //Eliminar proyecto
    const EliminarTarea = tareaId => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: tareaId
        });
    }

    //Estado de tarea
    const EstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        });
    }

    //Editar tarea
    const EditarTarea = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    //Actualizar tarea
    const ActualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        });
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
              tareas: state.tareas,
              tareasProyecto: state.tareasProyecto,
              errorTarea: state.errorTarea,
              seleccionarTarea: state.seleccionarTarea,
              ObtenerTareas,
              AgregarTarea,
              MostrarError,
              EliminarTarea,
              EstadoTarea,
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