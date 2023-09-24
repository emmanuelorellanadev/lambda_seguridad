import React, { useState } from 'react'

import MainBranch from './MainBranch';
import CreateBranch from './CreateBranch';
// import '../css/branch/containerBranch.css';

const ContainerBranch = () => {

  const [ createBranch, setCreateBranch ] = useState(0);
  const [ listBranch, setListBranch ] = useState(0);
  const [ updateBranch, setUpdateBranch ] = useState(0);
  const [ mainBranch, setMainBranch ] = useState(0);
  
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
  const navUpdateBranch = () => {
      setCreateBranch(0);
      setListBranch(0);
      setUpdateBranch(1);
      setMainBranch(0);
  }
  const navMainBranch = () => {
      setCreateBranch(0);
      setListBranch(0);
      setUpdateBranch(0);
      setMainBranch(1);
  }

  return (
    <>
    <div id='subMenuCompany'>
      <ul>
        <li onClick={navCreateBranch}>Crear</li>
        <li onClick={navListBranch}>Listar</li>
        <li onClick={navMainBranch}>Sucursal</li>
      </ul>
    </div>

      { createBranch === 1 && <CreateBranch />}
      {/* { listCompanies === 1 && <ListCompanies />} */}
      { mainBranch === 1 && <MainBranch />}
    </>
  )
}

export default ContainerBranch