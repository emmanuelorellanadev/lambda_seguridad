import { useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';



const ListBranchs = (props) => {

    const [branchs, setBranchs] = useState([]);
    const [branchId, setBranchId] = useState([]);
    
    const fetchBranchs = async() => {
        const url =`http://localhost:8080/branch`;
    
        await axios.get(url, 
          { headers: {'x-token': sessionStorage.getItem('token-xL')} })
            .then( resp => resp.data.branches)
            .then( branchesData => setBranchs(branchesData))
            .catch( error => console.log(error))
      }

    const editBranch = (id) => {
        props.navUpdateBranch( id )
    }

  const deleteBranch = async(id, branch_name) => {
    const url =`http://localhost:8080/branch/${id}`

        Swal.fire({
            icon: 'question',
            text: `Seguro que desea eliminar la sucursal ${branch_name} ?`,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545'
        }).then( async( result ) => {
            if ( result.isConfirmed ) {
                await axios.delete(url, {
                    data: {"id": id}, 
                    headers:{'x-token': sessionStorage.getItem('token-xL')}
                } )  
                .then( () => {
                    Swal.fire({
                        icon: 'success',
                        text: 'Sucursal eliminada correctamente',
                        confirmButtonColor: '#0d6efd',
                        timer: 3000
                    })
                })
                .catch( error => console.log(error))
        fetchBranchs();
      }

  })

}


    useEffect( () => {
        fetchBranchs()
    }, [])

    return (
        <>
        <div id='listBranchs-container'>

            <div id='listBranchs-table'>
                <table className='table table-bordered table-hover' style={{ marginTop: 12}}>
                        <thead className='text-center' style={{background: 'lightgrey'}}>
                            <tr >
                                <th>#</th>
                                <th>Sucursal</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>      
                        </thead>
                        <tbody className='text-center align-baseline'>
                            {
                                branchs.map( ( branch ) => {
                                    return (<tr key={branch.id}>
                                        <th>{branch.id}</th>
                                        <th>{branch.branch_name}</th>
                                        <th>{branch.branch_phone}</th>
                                        <th>{branch.branch_address}</th>
                                        <th><button className='btn btn-primary' type="button" onClick={ () => editBranch( branch.id ) } >Editar</button></th>
                                        <th><button className='btn btn-outline-danger' onClick={() => {deleteBranch(branch.id, branch.branch_name)}}><i className='bi bi-trash3-fill'></i></button></th>
                                    </tr>)
                                })
                            }
                        </tbody>
                </table>
            </div>
        </div>
        </>
        )
}

export default ListBranchs;