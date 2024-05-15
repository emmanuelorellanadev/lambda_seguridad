//submenu from User

import {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../css/user/listUsers.css';

export const ListUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(0);
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] = useState('');
    
    const url = `http://localhost:8080/user/`;
    
    const fetchUsers = async() => {
        const urlUsersByBranch = `http://localhost:8080/usersByBranch/${branch}`;

        await axios.get(urlUsersByBranch, {
            headers: { "x-token": sessionStorage.getItem('token-xL') }
        })
        .then( users => setUsers(users.data.resData) )
        .catch( error => console.log(error))
    }
    
    const fetchBranches = async() => {
        const urlBranches = 'http://localhost:8080/branch'

        await axios.get(urlBranches, {
            headers: { "x-token": sessionStorage.getItem('token-xL') }
        })
        .then( resp => setBranches(resp.data.resData))
        .catch( error => console.log(error))
    }

    useEffect( () => {
        fetchBranches();
        fetchUsers();
    }, [branch])

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
                await axios.delete(`${url}${userId}`, {data: {"id": userId}, headers:{'x-token': sessionStorage.getItem('token-xL')}} )  
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
            <div id='ListUsers_main' style={{ marginTop: 20, padding: 20 }}>
                    <p className='p_header'>Listado de Usuarios</p>
                <div id='ListUsers_header' >
                        <div>
                            <label htmlFor="branch">Sucursales: </label>
                            <select className='form-control text-center' name="branch" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
                                <option value={''} >Todas</option>
                                {
                                    branches.map( b => {
                                        return (<option key={b.id} value={b.id}>{b.branch_name}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label>Buscar: </label>
                            <input className='form-control text-center' type="text" name="searchUser" id="searchUser" />
                        </div>
                </div>
                <div className='table-responsive' >
                    <table className='table table-bordered table-hover' style={{ marginTop: 12}}>
                        <thead className='text-center' style={{background: 'lightgrey'}}>
                            <tr >
                                {/* <th>#</th> */}
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
                                        {/* <th><img src={`http://localhost:8080/public/${user.user_img}`} alt="" /></th> */}
                                        <th>{user.user_name}</th>
                                        <th>{user.role_name}</th>
                                        <th><input type='checkbox' checked={user.user_state} disabled/></th>
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