import axios from 'axios';
import {useState, useEffect} from 'react'
import Swal from 'sweetalert2';

import '../../css/branch/branch.css'
import {P_Head} from'../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

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
            timer: 2500,
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
    <div className='branch_container'>
        <P_Head className="p_h1" text={'Crear Sucursal'}/>
        <form className='branch_form' onSubmit={saveButton} >
                <div>
                    <Label lambdaClassLabel={""}  text="Sucursal"/>
                    <Input lambdaClassInput={""}  type="text" name="branch" id="branch"  value={branch} onChange={ (e) => setBranch(e.target.value)} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""}  text="irección"/>
                    <Input lambdaClassInput={""}  type="text" name="address" id="address"  value={address} onChange={ (e) => setAddress(e.target.value)} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""}  text="Teléfono"/>
                    <Input lambdaClassInput={""}  type="number" name="phone" id="phone" value={phone} onChange={ (e) => setPhone(e.target.value)}required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""}  text="Estado"/>
                    <Input lambdaClassInput={""} type="checkbox" name="state" id="state" value={state} onChange={ (e) => setState(!state) } checked={state} />
                </div>
                <div>
                    <Label lambdaClassLabel={""}  text="Empresa"/>
                    <Select data={companies} text="Selecciona Empresa" name="" id="company" value={companySelected} onChange={(e) => setCompanySelected(e.target.value)} disabled />
                </div>
                <div>
                    <Label lambdaClassLabel={""}  text="Sucursal"/>
                    <Select data={branchTypes} text="Selecciona Empresa" name="" id="" value={branchTypeSelected} onChange={ ( e ) => setBranchTypeSelected( e.target.value)} required />
                </div>
                <div className='sendBranch_button'>
                  <button className='btn btn-primary'  >Guardar</button>
                </div>
            </form>
    </div>
    </>
  )
}

export default CreateBranch