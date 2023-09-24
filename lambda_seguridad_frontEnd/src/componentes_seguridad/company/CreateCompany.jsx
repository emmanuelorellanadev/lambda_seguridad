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

        const companyData = new FormData(document.querySelector('#form-create-company'));
      
        companyData.append('img', logo);

        await axios.post(url, companyData,
        {
            headers: {'x-token': sessionStorage.getItem('token-xL')}
        }).then( resp => {
            Swal.fire({
                icon: 'success',
                text: 'Usuario creado exitosamente',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#dc3545'
            });
            cleanForm();
        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el usaurio',
                text: `${error}`,
                showCloseButton: true,
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#dc3545'
            })
        })
    }

    const cleanForm = () =>{
        document.querySelector('form-create-company');
    }
  return (
    <>
        <div id='createCompany-container'>
            <h2><center>CREAR EMPRESA</center></h2>
            <form encType='multipart/form-data' id='form-create-company' onSubmit={saveButton} >
                <div>
                    <label htmlFor="company">Empresa</label>
                    <input type="text" name="company" id="company"  value={company} onChange={ (e) => setCompany(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="address">Dirección</label>
                    <input type="text" name="address" id="address"  value={address} onChange={ (e) => setAddress(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="phone">Teléfono</label>
                    <input type="number" name="phone" id="phone" value={phone} onChange={ (e) => setPhone(e.target.value)}required/>
                </div>
                <div>
                    <label htmlFor="description">Descripción</label>
                    <input type="text" name="description" id="description" value={description} onChange={ (e) => setDescription(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="mission">Misión</label>
                    <textarea type="text" name="mission" id="mission" value={mission} onChange={ (e) => setMission(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="vision">Vision</label>
                    <textarea type="area" name="vision" id="vision"  value={vision} onChange={ (e) => setVision(e.target.value)}required/>
                </div>
                <div>
                    <label htmlFor="logo">Logo</label>
                    <input type="file" name="img" id="img" value={logo} onChange={ (e) => setLogo(e.target.value)}  />
                </div>
                <button id='saveButton' >Guardar</button>
            </form>
        </div>
    </>
  )
}

export default CreateCompany