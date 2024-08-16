import React, { useEffect, useState } from 'react'
import { parseJwt } from '../helpers/parseJwt';

import '../../css/user/userProfile.css'
import { P_Head } from '../ui/P_Head';
import { useUserProfile } from './hooks/useUserProfile';
import { useGetRole } from '../roles/hooks/useGetRole';
import { useGetBranchUser } from '../hooks/useGetBranchUser';
import { useGetCompany } from '../companies/hooks/useGetCompany';
import { Toaster } from 'react-hot-toast';
import { useUpdatePass } from './hooks/useUpdatePass';

export const UserProfile = () => {
    
    const sessionData = parseJwt(sessionStorage.getItem('token-xL'));
    const [userName, setUserName] = useState("");
    const [userCreation, setUserCreation] = useState("");
    const [userImg, setUserImg] = useState("");
    const [roles, setRoles] = useState("");
    const [branchData, setBranchData] = useState([])
    const [companies, setCompanies] = useState([])
    const [currentPass, setCurrentPass] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [nextPage, setNextPage] = useState({});
    const [prevPage, setPrevPage] = useState({});
    const [onLoad, setOnLoad] = useState(true);    
    
    const updatePassword = async(e) => {
        e.preventDefault();
        const urlUser = `http://localhost:8080/changePassword/${sessionData.uid}`;
        useUpdatePass(urlUser, pass, passConfirm, currentPass);
        cleanForm();
    }
     
    const cleanForm = () => {
        setCurrentPass('');
        setPass('');
        setPassConfirm('');
    }
    
    useEffect(() => {
        const urlUser = `http://localhost:8080/user/${sessionData.uid}`;
        const urlRole = `http://localhost:8080/role/${sessionData.role}`;
        const urlBranchUser = `http://localhost:8080/branchUser/${sessionData.uid}`;
        const urlCompany = `http://localhost:8080/company/1`
        useUserProfile(urlUser, { setUserName, setUserCreation, setUserImg });
        useGetRole(urlRole, { setRoles, setPrevPage, setNextPage });
        useGetBranchUser(urlBranchUser, {setBranchData});
        useGetCompany(urlCompany, {setCompanies, setNextPage, setPrevPage, setOnLoad})
    }, [onLoad])

    return (
    <>
        <div id='userProfile_container'>
            <h1 className='p_h1' id='headerUserProfile' >Perfil de {sessionData.name ? sessionData.name : ''}</h1>
                <P_Head className='p_h3' text="Datos de Usuario" />
            <form id="user_form">
                <div id='userImg'>
                    <img src={`http://localhost:8080/public/${userImg}`} alt="" />
                </div>
                <div id='userData' >
                    <div>
                        <label className='label'>Usuario:</label>
                        <input className='form-control text-center' type="text" name="user_name" id="" value={userName || ''} readOnly/>
                    </div>
                    <div>
                        <label >Rol:</label>
                        <input className='form-control text-center' type="text" name="role_name" id="role_name" value={roles.role_name|| ''} readOnly/>
                    </div>
                    <div>
                        <label >Empresa:</label>
                        <input className='form-control text-center' type="text" name="company_name" id="company_name" value={companies.company_name || ''} readOnly />
                    </div>
                    <div>
                        <label >Sucursal:</label>
                        <input className='form-control text-center' type="text" name="branch_name" id="branch_name" value={branchData.branch_name || ''} readOnly/>
                    </div> 
                    <div>
                        <label >Activo desde:</label>
                        <input className='form-control text-center'type="text" name="creation_date" id="cration_date" value={userCreation || ''} readOnly/>
                    </div>

                </div> 
            </form>
                <P_Head className='p_h3' text="Cambiar Contraseña" />
            <form id='formChangePass' onSubmit={updatePassword}>
                <input className='form-control text-center' type="password" name="currentPass" id="currentPass" value={currentPass || ''} onChange={ e => setCurrentPass( e.target.value)}  placeholder='Ingrese contraseña actual' autoFocus required/>
                <input className='form-control text-center' type="password" name="pass" id="pass" value={pass || ''} onChange={ e => setPass( e.target.value)}  placeholder='Ingrese nueva contraseña' required/>
                <input className='form-control text-center' type="password" name="passConfirm" id="passConfirm" value={passConfirm || ''} onChange={ e => setPassConfirm( e.target.value)} placeholder='Confirme nueva contraseña'required/>
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </div>
        <Toaster/>
    </>
  )
}