import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyectos';

const Sidebar = () => {
    return (
        <aside>
          <h1>MERN <span>Tasks</span></h1>
          <div className='proyectos'>
              <NuevoProyecto></NuevoProyecto>
              <h2>Tus Proyectos</h2>
              <ListadoProyectos/>
          </div>
        </aside>
    );
}

export default Sidebar;