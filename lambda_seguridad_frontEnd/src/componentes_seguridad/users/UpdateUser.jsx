import React, {useState, useEffect}from 'react';
import axios from'axios';
import Swal from 'sweetalert2';

import '../css/user/updateUser.css';

export const UpdateUser = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [state, setState] = useState(false);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('')

    const updateButton = (e) => {
        e.preventDefault();
        updateUser();        
    }

    const updateUser = async() => {

    const url = `http://localhost:8080/user/${props.userToEdit}`;

    await axios.put(url, {
        "user_name": user, 
        "user_password": pass, 
        "user_status": state, 
        "RoleId": selectedRole,
    },
    {
        headers: { "x-token": sessionStorage.getItem('token-xL') 
    }})
        .then( response => {
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado correctamente',
                footer: response.data.msg,
                confirmButtonColor: '#0d6edf'

            })
            props.navListUsers();
        })
        .catch( (error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el usuario',
                footer: error.response.data.error.name,
                confirmButtonColor: '#0d6edf'
            })
        })
    }

    //Fetch roles user in select
    const fetchRoles = async() => {
        const url = 'http://localhost:8080/role';

        await axios(url, {
            headers: { "x-token": sessionStorage.getItem('token-xL') }
            })
            .then( roles => setRoles(roles.data.roles))
            .catch(error => console.log(error))
    }

    const searchUserToEdit = async() => {
        const url = `http://localhost:8080/user/${props.userToEdit}`;

        await axios.get(url, {
            headers: { "x-token": sessionStorage.getItem('token-xL')},
            // params: {id: props.userToEdit}// req.query
        })
            .then( res => res.data.user )
            .then( userData => fillFields(userData) )
            .catch(error => console.log(error))
    }   

    const fillFields = (userData) => {
        
        setUser( userData.user_name )
        setPass( userData.user_password )
        setSelectedRole( userData.RoleId)
        setState( userData.user_status )
    }

    useEffect( () => {
        fetchRoles();
        searchUserToEdit();
    }, [])


  return (
      <div id='updateUser-container'>
    <center> <h2> Actualizacion </h2> </center>
        <br />
        

        <form id='formUpdateUser' onSubmit={updateButton}>
            <input className='form-control text-center' id='userName' type="text" value={user} onChange={ (e) => setUser(e.target.value)} required />
            <input className='form-control text-center' id='userPassword' type="password" value={pass} autoComplete='off' onChange={ (e) => setPass(e.target.value)} required/>
            <select className='form-select text-center' id='selectRole' value={selectedRole} onChange={ (e) => {setSelectedRole(e.target.value)}} required>
                <option value="">selecciona Opcion</option>
                    { 
                        roles.map( (r) => {
                            return <option value={r.id} key={r.id} >{r.role_name} </option>
                        })
                    }
            </select>
            <div id='userState'>
                <label className='' htmlFor="userState">Estado</label>
                <input className='' name='userState' type='checkbox' id='userStatus' onChange={ () => setState( !state ) } checked={ state } />  
            </div>
            <button id='btnGuardar' className='btn btn-primary'>Guardar Datos</button>
         </form>
</div>
  )
}
