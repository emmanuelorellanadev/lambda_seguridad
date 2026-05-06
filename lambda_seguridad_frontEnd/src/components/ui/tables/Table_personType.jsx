import React, { useEffect, useContext, useReducer } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { useGetPersonType } from '../../personTypes/hooks/useGetPersonType';
import PaginationReducer from '../pagination/PaginationReducer';
import { GlobalContext } from '../../../context/GlobalContext';
import { initialPagination, paginationReducer } from '../pagination/reducer/paginationReducer';

// import { prevPage, nextPage, onSearchChange, filterData } from './filterTable_personType';

export const Table_personType = ({ columns, editData, deleteData, onLoad, setOnLoad, ...props}) => {

  const [paginationData, paginationDispatch] = useReducer(paginationReducer, initialPagination);
  const { urlLambda, token } = useContext(GlobalContext);

  if(editData && !columns.includes("Editar") ){
      columns.push("Editar")
  }

  if(deleteData && !columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

  const getPersonTypes = async () => {
    const searchValue = paginationData.search ?? '';
    const urlPersonType = `${urlLambda}/personType/?q=${encodeURIComponent(searchValue)}&limit=${paginationData.rowsByPage}&page=${paginationData.page}`;
    await useGetPersonType(urlPersonType, token, paginationDispatch, undefined);
  }

  const searching = (query) => {
    paginationDispatch({ type: 'UPDATE_SEARCH', search: query ?? '' });
    paginationDispatch({ type: 'UPDATE_PAGE', page: 1 });
    setOnLoad(true);
  }

  useEffect( () => {
    setOnLoad(false)
    getPersonTypes();
  }, [onLoad])

  return (
    <>
    <div className="table-controls">
      <Input lambdaClassInput={"data_search"} type="search" value={paginationData.search} onChange={ e => searching(e.target.value)} placeholder="Buscar tipo de persona por nombre o estado" aria-label="Buscar tipo de persona" />
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
            paginationData.data?.map( ( personType ) => {
              if(editData && deleteData){
                  return (
                    <tr key={personType.id}>
                    <th>{personType.id}</th>
                      <td data-label="Tipo">{personType.personType_name}</td>
                      <td data-label="Estado"><input type='checkbox' checked={personType.personType_state} disabled/></td>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( personType.id ) } >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => deleteData(personType.id, personType.personType_name, setOnLoad) }><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>
                  )
              }else if(editData){
                return (
                    <tr key={personType.id}>
                    <th>{personType.id}</th>
                    <td data-label="Tipo">{personType.personType_name}</td>
                    <td data-label="Estado"><input type='checkbox' checked={personType.personType_state} disabled/></td>
                    <th><button className='btn btn-primary' type="button" onClick={ () => editData( personType.id ) } >Editar</button></th>
                  </tr>
                )
              }else{
                return (
                    <tr key={personType.id}>
                    <th>{personType.id}</th>
                    <td data-label="Tipo">{personType.personType_name}</td>
                    <td data-label="Estado"><input type='checkbox' checked={personType.personType_state} disabled/></td>
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

export default Table_personType