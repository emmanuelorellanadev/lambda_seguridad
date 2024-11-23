import { useEffect, useReducer, useState } from 'react';

import '../../css/room/room.css';
import { roomReducer, initialCreateRoom } from './reducer/roomReducer.js';
import { Toaster } from 'react-hot-toast'
import { useUpdateRoom } from './hooks/useUpdateRoom.js';
import { P_Head } from '../ui/P_Head.jsx';import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { TextArea } from '../ui/TextArea.jsx';
import { Select } from '../ui/Select.jsx';
import { useGetBranch } from '../branches/hooks/useGetBranch.js'
import { useGetRoomStates } from '../roomStates/hooks/useGetRoomStates.js'
import Table_createRoom_price from '../ui/tables/createRoom/Table_createRoom_price.jsx';
import Table_createRoom_service from '../ui/tables/createRoom/Table_createRoom_service.jsx';
import { useGetRoom } from './hooks/useGetRoom.js';

const UpdateRoom = (props) => {

    const [roomData, roomDispatch] = useReducer(roomReducer, initialCreateRoom)

    const [ roomStatesRes, setRoomStatesRes ] = useState('');
    const [ branches, setBranches ] = useState([])
    //pagination
    const [ page, setPage ] = useState( 1 );
    const [ prevPage, setPrevPage ] = useState('');
    const [ nextPage, setNextPage ] = useState('');

    const [ onLoad, setOnLoad ] = useState(false);
    
    const updateButton = (e) => {
        e.preventDefault();
        const urlRoom = `http://localhost:8080/room/${props.roomId}`;
        useUpdateRoom(urlRoom, roomData);
        setOnLoad(true)
    }

    useEffect( () => {
        const urlBranch = `http://localhost:8080/branch/`;
        const urlRoomState = `http://localhost:8080/roomState/`;
        const urlRoom = `http://localhost:8080/room/${props.roomId}`;
        useGetBranch(urlBranch, { setBranches,  setNextPage, setPrevPage, setPage})
        useGetRoomStates(urlRoomState, { setRoomStatesRes,  setNextPage, setPrevPage, setPage});
        useGetRoom(urlRoom, { roomDispatch,  setNextPage, setPrevPage, setPage});
    }, [])
    
  return (
    <>
        <div className='room_container'>
            <P_Head className="p_h1" text="Actualizar Habitación"/>
            <form className='room_form' onSubmit={updateButton}>
                <div>
                    <Label lambdaClassLabel={""} text="Habitación:"/>
                    <Input lambdaClassInput={""} type="text" name="room_number" value={roomData.room} onChange={ (e) => { roomDispatch({type: "UPDATE_ROOM", room: e.target.value}) } } placeholder={"Nombre habitación"} autoFocus required />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Camas:"/>
                    <Input lambdaClassInput={""} type="number" name="room_beds" value={roomData.beds} onChange={ (e) => (roomDispatch({ type: "UPDATE_BEDS", beds: e.target.value}))} placeholder={"Número de camas"} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Máximo:"/>
                    <Input lambdaClassInput={""} type="number" name="room_people" value={roomData.maxPeople} onChange={ (e) => (roomDispatch({ type: "UPDATE_MAXPEOPLE", maxPeople: e.target.value}))} placeholder={"Número de huespedes"} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Teléfono:"/>
                    <Input lambdaClassInput={""} type="number" value={roomData.phone} onChange={  (e) => (roomDispatch({ type: "UPDATE_PHONE", phone: e.target.value}))} placeholder={"Número de teléfono"}/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Información:"/>
                    <TextArea lambdaClassTextArea="" name="room_info" id="info" value={roomData.info} onChange={  (e) => (roomDispatch({ type: "UPDATE_INFO", info: e.target.value}))} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Estado:"/>
                    <Select data={roomStatesRes?.data} text="Selecciona Estado" value={roomData.stateId} onChange={  (e) => (roomDispatch({ type: "UPDATE_STATEID", stateId: e.target.value}))} />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Sucursal:"/>
                    <Select data={branches?.data} text="Selecciona Sucursal" value={roomData.branchId} onChange={  (e) => (roomDispatch({ type: "UPDATE_BRANCHID", branchId: e.target.value}))} />
                </div>
                <div className='room_priceTable_container table-responsive roomTable_container'>
                    <P_Head className="p_h3" text="PRESIOS"/>
                    <Table_createRoom_price columns={["Precio", "Eliminar"]} onLoad={onLoad} setOnLoad={setOnLoad} roomData={roomData} dispatch={roomDispatch}/>
                </div>
                <div className='room_priceTable_container table-responsive roomTable_container'>
                    <P_Head className="p_h3" text="SERVICIOS"/>
                    <Table_createRoom_service columns={["Servicios", "Eliminar"]} onLoad={onLoad} setOnLoad={setOnLoad} roomData={roomData}  dispatch={roomDispatch}/>
                </div>
                <div className='sendRoom_button'>
                    <button className='btn btn-primary' id='saveButton' >Guardar</button>
                </div>
            </form>
        </div>
        <Toaster />
    </>
  )
}

export default UpdateRoom
