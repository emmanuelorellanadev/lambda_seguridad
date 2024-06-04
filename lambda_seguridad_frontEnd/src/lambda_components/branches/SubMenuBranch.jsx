import React, { useState } from 'react'

import MainBranch from './MainBranch';
import CreateBranch from './CreateBranch';
import UpdateBranch from './UpdateBranch';
import ListBranchs from './ListBranchs';

const SubMenuBranch = () => {

  const [ createBranch, setCreateBranch ] = useState(0);
  const [ listBranchs, setListBranch ] = useState(1);
  const [ updateBranch, setUpdateBranch ] = useState(0);
  const [ mainBranch, setMainBranch ] = useState(0);
  const [ branchId, setBranchId] =useState('');
  
  const navCreateBranch = () => {
      setCreateBranch(1);
      setListBranch(0);
      setUpdateBranch(0);
      setMainBranch(0);
  }
  const navListBranch = () => {
      setCreateBranch(0);
      setListBranch(1);
      setUpdateBranch(0);
      setMainBranch(0);
  }
  const navUpdateBranch = (id) => {
      setCreateBranch(0);
      setListBranch(0);
      setUpdateBranch(1);
      setMainBranch(0);
      setBranchId(id);
  }
  const navMainBranch = () => {
      setCreateBranch(0);
      setListBranch(0);
      setUpdateBranch(0);
      setMainBranch(1);
  }

  return (
    <>
    <div className='subMenu'>
      <ul>
        <li onClick={navCreateBranch}>Crear</li>
        <li onClick={navListBranch}>Listar</li>
        <li onClick={navMainBranch}>Sucursal</li>
      </ul>
    </div>

      { createBranch === 1 && <CreateBranch />}
      { updateBranch === 1 && <UpdateBranch  branchId={branchId}/>}
      { listBranchs === 1 && <ListBranchs navUpdateBranch={navUpdateBranch} />}
      { mainBranch === 1 && <MainBranch />}
    </>
  )
}

export default SubMenuBranch