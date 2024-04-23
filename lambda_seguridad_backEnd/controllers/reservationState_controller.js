const catchedAsync = require("../errors_handler/catchedAsync");
const { GeneralError, DBError } = require("../errors_handler/errors");
const ReservationState = require("../models/reservationState_model");
const { resSuccessful } = require("../response/resSucessful");

const getReservationStates =  async( req, res ) => {

    const reservationStates = await ReservationState.findAll();
    if ( reservationStates.length == 0 ) throw new GeneralError('Error. Status de reservaciones no encontrados');

    resSuccessful(res, reservationStates);

}

const getReservationState =  async( req, res ) => {

    const { id } = req.params;

    const reservationStates = await ReservationState.findByPk( id );
    if ( !reservationStates ) throw new GeneralError('Error. Status de reservación no encontrado');

    resSuccessful(res, reservationStates);

}

const saveReservationState =  async( req, res ) => {

    const reservationStateToSave = req.body;

    await ReservationState.create( reservationStateToSave )
        .catch(error => { throw new DBError(error, 'Error. No se pudo guardar el estado de la reservación')});

    resSuccessful(res, 'Estado de reservación guardado exitosamente');

}

const updateReservationState =  async( req, res ) => {
    const { id } = req.params;
    const reservationStateToUpdate = req.body;

    const reservationState = await ReservationState.findByPk(id)
    if( !reservationState ) { throw new GeneralError('Error. Estado de reservación no encontrado.')}

    await ReservationState.update(reservationStateToUpdate, {where: {id: id}})
        .catch(error => { throw new DBError(error, 'Error. No se pudo actualizar el estado de la reservación')});

    resSuccessful(res, 'Estado de reservación actualizado exitosamente');

}

const deleteReservationState =  async( req, res ) => {

    const { id } = req.params;

    const reservationState = await ReservationState.findByPk(id)
    if( !reservationState ) { throw new GeneralError('Error. Estado de reservación no encontrado.')}


    await ReservationState.destroy({ where: {id: id} })
        .catch(error => { throw new DBError(error, 'Error. No se pudo eliminar el estado de la reservación')});

    resSuccessful(res, 'Estado de reservación eliminado exitosamente');

}

module.exports = {
    getReservationStates: catchedAsync(getReservationStates),
    getReservationState: catchedAsync(getReservationState),
    saveReservationState: catchedAsync(saveReservationState),
    updateReservationState: catchedAsync(updateReservationState),
    deleteReservationState: catchedAsync(deleteReservationState)
}