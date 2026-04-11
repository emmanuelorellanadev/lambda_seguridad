import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import { useEffect, useReducer, useState, useContext } from 'react'

import '../../css/company/company.css';
import { P_Head } from'../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Table_branch } from '../ui/tables/Table_branch.jsx';
import { useGetCompany } from './hooks/useGetCompany.js';
import { initialCompanyState, companyReducer } from './CreateCompanyReducer';
import { GlobalContext } from '../../context/GlobalContext';

const MainCompany = () => {

  const [state, dispatch] = useReducer(companyReducer, initialCompanyState);
  const [onLoad, setOnLoad] = useState( false );
  const { urlLambda, token } = useContext(GlobalContext);

  useEffect(() => {
    const urlCompany = `${urlLambda}/company/1`
    useGetCompany(urlCompany, token,{
      setCompany: value => dispatch({ type: "SET_FIELD", field: "company", value }),
      setAddress: value => dispatch({ type: "SET_FIELD", field: "address", value }),
      setPhone: value => dispatch({ type: "SET_FIELD", field: "phone", value }),
      setDescription: value => dispatch({ type: "SET_FIELD", field: "description", value }),
      setMission: value => dispatch({ type: "SET_FIELD", field: "mission", value }),
      setVision: value => dispatch({ type: "SET_FIELD", field: "vision", value }),
      setLogo: value => dispatch({ type: "SET_FIELD", field: "logo", value }),
    }, token);
  }, [urlLambda, token]);

  return (
    <>
      <div className='company_container'>
        <P_Head className="p_h1" text="Información de Empresa" />
        <form className='company_form'>
          <div className='companyLogo_container'>
            <img src={`${urlLambda}/public/${state.logo}`} alt="" />
          </div>
          <div className='companyData_container'>
            <div>
              <Label lambdaClassLabel={""} text="Nombre"/>
              <Input lambdaClassInput={""} type="text" value={state.company} readOnly />
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Teléfono"/>
              <Input lambdaClassInput={""} type="number" value={state.phone} readOnly/>
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Dirección"/>
              <Input lambdaClassInput={""} type="text" value={state.address} readOnly />
            </div>
          </div>
          <div className='companyMissionVision_container'>
            <div>
              <Label lambdaClassLabel={""} text="Misión"/>
              <TextArea lambdaClassTextArea={""} value={state.mission} readOnly name="mission" id="mission"/>
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Visión"/>
              <TextArea lambdaClassTextArea={""} value={state.vision} readOnly name="vision" id="vision"/>
            </div>
          </div>
        </form>

        {/* Branchs table */}
        <P_Head className="p_h1" text={'Sucursales'}/>
        <div className='table-responsive companyTable_container'> 
          <Table_branch columns={["#", "Sucursal", "Dirección", "Teléfono"]}  setOnLoad={setOnLoad} />
        </div>
      </div>
    </>
  )
}

export default MainCompany