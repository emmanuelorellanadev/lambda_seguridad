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
import { useGetRole } from '../roles/hooks/useGetRole';
import { useGetCompany } from '../companies/hooks/useGetCompany';
import { useGetBranch } from '../branches/hooks/useGetBranch';


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
    const [onLoad, setOnLoad] = useState(true);
    const [nextPage, setNextPage] = useState({});
    const [prevPage, setPrevPage] = useState({});

    const saveButton = (e) => {
        e.preventDefault();
        const urlUser = 'http://localhost:8080/user/';
        useCreateUser(urlUser, userImage, state, {setOnLoad});
        cleanForm();
    }
    
    const cleanForm = () => {
        setUser('');
        setPass('');
        setState(true);
        setUserImage('')
        document.getElementById('formCreateUser').reset();
    } 

    useEffect( () => {
        const urlRole = 'http://localhost:8080/role/';
        const urlCompany = 'http://localhost:8080/company/';
        const urlBranch = 'http://localhost:8080/branch/';
        useGetRole(urlRole, {setRoles, setNextPage, setPrevPage});
        useGetCompany(urlCompany, {setCompanies, setNextPage, setPrevPage, setOnLoad});
        useGetBranch(urlBranch, {setBranches, setNextPage, setPrevPage});
    }, [onLoad])

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
                            <Select data={roles.data} text="Selecciona Rol" name='RoleId' id='selectRole' onChange={ (e) => {setRoleId(e.target.value)}} required />
                        </div>
                        <div>
                            <Label lambdaClassLabel={""} text="Estado"/>
                            <Input lambdaClassInput={""} type="checkbox" name='user_state' id='user_state' onChange={ () => setState( !state ) } checked={ state } />  
                        </div>
                        <div>
                        <Label lambdaClassLabel={""} text="Empresa:"/>
                        <Select data={companies.data} value="1" id='selectCompany' onChange={ (e) => {setSelectedCompany(e.target.value)}} required disabled />
                        </div>
                        <div>
                        <Label lambdaClassLabel={""} text="Sucursal:"/>
                        <Select data={branches.data} text="Selecciona Sucursal" name='BranchId' id='selectBranch' onChange={ (e) => {setBranchId(e.target.value)}} required />
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