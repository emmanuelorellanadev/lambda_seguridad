import { useState, useEffect} from 'react';
import { Toaster } from 'react-hot-toast';

import '../../css/branch/branch.css'
import { P_Head } from '../ui/P_Head';
import { Table_branch } from '../ui/tables/Table_branch.jsx';
import { useDeleteBranch } from './hooks/useDeleteBranch.js';

const ListBranchs = (props) => {

    const [ onLoad, setOnLoad ] = useState(true)

    const editBranch = (id) => {
        props.navUpdateBranch( id )
    }

    return (
        <>
            <div className='branch_container'>
                <P_Head className="p_h1" text={'Lista de Sucursales'}/>
                <div className='table-responsive branchTable_container'>
                    <Table_branch columns={["#", "Sucursal", "Teléfono", "Dirección"]} editData={editBranch} deleteData={useDeleteBranch} setOnLoad={setOnLoad} onLoad={onLoad}/>
                </div>
            </div>
            <Toaster/>
        </>
        )
}

export default ListBranchs;