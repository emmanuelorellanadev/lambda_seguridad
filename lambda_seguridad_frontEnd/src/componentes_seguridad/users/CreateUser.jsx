import { useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../css/user/createUser.css'


export const CreateUser = ( ) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [state, setState] = useState(true);
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState('');
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [branches, setBranches] = useState([]);
    const [branchId, setBranchId] = useState('');
    const [userImage, setUserImage] = useState(''); 

    const saveButton = (e) => {
        e.preventDefault();
        saveUser();
        cleanForm();
    }
    
    const saveUser = async() => {
            
            const url = 'http://localhost:8080/user';
            
            const userData = new FormData(document.querySelector('#formCreateUser'));
            userData.append('img', userImage)
            userData.set('user_state', state);
            await axios.post(url, userData,
                {   
                    headers: { "x-token": sessionStorage.getItem('token-xL') }
                })
                .then( response => {
                    if (response.data.resData) {
                        Swal.fire({
                            icon: 'success',
                            title: `Usuario ${user}, guardado con exito`,
                            timer: 2000,
                            confirmButtonColor: '#0d6efd'
                        })
                    }
                })
                .catch( (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'ERROR',
                        text: 'El usuario no pudo ser guardado',
                        footer: error.response.data.name,
                        confirmButtonColor: '#0d6efd'
                    })
                })

    }

    //Fetch roles used in select
    const fetchRoles = async() => {
        const urlRole = 'http://localhost:8080/role';

        await axios(urlRole, { headers: { "x-token": sessionStorage.getItem('token-xL') } })
            .then( roles => setRoles(roles.data.resData))
            .catch(error => console.log(error))
    }
    //Fetch companies used in select
    const fetchCompanies = async() => {
        const urlCompany = 'http://localhost:8080/company';

        await axios(urlCompany, { headers: { "x-token": sessionStorage.getItem('token-xL') } })
            .then( companies => setCompanies(companies.data.resData))
            .catch(error => console.log(error))
    }
//Fetch branches used in select
    const fetchBranches = async() => {
        const url = 'http://localhost:8080/branch';

        await axios(url, { headers: { "x-token": sessionStorage.getItem('token-xL') } })
            .then( branches => setBranches(branches.data.resData))
            .catch(error => console.log(error))
    }

    const cleanForm = () => {
        setUser('');
        setPass('');
        setState(false);
        setUserImage('')
        document.getElementById('formCreateUser').reset();
    } 

    useEffect( () => {
        fetchRoles();
        fetchCompanies();
        fetchBranches();
    }, [])

    return (
        <div id='CreateUser_container'>
            <p className='p_header'>Formulario De Registro de Usuarios </p>
                <form encType='multipart/form-data' id='formCreateUser' onSubmit={saveButton}>
                        <input className='form-control text-center' type="text" name='user_name' id='user_name' value={user} placeholder='Nombre del Usuario' onChange={ (e) => setUser(e.target.value)} autoFocus required />
                        <input className='form-control text-center' type="password" name='user_pass' id='user_pass' placeholder='Contrasena' onChange={ (e) => setPass(e.target.value)} autoComplete='off' required/>
                        <select className='form-select text-center' name='RoleId' id='selectRole' onChange={ (e) => {setRoleId(e.target.value)}} required>
                            <option value="">Seleccionar Rol</option>
                                { 
                                    roles.map( (r) => {
                                        return <option value={r.id} key={r.id}>{r.role_name}</option>
                                    })
                                }
                        </select>
                        <section id='userState'>
                            <label className='form-check-label' htmlFor="estadoUsuario">Estado</label>
                            <input className='' type='checkbox' name='user_state' id='user_state' onChange={ () => setState( !state ) } checked={ state } />  
                        </section>
                        <select className='form-select text-center' id='selectCompany' onChange={ (e) => {setSelectedCompany(e.target.value)}} required disabled>
                            {/* <option value="">selecciona Empresa</option> */}
                                { 
                                    companies.map( (c) => {
                                        return <option value={c.id} key={c.id}>{c.company_name}</option>
                                    })
                                }
                        </select>
                        <select className='form-select text-center' name='BranchId' id='selectBranch' onChange={ (e) => {setBranchId(e.target.value)}} required>
                            <option value="">Seleccionar Sucursal</option>
                                { 
                                    branches.map( (b) => {
                                        return <option value={b.id} key={b.id}>{b.branch_name}</option>
                                    })
                                }
                        </select>
                        <section id='uploadUserImg'>
                            <label htmlFor="img" id='labelImg'>Subir imágen</label>
                            <input className='form-control' type="file" name="img" id="img" value={ userImage } onChange={ (e) => setUserImage(e.target.value)}/>
                        </section>
                    <center>
                        <button id='saveButton' className='btn btn-primary'>Guardar Usuario</button>
                    </center>
                 </form>
        </div>
    )
}