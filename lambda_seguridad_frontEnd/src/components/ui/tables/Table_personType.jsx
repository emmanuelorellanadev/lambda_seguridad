import React, { useEffect, useState } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { Label } from '../Label';
import useGetPersonType from '../../personTypes/hooks/useGetPersonType';
import Pagination from '../Pagination';

// import { prevPage, nextPage, onSearchChange, filterData } from './filterTable_personType';

export const Table_personType = ({ columns, editData, deleteData, onLoad, setOnLoad, ...props}) => {

  const [personTypes, setPersonTypes] = useState([]);
  const [ search, setSearch ] = useState('');
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

  const searching = (query) => {
    setSearch(query); 
    setPage(1);
    setOnLoad(false);
  }

  useEffect( () => {
    setOnLoad(true)
    const urlPersonType = `http://localhost:8080/personType/?limit=${rowsByPage}&page=${page}&q=${search}`;
    useGetPersonType(urlPersonType, {setPersonTypes, setNextPage, setPrevPage})
  }, [onLoad, search])

  return (
    <>
    <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => searching(e.target.value)} placeholder="Buscar" />
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
            personTypes.data?.map( ( personType ) => {
              if(editData && deleteData){
                  return (
                    <tr key={personType.id}>
                    <th>{personType.id}</th>
                      <th>{personType.personType_name}</th>
                      <th><input type='checkbox' checked={personType.personType_state} disabled/></th>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( personType.id ) } >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => deleteData(personType.id) }><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>
                  )
              }else if(editData){
                return (
                    <tr key={personType.id}>
                    <th>{personType.id}</th>
                    <th>{personType.personType_name}</th>
                    <th><input type='checkbox' checked={personType.personType_state} disabled/></th>
                    <th><button className='btn btn-primary' type="button" onClick={ () => editData( personType.id ) } >Editar</button></th>
                  </tr>
                )
              }else{
                return (
                    <tr key={personType.id}>
                    <th>{personType.id}</th>
                    <th>{personType.personType_name}</th>
                    <th><input type='checkbox' checked={personType.personType_state} disabled/></th>
                  </tr>
                )
              }
              })
          }
        </tbody>
    </table>
    <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={personTypes.total} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_personType