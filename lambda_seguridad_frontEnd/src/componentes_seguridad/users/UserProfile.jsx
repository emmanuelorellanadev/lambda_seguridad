import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { parseJwt } from '../helpers/parseJwt';
import Swal from 'sweetalert2';

import '../css/user/userProfile.css'

export const UserProfile = (props) => {
    
    const [userData, setUserData] = useState({});
    const [roleData, setRoleData] = useState({});
    const [branchData, setBranchData] = useState({});
    const [companyData, setCompanyData] = useState({});
    const [currentPass, setCurrentPass] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    
    const token = sessionStorage.getItem('token-xL');
    const sessionData = parseJwt(token);

    const urlUser = `http://localhost:8080/user/${sessionData.uid}`;
    const urlBranchUser = `http://localhost:8080/branchUser/${sessionData.uid}`;
    
    const updatePassword = async(e) => {
        e.preventDefault();
        
        //check if the passwords are the same
        if (pass != passConfirm){
            Swal.fire({
                icon: 'error',
                title: 'Las contraseñas no son iguales',
                text: 'Intente de nuevo',
                confirmButtonColor: '#0d6edf'
            });
            cleanForm();
        }else{// Update password of logged user

            await axios.put(urlUser, {
                "user_name": userData.user_name,
                "user_pass": pass,
                "user_state": userData.user_state,
                "RoleId": userData.RoleId,
            },
            {
                headers: { "x-token": token }
            })
            .then( response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña actualizada correctamente',
                    footer: response.data.msg,
                    confirmButtonColor: '#0d6edf'
                })
                cleanForm();
            })
            .catch( (error) => {
                console.log(error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar la contraseña',
                    confirmButtonColor: '#0d6edf'
                })
            })
        }
    }

    const fillData = async() => {
            
        try {
            
            const userDB = await axios.get( urlUser, { headers: {"x-token": token}});
            const roleDB = await axios.get( `http://localhost:8080/role/${userDB.data.resData.RoleId}}`, { headers: {"x-token": token}});
            const branchDB = await axios.get( urlBranchUser, { headers: {"x-token": token}});
            const companyDB = await axios.get( `http://localhost:8080/company/${branchDB.data.resData.CompanyId}`, { headers: {"x-token": token}});

            setUserData(userDB.data.resData);
            setRoleData(roleDB.data.resData);
            setBranchData(branchDB.data.resData);
            setCompanyData(companyDB.data.resData);
        
        } catch (error) {
            console.log('Error al obtener informaci[on de perfil')    
        }

    }
     
    const cleanForm = () => {
        setCurrentPass('');
        setPass('');
        setPassConfirm('');
    }
    
    useEffect(() => {
        fillData();
    }, [])

    return (
    <>
        <div id='userProfile_container'>
            <h1 id='headerUserProfile' >Perfil de {sessionData.name}</h1>
            <p className='p_header'>Datos de usuario</p>
            <form id="user_form">
                <div id='userImg'>
                    <img src={`http://localhost:8080/public/${userData.user_img}`} alt="" />
                </div>
                <div id='userData' >
                    <div>
                        <label className='label'>Usuario:</label>
                        <input className='form-control text-center' type="text" name="user_name" id="" value={userData.user_name || ''} readOnly/>
                    </div>
                    <div>
                        <label >Rol:</label>
                        <input className='form-control text-center' type="text" name="role_name" id="role_name" value={roleData.role_name || ''} readOnly/>
                    </div>
                    <div>
                        <label >Empresa:</label>
                        <input className='form-control text-center' type="text" name="company_name" id="company_name" value={companyData.company_name || ''} readOnly />
                    </div>
                    <div>
                        <label >Sucursal:</label>
                        <input className='form-control text-center' type="text" name="branch_name" id="branch_name" value={branchData.branch_name || ''} readOnly/>
                    </div> 
                    <div>
                        <label >Activo desde:</label>
                        <input className='form-control text-center'type="text" name="creation_date" id="cration_date" value={userData.user_creation || ''} readOnly/>
                    </div>

                </div> 
            </form>
            <br />
                <p className='p_header'>Cambiar Contraseña</p>
            <form id='formChangePass' onSubmit={updatePassword}>
                <input className='form-control text-center' type="password" name="currentPass" id="currentPass" value={currentPass || ''} onChange={ e => setCurrentPass( e.target.value)}  placeholder='Ingrese contraseña actual' autoFocus required/>
                <input className='form-control text-center' type="password" name="pass" id="pass" value={pass || ''} onChange={ e => setPass( e.target.value)}  placeholder='Ingrese nueva contraseña' required/>
                <input className='form-control text-center' type="password" name="passConfirm" id="passConfirm" value={passConfirm || ''} onChange={ e => setPassConfirm( e.target.value)} placeholder='Confirme nueva contraseña'required/>
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </div>
    </>
  )
}