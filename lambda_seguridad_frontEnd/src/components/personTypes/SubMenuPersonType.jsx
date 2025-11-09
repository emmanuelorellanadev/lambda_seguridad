import React, { useState, useEffect, useContext } from 'react'

import { CreateListPeopleType } from './CreateListPersonType';
import { UpdatePeopleType} from './UpdatePeopleType';
import { GlobalContext } from '../../context/GlobalContext';

const SubMenuPersonType = () => {
    const {loggedRole} = useContext(GlobalContext);
    const [createListPersonType, setCreateListPersonType] = useState(1);
    const [updatePersonType, setUpdatePersonType] = useState(0);
    const [personTypeToEdit, setPersonTypeToEdit] = useState(0);
    const [role, setRole] = useState('');

    const navCreateListPersonType = () => {
        setCreateListPersonType(1);
        setUpdatePersonType(0)
    }

    const navEditPersonType = (personTypeToEdit) => {
        setCreateListPersonType(0);
        setUpdatePersonType(1);
        setPersonTypeToEdit(personTypeToEdit);
    }

    useEffect( () => {
        //WORK HERE!!
        // setRole(sessionStorage.getItem('role-xL'));
        setRole(loggedRole);
    }, [])

  return (
    <>
    {/* CHANGE THE ID HERE AND IN THE CSS FILE */}
    <div className='subMenu'>
        <ul>
            {/* CHANGE THIS, THE ACTIONS ARE NOT THE CORECT FOR THE NEW CONFIGURATION WITH ROLE_ADMINSYS */}
            {/* { role == '3' && <> <center> No Tienes los permisos necesarios </center></>} */}
            {/* { role == '2' && <><li onClick={navCreateListPersonType}>Registrar</li><li onClick={navEditPersonType}>Listar</li></>} */}
            { role == '1' && <><li onClick={navCreateListPersonType}>Registrar y Listar</li> </>}

        </ul>
    </div>
    { createListPersonType === 1 && < CreateListPeopleType navEditPersonType={navEditPersonType}/>}
    { updatePersonType === 1 && < UpdatePeopleType id = {personTypeToEdit}/>}
    </>
  )
}

export default SubMenuPersonType;