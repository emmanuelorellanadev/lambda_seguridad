import React, { useEffect, useReducer, useState } from 'react';

import '../../../../css/ui/table.css'
import { Input } from '../../Input';
import { P_Head } from '../../P_Head';
import { useGetRoom } from '../../../rooms/hooks/useGetRoom';
import { initialPagination, paginationReducer } from '../../pagination/reducer/paginationReducer';
import PaginationReducer from '../../pagination/PaginationReducer';


export const Table_searchSelect_room = ({ columns, rows, dispatch, ...props}) => {

  const [ onLoad, setOnLoad ] = useState(false);

  const [paginationData, dispatchPagination] = useReducer(paginationReducer , initialPagination)

  const search = (search) => {
    dispatchPagination({type: 'UPDATE_SEARCH', search: search})
    console.log(search)
    setOnLoad(true)
  }

  //work here
  //get the services of room and update the reducer parameter
  const selectRoom = (roomId, room_number) => {
    dispatch({type: 'UPDATE_ROOMID', RoomId: roomId}); 
    dispatch({type: 'UPDATE_ROOMNUMBER', room_number: room_number});
    // dispatch({type: 'UPDATE_SERVICES', services: services});  
    setOnLoad(true)}

  useEffect( () => {
    const urlRoom = `http://localhost:8080/room/?limit=${paginationData.rowsByPage}&page=${paginationData.page}&q=${paginationData.search}`;
    useGetRoom(urlRoom, {dispatchPagination, setOnLoad});
  }, [onLoad]);

  return (
    <>
    {/* <P_Head className="p_h1" text={'Listado de Habitaciones'}/> */}
    <Input lambdaClassInput={"data_search"} type="search" value={paginationData.search}  onChange={ (e) => search(e.target.value)} />
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
            paginationData.data?.map( ( room ) => {
              return (
                <tr key={room.id}>
                  <th>{room.room_number}</th>
                  <th>{room.room_beds}</th>
                  <th>{room.room_people}</th>
                  <th>{room.room_info}</th>
                  <th><button className='btn btn-primary' type="button" onClick={ (e) => selectRoom(room.id, room.room_number) } >Reservar</button></th>
                </tr>
              )
            })
          }
        </tbody>
    </table>
    <PaginationReducer data={paginationData} dispatch={dispatchPagination} onLoad={onLoad} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_searchSelect_room