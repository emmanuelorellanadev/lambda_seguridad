import React, { useEffect, useState } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { P_Head } from '../P_Head';
import { useGetRoom } from '../../rooms/hooks/useGetRoom';
import Pagination from '../Pagination';
import { useDeleteRoom } from '../../rooms/hooks/useDeleteRoom';

export const Table_room = ({ columns, rows, editData, deleteData, ...props}) => {

  const [ rooms, setRooms ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ rowsByPage, setRowsByPage ] = useState( 10 );
  const [ page, setPage ] = useState( 1 );
  const [ prevPage, setPrevPage ] = useState('');
  const [ nextPage, setNextPage ] = useState('');
  const [ onLoad, setOnLoad ] = useState(true);

  if(editData && !columns.includes("Editar") ){
      columns.push("Editar")
      columns.push("Eliminar")
  }

  const searchUser = (query) => {
    setSearch(query);
    setPage(1);
    setOnLoad(false);
  }

  const deleteRoom = (roomId, roomNumber) => {
    const urlRoom = `http://localhost:8080/room/${roomId}`;
    useDeleteRoom(urlRoom, roomId, roomNumber, {setOnLoad})
  }

  useEffect( () => {
    setOnLoad(true);
    const urlRoom = `http://localhost:8080/room/?limit=${rowsByPage}&page=${page}&q=${search}`;
    useGetRoom(urlRoom, {setRooms, setNextPage, setPrevPage});
  }, [onLoad, search]);

  return (
    <>
    <P_Head className="p_h1" text={'Listado de Habitaciones'}/>
    <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => searchUser(e.target.value)} placeholder="Buscar" />
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
                  <th><button className='btn btn-primary' type="button" onClick={ () => editData( room.id ) } >Editar</button></th>
                  <th><button className='btn btn-outline-danger' onClick={ () => deleteRoom(room.id, room.room_number, setOnLoad) }><i className='bi bi-trash3-fill'></i></button></th>
                </tr>
              )
            })
          }
        </tbody>
    </table>
    <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={rooms.total} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_room