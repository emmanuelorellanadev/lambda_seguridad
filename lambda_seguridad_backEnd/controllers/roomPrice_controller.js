const catchedAsync = require("../errors_handler/catchedAsync");
const RoomPrice = require("../models/roomPrice_model");
const { resSuccessful } = require("../response/resSucessful");





const getRoomPrices =  async (req, res) => {
    const roomPrices = await RoomPrice.findAll();

    resSuccessful(res, roomPrices)
}

const getRoomPrice =  async (req, res) => {
    const { id } = req.body;

    const roomPrice = await RoomPrice.findByPk(id);

    resSuccessful(res, roomPrice);
}

const saveRoomPrice =  async (req, res) => {
    const roomPrice = req.body;

    await RoomPrice.create(roomPrice);

    resSuccessful(res, roomPrice);
}

const updateRoomPrice =  async (req, res) => {
    const roomPrice = req.body;
    const { id } = req.params

    await RoomPrice.update(roomPrice, {where: {id: id}});

    resSuccessful(res, roomPrice);
}

const deleteRoomPrice =  async (req, res) => {
    const { id } = req.params

    await RoomPrice.destroy({where: {id: id}})
        .then( () => resSuccessful(res, "Precio eliminado exitosamente."))
    
}

module.exports = {
    getRoomPrices: catchedAsync(getRoomPrices),
    getRoomPrice: catchedAsync(getRoomPrice),
    saveRoomPrice: catchedAsync(saveRoomPrice),
    updateRoomPrice: catchedAsync(updateRoomPrice),
    deleteRoomPrice: catchedAsync(deleteRoomPrice),
}