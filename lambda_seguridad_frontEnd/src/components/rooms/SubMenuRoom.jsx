import React, { useReducer, useState } from 'react'
import CreateRoom from './CreateRoom'
import ListRoom from './ListRoom'


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

const SubMenuRoom = () => {

  const initialState = { createRoom: true, listRoom: false, updateRoom: false}

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
        </ul>
      </div>
        { menuRoomState.createRoom === true && <CreateRoom navUpdateRoom={navUpdateRoom} />}
        { menuRoomState.listRoom === true && <ListRoom navUpdateRoom={navUpdateRoom} />}
        { menuRoomState.updateRoom === true && <UpdateRoom  roomId={roomId}/>}
      </>
  )
}

export default SubMenuRoom