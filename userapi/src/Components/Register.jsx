import React, { useState, useEffect } from 'react';
import { useRegisterUserMutation } from '../usersApi'; // asegúrate de que el path sea correcto

const Register = () => {
  const [formData, setForm] = useState({
    name: '',
    telephoneNumber: '',
    address: '',
    email: '',
    password: '',
    role: 'User',
  });

  const [registerUser, { isLoading, isError, isSuccess, error }] = useRegisterUserMutation();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setForm({
        name: '',
        telephoneNumber: '',
        address: '',
        email: '',
        password: '',
        role: 'User',
      });
    }
  }, [isSuccess]);

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <h3>Registrar usuario</h3>

        {isSuccess && <p style={{ color: 'green' }}>✅ Usuario registrado exitosamente</p>}
        {isError && (
          <p style={{ color: 'red' }}>
            ❌ Error al registrar: {error?.data?.message || 'verifica los datos'}
          </p>
        )}

        <input
          name="name"
          value={formData.name}
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
        <input
          name="telephoneNumber"
          value={formData.telephoneNumber}
          placeholder="Teléfono"
          onChange={handleChange}
          required
        />
        <input
          name="address"
          value={formData.address}
          placeholder="Dirección"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit" disabled={isLoading} style={{ marginTop: '1rem' }}>
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
