import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios'

import '../../css/role/role.css';
import { P_Head } from '../ui/P_Head'; 
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

const CreateAndListRoles = (props) => {

  const [ id, setId ] = useState('');
  const [ roleName, setRoleName ] = useState('');
  const [ roleState, setRoleState ] = useState(true);
  const [ roles, setRoles ] = useState([]);
  const [ roleToDelete, setRoleToDelete ] = useState([]);


  //Create Role
  const saveRole = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8080/role';

    await axios.post(url, {
      "id": id,
      "role_name": roleName,
      "role_state": roleState
    }, 
    { headers: { "x-token": sessionStorage.getItem("token-xL") } })
      .then( resp => {
      cleanForm();
      Swal.fire({
        icon: 'success',
        title: `Rol ${roleName}, guardado con exito`,
        timer: 3000,
        confirmButtonColor: '#0d6efd'
    })
      } )
      .catch( error => {
        Swal.fire({
          icon: 'error',
          title: `Error al guardar el rol?`,
          showCloseButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d6efd',
          footer: error.response.data.errors
        })
      })

      cleanForm();
      fillTable();
      
    }

  const cleanForm = ( ) => {
    setId('');
    setRoleName('');
    setRoleState(true);
  }


  // List Roles
  const fillTable = async() => {
    const urlGetRoles = 'http://localhost:8080/role';
    await axios.get(urlGetRoles, { headers: {'x-token': sessionStorage.getItem('token-xL')}})
    .then( (resp) => resp.data.resData)
    .then( roles => setRoles(roles)) 
  }

  const editRole = (roleId) => {
    props.navUpdateRole( roleId )
  }

  const deleteRole = async ( id, role ) => {

    const url = `http://localhost:8080/role/${id}`;
    
    await axios.get(url, { headers: {"x-token": sessionStorage.getItem("token-xL")}})
      .then( resp => resp.data.resData )
      .then(role => setRoleToDelete(role) )
      .catch( error => console.log(error));

    if ( !roleToDelete ){
      console.log('No se encontro Role')
    }else{

      Swal.fire({
        icon: 'question',
        title: `Esta seguro que desea eliminar el rol?`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#dc3545'
      })
        .then( async (result) =>{
          if( result.isConfirmed ){
            await axios.delete(url, {where: {id: roleToDelete.id}})
              .then( () => {
                Swal.fire({
                  icon: 'success',
                  title: `Rol eliminado correctamente`,
                  timer: 3000,
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#0d6efd'
              })
              })
              .catch(error => console.log(error))
      
              fillTable();
          }
        })
    }
  }

  useEffect( () => {
    fillTable();
  }, [])

  return (
    <>
      {/* Create section */}
      {/* <div className='roles_container'> */}
      <div className='role_container'>
        <P_Head text={'Administración De Roles'} className={'p_h1'}/>
        <P_Head text={'Crear Rol'} className={'p_h2'}/>
        {/* <form className='role_form' onSubmit={e => saveRole(e)}> */}
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
          <table className='table table-bordered table-hover table-striped'>
            <thead className=' text-center t_header'>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
              roles.map( role => {
                return (<tr key={role.id}>
                  <th>{role.id}</th>
                  <th>{role.role_name}</th>
                  <th><input type="checkbox" name="" id="" checked={role.role_state} disabled/></th>
                  <th><button className='btn btn-primary' type="button" onClick={ () => editRole( role.id ) } >Editar</button></th>
                  <th><button className='btn btn-outline-danger' onClick={() => {deleteRole(role.id, role.role_name)}}><i className='bi bi-trash3-fill'></i></button></th>
                </tr>)
              })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default CreateAndListRoles
