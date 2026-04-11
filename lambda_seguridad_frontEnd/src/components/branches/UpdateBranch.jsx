import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import { useState, useEffect, useContext, useReducer } from 'react';
import { Toaster } from 'react-hot-toast';

import '../../css/branch/branch.css';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useGetCompany } from '../companies/hooks/useGetCompany';
import { useGetBranch } from './hooks/useGetBranch';
import { useUpdateBranch } from './hooks/useUpdateBranch';
import { useGetBranchType } from '../branchTypes/hooks/useGetBranchType';
import { GlobalContext } from '../../context/GlobalContext';
import { initialPagination, paginationReducer } from '../ui/pagination/reducer/paginationReducer.js';
import { initialBranchState, branchReducer } from './reducer/BranchReducer';

const UpdateBranch = (props) => {
  const { urlLambda, token } = useContext(GlobalContext);
  const urlBranch = `${urlLambda}/branch/${props.branchId}`;
  
  const [paginationData, paginationDispatch] = useReducer(paginationReducer , initialPagination)
  const [branchState, branchDispatch] = useReducer(branchReducer, initialBranchState);

  const [ companyId, setCompanyId ]       = useState('1');
  const [ companies, setCompanies ]       = useState([]);
  const [nextPage, setNextPage] = useState({});
  const [prevPage, setPrevPage] = useState({});

  const updateButton = async(e) => {
    e.preventDefault();
    useUpdateBranch(urlBranch, token, branchState, companyId)
  }
  
  useEffect( () => {
    const urlCompany = `${urlLambda}/company/`;
    const urlBranchType = `${urlLambda}/branchType/`;
    useGetCompany(urlCompany, token, { setCompanies, setNextPage, setPrevPage  }, token);
    useGetBranchType(urlBranchType, token, paginationDispatch, null);
    useGetBranch(urlBranch, token, null, branchDispatch);
  }, [urlLambda, urlBranch, token])

  return (
    <>
    <div className='branch_container'>
    <P_Head className="p_h1" text={'Actualizar Sucursal'}/>
        <form className='branch_form' onSubmit={updateButton} >
                <div>
                    <Label lambdaClassLabel="" text="Sucursal" />
                    <Input lambdaClassInput={""} type="text" name="branch" id="branch"  value={branchState.branch} onChange={ (e) => branchDispatch({ type: "SET_FIELD", field: "branch", value: e.target.value })} required/>
                </div>
                <div>
                    <Label lambdaClassLabel="" text="Dirección" />
                    <Input lambdaClassInput={""} type="text" name="address" id="address"  value={branchState.address} onChange={ (e) => branchDispatch({ type: "SET_FIELD", field: "address", value: e.target.value })} required/>
                </div>
                <div>
                    <Label lambdaClassLabel="" text="Teléfono" />
                    <Input lambdaClassInput={""} type="number" name="phone" id="phone" value={branchState.phone} onChange={ (e) => branchDispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })}required/>
                </div>
                <div>
                    <Label lambdaClassLabel="" text="Estado" />
                    <Input lambdaClassInput={""} type='checkbox' id='branchStatus' onChange={ () => branchDispatch({ type: "SET_FIELD", field: "state", value: !branchState.state }) } checked={branchState.state}  />  

                </div>
                <div>
                    <Label lambdaClassLabel="" text="Empresa" />
                    <Select data={companies.data} name="" id="company" value={companyId} onChange={(e) => setCompanyId(e.target.value)}  disabled={true}/>
                </div>
                <div>
                    <Label lambdaClassLabel="" text="Tipo" />
                  <Select data={paginationData.data}  text="Selecciona tipo sucursal" name="" id="" value={branchState.branchTypeId} onChange={ ( e ) => branchDispatch({ type: "SET_FIELD", field: "branchTypeId", value: e.target.value })} required />
                </div>
                <div className='sendBranch_button'>
                  <button className='btn btn-primary' >Actualizar</button>
                </div>
            </form>
    </div>
    <Toaster/>
    </>
  )
}

export default UpdateBranch;