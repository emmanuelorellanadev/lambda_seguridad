import { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../css/company/company.css';
import { P_Head } from'../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Table } from '../ui/Table';

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
      <div className='company_container'>
        <P_Head className="p_h1" text="Información de Empresa" />
        <form className='company_form'>
          <div className='companyLogo_container'>
              <img src={`http://localhost:8080/public/${company.company_logo}`} alt="" />
          </div>
          <div className='companyData_container'>
            <div>
              <Label lambdaClassLabel={""} text="Nombre"/>
              <Input lambdaClassInput={""} type="text" value={company.company_name} readOnly />
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Teléfono"/>
              <Input lambdaClassInput={""} type="number" value={company.company_phone} readOnly/>
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Dirección"/>
              <Input lambdaClassInput={""} type="text" value={company.company_address} readOnly />
            </div>
          </div>
          <div className='companyMissionVision_container'>
            <div>
              <Label lambdaClassLabel={""} text="Misión"/>
              <TextArea lambdaClassTextArea={""} value={company.company_mission} readOnly name="mission" id="mission"/>
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Visión"/>
              <TextArea lambdaClassTextArea={""} value={company.company_vision} readOnly name="vision" id="vision"/>
            </div>
          </div>
        </form>
        {/* Branchs table */}
        <P_Head className="p_h1" text={'Sucursales'}/>
        <div className='table-responsive companyTable_container'> 
          <table className='table table-bordered table-hover'>
              <thead className='text-center t_header'>
                  <tr >
                      <th>#</th>
                      <th>Sucursal</th>
                      <th>Teléfono</th>
                      <th>Dirección</th>
                      {/* <th>Editar</th>
                      <th>Eliminar</th> */}
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