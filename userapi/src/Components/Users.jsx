import React, { useState } from 'react'
import { useGetAllUsersQuery } from '../usersApi'
import { Link } from 'react-router-dom';

const Users = () => {

    //the query hook returns values as data, isError, and the mutation hook returns a value that represents the data and return an array with those other values
    const {data: users, isError, isLoading, isSuccess} = useGetAllUsersQuery();

    if(isLoading) return <p>Cargando usuarios</p>
    if(isError) return <p>Error al cargar los usuarios</p>



  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>📋 Lista de Usuarios</h2>
      {users?.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.telephoneNumber}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/users/edit/${user.id}`}>Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Users
