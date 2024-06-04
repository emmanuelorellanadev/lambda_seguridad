//submenu from User

import {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../css/user/user.css';
import {P_Head} from'../ui/P_Head';
import { Table } from'../ui/Table'

export const ListUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(0);
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] = useState('');
    const [query, setQuery] =useState('');
    const [search, setSearch] =useState([]);
    
    const url = `http://localhost:8080/user/`;
    
    const fetchUsers = async() => {
        const urlUsersByBranch = `http://localhost:8080/usersByBranch/${branch}`;

        await axios.get(urlUsersByBranch, {
            headers: { "x-token": sessionStorage.getItem('token-xL') }
        })
        // .then( resp => resp.data.resData )
        .then( resp => { setUsers(resp.data.resData); setSearch(resp.data.resData) })
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

    const filterUsers = async(e) => {
        const textToSearch = document.querySelector('#searchUser').value;
        
        if(textToSearch == ''){
            setSearch(users)
        }else{
            const searched = await users.filter( user => {
                if (user.user_name.toLowerCase().includes( textToSearch.toLowerCase()) || user.role_name.toLowerCase().includes( textToSearch.toLowerCase())) return user
            } )
            setSearch(searched);
        }
    }

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
    }
        
    useEffect( () => {
        fetchBranches();
        fetchUsers();
    }, [branch])

    return (
        <>
            <div className='user_container'>
            <P_Head className="p_h1" text={'Listado de Usuarios'}/>
                <div className='' >
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
                            <input className='form-control text-center' type="search" name="searchUser" id="searchUser" value={query} onChange={ e => { setQuery(e.target.value); filterUsers(e)} } placeholder='Buscar'/>
                        </div>
                </div>
                <div className='table-responsive userTable_container' >
                {/* <Table columns={['Id', 'Usuario', 'Rol', 'Estado', 'Editar', 'Eliminar']} rows={users} editElement={updateUser} deleteElement={deleteUser}/> */}
                    <table className='table table-bordered table-hover'>
                        <thead className='text-center t_header'>
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
                                search.map( ( user ) => {
                                    return (<tr key={user.id}>
                                        {/* <th><img src={`http://localhost:8080/public/${user.user_img}`} alt="" /></th>  */}
                                        <th>{user.id}</th>
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