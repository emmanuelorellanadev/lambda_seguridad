import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import {useState, useEffect, useContext} from 'react'
import { Toaster } from 'react-hot-toast'; 
import { GlobalContext } from '../../context/GlobalContext.jsx';

import '../../css/branch/branch.css'
import {P_Head} from'../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useGetCompany } from '../companies/hooks/useGetCompany.js'
import { useCreateBranch } from './hooks/useCreateBranch.js';
import { useGetBranchType } from '../branchTypes/hooks/useGetBranchType.js';

const CreateBranch = () => {

    const { urlLambda, token } = useContext(GlobalContext);
    const [ branch, setBranch ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ state, setState ] = useState(true);
    const [ companies, setCompanies ] = useState([]);
    const [ branchTypes, setBranchTypes ] = useState([]);
    const [ companySelected, setCompanySelected ] = useState(1);
    const [ branchTypeSelected, setBranchTypeSelected ] = useState('');
    const [nextPage, setNextPage] = useState({});
    const [prevPage, setPrevPage] = useState({});

    const saveButton = (e) => {
        e.preventDefault();
        useCreateBranch( urlLambda, branch, address, phone, state, branchTypeSelected, companySelected );
        cleanForm();
    }

    const cleanForm = () => {
      setBranch('');
      setAddress('');
      setPhone('');
      setState(true);
      setBranchTypeSelected('')
    }

    useEffect( () => {
      const urlCompany = `${urlLambda}/company`
      const urlBranchType = `${urlLambda}/branchType`
      useGetCompany(urlCompany, token, { setCompanies, setNextPage, setPrevPage })
      useGetBranchType(urlBranchType, token, {setBranchTypes, setNextPage, setPrevPage})
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
                    <Label lambdaClassLabel={""}  text="Dirección"/>
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
                    <Select data={companies.data} text="Selecciona Empresa" name="" id="company" value={companySelected} onChange={(e) => setCompanySelected(e.target.value)} disabled />
                </div>
                <div>
                    <Label lambdaClassLabel={""}  text="Tipo"/>
                    <Select data={branchTypes.data} text="Selecciona tipo sucursal" name="" id="" value={branchTypeSelected} onChange={ ( e ) => setBranchTypeSelected( e.target.value)} required />
                </div>
                <div className='sendBranch_button'>
                  <button className='btn btn-primary'  >Guardar</button>
                </div>
            </form>
    </div>
    <Toaster/>
    </>
  )
}

export default CreateBranch