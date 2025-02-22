import React, { useReducer, useState } from 'react'
import CreateReservation from './CreateReservation';
import ListReservation from './ListReservation';
// import UpdateReservation from './UpdateReservation';

//work here
// when you push Operations menu show reservation frame subMenu Reservation

function menuReservationReducer (state, action) {
  switch (action.type){
    case 'CREATE_RESERVATION':
      return {createReservation: true, listReservation: false, updateReservation: false}
    case 'LIST_RESERVATION':
      return {createReservation: false, listReservation: true, updateReservation: false}
    case 'UPDATE_RESERVATION':
      return {createReservation: false, listReservation: false,updateReservation: true}
    default:
      return state
  } 
}

const SubMenuReservation = () => {

  const initialState = { createReservation: false, listReservation: true, updateReservation: false}

  const [ menuReservationState, menuReservationDispatch ] = useReducer( menuReservationReducer, initialState )
  const [ reservationId, setReservationId] = useState('');

  const navCreateReservation = () => {
      menuReservationDispatch({type: 'CREATE_RESERVATION'})
  }
  const navListReservation = () => {
    menuReservationDispatch({type: 'LIST_RESERVATION'})
}
  const navUpdateReservation = (reservationId) => {
      setReservationId(reservationId);
      menuReservationDispatch({type: 'UPDATE_RESERVATION'})
  }

  return (
      <>
      <h1></h1>
      <div className='subMenu'>
        <ul>
          <li onClick={navCreateReservation}>Crear</li>
          <li onClick={navListReservation}>Listar</li>
        </ul>
      </div>
        { menuReservationState.createReservation === true && <CreateReservation />}
        { menuReservationState.listReservation   === true && <ListReservation navUpdateReservation={navUpdateReservation} />}
        {/* { menuReservationState.updateReservation === true && <UpdateReservation  reservationId={reservationId} listReservation={navListReservation}/>} */}
      </>
  )
}

export default SubMenuReservation