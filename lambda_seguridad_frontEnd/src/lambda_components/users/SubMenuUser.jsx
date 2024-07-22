import React, { useState, useEffect } from 'react'

import { CreateUser } from './CreateUser';
import { ListUser } from './ListUser';
import { UpdateUser } from './UpdateUser';

const SubMenuUser = () => {
    const [createUser, setCreateUser] = useState(0);
    const [listUsers, setListUsers] = useState(1);
    const [updateUser, setUpdateUser] = useState(0);
    const [userToEdit, setUserToEdit] = useState(0);
    const [role, setRole] = useState('');

    const navNewUser = () => {
        setCreateUser(1);
        setListUsers(0);
        setUpdateUser(0)
    }
    const navListUsers = () => {
        setCreateUser(0);
        setListUsers(1);
        setUpdateUser(0)
    }
    const navEditUser = (userToEdit) => {
        setCreateUser(0);
        setListUsers(0);
        setUpdateUser(1)
        setUserToEdit(userToEdit)
        
    }

    useEffect( () => {
        setRole(sessionStorage.getItem('role-xL'))
    }, [])

  return (
    <>
    {/* CHANGE THE ID HERE AND IN THE CSS FILE */}
    <div className='subMenu'>
        <ul>
            {/* CHANGE THIS, THE ACTIONS ARE NOT THE CORECT FOR THE NEW CONFIGURATION WITH ROLE_ADMINSYS */}
            { role == '3' && <> <center> No Tienes los permisos necesarios </center></>}
            { role == '2' && <><li onClick={navNewUser}>Registrar</li><li onClick={navListUsers}>Listar</li></>}
            { role == '1' && <><li onClick={navNewUser}>Registrar</li> <li onClick={navListUsers}>Listar</li> </>}

        </ul>
    </div>
    { createUser === 1 && < CreateUser />}
    { listUsers === 1 && < ListUser navEditUser = {navEditUser} />}
    { updateUser === 1 && < UpdateUser userToEdit={userToEdit} navListUsers = {navListUsers}/>}
    </>
  )
}

export default SubMenuUser;