import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import {useState, useEffect, useContext, useReducer} from 'react'
import { Toaster } from 'react-hot-toast'; 

import '../../css/branch/branch.css'
import {P_Head} from'../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useGetCompany } from '../companies/hooks/useGetCompany.js'
import { useCreateBranch } from './hooks/useCreateBranch.js';
import { useGetBranchType } from '../branchTypes/hooks/useGetBranchType.js';
import { GlobalContext } from '../../context/GlobalContext';
import { initialPagination, paginationReducer } from '../ui/pagination/reducer/paginationReducer.js';
import { initialBranchState, branchReducer } from './reducer/BranchReducer';

const CreateBranch = () => {
  const { urlLambda, token } = useContext(GlobalContext);
  const [paginationData, paginationDispatch] = useReducer(paginationReducer , initialPagination)
  const [branchState, branchDispatch] = useReducer(branchReducer, initialBranchState);
    const [ companies, setCompanies ] = useState([]);
    const [ companySelected, setCompanySelected ] = useState(1);
    const [ branchTypeSelected, setBranchTypeSelected ] = useState('');
    const [nextPage, setNextPage] = useState({});
    const [prevPage, setPrevPage] = useState({});

    const saveButton = (e) => {
        e.preventDefault();
      useCreateBranch(
        urlLambda,
        token,
        branchState.branch,
        branchState.address,
        branchState.phone,
        branchState.state,
        branchTypeSelected,
        companySelected
      );
        cleanForm();
    }

    const cleanForm = () => {
      branchDispatch({ type: "RESET_BRANCH" });
      setBranchTypeSelected('')
    }

    useEffect( () => {
      const urlCompany = `${urlLambda}/company`;
      const urlBranchType = `${urlLambda}/branchType`;
      useGetCompany(urlCompany, token, { setCompanies, setNextPage, setPrevPage });
      useGetBranchType(urlBranchType, token, paginationDispatch, null);
    }, []);
 
  return (
    <>
    <div className='branch_container'>
        <P_Head className="p_h1" text={'Crear Sucursal'}/>
        <form className='branch_form' onSubmit={saveButton} >
                <div>
                    <Label lambdaClassLabel={""}  text="Sucursal"/>
                    <Input lambdaClassInput={""}  type="text" name="branch" id="branch"  value={branchState.branch} onChange={ (e) => branchDispatch({ type: "SET_FIELD", field: "branch", value: e.target.value })} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""}  text="Dirección"/>
                    <Input lambdaClassInput={""}  type="text" name="address" id="address"  value={branchState.address} onChange={ (e) => branchDispatch({ type: "SET_FIELD", field: "address", value: e.target.value })} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""}  text="Teléfono"/>
                    <Input lambdaClassInput={""}  type="number" name="phone" id="phone" value={branchState.phone} onChange={ (e) => branchDispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })}required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""}  text="Estado"/>
                    <Input lambdaClassInput={""} type="checkbox" name="state" id="state" value={branchState.state} onChange={ () => branchDispatch({ type: "SET_FIELD", field: "state", value: !branchState.state }) } checked={branchState.state} />
                </div>
                <div>
                    <Label lambdaClassLabel={""}  text="Empresa"/>
                    <Select data={companies.data} text="Selecciona Empresa" name="" id="company" value={companySelected} onChange={(e) => setCompanySelected(e.target.value)} disabled />
                </div>
                <div>
                  <Label lambdaClassLabel={""}  text="Tipo"/>
                  <Select data={paginationData.data} text="Selecciona tipo sucursal" name="" id="" value={branchTypeSelected} onChange={ ( e ) => setBranchTypeSelected( e.target.value)} required />
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