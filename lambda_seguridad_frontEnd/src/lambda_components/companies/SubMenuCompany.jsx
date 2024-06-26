import { useState } from 'react'

import CreateCompany from './CreateCompany';
import ListCompanies from './ListCompanies';
import MainCompany from './MainCompany';
import UpdateCompany from './updateCompany';

const SubMenuCompany = () => {
  const [ createCompany, setCreateCompany ] = useState(0);
  const [ listCompanies, setListCompanies ] = useState(0);
  const [ updateCompany, setUpdateCompany ] = useState(0);
  const [ mainCompany, setMainCompany ] = useState(1);
  const [ companyToEditId, setCompanyToEditId ] = useState('');

  const navCreateCompany = () => {
    setCreateCompany(1);
    setListCompanies(0);
    setMainCompany(0);
    setUpdateCompany(0);
  }

  const navListCompany = () => {
    setCreateCompany(0);
    setListCompanies(1);
    setMainCompany(0);
    setUpdateCompany(0);
  }

  const navMainCompany = () => {
    setCreateCompany(0);
    setListCompanies(0);
    setMainCompany(1);
    setUpdateCompany(0);
  }
  
  const navUpdateCompany = (companyToEditId) => {
    setCreateCompany(0);
    setListCompanies(0);
    setMainCompany(0);
    setUpdateCompany(1);
    setCompanyToEditId(companyToEditId)
  }
  return (
    <>
    <div className='subMenu'>
      <ul>
        <li onClick={navCreateCompany}>Crear</li>
        <li onClick={navListCompany}>Listar</li>
        <li onClick={navMainCompany}>Empresa</li>
      </ul>
    </div>

      { createCompany === 1 && <CreateCompany />}
      { listCompanies === 1 && <ListCompanies navUpdateCompany={navUpdateCompany}/>}
      { mainCompany === 1 && <MainCompany />}
      { updateCompany === 1 && <UpdateCompany companyToEditId={companyToEditId}/> }
    </>
  )
}

export default SubMenuCompany
