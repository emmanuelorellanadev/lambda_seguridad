/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useReducer } from 'react';

import '../../../css/ui/table.css'
// import { Input } from '../Input';
import { P_Head } from '../P_Head';
import { useGetReservation } from '../../reservations/hooks/useGetReservation';
import PaginationReducer from '../pagination/PaginationReducer';
import { initialPagination, paginationReducer } from '../pagination/reducer/paginationReducer';
import { useDeleteReservation } from '../../reservations/hooks/useDeleteReservation';

export const Table_reservation = ({ columns, rows, editData, deleteData, ...props}) => {

const [ onLoad, setOnLoad ] = useState(false);

  const [paginationData, dispatchPagination] = useReducer(paginationReducer , initialPagination)


  if(editData && !columns.includes("Editar") ){
      columns.push("Editar")
      columns.push("Cancelar")
  }

  const searchReservation = (query) => {
    dispatchPagination({type: "UPDATE_SEARCH", search: query})
    setOnLoad(!onLoad);
  }

  const cancelReservation = (reservationId) => {
    const urlReservation = `http://localhost:8080/reservation/${reservationId}`;
    useDeleteReservation(urlReservation, onLoad, {setOnLoad})
  }

  const getReservations = () => {
    const urlReservation = `http://localhost:8080/reservation/?limit=${paginationData.rowsByPage}&page=${paginationData.page}&q=${paginationData.search}`;
    useGetReservation(urlReservation, dispatchPagination);
  }

  useEffect( () => {
    console.log(paginationData.data)
    setOnLoad(true);
    getReservations();
  }, [onLoad]);

  return (
    <>
    <P_Head className="p_h1" text={'Listado de Reservaciones'}/>

    {/* WORK HERE!!! */}
    {/*  */}
    {/* <Input lambdaClassInput={"data_search"} type="search" value={paginationData.search} onChange={ e => searchReservation(e.target.value)} placeholder="Buscar" /> */}
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
            paginationData.data?.map( ( reservation ) => {
              return (
                <tr key={reservation.id}>
                  {/* <th>{reservation.id}</th> */}
                  <th>{reservation.Person.person_names} {' '} {reservation.Person.person_surnames}</th>
                  <th>{reservation.reservation_date}</th>
                  <th>{reservation.ReservationDetails[0].nights_number}</th>
                  <th>{reservation.ReservationDetails[0].people_number}</th>
                  <th>{reservation.ReservationState.reservationState_name}</th>
                  <th><button className='btn btn-primary' type="button" onClick={ () => editData( reservation.id ) } >Editar</button></th>
                  <th><button className='btn btn-outline-danger' onClick={ () => cancelReservation(reservation.id) }>Cancelar</button></th>
                </tr>
              )
            })
          }
        </tbody>
    </table>
    <PaginationReducer  data={paginationData} dispatch={dispatchPagination} onLoad={onLoad} setOnLoad={setOnLoad}/>
  </>
  )
}

export default Table_reservation