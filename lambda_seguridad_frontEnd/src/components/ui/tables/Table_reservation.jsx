import { useEffect, useState } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { P_Head } from '../P_Head';
import { useGetReservation } from '../../reservations/hooks/useGetReservation';
import Pagination from '../Pagination';
// import { useDeleteRoom } from '../../rooms/hooks/useDeleteRoom';

export const Table_reservation = ({ columns, rows, editData, deleteData, ...props}) => {

  const [ reservations, setReservations ] = useState([]);
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

  const searchReservation = (query) => {
    setSearch(query);
    setPage(1);
    setOnLoad(false);
  }

  // const deleteReservation = (reservationId, roomNumber) => {
  //   const urlReservation = `http://localhost:8080/reservation/${reservationId}`;
  //   useDeleteReservation(urlReservation, reservationId, {setOnLoad})
  // }

  //WORK HERE!!!
  //need to fill list reservation
  //check

  const getReservations = () => {
    const urlReservation = `http://localhost:8080/reservation/?limit=${rowsByPage}&page=${page}&q=${search}`;
    useGetReservation(urlReservation, {setReservations, setNextPage, setPrevPage});
  }

  useEffect( () => {
    setOnLoad(true);
    getReservations()
  }, [onLoad, search]);

  return (
    <>
    <P_Head className="p_h1" text={'Listado de Reservaciones'}/>
    <Input lambdaClassInput={"data_search"} type="search" value={search} onChange={ e => searchReservation(e.target.value)} placeholder="Buscar" />
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
            reservations.data?.map( ( reservation ) => {
              return (
                <tr key={reservation.id}>
                  {/* <th>{reservation.id}</th> */}
                  <th>{reservation.Person.person_names} {' '}  {reservation.Person.person_surnames}</th>
                  <th>{reservation.ReservationDetails[0].date_in.split(" ")[0]}</th>
                  <th>{reservation.ReservationDetails[0].nights_number}</th>
                  <th>{reservation.ReservationDetails[0].people_number}</th>
                  <th>{reservation.ReservationState.reservationState_name}</th>
                  {/* <th><button className='btn btn-primary' type="button" onClick={ () => editData( reservation.id ) } >Editar</button></th> */}
                  {/* <th><button className='btn btn-outline-danger' onClick={ () => deleteReservation(reservation.id, room.room_number, setOnLoad) }><i className='bi bi-trash3-fill'></i></button></th> */}
                </tr>
              )
            })
          }
        </tbody>
    </table>
    <Pagination page={page} setPage={setPage} rowsByPage={rowsByPage} setRowsByPage={setRowsByPage} prevPage={prevPage} nextPage={nextPage} total={reservations.total} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_reservation