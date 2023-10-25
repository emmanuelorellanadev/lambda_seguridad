import React, {useState, useEffect}from 'react';
import axios from'axios';
import Swal from 'sweetalert2';

import '../css/user/updateUser.css';

export const UpdateUser = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [state, setState] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState('');
    const [companies, setCompanies] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [branches, setBranches] = useState([]);
    const [branchId, setBranchId] = useState('');

    const updateButton = (e) => {
        e.preventDefault();
        updateUser();        
    }

    const updateUser = async() => {
    const url = `http://localhost:8080/user/${props.userToEdit}`;

    const userData = new FormData(document.querySelector('#formUpdateUser'));

    userData.set('user_state', state)
    userData.append('img', userImage)

    await axios.put(url, 
        userData,
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

    //Fetch companies used in select
    const fetchCompanies = async() => {
        const url = 'http://localhost:8080/company';

        await axios(url, {
            headers: { "x-token": sessionStorage.getItem('token-xL') }
            })
            .then( companies => setCompanies(companies.data.companies))
            .catch(error => console.log(error))
    }
//Fetch branches used in select
    const fetchBranches = async() => {
        const url = 'http://localhost:8080/branch';

        await axios(url, {
            headers: { "x-token": sessionStorage.getItem('token-xL') }
            })
            .then( branches => setBranches(branches.data.branches))
            .catch(error => console.log(error))
    }

    //WORK HERE
    //you need to show the branches depending on the selected company

    const fetchCompanyId = async() => {
        const url = `http://localhost:8080/BranchUser/${props.userToEdit}`

        await axios(url, { headers: {"x-token": sessionStorage.getItem('token-xL')}} )
            .then( resp => resp.data.branchData)
            .then( branchData => setBranchId( branchData.id ) )
            .catch( error => console.log( error ))
    }

    const fetchBranchId = async() => {
        const url = `http://localhost:8080/BranchUser/${props.userToEdit}`

        await axios(url, { headers: {"x-token": sessionStorage.getItem('token-xL')}} )
            .then( resp => resp.data.branchData)
            .then( branchData => setBranchId( branchData.id ) )
            .catch( error => console.log( error ))
    }

    const fillFields = (userData) => {
        setUser( userData.user_name );
        setPass( userData.user_pass );
        setRoleId( userData.RoleId );
        setState( userData.user_state );
    }

    useEffect( () => {
        fetchRoles();
        searchUserToEdit();
        fetchCompanies();
        fetchBranches();
        fetchBranchId();
    }, [])

  return (
      <div id='updateUser-container'>
    <center> <h2> Actualizacion </h2> </center>
        <br />
        

        <form encType='multipart/form-data' id='formUpdateUser' onSubmit={updateButton}>
            <input className='form-control text-center' name='user_name' id='userName' type="text" value={user} onChange={ (e) => setUser(e.target.value)} required />
            <input className='form-control text-center' name='user_pass' id='userPassword' type="password" value={pass} autoComplete='off' onChange={ (e) => setPass(e.target.value)} required/>
            <select className='form-select text-center' name='RoleId' id='selectRole' value={roleId} onChange={ (e) => {setRoleId(e.target.value)}} required>
                <option value="">selecciona Opcion</option>
                    { 
                        roles.map( (r) => {
                            return <option value={r.id} key={r.id} >{r.role_name} </option>
                        })
                    }
            </select>
            <div id='userState'>
                <label className='' htmlFor="user_state">Estado</label>
                <input className='' type='checkbox' name='user_state' id='userState' onChange={ () => setState( !state ) } checked={ state } />  
            </div>
            <select className='form-select text-center' id='selectCompany' value={companyId} onChange={ (e) => {setCompanyId(e.target.value)}} required disabled>
                        {/* <option value="">selecciona Empresa</option> */}
                            { 
                                companies.map( (c) => {
                                    return <option value={c.id} key={c.id}>{c.company_name}</option>
                                })
                            }
                    </select>
                    <select className='form-select text-center' name='BranchId' id='selectBranch' value={ branchId } onChange={ (e) => {setBranchId(e.target.value)}} required>
                        <option value="">selecciona Sucursal</option>
                            { 
                                branches.map( (b) => {
                                    return <option value={b.id} key={b.id}>{b.branch_name}</option>
                                })
                            }
                    </select>
            <input type="file" name="img" id="img" value={ userImage } onChange={ (e) => setUserImage(e.target.value)}/>
            <button id='btnGuardar' className='btn btn-primary'>Guardar Datos</button>
         </form>
</div>
  )
}
