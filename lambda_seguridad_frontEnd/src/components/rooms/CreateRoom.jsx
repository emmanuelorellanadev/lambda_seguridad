import { useEffect, useReducer, useState } from 'react';

import '../../css/room/room.css';
import { Toaster } from 'react-hot-toast'
import { useCreateRoom } from './hooks/useCreateRoom.js';
import { P_Head } from '../ui/P_Head.jsx';import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { TextArea } from '../ui/TextArea.jsx';
import { Select } from '../ui/Select.jsx';
import { useGetBranch } from '../branches/hooks/useGetBranch.js'
import { useGetRoomStates } from '../roomStates/hooks/useGetRoomStates.js'
import Table_createRoom_price from '../ui/tables/createRoom/Table_createRoom_price.jsx';
import Table_createRoom_service from '../ui/tables/createRoom/Table_createRoom_service.jsx';


function reducer (state, action) {
    switch (action.type){
        case "UPDATE_ROOM": {
            return {
                ...state,
                room: action.room
            }
        }
        case "UPDATE_BEDS": {
            return {
                ...state,
                beds: action.beds
            }
        }
        case "UPDATE_MAXPEOPLE": {
            return {
                ...state,
                maxPeople: action.maxPeople
            }
        }
        case "UPDATE_PHONE": {
            return {
                ...state,
                phone: action.phone
            }
        }
        case "UPDATE_INFORMATION": {
            return {
                ...state,
                info: action.info
            }
        }
        case "UPDATE_STATEID": {
            return {
                ...state,
                stateId: action.stateId
            }
        }
        case "UPDATE_BRANCHID": {
            return {
                ...state,
                branchId: action.branchId
            }
        }
        case "UPDATE_PRICES": {
            return {
                ...state,
                prices: action.prices
            }
        }
        case "UPDATE_SERVICES": {
            return {
                ...state,
                services: action.services
            }
        }
        case "RESET": {
            return { 
                room: '',
                beds: '',
                maxPeople: '',
                phone: '',
                info: '',
                RoomStateId: '',
                BranchId: '',
                prices: [],
                services: [] 
            }
        }
        default: return state
    }
}

    const initialRoom = {
        room: '',
        beds: '',
        maxPeople: '',
        phone: '',
        info: '',
        RoomStateId: '',
        BranchId: '',
        prices: [],
        services: []
    }

const CreateRoom = () => {

    const [createRoom, createRoomDispatch] = useReducer(reducer, initialRoom)

    const [roomStatesRes, setRoomStatesRes] = useState('');
    const [ branches, setBranches ] = useState([])
    //pagination
    const [ search, setSearch ] = useState('');
    const [ rowsByPage, setRowsByPage ] = useState( 10 );
    const [ page, setPage ] = useState( 1 );
    const [ prevPage, setPrevPage ] = useState('');
    const [ nextPage, setNextPage ] = useState('');
    //

    const saveButton = (e) => {
        e.preventDefault();
        const urlRoom = `http://localhost:8080/room/`;
        const roomData = {
            "room_number": createRoom.room,
            "room_beds": createRoom.beds,
            "room_people": createRoom.maxPeople,
            "room_phone": createRoom.phone,
            "room_info": createRoom.info,
            "RoomStateId": createRoom.stateId,
            "BranchId": createRoom.branchId,
            "services": createRoom.services,
            "prices": createRoom.prices
        }
        console.log(createRoom);
        createRoomDispatch({type: 'RESET'})
        // useCreateRoom(urlRoom, roomData);
    }

    useEffect( () => {
        const urlBranch = `http://localhost:8080/branch/?limit=${rowsByPage}&page=${page}&q=${search}`;
        const urlRoomState = `http://localhost:8080/roomState/?limit=${rowsByPage}&page=${page}&q=${search}`;
        useGetBranch(urlBranch, { setBranches,  setNextPage, setPrevPage, setPage})
        useGetRoomStates(urlRoomState, { setRoomStatesRes,  setNextPage, setPrevPage, setPage});
    }, [])
  return (
    <>
        <div className='room_container'>
            <P_Head className="p_h1" text="Crear Habitación"/>
            <form className='room_form' onSubmit={saveButton}>
                <div>
                    <Label lambdaClassLabel={""} text="Habitación:"/>
                    <Input lambdaClassInput={""} type="text" name="room_number" value={createRoom.room} onChange={ (e) => { createRoomDispatch({type: "UPDATE_ROOM", room: e.target.value}) } } placeholder={"Nombre habitación"} autoFocus required />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Camas:"/>
                    <Input lambdaClassInput={""} type="number" name="room_beds" value={createRoom.beds} onChange={ (e) => (createRoomDispatch({ type: "UPDATE_BEDS", beds: e.target.value}))} placeholder={"Número de camas"} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Máximo:"/>
                    <Input lambdaClassInput={""} type="number" name="room_people" value={createRoom.maxPeople} onChange={ (e) => (createRoomDispatch({ type: "UPDATE_MAXPEOPLE", maxPeople: e.target.value}))} placeholder={"Número de huespedes"} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Teléfono:"/>
                    <Input lambdaClassInput={""} type="number" value={createRoom.phone} onChange={  (e) => (createRoomDispatch({ type: "UPDATE_PHONE", phone: e.target.value}))} placeholder={"Número de teléfono"}/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Información:"/>
                    <TextArea name="room_info" id="info" value={createRoom.info} onChange={  (e) => (createRoomDispatch({ type: "UPDATE_INFORMATION", info: e.target.value}))} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Estado:"/>
                    <Select data={roomStatesRes?.data} text="Selecciona Estado" onChange={  (e) => (createRoomDispatch({ type: "UPDATE_STATEID", stateId: e.target.value}))} required />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Sucursal:"/>
                    <Select data={branches?.data} text="Selecciona Sucursal" onChange={  (e) => (createRoomDispatch({ type: "UPDATE_BRANCHID", branchId: e.target.value}))} required />
                </div>
                <div className='table-responsive roomTable_container'>
                    <Table_createRoom_price columns={["Precio"]} dispatch={createRoomDispatch}/>
                </div>
                <div className='table-responsive roomTable_container'>
                    <Table_createRoom_service columns={["Servicios"]} dispatch={createRoomDispatch}/>
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

export default CreateRoom
