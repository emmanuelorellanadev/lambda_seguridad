import React, { useState } from'react'
import axios from'axios';
import Swal from'sweetalert2';

import './css/login.css'
import login from'../assets/img/login.png'
import { NavBar } from'./NavBar_components/NavBar'
import { parseJwt } from './helpers/parseJwt.js';

export const Login = () => {

    const [isUser, setIsUser] = useState(false);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const loginController = async(e) => {
        e.preventDefault();

        const url = 'http://localhost:8080/auth'
    
        const userData = await axios.post(url, { 'name': user, 'pass': pass })
                .then( res => res.data)
                .catch( error => {console.log(error); Swal.fire({ 
                    icon:'error', 
                    title: 'Acceso denegado', 
                    text: `Error en usuario y/o contraseña`, 
                    timer: 3000,
                    footer: `${ error.response.data.error }`,
                    confirmButtonColor: '#0d6efd'
                    
                })})
                
        //check if the userData
        if( !userData ) {
            setIsUser(false);
            e.target.user.focus()
            cleanAll(e);
        }else{
            //save data user on browser
            
            const sessionData = parseJwt(userData.token);
            
            sessionStorage.setItem(`token-xL`, userData.token);
            sessionStorage.setItem(`user-xL`, sessionData.name);
            sessionStorage.setItem('role-xL', sessionData.role);
            sessionStorage.setItem('uid-xL', userData.uid)

            setIsUser(true);
            cleanAll(e);
            document.getElementById('login-container').style.display = 'none';
        }
    }
    
    const cleanAll = (e) => {
        setUser('');
        setPass('');
    }

  return (
    <>
        <div id="login-container">
            <div id='login'>
                <div id='loginHeader'>
                      <img src={login} alt="" />  
                </div>
                <div id='loginBody'>
                    <form id='loginForm' onSubmit={ e => loginController(e)}>
                        <input className='form-control form-control-lg text-center' type="text" name="user" id="user" value={user} placeholder='Usuario' onChange={ (e) => setUser(e.target.value) } autoFocus required/>
                        <input className='form-control form-control-lg text-center' type="password" name="password" id="password" value={pass} placeholder='Contrasena' onChange={ (e) => setPass(e.target.value)} required />
                        <input type='submit' className='btn btn-primary btn-lg' value='Ingresar'/>
                    </form>
                </div>   
            </div>
        </div>
        { isUser === true && < NavBar />}
    </>
  )
}
