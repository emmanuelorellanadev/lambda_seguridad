import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from'axios';

import '../css/company/listCompanies.css';


const url = 'http://localhost:8080/company/';

const ListCompanies = (props) => {
  const [ companies, setCompanies ] = useState([]);

  const editCompany = (companyToEditId) => {
    props.navUpdateCompany(companyToEditId)
  }

  const deleteCompany = (companyId, companyName) => {

    Swal.fire({
      icon: 'question',
      text: `Seguro que desea eliminar la empresa ${companyName} ?`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545'
  }).then( async( result ) => {
      if ( result.isConfirmed ) {
          await axios.delete(url+companyId, {
            data: {"id": companyId},
            headers:{'x-token': sessionStorage.getItem('token-xL')}
            } )  
          .then( () => {
              Swal.fire({
                  icon: 'success',
                  text: 'Empresa eliminada correctamente',
                  confirmButtonColor: '#0d6efd',
                  timer: 3000
              })
          })
          .catch( error => console.log(error))
          fetchCompanies();
      }
  })
  }

  const fetchCompanies = async() => {

      await axios(url, { headers: {"x-token": sessionStorage.getItem('token-xL')}})
        .then( resp => setCompanies(resp.data.resData))
        .catch(error => console.log(error))
        

  }

  useEffect( () => {
    fetchCompanies();
  }, [])

  return (<>
    <div id='ListCompanies_container' className='bg-light' style={{ marginTop: 20, padding: 20 }}>
        <div>
            <p className='p_header'>Listado de Empresas</p>
        </div>
        <div className='table-responsive' >
            <table className='table table-bordered table-hover' style={{ marginTop: 12}}>
                <thead className='text-center' style={{background: 'lightgrey'}}>
                    <tr >
                        <th>logo</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>      
                </thead>
                <tbody className='text-center align-baseline'>
                    {
                        companies.map( ( company ) => {
                            return (<tr key={company.id}>
                                <th><img className='ListCompanies_logo' src={`http://localhost:8080/public/${company.company_logo}`} alt="" /></th>
                                <th>{company.company_name}</th>
                                <th>{company.company_phone}</th>
                                <th>{company.company_address}</th>
                                <th><button className='btn btn-primary' type="button" onClick={ () => editCompany( company.id ) } >Editar</button></th>
                                <th><button className='btn btn-outline-danger' onClick={() => {deleteCompany(company.id, company.company_name)}}><i className='bi bi-trash3-fill'></i></button></th>
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

export default ListCompanies