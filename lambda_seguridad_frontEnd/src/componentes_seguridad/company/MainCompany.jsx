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
    .then( resp => resp.data.company)
    .then( comp => setCompany(comp))
    .catch( error => console.log(error))
}
  const fetchBranchs = async() => {
    const url =`http://localhost:8080/branch`;

    await axios.get(url, 
      {headers: {'x-token': sessionStorage.getItem('token-xL')},
      where: {'CompanyId': company.id}})
        .then( resp => resp.data.branches)
        .then( branchesData => setBranchs(branchesData))
        .catch( error => console.log(error))
  }

  useEffect( () => {
    fetchCompany();
    fetchBranchs();
  }, []) 
  return (
    <>
      <div id='main-company'>
        <div id='header-company'>
          <center><h1>EMPRESA</h1></center>
        </div>
        <div id='body1-company'>
          <div id='block-data'>
            <div id='img-company'>
              <img src={`http://localhost:8080/public/${company.company_logo}`} alt="" />
            </div>
            <div id='data-company'>
              <div>
                <label htmlFor="name">Nombre</label>
                <input type="text" value={company.company_name} readOnly />
              </div>
              <div>
                <label htmlFor="phone">Teléfono</label>
                <input type="number" value={company.company_phone} readOnly/>
              </div>
              <div>
                <label htmlFor="address">Dirección</label>
                <input type="text" value={company.company_address} readOnly />
              </div>
            </div>
          </div>

          <div id='block-mission-vision'>
            <div>
              <label htmlFor="mission">Misión</label>
                <textarea value={company.company_mission} readOnly name="mission" id="mission" cols="30" rows="10"></textarea>
            </div>
            <div>
              <label htmlFor="vision">Visión</label>
                <textarea value={company.company_vision} readOnly name="vision" id="vision" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div id='main-branchs'>
        <div id='header-branchs'>
          <center>Sucursales</center>
        </div>
        <div id='body-branchs'> 
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