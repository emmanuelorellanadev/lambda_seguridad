import React, { useState } from'react'

import '../../css/login.css'
import login from'../../assets/img/login.png'
import { NavBar } from'../NavBar_components/NavBar.jsx'
import { Toaster } from 'react-hot-toast';
import { useLogin } from './hook/useLogin.js';

export const Login = () => {

    const [isUser, setIsUser] = useState(false);
    const [user, setUser] = useState('emmanuel');
    const [pass, setPass] = useState('pass');

    const loginButton = async(e) => {
        e.preventDefault();
        const urlAuth = 'http://localhost:8080/auth'
        useLogin(urlAuth, user, pass, {setIsUser})
        cleanAll();
    }
    
    const cleanAll = (e) => {
        setUser('');
        setPass('');
    }

  return (
    <>
        <div id="login_container">
            <div id='login'>
                <div id='loginHeader'>
                      <img src={login} alt="" />  
                </div>
                <div id='loginBody'>
                    <form id='loginForm' onSubmit={ e => loginButton(e)}>
                        <input className='form-control text-center' type="text" name="user" id="user" value={user} placeholder='Usuario' onChange={ (e) => setUser(e.target.value) } autoFocus required/>
                        <input className='form-control text-center' type="password" name="password" id="password" value={pass} placeholder='Contrasena' onChange={ (e) => setPass(e.target.value)} required />
                        <input type='submit' className='btn btn-primary btn-lg' value='Ingresar'/>
                    </form>
                </div>   
            </div>
        </div>
        <Toaster/>
        { isUser === true && < NavBar />}
    </>
  )
}
