//submenu from User

import {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../css/user/user.css';
import { useDeleteUser } from './hooks/useDeleteUser';
import {P_Head} from'../ui/P_Head';
import { Table } from'../ui/Table'
import Table_user from '../ui/Table_user';
import { useGetBranch } from '../branches/hooks/useGetBranch';
import { userGetUser } from './hooks/userGetUser';
import { Toaster } from 'react-hot-toast';

export const ListUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(0);
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] = useState('');
    const [onLoad, setOnLoad] = useState(true);
    
    
    const updateUser = (userId) => {
        setEditUser(userId);
        props.navEditUser(userId)
    }
    
    const deleteUser = async(userId, userName) => {
        const urlUser = `http://localhost:8080/user/${userId}`;
        useDeleteUser(urlUser, userId, userName, { setOnLoad })
    }
        
    useEffect( () => {
        const urlBranch = 'http://localhost:8080/branch'
        const urlUsersByBranch = `http://localhost:8080/usersByBranch/${branch}`;
        useGetBranch(urlBranch, {setBranches});
        userGetUser(urlUsersByBranch, {setUsers});
    }, [branch, onLoad])

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
                </div>
                <div className='table-responsive userTable_container' >
                <Table_user columns={['Id', 'Usuario', 'Rol', 'Estado']} rows={users} editData={updateUser} deleteData={deleteUser}/>
                </div>
            </div>
            <Toaster/>
        </>
    )
}