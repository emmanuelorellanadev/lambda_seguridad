import React, {useState, useEffect}from 'react';
import axios from'axios';
import Swal from 'sweetalert2';

import '../../css/user/user.css';
import {P_Head} from'../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useUpdateUser } from './hooks/useUpdateUser';
import { Toaster } from 'react-hot-toast';
import { useGetRole } from '../roles/hooks/useGetRole';
import { useGetUserByBranch } from './hooks/useGetUsersByBranch';
import { useGetCompany } from '../companies/hooks/useGetCompany';
import { useGetUser } from './hooks/useGetUser';
import { useGetBranch } from '../branches/hooks/useGetBranch';

export const UpdateUser = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [state, setState] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState('');
    const [companies, setCompanies] = useState([]);
    const [companyId, setCompanyId] = useState('1');
    const [branches, setBranches] = useState([]);
    const [branchId, setBranchId] = useState('');

    const updateButton = (e) => {
        e.preventDefault();
        const urlUser = `http://localhost:8080/user/${props.userToEdit}`;
        useUpdateUser(urlUser, state, props);
    }

    const fetchCompanyId = async() => {
        const url = `http://localhost:8080/BranchUser/${props.userToEdit}`;

        await axios(url, { headers: {"x-token": sessionStorage.getItem('token-xL')}} )
            .then( resp => setBranchId(resp.data.resData.id))
            .catch( error => console.log( error ))
    }

    const fetchBranchId = async() => {
        const url = `http://localhost:8080/BranchUser/${props.userToEdit}`

        await axios(url, { headers: {"x-token": sessionStorage.getItem('token-xL')}} )
            .then( resp => setBranchId(resp.data.resData.id))
            .catch( error => console.log( error ))
    }

    const fillFields = (userData) => {
        setUser( userData.user_name );
        setPass( userData.user_pass );
        setRoleId( userData.RoleId );
        setState( userData.user_state );
    }

    const erasePassword = () => {
        setPass('');
    }

    useEffect( () => {
        const urlRole = 'http://localhost:8080/role/'
        const urlUser = `http://localhost:8080/user/${props.userToEdit}`;
        const urlCompany = 'http://localhost:8080/company/';
        const urlBranch = 'http://localhost:8080/branch/';
        useGetRole(urlRole, {setRoles});
        useGetUser(urlUser, {fillFields})
        useGetCompany(urlCompany, {setCompanies});
        useGetBranch(urlBranch, {setBranches})
        fetchBranchId();
        fetchCompanyId();
    }, [])

  return (
      <div id='user_container'>
        <P_Head className="p_h1" text={'Actualizar Usuario'}/>
        <form encType='multipart/form-data' className='user_form' id='UpdateUser_form' onSubmit={updateButton}>
            <div>
                <Label text="Usuario:" lambdaClassLabel={""} />
                <Input lambdaClassInput={""} name='user_name' id='userName' type="text" value={user} onChange={ (e) => setUser(e.target.value)} required />
            </div>
            <div>
                <Label text="Contraseña:" lambdaClassLabel={""}/>
                <Input lambdaClassInput={""} name='user_pass' id='userPassword' type="password" value={pass} autoComplete='off' onChange={ (e) => setPass(e.target.value)} onClick={ (e) => erasePassword()} required/>
            </div>
            <div>
                <Label text="Rol:" lambdaClassLabel={""}/>
                <Select data={roles} name='RoleId' id='selectRole' value={roleId} onChange={ (e) => {setRoleId(e.target.value)}} required/>
            </div>
            <div id='userState'>
                <Label text="Estado:" lambdaClassLabel={""}/>
                <Input lambdaClassInput={""} type='checkbox' name='user_state' id='userState' onChange={ () => setState( !state ) } checked={ state } />  
            </div>
            <div>
                <Label text="Empresa:" lambdaClassLabel={""}/>
                <Select data={companies} className='form-select text-center' id='selectCompany' value={companyId} onChange={ (e) => {setCompanyId(e.target.value)}} required disabled />
            </div>
            <div>
                <Label text="Sucursal:" lambdaClassLabel={""}/>
                <Select data={branches} name='BranchId' id='selectBranch' value={ branchId } onChange={ (e) => {setBranchId(e.target.value)}} required />
            </div>
            <section>
                <P_Head className="p_h3" text={'Cambiar Imágen'}/>
                <Input lambdaClassInput={""} type="file" name="img" id="imgUser" value={ userImage } onChange={ (e) => setUserImage(e.target.value)}/>
            </section>
            <div className='sendUser_button'>
                <button className='btn btn-primary'>Actualizar Usuario</button>
            </div>
         </form>
         <Toaster/>
</div>
  )
}
