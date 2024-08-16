import {useState, useEffect} from 'react';

import '../../css/user/user.css';
import { useDeleteUser } from './hooks/useDeleteUser';
import Table_user from '../ui/tables/Table_user';
import { Toaster } from 'react-hot-toast';

export const ListUser = (props) => {
    
    const updateUser = (userId) => {
        // setEditUser(userId);
        props.navEditUser(userId)
    }
    
    const deleteUser = async(userId, userName, setOnLoad) => {
        const urlUser = `http://localhost:8080/user/${userId}`;
        useDeleteUser(urlUser, userId, userName, { setOnLoad })
    }

    return (
        <>
            <div className='user_container'>
                <div className='table-responsive userTable_container' >
                    <Table_user columns={['Id', 'Usuario', 'Rol', 'Estado']} editData={updateUser} deleteData={deleteUser}/>
                </div>
            </div>
            <Toaster/>
        </>
    )
}