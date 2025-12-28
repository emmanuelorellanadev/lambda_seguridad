import React, { useContext, useEffect, useState } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { Label } from '../Label';
import { useGetPerson } from '../../people/hooks/useGetPerson';
import Pagination from '../Pagination';
import { GlobalContext } from '../../../context/GlobalContext';

export const Table_person = ({ columns, rows, editData, deleteData, onLoad, setOnLoad, ...props}) => {

  const { urlLambda } = useContext(GlobalContext);
  const [ people, setPeople ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ rowsByPage, setRowsByPage ] = useState( 10 );
  const [ page, setPage ] = useState( 1 );
  const [ prevPage, setPrevPage ] = useState('');
  const [ nextPage, setNextPage ] = useState('');
  // const [ onLoad, setOnLoad ] =useState(true)

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
    // setOnLoad(true)
    const urlPerson = `${urlLambda}/person/?limit=${rowsByPage}&page=${page}&q=${search}`;
    useGetPerson(urlPerson, {setPeople, setNextPage, setPrevPage});
  }, [onLoad, search])

  return (
    <>
      <div className="table-controls">
        <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => searching(e.target.value)} placeholder="Buscar persona por nombre o documento" aria-label="Buscar persona" />
      </div>
      <div className="table-responsive">
        <table className='table table-bordered table-hover table-striped user-table'>
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
              people.data?.map( ( person ) => {
                let values = Object.values(person)
                if(editData && deleteData){
                    return (
                      <tr key={values[0]}>
                        <th>{values[0]}</th>
                        <td data-label="Nombre">{values[1]}</td>
                        <td data-label="Documento">{values[2]}</td>
                        <td data-label="Teléfono">{values[3]}</td>
                        <td data-label="Correo">{values[4]}</td>
                        <td data-label="Dirección">{values[5]}</td>
                        <td data-label="Tipo">{values[6]}</td>
                        <th><button className='btn btn-primary' type="button" onClick={ () => editData( values[0] ) } >Editar</button></th>
                        <th><button className='btn btn-outline-danger' onClick={ () => deleteData(values[0], values[1]) }><i className='bi bi-trash3-fill'></i></button></th>
                      </tr>
                    )
                }else if(editData){
                  return (
                    <tr key={values[0]}>
                      <th>{values[0]}</th>
                      <td data-label="Nombre">{values[1]}</td>
                      <td data-label="Documento">{values[2]}</td>
                      <td data-label="Teléfono">{values[3]}</td>
                      <td data-label="Correo">{values[4]}</td>
                      <td data-label="Dirección">{values[5]}</td>
                      <td data-label="Tipo">{values[6]}</td>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( values[0] ) } >Editar</button></th>
                    </tr>
                  )
                }else{
                  return (
                    <tr key={values[0]}>
                      <th>{values[0]}</th>
                      <td data-label="Nombre">{values[1]}</td>
                      <td data-label="Documento">{values[2]}</td>
                      <td data-label="Teléfono">{values[3]}</td>
                      <td data-label="Correo">{values[4]}</td>
                      <td data-label="Dirección">{values[5]}</td>
                      <td data-label="Tipo">{values[6]}</td>
                    </tr>
                  )
                }
                })
            }
          </tbody>
      </table>
    </div>
    <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={people.total} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_person