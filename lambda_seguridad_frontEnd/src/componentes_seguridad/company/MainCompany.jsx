import { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

import '../css/company/MainCompany.css'

const MainCompany = () => {

  const [company, setCompany] = useState({company_name: "", company_phone: "", company_address: "", company_mission: "", company_vision: ""});
  const [branchs, setBranchs] = useState([]);

  const editBranch = (branchId) => {
    console.log(branchId);
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
          await axios.delete(url, {data: {"id": id}, headers:{'x-token': sessionStorage.getItem('token-xL')}} )  
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

    await axios.delete(url, {})
  })

}
const fetchCompany = async () => {
  const url = `http://localhost:8080/company/${1}`;

  await axios.get(url, {headers: {"x-token": sessionStorage.getItem('token-xL')}})
    .then( resp => resp.data.resData)
    .then( comp => setCompany(comp))
    .catch( error => console.log(error))
}
  const fetchBranchs = async() => {
    const url =`http://localhost:8080/branch`;

    await axios.get(url, 
      {headers: {'x-token': sessionStorage.getItem('token-xL')},
      where: {'CompanyId': company.id}})
        .then( resp => resp.data.resData)
        .then( branchesData => setBranchs(branchesData))
        .catch( error => console.log(error))
  }

  useEffect( () => {
    fetchCompany();
    fetchBranchs();
  }, []) 
  return (
    <>
      <div id='MainCompany_container'>
        <p className='p_header'>Empresa</p>
        <div id='MainCompany_body'>
          <div id='bodyMainCompany_block1'>
            <div id='MainCompany_img'>
              <img src={`http://localhost:8080/public/${company.company_logo}`} alt="" />
            </div>
            <div id='data_company'>
              <div className=' MainCompany_divData'>
                <label htmlFor="name">Nombre</label>
                <input className='form-control text-center' type="text" value={company.company_name} readOnly />
              </div>
              <div className=' MainCompany_divData'>
                <label htmlFor="phone">Teléfono</label>
                <input className='form-control text-center' type="number" value={company.company_phone} readOnly/>
              </div>
              <div className=' MainCompany_divData'>
                <label htmlFor="address">Dirección</label>
                <input className='form-control text-center' type="text" value={company.company_address} readOnly />
              </div>
            </div>
          </div>
          <div className='block-mission-vision'>
            <div>
            <p className='p_header'>Misión</p>
              <textarea value={company.company_mission} readOnly name="mission" id="mission" cols="30" rows="10"></textarea>
            </div>
            <div>
              <p className='p_header'>Visión</p>
              <textarea value={company.company_vision} readOnly name="vision" id="vision" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div id='MainCompany_branchesTable'>
          <p className='p_header'>Sucursales</p>
          <div className='table-responsive' id='body-branchs'> 
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

export default MainCompany