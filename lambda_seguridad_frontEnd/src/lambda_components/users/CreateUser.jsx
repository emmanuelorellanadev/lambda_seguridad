import { useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../css/user/user.css';
import {P_Head} from'../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useCreateUser } from './hooks/useCreateUser';
import { Toaster } from 'react-hot-toast';


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
    const [onLoad, setOnLoad] = useState(true)

    const saveButton = (e) => {
        e.preventDefault();
        const urlUser = 'http://localhost:8080/user/';
        useCreateUser(urlUser, userImage, state, {setOnLoad});
        // cleanForm();
    }


    //WORK HERE!!
// intentar usar onLoad para limpiar campos
    

//Fetch roles used in select
    const fetchRoles = async() => {
        const urlRole = 'http://localhost:8080/role/';

        await axios(urlRole, { headers: { "x-token": sessionStorage.getItem('token-xL') } })
            .then( roles => setRoles(roles.data.resData))
            .catch(error => console.log(error))
    }
    //Fetch companies used in select
    const fetchCompanies = async() => {
        const urlCompany = 'http://localhost:8080/company/';

        await axios(urlCompany, { headers: { "x-token": sessionStorage.getItem('token-xL') } })
            .then( companies => setCompanies(companies.data.resData))
            .catch(error => console.log(error))
    }
//Fetch branches used in select
    const fetchBranches = async() => {
        const url = 'http://localhost:8080/branch/';

        await axios(url, { headers: { "x-token": sessionStorage.getItem('token-xL') } })
            .then( branches => setBranches(branches.data.resData))
            .catch(error => console.log(error))
    }

    // const cleanForm = () => {
    //     setUser('');
    //     setPass('');
    //     setState(true);
    //     setUserImage('')
    //     document.getElementById('formCreateUser').reset();
    // } 

    useEffect( () => {
        fetchRoles();
        fetchCompanies();
        fetchBranches();
    }, [])

    return (
        <div id='user_container'>
            <P_Head className="p_h1" text={'Registrar nuevo Usuario'}/>
                <form className='user_form' encType='multipart/form-data' id='formCreateUser' onSubmit={saveButton}>
                        <div>
                            <Label lambdaClassLabel={""} text="Usuario:"/>
                            <Input lambdaClassInput={""} type="text" name='user_name' id='user_name' value={user} placeholder='Nombre del Usuario' onChange={ (e) => setUser(e.target.value)} autoFocus required />
                        </div>
                        <div>
                            <Label lambdaClassLabel={""} text="Contraseña:"/>
                            <Input lambdaClassInput={""} type="password" name='user_pass' id='user_pass' placeholder='Contrasena' onChange={ (e) => setPass(e.target.value)} autoComplete='off' required/>

                        </div>
                        <div>
                            <Label lambdaClassLabel={""} text="Rol:"/>
                            <Select data={roles} text="Selecciona Rol" name='RoleId' id='selectRole' onChange={ (e) => {setRoleId(e.target.value)}} required />
                        </div>
                        <div>
                            <Label lambdaClassLabel={""} text="Estado"/>
                            <Input lambdaClassInput={""} type="checkbox" name='user_state' id='user_state' onChange={ () => setState( !state ) } checked={ state } />  
                        </div>
                        <div>
                        <Label lambdaClassLabel={""} text="Empresa:"/>
                        <Select data={companies} value="1" id='selectCompany' onChange={ (e) => {setSelectedCompany(e.target.value)}} required disabled />
                        </div>
                        <div>
                        <Label lambdaClassLabel={""} text="Sucursal:"/>
                        <Select data={branches} text="Selecciona Sucursal" name='BranchId' id='selectBranch' onChange={ (e) => {setBranchId(e.target.value)}} required />
                        </div>
                        <section id='uploadUserImg'>
                        <P_Head className="p_h3" text={'Subir Imágen'}/>
                            <Input lambdaClassInput={""} type="file" name="img" id="img" value={ userImage } onChange={ (e) => setUserImage(e.target.value)}/>
                        </section>
                    <div className='User_button'>
                        <button className={'btn btn-primary'} id='saveButton'>Guardar</button>
                    </div>
                 </form>
                 <Toaster/>
        </div>
    )
}