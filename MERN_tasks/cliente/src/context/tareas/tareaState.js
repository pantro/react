import React, { useReducer } from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import { 
    TAREAS_PROYECTO
} from '../../types';

const TareaState = props => {
    const initialState = {
      tareas: [
        {nombre: 'Elegir plataforma', estado: true, proyectoId: 1},
        {nombre: 'Elegir colores', estado: false, proyectoId: 2},
        {nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 3},
        {nombre: 'Elegir hosting', estado: true, proyectoId: 4},
        {nombre: 'Elegir colores', estado: false, proyectoId: 1},
        {nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 2},
        {nombre: 'Elegir hosting', estado: true, proyectoId: 3}
      ],
      tareasProyecto: null

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

    return (
        <tareaContext.Provider
          value= {{
              tareas: state.tareas,
              tareasProyecto: state.tareasProyecto,
              ObtenerTareas
          }}
        >
            {props.children}
        </tareaContext.Provider>
    );
}

export default TareaState;