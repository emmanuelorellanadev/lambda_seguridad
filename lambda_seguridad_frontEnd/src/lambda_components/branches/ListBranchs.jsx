import { useState, useEffect} from 'react';
import { Toaster } from 'react-hot-toast';

import '../../css/branch/branch.css'
import { P_Head } from '../ui/P_Head';
import { Table } from '../ui/table/Table.jsx';
import { useDeleteBranch } from './hooks/useDeleteBranch.js';
import { useGetBranch } from './hooks/useGetBranch.js';

const ListBranchs = (props) => {

    const urlBranch =`http://localhost:8080/branch/`;
    const [ branches, setBranches ] = useState([]);
    const [ onLoad, setOnLoad ] = useState(true)

    const editBranch = (id) => {
        props.navUpdateBranch( id )
    }

    useEffect( () => {
        setOnLoad(true)
        useGetBranch(urlBranch, { setBranches })
    }, [onLoad])

    return (
        <>
            <div className='branch_container'>
                <P_Head className="p_h1" text={'Lista de Sucursales'}/>
                <div className='table-responsive branchTable_container'>
                    <Table columns={["#", "Sucursal", "Teléfono", "Dirección"]} rows={branches} editData={editBranch} deleteData={useDeleteBranch} url={urlBranch} setOnLoad={setOnLoad}/>
                </div>
            </div>
            <Toaster/>
        </>
        )
}

export default ListBranchs;