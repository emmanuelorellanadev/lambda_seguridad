const catchedAsync = require('../errors_handler/catchedAsync');
const Room_Service = require('../models/room_service_model');
const { resSuccessful } = require('../response/resSucessful');

const getRoomServices = async( req, res ) => {
    const roomServiceData = Room_Service.findAll();

    resSuccessful(res, roomServiceData);
}

module.exports = {
    getRoomServices: catchedAsync(getRoomServices),
}