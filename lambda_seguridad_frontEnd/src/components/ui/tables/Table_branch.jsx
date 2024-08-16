import React, { useState, useEffect } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { useGetBranch } from '../../branches/hooks/useGetBranch';
import Pagination from '../Pagination';

export const Table_branch = ({ columns, editData, deleteData, setOnLoad, onLoad}) => {

const [branches, setBranches] = useState({})

const [ search, setSearch ] = useState('');
  const [ rowsByPage, setRowsByPage ] = useState( 10 );
  const [ page, setPage ] = useState( 1 );
  const [ prevPage, setPrevPage ] = useState('');
  const [ nextPage, setNextPage ] = useState('');

  if( editData && !columns.includes("Editar" ) ){
      columns.push("Editar")
  }

  if(deleteData && !columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

  const getBranches = async() => {
    const urlBranch = `http://localhost:8080/branch/?limit=${rowsByPage}&page=${page}&q=${search}`;
    await useGetBranch(urlBranch, {setBranches, setNextPage, setPrevPage});
  }

  const searching = (query) => {
    setSearch(query); 
    setPage(1);
    setOnLoad(false);
  }

  useEffect( () => {
    setOnLoad(true)
    getBranches()
  }, [onLoad, search])

  return (
    <>
      <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => searching(e.target.value)} placeholder="Buscar" />
      <table className='table table-bordered table-hover table-striped' >
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
            branches.data?.map( ( branch ) => {
              let values = Object.values(branch)
              if(editData && deleteData){
                  return (
                    <tr key={values[0]}>
                      <th>{values[0]}</th>
                      <th>{values[1]}</th>
                      <th>{values[2]}</th>
                      <th>{values[3]}</th>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( values[0] ) } >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => deleteData(values[0], values[1], setOnLoad) }><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>
                  )
              }else if(editData){
                return (
                  <tr key={values[0]}>
                    <th>{values[0]}</th>
                    <th>{values[1]}</th>
                    <th>{values[2]}</th>
                    <th>{values[3]}</th>
                    <th><button className='btn btn-primary' type="button" onClick={ () => editData( values[0] ) } >Editar</button></th>
                  </tr>
                )
              }else{
                return (
                  <tr key={values[0]}>
                    <th>{values[0]}</th>
                    <th>{values[1]}</th>
                    <th>{values[2]}</th>
                    <th>{values[3]}</th>
                  </tr>
                )
              }
              })
          }
        </tbody>
    </table>
    <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={branches.total} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_branch