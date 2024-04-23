const Room = require('../models/room_model');
const catchedAsync = require('../errors_handler/catchedAsync');
const { resSuccessful } = require("../response/resSucessful");
const { GeneralError, DBError } = require("../errors_handler/errors");
const Room_Service = require('../models/room_service_model');

const getRooms = async(req, res) => {
    const rooms = await Room.findAll();
    if ( rooms.length == 0 ) throw new GeneralError('No se encontraron habitaciones.') 
    resSuccessful(res, rooms);
}

const getRoom = async(req, res) => {
    const { id } = req.params;

    const room = await Room.findByPk(id);
    if ( !room ) throw new GeneralError('No se encontro información de la habitación.') 
    resSuccessful(res, room);
}

const saveRoom = async(req, res) => {
    const roomData = req.body;

    if ( !roomData ) throw new GeneralError('No recibió información de la habitación.') 

    await Room.create(roomData)
        .then( async (roomSaved) => {
            await Room_Service.create({
                RoomId: roomSaved.id,
                ServiceId: roomData.ServiceId
            })
        })
        .catch(error => {
            throw new DBError(error, 'Error al guardar la habitación.');
        });

    resSuccessful(res, 'Habitación guardada exitosamente.');
}

const updateRoom = async(req, res) => {
    const roomData = req.body;
    const { id } = req.params;

    if ( !roomData ) throw new GeneralError('No recibió información de la habitación.') 

    const room = await Room.findByPk(id);

    if ( !room ) throw new GeneralError('No se encontró habitación'); 

    await Room.update(roomData, {where: {id: id}})
        .catch(error => {
            throw new DBError(error, 'Error al actualizar la habitación.');
        });

    resSuccessful(res, 'Habitación actualizada exitosamente.');
}

const deleteRoom = async(req, res) => {
    const { id } = req.params;

    const room = await Room.findByPk( id );

    if ( !room ) throw new GeneralError('Error: usuario no encontrado.');

    await Room.destroy({where: {id: id}})
        .catch(error => { throw new DBError(error, 'Error al eliminar la habitación') })

    resSuccessful(res, 'Habitación eliminada correctamente.');
}

module.exports = {
    getRooms: catchedAsync(getRooms),
    getRoom: catchedAsync(getRoom),
    saveRoom: catchedAsync(saveRoom),
    updateRoom: catchedAsync(updateRoom),
    deleteRoom: catchedAsync(deleteRoom),
}
