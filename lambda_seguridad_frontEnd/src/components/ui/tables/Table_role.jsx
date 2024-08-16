import React, { useEffect, useState } from 'react';

import '../../../css/ui/table.css'
import { Label } from '../Label';
import { Input } from '../Input';
import Pagination from '../Pagination';
import { useGetRole } from '../../roles/hooks/useGetRole';

export const Table_role = ({ columns, rows, editData, deleteData, onLoad, setOnLoad, ...props}) => {

  const [ roles, setRoles ] = useState({})
  const [search, setSearch] = useState('');
  const [ rowsByPage, setRowsByPage ] = useState( 10 );
  const [ page, setPage ] = useState( 1 );
  const [ prevPage, setPrevPage ] = useState('');
  const [ nextPage, setNextPage ] = useState('');

  if(editData && !columns.includes("Editar") ){
      columns.push("Editar")
  }

  if(deleteData && !columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

const getRoles = async() => {
  const urlRole = `http://localhost:8080/role/?limit=${rowsByPage}&page=${page}&q=${search}`;
  await useGetRole(urlRole, {setRoles, setNextPage, setPrevPage});
}

const searching = (query) => {
  setSearch(query); 
  setPage(1);
  setOnLoad(false);
}

useEffect( () => {
  setOnLoad(true)
  getRoles()
}, [onLoad, search])

  return (
    <>
    <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => searching(e.target.value)} placeholder="Buscar" />
      <table className='table table-bordered table-hover table-striped' {...props}>
        <thead className='text-center t_header'>
          <tr key={0}>  
            {
              columns?.map( (column) => {
                return (
                    <th key={column}>{column}</th>
                )
              })
            }
            </tr>
        </thead>
        <tbody className='text-center align-baseline'>
          {
            roles.data?.map( ( role ) => {
              if(editData && deleteData){
                  return (
                    <tr key={role.id}>
                      <th>{role.id}</th>
                      <th>{role.role_name}</th>
                      <th><input type='checkbox' checked={role.role_state} disabled/></th>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( role.id ) } >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => deleteData(role.id, role.role_name) }><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>
                  )
              }else if(editData){
                return (
                    <tr key={role.id}>
                    <th>{role.id}</th>
                    <th>{role.role_name}</th>
                    <th>{role.role_name}</th>
                    <th><input type='checkbox' checked={role.role_state} disabled/></th>
                    <th><button className='btn btn-primary' type="button" onClick={ () => editData( role.id ) } >Editar</button></th>
                  </tr>
                )
              }else{
                return (
                    <tr key={role.id}>
                    <th>{role.id}</th>
                    <th>{role.role_name}</th>
                    <th>{role.role_name}</th>
                    <th><input type='checkbox' checked={role.role_state} disabled/></th>
                  </tr>
                )
              }
              })
          }
        </tbody>
    </table>
    <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={roles.total} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_role