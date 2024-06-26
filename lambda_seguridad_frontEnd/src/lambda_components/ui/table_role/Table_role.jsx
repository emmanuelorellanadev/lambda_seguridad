import React, { useState } from 'react';

import '../../../css/ui/table.css'
import { Label } from '../Label';
import { Input } from '../Input';

export const Table_role = ({ columns, rows, editData, deleteData, ...props}) => {

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
      return (row.role_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) )
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
    <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => onSearchChange(e.target.value)} placeholder="Buscar" />
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
            filterData().map( ( role ) => {
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
    <div className='pagination_container'>
      <div>
        <button className='btn btn-primary' onClick={  prevPage }>Anterior</button>
        <label htmlFor="">{` ${pageCounter} / ${Math.ceil(rows.length/rowsByPage)}`}</label>
        <button className='btn btn-primary' onClick={ nextPage }>Siguiente</button>
      </div>
      <div>
        <Label lambdaClassLabel={""} text={"Registros por página "}/>
        <select value={rowsByPage} onChange={e => setRowsByPage(e.target.value)}>
          <option key={"5"} value="5">5</option>
          <option key={"10"} value="10">10</option>
          <option key={"20"} value="20">20</option>
          <option key={"50"} value="50">50</option>
        </select>
      </div>
    </div>
  </>
  )
}

export default Table_role