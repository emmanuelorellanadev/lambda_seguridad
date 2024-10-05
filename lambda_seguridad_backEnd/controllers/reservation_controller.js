const db_connection = require("../database/conf_database");
const catchedAsync = require("../errors_handler/catchedAsync");
const { GeneralError, DBError } = require("../errors_handler/errors");
const Reservation = require("../models/reservation_model");
const ReservationState = require("../models/reservationState_model");
const ReservationDetail = require("../models/reservationDetail_model");
const { resSuccessful } = require("../response/resSucessful");
const Room = require("../models/room_model");


const getReservations = async ( req, res ) => {

    const reservationsData = await Reservation.findAll({include: [{model: ReservationState}]});

    if ( reservationsData.length == 0 ) { throw new GeneralError('Error. No se encontraron reservaciones') };
        
    resSuccessful(res, reservationsData)

}

const getReservation = async ( req, res ) => {
    const { id } = req.params;

    const reservationData = await Reservation.findByPk( id, {include: [{model: ReservationState}]} );
    if ( !reservationData ) { throw new GeneralError('Error. No se encontó la reservación') };
    const reservation = reservationData.toJSON();

    const reservationDetailData = await ReservationDetail.findByPk(reservation.id);
    reservation.reservationDetail = reservationDetailData.toJSON();

    resSuccessful(res, reservation)

}




const saveReservation =  async( req, res ) => {
    const reservationAndDetailToSave = req.body;
    //check details come on body
    if ( !reservationAndDetailToSave.reservationDetails ) throw new GeneralError('Error. Detalle no encontrado.', 400);

    
    
    const { reservationDetails, ...reservationToSave} = reservationAndDetailToSave
    
    //transaction
    
    await db_connection.transaction( async(transaction) => {
        
        const reservationSaved = await Reservation.create( reservationToSave, {transaction} )
            .catch(error => { throw new DBError(error, 'Error. No se pudo guardar la reservación')});

        // reservationDetail.ReservationId = reservationSaved.id;
        for(detail in reservationDetails){
            //check if room is available
            const room = await Room.findByPk(reservationDetails[detail].RoomId);
            if ( room.RoomStateId != 1) {throw new GeneralError(`Habitación ${room.room_number} no esta disponible.`)}
                
            reservationDetails[detail].ReservationId = reservationSaved.id
                
            await ReservationDetail.create(reservationDetails[detail], {transaction})
                .catch( error => {throw new DBError(error, 'Error al guardar el detalle de la reservación')});    

            //change room state
            await Room.update({RoomStateId: 2}, {where: {id: reservationDetails[detail].RoomId}, transaction})
                .catch(error => {throw new DBError(error, 'Error al actualizar estado de hanbitación.')})
        }
        
            resSuccessful(res, 'Reservación guardada exitosamente');
    })
};







const updateReservation =  async( req, res ) => {
    const { id } = req.params;
    const { reservationDetail, ...reservationToUpdate } = req.body;
    
    const reservation = await Reservation.findByPk(id);
    if( !reservation ) { throw new GeneralError('Error. Reservación no encontrada.')}


    await Reservation.update(reservationToUpdate, {where: {id: id}})
        .catch(error => { throw new DBError(error, 'Error. No se pudo actualizar la reservación')});

    await ReservationDetail.update(reservationDetail, {where: {id: reservationDetail.id}})
    resSuccessful(res, 'Reservación actualizada exitosamente');

}

const deleteReservation =  async( req, res ) => {

    const { id } = req.params;

    const reservation = await Reservation.findByPk(id)
    if( !reservation ) { throw new GeneralError('Error. Reservación no encontrada.')}

    await Reservation.destroy({ where: {id: id} })
        .catch(error => { throw new DBError(error, 'Error. No se pudo eliminar la reservación')});

    resSuccessful(res, 'Reservación eliminada exitosamente');

}

module.exports = {
    getReservations: catchedAsync(getReservations),
    getReservation: catchedAsync(getReservation),
    saveReservation: catchedAsync(saveReservation),
    updateReservation: catchedAsync(updateReservation),
    deleteReservation: catchedAsync(deleteReservation)
}