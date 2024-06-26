import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import '../../css/company/company.css';
import { P_Head } from '../ui/P_Head';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { TextArea } from '../ui/TextArea';
import { useUpdateCompany } from './hooks/useUpdateCompany';
import { useGetCompany } from './hooks/useGetCompany';


const UpdateCompany = (props) => {
    const [company, setCompany]         = useState('');
    const [address, setAddress]         = useState('');
    const [phone, setPhone]             = useState('');
    const [description, setDescription] = useState('');
    const [mission, setMission]         = useState('');
    const [vision, setVision]           = useState('');
    const [logo, setLogo]               = useState('');
    const [logoFile, setLogoFile]       = useState('');

    const updateButton = (e) => {
        e.preventDefault();
        const urlCompany = `http://localhost:8080/company/${props.companyToEditId}`;
        useUpdateCompany(urlCompany, logoFile)
    }

    useEffect( () => {
        const urlCompany = `http://localhost:8080/company/${props.companyToEditId}`;
        useGetCompany(urlCompany, { setCompany, setAddress, setPhone, setDescription, setMission, setVision, setLogo});
    }, [])

  return (
    <>
        <div className='company_container'>
            <P_Head className="p_h1" text="Actualizar Empresa"/>
            <form encType='multipart/form-data' className='company_form' onSubmit={updateButton} >
                 <div className='companyLogo_container'>
                    <img src={`http://localhost:8080/public/${logo}`} alt="" />
                    <section>
                        <P_Head className="p_h3" text={'Cambiar Imágen'} />
                        <Input lambdaClassInput={""} type="file" name="img"  onChange={ (e) => setLogoFile(e.target.value)}/>
                    </section>
                </div> 
                <div className='companyData_container'>
                    <div>
                        <Label lambdaClassLabel={""} text="Empresa:"/>
                        <Input lambdaClassInput={""} type="text" name="company_name" id="company" value={company} onChange={ (e) => setCompany(e.target.value)} required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="Dirección:"/>
                        <Input lambdaClassInput={""} type="text" name="company_address" id="address"  value={address} onChange={ (e) => setAddress(e.target.value)} required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="Teléfono:"/>
                        <Input lambdaClassInput={""} type="number" name="company_phone" id="phone" value={phone} onChange={ (e) => setPhone(e.target.value)}required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="Descripción:"/>
                        <Input lambdaClassInput={""} type="text" name="company_description" id="description" value={description} onChange={ (e) => setDescription(e.target.value)} required/>
                    </div>
                </div>
                <div className='companyMissionVision_container'>
                    <div>
                        <Label lambdaClassLabel={""} text="Misión:"/>
                        <TextArea lambdaClassTextArea="" type="text" name="company_mission" id="mission" value={mission} onChange={ (e) => setMission(e.target.value)} required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="Visión:"/>
                        <TextArea lambdaClassTextArea="" type="area" name="company_vision" id="vision"  value={vision} onChange={ (e) => setVision(e.target.value)} required/>
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