const db_connection =require('../database/conf_database');
const catchedAsync = require('../errors_handler/catchedAsync');
const RoomPrice_Room = require('../models/roomPrice_room_model');
const { resSuccessful } = require('../response/resSucessful');

const getRoomPrice_room = async (req, resp) => {
    await RoomPrice_Room.findAll()
        .then(() => resSuccessful(res, data))
}

module.exports = {
    getRoomPrice_room: catchedAsync(getRoomPrice_room),
}