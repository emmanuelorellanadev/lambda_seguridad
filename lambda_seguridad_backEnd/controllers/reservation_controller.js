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


const getReservations = async ( req, res ) => {

    const {q, page, limit, order_by, order_direction} = req.query;
    let search = {};
    let order = [];

    //WORK HERE !!!
    //search doesnt work

    // if (q){
    //     search = {
    //         where: {
    //             role_name: {
    //                 [Op.like]: `%${q}%`
    //             }
    //         }
    //     }
    // }
    
    include = {
        include: [
            {model: Person},
            {model: ReservationDetail},
            {model: ReservationState}
        ]
    }
        
    const reservations = await paginate(Reservation, page, limit, search, include, order);

    resSuccessful(res, reservations);

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
    
    //before save, check the room is abailable\
    //on the date sended
    const reservationDateDB = []
    const reservationData = await Reservation.findAll({include: [
            {model: ReservationDetail, attributes: ["date_in", "date_out"], include: [{model: Room, where : {id: reservationDetails[0].RoomId}, attributes: [] }]},
            {model: ReservationState, attributes: ["reservationState_name"], where : {reservationState_name: 'Activo'}},
            ], 
            attributes: ["id"]
        })
        .catch( error => {throw new DBError(error, "Error al consultar reservaciones anteriores")})

    //transform the date data on json to create date objects and compare
    const reservationDetail = JSON.parse(JSON.stringify(reservationData[0].ReservationDetails[0]));

    for( reservationDet in reservationDetail){
        reservationDateDB.push(reservationDetail[reservationDet])
    }
    
    //WORK HERE!!!
    //Compare date objects or json
    //you can do it !!!

    console.log(reservationDateDB[0])
    const date = new Date(reservationDateDB[0].split(' ', 1))
    console.log(date )


    // if ( reservationData.ReservationDetails ){
    //     console.log("datos encontrados".red, reservationData.ReservationDetails)
    // }else{
    //     console.log("datos NO encontrados puede guardar".red, reservationData.ReservationDetails)
    // }

    //transaction
    
    // await db_connection.transaction( async ( transaction ) => {
        
    //     const reservationSaved = await Reservation.create( reservationToSave, {transaction} )
    //         .catch(error => { throw new DBError(error, 'Error. No se pudo guardar la reservación')});

    //     // reservationDetail.ReservationId = reservationSaved.id;
    //     for(detail in reservationDetails){
    //         //check if room is available

    //         const room = await Room.findByPk(reservationDetails[detail].RoomId);
    //         if ( room.RoomStateId != 1) {throw new GeneralError(`Habitación ${room.room_number} no esta disponible.`)}
                
    //         reservationDetails[detail].ReservationId = reservationSaved.id
                
    //         await ReservationDetail.create(reservationDetails[detail], {transaction})
    //             .catch( error => {throw new DBError(error, 'Error al guardar el detalle de la reservación')});    

    //         //change room state
    //         // await Room.update({RoomStateId: 2}, {where: {id: reservationDetails[detail].RoomId}, transaction})
    //         //     .catch(error => {throw new DBError(error, 'Error al actualizar estado de hanbitación.')})
    //     }
        
            resSuccessful(res, reservationData);
    // })
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