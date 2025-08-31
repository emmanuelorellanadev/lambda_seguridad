import React, { useReducer, useState } from 'react'
import CreateRoom from './CreateRoom';
import ListRoom from './ListRoom';
import UpdateRoom from './UpdateRoom';


function menuRoomReducer (state, action) {
  switch (action.type){
    case 'CREATE_ROOM':
      return {createRoom: true, listRoom: false, updateRoom: false}
    case 'LIST_ROOM':
      return {createRoom: false, listRoom: true, updateRoom: false}
    case 'UPDATE_ROOM':
      return {createRoom: false, listRoom: false,updateRoom: true}
    default:
      return state
  } 
}

const SubMenuRoom = (props) => {

  const initialState = { createRoom: false, listRoom: true, updateRoom: false}

  const [ menuRoomState, menuRoomDispatch ] = useReducer( menuRoomReducer, initialState )
  const [ roomId, setRoomId] = useState('');

  const navCreateRoom = () => {
      menuRoomDispatch({type: 'CREATE_ROOM'})
  }
  const navListRoom = () => {
    menuRoomDispatch({type: 'LIST_ROOM'})
}
  const navUpdateRoom = (roomId) => {
      setRoomId(roomId);
      menuRoomDispatch({type: 'UPDATE_ROOM'})
  }

  return (
      <>
      <h1></h1>
      <div className='subMenu'>
        <ul>
          <li onClick={navCreateRoom}>Crear</li>
          <li onClick={navListRoom}>Listar</li>
          <li onClick={props.showRoomStateFrame}>Estados</li>
          <li onClick={props.showPriceFrame}>Precios</li>
          <li onClick={props.showServiceFrame}>Servicios</li>
        </ul>
      </div>
        { menuRoomState.createRoom === true && <CreateRoom />}
        { menuRoomState.listRoom === true && <ListRoom navUpdateRoom={navUpdateRoom} />}
        { menuRoomState.updateRoom === true && <UpdateRoom  roomId={roomId} listRoom={navListRoom}/>}
      </>
  )
}

export default SubMenuRoom