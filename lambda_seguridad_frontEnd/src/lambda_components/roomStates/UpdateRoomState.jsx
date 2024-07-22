import React, {useEffect, useState} from 'react'

import '../../css/personType/personType.css';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Toaster } from 'react-hot-toast';
import { useGetRoomStates } from './hooks/useGetRoomStates';
import { useUpdateRoomState } from './hooks/useUpdateRoomState';

export const UpdateRoomState = (props) => {

  const [roomStateName, setRoomStateName] = useState('');
  const [roomStateState, setRoomStateState] = useState(false);

  const urlRoomState = `http://localhost:8080/roomState/${props.roomStateId}`;

  const updateRoomState = (e) => {
    e.preventDefault();
    useUpdateRoomState(urlRoomState, roomStateName, roomStateState);
  }
  
useEffect( () => {
  useGetRoomStates(urlRoomState, {setRoomStateName, setRoomStateState });
}, [])

  return (
    <>
      <div className='personType_container'>
        <P_Head text={'Administración de Estados de Habitación'} className={'p_h1'}/>
        <P_Head text={'Actualizar Estado de Habitación'} className={'p_h2'}/>
        <form className={'personType_form'} onSubmit={(e) => updateRoomState(e)}>
          <div>
            <Label lambdaClassLabel="" text="Tipo:"/>
            <Input lambdaClassInput="" type="text"  value={roomStateName} onChange={(e) => setRoomStateName( e.target.value )} placeholder='Tipo de persona' required/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Estado:"/>
            <Input lambdaClassInput="" type="checkbox" value={roomStateState} onChange={ (e) => setRoomStateState(!roomStateState) } checked={roomStateState} />
            
          </div>
          <div></div>
          <div className='sendRole_button'>
            <button className='btn btn-primary' >Actualizar</button>
          </div>
        </form>
      </div>
      <Toaster/>
    </>
  )
}

export default UpdateRoomState
