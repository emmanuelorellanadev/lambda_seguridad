const db_connection = require("../database/conf_database");
const { GeneralError, DBError } = require("../errors_handler/errors");
const Person = require("../models/person_model");
const Reservation = require("../models/reservation_model");
const ReservationState = require("../models/reservationState_model");
const ReservationDetail = require("../models/reservationDetail_model");
const Room = require("../models/room_model");
const { paginate } = require("../helpers/paginate");
const catchedAsync = require("../errors_handler/catchedAsync");
const { resSuccessful } = require("../response/resSucessful");
const { Op, DATE } = require("sequelize");
const checkRoomAvailability = require("../helpers/reservations/checkRoomAvailability");



const getReservations = async ( req, res ) => {

    const {q, page, limit, order_by, order_direction} = req.query;
    let search = {};
    let order = [];

    include = {
        include: [
            {model: Person, attributes: ["person_names", "person_surnames"], 
                where: {
                    [Op.or]: [
                        {person_names: {[Op.like]: `%${q}%`}},
                        {person_surnames: {[Op.like]: `%${q}%`}}
                    ]
                }
            },
            {model: ReservationDetail, attributes: ["date_in", "nights_number", "people_number"]},
            {model: ReservationState, attributes: ["reservationState_name"], where: {reservationState_name: ["Activa", "Registrada"]}}
        ]
    }
        
    const reservations = await paginate(Reservation, page, limit, search, include, order);

    resSuccessful(res, reservations);

}

const getReservation = async ( req, res ) => {
    const { id } = req.params;

    const reservationData = await Reservation.findByPk( id, {include: [
        {model: Person, params: ["person_names", "person_surnames", "cui", "nit", "BranchId"]},
        {model: ReservationState, params: ["reservationState_name"]},
        {model: ReservationDetail, include: [Room]}
    ]} );
    if ( !reservationData ) { throw new GeneralError('Error. No se encontó la reservación') };

    resSuccessful(res, reservationData)

}


const saveReservation =  async( req, res ) => {
    const reservationAndDetailToSave = req.body;
    //check details come on body
    if ( !reservationAndDetailToSave.reservationDetails ) throw new GeneralError('Error. Detalle no encontrado.', 400);

    const { reservationDetails, ...reservationToSave} = reservationAndDetailToSave

    //check if the room is available on the date sended
    const roomAvailability = await checkRoomAvailability(reservationToSave, reservationDetails)

    console.log(reservationDetails);
    //check and save reservation
    if ( roomAvailability ) {
        //transaction     
        await db_connection.transaction( async ( transaction ) => {
            
            const reservationSaved = await Reservation.create( reservationToSave, {transaction} )
                .catch(error => { throw new DBError(error, 'Error. No se pudo guardar la reservación')});
    
            // reservationDetail.ReservationId = reservationSaved.id;
            for(detail in reservationDetails){
                    
                reservationDetails[detail].ReservationId = reservationSaved.id
                // reservationDetails[detail].date_in =  new Date(reservationDetails[detail].date_in);
                // reservationDetails[detail].date_out =  new Date(reservationDetails[detail].date_out);
                await ReservationDetail.create(reservationDetails[detail], {transaction})
                    .catch( error => {throw new DBError(error, 'Error al guardar el detalle de la reservación')});    
            }            
            // console.log(reservationDetails[0].date_in.getUtcDate());

            resSuccessful(res, 'Reservación creada exitosamente.');
        })
    }
};

const updateReservation =  async( req, res ) => {

    const { id } = req.params;
    const { reservationDetails, ...reservationToUpdate } = req.body;
    
    const reservation = await Reservation.findByPk(id);
    const reservationDetailDB = await ReservationDetail.findOne({where: {ReservationId: id}});
    if( !reservation ) { throw new GeneralError('Error. Reservación no encontrada.')}

    await db_connection.transaction( async ( transaction ) => {

        await Reservation.update(reservationToUpdate, {where: {id: id}}, { transaction })
            .catch(error => { throw new DBError(error, 'Error. No se pudo actualizar la reservación')});

        for( reservationDetail in reservationDetails){
            reservationDetails[reservationDetail].id = reservationDetailDB.Id;
            await ReservationDetail.update(reservationDetails[reservationDetail], {where: { id: reservationDetailDB.id }}, { transaction })
        }
        resSuccessful(res, 'Reservación actualizada exitosamente');
    });    
}

const deleteReservation =  async( req, res ) => {

    const { id } = req.params;
    
    const reservation = await Reservation.findByPk(id)
    if( !reservation ) { throw new GeneralError('Error. Reservación no encontrada.')}
    const reservationData = reservation.dataValues;
    // change state of reservation to canceled = 4
    reservationData.ReservationStateId = 4
    await Reservation.update(reservationData, { where: {id: id} } )
        .catch( error => console.log(error))

    // await Reservation.destroy({ where: {id: id} })
    //     .catch(error => { throw new DBError(error, 'Error. No se pudo eliminar la reservación')});

    resSuccessful(res, 'Reservación cancelada exitosamente.');

}

module.exports = {
    getReservations: catchedAsync(getReservations),
    getReservation: catchedAsync(getReservation),
    saveReservation: catchedAsync(saveReservation),
    updateReservation: catchedAsync(updateReservation),
    deleteReservation: catchedAsync(deleteReservation)
}