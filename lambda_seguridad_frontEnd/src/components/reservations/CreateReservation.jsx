import { useEffect, useState, useReducer } from 'react';

import '../../css/reservation/reservation.css';
import { Toaster } from 'react-hot-toast';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useSearchPerson } from '../people/hooks/useSearchPerson';
import { initialCreateReservation, reservationReducer } from './reducer/reservationReducer';
import Table_searchSelect_room from '../ui/tables/createReservation/Table_searchSelect_room';
const CreateReservation = () => {


    //WORK HERE!!!
    // Use reducer to management states of reservation
    //You can do it !!!
    const [createReservationData, createReservationDispatch] = useReducer(reservationReducer, initialCreateReservation)



    const [ onLoad, setOnLoad ] = useState(false);


    //WORK HERE !!!!
    //search the person and save relevant data
    //select reservation data and calculate the nights
    //show the rooms availables in that date

    const searchPerson = async(q) => {
        const urlPerson = `http://localhost:8080/person/?q=${q}`

        createReservationDispatch({ type: "UPDATE_QUERY", query: q})
        await useSearchPerson( urlPerson, { createReservationDispatch } );
        setOnLoad(true)
    }


    //WORK HERE!!!
    //problems to load nights on the field
    const calculateNights = async() => {
        const datein = new Date(createReservationData.date_in);
        const dateout = new Date(createReservationData.date_out);

        const diff = (dateout.getTime() - datein.getTime());
        console.log(diff);
        const nights = ((diff / (1000 * 60 * 60 * 24)) + 1);//calculate number of nights
        console.log(nights);
        await createReservationDispatch({ type: "UPDATE_NIGHTS", nights_number: ( nights )})
        // setOnLoad(true);
    }
    
    const saveButton = (e) => {
        e.preventDefault();
        console.log('saveButton')
        // const urlRoom = `http://localhost:8080/room/`;
        // useCreateRoom(urlRoom, createReservationData);
        // createReservationDispatch({type: 'RESET'});
        // setOnLoad(true)
    }

    useEffect( () => {
        setOnLoad(false)
        // const urlBranch = `http://localhost:8080/branch/`;
        // const urlRoomState = `http://localhost:8080/roomState/`;
        // useGetBranch(urlBranch, { setBranches,  setNextPage, setPrevPage, setPage})
        // useGetRoomStates(urlRoomState, { setRoomStatesRes,  setNextPage, setPrevPage, setPage});

    }, [onLoad])
    
  return (
    <>
        <div className='reservation_container'>
            <P_Head className="p_h1" text="Crear Reservación"/>
            <form className='reservation_form' onSubmit={saveButton}>
                <div>
                    <Label lambdaClassLabel={""} text="Buscar:"/>
                    <Input lambdaClassInput={""} type="search" name="cui" onChange={ (e) => { searchPerson(e.target.value) } } autoFocus required />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Nombre:"/>
                    <Input lambdaClassInput={""} type="text" name="name" value={createReservationData.name} onChange={ (e) => {  } } disabled/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Contacto:"/>
                    <Input lambdaClassInput={""} type="number"  value={createReservationData.phone} onChange={ () => { } } required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="CUI:"/>
                    <Input lambdaClassInput={""} type="number"  value={createReservationData.cui} onChange={ () => { } } required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="NIT:"/>
                    <Input lambdaClassInput={""} type="number" value={createReservationData.nit} onChange={ () => { } } />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Fecha entrada:"/>
                    <Input lambdaClassInput={""} type="date" value={createReservationData.date_in} onChange={ (e) => { createReservationDispatch({type: "UPDATE_DATEIN", date_in : e.target.value}) } } required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Fecha salida:"/>
                    <Input lambdaClassInput={""} type="date" value={createReservationData.date_out} onChange={ (e) => { createReservationDispatch({type: "UPDATE_DATEOUT", date_out: e.target.value}); calculateNights() } } required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Noches:"/>
                    <Input lambdaClassInput={""} type="text" value={ createReservationData.nights_number } onChange={ () => { } } />
                </div>
                <div className='table-responsive roomTable_container'>
                    <P_Head className="p_h3" text="Habitaciones disponibles"/>
                    <Table_searchSelect_room columns={["Habitación", "Camas", "Max Huespedes", "Información", "Reservar"]} onLoad={onLoad} setOnLoad={setOnLoad} dispatch={createReservationDispatch}/>
                </div>
                {/* <div>
                    <Label lambdaClassLabel={""} text="Noches:"/>
                    <Input lambdaClassInput={""} type="number" value={createReservationData.nights} onChange={ (e) => { createReservationDispatch({type: "UPDATE_NIGHTS", action: e.target.value})} } required/>
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
