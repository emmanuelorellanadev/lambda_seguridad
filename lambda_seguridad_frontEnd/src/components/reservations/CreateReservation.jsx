import { useEffect, useState, useReducer } from 'react';

import '../../css/reservation/reservation.css';
import { Toaster } from 'react-hot-toast';
import { initialCreateReservation, reservationReducer } from './reducer/reservationReducer';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
const CreateReservation = () => {


    //WORK HERE!!!
    // Use reducer to management states of reservation
    //You can do it !!!
    const [createReservationData, createReservationDispatch] = useReducer(reservationReducer, initialCreateReservation)

    // const [ roomStatesRes, setRoomStatesRes ] = useState('');
    // const [ branches, setBranches ] = useState([])
    //pagination
    // const [ page, setPage ] = useState( 1 );
    // const [ prevPage, setPrevPage ] = useState('');
    // const [ nextPage, setNextPage ] = useState('');

    const [ onLoad, setOnLoad ] = useState(false);
    
    const saveButton = (e) => {
        e.preventDefault();
        console.log(createReservationData)
        // const urlRoom = `http://localhost:8080/room/`;
        // useCreateRoom(urlRoom, createReservationData);
        createReservationDispatch({type: 'RESET'});
        setOnLoad(true)
    }

    useEffect( () => {
        // const urlBranch = `http://localhost:8080/branch/`;
        // const urlRoomState = `http://localhost:8080/roomState/`;
        // useGetBranch(urlBranch, { setBranches,  setNextPage, setPrevPage, setPage})
        // useGetRoomStates(urlRoomState, { setRoomStatesRes,  setNextPage, setPrevPage, setPage});
    }, [])
    
  return (
    <>
        <div className='room_container'>
            <P_Head className="p_h1" text="Crear Reservación"/>
            <form className='room_form' onSubmit={saveButton}>
                <div>
                    <Label lambdaClassLabel={""} text="Sucursal:"/>
                    <Input lambdaClassInput={""} type="text" name="room_number" value={createReservationData.room} onChange={ (e) => { createReservationDispatch({type: "UPDATE_ROOM", room: e.target.value}) } } placeholder={"Nombre habitación"} autoFocus required />
                </div>
                {/* <div>
                    <Label lambdaClassLabel={""} text="Camas:"/>
                    <Input lambdaClassInput={""} type="number" name="room_beds" value={createReservationData.beds} onChange={ (e) => (createReservationDispatch({ type: "UPDATE_BEDS", beds: e.target.value}))} placeholder={"Número de camas"} required/>
                </div> */}
                {/* <div>
                    <Label lambdaClassLabel={""} text="Máximo:"/>
                    <Input lambdaClassInput={""} type="number" name="room_people" value={createReservationData.maxPeople} onChange={ (e) => (createReservationDispatch({ type: "UPDATE_MAXPEOPLE", maxPeople: e.target.value}))} placeholder={"Número de huespedes"} required/>
                </div> */}
                {/* <div>
                    <Label lambdaClassLabel={""} text="Teléfono:"/>
                    <Input lambdaClassInput={""} type="number" value={createReservationData.phone} onChange={  (e) => (createReservationDispatch({ type: "UPDATE_PHONE", phone: e.target.value}))} placeholder={"Número de teléfono"}/>
                </div> */}
                {/* <div>
                    <Label lambdaClassLabel={""} text="Información:"/>
                    <TextArea lambdaClassTextArea="" name="room_info" id="info" value={createReservationData.info} onChange={  (e) => (createReservationDispatch({ type: "UPDATE_INFO", info: e.target.value}))} required/>
                </div> */}
                {/* <div>
                    <Label lambdaClassLabel={""} text="Estado:"/>
                    <Select data={roomStatesRes?.data} text="Selecciona Estado" onChange={  (e) => (createReservationDispatch({ type: "UPDATE_STATEID", stateId: e.target.value}))} />
                </div> */}
                {/* <div>
                    <Label lambdaClassLabel={""} text="Sucursal:"/>
                    <Select data={branches?.data} text="Selecciona Sucursal" value={1} onChange={  (e) => (createReservationDispatch({ type: "UPDATE_BRANCHID", branchId: e.target.value}))} disabled />
                </div> */}
                {/* <div className='room_priceTable_container table-responsive roomTable_container'>
                    <P_Head className="p_h3" text="PRESIOS"/>
                    <Table_createRoom_price columns={["Precio", "Eliminar"]} onLoad={onLoad} setOnLoad={setOnLoad} roomData={createReservationData} dispatch={createReservationDispatch}/>
                </div> */}
                {/* <div className='room_priceTable_container table-responsive roomTable_container'>
                    <P_Head className="p_h3" text="SERVICIOS"/>
                    <Table_createRoom_service columns={["Servicios", "Eliminar"]} onLoad={onLoad} setOnLoad={setOnLoad} roomData={createReservationData}  dispatch={createReservationDispatch}/>
                </div> */}
                <div className='sendRoom_button'>
                    <button className='btn btn-primary' id='saveButton' >Guardar</button>
                </div>
            </form>
        </div>
        <Toaster />
    </>
  )
}

export default CreateReservation
