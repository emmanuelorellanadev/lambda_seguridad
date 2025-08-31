import { useEffect, useState, useReducer } from 'react';

import '../../css/reservation/reservation.css';
import { Toaster } from 'react-hot-toast';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { initialCreateReservation, reservationReducer } from './reducer/reservationReducer';
import Table_searchSelect_room from '../ui/tables/createReservation/Table_searchSelect_room';
import { useCreateReservation } from './hooks/useCreateReservation';
import { InputSearchPerson } from '../ui/inputSearch/InputSearchPerson';
const CreateReservation = () => {

    const [createReservationData, createReservationDispatch] = useReducer(reservationReducer, initialCreateReservation);

    const [ onLoad, setOnLoad ] = useState(false);

    const calculateNights = async(datein, dateout) => {

        let dateIn = '';
        let dateOut = '';
        if (datein) {
            dateIn = new Date(datein);
            createReservationDispatch({type: "UPDATE_DATEIN", date_in : datein});
        }
        if (dateout) {
            dateOut = new Date(dateout);
            createReservationDispatch({type: "UPDATE_DATEOUT", date_out: dateout});
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
        
        handleReservationDate();
        useCreateReservation(urlReservation, createReservationData);
        createReservationDispatch({type: 'RESET'});
        document.querySelector("#searchPerson").value = '';
        setOnLoad(!onLoad)
    }

const handleReservationDate = async() => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    //format now date important UTC at the end
    const now = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
    createReservationDispatch({type: 'UPDATE_RESERVATION_DATE', reservation_date: now});

    //WORK HERE!!!
    //check why is refreshing and deleting the date_in
    // createReservationDispatch({type: 'UPDATE_DATEIN', date_in: `2025-08-29`});
    
    // don't let change date_in
    // await createReservationDispatch({type: 'UPDATE_DATEIN', date_in: `${year}-${month}-${day}`})
}

    useEffect( () => {
        setOnLoad(false);
        handleReservationDate();
        createReservationDispatch({type: 'UPDATE_USER', UserId: sessionStorage.getItem('uid-xL')});
        // console.log(createReservationData);
    }, [onLoad])
    
  return (
    <>
        <div className='reservation_container'>
            <P_Head className="p_h1" text="Crear Reservación"/>
            <form className='reservation_form' onSubmit={saveButton}>
                <section >
                    <InputSearchPerson dispatch={createReservationDispatch} data={createReservationData} placeholder={'Nombre del huesped'}/>
                </section>
                    
                <div className={"createReservationItem"} >
                    <Label lambdaClassLabel={""} text="Nombre:"/>
                    <Input lambdaClassInput={""} type="text" name="name" value={createReservationData.name} onChange={ (e) => {  } } disabled required/>
                </div>
                <div className={"createReservationItem"}>
                    <Label lambdaClassLabel={""} text="Contacto:"/>
                    <Input lambdaClassInput={""} type="number"  value={createReservationData.phone} onChange={ () => { } } disabled required/>
                </div>
                <div className={"createReservationItem"}>
                    <Label lambdaClassLabel={""} text="CUI:"/>
                    <Input lambdaClassInput={""} type="number"  value={createReservationData.cui} onChange={ () => { } } disabled required/>
                </div>
                <div className={"createReservationItem"}>
                    <Label lambdaClassLabel={""} text="NIT:"/>
                    <Input lambdaClassInput={""} type="number" value={createReservationData.nit} onChange={ () => { } } disabled required/>
                </div>
                <div className={"createReservationItem"}>
                    <Label lambdaClassLabel={""} text="Personas:"/>
                    <Input lambdaClassInput={""} type="number" value={ createReservationData.people_number } onChange={ (e) => { createReservationDispatch({ type: 'UPDATE_PEOPLE', people_number: e.target.value}) } } />
                </div>
                <div className={"createReservationItem"}>
                    <Label lambdaClassLabel={""} text="Noches:"/>
                    <Input lambdaClassInput={""} type="number" value={ createReservationData.nights_number } onChange={ (e) => { createReservationDispatch({ type: 'UPDATE_NIGHTS', nights: e.target.value}) } } disabled />
                </div>
                <div className={"createReservationItem"}>
                    <Label lambdaClassLabel={""} text="Fecha entrada:"/>
                    <Input lambdaClassInput={""} type="date" value={createReservationData.date_in} onChange={ (e) => {  calculateNights( e.target.value, createReservationData.date_out ) } } required/>
                </div>
                <div className={"createReservationItem"}>
                    <Label lambdaClassLabel={""} text="Fecha salida:"/>
                    <Input lambdaClassInput={""} type="date" value={createReservationData.date_out} onChange={ (e) => {  calculateNights(createReservationData.date_in, e.target.value) } } required/>
                </div>
                <div className={"createReservationItem"}>
                    <Label lambdaClassLabel={""} text="Habitación:"/>
                    <Input lambdaClassInput={""} type="text" value={ createReservationData.room_number } onChange={ (e) => { } } />
                </div>
                <div className={"createReservationItem"}>
                    <Label lambdaClassLabel={""} text="Servicios:"/>
                    <Input lambdaClassInput={""} type="text" value={ createReservationData.services } onChange={ (e) => {  } } />
                </div>
                <div className='sendReservation_button createReservationItem'>
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
