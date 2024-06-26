import React, { useState } from 'react';

import { Input } from './Input';

export const Table_user = ({ columns, rows, editData, deleteData, ...props}) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [rowsByPage, setRowsByPage] = useState(5);
  const [pageCounter, setPageCounter] = useState(1);

  if(editData && !columns.includes("Editar") ){
      columns.push("Editar")
  }

  if(deleteData && !columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

  const filterData = () => {

    if(search.length === 0)
     return rows.slice(currentPage, (currentPage + rowsByPage));//pagination

    //filter data
    const filteredData = rows.filter( row => {
      return (row.user_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || row.role_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    })
    return ( filteredData.slice(currentPage, (currentPage + rowsByPage)))//pagination
  }

  const onSearchChange = (text) =>{
      setCurrentPage(0);
      setSearch(text);
  }

  const prevPage = () => {
    if(currentPage != 0){
      setCurrentPage(currentPage - rowsByPage);
      setPageCounter(pageCounter - 1);
    }
  }

  const nextPage = () => {
    if(currentPage < Math.ceil(rows.length/rowsByPage)){
      setCurrentPage(currentPage + rowsByPage);
      setPageCounter(pageCounter + 1);
    }
  }

  return (
    <>
    <Input lambdaClassInput={""} type="search" value={search} onChange={ e => onSearchChange(e.target.value)} placeholder="Buscar" />
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
            filterData().map( ( user ) => {
              if(editData && deleteData){
                  return (
                    <tr key={user.id}>
                      <th>{user.id}</th>
                      <th>{user.user_name}</th>
                      <th>{user.role_name}</th>
                      <th><input type='checkbox' checked={user.user_state} disabled/></th>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( user.id ) } >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => deleteData(user.id, user.user_name) }><i className='bi bi-trash3-fill'></i></button></th>
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
    <div>
          <button className='btn btn-primary' onClick={ prevPage }>Anterior</button>
          <label htmlFor="">{` ${pageCounter} / ${Math.ceil(rows.length/rowsByPage)}`}</label>
          <button className='btn btn-primary' onClick={ nextPage }>Siguiente</button>
    </div>
  </>
  )
}

export default Table_user