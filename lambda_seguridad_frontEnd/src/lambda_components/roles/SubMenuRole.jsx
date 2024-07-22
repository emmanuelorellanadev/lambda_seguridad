import React, { useState } from 'react'

import CreateListRole from './CreateListRole';
import UpdateRole from './UpdateRole';

const SubMenuRole = () => {

  const [ createListRole, setCreateListRole ] = useState(1);
  const [ updateRole, setUpdateRole ] = useState(0);
  const [ roleId, setRoleId] =useState('');
  
  const navCreateListRole = () => {
      setCreateListRole(1);
      setUpdateRole(0);
  }

  const navUpdateRole = (roleId) => {
      setCreateListRole(0);
      setUpdateRole(1);
      setRoleId(roleId);
  }

  return (
      <>
      <h1></h1>
      <div className='subMenu'>
        <ul>
          <li onClick={navCreateListRole}>Crear y Listar</li>
        </ul>
      </div>
  
        { createListRole === 1 && <CreateListRole navUpdateRole={navUpdateRole} />}
        { updateRole === 1 && <UpdateRole  roleId={roleId}/>}
      </>
  )

}

export default SubMenuRole