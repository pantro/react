import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';

const NuevaCuenta = () => {

    //Extraer los valores del context
    const alertasContext = useContext(alertaContext);
    const { alerta, MostrarAlerta } = alertasContext;

    //State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    //Extraer de usuario
    const { nombre, email, password, confirmar } = usuario;
    
    const onChange = e => {
      guardarUsuario({
          ...usuario,
          [e.target.name] : e.target.value
      })
    }

    const onSubmit = e => {
      e.preventDefault();

      //Validar que no haya campos vacios
      if ( nombre.trim()==='' || email.trim()==='' || password.trim()==='' || confirmar.trim()==='') {
        MostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        return;
      }

      //Password minimo 6 caracteres
      if (password.length < 6) {
        MostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
      }

      //password iguales
      
      //Pasarlo al action
    }

    return (
      <div className='form-usuario'>
        { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
        <div className='contenedor-form sombra-dark'>
            <h1>Obtener una cuenta</h1>

            <form
              onSubmit={onSubmit}
            >
                <div className='campo-form'>
                  <label htmlFor='nombre'>Nombre</label>
                  <input 
                    type='text'
                    id='nombre'
                    name='nombre'
                    placeholder='Tu nombre'
                    value={nombre}
                    onChange={onChange}
                  />
                </div>
                <div className='campo-form'>
                  <label htmlFor='email'>Email</label>
                  <input 
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Tu email'
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className='campo-form'>
                  <label htmlFor='password'>Password</label>
                  <input 
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Tu password'
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <div className='campo-form'>
                  <label htmlFor='confirmar'>Confirmar password</label>
                  <input 
                    type='password'
                    id='confirmar'
                    name='confirmar'
                    placeholder='Repite tu password'
                    value={confirmar}
                    onChange={onChange}
                  />
                </div>

                <div className='campo-form'>
                    <input type='submit' className='btn btn-primario btn-block'
                    value='Registrarme'/>
                </div>
            </form>

            <Link to={'/'} className='enlace-cuenta'>
              Volver a iniciar sesión
            </Link>
        </div>
      </div>
    );
}

export default NuevaCuenta;