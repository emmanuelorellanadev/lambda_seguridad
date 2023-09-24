import React, { useState, useEffect } from 'react'

import '../css/user/containerUser.css'
import { CreateUser } from './CreateUser';
import { ListUsers } from './ListUsers';
import { UpdateUser } from './UpdateUser';

export const ContainerUser = () => {
    const [newUser, setNewUser] = useState(0);
    const [listUsers, setListUsers] = useState(1);
    const [editUser, setEditUser] = useState(0);
    const [userToEdit, setUserToEdit] = useState(0);
    const [role, setRole] = useState('')

    const navNewUser = () => {
        setNewUser(1);
        setListUsers(0);
        setEditUser(0)
    }
    const navListUsers = () => {
        setNewUser(0);
        setListUsers(1);
        setEditUser(0)
    }
    const navEditUser = (userToEdit) => {
        setNewUser(0);
        setListUsers(0);
        setEditUser(1)
        setUserToEdit(userToEdit)
        
    }

    useEffect( () => {
        setRole(sessionStorage.getItem('role-xL'))
    }, [])

  return (
    <>
    {/* CHANGE THE ID HERE AND IN THE CSS FILE */}
    <div id='subMenuUsers'>
        <ul>
            {/* CHANGE THIS, THE ACTIONS ARE NOT THE CORECT FOR THE NEW CONFIGURATION WITH ROLE_ADMINSYS */}
            { role == '3' && <> <center> No Tienes los permisos necesarios </center></>}
            { role == '2' && <><li onClick={navNewUser}>Registrar</li><li onClick={navListUsers}>Listar</li></>}
            { role == '1' && <><li onClick={navNewUser}>Registrar</li> <li onClick={navListUsers}>Listar</li> </>}

        </ul>
    </div>
    { newUser === 1 && < CreateUser />}
    { listUsers === 1 && < ListUsers navEditUser = {navEditUser} />}
    { editUser === 1 && < UpdateUser userToEdit={userToEdit} navListUsers = {navListUsers}/>}
    </>
  )
}
