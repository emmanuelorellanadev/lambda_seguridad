import { useEffect, useState, useReducer } from 'react';

import '../../css/reservation/reservation.css';
import { Toaster } from 'react-hot-toast';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useSearchPerson } from '../people/hooks/useSearchPerson';
import { initialCreateReservation, reservationReducer } from './reducer/reservationReducer';
import Table_searchSelect_room from '../ui/tables/createReservation/Table_searchSelect_room';
import { useCreateReservation } from './hooks/useCreateReservation';
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
        await useSearchPerson( urlPerson, createReservationDispatch );
        setOnLoad(true)
    }


//WORK HERE!!!
    //problems to calculate and load nights on the field
    const calculateNights = async(datein, dateout) => {
        
        let dateIn = '';
        let dateOut = '';
        if (datein) {
            createReservationDispatch({type: "UPDATE_DATEIN", date_in : datein});
            dateIn = new Date(datein);
        }
        if (dateout) {
            createReservationDispatch({type: "UPDATE_DATEOUT", date_out: dateout});
            dateOut = new Date(dateout);
        }
        if (datein && dateout){ 
            const diff = (dateOut.getTime() - dateIn.getTime());
            const nights = ((diff / (1000 * 60 * 60 * 24)));//calculate number of nights
            createReservationDispatch({ type: "UPDATE_NIGHTS", nights_number:  nights })
        }
        setOnLoad(true);

    }
    
    const saveButton = (e) => {
        e.preventDefault();
        const urlReservation = `http://localhost:8080/reservation/`;
        useCreateReservation(urlReservation, createReservationData);
        createReservationDispatch({type: 'RESET'});
        document.querySelector("#searchPerson").value = '';
        setOnLoad(!onLoad)
    }

    useEffect( () => {
        setOnLoad(false)
        createReservationDispatch({type: 'UPDATE_USER', UserId: sessionStorage.getItem('uid-xL')})
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
                <section >
                    {/* <div id='InputSearch'> */}
                        {/* <Label lambdaClassLabel={""} text="Buscar:"/> */}
                        <Input lambdaClassInput={""} type="search" id={"searchPerson"} onChange={ (e) => { searchPerson(e.target.value) } } placeholder="Buscar Cliente" autoFocus required />
                    {/* </div> */}
                    <div>
                        <Label lambdaClassLabel={""} text="Nombre:"/>
                        <Input lambdaClassInput={""} type="text" name="name" value={createReservationData.name} onChange={ (e) => {  } } disabled required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="Contacto:"/>
                        <Input lambdaClassInput={""} type="number"  value={createReservationData.phone} onChange={ () => { } } disabled required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="CUI:"/>
                        <Input lambdaClassInput={""} type="number"  value={createReservationData.cui} onChange={ () => { } } disabled required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="NIT:"/>
                        <Input lambdaClassInput={""} type="number" value={createReservationData.nit} onChange={ () => { } } disabled required/>
                    </div>
                </section>
                <div>
                    <Label lambdaClassLabel={""} text="Personas:"/>
                    <Input lambdaClassInput={""} type="number" value={ createReservationData.people_number } onChange={ (e) => { createReservationDispatch({ type: 'UPDATE_PEOPLE', people_number: e.target.value}) } } />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Noches:"/>
                    <Input lambdaClassInput={""} type="number" value={ createReservationData.nights_number } onChange={ (e) => { createReservationDispatch({ type: 'UPDATE_NIGHTS', nights: e.target.value}) } } disabled />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Fecha entrada:"/>
                    <Input lambdaClassInput={""} type="date" value={createReservationData.date_in} onChange={ (e) => {  calculateNights( e.target.value, createReservationData.date_out ) } } required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Fecha salida:"/>
                    <Input lambdaClassInput={""} type="date" value={createReservationData.date_out} onChange={ (e) => {  calculateNights(createReservationData.date_in, e.target.value) } } required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Habitación:"/>
                    <Input lambdaClassInput={""} type="text" value={ createReservationData.room_number } onChange={ (e) => { } } />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Servicios:"/>
                    <Input lambdaClassInput={""} type="text" value={ createReservationData.services } onChange={ (e) => {  } } />
                </div>
                <div className='sendReservation_button'>
                    <button className='btn btn-primary' id='saveButton' >Guardar</button>
                </div>
            </form>
            <div className='table-responsive reservationTable_container'>
                    {/* <P_Head className="p_h3" text="Habitaciones disponibles"/> */}
                    <Table_searchSelect_room columns={["Habitación", "Camas", "Max Huespedes", "Información", "Reservar"]} dispatch={createReservationDispatch}/>
            </div>
        </div>
        <Toaster />
    </>
  )
}

export default CreateReservation
