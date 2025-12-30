import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';

import '../../css/role/role.css'
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useGetRole } from './hooks/useGetRole';
import { useUpdateRole } from './hooks/useUpdateRole';

const UpdateRole = (props) => {

    const [ id, setId] = useState('');
    const [ roleName, setRoleName ] = useState('');
    const [ roleState, setRoleState ] = useState(false);

    const updateRole = async(e ) => {
        e.preventDefault();

        const urlRole = `http://localhost:8080/role/${props.roleId}`;
        useUpdateRole(urlRole, id, roleName, roleState)
    }
    
    useEffect( () => {
      const urlRole = `http://localhost:8080/role/${props.roleId}`
        useGetRole(urlRole, { setId, setRoleName, setRoleState })
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
    <Toaster/>
    </>
  )
}

export default UpdateRole
