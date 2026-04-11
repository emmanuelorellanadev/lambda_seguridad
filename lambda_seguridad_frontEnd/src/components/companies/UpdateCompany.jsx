import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import { useState, useEffect, useReducer, useContext } from 'react';
import { Toaster } from 'react-hot-toast';

import '../../css/company/company.css';
import { P_Head } from '../ui/P_Head';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { TextArea } from '../ui/TextArea';
import { useUpdateCompany } from './hooks/useUpdateCompany';
import { useGetCompany } from './hooks/useGetCompany';
import { GlobalContext } from '../../context/GlobalContext';
import { initialCompanyState, companyReducer } from './reducer/CreateCompanyReducer';


const UpdateCompany = (props) => {
    const { urlLambda, token } = useContext(GlobalContext);
    const [logoFile, setLogoFile]       = useState('');
    // Centralized form state for company fields
    const [companyState, companyDispatch] = useReducer(companyReducer, initialCompanyState);

    const updateButton = (e) => {
        e.preventDefault();
        const urlCompany = `${urlLambda}/company/${props.companyToEditId}`;
        useUpdateCompany(urlCompany, logoFile, token)
    }

    useEffect( () => {
        const urlCompany = `${urlLambda}/company/${props.companyToEditId}`;
        useGetCompany(urlCompany, token, null, companyDispatch);
    }, [urlLambda, props.companyToEditId, token])

  return (
    <>
        <div className='company_container'>
            <P_Head className="p_h1" text="Actualizar Empresa"/>
            <form encType='multipart/form-data' className='company_form' onSubmit={updateButton} >
                 <div className='companyLogo_container'>
                    {/* <img src={`http://localhost:8080/public/${logo}`} alt="" /> */}
                    <section>
                        <P_Head className="p_h3" text={'Cambiar Imágen'} />
                        <Input lambdaClassInput={""} type="file" name="img"  onChange={ (e) => setLogoFile(e.target.value)}/>
                    </section>
                </div> 
                <div className='companyData_container'>
                    <div>
                        <Label lambdaClassLabel={""} text="Empresa:"/>
                        <Input lambdaClassInput={""} type="text" name="company_name" id="company" value={companyState.company} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "company", value: e.target.value })} required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="Dirección:"/>
                        <Input lambdaClassInput={""} type="text" name="company_address" id="address"  value={companyState.address} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "address", value: e.target.value })} required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="Teléfono:"/>
                        <Input lambdaClassInput={""} type="number" name="company_phone" id="phone" value={companyState.phone} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })}required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="Descripción:"/>
                        <Input lambdaClassInput={""} type="text" name="company_description" id="description" value={companyState.description} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "description", value: e.target.value })} required/>
                    </div>
                </div>
                <div className='companyMissionVision_container'>
                    <div>
                        <Label lambdaClassLabel={""} text="Misión:"/>
                        <TextArea lambdaClassTextArea="" type="text" name="company_mission" id="mission" value={companyState.mission} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "mission", value: e.target.value })} required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="Visión:"/>
                        <TextArea lambdaClassTextArea="" type="area" name="company_vision" id="vision"  value={companyState.vision} onChange={ (e) => companyDispatch({ type: "SET_FIELD", field: "vision", value: e.target.value })} required/>
                    </div>
                </div>
                <div className='sendCompany_button'>
                    <button className='btn btn-primary' id='UpdateCompany_updateButton' >Actualizar</button>
                </div>
            </form>
        </div>
        <Toaster/>
    </>
  )
}

export default UpdateCompany