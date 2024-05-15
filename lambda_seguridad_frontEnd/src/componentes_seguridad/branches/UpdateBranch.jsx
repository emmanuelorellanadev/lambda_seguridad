import { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/branch/UpdateBranch.css'

const UpdateBranch = (props) => {

    const [ branch, setBranch ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ state, setState ] = useState(false);
    const [ branchId, setBranchId ] = useState('');
    const [ companyId, setCompanyId ] = useState('');
    const [ companies, setComapanies ] = useState([]);
    const [ branchTypes, setBranchTypes ] = useState([]);


    const fetchBranch = async() => {
        const url = `http://localhost:8080/branch/${props.branchId}`;

        await axios.get(url, { headers: {'x-token': sessionStorage.getItem('token-xL')}})
          .then( resp => resp.data.resData)
          .then( bra => fillBranchData(bra))
          .catch( error => console.log(error))

      }

    const fetchCompany = async() => {
      const url = `http://localhost:8080/company/`;

      await axios.get(url, {headers: {'x-token': sessionStorage.getItem('token-xL')}})
        .then( resp => resp.data.resData)
        .then( companiesData => { setComapanies(companiesData) } )
        .catch( error => console.log(error))
    } 

    const fetchBranchTypes = async() => {
      const url = `http://localhost:8080/branchType/`;

      await axios.get( url, { headers: { 'x-token': sessionStorage.getItem('token-xL')} })
        .then( resp => resp.data.resData )
        .then( branchTypeData => setBranchTypes(branchTypeData))
        .catch( error => console.log(error))
    }

    const fillBranchData = (branchData) => {
      setBranch(branchData.branch_name);
      setAddress(branchData.branch_address);
      setPhone(branchData.branch_phone);
      setState(branchData.branch_state);
      setBranchId(branchData.BranchTypeId);
      setCompanyId(branchData.CompanyId);

    }







    
    //continue from here, the front end doesnt find the uri 404
    const saveButton = async(e) => {
      e.preventDefault();

      const url = `http://localhost:8080/branch/${props.branchId}`

      await axios.put(url, {
        "id": props.branchId,
        "branch_name": branch,
        "branch_address": address,
        "branch_phone": phone,
        "branch_state": state,
        "CompanyId": companyId,
        "BranchTypeId": branchId,
      },
      {
        headers:{'x-token': sessionStorage.getItem('token-xL')}
      }
       )
      .then( resp => console.log(resp))
      .catch(error => console.log(error))
    }

useEffect( () => {
    fetchBranch();
    fetchCompany();
    fetchBranchTypes();
}, [])

  return (
    <>
    <div id='UpdateBranch_container'>
        <p className='p_header'>Actualizar Sucursal</p>
        <form id='UpdateBranch_form' onSubmit={saveButton} >
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
                    {/* <input type="checkbox" name="state" id="state" checked={state} onChange={ () => setState(!state)}  /> */}
                    <input type='checkbox' id='branchStatus' onChange={ () => setState( !state ) } checked={state}  />  

                </div>
                <div>
                    <label htmlFor="company">Empresa</label>
                    <select className='form-control text-center' name="" id="company" onChange={(e) => setCompanyId(e.target.value)} disabled>
                      { companies.map( company => {
                        return(<option value={ company.id } key={company.id}>{company.company_name}</option>)
                      })}
                    </select>
                </div>
                <div>
                    <label htmlFor="branchTypes">Sucursal</label>
                    <select className='form-control text-center' name="" id="" value={branchId} onChange={ ( e ) => setBranchId( e.target.value)} required>
                      <option >Selecciona Sucursal</option>
                      { branchTypes.map( branchType => {
                        return(<option value={ branchType.id } key={branchType.id}>{branchType.branchType_name}</option>)
                      })}
                    </select>
                </div>
                <div id='UpdateBranch_updateButton'>
                  <button className='btn btn-primary' >Actualizar</button>
                </div>
            </form>
    </div>
    </>
  )
}

export default UpdateBranch;