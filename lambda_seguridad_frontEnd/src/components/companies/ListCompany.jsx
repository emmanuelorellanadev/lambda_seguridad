import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import { useEffect, useState, useContext } from 'react';

import '../../css/company/company.css';
import {P_Head} from '../ui/P_Head.jsx';
import Table_company from '../ui/tables/Table_company.jsx';
import { useDeleteCompany } from './hooks/useDeleteCompany.js';
import { GlobalContext } from '../../context/GlobalContext';

const ListCompany = (props) => {
    
    const [ onLoad, setOnLoad ] = useState( true )
    const { urlLambda, token } = useContext(GlobalContext);

    const deleteCompany = (companyId, companyName, onLoadSetter) => {
        useDeleteCompany(urlLambda, token, companyId, companyName, onLoadSetter);
    }

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
            <Table_company columns={["#", "Empresa", "Dirección", "Teléfono "]} editData={editCompany} deleteData={deleteCompany} setOnLoad={setOnLoad} onLoad={onLoad}/>
        </div>
    </div>
  </>
  )
}

export default ListCompany