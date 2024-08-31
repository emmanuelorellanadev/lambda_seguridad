import React, {useState, useEffect}from 'react';

import '../../css/user/user.css';
import {P_Head} from'../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useUpdateUser } from './hooks/useUpdateUser';
import { Toaster } from 'react-hot-toast';
import { useGetRole } from '../roles/hooks/useGetRole';
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
    const [nextPage, setNextPage] = useState({});
    const [prevPage, setPrevPage] = useState({});

    const updateButton = (e) => {
        e.preventDefault();
        const urlUser = `http://localhost:8080/user/${props.userToEdit}`;
        useUpdateUser(urlUser, state, props);
    }

    const erasePassword = () => {
        setPass('');
    }

    useEffect( () => {
        const urlRole = 'http://localhost:8080/role/'
        const urlUser = `http://localhost:8080/user/${props.userToEdit}`;
        const urlCompany = 'http://localhost:8080/company/';
        const urlBranch = 'http://localhost:8080/branch/';
        useGetRole(urlRole, {setRoles, setNextPage, setPrevPage});
        useGetUser(urlUser, {setUser, setPass, setRoleId, setState, setBranchId, setPrevPage, setNextPage})
        useGetCompany(urlCompany, {setCompanies, setNextPage, setPrevPage});
        useGetBranch(urlBranch, {setBranches, setNextPage, setPrevPage})
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
                <Select data={roles.data} name='RoleId' id='selectRole' value={roleId} onChange={ (e) => {setRoleId(e.target.value)}} required/>
            </div>
            <div id='userState'>
                <Label text="Estado:" lambdaClassLabel={""}/>
                <Input lambdaClassInput={""} type='checkbox' name='user_state' id='userState' onChange={ () => setState( !state ) } checked={ state } />  
            </div>
            <div>
                <Label text="Empresa:" lambdaClassLabel={""}/>
                <Select data={companies.data} className='form-select text-center' id='selectCompany' value={companyId} onChange={ (e) => {setCompanyId(e.target.value)}} required disabled />
            </div>
            <div>
                <Label text="Sucursal:" lambdaClassLabel={""}/>
                <Select data={branches.data} name='BranchId' id='selectBranch' value={ branchId } onChange={ (e) => {setBranchId(e.target.value)}} required />
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
