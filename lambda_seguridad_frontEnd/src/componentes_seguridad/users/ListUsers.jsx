//submenu from User

import {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const url = 'http://localhost:8080/user'

export const ListUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(0);

    
    const fetchUsers = async() => {

        await axios.get(url, {
            headers: { "x-token": sessionStorage.getItem('token-xL') }
        })
        .then( dbUsers => {setUsers(dbUsers.data.users)})
        .catch( error => console.log(error))
    }
    
    useEffect( () => {
        fetchUsers()
    }, [])

    const updateUser = (userId) => {
        setEditUser(userId);
        props.navEditUser(userId)
    }

    const deleteUser = async(userId, userName) => {
        
        Swal.fire({
            icon: 'question',
            text: `Seguro que desea eliminar el usuario ${userName} ?`,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545'
        }).then( async( result ) => {
            if ( result.isConfirmed ) {
                await axios.delete(url, {data: {"id": userId}, headers:{'x-token': sessionStorage.getItem('token-xL')}} )  
                .then( () => {
                    Swal.fire({
                        icon: 'success',
                        text: 'Usuario eliminado correctamente',
                        confirmButtonColor: '#0d6efd',
                        timer: 3000
                    })
                })
                .catch( error => console.log(error))
                fetchUsers();
            }
        })
        
        // if (window.confirm(`Seguro que desea eliminar el usuario ${userName}`)) {
        // }
    }

    return (
        <>
            <div className='bg-light' style={{ marginTop: 20, padding: 20 }}>
                <div className='h3'>
                    Listado de Usuarios
                </div>
                <div className='table-responsive' >
                    <table className='table table-bordered table-hover' style={{ marginTop: 12}}>
                        <thead className='text-center' style={{background: 'lightgrey'}}>
                            <tr >
                                <th>#</th>
                                <th>Usuario</th>
                                <th>Role</th>
                                <th>Estado</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>      
                        </thead>
                        <tbody className='text-center align-baseline'>
                            {
                                users.map( ( user ) => {
                                    return (<tr key={user.id}>
                                        <th>{user.id}</th>
                                        <th>{user.user_name}</th>
                                        <th>{user.Role.role_name}</th>
                                        <th><input type='checkbox' checked={user.user_status} disabled/></th>
                                        <th><button className='btn btn-primary' type="button" onClick={ () => updateUser( user.id ) } >Editar</button></th>
                                        <th><button className='btn btn-outline-danger' onClick={() => {deleteUser(user.id, user.user_name)}}><i className='bi bi-trash3-fill'></i></button></th>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}