import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import './css/createUser.css'


export const CreateUser = ( ) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [state, setState] = useState(false);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('')

    const saveButton = (e) => {
        e.preventDefault();
        saveUser();
        cleanForm();
    }
    
    const saveUser = async() => {
        const url = 'http://localhost:8080/user';

        await axios.post(url, {
            "user_name": user,
            "user_password": pass, 
            "user_status": state, 
            "RoleId": selectedRole
            },
            {   
                headers: { "x-token": sessionStorage.getItem('token-xL') }
            })
            .then( response => {
                if (response.data.user_name) {
                    Swal.fire({
                        icon: 'success',
                        title: `Usuario ${response.data.user_name}, guardado con exito`,
                        footer: response.data.msg,
                        confirmButtonColor: '#0d6efd'
                    })
                }else{console.log(response);}
            })
            .catch( (error) => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'El usuario no pudo ser guardado',
                    footer: error.response.data.error.name,
                    confirmButtonColor: '#0d6efd'
                })
            })
    }

    //Fetch roles used in select
    const fetchRoles = async() => {
        const url = 'http://localhost:8080/role';

        await axios(url, {
            headers: { "x-token": sessionStorage.getItem('token-xL') }
            })
            .then( roles => setRoles(roles.data.roles))
            .catch(error => console.log(error))
    }

    const cleanForm = () => {
        setUser('');
        setPass('');
        setState(false);
        document.getElementById('formCreateUser').reset();
    } 

    useEffect( () => {
        fetchRoles();
    }, [])

    return (
        <div id='createUser-container'>
            <center> <h2>Formulario De Registro de Usuarios </h2> </center>
                <br />

                <form id='formCreateUser' onSubmit={saveButton}>
                    
                    <input className='form-control text-center' type="text" name='user' value={user} placeholder='Nombre del Usuario' onChange={ (e) => setUser(e.target.value)} autoFocus required />
                    <input className='form-control text-center' type="password" name='pass' placeholder='Contrasena' onChange={ (e) => setPass(e.target.value)} autoComplete='off' required/>
                    <select className='form-select text-center' id='selectRole' onChange={ (e) => {setSelectedRole(e.target.value)}} required>
                        <option value="">selecciona Opcion</option>
                            { 
                                roles.map( (r) => {
                                    return <option value={r.id} key={r.id}>{r.role_name}</option>
                                })
                            }
                    </select>
                    <section id='userState'>
                        <label className='' htmlFor="estadoUsuario">Estado</label>
                        <input className='' type='checkbox' id='estadoUsuario' onChange={ () => setState( !state ) } checked={ state } />  
                    </section>
                    <button id='saveButton' className='btn btn-primary'>Guardar Usuario</button>
                 </form>
        </div>
    )
}