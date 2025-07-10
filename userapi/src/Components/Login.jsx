import React, { useEffect, useState } from 'react'
import { setCredentials, logout } from '../slices/authSlice'
import { useLoginUserMutation } from '../usersApi';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [formData, setForm] = useState({
    email: '',
    password: '',
  });

  const [login, {isLoading, isError, isSuccess}] = useLoginUserMutation();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    console.log('sesion cerrada');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(formData).unwrap();
      console.log('lo que viene en el result: ', result)
      dispatch(setCredentials(result.message));
    } catch (error) {
      console.error('login fallo', error);
    }
  };

  useEffect(() => {
    if(isSuccess)
    {
      console.log('login realizado');
      console.log('datos guardados:', auth);
    }
      
    if (isError)
      console.log('error login');

  }, [isSuccess, isError, auth]);



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='email' value={formData.email} onChange={handleChange} />
        <input type='password' name='password' placeholder='password' value={formData.password} onChange={handleChange}  />
        <button type='submit' disabled={isLoading}> {isLoading ? 'Iniciando sesion...' : 'Login'} </button>
        {isError && <p style={{color: 'red'}}>Error al iniciar sesion.</p>}
      </form>

      {auth.isAuthenticated && (
        <div style={{ marginTop: '1rem' }}>
          <p>👋 Bienvenido, {auth.name}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  )
}

export default Login
