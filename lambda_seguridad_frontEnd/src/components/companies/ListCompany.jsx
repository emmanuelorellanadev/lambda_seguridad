import { useEffect, useState } from 'react';

import '../../css/company/company.css';
import {P_Head} from '../ui/P_Head.jsx';
import Table_company from '../ui/tables/Table_company.jsx';
import { useDeleteCompany } from './hooks/useDeleteCompany.js';

const ListCompany = (props) => {
    
    const [ onLoad, setOnLoad ] = useState( true )

    const editCompany = (companyToEditId) => {
        props.navUpdateCompany(companyToEditId)
    }

    useEffect( () => {
    setOnLoad(true);
    }, [onLoad])
    
  return (<>
    <div className='company_container' >
        <div>
            <P_Head className="p_h1" text="Listado de Empresas"/>
        </div>
        <div className='table-responsive companyTable_container' >
            <Table_company columns={["#", "Empresa", "Dirección", "Teléfono "]} editData={editCompany} deleteData={useDeleteCompany} setOnLoad={setOnLoad} onLoad={onLoad}/>
        </div>
    </div>
  </>
  )
}

export default ListCompany