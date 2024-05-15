import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../css/company/createCompany.css'

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
        <div id='CreateCompany_container'>
            <p className='p_header'>Crear Empresa</p>
            <form className='form-control' encType='multipart/form-data' id='CreateCompany_form' onSubmit={saveButton}>
                <div>
                    <label htmlFor="company">Empresa</label>
                    <input className='form-control text-center' type="text" name="company_name" id="company"  value={company} onChange={ (e) => setCompany(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="address">Dirección</label>
                    <input className='form-control text-center' type="text" name="company_address" id="address"  value={address} onChange={ (e) => setAddress(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="phone">Teléfono</label>
                    <input className='form-control text-center' type="number" name="company_phone" id="phone" value={phone} onChange={ (e) => setPhone(e.target.value)}required/>
                </div>
                <div>
                    <label htmlFor="description">Descripción</label>
                    <input className='form-control text-center' type="text" name="company_description" id="description" value={description} onChange={ (e) => setDescription(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="mission">Misión</label>
                    <textarea className='form-control text-center' type="text" name="company_mission" id="mission" value={mission} onChange={ (e) => setMission(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="company_vision">Vision</label>
                    <textarea className='form-control text-center' type="area" name="company_vision" id="vision"  value={vision} onChange={ (e) => setVision(e.target.value)} required/>
                </div>
                <div id='CreateCompany_updateImg'>
                    <label htmlFor="company_logo">Logo</label>
                    <input className='form-control text-center' type="file" name="img" id="img" value={logo} onChange={ (e) => setLogo(e.target.value)}  />
                </div>
                <div id='CreateCompany_saveButton'>
                    <button className='btn btn-primary' id='saveButton' >Guardar</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default CreateCompany