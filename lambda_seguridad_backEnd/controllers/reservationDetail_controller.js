const catchedAsync = require("../errors_handler/catchedAsync");
const { GeneralError, DBError } = require("../errors_handler/errors");
const ReservationDetail = require("../models/reservationDetail_model");
const { resSuccessful } = require("../response/resSucessful");


const getReservationDetails = async ( req, res ) => {
    const reservationDetails = await ReservationDetail.findAll();
    if ( reservationDetails.length == 0 ) { throw new GeneralError('Error. No se encontraron detalles de reservaciones') };

    resSuccessful(res, reservationDetails)

}

const getReservationDetail = async ( req, res ) => {
    const { id } = req.params;

    const reservationDetail = await ReservationDetail.findByPk( id );
    if ( !reservationDetail ) { throw new GeneralError('Error. No se encontó el detalle de la reservación') };

    resSuccessful(res, reservationDetail)

}

const saveReservationDetail =  async( req, res ) => {

    const reservationDetailToSave = req.body;
    await ReservationDetail.create( reservationDetailToSave )
        .catch(error => { throw new DBError(error, 'Error. No se pudo guardar la reservación')});

    resSuccessful(res, 'Detalle de reservación guardada exitosamente');

}

const updateReservationDetail =  async( req, res ) => {
    const { id } = req.params;
    const reservationDetailToSave = req.body;

    const reservationDetail = await ReservationDetail.findByPk(id)
    if( !reservationDetail ) { throw new GeneralError('Error. Reservación no encontrada.')}

    await ReservationDetail.update(reservationDetailToSave, {where: {id: id}})
        .catch(error => { throw new DBError(error, 'Error. No se pudo actualizar la reservación')});

    resSuccessful(res, 'Detalle de reservación actualizado exitosamente');

}

const deleteReservationDetail =  async( req, res ) => {

    const { id } = req.params;

    const reservationDetail = await ReservationDetail.findByPk(id)
    if( !reservationDetail ) { throw new GeneralError('Error. Reservación no encontrada.')}


    await ReservationDetail.destroy({ where: {id: id} })
        .catch(error => { throw new DBError(error, 'Error. No se pudo eliminar el detalle de reservación')});

    resSuccessful(res, 'Reservación eliminada exitosamente');

}

module.exports = {
    getReservationDetails: catchedAsync(getReservationDetails),
    getReservationDetail: catchedAsync(getReservationDetail),
    saveReservationDetail: catchedAsync(saveReservationDetail),
    updateReservationDetail: catchedAsync(updateReservationDetail),
    deleteReservationDetail: catchedAsync(deleteReservationDetail)
}