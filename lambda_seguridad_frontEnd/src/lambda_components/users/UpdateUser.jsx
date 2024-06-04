import React, {useState, useEffect}from 'react';
import axios from'axios';
import Swal from 'sweetalert2';

import '../../css/user/user.css';
import {P_Head} from'../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

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
        updateUser();        
    }

    const updateUser = async() => {
    const url = `http://localhost:8080/user/${props.userToEdit}`;

    const userData = new FormData(document.querySelector('#UpdateUser_form'));

    userData.set('user_state', state)
    // userData.append('img', userImage)

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
                timer: 2500,
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
            .then( roles => setRoles(roles.data.resData))
            .catch(error => console.log(error))
    }

    const searchUserToEdit = async() => {
        const url = `http://localhost:8080/user/${props.userToEdit}`;

        await axios.get(url, {
            headers: { "x-token": sessionStorage.getItem('token-xL')},
            // params: {id: props.userToEdit}// req.query
            })
            .then( res => res.data.resData )
            .then( userData => fillFields(userData) )
            .catch(error => console.log(error))
    }   

    //Fetch companies used in select
    const fetchCompanies = async() => {
        const url = 'http://localhost:8080/company';

        await axios(url, {
            headers: { "x-token": sessionStorage.getItem('token-xL') }
            })
            .then( companies => setCompanies(companies.data.resData))
            .catch(error => console.log(error))
    }
//Fetch branches used in select
    const fetchBranches = async() => {
        const url = 'http://localhost:8080/branch';

        await axios(url, {
            headers: { "x-token": sessionStorage.getItem('token-xL') }
            })
            .then( branches => setBranches(branches.data.resData))
            .catch(error => console.log(error))
    }

    //WORK HERE

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
        fetchRoles();
        searchUserToEdit();
        fetchCompanies();
        fetchBranches();
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
</div>
  )
}
