import React, { useState, useEffect } from 'react';

const UserList = () => {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [newUserName, setNewUserName] = useState('');
const [selectedUser, setSelectedUser] = useState(null);
const apiUrl = "https://671be1cf2c842d92c3819c03.mockapi.io/users"; // Reemplaza con la URL de tu API de MockAPI.io

 useEffect(() => {
fetch(apiUrl)
.then((response) => response.json())
.then((data) => setUsers(data))
.catch((error) => console.error("Error al obtener usuarios:", error))
.finally(() => {
setLoading(false);
});
}, [apiUrl]);
console.log(loading);

const handleCreateUser = () => {
    // Realizar solicitud POST para agregar un nuevo usuario
    fetch(apiUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: newUserName }),
    })
    .then((response) => response.json())
    .then(() => {
    // Realizar cualquier acción adicional si es necesario
    setNewUserName('');
    })
    .then(() => {
    // Realizar solicitud GET después de crear un usuario para obtener datos actualizados
    return fetch(apiUrl);
    })
    .then((response) => response.json())
    .then((data) => setUsers(data))
    .catch((error) => console.error(error.message));
    };

    const handleUpdateUser = () => {
        if (!selectedUser) return;
        
        // Realizar solicitud PUT para actualizar un usuario existente
        fetch(`${apiUrl}/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newUserName }),
        })
        .then((response) => response.json())
        .then((updatedUser) => {
        // Actualizar el estado con el usuario actualizado
        setUsers(users.map((user) => (user.id === selectedUser.id ? updatedUser : user)));
        setNewUserName('');
        setSelectedUser(null);
        })
        .catch((error) => console.error('Error al actualizar usuario:', error));
        };

        const handleDeleteUser = (userId) => {
            // Realizar solicitud DELETE para eliminar un usuario
            fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE',
            })
            .then(() => {
            // Actualizar el estado excluyendo al usuario eliminado
            setUsers(users.filter((user) => user.id !== userId));
            setNewUserName('');
            setSelectedUser(null);
            })
            .catch((error) => console.error('Error al eliminar usuario:', error));
            };

 return (
<div>
<h2>Lista de Usuarios</h2>
{loading ?
(<h1>Cargando...</h1>) :
( <ul>
    <div>
<input
type="text"
value={newUserName}
onChange={(e) => setNewUserName(e.target.value)}
placeholder="Nombre del Usuario"/>
{selectedUser ? (
<button onClick={handleUpdateUser}>Actualizar Usuario</button>
) : (
<button onClick={handleCreateUser}>Crear Usuario</button>
)}
</div>
{users.map((user) => (
<li className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
{user.name}
<button onClick={() => setSelectedUser(user)}>Editar</button>
<button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
</li>
))}
</ul>)}

</div>
);
};

export default UserList;
