const db_connection = require("../../database/conf_database");
const { GeneralError, DBError } = require("../../errors_handler/errors");
const Person = require("../../models/person_model");
const Reservation = require("../../models/reservation_model");
const ReservationState = require("../../models/reservationState_model");
const ReservationDetail = require("../../models/reservationDetail_model");
const Room = require("../../models/room_model");
const { Op, DATE } = require("sequelize");

const checkRoomAvailability = async(reservationToSave, reservationDetails) => {
    console.log(reservationDetails)

    //before save, check the room is abailable in the dates sended
    const reservationData = await Reservation.findAll({include: [
        {model: ReservationDetail, attributes: ["date_in", "date_out"], include: [{model: Room, where : {id: reservationDetails[0].RoomId}, attributes: [] }], 
            where: {
                [Op.or]:[
                    {[Op.and]:[ //check if date sended is on range of active reservation
                        {date_in: {[Op.lte]: reservationDetails[0].date_in}}, //if date_in stored >= date_in sended
                        {date_out: {[Op.gte]: reservationDetails[0].date_out}}//if date_out stored < date_in sended
                    ]},
                    {[Op.and]:[// check if date sended starts on the middle of the active reservation
                        {date_in: {[Op.lte]: reservationDetails[0].date_in}},  
                        {date_out: {[Op.gt]: reservationDetails[0].date_in}},  
                        {date_out: {[Op.lte]: reservationDetails[0].date_out}} 
                    ]},
                    {[Op.and]:[//check if date sended finished on the middle of the active reservation
                        {date_in: {[Op.gte]: reservationDetails[0].date_in}},  
                        {date_in: {[Op.lt]: reservationDetails[0].date_out}},  
                        {date_out: {[Op.gte]: reservationDetails[0].date_out}} 
                    ]},
                    {[Op.and]:[//check if date sended contains the active date reservation
                        {date_in: {[Op.gte]: reservationDetails[0].date_in}},  
                        {date_out: {[Op.lte]: reservationDetails[0].date_out}},  
                    ]}
                ]
            }
        },
        {model: ReservationState, attributes: ["reservationState_name"], where : {reservationState_name: 'Activa'}},
        ], 
        attributes: ["id"]
    })
    .catch( error => {throw new DBError(error, "Error al consultar reservaciones anteriores")})
    
    if (reservationData.length <= 0){
        return (true);
    }else{
        throw new GeneralError('Error. La habitación ya se encuentra reservada en esa fecha. Recarga la página e intenta nuevamente')
    }
}

module.exports = checkRoomAvailability;