import { useEffect, useState } from 'react';

import '../../css/company/company.css';
import {P_Head} from '../ui/P_Head.jsx';
import Table from '../ui/table/Table.jsx';
import { useGetCompany } from './hooks/useGetCompany.js';
import { useDeleteCompany } from './hooks/useDeleteCompany.js';

const ListCompany = (props) => {
    const urlCompany = 'http://localhost:8080/company/';
    const [ companies, setCompanies ] = useState([]);
    const [ onLoad, setOnLoad ] = useState( true )

    const editCompany = (companyToEditId) => {
        props.navUpdateCompany(companyToEditId)
    }

    useEffect( () => {
    setOnLoad(true);
    useGetCompany(urlCompany, { setCompanies });
    }, [onLoad])
    
  return (<>
    <div className='company_container' >
        <div>
            <P_Head className="p_h1" text="Listado de Empresas"/>
        </div>
        <div className='table-responsive companyTable_container' >
            <Table columns={["#", "Empresa", "Dirección", "Teléfono "]} rows={companies} editData={editCompany} deleteData={useDeleteCompany} url={urlCompany} setOnLoad={setOnLoad}/>
        </div>
    </div>
  </>
  )
}

export default ListCompany