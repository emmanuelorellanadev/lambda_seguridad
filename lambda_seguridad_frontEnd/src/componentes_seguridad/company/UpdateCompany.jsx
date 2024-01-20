import { useState, useEffect } from 'react'
import axios from 'axios';

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

        !logoFile ? console.log('no hay aarchivo') : console.log('logoFile')

        const companyData = new FormData(document.querySelector('#form-update-company'))
        companyData.append('img', logo);

        axios.put(url, 
            companyData,
            {headers: {"x-token": sessionStorage.getItem("token-xL")}})
        .then( resp => console.log(resp))
        .catch( error => console.log(error))
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
        <div id='updateCompany-container'>
            <h2><center>ACTUALIZAR EMPRESA {company} id {companyId}</center></h2>
            
            <form encType='multipart/form-data' id='form-update-company' onSubmit={updateButton} >
                 <div>
                    <img src={`http://localhost:8080/public/${logo}`} alt="" />
                    <input type="file" name="img" id="img" onChange={ (e) => setLogoFile(e.target.value)}/>
                </div> 
                <div>
                    <label htmlFor="company">Empresa</label>
                    <input type="text" name="company" id="company" value={company} onChange={ (e) => setCompany(e.target.value)} required/>
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
                <button id='saveButton' >Guardar</button>
            </form>
        </div>
    </>
  )
}

export default UpdateCompany