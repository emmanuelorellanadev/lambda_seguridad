import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { parseJwt } from '../helpers/parseJwt';
import Swal from 'sweetalert2';

import '../css/user/userProfile.css'

export const UserProfile = (props) => {
    
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [currentPass, setCurrentPass] = useState('');
    const [userData, setUserData] = useState({});
    const [roleData, setRoleData] = useState({});
    const [branchData, setBranchData] = useState({});
    const [companyData, setCompanyData] = useState({});
    
    const token = sessionStorage.getItem('token-xL');
    const sessionData = parseJwt(token);
    const urlUser = `http://localhost:8080/user/${sessionData.uid}`;
    const urlRole = `http://localhost:8080/role/${userData.RoleId}`;
    const urlBranchUser = `http://localhost:8080/branchUser/${sessionData.uid}`;
    const urlCompany = `http://localhost:8080/company/${branchData.CompanyId}`;
    
    
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

    const fillData = () => {
    
        axios.get(urlUser, { headers:{ "x-token": token }}) 
            .then( user => {
                setUserData(user.data.resData);
                return axios.get(urlRole, { headers:{ "x-token": token }});
            })
            .then( role => {
                setRoleData( role.data.resData);
                return axios.get(urlBranchUser, { headers:{ "x-token": token }});
            })
            .then( branch => {
                setBranchData(branch.data.resData);
                return axios.get(urlCompany, { headers:{ "x-token": token }});
            })
            .then( company => {
                setCompanyData(company.data.resData);
            })
            .catch(error => { console.log(error)})
    }
     
    const cleanForm = () => {
        setPass('');
        setPassConfirm('');
    }
    
    useEffect(() => {
        fillData();
    }, [])

    return (
    <>
        <div id='userProfileContainer'>
            <h1 id='headerUserProfile' >Perfil de {sessionData.name}</h1>
            <div id='user'>
                <div id='userImg'>
                    <img src={`http://localhost:8080/public/${userData.user_img}`} alt="" />
                </div>
                <div id='userData' >
                    <div>
                        <label htmlFor="user_name">Usuario:</label>
                        <input type="text" name="user_name" id="user_name" value={userData.user_name} readOnly/>
                    </div>
                    <div>
                    <label htmlFor="role_name">Rol:</label>
                    <input type="text" name="role_name" id="role_name" value={roleData.role_name} readOnly/>
                    </div>
                    <div>
                    <label htmlFor="company_name">Empresa:</label>
                    <input type="text" name="company_name" id="company_name" value={companyData.company_name} readOnly />
                    </div>
                    <div>
                    <label htmlFor="branch_name">Sucursal:</label>
                    <input type="text" name="branch_name" id="branch_name" value={branchData.branch_name} readOnly/>
                    </div>
                    <div>
                    <label htmlFor="creation_date">Activo desde:</label>
                    <input type="text" name="creation_date" id="cration_date" value={userData.user_creation} readOnly/>
                    </div>
                </div>
            </div>
            <form id='formChangePass' onSubmit={updatePassword}>
                <label htmlFor=""><center>CAMBIAR CONTRASEÑA</center></label>
                <input className='form-control text-center' type="password" name="currentPass" id="currentPass" value={currentPass} onChange={ e => setCurrentPass( e.target.value)}  placeholder='Ingrese contraseña actual' autoFocus required/>
                <input className='form-control text-center' type="password" name="pass" id="pass" value={pass} onChange={ e => setPass( e.target.value)}  placeholder='Ingrese nueva contraseña' required/>
                <input className='form-control text-center' type="password" name="passConfirm" id="passConfirm" value={passConfirm} onChange={ e => setPassConfirm( e.target.value)} placeholder='Confirme nueva contraseña'required/>
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </div>
    </>
  )
}