import {useContext} from 'react';
import { GlobalContext } from'../../context/GlobalContext.jsx';

import '../../css/user/user.css';
import { useDeleteUser } from './hooks/useDeleteUser';
import Table_user from '../ui/tables/Table_user';
import { Toaster } from 'react-hot-toast';

export const ListUser = (props) => {
    const { urlLambda } = useContext(GlobalContext);  
    const updateUser = (userId) => {
        props.navEditUser(userId)
    }
    
    const deleteUser = async(userId, userName, setOnLoad) => {
        const urlUser = `${urlLambda}/${userId}`;
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