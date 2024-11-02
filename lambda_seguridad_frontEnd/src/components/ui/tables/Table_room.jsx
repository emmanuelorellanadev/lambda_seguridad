import React, { useEffect, useState } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { P_Head } from '../P_Head';
import { useGetRoom } from '../../rooms/hooks/useGetRoom';
import Pagination from '../Pagination';

export const Table_room = ({ columns, rows, editData, deleteData, ...props}) => {

  const [rooms, setRooms] = useState([]);
  const [branch, setBranch] = useState(0);
  const [ search, setSearch ] = useState('');
  const [ rowsByPage, setRowsByPage ] = useState( 10 );
  const [ page, setPage ] = useState( 1 );
  const [ prevPage, setPrevPage ] = useState('');
  const [ nextPage, setNextPage ] = useState('');
  const [ onLoad, setOnLoad ] = useState(true);

  if(editData && !columns.includes("Editar") ){
      columns.push("Editar")
  }

  if(deleteData && !columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

// const selectRoom = (roomSelected) => {
//   setBranch(roomSelected);
//   if ( roomSelected != 0 ){
//     const urlUsersByBranch = `http://localhost:8080/usersByBranch/?id=${roomSelected}&q=${search}&limit=${rowsByPage}&page=${page}`;
//     useGetUser(urlUsersByBranch, {setUsers, setNextPage, setPrevPage});
//   } else {
//     setOnLoad(false)
//   } 
// }

  const searchUser = (query) => {
    setSearch(query);
    setPage(1);
    setOnLoad(false);
  }

  // const getUsers = async() => {
  //   const urlUser = `http://localhost:8080/user/?q=${search}&limit=${rowsByPage}&page=${page}`;
  //   await useGetUser(urlUser, { setUsers, setNextPage, setPrevPage});
  // }

  useEffect( () => {
    setOnLoad(true);
    const urlRoom = 'http://localhost:8080/room/';
    useGetRoom(urlRoom, {setRooms, setNextPage, setPrevPage});
    // if(rooms != 0) {
    //   selectRoom(rooms)
    // }else{
    //   getUsers()
    // }
  }, [onLoad, search]);

  return (
    <>
      <P_Head className="p_h1" text={'Listado de Habitaciones'}/>
      <div className='' >
          <div>
              <label htmlFor="room">Sucursales: </label>
              <select className='form-control text-center' name="room" id="room" value={branch} onChange={(e) => {setSearch(''); selectRoom(e.target.value)}}>
                  <option value={0} >Todas</option>
                  {
                      rooms.data?.map( b => {
                          return (<option key={b.id} value={b.id}>{b.branch_name}</option>)
                      })
                  }
              </select>
          </div>
      </div>

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
            rooms.data?.map( ( user ) => {
              if(editData && deleteData){
                  return (
                    <tr key={user.id}>
                      <th>{user.id}</th>
                      <th>{user.user_name}</th>
                      <th>{user.Role?.role_name}</th>
                      <th><input type='checkbox' checked={user.user_state} disabled/></th>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( user.id ) } >Editar</button></th>
                      <th><button className='btn btn-outline-danger' onClick={ () => deleteData(user.id, user.user_name, setOnLoad) }><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>
                  )
              }else if(editData){
                return (
                    <tr key={user.id}>
                    <th>{user.id}</th>
                    <th>{user.user_name}</th>
                    <th>{user.role_name}</th>
                    <th><input type='checkbox' checked={user.user_state} disabled/></th>
                    <th><button className='btn btn-primary' type="button" onClick={ () => editData( user.id ) } >Editar</button></th>
                  </tr>
                )
              }else{
                return (
                    <tr key={user.id}>
                    <th>{user.id}</th>
                    <th>{user.user_name}</th>
                    <th>{user.role_name}</th>
                    <th><input type='checkbox' checked={user.user_state} disabled/></th>
                  </tr>
                )
              }
              })
          }
        </tbody>
    </table>
    {/* Pagination does not work when you go back and forth several times. The problem does not occur when a branch is selected. */}
    <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={rooms.total} setOnLoad={setOnLoad}/>
    <label htmlFor="">prevPage: {prevPage} nextPage: {nextPage}</label>
  </>
  )
}

export default Table_room