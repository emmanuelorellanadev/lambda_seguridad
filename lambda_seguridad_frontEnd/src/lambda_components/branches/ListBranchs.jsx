import { useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../css/branch/branch.css'
import { P_Head } from '../ui/P_Head';
import { Table } from '../ui/Table';
import { Label } from '../ui/Label';
import {Table_Pagination} from'../ui/Table_Pagination';

const ListBranchs = (props) => {

    const [branches, setBranches] = useState([]);
    const [query, setQuery] = useState('');
    const [search, setSearch] =useState([]);
    
    const fetchBranchs = async() => {
        const url =`http://localhost:8080/branch`;
    
        await axios.get(url, 
          { headers: {'x-token': sessionStorage.getItem('token-xL')} })
            .then( resp => resp.data.resData)
            .then( branchesData => {setBranches(branchesData); setSearch(branchesData)})
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

    const filterBranchs = async() => {
        const textToSearch = document.querySelector('#query').value;
        if(textToSearch == ''){
            setSearch(branches)
        }else{
            const searched = await branches.filter( branch => {
                if (branch.branch_name.toLowerCase().includes( textToSearch.toLowerCase() ) || branch.branch_address.toLowerCase().includes( textToSearch.toLowerCase() ) ) return branch
            } )
            setSearch(searched);
        }
    }

    useEffect( () => {
        fetchBranchs();
    }, [search])

    if(!search){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <>
        <div className='branch_container'>
            <P_Head className="p_h1" text={'Lista de Sucursales'}/>
            <input className='form form-control' type="search" name="" id="query" placeholder='Buscar' value={query} onChange={(e) => {setQuery(e.target.value); filterBranchs()}}/>
            <div className='table-responsive branchTable_container'>
                <table className='table table-bordered table-hover table-striped' >
                        <thead className='text-center t_header'>
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
                                search.map( ( branch ) => {
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