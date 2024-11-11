import { useState } from 'react';

import '../../css/room/room.css';
import { Toaster } from 'react-hot-toast'
import { useUpdateRoom } from './hooks/useUpdateRoom.js';
import { P_Head } from '../ui/P_Head.jsx';import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { TextArea } from '../ui/TextArea.jsx';

const UpdateRoom = () => {

    const [room, setRoom] = useState('');
    const [info, setInfo] = useState('');
    const [numberBeds, setNumberBeds] = useState('');
    const [numberPeople, setNumberPeople] = useState('');
    const [phone, setPhone] = useState('');
    const [roomState, setRoomState] = useState('');
    const [roomStates, setRoomStates] = useState('');

    const saveButton = (e) => {
        e.preventDefault();
        updateRoom();
        cleanForm();
    }

    const cleanForm = () =>{
        setRoom('');
        setInfo('');
        setNumberBeds('');
        setNumberPeople('');
        setPhone('');
        setRoomState('');
        setRoomStates('');
    }
  return (
    <>
        <div className='room_container'>
            <P_Head className="p_h1" text="Modificar Habitación"/>
            <form className='room_form' encType='multipart/form-data' id='CreateRoom_form' onSubmit={saveButton}>
                <div>
                    <Label lambdaClassLabel={""} text="Habitación:"/>
                    <Input lambdaClassInput={""} type="text" name="room_number" id="room"  value={room} onChange={ (e) => setRoom(e.target.value)} placeholder={"Nombre habitación"} autoFocus required />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Beds:"/>
                    <Input lambdaClassInput={""} type="number" name="room_beds"  id="beds" value={numberBeds} onChange={ (e) => setNumberBeds(e.target.value)} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Personas Max:"/>
                    <Input lambdaClassInput={""} type="number" name="room_people" id="people" value={numberPeople} onChange={ (e) => setNumberPeople(e.target.value)}required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Teléfono:"/>
                    <Input lambdaClassInput={""} type="number" name="room_phone" id="phone" value={phone} onChange={ (e) => setPhone(e.target.value)} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Información:"/>
                    <TextArea name="room_info" id="info" value={info} onChange={ (e) => setInfo(e.target.value)} required/>
                </div>
                <div className='sendRoom_button'>
                    <button className='btn btn-primary' id='saveButton' >Actualizar</button>
                </div>
            </form>
        </div>
        <Toaster />
    </>
  )
}

export default UpdateRoom