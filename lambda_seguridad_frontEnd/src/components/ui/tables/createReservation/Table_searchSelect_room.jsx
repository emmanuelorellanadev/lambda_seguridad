import React, { useEffect, useReducer, useState } from 'react';

import '../../../../css/ui/table.css'
import { Input } from '../../Input';
import { P_Head } from '../../P_Head';
import Pagination from '../../Pagination';
import { useGetRoom } from '../../../rooms/hooks/useGetRoom';
import { initialSearchSelectRoom, table_searchSelect_roomReducer } from './reducer/table_searchSelect_roomReducer';


export const Table_searchSelect_room = ({ columns, rows, onLoad, setOnLoad, dispatch, ...props}) => {

  const [ rooms, setRooms ] = useState([]);
  // const [ search, setSearch ] = useState('');
  // const [ rowsByPage, setRowsByPage ] = useState( 10 );
  // const [ page, setPage ] = useState( 1 );
  const [ prevPage, setPrevPage ] = useState('');
  const [ nextPage, setNextPage ] = useState('');
  // const [ onLoad, setOnLoad ] = useState(true);

  const [roomsData, dispatchRoomsData] = useReducer(table_searchSelect_roomReducer , initialSearchSelectRoom)

  //WORK HERE !!!!
  //change useState by useReducer
  //change useGetRoom object parameters

  useEffect( () => {
    setOnLoad(true);
    // const urlRoom = `http://localhost:8080/room/?limit=${rowsByPage}&page=${page}&q=${search}`;
    const urlRoom = `http://localhost:8080/room/`;
    useGetRoom(urlRoom, {setRooms, setNextPage, setPrevPage});
    console.log(roomsData);
  }, [onLoad]);

  return (
    <>
    <P_Head className="p_h1" text={'Listado de Habitaciones'}/>
    <Input lambdaClassInput={"data_search"} type="search"  placeholder="Buscar" />
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
            rooms.data?.map( ( room ) => {
              return (
                <tr key={room.id}>
                  <th>{room.room_number}</th>
                  <th>{room.room_beds}</th>
                  <th>{room.room_people}</th>
                  <th>{room.room_info}</th>
                  <th><button className='btn btn-primary' type="button" onClick={ (e) => console.log('Selected', room.id) } >Reservar</button></th>
                </tr>
              )
            })
          }
        </tbody>
    </table>
    {/* <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={rooms.total} setOnLoad={setOnLoad}/> */}
  </>
  )
}

export default Table_searchSelect_room