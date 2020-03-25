import React from 'react';

const onChange = () => {

}

const Login = () => {
    return (
      <div className='form-usuario'>
          <div className='contenedor-form sombra-dark'>
              <h1>Iniciar Sesión</h1>

              <form>
                  <div className='campo-form'>
                    <label htmlFor='email'>Email</label>
                    <input 
                      type='email'
                      id='email'
                      name='email'
                      placeholder='Tu email'
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
                      onChange={onChange}
                    />
                  </div>

                  <div className='campo-form'>
                      <input type='submit' className='btn btn-primario btn-block'
                      value='Iniciar Sesión'/>
                  </div>
              </form>
          </div>
      </div>
    );
}

export default Login;