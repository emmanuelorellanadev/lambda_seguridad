import axios from 'axios';
import {useState, useEffect} from 'react'
import Swal from 'sweetalert2';

import '../css/branch/createBranch.css'

const CreateBranch = () => {

    const [ branch, setBranch ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ state, setState ] = useState(true);
    const [ companies, setComapanies ] = useState([]);
    const [ branchId, setBranchId ] = useState('');
    const [ branchTypes, setBranchTypes ] = useState([]);
    const [ companySelected, setCompanySelected ] = useState(1);
    const [ branchTypeSelected, setBranchTypeSelected ] = useState('');

    const saveButton = (e) => {
        e.preventDefault();

        saveBranch();
    }

    const saveBranch = async() => {
      const url = 'http://localhost:8080/branch'

      await axios.post(url, {
        "branch_name": branch,
        "branch_address": address,
        "branch_phone": phone,
        "branch_state": state,
        "BranchTypeId": branchTypeSelected,
        "CompanyId": companySelected
      },
      {
        headers: { "x-token": sessionStorage.getItem("token-xL") }
      })
      .then( response => {
        if (response.data.resData) {
        Swal.fire({
            icon: 'success',
            title: `Sucursal ${branch}, guardada con exito`,
            timer: 2000,
            confirmButtonColor: '#0d6efd'
        })
      }
    })
      .catch( error => {
        Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'La sucursal no pudo ser guardado',
        footer: error,
        confirmButtonColor: '#0d6efd'
        })
      })

      cleanForm();
    }

    const fetchData = async() => {
      const urlBranchType = 'http://localhost:8080/branchType'
      const urlCompany = 'http://localhost:8080/company'
      try {
        //get Company
        await axios.get(urlCompany, {
          headers: {'x-token': sessionStorage.getItem('token-xL')}
        })
        .then( companies => {setComapanies(companies.data.resData)})
        .catch(error => console.log(error));

        //Get BranchType
        await axios.get(urlBranchType, {
          headers: {'x-token': sessionStorage.getItem('token-xL')}
        })
        .then( branchT => {setBranchTypes(branchT.data.resData)})
        .catch(error => console.log(error));
        
      } catch (error) {
        console.log(error)
      }
    }

    const cleanForm = () => {
      setBranch('');
      setAddress('');
      setPhone('');
      setState(true);
      setBranchTypeSelected('')
    }

    useEffect( () => {
      fetchData()
    }, []);

  return (
    <>
    <div id='CreateBranch_container'>
        <p className='p_header'>Crear Sucursal</p>
        <form id='CreateBranch_form' onSubmit={saveButton} >
                <div>
                    <label htmlFor="branch">Sucursal</label>
                    <input className='form-control text-center' type="text" name="branch" id="branch"  value={branch} onChange={ (e) => setBranch(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="address">Dirección</label>
                    <input className='form-control text-center' type="text" name="address" id="address"  value={address} onChange={ (e) => setAddress(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="phone">Teléfono</label>
                    <input className='form-control text-center' type="number" name="phone" id="phone" value={phone} onChange={ (e) => setPhone(e.target.value)}required/>
                </div>
                <div>
                    <label htmlFor="state">Estado</label>
                    <input className='text-center' type="checkbox" name="state" id="state" value={state} onChange={ (e) => setState(!state) } checked={state} />
                </div>
                <div>
                    <label htmlFor="company">Empresa</label>
                    <select className='form-control text-center' name="" id="company" onChange={(e) => setCompanySelected(e.target.value)} disabled>
                      { companies.map( company => {
                        return(<option value={ company.id } key={company.id}>{company.company_name}</option>)
                      })}
                    </select>
                </div>
                <div>
                    <label htmlFor="branchTypes">Sucursal</label>
                    <select className='form-control text-center' name="" id="" value={branchTypeSelected} onChange={ ( e ) => setBranchTypeSelected( e.target.value)} required>
                      <option >Selecciona Sucursal</option>
                      { branchTypes.map( branchType => {
                        return(<option value={ branchType.id } key={branchType.id}>{branchType.branchType_name}</option>)
                      })}
                    </select>
                </div>
                <div id='CreateBranch_saveButton'>
                  <button className='btn btn-primary'  >Guardar</button>
                </div>
            </form>
    </div>
    </>
  )
}

export default CreateBranch