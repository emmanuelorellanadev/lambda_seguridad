import React, { useState, useEffect, useContext, useReducer} from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import PaginationReducer from '../pagination/PaginationReducer';
import { useGetBranchType } from '../../branchTypes/hooks/useGetBranchType';
import { GlobalContext } from '../../../context/GlobalContext';
import { initialPagination, paginationReducer } from '../pagination/reducer/paginationReducer';

export const Table_branchType = ({ columns, editData, deleteData, onLoad, setOnLoad, ...props}) => {

  const { urlLambda, token } = useContext(GlobalContext);
  const [paginationData, paginationDispatch] = useReducer(paginationReducer , initialPagination)
  

  if( editData && !columns.includes("Editar" ) ){
      columns.push("Editar")
  }

  if(deleteData && !columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

  const getBranchTypes = async() => {
    const searchValue = paginationData.search ?? '';
    const urlBranchType = `${urlLambda}/branchType/?q=${encodeURIComponent(searchValue)}&limit=${paginationData.rowsByPage}&page=${paginationData.page}`;
    await useGetBranchType(urlBranchType, token, paginationDispatch, undefined );
  }
  const searching = (query) => {
    paginationDispatch({ type: 'UPDATE_SEARCH', search: query ?? '' });
    paginationDispatch({ type: 'UPDATE_PAGE', page: 1 });
    setOnLoad(true);
  }

  useEffect( () => {
    setOnLoad(false)
    getBranchTypes()
  }, [onLoad])


  return (
    <>
    <div className="table-controls">
      <Input lambdaClassInput={"data_search"} type="search" value={paginationData.search} onChange={ e => searching(e.target.value)} placeholder="Buscar tipo de sucursal por nombre o estado" aria-label="Buscar tipo de sucursal" />
    </div>
    <div className="table-responsive">
      <table className='table table-bordered table-hover table-striped user-table' {...props}>
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
            paginationData.data?.map( ( data ) => {
              let values = Object.values(data)
              if(editData && deleteData){
                  return (
                    <tr key={values[0]}>
                      <th>{values[0]}</th>
                      <td data-label="Tipo">{values[1]}</td>
                      <td data-label="Estado"><input type='checkbox' checked={values[2]} disabled/></td>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( values[0] ) } >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => deleteData(values[0], values[1], setOnLoad) }><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>
                  )
              }else if(editData){
                return (
                  <tr key={values[0]}>
                    <th>{values[0]}</th>
                    <td data-label="Tipo">{values[1]}</td>
                    <td data-label="Estado"><input type='checkbox' checked={values[2]} disabled/></td>
                    <th><button className='btn btn-primary' type="button" onClick={ () => editData( values[0] ) } >Editar</button></th>
                  </tr>
                )
              }else{
                return (
                  <tr key={values[0]}>
                    <th>{values[0]}</th>
                    <td data-label="Tipo">{values[1]}</td>
                    <td data-label="Estado"><input type='checkbox' checked={values[2]} disabled/></td>
                  </tr>
                )
              }
              })
          }
        </tbody>
      </table>
    </div>
    <PaginationReducer data={paginationData} dispatch={paginationDispatch} onLoad={onLoad} setOnLoad={setOnLoad}/>
  
  </>
  )
}

export default Table_branchType