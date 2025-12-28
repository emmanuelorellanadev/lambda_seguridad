import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import { useState, useEffect, useContext } from 'react';
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
import { GlobalContext } from '../../context/GlobalContext.jsx';

const UpdateBranch = (props) => {

  const { urlLambda, token } = useContext(GlobalContext);
  const urlBranch = `${urlLambda}/branch/${props.branchId}`;

  const [ branch, setBranch ]             = useState('');
  const [ address, setAddress ]           = useState('');
  const [ phone, setPhone ]               = useState('');
  const [ state, setState ]               = useState(false);
  const [ branchTypeId, setBranchTypeId ] = useState('');
  const [ companyId, setCompanyId ]       = useState('1');
  const [ companies, setCompanies ]       = useState([]);
  const [ branchTypes, setBranchTypes ]   = useState([]);
  const [nextPage, setNextPage] = useState({});
  const [prevPage, setPrevPage] = useState({});

  const updateButton = async(e) => {
    e.preventDefault();
    useUpdateBranch(urlBranch, token, branch, address, phone, state, branchTypeId, companyId)
  }
  
  useEffect( () => {
    const urlCompany = `${urlLambda}/company/`;
    const urlBranchType = `${urlLambda}/branchType/`;
    useGetCompany(urlCompany, token, { setCompanies, setNextPage, setPrevPage  });
    useGetBranchType(urlBranchType, token, {setBranchTypes, setNextPage, setPrevPage });
    useGetBranch(urlBranch, token, { setBranch, setAddress, setPhone, setState, setBranchTypeId, setCompanyId, setNextPage, setPrevPage  });
  }, [])

  return (
    <>
    <div className='branch_container'>
    <P_Head className="p_h1" text={'Actualizar Sucursal'}/>
        <form className='branch_form' onSubmit={updateButton} >
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
                    <Select data={companies.data} name="" id="company" value={companyId} onChange={(e) => setCompanyId(e.target.value)}  disabled={true}/>
                </div>
                <div>
                    <Label lambdaClassLabel="" text="Tipo" />
                    <Select data={branchTypes.data} name="" id="" value={branchTypeId} onChange={ ( e ) => setBranchTypeId( e.target.value)} required />
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