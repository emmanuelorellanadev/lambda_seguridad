import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { parseJwt } from './helpers/parseJwt';
import Swal from 'sweetalert2';

import './css/userProfile.css'

export const UserProfile = (props) => {
    
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [userData, setUserData] = useState({});
    
    const token = sessionStorage.getItem('token-xL');
    const sessionData = parseJwt(token);
    const url = `http://localhost:8080/user/${sessionData.uid}`
    
    
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

            await axios.put(url, {
                "user_name": userData.user_name,
                "user_password": pass,
                "user_status": userData.user_status,
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
                cleanForm()
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
        
    const getUser = async() => {
        //fetch userData
        await axios.get(url, { headers:{ "x-token": token }}) 
            .then( async res => {setUserData(res.data.user)})
            .catch(error => { console.log(error)})
        }
    
    const cleanForm = () => {
        setPass('');
        setPassConfirm('');
    }
        
    useEffect(() => {
        getUser();
    }, [])

    return (
    <>
        <div id='userProfileContainer'>
            <h1 id='headerUserProfile' >Perfil de {sessionData.name}</h1>
            <form id='formChangePass' onSubmit={updatePassword}>
                <input className='form-control text-center' type="password" name="pass" id="pass" value={pass} onChange={ e => setPass( e.target.value)}  placeholder='Ingrese nueva contraseña' autoFocus required/>
                <input className='form-control text-center' type="password" name="passConfirm" id="passConfirm" value={passConfirm} onChange={ e => setPassConfirm( e.target.value)} placeholder='Confirme nueva contraseña'required/>
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </div>
    </>
  )
}