import React, { useState } from 'react';

import CreateListRoomState from './CreateListRoomState.jsx';
import { UpdateRoomState } from './UpdateRoomState.jsx';

const SubMenuRoomState = () => {

  const [ createListRoomState, setCreateListRoomState ] = useState(1);
  const [ updateRoomState, setUpdateRoomState ] = useState(0);
  const [ roomStateId, setRoomStateId] =useState('');
  
  const navCreateListRoomState = () => {
      setCreateListRoomState(1);
      setUpdateRoomState(0);
  }

  const navUpdateRoomState = (id) => {
      setCreateListRoomState(0);
      setUpdateRoomState(1);
      setRoomStateId(id);
  }

  return (
      <>
      <h1></h1>
      <div className='subMenu'>
        <ul>
          <li onClick={navCreateListRoomState}>Crear y Listar</li>
        </ul>
      </div>
  
        { createListRoomState === 1 && <CreateListRoomState navUpdateRoomState={navUpdateRoomState} />}
        { updateRoomState === 1 && <UpdateRoomState  roomStateId={roomStateId}/>}
      </>
  )

}

export default SubMenuRoomState