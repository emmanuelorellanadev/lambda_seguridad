import React, { useEffect, useState } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { P_Head } from '../P_Head';
import { useGetBranch } from '../../branches/hooks/useGetBranch';
import { useGetUserByBranch } from '../../users/hooks/useGetUsersByBranch';
import Pagination from '../Pagination';

export const Table_user = ({ columns, rows, editData, deleteData, ...props}) => {

  const [users, setUsers] = useState([]);
  // const [branches, setBranches] = useState([]);
  // const [branch, setBranch] = useState('');
  const [ search, setSearch ] = useState('');
  const [ rowsByPage, setRowsByPage ] = useState( 10 );
  const [ page, setPage ] = useState( 1 );
  const [ prevPage, setPrevPage ] = useState('');
  const [ nextPage, setNextPage ] = useState('');
  const [ onLoad, setOnLoad ] =useState(true)

  if(editData && !columns.includes("Editar") ){
      columns.push("Editar")
  }

  if(deleteData && !columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

//CHECK THIS!!!
//THE USER SEARCH BY BRANCH IS NOT WORKING WITH THE PAGINATION MODULE
// //MERGE THE METOD CONFIGURATION WITH SQL QUERY, USER_BY_BRANCH_CONTROLLER.JS

// const selectBranch = () => {
//   const urlUsersByBranch = `http://localhost:8080/usersByBranch/${branch}`;
//   useGetUserByBranch(urlUsersByBranch, {setUsers, setNextPage, setPrevPage}); 
// }

  const searchUser = (query) => {
    const urlUsersByBranch = `http://localhost:8080/usersByBranch/?q=${query}`;
    setSearch(query)
    useGetUserByBranch(urlUsersByBranch, {setUsers, setNextPage, setPrevPage});
  }

  useEffect( () => {
    setOnLoad(true)
    const urlUsersByBranch = `http://localhost:8080/usersByBranch/`;
    useGetUserByBranch(urlUsersByBranch, {setUsers, setNextPage});
    // const urlBranch = 'http://localhost:8080/branch/';
    // useGetBranch(urlBranch, {setBranches, setNextPage, setPrevPage});
  }, [onLoad])

  return (
    <>
      {/* <P_Head className="p_h1" text={'Listado de Usuarios'}/>
      <div className='' >
          <div>
              <label htmlFor="branch">Sucursales: </label>
              <select className='form-control text-center' name="branch" id="branch" value={branch} onChange={(e) => selectBranch(e.target.value)}>
                  <option value={''} >Todas</option>
                  {
                      branches.data?.map( b => {
                          return (<option key={b.id} value={b.id}>{b.branch_name}</option>)
                      })
                  }
              </select>
          </div>
      </div> */}

    <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => searchUser(e.target.value)} placeholder="Buscar" />
      <table className='table table-bordered table-hover table-striped' {...props}>
        <thead className='text-center t_header'>
          <tr key={0}>  
            {
              columns.map( (column) => {
                return (
                    <th key={column}>{column}</th>
                )
              })
            }
            </tr>
        </thead>
        <tbody className='text-center align-baseline'>
          {
            users.map( ( user ) => {
              if(editData && deleteData){
                  return (
                    <tr key={user.id}>
                      <th>{user.id}</th>
                      <th>{user.user_name}</th>
                      <th>{user.role_name}</th>
                      <th><input type='checkbox' checked={user.user_state} disabled/></th>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( user.id ) } >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => deleteData(user.id, user.user_name, setOnLoad) }><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>
                  )
              }else if(editData){
                return (
                    <tr key={user.id}>
                    <th>{user.id}</th>
                    <th>{user.user_name}</th>
                    <th>{user.role_name}</th>
                    <th><input type='checkbox' checked={user.user_state} disabled/></th>
                    <th><button className='btn btn-primary' type="button" onClick={ () => editData( user.id ) } >Editar</button></th>
                  </tr>
                )
              }else{
                return (
                    <tr key={user.id}>
                    <th>{user.id}</th>
                    <th>{user.user_name}</th>
                    <th>{user.role_name}</th>
                    <th><input type='checkbox' checked={user.user_state} disabled/></th>
                  </tr>
                )
              }
              })
          }
        </tbody>
    </table>
    {/* <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={users.total} setOnLoad={setOnLoad}/> */}
  </>
  )
}

export default Table_user