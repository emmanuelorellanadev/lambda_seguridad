import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../css/branch/branch.css';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

const UpdateBranch = (props) => {

    const [ branch, setBranch ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ state, setState ] = useState(false);
    const [ branchId, setBranchId ] = useState('');
    const [ companyId, setCompanyId ] = useState('1');
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
      .then( resp => {
        Swal.fire({
          icon: 'success',
          text: `${resp.data.resData}`,
          timer: 2500,
          confirmButtonColor: '#0d6efd'
        })
      })
      .catch(error => console.log(error))
    }

useEffect( () => {
    fetchBranch();
    fetchCompany();
    fetchBranchTypes();
}, [])

  return (
    <>
    <div className='branch_container'>
    <P_Head className="p_h1" text={'Actualizar Sucursal'}/>
        <form className='branch_form' onSubmit={saveButton} >
                <div>
                    <Label lambdaClassLabel="" text="Sucursal" />
                    <Input lambdaClassInput={""} type="text" name="branch" id="branch"  value={branch} onChange={ (e) => setBranch(e.target.value)} required/>
                </div>
                <div>
                    <Label lambdaClassLabel="" text="Dirección" />
                    <Input lambdaClassInput={""} type="text" name="address" id="address"  value={address} onChange={ (e) => setAddress(e.target.value)} required/>
                </div>
                <div>
                    <Label lambdaClassLabel="" text="Teléfono" />
                    <Input lambdaClassInput={""} type="number" name="phone" id="phone" value={phone} onChange={ (e) => setPhone(e.target.value)}required/>
                </div>
                <div>
                    <Label lambdaClassLabel="" text="Estado" />
                    <Input lambdaClassInput={""} type='checkbox' id='branchStatus' onChange={ () => setState( !state ) } checked={state}  />  

                </div>
                <div>
                    <Label lambdaClassLabel="" text="Empresa" />
                    <Select data={companies} name="" id="company" value={companyId} onChange={(e) => setCompanyId(e.target.value)}  disabled/>
                </div>
                <div>
                    <Label lambdaClassLabel="" text="Sucursal" />
                    <Select data={branchTypes} name="" id="" value={branchId} onChange={ ( e ) => setBranchId( e.target.value)} required />
                </div>
                <div className='sendBranch_button'>
                  <button className='btn btn-primary' >Actualizar</button>
                </div>
            </form>
    </div>
    </>
  )
}

export default UpdateBranch;