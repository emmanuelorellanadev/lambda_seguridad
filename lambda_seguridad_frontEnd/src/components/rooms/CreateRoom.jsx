import { useEffect, useState } from 'react';

import '../../css/room/room.css';
import { Toaster } from 'react-hot-toast'
import { useCreateRoom } from './hooks/useCreateRoom.js';
import { P_Head } from '../ui/P_Head.jsx';import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { TextArea } from '../ui/TextArea.jsx';
import { Select } from '../ui/Select.jsx';
import { useGetBranch } from '../branches/hooks/useGetBranch.js'
import { useGetRoomStates } from '../roomStates/hooks/useGetRoomStates.js'
import Table_createRoom_price from '../ui/tables/createRoom.jsx/Table_createRoom_price.jsx';

const CreateRoom = () => {

    const [room, setRoom] = useState('');
    const [info, setInfo] = useState('');
    const [numberBeds, setNumberBeds] = useState('');
    const [numberPeople, setNumberPeople] = useState('');
    const [phone, setPhone] = useState('');
    const [roomState, setRoomState] = useState('');
    const [roomStates, setRoomStatesRes] = useState('');
    const [roomStateId, setRoomStateId] = useState(1);
    const [ branches, setBranches ] = useState([])
    const [ branchId, setBranchId ] = useState("");
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
            "room_number": room,
            "room_beds": numberBeds,
            "room_people": numberPeople,
            "room_phone": phone,
            "room_info": info,
            "RoomStateId": roomStateId,
            "BranchId": branchId,
            "services": [],
            "prices": []
        }
        useCreateRoom(urlRoom, roomData);
        // cleanForm();
    }

    const searching = (query) => {
        setSearch(query); 
        setPage(1);
        setOnLoad(false);
      }

    const deletePrice = () => {
        console.log('Delete price');
    }

    const cleanForm = () =>{
        setRoom('');
        setInfo('');
        setNumberBeds('');
        setNumberPeople('');
        setPhone('');
        setRoomState('');
        setRoomStatesRes('');
        setRoomStateId('');
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
                    <Input lambdaClassInput={""} type="text" name="room_number"value={room} onChange={ (e) => setRoom(e.target.value)} placeholder={"Nombre habitación"} autoFocus required />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Camas:"/>
                    <Input lambdaClassInput={""} type="number" name="room_beds"   value={numberBeds} onChange={ (e) => setNumberBeds(e.target.value)} placeholder={"Número de camas"} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Máximo:"/>
                    <Input lambdaClassInput={""} type="number" name="room_people" value={numberPeople} onChange={ (e) => setNumberPeople(e.target.value)} placeholder={"Número de huespedes"} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Teléfono:"/>
                    <Input lambdaClassInput={""} type="number" value={phone} onChange={ (e) => setPhone(e.target.value)} placeholder={"Número de teléfono"}/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Información:"/>
                    <TextArea name="room_info" id="info" value={info} onChange={ (e) => setInfo(e.target.value)} required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Estado:"/>
                    <Select data={roomStates?.data} text="Selecciona Estado" onChange={ (e) => {setRoomStateId(e.target.value)}} required />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Sucursal:"/>
                    <Select data={branches?.data} text="Selecciona Sucursal" onChange={ (e) => {setBranchId(e.target.value)}} required />
                </div>
                <div className='table-responsive roomTable_container'>
                    <Table_createRoom_price columns={["Precio"]} deleteData={deletePrice}/>
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
