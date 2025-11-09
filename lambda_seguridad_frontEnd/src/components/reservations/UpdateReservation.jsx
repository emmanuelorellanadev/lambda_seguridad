import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import { useEffect, useState, useReducer, useContext } from 'react';

import '../../css/reservation/reservation.css';
import { Toaster } from 'react-hot-toast';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useSearchPerson } from '../people/hooks/useSearchPerson';
import { initialCreateReservation, reservationReducer } from './reducer/reservationReducer';
import Table_searchSelect_room from '../ui/tables/createReservation/Table_searchSelect_room';
import { useUpdateReservation } from './hooks/useUpdateReservation';
import { useGetReservation } from './hooks/useGetReservation';
import { GlobalContext } from '../../context/GlobalContext';

const UpdateReservation = (props) => {
    const {uid, urlLambda} = useContext(GlobalContext);

    const [ onLoad, setOnLoad ] = useState(false);
    const [reservationData, reservationDispatch] = useReducer(reservationReducer, initialCreateReservation)

    //WORK HERE !!!!
    //show the rooms availables in that date

    const searchPerson = async(q) => {
        const urlPerson = `${urlLambda}/person/?q=${q}`;

        reservationDispatch({ type: "UPDATE_QUERY", query: q});
        await useSearchPerson( urlPerson, reservationDispatch );
        setOnLoad(true)
    }

    const calculateNights = async(datein, dateout) => {
        
        let dateIn = '';
        let dateOut = '';
        if (datein) {
            reservationDispatch({type: "UPDATE_DATEIN", date_in : datein});
            dateIn = new Date(datein);
        }
        if (dateout) {
            reservationDispatch({type: "UPDATE_DATEOUT", date_out: dateout});
            dateOut = new Date(dateout);
        }
        if (datein && dateout){ 
            const diff = (dateOut.getTime() - dateIn.getTime());
            const nights = ((diff / (1000 * 60 * 60 * 24)));//calculate number of nights
            reservationDispatch({ type: "UPDATE_NIGHTS", nights_number:  nights });
        }
        setOnLoad(true);

    }
    
    const updateButton = (e) => {
        e.preventDefault();
        const urlReservation = `${urlLambda}/reservation/${props.reservationId}`;
        useUpdateReservation(urlReservation, reservationData);
        setOnLoad(!onLoad)
    }

    useEffect( () => {
        const urlReservation = `${urlLambda}/reservation/${props.reservationId}`;
        useGetReservation(urlReservation, reservationDispatch);
        reservationDispatch({type: 'UPDATE_USER', UserId: uid});
    }, [onLoad])
    
  return (
    <>
        <div className='reservation_container'>
            <P_Head className="p_h1" text="Actualizar Reservación"/>
            <form className='reservation_form' onSubmit={updateButton}>
                <section >
                    {/* <div id='InputSearch'> */}
                        {/* <Label lambdaClassLabel={""} text="Buscar:"/> */}
                        <Input lambdaClassInput={""} type="search" name="cui" onChange={ (e) => { searchPerson(e.target.value) } } placeholder="Buscar Cliente" autoFocus />
                    {/* </div> */}
                    <div>
                        <Label lambdaClassLabel={""} text="Nombre:"/>
                        <Input lambdaClassInput={""} type="text" name="name" value={reservationData.name} onChange={ (e) => {  } } disabled required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="Contacto:"/>
                        <Input lambdaClassInput={""} type="number"  value={reservationData.phone} onChange={ () => { } } disabled required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="CUI:"/>
                        <Input lambdaClassInput={""} type="number"  value={reservationData.cui} onChange={ () => { } } disabled required/>
                    </div>
                    <div>
                        <Label lambdaClassLabel={""} text="NIT:"/>
                        <Input lambdaClassInput={""} type="number" value={reservationData.nit} onChange={ () => { } } disabled required/>
                    </div>
                </section>
                <div>
                    <Label lambdaClassLabel={""} text="Personas:"/>
                    <Input lambdaClassInput={""} type="number" value={ reservationData.people_number } onChange={ (e) => { reservationDispatch({ type: 'UPDATE_PEOPLE', people_number: e.target.value}) } } />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Noches:"/>
                    <Input lambdaClassInput={""} type="number" value={ reservationData.nights_number } onChange={ (e) => { reservationDispatch({ type: 'UPDATE_NIGHTS', nights: e.target.value}) } } disabled />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Fecha entrada:"/>
                    <Input lambdaClassInput={""} type="date" value={reservationData.date_in} onChange={ (e) => {  calculateNights( e.target.value, reservationData.date_out ) } } required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Fecha salida:"/>
                    <Input lambdaClassInput={""} type="date" value={reservationData.date_out} onChange={ (e) => {  calculateNights(reservationData.date_in, e.target.value) } } required/>
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Habitación:"/>
                    <Input lambdaClassInput={""} type="text" value={ reservationData.room_number } onChange={ (e) => { } } />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Servicios:"/>
                    <Input lambdaClassInput={""} type="text" value={ reservationData.services } onChange={ (e) => {  } } />
                </div>
                <div className='sendReservation_button'>
                    <button className='btn btn-primary' id='updateButton' >Guardar</button>
                </div>
            </form>
            <div className='table-responsive reservationTable_container'>
                    {/* <P_Head className="p_h3" text="Habitaciones disponibles"/> */}
                    <Table_searchSelect_room columns={["Habitación", "Camas", "Max Huespedes", "Información", "Reservar"]} dispatch={reservationDispatch}/>
            </div>
        </div>
        <Toaster />
    </>
  )
}

export default UpdateReservation
