import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

import '../../css/role/role.css'
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

const UpdateRole = (props) => {

    const [ id, setId] = useState('');
    const [ roleName, setRoleName ] = useState('');
    const [ roleState, setRoleState ] = useState(false);

    const updateRole = async(e ) => {
        e.preventDefault();

        const url = `http://localhost:8080/role/${props.roleId}`;
        await axios.put(url, {
            "id": id,
            "role_name": roleName,
            "role_state": roleState
        },  {
            headers: {"x-token": sessionStorage.getItem('token-xL')
        }})
            .then( resp => {
              Swal.fire({
                icon: 'success',
                title: `Rol actualizado correctamente`,
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#dc3545',
                timer: 3000

              })
            })
            .catch( error => {
              Swal.fire({
                icon: 'error',
                title: `Error al actualizar el rol?`,
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d6efd',
                footer: error.response.data.errors
              })
            })
    }

    const fillData = async( ) => {
        const url = `http://localhost:8080/role/${props.roleId}`
        
        await axios.get(url, {
          headers: { "x-token": sessionStorage.getItem('token-xL') }
        })
        .then( resp => resp.data.resData)
        .then( role => {
          setId(role.id)
          setRoleName(role.role_name)
          setRoleState(role.role_state)
        })
        .catch( error => { console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'El Rol no pudo ser guardado',
            footer: error.response.data.name,
            confirmButtonColor: '#0d6efd'
          })
        })
    }
    
    useEffect( () => {
        fillData();
    }, [])

  return (
    <>
    <div className='role_container'>
      <P_Head text={'Administración De Roles'} className={'p_h1'}/>
      <P_Head text={'Actualizar Rol'} className={'p_h2'}/>
        <form className='role_form' onSubmit={e => updateRole(e)}>
          <div>
            <Label lambdaClassLabel={""} text="Id:"/>
            <Input lambdaClassInput={""} type="number" name="id" value={id}  onChange={ e => setId(e.target.value)} required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel={""} text="Nombre:"/>
            <Input lambdaClassInput={""} type="text" name="role_name" value={roleName || ''} onChange={ e => setRoleName(e.target.value)} required/>
          </div>
          <div>
            <Label lambdaClassLabel={""} text="Estado:"/>
            <Input lambdaClassInput={""} type="checkbox" name="role_state" value={ roleState || '' } onChange={ e => setRoleState( !roleState ) } checked={roleState} />
          </div>
          <div></div>
          <div className='sendRole_button'>
            <button className='btn btn-primary' >Actualizar</button>
          </div>
        </form>
    </div>
    </>
  )
}

export default UpdateRole
