import React, { useContext, useEffect ,useState } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { useGetRoomStates } from '../../roomStates/hooks/useGetRoomStates';
import Pagination from '../Pagination';
import { GlobalContext } from '../../../context/GlobalContext';


export const Table_roomState = ({ columns, editData, deleteData, setOnLoad, onLoad, ...props}) => {

  const { urlLambda } = useContext(GlobalContext);
  const [ roomStatesRes, setRoomStatesRes ] = useState({});
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

  const getRoomStates = async() => {
    const urlRoomState = `${urlLambda}/roomState/?limit=${rowsByPage}&page=${page}&q=${search}`;
    await useGetRoomStates(urlRoomState, {setRoomStatesRes, setNextPage, setPrevPage});
  }

  const searching = (query) => {
    setSearch(query); 
    setPage(1);
    setOnLoad(false);
  }

  useEffect( () => {
    setOnLoad(true)
    getRoomStates()
  }, [onLoad, search])

  return (
    <>
    <div className="table-controls">
      <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => searching(e.target.value)} placeholder="Buscar estado de habitación por nombre o estado" aria-label="Buscar estado de habitación" />
    </div>
    <div className="table-responsive">
      <table className='table table-bordered table-hover table-striped user-table' {...props}>
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
            roomStatesRes.data?.map( ( data ) => {
              let values = Object.values(data)
              if(editData && deleteData){
                  return (
                    <tr key={values[0]}>
                      <th>{values[0]}</th>
                      <td data-label="Estado">{values[1]}</td>
                      <td data-label="Activo"><input type='checkbox' checked={values[2]} disabled/></td>
                      <th><button className='btn btn-primary' type="button" onClick={ () => { editData( values[0] ) }} >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => { deleteData(values[0], values[1], { setOnLoad }) } }><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>
                  )
              }else if(editData){
                return (
                  <tr key={values[0]}>
                    <th>{values[0]}</th>
                    <td data-label="Estado">{values[1]}</td>
                    <td data-label="Activo"><input type='checkbox' checked={values[2]} disabled/></td>
                    <th><button className='btn btn-primary' type="button" onClick={ () => editData( values[0] ) } >Editar</button></th>
                  </tr>
                )
              }else{
                return (
                  <tr key={values[0]}>
                    <th>{values[0]}</th>
                    <td data-label="Estado">{values[1]}</td>
                    <td data-label="Activo"><input type='checkbox' checked={values[2]} disabled/></td>
                  </tr>
                )
              }
              })
          }
        </tbody>
      </table>
    </div>
    <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={roomStatesRes.total} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_roomState