import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import { useReducer, useContext } from 'react';

import '../../css/company/company.css';
import { Toaster } from 'react-hot-toast'
import { createCompany } from './hooks/useCreateCompany.js';
import { P_Head } from '../ui/P_Head.jsx';import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { TextArea } from '../ui/TextArea.jsx';
import { GlobalContext } from '../../context/GlobalContext';
import { initialCompanyState, companyReducer } from './reducer/CreateCompanyReducer';

const CreateCompany = () => {
    const { urlLambda, token } = useContext(GlobalContext);
    // Centralized form state for company fields
    const [companyState, companyDispatch] = useReducer(companyReducer, initialCompanyState);

    const saveButton = (e) => {
        e.preventDefault();
        createCompany(urlLambda, token, companyState.logo);
        cleanForm();
    }

    const cleanForm = () =>{
        companyDispatch({ type: "RESET_COMPANY" });
    }
  return (
    <>
        <div className='company_container'>
            <P_Head className="p_h1" text="Crear Empresa"/>
            <form className='company_form' encType='multipart/form-data' id='CreateCompany_form' onSubmit={saveButton}>
                <div>
                    <Label lambdaClassLabel={""} text="Empresa:"/>
                    <Input lambdaClassInput={""} type="text" name="company_name" id="company"  value={companyState.company} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "company", value: e.target.value })} autoFocus required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Dirección:"/>
                    <Input lambdaClassInput={""} type="text" name="company_address" id="address"  value={companyState.address} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "address", value: e.target.value })} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Telefono:"/>
                    <Input lambdaClassInput={""} type="number" name="company_phone" id="phone" value={companyState.phone} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })}required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Descripción:"/>
                    <Input lambdaClassInput={""} type="text" name="company_description" id="description" value={companyState.description} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "description", value: e.target.value })} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Misión:"/>
                    <TextArea lambdaClassTextArea='' type="text" name="company_mission" id="mission" value={companyState.mission} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "mission", value: e.target.value })} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Visión:"/>
                    <TextArea lambdaClassTextArea='' type="text" name="company_vision" id="vision"  value={companyState.vision} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "vision", value: e.target.value })} required/>
                </div>
                <section>
                    <P_Head className="p_h1" text={"Logo"}/>
                    <Input lambdaClassInput={""} type="file" name="img" id="img" value={companyState.logo} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "logo", value: e.target.value })}  />
                </section>
                <div className='sendCompany_button'>
                    <button className='btn btn-primary' id='saveButton' >Guardar</button>
                </div>
            </form>
        </div>
        <Toaster />
    </>
  )
}

export default CreateCompany