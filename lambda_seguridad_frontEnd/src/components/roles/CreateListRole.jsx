import React, { useEffect, useState } from 'react'

import '../../css/role/role.css';
import { P_Head } from '../ui/P_Head'; 
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import Table_role from '../ui/tables/Table_role';
import { useGetRole } from './hooks/useGetRole';
import { useDeleteRole } from './hooks/useDeleteRole';
import { useCreateRole } from './hooks/useCreateRole';
import { Toaster } from 'react-hot-toast';

const CreateListRoles = (props) => {

  const [ id, setId ] = useState('');
  const [ roleName, setRoleName ] = useState('');
  const [ roleState, setRoleState ] = useState(true);
  const [ onLoad, setOnLoad ] = useState(true);

  const saveRole = async (e) => {
    e.preventDefault();
    const urlRole = 'http://localhost:8080/role/';
    useCreateRole(urlRole, id, roleName, roleState, {setOnLoad})
    cleanForm();
  }

  const cleanForm = ( ) => {
    setId('');
    setRoleName('');
    setRoleState(true);
  }

  const editRole = (roleId) => {
    props.navUpdateRole( roleId )
  }

  const deleteRole = async ( id ) => {
    const urlRole = `http://localhost:8080/role/${id}`;
    useDeleteRole(urlRole, id, {setOnLoad})
  }

  return (
    <>
      {/* Create section */}
      <div className='role_container'>
        <P_Head text={'Administración De Roles'} className={'p_h1'}/>
        <P_Head text={'Crear Rol'} className={'p_h2'}/>
        <form className={'role_form'} onSubmit={e => saveRole(e)}>
          <div>
            <Label lambdaClassLabel="" text="Id:"/>
            <Input lambdaClassInput="" type="number"  value={id} onChange={(e) =>setId(  e.target.value )} placeholder='Id' required />
          </div>
          <div>
            <Label lambdaClassLabel="" text="Rol:"/>
            <Input lambdaClassInput="" type="text"  value={roleName} onChange={(e) => setRoleName( e.target.value )} placeholder='Rol' required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Estado:"/>
            <Input lambdaClassInput="" type="checkbox" value={roleState} onChange={ (e) => setRoleState(!roleState) } checked={roleState} />
          </div>
          <div></div>
          <div className='sendRole_button'>
            <button className='btn btn-primary' >Guardar</button>
          </div>
        </form>
        {/* Table section */}
          <P_Head text={'Lista de Roles'} className={'p_h2'}/>
        <div className='table-responsive roleTable_container'>
          <Table_role columns={["Id", "Nombre", "Estado"]} editData={editRole} deleteData={deleteRole} onLoad={onLoad} setOnLoad={setOnLoad}/>
        </div>
      </div>
      <Toaster/>
    </>
  )
}

export default CreateListRoles
