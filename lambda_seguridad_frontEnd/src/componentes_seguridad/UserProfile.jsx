import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { parseJwt } from './helpers/parseJwt';
import Swal from 'sweetalert2';

export const UserProfile = (props) => {
    
    
    const [pass, setPass] = useState('');
    const [passConfirmation, setPassConfirmation] = useState('');
    const [token, setToken] = useState(`${sessionStorage.getItem('token-xL')}`);
    const [sessionData, setSessionData] = useState({});
    const [userData, setUserData] = useState({});
    // let userData = {}
    
    const url = `http://localhost:8080/user/${sessionData.uid}`;

    const getUser = async() => {

        //fetch userData
        await axios.get(url, { headers:{ "x-token": token }}) 
        .then( res => {setUserData(res.data.user)})
        .catch(error => {throw error}) 
    }
    
    const updatePassword = async(e) => {
        e.preventDefault();

        if (pass != passConfirmation){
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
                    // props.navListUsers();
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

    const cleanForm = () => {
        setPass('');
        setPassConfirmation('');
    }
 
    useEffect(() => {
        getUser()
        setSessionData(parseJwt(token));
    }, [pass])

    return (
    <>
        <h1><center>Cambiar Contraseña de {sessionData.name}</center></h1>
        <form onSubmit={updatePassword}>
            <input type="password" name="pass" id="password1" value={pass} onChange={ e => setPass( e.target.value)} required/>
            <input type="password" name="passConfirmation" id="password2" value={passConfirmation} onChange={ e => setPassConfirmation( e.target.value)} required/>
            <button className='btn btn-primary'  >Guardar</button>
        </form>
    </>
  )
}