import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserByIdQuery, useUpdateUserMutation } from '../usersApi';

const EditUser = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const { data: user, isLoading, isError } = useGetUserByIdQuery(id);
    const [updateUser, { isLoading: isUpdating, isSuccess, isError: updateError }] = useUpdateUserMutation();

    const [formData, setData] = useState({
        name: '',
        telephoneNumber: '',
        address: '',
        email: '',
        password: '',
        role: 'User',
    });

    useEffect( () => {
        if(user)
        {
            setData({
                name: user.name || '',
                telephoneNumber: user.telephoneNumber || '',
                address: user.address || '',
                email: user.email || '',
                password: '', 
                role: user.role || 'User',
            });
        }
    },[user]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(prev => ({...prev, [name]:value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser({id, ...formData}).unwrap();
            alert('Usuario actualizado');
            navigate('/users');
            
        } catch (error) {
            alert('Error al actualizar usuario')
            console.log('error: ', error );
        }
    }

    if(isLoading) return <p>Cargando</p>
    if(isError) return <p>error al cargar el usuario</p>



  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h3>✏️ Editar Usuario</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
        <input name="telephoneNumber" value={formData.telephoneNumber} onChange={handleChange} placeholder="Teléfono" required />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Dirección" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Nueva contraseña (opcional)" type="password" />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit" disabled={isUpdating} style={{ marginTop: '1rem' }}>
          {isUpdating ? 'Actualizando...' : 'Guardar cambios'}
        </button>

        {updateError && <p style={{ color: 'red' }}>❌ Error al actualizar</p>}
      </form>
    </div>
  )
}

export default EditUser
