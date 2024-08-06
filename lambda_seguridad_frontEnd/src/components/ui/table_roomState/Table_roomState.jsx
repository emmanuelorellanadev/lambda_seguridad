import React, { useEffect ,useState } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { useGetRoomStates } from '../../roomStates/hooks/useGetRoomStates';
import Pagination from '../Pagination';


export const Table_roomState = ({ columns, editData, deleteData, setOnLoad, onLoad, ...props}) => {

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
    const urlRoomState = `http://localhost:8080/roomState/?limit=${rowsByPage}&page=${page}&q=${search}`;
    await useGetRoomStates(urlRoomState, {setRoomStatesRes, setNextPage, setPrevPage});
  }


  useEffect( () => {
    setOnLoad(true)
    getRoomStates()
  }, [onLoad, search])

  return (
    <>
    <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => {setSearch(e.target.value); setOnLoad(false)}} placeholder="Buscar" />
      <table className='table table-bordered table-hover table-striped' {...props}>
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
                      <th>{values[1]}</th>
                      <th><input type='checkbox' checked={values[2]} disabled/></th>
                      <th><button className='btn btn-primary' type="button" onClick={ () => { editData( values[0] ) }} >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => { deleteData(values[0], values[1], { setOnLoad }) } }><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>
                  )
              }else if(editData){
                return (
                  <tr key={values[0]}>
                    <th>{values[0]}</th>
                    <th>{values[1]}</th>
                    <th><input type='checkbox' checked={values[2]} disabled/></th>
                    <th><button className='btn btn-primary' type="button" onClick={ () => editData( values[0] ) } >Editar</button></th>
                  </tr>
                )
              }else{
                return (
                  <tr key={values[0]}>
                    <th>{values[0]}</th>
                    <th>{values[1]}</th>
                    <th><input type='checkbox' checked={values[2]} disabled/></th>
                  </tr>
                )
              }
              })
          }
        </tbody>
    </table>
    <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={roomStatesRes.total} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_roomState