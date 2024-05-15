import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from'sweetalert2';

import '../css/company/updateCompany.css'

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
        <div id='UpdateCompany_container'>
            <p className='p_header'>Actualizar Empresa</p>
            
            <form encType='multipart/form-data' id='UpdateCompany_form' onSubmit={updateButton} >
                 <div id='UpdateCompany_logo'>
                    <img src={`http://localhost:8080/public/${logo}`} alt="" />
                </div> 
                <div id='UpdateCompany_data'>
                    <div>
                        <label htmlFor="company">Empresa</label>
                        <input className='form-control text-center' type="text" name="company_name" id="company" value={company} onChange={ (e) => setCompany(e.target.value)} required/>
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
                </div>
                <div id='UpdateCompany_misionVision'>
                    <div>
                        <label htmlFor="mission">Misión</label>
                        <textarea className='form-control text-center' type="text" name="company_mission" id="mission" value={mission} onChange={ (e) => setMission(e.target.value)} required/>
                    </div>
                    <div>
                        <label htmlFor="vision">Visión</label>
                        <textarea className='form-control text-center' type="area" name="company_vision" id="vision"  value={vision} onChange={ (e) => setVision(e.target.value)} required/>
                    </div>
                </div>
                    <p className="p_header" id='UpdateCompany_headerUpdateImg'>Cambiar Imágen</p>
                <div id="UpdateCompany_updateImg">
                    <input className='form-control text-center' type="file" name="img"  onChange={ (e) => setLogoFile(e.target.value)}/>
                </div>
                    <button className='btn btn-primary' id='UpdateCompany_updateButton' >Actualizar</button>
            </form>
        </div>
    </>
  )
}

export default UpdateCompany