import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../css/company/company.css';
import { P_Head } from '../ui/P_Head.jsx';import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { TextArea } from '../ui/TextArea.jsx';

const CreateCompany = () => {

    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [mission, setMission] = useState('');
    const [vision, setVision] = useState('');
    const [logo, setLogo] = useState('');

    const saveButton = (e) => {
        e.preventDefault();
        saveCompany();
    }

    const saveCompany = async() => {
        
        const url = 'http://localhost:8080/company';

        const companyData = new FormData(document.querySelector('#CreateCompany_form'));
        companyData.append('img', logo);
await axios.post(url, companyData,
        {
            headers: {'x-token': sessionStorage.getItem('token-xL')}
        }).then( resp => {
            cleanForm();
            Swal.fire({
                icon: 'success',
                text: 'Empresa creada exitosamente',
                showCloseButton: true,
                // showCancelButton: true,
                timer: 3000,
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#dc3545'
            });
        }).catch(error => {
            console.log(error);
            cleanForm()
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la empresa',
                text: `${error}`,
                showCloseButton: true,
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#dc3545'
            })
        })
    }

    const cleanForm = () =>{
        setCompany('');
        setAddress('');
        setPhone('');
        setDescription('');
        setMission('');
        setVision('');
        setLogo('');
    }
  return (
    <>
        <div className='company_container'>
            <P_Head className="p_h1" text="Crear Empresa"/>
            <form className='company_form' encType='multipart/form-data' id='CreateCompany_form' onSubmit={saveButton}>
                <div>
                    <Label lambdaClassLabel={""} text="Empresa:"/>
                    <Input lambdaClassInput={""} type="text" name="company_name" id="company"  value={company} onChange={ (e) => setCompany(e.target.value)} autoFocus required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Dirección:"/>
                    <Input lambdaClassInput={""} type="text" name="company_address" id="address"  value={address} onChange={ (e) => setAddress(e.target.value)} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Telefono:"/>
                    <Input lambdaClassInput={""} type="number" name="company_phone" id="phone" value={phone} onChange={ (e) => setPhone(e.target.value)}required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Descripción:"/>
                    <Input lambdaClassInput={""} type="text" name="company_description" id="description" value={description} onChange={ (e) => setDescription(e.target.value)} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Misión:"/>
                    <TextArea lambdaClassTextArea='' type="text" name="company_mission" id="mission" value={mission} onChange={ (e) => setMission(e.target.value)} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Visión:"/>
                    <TextArea lambdaClassTextArea='' type="text" name="company_vision" id="vision"  value={vision} onChange={ (e) => setVision(e.target.value)} required/>
                </div>
                <section>
                    <P_Head className="p_h1" text={"Logo"}/>
                    <Input lambdaClassInput={""} type="file" name="img" id="img" value={logo} onChange={ (e) => setLogo(e.target.value)}  />
                </section>
                <div className='sendCompany_button'>
                    <button className='btn btn-primary' id='saveButton' >Guardar</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default CreateCompany