import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from'sweetalert2';

import '../../css/company/company.css';
import { P_Head } from '../ui/P_Head';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { TextArea } from '../ui/TextArea';


const UpdateCompany = (props) => {
    const [companyId, setCompanyId] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [mission, setMission] = useState('');
    const [vision, setVision] = useState('');
    const [logo, setLogo] = useState('');
    const [logoFile, setLogoFile] = useState('');

    const updateButton = (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/company/${props.companyToEditId}`;

        const companyData = new FormData(document.querySelector('#UpdateCompany_form'))
        companyData.append('img', logo);

        axios.put(url, 
            companyData,
            {headers: {"x-token": sessionStorage.getItem("token-xL")}})
        .then( resp => {
            Swal.fire({
                icon: 'success',
                text: resp.data.resData,
                timer: 3000,
                showCloseButton: true,
                // showCancelButton: true,
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#dc3545'
            })
        })
        .catch( error => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar la empresa.',
                showCloseButton: true,
                // showCancelButton: true,
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#dc3545',
                footer: error.response.data.errors
            })
        })
    }

    const fetchCompanyData = async() => {
        const url = `http://localhost:8080/company/${props.companyToEditId}`;
        axios(url, {headers: {"x-token": sessionStorage.getItem('token-xL')}})
            .then( resp => resp.data.resData )
            .then( companyData => { fillCompanyData(companyData) })
            .catch(error => console.log(error))
    }

    const fillCompanyData = (companyData) => {
        setCompanyId(companyData.id);
        setCompany(companyData.company_name);
        setAddress(companyData.company_address);
        setPhone(companyData.company_phone);
        setDescription(companyData.company_description);
        setMission(companyData.company_mission);
        setVision(companyData.company_vision);
        setLogo(companyData.company_logo);
    }

    useEffect( () => {
        fetchCompanyData();
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
    </>
  )
}

export default UpdateCompany