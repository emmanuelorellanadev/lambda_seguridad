import React, { useState } from 'react'

import CreateListBranchType from './CreateAndListBranchType';
import UpdateBranchType from './UpdateBranchType';

const SubMenuBranchType = () => {

  const [ createListBranchType, setCreateListBranchType ] = useState(1);
  const [ updateBranchType, setUpdateBranchType ] = useState(0);
  const [ branchTypeId, setBranchId] =useState('');
  
  const navCreateListBranchType = () => {
      setCreateListBranchType(1);
      setUpdateBranchType(0);
  }
  
  const navUpdateBranchType = (id) => {
      setCreateListBranchType(0);
      setUpdateBranchType(1);
      setBranchId(id);
  }

  return (
    <>
      <div className='subMenu'>
        <ul>
          <li onClick={navCreateListBranchType}>Crear y Listar</li>
        </ul>
      </div>

      { createListBranchType === 1 && <CreateListBranchType navUpdateBranchType={navUpdateBranchType}/>}
      { updateBranchType === 1 && <UpdateBranchType  branchTypeId={branchTypeId}/>}
    </>
  )
}

export default SubMenuBranchType