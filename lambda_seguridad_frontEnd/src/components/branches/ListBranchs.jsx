import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import { useState, useContext } from 'react';
import { Toaster } from 'react-hot-toast';

import '../../css/branch/branch.css'
import { P_Head } from '../ui/P_Head';
import { Table_branch } from '../ui/tables/Table_branch.jsx';
import { useDeleteBranch } from './hooks/useDeleteBranch.js';
import { GlobalContext } from '../../context/GlobalContext';

const ListBranchs = (props) => {

    const [ onLoad, setOnLoad ] = useState(true)
    const { urlLambda, token } = useContext(GlobalContext);

    const editBranch = (id) => {
        props.navUpdateBranch( id )
    }

    const deleteBranch = (id, branchName, onLoadSetter) => {
        useDeleteBranch(urlLambda, token, id, branchName, onLoadSetter);
    }

    return (
        <>
            <div className='branch_container'>
                <P_Head className="p_h1" text={'Lista de Sucursales'}/>
                <div className='table-responsive branchTable_container'>
                    <Table_branch columns={["#", "Sucursal", "Teléfono", "Dirección"]} editData={editBranch} deleteData={deleteBranch} setOnLoad={setOnLoad} onLoad={onLoad}/>
                </div>
            </div>
            <Toaster/>
        </>
        )
}

export default ListBranchs;