import React, { useState, useEffect, useContext } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import Pagination from '../Pagination.jsx';
import { useGetCompany } from '../../companies/hooks/useGetCompany';
import { GlobalContext } from '../../../context/GlobalContext.jsx';

export const Table_company = ({ columns, editData, deleteData, setOnLoad, onLoad, ...props}) => {

  const [ companies, setCompanies ] = useState({});
  const { urlLambda, token } = useContext(GlobalContext);
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

  const getCompany = async() => {
    const urlCompany = `${urlLambda}/company/?limit=${rowsByPage}&page=${page}&q=${encodeURIComponent(search)}`;
    await useGetCompany(urlCompany, token, {setCompanies, setNextPage, setPrevPage});
  }
  const searching = (query) => {
    setSearch(query); 
    setPage(1);
    setOnLoad(false);
  }

  useEffect( () => {
    setOnLoad(true)
    getCompany()
  }, [onLoad, search])


  return (
    <>
    <div className="table-controls">
      <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => searching(e.target.value)} placeholder="Buscar empresa por nombre o dirección" aria-label="Buscar empresa" />
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
            companies.data?.map( ( data ) => {
              let values = Object.values(data)
              if(editData && deleteData){
                  return (
                    <tr key={values[0]}>
                      <th>{values[0]}</th>
                      <td data-label="Empresa">{values[1]}</td>
                      <td data-label="Dirección">{values[2]}</td>
                      <td data-label="Teléfono">{values[3]}</td>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( values[0] ) } >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => deleteData(values[0], values[1], setOnLoad) }><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>
                  )
              }else if(editData){
                return (
                  <tr key={values[0]}>
                    <th>{values[0]}</th>
                    <td data-label="Empresa">{values[1]}</td>
                    <td data-label="Dirección">{values[2]}</td>
                    <td data-label="Teléfono">{values[3]}</td>
                    <th><button className='btn btn-primary' type="button" onClick={ () => editData( values[0], values[1], setOnLoad ) } >Editar</button></th>
                  </tr>
                )
              }else{
                return (
                  <tr key={values[0]}>
                    <th>{values[0]}</th>
                    <td data-label="Empresa">{values[1]}</td>
                    <td data-label="Dirección">{values[2]}</td>
                    <td data-label="Teléfono">{values[3]}</td>
                  </tr>
                )
              }
              })
          }
        </tbody>
      </table>
    </div>
    <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={companies.total} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_company